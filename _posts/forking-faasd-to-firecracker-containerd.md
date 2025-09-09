---
title: Forking OpenFaaS Faasd to support Firecracker Containerd
date: 2024-06-10
description: Whilst Firecracker containerd support for K8s is not ready to be used with OpenFaaS K8s provider, we might be able to utilise it for OpenFaas faasd. This article covers my experience on extending OpenFaas faasd to run with Firecracker-containerd.
tags:
  - container
  - firecracker
  - serverless
  - openfaas
publish: true
link: https://dev.to/alanpjohn/forking-openfaas-faasd-to-support-firecracker-containerd-1a5l
---
# Why you would need to do that?

As part of my research, I needed to evaluate the performance of Firecracker in serverless environments compared to traditional Linux containers (LXC). [OpenFaaS](https://www.openfaas.com), with its modular design, offered an excellent framework for this comparison. OpenFaas offered two running modes, which were OpenFaas using Kubernetes and [faasd](https://github.com/openfaas/faasd). Firecracker-containerd isn’t directly supported by Kubernetes due to the lack of a stable CRI plugin unless you consider the now unsupported [Firekube](https://github.com/weaveworks/wks-quickstart-firekube). Extending faasd to support Firecracker was simpler and served as sufficient proof of concept from my research. Otherwise, from a general point of view, the primary advantage of Firecracker over LXC in serverless computing is isolation, which isn’t crucial if you’re running faasd since serverless loads on faasd are typically trusted. So, there is no big need to do this other than plain curiosity.

With that in mind, let’s dive into the details. This guide isn’t a polished product; there are still rough edges, which I’ll cover in the conclusion section later.

# Prerequisites

To set up Firecracker, I followed the guide at [Firecracker-containerd's Getting Started](https://github.com/firecracker-microvm/firecracker-containerd/blob/main/docs/getting-started.md). The key steps involve building the necessary components by running the make command.

Before running make, I made a few adjustments to the Makefile to use `golang:1.21-bullseye` as the builder image. Then, I ran the following commands:

- `make all` to get `firecracker-ctr`, `firecracker-containerd`, and `containerd-shim-v2-firecracker`.
- `make firecracker` to get the Firecracker binary
- `make image` to get the rootfs

The goal is to have binaries for `Firecracker`, `firecracker-ctr`, `firecracker-containerd`, and `containerd-shim-v2-firecracker`, along with the Firecracker CNI plugin [`tc-redirect-tap`](https://github.com/firecracker-microvm/firecracker-go-sdk/tree/main/cni). The guide well explains each setup.

I use the `tc-redirect-tap` CNI plugin to connect containers running on Firecracker to the CNI network. A five-year-old (quite outdated) guide on Firecracker-containerd CNI networking options is found [here](https://github.com/firecracker-microvm/firecracker-containerd/blob/main/docs/networking.md). For simplicity's sake, I connect to the instances without using a network bridge and let Firecracker-containerd set up the networks. I attempted to adjust the configuration to use a network bridge, but using the `bridge` CNI plugin with the `tc-redirect-tap` plugin shows some weird behaviour, ultimately making the instance unreachable. So we set up container networking through the firecracker containerd configuration as mentioned in the [Networking Support section of the getting started guide](https://github.com/firecracker-microvm/firecracker-containerd/blob/main/docs/getting-started.md#networking-support). so ensure that your firecracker-containerd configuration files `/etc/containerd/firecracker-runtime.json` and `config.toml` are configured as per as the getting started guide.
I recommend testing out your firecracker-containerd setup and playing around with it to get comfortable with it.

# Extending faasd to firecracker-containerd

I had to set faasd to use the firecracker-containerd socket instead of the default containerd socket. While we can pass the socket and runtime using environment variables, as previously mentioned, the objective is **only** running on firecracker containerd, so we can hard set the default runtime and socket. Changing the runtime and socket at runtime using environment variables would mean adding code to handle both cases and validating the configurations of all components, which is additionaly code which we are avoiding for now. You can override the default runtime in the `ReadFromEnv` function at the `pkg/provider/config/read.go`. Changes need to be made to the `read_test.go` test file accordingly.

```go
func ReadFromEnv(hasEnv types.HasEnv) (*types.FaaSConfig, *ProviderConfig, error) {
	//
	// ... rest of the code is untouched
	//
	providerConfig := &ProviderConfig{
		Sock: types.ParseString(hasEnv.Getenv("sock"), "/run/firecracker-containerd/containerd.sock"),
	}
	return config, providerConfig, nil
}
```

Setting default runtime for containerd at `cmd/provider.go`.  runtime to `aws.firecracker`.

```go
func runProviderE(cmd *cobra.Command, _ []string) error {
	//
	// ... rest of the code is untouched
	//
	client, err := containerd.New(
		providerConfig.Sock,
		containerd.WithDefaultRuntime("aws.firecracker"),
	)
	//
	// ... 
	//
}
```

## Changes to instance management

Swapping containerd for firecracker-containerd isn't straightforward and requires changes to the container creation code for faasd in `pkg/provider/handlers/deploy.go`. This part was a little tricky, and I must admit, I feel I might be missing a trick, but I did get it to work as intended with minimal changes, so I am going ahead and committing to it.
We would need to add `firecracker-containerd` as a dependency to the project

```bash
$ go get github.com/firecracker-microvm/firecracker-containerd/
```

and import the `firecrackeroci` submodule

```go
import (
	// ... other imports
	"github.com/firecracker-microvm/firecracker-containerd/runtime/firecrackeroci"
)
```

Now, we adjust the container options for firecracker-containerd by adding the `firecrackeroci.WithVMID` and `firecrackeroci.WithVMNetwork` options to be able to identify the VM and make firecracker containerd setup the networking as per the previous discussion on networking. We also commented out the mounts option as adding mounted volumes on firecracker-containerd was causing permission issues, and firecracker-containerd could not find the mounts (An issue that is persistent when running with Microk8s Kata as well).

```go
func deploy(ctx context.Context, req types.FunctionDeployment, client *containerd.Client, cni gocni.CNI, secretMountPath string, alwaysPull bool) error {
	//
	// ... rest of the code is untouched
	//
	copts := []containerd.NewContainerOpts{
		containerd.WithImage(image),
		containerd.WithSnapshotter(snapshotter),
		containerd.WithNewSnapshot(name+"-snapshot", image),
		containerd.WithNewSpec(
			oci.WithImageConfig(image),
			oci.WithCapabilities([]string{"CAP_NET_RAW"}),
			// oci.WithMounts(mounts),
			oci.WithEnv(envs),
			firecrackeroci.WithVMID(name),
			firecrackeroci.WithVMNetwork,
			withMemory(memory)),
		containerd.WithContainerLabels(labels),
	}
	
	container, err := client.NewContainer(
		ctx,
		name,
		copts...,
	)
	//
	// ...
	//
}
```

Attaching the container IO to the faasd binary (which is faasd default behaviour) does not work with firecracker containerd, so we attach it to a temporary log file created for the container for now. Additionally, as firecracker containerd creates the CNI network for the function, we dont need to create it again here.
```go
func createTask(ctx context.Context, container containerd.Container, _ gocni.CNI) error {
	name := container.ID()
	task, taskErr := container.NewTask(ctx, cio.LogFile(fmt.Sprintf("/tmp/%s.log", name)))
	if taskErr != nil {
		return fmt.Errorf("unable to start task: %s, error: %w", name, taskErr)
	}
	log.Printf("Container ID: %s\tTask ID %s:\tTask PID: %d\t\n", name, task.ID(), task.Pid())
	_, waitErr := task.Wait(ctx)
	if waitErr != nil {
		return errors.Wrapf(waitErr, "Unable to wait for task to start: %s", name)
	}
	if startErr := task.Start(ctx); startErr != nil {
		return errors.Wrapf(startErr, "Unable to start task: %s", name)
	}
	ip, err := cninetwork.GetIPAddress(name)
	if err != nil {
		return err
	}
	log.Printf("%s has IP: %s.\n", name, ip)
	return nil
}
```

You will notice that the `cninetwork.GetIPAddress` call has changed; we will get to this in the next section.
As you would have set which following the firecracker-containerd getting started guide, We would use the `devmapper` snapshotter. We will set the default snapshotter to devmapper, which would require changing the `snapshotter:= ""` lines to `snapshotter:= "devmapper"` in the  `deploy` and `prepull` functions.
```go
func Remove(ctx context.Context, client *containerd.Client, name string) error {
	//
	// ...
	//
	} else {
		snapshotter := "devmapper"
		if val, ok := os.LookupEnv("snapshotter"); ok {
			snapshotter = val
		}
		service := client.SnapshotService(snapshotter)
		key := name + "-snapshot"
		if _, err := client.SnapshotService("").Stat(ctx, key); err == nil {
			service.Remove(ctx, key)
		}
	}
	return nil
}
```

## Changes to networking
As the networks set up by firecracker containerd are `ptp` and setup by firecracker containerd and not by us, there are some major changes in the `cni_network` submodule. Firstly, we need to set up the CNI constants in line with the configuration passed to firecracker containerd.
```go
const (
	// CNIBinDir describes the directory where the CNI binaries are stored
	CNIBinDir = "/opt/cni/bin"
	// CNIConfDir describes the directory where the CNI plugin's configuration is stored
	CNIConfDir = "/etc/cni/conf.d"
	// NetNSPathFmt gives the path to the a process network namespace, given the pid
	NetNSPathFmt = "/proc/%d/ns/net"
	// CNIDataDir is the directory CNI stores allocated IP for containers
	CNIDataDir = "/var/run/cni"
	// defaultCNIConfFilename is the vanity filename of default CNI configuration file
	defaultCNIConfFilename = "fcnet.conflist"
	// This value appears in iptables comments created by CNI.
	defaultNetworkName = "fcnet"
	// defaultSubnet is the default subnet used in the defaultCNIConf -- this value is set to not collide with common container networking subnets:
	defaultSubnet = "10.64.0.0/16"
	// defaultIfPrefix is the interface name to be created in the container
	defaultIfPrefix = "veth"
)

// defaultCNIConf is a CNI configuration that enables network access to containers
var defaultCNIConf = fmt.Sprintf(`
{
    "cniVersion": "0.4.0",
    "name": "%s",
    "plugins": [
      {
        "type": "ptp",
        "ipMasq": true,
        "ipam": {
            "type": "host-local",
            "subnet": "%s",
            "dataDir": "%s",
            "routes": [
                { "dst": "0.0.0.0/0" }
            ]
        }
      },
      {
        "type": "firewall"
      },
	  {
		"type": "tc-redirect-tap"
	  }
    ]
}
`, defaultNetworkName, defaultSubnet, CNIDataDir)

```
faasd retrieves the IP addresses for the containers by using the service name and the container task PID. However, I observed the task PID returned by the firecracker-containerd is not in line with the task PID of the firecracker process, which means the current code to retrieve the IP address would fail. So, I removed the PID parameter and used the service name to retrieve the IP address.
```go
func isCNIResultForContainer(fileName, container string) (bool, error) {
	found := false

	f, err := os.Open(fileName)
	if err != nil {
		return false, fmt.Errorf("failed to open CNI IP file for %s: %v", fileName, err)
	}
	defer f.Close()

	reader := bufio.NewReader(f)
	processLine, _ := reader.ReadString('\n')
	if strings.Contains(processLine, container) {
		ethNameLine, _ := reader.ReadString('\n')
		if strings.Contains(ethNameLine, defaultIfPrefix) {
			found = true
		}
	}

	return found, nil
}
```
Thus we no longer need the PID to retrieve the IP address
```go
func GetIPAddress(container string) (string, error) {
	CNIDir := path.Join(CNIDataDir, defaultNetworkName)

	files, err := os.ReadDir(CNIDir)
	if err != nil {
		return "", fmt.Errorf("failed to read CNI dir for container %s: %v", container, err)
	}
	for _, file := range files {
		// each fileName is an IP address
		fileName := file.Name()

		resultsFile := filepath.Join(CNIDir, fileName)
		found, err := isCNIResultForPID(resultsFile, container)
		if err != nil {
			return "", err
		}
		if found {
			return fileName, nil
		}
	}
	return "", fmt.Errorf("unable to get IP address for container: %s", container)
}
```
Changes must be made to the `cni_network_test.go` test file accordingly.
The `GetIPAdress` function is also called the `pkg/supervisor.go`, which runs the Faas gateway and other processes required by OpenFaas. Therefore, we would need to modify the function call in that.

## Changes to conf files
To avoid this fork from clashing with an existing OpenFaas faasd installation, I renamed the binary and systemd services as faasd-fc; in the relevant file paths, in the `Makefile`,  the systemd service files in `hack/faasd-fc.service` and `hack/faasd-fc-provider.service` and the `cmd/install.go` file. 
You can build the faasd-fc binary using the command.
```bash
make dist-local
```

# Running It
You can start faasd-fc by running
```bash
sudo bin/faasd-fc install
```
Follow the instruction in the command output to setup faas-cli.

```bash
$ faas-cli ls
Function                      	Invocations    	Replicas
```
I created a simple hello-world application in go to test the deployment. Lets deploy the function using faas-cli.
```bash
$ faas-cli deploy --image=alanjohn/hello-go:latest --name=hello-go --update=false   
Function hello-go already exists, attempting rolling-update.

Deployed. 200 OK.
URL: http://127.0.0.1:8080/function/hello-go
```
You can use `firecracker-ctr` in the `openfaas-fn` namespace to check if the container and task for this container are running with the correct runtime and configuration. We can use `curl` to interact with the application.
```bash
$ curl http://127.0.0.1:8080/function/hello-go
hello, world!
$ faas-cli ls
Function                      	Invocations    	Replicas
hello-go                      	1              	1    
```
It is working as expected
Now lets delete this function
```bash
$ faas-cli rm hello-go
Deleting: hello-go.
Removing old function.
$ faas-cli ls         
Function                      	Invocations    	Replicas
```
We can use `firecracker-ctr` to confirm that all resources in `openfaas-fn` namespace have been cleaned up.

# Conclusion
You can find the full code [here](https://github.com/alanpjohn/faasd-extended/tree/firecracker-support). Ideally, to get the most out of firecracker-containerd, you would want to have the firecracker instances running beforehand to remove the boot time of the firecracker VM from the time taken to start an instance as done by AWS lambda who have running firecracker microVM slots. But that would require some major refactoring to faasd and would be an overkill to faasd's intended use case. The lack of a network bridge and volume support is a more imminent issue that would completely bridge the gap between faasd and this firecracker-container extension that uses firecracker-containerd. Open to some inputs on how I could go around those.


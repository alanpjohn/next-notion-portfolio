---
title: "Deep-dive into Containerization : Creating containers from scratch"
date: 2022-10-20
description: We will review how containers work and create a containerized process using the unshare Linux command.
tags:
    - container
    - linux
    - os
publish: true
link: https://dev.to/alanpjohn/deep-dive-into-containerization-creating-containers-from-scratch-29dc
---

Containers have changed the landscape for how we design, develop, and deploy your applications. Today, cloud-native technologies are transforming IT ecosystems largely thanks to containerization. In this article, I’ll create a container runtime using shell commands. Ideally, it’s not recommended to implement your own container runtime. This is just to get a better understanding of lower-level Linux functionalities, which will help in

1. Designing more secure images.
2. Using images more efficiently.
3. Debugging while using higher-level tools

# Linux Fundamentals

Before I start the deep dive, you must be familiar with certain Linux concepts.

## Cgroups

Cgroups limit the resources that a group of processes can use, such as memory, CPU, and network input/output. There is a hierarchy of control groups for each resource type, and each hierarchy is managed by a cgroup controller. Any Linux process is a member of one cgroup of each type, and when it is first created, a process inherits the cgroups of its parent.

The Linux kernel communicates information about cgroups through pseudo-filesystems that typically reside at `/sys/fs/cgroup`. You can see the different types of cgroups on your system by listing the contents of that directory.

```bash
user@myPChostname:~$ ls /sys/fs/cgroup/
blkio  cpuacct      cpuset   freezer  memory  net_cls           net_prio    pids  systemd
cpu    cpu,cpuacct  devices  hugetlb  misc    net_cls,net_prio  perf_event  rdma  unified
```

If you have docker installed on the system and look inside the `/sys/fs/cgroup/memory` directory, you’ll find a directory for `docker`. All the files in this directory define different memory limits on your docker containers. You’ll find a similar directory in `/sys/fs/cgroup/cpu` where the CPU limits for your docker containers are defined.

## Namespaces

By putting a process in a namespace, you can restrict the resources visible to that process. 

Linux kernel 5.6 currently provides 8 namespaces:

- **pid** : provides a process with its own set of process IDs
- **net** : allows processes to have their own network stack
- **mnt** : abstracts filesystem view and manages mount points
- **ipc** : provides separation of named shared memory segments
- **user** : provides processes with their own set of user IDs and group IDs
- **uts** : allows processes to have own domain name and hostname
- **cgroup** : allows a process to have its own set of cgroup root directories
- **time** : virtualize the clock of the system

A process is always in exactly one namespace of each type. When you start a Linux system, it has a single namespace of each type. You can easily see the namespaces on your machine using the `lsns` command.

The `unshare` command allows us to create subprocesses that don't share namespaces with their parent process. You can also use the `nsenter` command to specify namespaces for a process. In this article, I’ll stick to using `unshare` .

# Creating a Containerized Process

Containers seem very similar to virtual machines, but it’s crucial to understand that they are very different. While virtual machines emulate a complete machine, including the operating system and a kernel, containers share the kernel of the host machine and, as explained, are only **isolated processes**.

## Hostname

Let’s start by isolating the hostname. If you run the `hostname` command from within a docker container, you can see that it’s a different hostname than your host.

```bash
user@myPChostname:~$ hostname
myPChostname
user@myPChostname:~$ docker run --rm -it --name hello centos bash
[root@f1e54241a12b /]$ hostname
f1e54241a12b
```

To achieve similar isolation, we need to give its own UTS namespace using the `unshare` command.


> 💡 I am running these bash commands on an ubuntu VM created using [multipass](https://multipass.run/).

To create a new UTS namespace, we can use the `--uts` flag with `unshare`.

```bash
ubuntu@host:/$ hostname
host
ubuntu@host:/$ sudo unshare --uts bash
root@host:/$ hostname child
root@host:/$ hostname
child
```

If you were to open another terminal window to the same host before exit, you can confirm that the hostname hasn’t changed for the whole (virtual) machine.

```bash
ubuntu@host:/$ hostname
host
```

## Filesystem

Next, we need to give our containerized process its root filesystem so it does not access the host root. We’ll be using the `--root` option to do that. This will help us assign a directory as the new root. But before we do that, for any directory to be a root directory, it requires a [root filesystem](https://www.ibm.com/docs/pl/aix/7.1?topic=tree-root-file-system) which includes directories such as `/bin`, `/proc` etc. So I am going to download the [alpine minirootfs](https://dl-cdn.alpinelinux.org/alpine/latest-stable/releases/x86_64/alpine-minirootfs-3.15.0-x86_64.tar.gz) to quickly create a minimal root filesystem in my new directory. You can also export root filesystems from existing docker containers if you want.

```bash
ubuntu@host:~$ mkdir container_root
ubuntu@host:~$ cd container_root/
ubuntu@host:~/container_root$ curl -o alpine.tar.gz https://dl-cdn.alpinelinux.org/alpine/latest-stable/releases/x86_64/alpine-minirootfs-3.15.0-x86_64.tar.gz
ubuntu@host:~/container_root$ tar xvf alpine.tar.gz
ubuntu@host:~/container_root$ rm alpine.tar.gz
ubuntu@host:~/container_root$ ls
bin  etc   lib    mnt  proc  run   srv  tmp  var
dev  home  media  opt  root  sbin  sys  usr
```

So now to use the `--root` option with the `unshare` command

```bash
ubuntu@host:/$ sudo unshare --uts \
--root=/home/ubuntu/container_root \
sh
/$ pwd
/
/$ ls /
bin    etc    lib    mnt    proc   run    srv    tmp    var
dev    home   media  opt    root   sbin   sys    usr
```

The root directory of the containerized process is no longer the root directory of our host system. This also means we can’t use the commands from the host machine `/bin` which are not present in the new root filesystem.

```bash
ubuntu@host:/$ sudo unshare --uts \
--root=/home/ubuntu/container_root \
bash
chroot: failed to run command ‘bash’: No such file or directory
```

## Processes

Now, if we run the ps command, as you can see, we can’t see any processes at all. That’s because the ps command runs by listing the `/proc` pseudo-filesystem. All processes have their own directory within the `/proc` . You can run `ls /proc` on your Linux system to see what it looks like. You can read more about the `/proc` filesystem [here](https://www.linux.com/news/discover-possibilities-proc-directory/). 

You can mount `/proc` using the `mount` command or the `--mount-proc` flag.

```bash
ubuntu@host:/$ sudo unshare --uts  \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
/$ ps
PID   USER     TIME  COMMAND
    1 root      0:01 {systemd} /sbin/init
    2 root      0:00 [kthreadd]
    3 root      0:00 [rcu_gp]
    4 root      0:00 [rcu_par_gp]
    6 root      0:00 [kworker/0:0H-kb]
		... <truncated>
```

Now, we can see all the processes running on the host, which is not right. Containers should not be able to access the processes of the host machine. To isolate the host processes, We use the `--pid` flag with `unshare` to get a new PID namespace. Along with that, we also need to use the `--fork` flag. This is useful when creating a new PID namespace as `--fork` runs the specified program as a child process of unshare rather than running it directly.

```bash
ubuntu@host:/$ sudo unshare --uts \
--pid --fork \
--mount-proc=proc \
--root=/home/ubuntu/container_root sh
/$ ps
PID   USER     TIME  COMMAND
    1 root      0:00 sh
    2 root      0:00 ps
```

## Mounts

Now we have our processes isolated. The next namespace we need to look into is the mount namespace. We can do that using the `--mount` flag in the `unshare` command. This isolation is handy in ensuring host directories mounted into containers are not visible from other containers.

```bash
ubuntu@host:~$ sudo unshare --uts \
--pid --fork \
--mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
```

## Networking interfaces

Containers have their own networking interface and routing tables. This requires the process to have a separate network namespace which can be set using the `--net` flag. 

```bash
ubuntu@host:~$ sudo unshare --uts \
--net \
--pid --fork \
--mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
/$ ip a
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

When we create our network namespace, we only have a [loopback interface](https://www.juniper.net/documentation/en_US/junos/topics/concept/interface-security-loopback-understanding.html). The container cannot communicate if it only has a loopback interface. We need to establish a virtual Ethernet interface connecting the container network namespace to the default one. 

While keeping the containerized process running in one terminal. Open another with root privileges. Create a virtual ethernet interface on your host machine. You’ll need to know your container’s PID for that. We can use the `lsns` command to find that.

```bash
ubuntu@host:/$ sudo lsns -t net
        NS TYPE NPROCS   PID USER    NETNSID NSFS COMMAND
4026531992 net      93     1 root unassigned      /sbin/init
4026532193 net       2  2241 root unassigned      unshare --uts --net --pid --fork --mount --mo
ubuntu@host:/$ sudo ip link add ve1 netns 2241 type veth peer name ve2 netns 1
```

Then we need to [get the connection up](https://man7.org/linux/man-pages/man8/ip-link.8.html). On the host machine

```bash
ubuntu@host:/$ sudo ip link set ve2 up
```

In the container process

```bash
/$ sudo ip link set ve1 up
```

Now that the connection is up, we assign IP. on the host machine run

```bash
ubuntu@host:/$ sudo ip addr add 192.168.1.200/24 dev ve2
```

on the container process run

```bash
/$ ip addr add 192.168.1.100/24 dev ve1
```

now you should be able to ping the host from the container and vice versa, allowing your container to communicate with other processes.

## Interprocess communication

Different processes communicate with each other with the help of a shared range of memory. For that, they need to part of the same IPC namespace. We generally wouldn’t want our containers to be able to access one another’s shared memory. In this case, we can use the `--ipc` flag.

```bash
ubuntu@host:~$ sudo unshare --uts \
--net --ipc \
--pid --fork \
--mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
```

## Cgroups

You can use the `--cgroup` flag to create a new cgroup namespace, ensuring that your container process cannot see any higher cgroup configuration.

```bash
ubuntu@host:~$ sudo unshare --uts \
--net --ipc --cgroup \
--pid --fork \
--mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
```

## Users

Currently, the user in the containerized process is the root user because we use sudo.

```bash
ubuntu@host:~$ sudo unshare --uts \
--net --ipc \
--pid --fork \
--cgroup --mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
/ $ id
uid=0(root) gid=0(root) groups=0(root)
```

To prevent this, we create a separate user namespace for the container process with the help of the `--user` flag. 

```bash
ubuntu@host:~$ sudo unshare --user \
--uts --net --ipc \
--pid --fork \
--cgroup --mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
~ $ id
uid=65534(nobody) gid=65534(nobody) groups=65534(nobody)
```

Now the user assigned to the container process is “nobody”. We can map this uid to a non-root user on the host machine by changing the `/proc/<pid>/uid_map`  where `<pid>` is your container process PID. The user namespace is created first when you run `unshare` with the `--user` flag, and you are automatically root in the container user namespace. This means you can create namespaces inside the containerized process while running `unshare` without `sudo` allowing us to run containers without any root privileges. (rootless containers)

```bash
ubuntu@host:~$ unshare --uts \
--net --ipc \
--pid --fork \
--cgroup --mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
unshare: unshare failed: Operation not permitted
ubuntu@host:~$ unshare --user \
--uts --net --ipc \
--pid --fork \
--cgroup --mount \
--mount-proc=proc \
--root=/home/ubuntu/container_root \
sh
~ $ 
```

And here we have our container ready!!

All your container runtime tools are wrappers around these in-built features, which provide more ease and flexibility of configuration.

# More resources

- [Linux Manual - Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [Linux Manual - Unshare](https://man7.org/linux/man-pages/man1/unshare.1.html)
- [Linux Manual - Nsenter](https://man7.org/linux/man-pages/man1/nsenter.1.html)
- [Use of namespaces in containers](https://www.youtube.com/watch?v=MHv6cWjvQjM&t=1316s)
- [Creating OCI bundles](https://chromium.googlesource.com/external/github.com/docker/containerd/+/refs/tags/v0.2.0/docs/bundle.md)
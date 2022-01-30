import {
    SiAmazonaws,
    SiAnsible,
    SiDocker,
    SiFastapi,
    SiGithubactions,
    SiGooglecloud,
    SiGrafana,
    SiJenkins,
    SiKubernetes,
    SiLinux,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPrometheus,
    SiPython,
    SiRedis,
    SiScikitlearn,
    SiTensorflow,
    SiTypescript,
} from "react-icons/si";

export const techStackDetails = [
    {
        id: 1,
        acronym: "CN",
        domain: "Cloud Native",
        tools: [SiDocker, SiKubernetes, SiAnsible, SiLinux],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut pulvinar eros. Integer aliquet ex in mauris pulvinar, a condimentum orci vehicula. Sed fringilla tincidunt augue",
    },
    {
        id: 2,
        acronym: "DEV",
        domain: "Devops",
        tools: [SiGithubactions, SiAmazonaws, SiGooglecloud, SiJenkins],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut pulvinar eros. Integer aliquet ex in mauris pulvinar, a condimentum orci vehicula. Sed fringilla tincidunt augue",
    },
    {
        id: 3,
        acronym: "WEB",
        domain: "Web Dev",
        tools: [SiTypescript, SiNodedotjs, SiPython, SiFastapi, SiNextdotjs],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut pulvinar eros. Integer aliquet ex in mauris pulvinar, a condimentum orci vehicula. Sed fringilla tincidunt augue",
    },
    {
        id: 4,
        acronym: "DB",
        domain: "Databases",
        tools: [SiMongodb, SiRedis, SiMysql],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut pulvinar eros. Integer aliquet ex in mauris pulvinar, a condimentum orci vehicula. Sed fringilla tincidunt augue",
    },
    {
        id: 5,
        acronym: "OTH",
        domain: "Others",
        tools: [SiTensorflow, SiScikitlearn, SiPrometheus, SiGrafana],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut pulvinar eros. Integer aliquet ex in mauris pulvinar, a condimentum orci vehicula. Sed fringilla tincidunt augue",
    },
];

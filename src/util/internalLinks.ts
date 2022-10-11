import { FaCameraRetro } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
    SiDevdotto,
    SiGithub,
    SiGmail,
    SiLinkedin,
    SiTwitter,
} from "react-icons/si";

export type TLink = {
    text: string;
    url: string;
    Icon?: IconType;
};

export const internalLinks: TLink[] = [
    {
        text: "Home",
        url: "/",
    },
    {
        text: "Blog",
        url: "/blog",
    },
    {
        text: "About",
        url: "/about",
    },
    {
        text: "Projects",
        url: "/projects",
    },
];

export const socialLinks: TLink[] = [
    {
        Icon: SiGithub,
        text: "Github",
        url: "https://github.com/alanpjohn",
    },
    {
        Icon: SiLinkedin,
        text: "Linkedin",
        url: "https://www.linkedin.com/in/alan-john-b2b521193/",
    },
    {
        Icon: FaCameraRetro,
        text: "Pictures",
        url: "https://photos.alanjohn.dev",
    },
    {
        Icon: SiDevdotto,
        text: "DevTo",
        url: "https://dev.to/alanpjohn",
    },
    {
        Icon: SiGmail,
        text: "Gmail",
        url: "mailto:alansandra2013@gmail.com",
    },
    {
        Icon: SiTwitter,
        text: "Twitter",
        url: "https://twitter.com/alanpjohn",
    },
];

import { CustomLink } from "@components/link";

import {
    SiBehance,
    SiDevdotto,
    SiGithub,
    SiGmail,
    SiLinkedin,
} from "react-icons/si";

export const quicklinks = [
    {
        Icon: SiGithub,
        text: "Github",
        href: "https://github.com/TheForeverLost",
    },
    {
        Icon: SiLinkedin,
        text: "Linkedin",
        href: "https://www.linkedin.com/in/alan-john-b2b521193/",
    },
    {
        Icon: SiBehance,
        text: "Behance",
        href: "https://www.behance.net/alanjohn8",
    },
    {
        Icon: SiDevdotto,
        text: "DevTo",
        href: "dev.to/theforeverlost",
    },
    {
        Icon: SiGmail,
        text: "Gmail",
        href: "alansandra2013@gmail.com",
    },
];

export const Contact: React.FC = () => (
    <div className="my-6 flex flex-row text-2xl text-secondary dark:text-darksecondary">
        {quicklinks.map(({ Icon, href }, i) => (
            <CustomLink
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`transition-colors hover:text-accent dark:hover:text-darkaccent ${
                    i < quicklinks.length - 1 ? "mr-3" : ""
                }`}
            >
                <Icon />
            </CustomLink>
        ))}
    </div>
);

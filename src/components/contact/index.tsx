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
    <div className="my-2 flex flex-row flex-wrap text-secondary dark:text-darksecondary">
        {quicklinks.map(({ Icon, href }) => (
            <CustomLink
                target="_blank"
                rel="noopener noreferrer nofollow"
                key={Icon.name}
                href={href}
                className="hover:text-orange dark:hover:text-purple font-clash"
            >
                <Icon className="text-2xl hover:text-orange dark:hover:text-purple m-4" />
            </CustomLink>
        ))}
    </div>
);

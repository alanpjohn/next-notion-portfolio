import { CustomLink } from "@components/link";

import { FaCameraRetro } from "react-icons/fa";
import { SiDevdotto, SiGithub, SiGmail, SiLinkedin } from "react-icons/si";

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
        Icon: FaCameraRetro,
        text: "Pictures",
        href: "https://photos.alanjohn.dev",
    },
    {
        Icon: SiDevdotto,
        text: "DevTo",
        href: "https://dev.to/theforeverlost",
    },
    {
        Icon: SiGmail,
        text: "Gmail",
        href: "mailto:alansandra2013@gmail.com",
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

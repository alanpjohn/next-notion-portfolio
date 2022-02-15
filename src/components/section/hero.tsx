import { CustomLink } from "@components/link";
import { Section } from "@components/section";

import {
    SiGithub,
    SiInstagram,
    SiLinkedin,
    SiLinuxfoundation,
} from "react-icons/si";

const quicklinks = [
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
        Icon: SiInstagram,
        text: "Instagram",
        href: "https://www.instagram.com/_alan_not_allen_/",
    },
    {
        Icon: SiLinuxfoundation,
        text: "LF Profile",
        href: "https://openprofile.dev/profile/alanpjohn",
    },
];

export const HeroSection: React.FC = () => {
    return (
        <Section className="border-b-2 border-primary-100 dark:border-darkprimary-100">
            <div className="mx-4 flex flex-col items-start justify-evenly pb-20 pt-40 md:mx-0 md:flex-row md:items-center">
                <div className="flex flex-col">
                    <span className="font-clash text-8xl font-normal">
                        Alan John
                    </span>
                    <span className="font-clash text-4xl font-light md:ml-8">
                        Software Engineer
                    </span>
                </div>
                <div className="my-10 grid grid-flow-row grid-cols-4">
                    {quicklinks.map(({ Icon, href }) => (
                        <CustomLink key={Icon.name} href={href} className="p-4">
                            <Icon className="text-4xl hover:text-accent dark:hover:text-darkaccent" />
                        </CustomLink>
                    ))}
                </div>
            </div>
        </Section>
    );
};

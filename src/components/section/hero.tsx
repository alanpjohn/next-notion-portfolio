import { CustomButton } from "@components/button";
import { quicklinks } from "@components/contact";
import { CustomLink } from "@components/link";
import { Section } from "@components/section";

import { FaArrowDown } from "react-icons/fa";

export const HeroSection: React.FC = () => {
    return (
        <Section className="min-h-screen lg:min-h-0 pt-32 ">
            <div className="my-auto mx-4 flex flex-col items-start justify-end lg:justify-evenly lg:mx-0 lg:flex-row lg:items-center">
                <div className="flex flex-col">
                    <h1 className="font-clash text-9xl font-normal">
                        Alan John
                    </h1>
                    <h2 className="font-clash text-4xl font-light lg:ml-8">
                        Software Engineer
                    </h2>
                </div>
                <div className="my-10 grid grid-flow-row grid-cols-4">
                    {quicklinks.map(({ Icon, href }) => (
                        <CustomLink
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            key={Icon.name}
                            href={href}
                            className="p-4"
                        >
                            <Icon className="text-4xl hover:text-orange dark:hover:text-purple" />
                        </CustomLink>
                    ))}
                </div>
            </div>
            <div className="bottom-0 mx-auto mb-2 block lg:hidden">
                <CustomButton
                    text="Scroll for more"
                    Icon={FaArrowDown}
                    href="#About"
                />
            </div>
        </Section>
    );
};

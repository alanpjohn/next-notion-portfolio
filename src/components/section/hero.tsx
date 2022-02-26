import { CustomButton } from "@components/button";
import { quicklinks } from "@components/contact";
import { CustomLink } from "@components/link";
import { Section } from "@components/section";

import { FaArrowDown } from "react-icons/fa";

import HeroIllustration from "@public/vector/hero.svg";
import SpinnerIllustration from "@public/vector/spinner.svg";

export const HeroSection: React.FC = () => {
    return (
        <Section className="min-h-screen pt-32">
            <div className="w-24 absolute right-8 top-24">
                <SpinnerIllustration id="spinner" />
            </div>
            <div className="my-auto mx-4 flex flex-col-reverse lg:flex-row items-center justify-evenly">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <h1 className="font-clash text-7xl sm:text-9xl font-normal">
                            Alan John
                        </h1>
                        <h2 className="font-clash text-3xl sm:text-5xl font-light lg:ml-8">
                            Software Engineer
                        </h2>
                    </div>
                    <div className="my-10 grid grid-flow-row grid-cols-5 max-w-sm">
                        {quicklinks.slice(0, 5).map(({ Icon, href }) => (
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
                <div className="basis-1/2 hidden lg:block w-full">
                    <div className="m-auto">
                        <HeroIllustration />
                    </div>
                </div>
            </div>
            <div className="bottom-0 mx-auto mb-2">
                <CustomButton
                    text="Scroll for more"
                    Icon={FaArrowDown}
                    href="#About"
                />
            </div>
        </Section>
    );
};

import { quicklinks } from "@components/contact";
import { CustomLink } from "@components/link";
import { Section } from "@components/section";

export const HeroSection: React.FC = () => {
    return (
        <Section className="border-b-2 border-secondary">
            <div className="mx-4 flex flex-col items-start justify-evenly pb-20 pt-40 md:mx-0 md:flex-row md:items-center">
                <div className="flex flex-col">
                    <h1 className="font-clash text-8xl font-normal">
                        Alan John
                    </h1>
                    <h2 className="font-clash text-4xl font-light md:ml-8">
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
        </Section>
    );
};

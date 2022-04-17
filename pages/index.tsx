// import SpinnerIllustration from "@public/vector/spinner.svg";
import { CustomButton } from "@components/button";
import { Layout } from "@components/layout";
import { CustomLink } from "@components/link";
import { Section } from "@components/section";

import { socialLinks } from "@util/config";

import { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
    return (
        <Layout>
            <NextSeo
                title="Home"
                description="2022 Portfolio"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />
            <Section className="mt-32 flex-grow">
                {/* <div className="w-24 absolute right-8 top-32 md:top-24">
                    <SpinnerIllustration id="spinner" />
                </div> */}
                <div className="py-8 my-auto mx-4 flex flex-col lg:flex-row items-center justify-evenly">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <h1 className="font-grotesk text-7xl sm:text-9xl font-normal">
                                Alan John
                            </h1>
                            <h2 className="font-grotesk text-3xl sm:text-5xl font-light">
                                Software Engineer
                            </h2>
                        </div>
                        <div className="my-10 grid grid-flow-row grid-cols-5 max-w-sm mx-auto">
                            {socialLinks.slice(0, 5).map(({ Icon, url }) => (
                                <CustomLink
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    key={Icon.name}
                                    href={url}
                                    className="p-4"
                                >
                                    <Icon
                                        className="text-4xl 
                                    text-jet dark:text-cultured
                                    hover:text-razzmatazz dark:hover:text-purple
                                    "
                                    />
                                </CustomLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-grotesk italic font-light mb-6">
                            Select an option to proceed
                        </span>
                        <div className="grid grid-flow-col grid-rows-4 gap-4">
                            <CustomButton href={"/about"} variant="retro">
                                More about me
                            </CustomButton>
                            <CustomButton href={"/blog"} variant="retro">
                                Check out Blog
                            </CustomButton>
                            <CustomButton
                                href={"photos.alanjohn.dev"}
                                variant="retro"
                            >
                                Explore Pictures
                            </CustomButton>
                            <CustomButton href={"/projects"} variant="retro">
                                My Projects
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Home;

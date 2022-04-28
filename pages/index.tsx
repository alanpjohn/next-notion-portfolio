// import SpinnerIllustration from "@public/vector/spinner.svg";
import { CustomButton } from "@components/button";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { NextPage } from "next";
import { NextSeo } from "next-seo";

import SpinnerIllustration from "@public/vector/spinner.svg";

const Home: NextPage = () => {
    return (
        <Layout>
            <NextSeo
                title="Home"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />
            <Section className="mt-32 flex-grow">
                <div className="w-16 absolute right-8 top-32 md:top-24">
                    <SpinnerIllustration id="spinner" />
                </div>
                <div className="py-8 my-auto mx-4 flex flex-col lg:flex-row items-center justify-evenly">
                    <div className="flex flex-col">
                        <div className="flex flex-col my-8">
                            <h1 className="text-center md:text-left font-display uppercase text-7xl lg:text-8xl xl:text-9xl font-normal">
                                Alan John
                            </h1>
                            <h2 className=" text-center md:text-left font-display text-3xl lg:text-4xl xl:text-5xl font-light">
                                Software Engineer
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-display italic font-light mb-6">
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
                                href={"https://photos.alanjohn.dev"}
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

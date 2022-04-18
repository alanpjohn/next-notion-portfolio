import { CustomButton } from "@components/button";
import { ProjectCard } from "@components/card";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { Project } from "@util/interface";
import { getProjects } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type Props = {
    projects: Project[];
};

const Blog: NextPage<Props> = ({ projects }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="Projects"
                description="2022 Portfolio"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />

            <Section className="pt-16 md:pt-24 flex-grow">
                <div className="my-20 flex flex-col lg:flex-row container">
                    <div className="flex flex-col px-8 lg:basis-1/3">
                        <h1 className="font-grotesk text-4xl md:text-6xl font-light">
                            Projects
                        </h1>
                        <div className="my-4">
                            <p className="md:text-2xl my-4">
                                Here are some of my favourite projects that I
                                have made for either personal, competition or
                                academic purposes. You can check out more at my
                                Github Profile. <br />
                            </p>
                            <CustomButton href="https://dev.to/theforeverlost">
                                Check out Github
                            </CustomButton>
                        </div>
                    </div>
                    <div className="lg:basis-2/3 flex flex-col">
                        {projects.map((post: Project) => (
                            <ProjectCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projects = await getProjects();
    return {
        props: {
            projects: projects,
        },
        revalidate: 86400,
    };
};

export default Blog;

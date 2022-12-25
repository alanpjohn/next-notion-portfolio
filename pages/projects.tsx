import { CustomButton } from "@components/button";
import { ProjectCard } from "@components/card";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { domain } from "@util/config";
import { Project } from "@util/interface";
import { getProjects } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type Props = {
    projects: Project[];
};

const projectsDesc =
    "Here are some of my favourite projects that I have made for either personal, competition or academic purposes.";

const Blog: NextPage<Props> = ({ projects }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="Projects"
                description={projectsDesc}
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
                openGraph={{
                    images: [
                        {
                            url: `${domain}/api/og?title=${"Projects"}&description=${projectsDesc}`,
                            width: 1200,
                            height: 628,
                            alt: "My Portfolio Preview",
                            type: `image/png`,
                        },
                    ],
                }}
            />

            <Section className="pt-16 md:pt-24 flex-grow">
                <div className="my-20 flex flex-col mx-auto">
                    <div className="flex flex-col px-8 lg:w-2/3 mx-auto mb-4">
                        <h1 className="font-sans text-5xl xl:text-7xl font-light">
                            Projects
                        </h1>
                        <div className="my-4">
                            <p className="md:text-2xl my-4 max-w-2xl">
                                Here are some of my favourite projects that I
                                have made for either personal, competition or
                                academic purposes. You can check out more at my
                                Github Profile. <br />
                            </p>
                            <CustomButton href="https://dev.to/alanpjohn">
                                Check out Github
                            </CustomButton>
                        </div>
                    </div>
                    <div className="flex flex-col mx-auto px-8 max-w-7xl">
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

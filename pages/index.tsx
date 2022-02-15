import { Layout } from "@components/layout";
import { AboutSection } from "@components/section/about";
import { HeroSection } from "@components/section/hero";
import { ProjectSection } from "@components/section/projects";
import { SkillsSection } from "@components/section/skills";

import { IProject } from "@util/interface";
import { getPortfolioProjects } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type HomeProps = {
    projects: IProject[];
};

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
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
            <HeroSection />
            <AboutSection />
            <ProjectSection projects={projects} />
            <SkillsSection />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const response = await getPortfolioProjects();
    return {
        props: {
            projects: response,
        },
        revalidate: 86400,
    };
};

export default Home;

import { Layout } from "@components/layout";
import { AboutSection } from "@components/section/about";
import { HeroSection } from "@components/section/hero";
import { ProjectSection } from "@components/section/projects";
import { SkillsSection } from "@components/section/skills";

import { BlockWithChildren, IProject } from "@util/interface";
import { getPortfolioProjects, getSkills } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type HomeProps = {
    projects: IProject[];
    skillsdata: BlockWithChildren[];
};

const Home: NextPage<HomeProps> = ({ projects, skillsdata }: HomeProps) => {
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
            <SkillsSection skillsdata={skillsdata} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const projects = await getPortfolioProjects();
    const skills = await getSkills();
    return {
        props: {
            projects: projects,
            skillsdata: skills,
        },
        revalidate: 86400,
    };
};

export default Home;

import { Layout } from "@components/layout";
import { AboutSection } from "@components/section/about";
import { HeroSection } from "@components/section/hero";
import { ProjectSection } from "@components/section/projects";

import { IProfile, IProject } from "@util/interface";
import { getPortfolioProjects, getProfile } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type HomeProps = {
    projects: IProject[];
    profile: IProfile;
};

const Home: NextPage<HomeProps> = ({ projects, profile }: HomeProps) => {
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
            <AboutSection profileData={profile} />
            <ProjectSection projects={projects} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const projects = await getPortfolioProjects();
    const profile = await getProfile();

    return {
        props: {
            projects: projects,
            profile: profile,
        },
        revalidate: 86400,
    };
};

export default Home;

import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { CustomImage } from "@components/image";
import { GetStaticProps, NextPage } from "next";
import { getPortfolioProjects } from "@util/notion";
import { IProject } from "@util/interface";
import { ProjectPanel, TechStack } from "@components/panel";
import { HeroSection } from "@components/section/hero";
import { Parallax } from "@components/parallax";

type HomeProps = {
    projects: IProject[];
};

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <HeroSection />
            <Section title="About">
                <div className="home-section">
                    <div className="flex flex-col md:w-1/2">
                        <span className="section-title">About me</span>
                        <Parallax range={[0, -0.15]} className="m-auto">
                            <CustomImage
                                src="/images/home_light.png"
                                height="400px"
                                width="400px"
                            />
                        </Parallax>
                    </div>
                    <div className="md:w-1/2">
                        <div className="home-text">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut sit amet quam in leo
                                molestie elementum. Mauris eleifend pretium
                                sapien. Aenean ac sagittis purus. Nam eget
                                dictum magna. Integer molestie neque eu odio
                                vehicula dapibus. Proin ullamcorper diam quis
                                consectetur porttitor. Quisque id ex non mi
                                efficitur dictum nec viverra ligula. Nam
                                pulvinar quis diam non tempor. <br />
                            </p>
                            <p>
                                Proin nec justo egestas, tincidunt purus sit
                                amet, maximus orci. Phasellus interdum interdum
                                turpis, a porttitor ex sagittis vel. Cras vel
                                enim vel turpis interdum aliquam. Curabitur
                                pulvinar elementum est, eget sodales magna
                                tristique eu. Curabitur suscipit ut arcu non
                                suscipit. Fusce id enim tempus, mollis enim ac,
                                suscipit ante.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
            <Section title="Portfolio">
                <div className="home-section-reverse">
                    <div className="flex md:ml-2 md:mt-12 md:w-3/5">
                        <ProjectPanel projects={projects} />
                    </div>
                    <div className="flex flex-col md:w-2/5">
                        <Parallax range={[0, -0.15]} className="mb-8">
                            <span className="section-title">
                                Featured Projects
                            </span>
                            <div className="home-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut sit amet quam in leo
                                    molestie elementum. Mauris eleifend pretium
                                    sapien. Aenean ac sagittis purus. Nam eget
                                    dictum magna. Integer molestie neque eu odio
                                    vehicula dapibus. Proin ullamcorper diam
                                    quis consectetur porttitor. Quisque id ex
                                    non mi efficitur dictum nec viverra ligula.
                                    Nam pulvinar quis diam non tempor. <br />
                                </p>
                            </div>
                        </Parallax>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="home-section">
                    <div className="flex flex-col md:w-1/3">
                        <Parallax range={[0, -0.15]} className="mb-8">
                            <span className="section-title">Skillset</span>
                            <div className="home-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut sit amet quam in leo
                                    molestie elementum. Mauris eleifend pretium
                                    sapien. Aenean ac sagittis purus. Nam eget
                                    dictum magna. Integer molestie neque eu odio
                                    vehicula dapibus. Proin ullamcorper diam
                                    quis consectetur porttitor. Quisque id ex
                                    non mi efficitur dictum nec viverra ligula.
                                    Nam pulvinar quis diam non tempor. <br />
                                </p>
                            </div>
                        </Parallax>
                    </div>
                    <div className="flex justify-center md:w-2/3">
                        <TechStack />
                    </div>
                </div>
            </Section>
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

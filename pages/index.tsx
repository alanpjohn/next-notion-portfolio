import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { CustomImage } from "@components/image";
import { GetStaticProps, NextPage } from "next";
import { getPortfolioProjects } from "@util/notion";
import { IProject } from "@util/interface";
import { ProjectPanel, TechStack } from "@components/panel";

type HomeProps = {
    projects: IProject[];
};

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <Section className="justify-center min-h-screen">
                <div className="flex w-1/2 flex-col m-auto">
                    <div className="flex-grow flex flex-col">
                        <span className="font-clash text-6xl lg:text-9xl font-medium">
                            Alan John
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light self-center">
                            Software
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light self-center -mt-2 lg:-mt-8">
                            Engineer
                        </span>
                    </div>
                </div>
            </Section>
            <Section title="About">
                <span className="font-clash text-8xl font-light md:w-1/3 text-center my-6">
                    About me
                </span>
                <div className="flex flex-col md:flex-row md:columns-2 w-11/12 mx-auto">
                    <div className="flex md:w-1/2">
                        <div className="m-auto">
                            <CustomImage
                                src="/images/home_light.png"
                                height="400px"
                                width="400px"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="py-20 text-xl">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut sit amet quam in leo
                                molestie elementum. Mauris eleifend pretium
                                sapien. Aenean ac sagittis purus. Nam eget
                                dictum magna. Integer molestie neque eu odio
                                vehicula dapibus. Proin ullamcorper diam quis
                                consectetur porttitor. Quisque id ex non mi
                                efficitur dictum nec viverra ligula. Nam
                                pulvinar quis diam non tempor.
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
            <Section title="skills" className="mt-16">
                <div className="flex flex-col lg:flex-row lg:columns-3 w-11/12 mx-auto">
                    <div className="flex lg:w-2/5 lg:order-1">
                        <ProjectPanel projects={projects} />
                    </div>
                    <div className="order-first lg:order-2 lg:w-1/5 flex">
                        <span className="m-auto">Code</span>
                    </div>
                    <div className="flex lg:w-2/5 lg:order-3">
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
    };
};

export default Home;

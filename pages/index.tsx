import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { CustomImage } from "@components/image";
import { GetStaticProps, NextPage } from "next";
import { getPortfolioProjects } from "@util/notion";
import { IProject } from "@util/interface";
import { ProjectPanel } from "@components/panel";
import { PrimaryButton } from "@components/button";
import { FaCamera, FaGoogleDrive } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import {
    SiGithub,
    SiGmail,
    SiInstagram,
    SiLinkedin,
    SiLinuxfoundation,
    SiTelegram,
} from "react-icons/si";

type HomeProps = {
    projects: IProject[];
};

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <Section className="justify-center min-h-screen">
                <div className="flex w-1/2 flex-col m-auto lg:mt-auto mt-32">
                    <div className="flex-grow flex flex-col">
                        <span className="font-clash text-7xl lg:text-9xl font-medium">
                            Alan John
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light self-center">
                            Software
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light self-center -mt-2 lg:-mt-8">
                            Engineer
                        </span>
                    </div>
                    <div className="flex flex-row flex-wrap content-between lg:mt-16">
                        <PrimaryButton
                            Icon={FaGoogleDrive}
                            text="Download Resume"
                            href=""
                        />
                        <PrimaryButton
                            Icon={BiNews}
                            text="Check out Blog"
                            href=""
                        />
                        <PrimaryButton
                            Icon={FaCamera}
                            text="Photography"
                            href=""
                        />
                        <PrimaryButton Icon={SiGithub} text="Github" href="" />
                        <PrimaryButton
                            Icon={SiLinkedin}
                            text="Linkedin"
                            href=""
                        />
                        <PrimaryButton
                            Icon={SiLinuxfoundation}
                            text="OpenDev Profile"
                            href=""
                        />
                        <PrimaryButton
                            Icon={SiTelegram}
                            text="Telegram"
                            href=""
                        />
                        <PrimaryButton
                            Icon={SiInstagram}
                            text="Instagram"
                            href=""
                        />
                        <PrimaryButton Icon={SiGmail} text="Email" href="" />
                    </div>
                    <div></div>
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
                            <p className="py-4">
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
                            <p className="py-4">
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
            <Section title="skills" className="mt-16 mb-32">
                <div className="flex flex-col-reverse md:flex-row md:columns-2 w-11/12 mx-auto">
                    <div className="md:w-3/5 px-8">
                        <ProjectPanel projects={projects} />
                    </div>
                    <div className="md:flex-grow md:w-2/5 align-bottom">
                        <span className="inline-block font-clash text-8xl font-light text-left md:text-right my-6">
                            My Projects
                        </span>
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

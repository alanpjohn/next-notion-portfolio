import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { CustomImage } from "@components/image";
import { GetStaticProps, NextPage } from "next";
import { getPortfolioProjects } from "@util/notion";
import { IProject } from "@util/interface";
import { ProjectPanel, TechStack } from "@components/panel";
import { HeroSection } from "@components/section/hero";
import { CustomLink } from "@components/link";
import { PrimaryButton } from "@components/button";
import { FaFileDownload, FaGithub } from "react-icons/fa";

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
                        <div className="m-auto">
                            <CustomImage
                                altText="Alan John"
                                src="/images/home_light.png"
                                height="400px"
                                width="400px"
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2">
                        <div className="home-text m-auto">
                            <p>
                                Hi, I am a software engineer working at HSBC
                                currently based in Shillong, India. I am BE
                                Computer Engineering Graduate from{" "}
                                <CustomLink href="https://www.aitpune.com/">
                                    Army Insitute of Techology, Pune
                                </CustomLink>{" "}
                                (Affliated with Savitribai Phule Pune
                                University). I developed an interest in
                                computers during my school days. During my
                                undergraduate, I had the chance to explore many
                                technologies at the end of which I got hooked to
                                cloud native technologies and DevSecOps and
                                always am looking for an opportunity to work
                                with them.
                            </p>
                            <p>
                                There are few things I enjoy more than bringing
                                ideas to life using the best of my knowledge.
                                Regardless of the project, I take special care
                                of code quality, workflows, repository
                                organisation and documentation. I have had the
                                opportunity to work with a plethora of tech
                                stacks and I hope the list keeps growing. Always
                                looking forward to contributing to open source
                                projects and networking through communities.
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
                        <div className="mb-8">
                            <span className="section-title">
                                Featured Projects
                            </span>
                            <div className="home-text">
                                <p>
                                    Here are some of my favourite projects that
                                    I have made for either personal, competition
                                    or academic purposes. You can check out more
                                    at my Github Profile.
                                    <div className="float-right py-4">
                                        <PrimaryButton
                                            text={"Go to Github"}
                                            Icon={FaGithub}
                                            href="https://github.com/TheForeverLost"
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="home-section">
                    <div className="flex flex-col md:w-1/3">
                        <div className=" mb-8">
                            <span className="section-title">Skillset</span>
                            <div className="home-text">
                                <p>
                                    My go-to tech stack right now would be
                                    NextJS for frontend and FastAPI and/or gRPC
                                    to make my microservices architecture
                                    deployed with the help of a kubernetes
                                    service provider. Outside of tech, I am
                                    comfortable with adobe tools such as
                                    Photoshop, Lightroom and Illustrator.
                                    <div className="float-right py-4">
                                        <PrimaryButton
                                            text={"Download Resume"}
                                            Icon={FaFileDownload}
                                            href="https://drive.google.com/file/d/1OAWqwJ6cXa4yS0vrsdn-Ni3lAtw8aNA3/view?usp=sharing"
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>
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

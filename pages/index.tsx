import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { CustomImage } from "@components/image";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <Section className="justify-center min-h-screen">
                <div className="flex flex-col">
                    <div className="flex-grow flex flex-col m-auto">
                        <span className="font-clash text-6xl lg:text-9xl font-medium mx-auto">
                            Alan John
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light mx-auto">
                            Software
                        </span>
                        <span className="font-clash text-6xl lg:text-9xl font-light mx-auto -mt-2 lg:-mt-8">
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
        </Layout>
    );
};

export default Home;

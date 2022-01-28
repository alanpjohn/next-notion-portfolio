import React from "react";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

const Home: React.FC = () => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <Section>
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
        </Layout>
    );
};

export default Home;

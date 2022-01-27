import React from "react";
import { Layout } from "@components/layout";
import { Marquee } from "@components/marquee";

const Home: React.FC = () => {
    return (
        <Layout title="Home" description="2022 Portfolio">
            <section className="flex flex-col w-full pt-14 lg:pt-32 h-screen">
                <div className="container flex flex-col mx-auto items-start">
                    <span className="font-clash text-6xl lg:text-9xl font-medium mx-auto">
                        {" "}
                        Alan John
                    </span>
                    <span className="font-clash text-6xl lg:text-9xl font-light mx-auto">
                        {" "}
                        Software
                    </span>
                    <span className="font-clash text-6xl lg:text-9xl font-light mx-auto -mt-2 lg:-mt-8">
                        {" "}
                        Engineer
                    </span>
                </div>
            </section>
        </Layout>
    );
};

export default Home;

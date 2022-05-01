import { CustomButton } from "@components/button";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { NextPage } from "next";

const PageNotFound404: NextPage = () => {
    return (
        <Layout>
            <Section className="flex-grow">
                <div className="py-8 my-auto mx-4 flex flex-col items-center justify-evenly">
                    <span className="font-display text-9xl">404</span>
                    <span className="font-display my-4 text-xl">
                        You seemed to have lost your way
                    </span>
                    <CustomButton href={"/"}>Take me home</CustomButton>
                </div>
            </Section>
        </Layout>
    );
};

export default PageNotFound404;

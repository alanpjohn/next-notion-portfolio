import { CustomButton } from "@components/button";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { NextPage } from "next";

type ErrorProps = {
    statusCode: number;
};

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
    return (
        <Layout>
            <Section className="flex-grow">
                <div className="py-8 my-auto mx-4 flex flex-col items-center justify-evenly">
                    <span className="font-display text-9xl">{statusCode}</span>
                    <span className="font-display my-4 text-xl">
                        Oops, something went wrong on the server
                    </span>
                    <span className="font-display mb-4 text-xl">
                        It{"'"}s not you, it{"'"}s me
                    </span>
                    <CustomButton href={"/"}>Take me home</CustomButton>
                </div>
            </Section>
        </Layout>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode: statusCode };
};

export default Error;

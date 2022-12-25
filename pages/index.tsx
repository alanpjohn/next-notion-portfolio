// import SpinnerIllustration from "@public/vector/spinner.svg";
import { HomeButton } from "@components/button/home";
import { CustomImage } from "@components/image";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { domain } from "@util/config";
import { getPreviewImage } from "@util/preview-image";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { PreviewImage } from "notion-types";

type Props = {
    preview: PreviewImage;
};

const Home: NextPage<Props> = ({ preview }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="Home"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />
            <Section className="mt-32 lg:mt-24 flex-grow mx-auto justify-center">
                <div className="flex flex-col font-sans px-4">
                    <h1
                        className="text-2xl lg:text-4xl 
                        font-light pr-12 mb-4 pb-2 w-min whitespace-nowrap border-dotted
                        border-b-4 border-accent-alternate"
                    >
                        Alan John
                    </h1>
                    <h2 className="text-3xl md:text-7xl md:pl-4 whitespace-pre-wrap">
                        Software Developer
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row mx-auto mt-6">
                    <div className="md:row-span-2 max-w-sm p-4 mr-4">
                        <CustomImage
                            alt="Alan John"
                            src="/images/Alan.jpg"
                            height={preview.originalHeight}
                            width={preview.originalWidth}
                            placeholder="blur"
                            blurDataURL={preview.dataURIBase64}
                        />
                    </div>
                    <HomeButton
                        href={"/about"}
                        title={"about"}
                        subtitle={"There is more to him"}
                        description={
                            "Considering this page does not have much about him"
                        }
                    />
                    <HomeButton
                        href={"/blog"}
                        title={"blog"}
                        subtitle={"He writes"}
                        description={"He ought to be more regular with it"}
                    />
                    <HomeButton
                        href={"https://photos.alanjohn.dev"}
                        title={"Photos"}
                        subtitle={"He clicks pictures"}
                        description={
                            "He is trying his best to be artsy about it"
                        }
                    />
                    <HomeButton
                        href={"/projects"}
                        title={"projects"}
                        subtitle={"He has projects"}
                        description={"Surprise, surprise"}
                    />
                </div>
            </Section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const preview = await getPreviewImage(domain + "/images/Alan.jpg", {
        cacheKey: "home",
    });

    return {
        props: {
            preview: preview,
        },
        revalidate: 86400,
    };
};

export default Home;

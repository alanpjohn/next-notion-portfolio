import { CustomButton } from "@components/button";
import { Layout } from "@components/layout";
import { PostPanel } from "@components/panel";
import { Section } from "@components/section";

import { IPost } from "@util/interface";
import { getBlogPosts } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { SiDevdotto } from "react-icons/si";

type BlockPageProps = {
    posts: IPost[];
};

const BlogPage: NextPage<BlockPageProps> = ({ posts }: BlockPageProps) => {
    return (
        <Layout>
            <NextSeo
                title="Blog"
                description="My engineering blog"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native, Blog",
                    },
                ]}
            />
            <Section className="pt-16 md:pt-24 min-h-screen">
                <div className="my-20 mx-auto flex w-11/12 flex-col xl:columns-2 xl:flex-row">
                    <div className="flex flex-col xl:w-1/3">
                        <span className="section__heading">My Blog</span>
                        <div className="section__desc my-4">
                            <p className="md:text-2xl my-4">
                                Sharing ideas and project case studies. Usually
                                read a lot on devops and cloud native patterns
                                so would pen down some articles on that as well.{" "}
                                <br />
                            </p>
                            <CustomButton
                                Icon={SiDevdotto}
                                href="https://dev.to/theforeverlost"
                                text="Read on Dev.to"
                            />
                        </div>
                    </div>
                    <div className="flex-grow px-2">
                        <PostPanel posts={posts} />
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<BlockPageProps> = async () => {
    const posts = await getBlogPosts();

    return {
        props: {
            posts: posts,
        },
        revalidate: 3600,
    };
};

export default BlogPage;

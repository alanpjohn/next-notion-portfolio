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
            <Section className="pt-16 md:pt-24">
                <div className="blog-section">
                    <div className="blog-hero">
                        <span className="blog-title">My Blog</span>
                        <div className="introduction">
                            <p>
                                Sharing ideas and project case ideas. Usually
                                read a lot on linux and cloud native patterns so
                                would share some articles on that as well.{" "}
                                <br />
                            </p>
                            <CustomButton
                                Icon={SiDevdotto}
                                href="https://dev.to/theforeverlost"
                                text="Read on Dev.to"
                            />
                        </div>
                    </div>
                    <div className="blog-main">
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

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
                <div className="my-20 flex flex-col lg:flex-row container">
                    <div className="flex flex-col px-8 lg:basis-1/3">
                        <span className="section__heading">My Blog</span>
                        <div className="section__desc my-4">
                            <p className="md:text-2xl my-4">
                                Sharing ideas, theoretical topics, case studies,
                                latest opensource tools and cloud native
                                projects that I come across <br />
                            </p>
                            <CustomButton
                                Icon={SiDevdotto}
                                href="https://dev.to/theforeverlost"
                                text="Read on Dev.to"
                            />
                        </div>
                    </div>
                    <div className="lg:basis-2/3">
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

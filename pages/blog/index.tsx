import { CustomButton } from "@components/button";
import { BlogCard } from "@components/card";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { BlogArticle } from "@util/interface";
import { getMdBlogPosts } from "@util/markdown";
import { getBlogPosts } from "@util/notion";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

type Props = {
    posts: BlogArticle[];
};

const Blog: NextPage<Props> = ({ posts }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="Blog"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native, Blog",
                    },
                ]}
            />
            <Section className="pt-16 md:pt-24 flex-grow">
                <div className="my-20 flex flex-col lg:flex-row container">
                    <div className="flex flex-col px-8 lg:basis-1/3">
                        <h1 className="font-sans text-5xl xl:text-7xl font-light">
                            My Blog
                        </h1>
                        <div className="my-4">
                            <p className="md:text-2xl my-4 max-w-2xl">
                                Sharing ideas, theoretical topics, case studies,
                                latest opensource tools and cloud native
                                projects that I come across <br />
                            </p>
                            <CustomButton href="https://dev.to/alanpjohn">
                                Check out dev.to
                            </CustomButton>
                        </div>
                    </div>
                    <div className="lg:basis-2/3 flex flex-col">
                        {posts.map((post: BlogArticle) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const posts = await getBlogPosts();
    const mdPosts = await getMdBlogPosts();
    // const mdPosts = []
    const allPosts = mdPosts.concat(posts);
    return {
        props: {
            posts: allPosts,
        },
        revalidate: 3600,
    };
};

export default Blog;

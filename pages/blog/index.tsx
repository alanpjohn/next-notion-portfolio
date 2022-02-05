import { Layout } from "@components/layout";
import { PostPanel } from "@components/panel";
import { Parallax } from "@components/parallax";
import { Section } from "@components/section";
import { IPost } from "@util/interface";
import { getBlogPosts } from "@util/notion";
import { GetStaticProps, NextPage } from "next";

type BlockPageProps = {
    posts: IPost[];
};

const BlogPage: NextPage<BlockPageProps> = ({ posts }: BlockPageProps) => {
    return (
        <Layout title="Blog" description="My engineering blog">
            <Section>
                <div className="blog-section">
                    <Parallax range={[0, -0.5]} className="blog-hero">
                        <span className="blog-title">My Blog</span>
                        <div className="introduction">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut sit amet quam in leo
                                molestie elementum. Mauris eleifend pretium
                                sapien. Aenean ac sagittis purus. Nam eget
                                dictum magna. Integer molestie neque eu odio
                                vehicula dapibus. Proin ullamcorper diam quis
                                consectetur porttitor. Quisque id ex non mi
                                efficitur dictum nec viverra ligula. Nam
                                pulvinar quis diam non tempor. <br />
                            </p>
                        </div>
                    </Parallax>
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

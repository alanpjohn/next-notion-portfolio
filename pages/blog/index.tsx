import { PostCard } from "@components/card";
import { Layout } from "@components/layout";
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
                <div className="flex flex-col md:flex-row md:columns-2 my-40 w-11/12 mx-auto">
                    <div className="flex-shrink">
                        <span className="font-clash text-8xl font-semibold text-center mx-auto w-full">
                            My Blog
                        </span>
                    </div>
                    <div className="flex-grow">
                        {posts.map((post) => (
                            <PostCard
                                id={post.id}
                                key={post.id}
                                url={post.url}
                                properties={post.properties}
                            />
                        ))}
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
    };
};

export default BlogPage;

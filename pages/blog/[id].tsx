import { Tag } from "@components/card";
import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { getMonthAndYear } from "@util/datetime";
import { IPost, BlockWithChildren, ITag } from "@util/interface";
import { getBlogPosts, getPostBlocks, readPost } from "@util/notion";
import { renderPage } from "@util/render";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "querystring";

type PostProps = {
    post: IPost;
    blocks: BlockWithChildren[];
};

const PostPage: NextPage<PostProps> = ({ post, blocks }: PostProps) => {
    if (!post) {
        return <></>;
    }
    return (
        <Layout>
            <NextSeo
                title={post.title}
                description={post.description}
                openGraph={{
                    article: {
                        publishedTime: post.date,
                        authors: ["Alan P John"],
                        section: "Software",
                        tags: post.tags.map((tag) => tag.name),
                    },
                }}
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content: post.tags.map((tag) => tag.name).join(", "),
                    },
                ]}
            />
            <Section className="pt-30">
                <div className="post-section">
                    <div className="post-hero">
                        <span className="post-title">{post.title}</span>
                        <div className="py-4">
                            {post.tags.map((tag: ITag) => (
                                <Tag key={tag.id} {...tag} />
                            ))}
                        </div>
                        <p className="post-date">
                            Last updated: {getMonthAndYear(post.date)}
                        </p>
                        <p className="post-desc">{post.description}</p>
                    </div>
                    <div className="post-main">{renderPage(blocks)}</div>
                </div>
            </Section>
        </Layout>
    );
};

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
    const { id } = context.params as IParams;
    const post = readPost(id);
    if (post) {
        const blocks = await getPostBlocks(post.id);
        return {
            props: {
                post: post,
                blocks: blocks,
            },
            revalidate: 3600,
        };
    } else {
        return {
            notFound: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getBlogPosts();
    return {
        paths: posts.map((post: IPost) => ({ params: { id: post.url } })),
        fallback: true,
    };
};

export default PostPage;

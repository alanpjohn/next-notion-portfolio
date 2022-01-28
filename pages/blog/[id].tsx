import { Tag } from "@components/card";
import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { getMonthAndYear } from "@util/datetime";
import { IPost, IBlock, ITag } from "@util/interface";
import { getBlogPostContent, getBlogPosts, readPost } from "@util/notion";
import { renderPage } from "@util/render";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type PostProps = {
    post: IPost;
    blocks: IBlock[];
};

const PostPage: NextPage<PostProps> = ({ post, blocks }: PostProps) => {
    if (!post) {
        return <></>;
    }
    return (
        <Layout
            title={post.properties.title}
            description={post.properties.description}
        >
            <Section>
                <div className="flex flex-col 2xl:flex-row 2xl:columns-2 my-40 w-11/12 mx-auto">
                    <div className="flex-1 px-20 2xl:px-4 py-20">
                        <span className="font-clash text-4xl md:text-5xl font-light text-center mx-auto w-full">
                            {post.properties.title}
                        </span>
                        <div className="pb-4">
                            {post.properties.tags.map((tag: ITag) => (
                                <Tag key={tag.id} {...tag} />
                            ))}
                        </div>
                        <p className="font-cabinet font-light mt-2 text:md md:text-xl">
                            Last updated:{" "}
                            {getMonthAndYear(post.properties.date)}
                        </p>
                        <p className="font-cabinet font-light mt-8 text-lg md:text-2xl">
                            {post.properties.description}
                        </p>
                    </div>
                    <div className="flex-grow flex justify-center 2xl:ml-4">
                        {renderPage(blocks)}
                    </div>
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
        const blocks = await getBlogPostContent(post.id);
        const childBlocks = await Promise.all(
            blocks
                .filter((block) => block.has_children)
                .map(async (block) => {
                    return {
                        id: block.id,
                        children: await getBlogPostContent(block.id),
                    };
                }),
        );
        const blocksWithChildren: IBlock[] = blocks.map((ablock) => {
            const block = JSON.parse(JSON.stringify(ablock));
            if (block.has_children && !block[block.type].children) {
                block[block.type]["children"] = childBlocks.find(
                    (x) => x.id === block.id,
                )?.children;
            }
            return block;
        });
        return {
            props: {
                post: post,
                blocks: blocksWithChildren,
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

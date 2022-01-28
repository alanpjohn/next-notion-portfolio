import { Layout } from "@components/layout";
import { Section } from "@components/section";
import { IPost, IBlock } from "@util/interface";
import { getBlogPostContent, readFromCache, readPost } from "@util/notion";
import { renderPage } from "@util/render";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type PostProps = {
    post: IPost;
    blocks: IBlock[];
};

const PostPage: NextPage<PostProps> = ({ post, blocks }: PostProps) => {
    return (
        <Layout
            title={post.properties.title}
            description={post.properties.description}
        >
            <Section>
                <div className="flex flex-col md:flex-row md:columns-2 my-40 w-11/12 mx-auto">
                    <div className="w-1/3 px-4">
                        <span className="font-clash text-5xl font-light text-center mx-auto w-full">
                            {post.properties.title}
                        </span>
                    </div>
                    <div className="flex-grow">{renderPage(blocks)}</div>
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
    const posts = readFromCache();
    return {
        paths: posts.map((post: IPost) => ({ params: { id: post.url } })),
        fallback: true,
    };
};

export default PostPage;

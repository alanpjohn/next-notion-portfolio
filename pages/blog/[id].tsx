import { Tag } from "@components/card";
import { Layout } from "@components/layout";
import { CustomLink } from "@components/link";
import CustomArticleJsonLd from "@components/meta";
import { RenderedPageContent } from "@components/notion";
import { Section } from "@components/section";

import { getMonthAndYear } from "@util/datetime";
import { BlockWithChildren, IPost, ITag } from "@util/interface";
import { getBlogPosts, getPostBlocks, readPost } from "@util/notion";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { FaLink } from "react-icons/fa";

type PostProps = {
    post: IPost;
    blocks: BlockWithChildren[];
};

const PostPage: NextPage<PostProps> = ({ post, blocks }: PostProps) => {
    if (!post) {
        return <></>;
    }
    const image = post.cover;
    let src = "";
    if (image) {
        src = image.type == "external" ? image.external.url : image.file.url;
    }

    const url = "https://www.alanjohn.dev.dev/" + post.url;
    const truncated =
        post.description.length > 110
            ? post.description.substring(0, 110)
            : post.description;

    return (
        <Layout>
            <NextSeo
                title={post.title}
                description={post.description}
                openGraph={{
                    title: post.title,
                    description: post.description,
                    url: "https://www.example.com/articles/article-title",
                    type: "article",
                    article: {
                        publishedTime: post.publishDate,
                        modifiedTime: post.modifiedDate,
                        section: "Software",
                        authors: ["https://www.alanjohn.dev.dev"],
                        tags: post.tags.map((tag) => tag.name),
                    },
                }}
            />
            <CustomArticleJsonLd
                type="BlogPosting"
                url={url}
                title={post.title}
                images={
                    post.cover
                        ? [src]
                        : [
                              "https://www.alanjohn.dev.dev/images/social_media_preview.png",
                          ]
                }
                datePublished={post.publishDate}
                dateModified={post.modifiedDate}
                authorName={{
                    "@type": "person",
                    name: "Alan John",
                    url: "https://www.linkedin.com/in/alan-john-b2b521193",
                }}
                description={truncated}
            />
            <Section>
                <div className="container px-4 my-20">
                    {image ? (
                        <div className="mx-auto w-full max-w-3xl">
                            <figure className="blog__image">
                                <Image
                                    src={src}
                                    layout="fill"
                                    className="image saturate-50"
                                    alt="Cover"
                                    priority
                                />
                            </figure>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="w-full max-w-xl mx-auto px-2 whitespace-pre-wrap my-10">
                        <span className="my-2 font-clash text-3xl md:text-4xl lg:text-5xl font-light">
                            {post.title}
                        </span>
                        <div className="py-4 flex flex-wrap">
                            {post.tags.map((tag: ITag) => (
                                <Tag key={tag.id} {...tag} />
                            ))}
                        </div>
                        <p className="font-clash">
                            Published on: {getMonthAndYear(post.publishDate)}
                        </p>
                        {post.publishDate != post.modifiedDate && (
                            <p className="font-clash">
                                Last updated:{" "}
                                {getMonthAndYear(post.modifiedDate)}
                            </p>
                        )}
                        {post.link && (
                            <div className="flex flex-row items-center text-sm my-2">
                                <FaLink className="text-jet dark:text-cultured mx-1" />
                                <CustomLink href={post.link}>
                                    Read this elsewhere
                                </CustomLink>
                            </div>
                        )}
                        <p className="mt-4 text-base font-light md:w-4/5 lg:w-3/4 border-l-8 px-2 border-secondary">
                            {post.description}
                        </p>
                    </div>
                    <RenderedPageContent blocks={blocks} />
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

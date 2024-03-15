import { Tag } from "@components/card/tag";
import { CustomLink } from "@components/link";
import { MarkdownPage } from "@components/markdown";
import CustomArticleJsonLd from "@components/meta";

import { domain } from "@util/config";
import { generateSiteMap } from "@util/generate-sitemap";
import { getSocialImageUrl } from "@util/get-social-image";
import { BlogArticle } from "@util/interface";
import {
    getMdBlogPosts,
    getMdPostByCanonical,
    getMdPostContentBySlug,
} from "@util/markdown";
import { getDomainName } from "@util/router";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "querystring";

type Props = {
    post: BlogArticle;
    markdown?: string;
};

const Page: NextPage<Props> = ({ post, markdown }: Props) => {
    if (!post) {
        return <></>;
    }
    const truncated =
        post.description.length > 110
            ? post.description.substring(0, 110)
            : post.description;
    const socialimageurl = getSocialImageUrl(
        post.title,
        post.tags.map((tag) => tag.name),
        post.publishDate || post.modifiedDate,
    );
    const url = domain + "/blog/" + post.url;
    const headerComponents = (
        <>
            <NextSeo
                title={post.title}
                description={post.description}
                openGraph={{
                    title: post.title,
                    description: post.description,
                    url: url,
                    type: "article",
                    article: {
                        publishedTime: post.publishDate,
                        modifiedTime: post.modifiedDate,
                        section: "Software",
                        authors: ["https://www.alanjohn.dev"],
                        tags: post.tags.map((tag) => tag.name),
                    },
                    images: [
                        {
                            url: socialimageurl,
                            width: 1200,
                            height: 628,
                            alt: "My Portfolio Preview",
                            type: "image/png",
                        },
                    ],
                }}
                canonical={url}
            />
            <CustomArticleJsonLd
                type="BlogPosting"
                url={url}
                title={post.title}
                images={[socialimageurl]}
                datePublished={post.publishDate}
                dateModified={post.modifiedDate}
                authorName={{
                    "@type": "person",
                    name: "Alan John",
                    url: "https://alanjohn.dev",
                }}
                description={truncated}
            />
            <span className="flex font-normal">{post.title}</span>
            <span className="flex text-base font-sans mt-4">
                Published on {post.publishDate || post.modifiedDate}
            </span>
            {post.publishDate != post.modifiedDate && (
                <span className="flex text-base font-sans">
                    Updated on {post.modifiedDate}
                </span>
            )}

            {post.link && (
                <CustomLink href={post.link}>
                    <span className="text-base">
                        Read on {getDomainName(post.link)}
                    </span>
                </CustomLink>
            )}
            {post.readingTime && (
                <p className="text-base font-clash my-2 font-normal">
                    Estimated reading time : {post.readingTime}
                </p>
            )}
            <p className="text-base font-sans italic my-4 font-light">
                {post.description}
            </p>
            <div className="flex-wrap flex-row flex">
                {post.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                ))}
            </div>
        </>
    );
    // if (post.type == BlogType.Notion) {
    //     return (
    //         <NotionPage recordMap={recordMap}>{headerComponents}</NotionPage>
    //     );
    // } else {
    //     return (
    //         <MarkdownPage content={markdown}>{headerComponents}</MarkdownPage>
    //     );
    // }
    return <MarkdownPage content={markdown}>{headerComponents}</MarkdownPage>;
};

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const { id } = context.params as IParams;
    const mdPost = await getMdPostByCanonical(id);
    if (mdPost) {
        const pageContent = getMdPostContentBySlug(mdPost.id);
        return {
            props: {
                post: mdPost,
                markdown: pageContent,
            },
        };
    }
    return {
        notFound: true,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getMdBlogPosts();
    generateSiteMap(posts);
    return {
        paths: posts.map((post: BlogArticle) => ({ params: { id: post.url } })),
        fallback: true,
    };
};

export default Page;

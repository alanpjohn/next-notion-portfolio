import { Tag } from "@components/card/tag";
import CustomArticleJsonLd from "@components/meta";
import { NotionPage } from "@components/notion";

import { domain } from "@util/config";
import { generateSiteMap } from "@util/generate-sitemap";
import { getSocialImageUrl } from "@util/get-social-image";
import { BlogArticle } from "@util/interface";
import { getBlogArticleByCanonical, getBlogPosts, getPage } from "@util/notion";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { ExtendedRecordMap } from "notion-types";
import { ParsedUrlQuery } from "querystring";

type Props = {
    post: BlogArticle;
    recordMap: ExtendedRecordMap;
};

const Page: NextPage<Props> = ({ post, recordMap }: Props) => {
    if (!post) {
        return <></>;
    }
    const truncated =
        post.description.length > 110
            ? post.description.substring(0, 110)
            : post.description;
    const socialimageurl = getSocialImageUrl(post.id);
    const url = domain + "/blog/" + post.url;
    return (
        <NotionPage recordMap={recordMap}>
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
                            url:
                                socialimageurl ||
                                "https://www.alanjohn.dev/images/social_media_preview.png",
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
                images={[
                    socialimageurl,
                    "https://www.alanjohn.dev/images/social_media_preview.png",
                ]}
                datePublished={post.publishDate}
                dateModified={post.modifiedDate}
                authorName={{
                    "@type": "person",
                    name: "Alan John",
                    url: "https://www.linkedin.com/in/alan-john-b2b521193",
                }}
                description={truncated}
            />
            <span className="flex font-normal">{post.title}</span>
            <span className="text-base font-display mt-4">
                Published on {post.publishDate || post.modifiedDate}
            </span>
            <div className="flex-wrap flex-row flex">
                {post.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                ))}
            </div>
        </NotionPage>
    );
};

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const { id } = context.params as IParams;
    const post = await getBlogArticleByCanonical(id);
    if (post) {
        const recordMap = await getPage(post.id);
        return {
            props: {
                post: post,
                recordMap: recordMap,
            },
            revalidate: 900,
        };
    } else {
        return {
            notFound: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getBlogPosts();
    generateSiteMap(posts);
    return {
        paths: posts.map((post: BlogArticle) => ({ params: { id: post.url } })),
        fallback: true,
    };
};

export default Page;

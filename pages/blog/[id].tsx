import { Tag } from "@components/card/tag";
import { Layout } from "@components/layout";
import CustomArticleJsonLd from "@components/meta";
import { NotionPage } from "@components/notion";
import { Section } from "@components/section";

import { readPost } from "@util/file-cache";
import { generateSiteMap } from "@util/generate-sitemap";
import { getSocialImageUrl } from "@util/get-social-image";
import { getBlogPosts, getPage } from "@util/notion";
import { getBaseURL } from "@util/router";
import { BlogArticle } from "@util/types";

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
    const url = getBaseURL() + "/blog/" + post.url;
    return (
        <Layout>
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
            <Section className="pt-32 pb-8 md:pt-24 ">
                <div className="notion-page">
                    <span className="text-base font-grotesk mt-4">
                        Published on {post.publishDate || post.modifiedDate}
                    </span>
                </div>
                <div className="notion-page flex-wrap flex-row flex">
                    {post.tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </Section>
            <NotionPage recordMap={recordMap} post={true} />
        </Layout>
    );
};

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const { id } = context.params as IParams;
    const post = readPost(id);
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

/*eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import React from "react";

const toJson = (type: string, jsonld: any): { __html: string } => {
    const { id = undefined } = jsonld;
    const updated = {
        ...(id ? { "@id": jsonld.id } : {}),
        ...jsonld,
    };
    delete updated.id;

    return {
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type,
            ...updated,
        }),
    };
};

interface JsonLdProps {
    type?: string;
    scriptId?: string;
    [key: string]: any;
}

function JsonLd({
    type = "Thing",
    keyOverride,
    scriptKey,
    scriptId = undefined,
    ...rest
}: JsonLdProps & { scriptKey: string }) {
    return (
        <Head>
            <script
                type="application/ld+json"
                id={scriptId}
                dangerouslySetInnerHTML={toJson(type, { ...rest })}
                key={`jsonld-${scriptKey}${
                    keyOverride ? `-${keyOverride}` : ""
                }`}
            />
        </Head>
    );
}

interface Author {
    "@type": "person";
    name: string;
    url: string;
}

export interface CustomArticleJsonLdProps extends JsonLdProps {
    type?: "Article" | "BlogPosting" | "NewsArticle";
    url: string;
    title: string;
    images: ReadonlyArray<string>;
    datePublished: string;
    dateModified?: string;
    authorName: Author | Author[];
    description: string;
}

export const CustomArticleJsonLd: React.FC<CustomArticleJsonLdProps> = ({
    type = "Article",
    keyOverride,
    url,
    title,
    images,
    datePublished,
    dateModified,
    authorName,
    description,
}: CustomArticleJsonLdProps) => {
    const data = {
        datePublished,
        description,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: title,
        image: images,
        dateModified: dateModified || datePublished,
        author: authorName,
    };
    return (
        <JsonLd
            type={type}
            keyOverride={keyOverride}
            {...data}
            scriptKey="article"
        />
    );
};

export default CustomArticleJsonLd;

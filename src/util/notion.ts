import fs from "fs";
import path from "path";
import { Client } from "@notionhq/client";
import { getPosts } from "@util/post";
import { IPost } from "@util/interface";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_KEY });
const allpostscache = "public/posts.json";

type IBlog = IPost[];

const writeToCache = (blog: IBlog) => {
    fs.writeFileSync(
        path.join(process.cwd(), allpostscache),
        JSON.stringify(blog),
    );
};

export const readFromCache = () => {
    const cacheContents = fs.readFileSync(
        path.join(process.cwd(), allpostscache),
        "utf-8",
    );
    const cache: IBlog = JSON.parse(cacheContents);
    return cache;
};

export const readPost = (url: string) => {
    const blog: IBlog = readFromCache();
    const post: IPost | undefined = blog.find((post) => {
        return post.url == url;
    });
    return post;
};

export async function getBlogPosts(): Promise<IPost[]> {
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID
        ? process.env.NOTION_BLOG_DATABASE_ID
        : "";
    let response: QueryDatabaseResponse;
    if (process.env.NODE_ENV == "production") {
        response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Publish",
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });
    } else {
        response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });
    }
    const posts = getPosts(response);
    writeToCache(posts);
    return posts;
}

const getBlocks = async (blockId: string) => {
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
    });
    const results = response.results.map((ablock) => {
        const block = {
            ...ablock,
            has_children: false,
        };
        return block;
    });
    return results;
};

export const getBlogPostContent = async (pageId: string) => {
    const response = await getBlocks(pageId);
    return response;
};

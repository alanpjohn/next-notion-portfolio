import {
    Block,
    BlockWithChildren,
    IPost,
    IProject,
    PageCoverProperty,
    PageResult,
    PostResult,
    PropertyValueDate,
    PropertyValueEditedTime,
    PropertyValueMultiSelect,
    PropertyValueRichText,
    PropertyValueTitle,
    PropertyValueUrl,
} from "@util/interface";
import { getCanonicalURL } from "@util/router";

import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";

const notion = new Client({ auth: process.env.NOTION_KEY });
const allpostscache = "public/posts.json";

const writeToCache = (blog: IPost[]) => {
    fs.writeFileSync(
        path.join(process.cwd(), allpostscache),
        JSON.stringify(blog),
    );
};

export const readFromCache = (): IPost[] => {
    const cacheContents = fs.readFileSync(
        path.join(process.cwd(), allpostscache),
        "utf-8",
    );
    const cache: IPost[] = JSON.parse(cacheContents);
    return cache;
};

export const readPost = (url: string): IPost | undefined => {
    const blog: IPost[] = readFromCache();
    const post: IPost | undefined = blog.find((post) => {
        return post.url == url;
    });
    return post;
};
type DatabaseItem = PostResult & {
    properties: {
        Title: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        PublishDate: PropertyValueDate;
    };
};

type PageWithCover = PageResult & {
    cover: PageCoverProperty;
};

const getPageCover = async (pageId: string): Promise<PageCoverProperty> => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const cover = (response as PageWithCover).cover || null;
    return cover;
};

const extractPosts = async (
    response: QueryDatabaseResponse,
): Promise<IPost[]> => {
    const databaseItems: DatabaseItem[] = response.results.map(
        (databaseItem) => databaseItem as DatabaseItem,
    );
    const posts: IPost[] = await Promise.all(
        databaseItems.map(async (postInDB: DatabaseItem) => {
            const title = postInDB.properties.Title.title[0].plain_text;
            const date = postInDB.properties.Date.last_edited_time;
            const description =
                postInDB.properties.Description.rich_text[0].plain_text;
            const url = getCanonicalURL(title);
            const link = postInDB.properties.Link.url || "";
            const tags = postInDB.properties.Tags.multi_select;
            const cover = await getPageCover(postInDB.id);
            const publishdate = postInDB.properties.PublishDate.date?.start;

            const post: IPost = {
                id: postInDB.id,
                title: title,
                modifiedDate: date,
                description: description,
                url: url,
                link: link,
                cover: cover,
                tags: tags,
                publishDate: publishdate || date,
            };
            return post;
        }),
    );
    return posts;
};

export async function getBlogPosts(): Promise<IPost[]> {
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID
        ? process.env.NOTION_BLOG_DATABASE_ID
        : "";
    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Publish",
            checkbox: {
                equals: process.env.LOCAL ? false : true,
            },
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
    });

    const posts = await extractPosts(response);
    writeToCache(posts);
    return posts;
}

export const getBlocks = async (blockId: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 25,
    });

    response.results.map((block) => {
        blocks.push(block as Block);
    });
    while (response.has_more && response.next_cursor) {
        response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 25,
            start_cursor: response.next_cursor,
        });
        response.results.map((block) => {
            blocks.push(block as Block);
        });
    }
    return blocks;
};

const getChildren = async (block: Block): Promise<BlockWithChildren> => {
    const children: BlockWithChildren[] = [];
    if (block.has_children) {
        const childBlocks = await getBlocks(block.id);
        const childBlocksWithChildren = await Promise.all(
            childBlocks.map(async (block) => await getChildren(block)),
        );
        childBlocksWithChildren.map((block: BlockWithChildren) => {
            children.push(block);
        });
    }
    const ablock: BlockWithChildren = {
        ...block,
        childblocks: children,
    };
    return ablock;
};

export const getPostBlocks = async (
    pageId: string,
): Promise<BlockWithChildren[]> => {
    const blocks: Block[] = await getBlocks(pageId);
    const blocksWithChildren: BlockWithChildren[] = await Promise.all(
        blocks.map(async (block: Block) => {
            const blockWithChildren = await getChildren(block);
            return blockWithChildren;
        }),
    );
    return blocksWithChildren;
};

const extractProjects = (response: QueryDatabaseResponse): IProject[] => {
    const projects: IProject[] = [];
    response.results
        .map((databaseItem) => databaseItem as DatabaseItem)
        .map((projectInDB: DatabaseItem) => {
            const title = projectInDB.properties.Title.title[0].plain_text;
            const date = projectInDB.properties.Date.last_edited_time;
            const description =
                projectInDB.properties.Description.rich_text[0].plain_text;
            const link = projectInDB.properties.Link.url || "";
            const tags = projectInDB.properties.Tags.multi_select;

            projects.push({
                id: projectInDB.id,
                title: title,
                modifiedDate: date,
                description: description,
                url: link,
                link: link,
                tags: tags,
            });
        });
    return projects;
};

export const getPortfolioProjects = async (): Promise<IProject[]> => {
    const databaseId = process.env.NOTION_PROJECT_DATABASE_ID
        ? process.env.NOTION_PROJECT_DATABASE_ID
        : "";
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Publish",
            checkbox: {
                equals: true,
            },
        },
    });
    return extractProjects(response);
};

export const getSkills = async (): Promise<BlockWithChildren[]> => {
    const page = process.env.NOTION_SKILLS_PAGE_ID || "";
    return await getPostBlocks(page);
};

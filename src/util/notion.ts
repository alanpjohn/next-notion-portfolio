import {
    Block,
    BlockWithChildren,
    IPost,
    IProfile,
    IProfileSection,
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
    RichText,
} from "@util/interface";
import { getBaseURL, getCanonicalURL } from "@util/router";

import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";

const notion = new Client({ auth: process.env.NOTION_KEY });
const allpostscache = "public/posts.json";
const sitemapxml = "public/sitemap.xml";

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

const generateSiteMap = (posts: IPost[]) => {
    const baseUrl = getBaseURL();

    const staticPages = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return ![
                "_app.tsx",
                "_document.tsx",
                "_error.tsx",
                "index.tsx",
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath.split(".")[0]}`;
        });

    staticPages.push(baseUrl);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
          .map((url) => {
              return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
        ${posts
            .map((post) => {
                return `<url>
            <loc>${baseUrl + "/" + post.url}</loc>
            <lastmod>${post.modifiedDate}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>`;
            })
            .join("")}
    </urlset>
  `;

    fs.writeFileSync(sitemapxml, sitemap);
};

type DatabaseItem = PostResult & {
    properties: {
        Title: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        PublishDate: PropertyValueDate;
        LastUpdated?: PropertyValueDate;
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
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID || "";
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
                property: process.env.LOCAL ? "Date" : "PublishDate",
                direction: "descending",
            },
        ],
    });
    const posts = await extractPosts(response);
    writeToCache(posts);
    generateSiteMap(posts);
    return posts;
}

export const getBlocks = async (blockId: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
    });

    response.results.map((block) => {
        blocks.push(block as Block);
    });
    while (response.has_more && response.next_cursor) {
        response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 100,
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
        sorts: [
            {
                property: "LastUpdated",
                direction: "descending",
            },
        ],
    });
    return extractProjects(response);
};

export const extractProfileData = (blocks: BlockWithChildren[]): IProfile => {
    const sections: IProfileSection[] = [];
    const about: BlockWithChildren[] = [];

    blocks.map((block) => {
        if (block.type == "toggle") {
            const domain: string =
                block.type == "toggle"
                    ? block.toggle.rich_text
                          .map((text: RichText) => text.plain_text)
                          .join("\n")
                    : "";
            sections.push({
                title: domain,
                content: block.has_children ? block.childblocks : [],
            });
        } else if (block.type == "heading_1" || block.type == "paragraph") {
            about.push(block);
        }
    });

    const profile: IProfile = {
        about: about,
        sections: sections,
    };
    return profile;
};

export const getProfile = async (): Promise<IProfile> => {
    const page = process.env.NOTION_SKILLS_PAGE_ID || "";
    const blocks = await getPostBlocks(page);
    return extractProfileData(blocks);
};

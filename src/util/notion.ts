import { isDev } from "./config";
import { writeToCache } from "./file-cache";
import { getPreviewImageMap } from "./preview-image";
import {
    BlogArticle,
    BlogArticleInDB,
    Project,
    ProjectInDB,
    extractBlogPost,
    extractProject,
} from "./types";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionCompatAPI } from "notion-compat";
import { ExtendedRecordMap } from "notion-types";

const notion_client = new Client({ auth: process.env.NOTION_KEY });
export const notion = new NotionCompatAPI(notion_client);

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    const recordMap = await notion.getPage(pageId);

    const previewImageMap = await getPreviewImageMap(recordMap);
    (recordMap as ExtendedRecordMap).preview_images = previewImageMap;

    return recordMap;
}

export async function getHomepage(): Promise<ExtendedRecordMap> {
    const pageId = process.env.NOTION_SKILLS_PAGE_ID || "";
    const response = await getPage(pageId);
    return response;
}

export async function getBlogPosts(): Promise<BlogArticle[]> {
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID || "";
    const response: QueryDatabaseResponse = await notion_client.databases.query(
        {
            database_id: databaseId,
            // filter: {
            //     property: "Publish",
            //     checkbox: {
            //         equals: isDev ? false : true,
            //     },
            // },
            sorts: [
                {
                    property: isDev ? "Date" : "PublishDate",
                    direction: "descending",
                },
            ],
        },
    );
    const posts: BlogArticle[] = response.results
        .map((item) => item as BlogArticleInDB)
        .map((postInDB) => extractBlogPost(postInDB));
    writeToCache(posts);
    return posts;
}

export async function getProjects(): Promise<Array<Project>> {
    const databaseId = process.env.NOTION_PROJECT_DATABASE_ID || "";
    const response: QueryDatabaseResponse = await notion_client.databases.query(
        {
            database_id: databaseId,
            // filter: {
            //     property: "Publish",
            //     checkbox: {
            //         equals: isDev ? false : true,
            //     },
            // },
            sorts: [
                {
                    property: "LastUpdated",
                    direction: "descending",
                },
            ],
        },
    );
    const projects: Project[] = response.results
        .map((item) => item as ProjectInDB)
        .map((projectInDB) => extractProject(projectInDB));
    return projects;
}

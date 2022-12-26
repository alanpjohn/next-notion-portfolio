import { getBookmarks } from "./bookmark-support";
import { domain, getEnv, isDev } from "./config";
import { BlogArticle, Project } from "./interface";
import { getPreviewImage, getPreviewImageMap } from "./preview-image";
import { db } from "./redis";
import {
    BlogArticleInDB,
    ProjectInDB,
    extractBlogPost,
    extractProject,
} from "./types";
import { Client } from "@notionhq/client";
import {
    GetPageResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionCompatAPI } from "notion-compat";
import { ExtendedRecordMap } from "notion-types";

const notion_client = new Client({ auth: getEnv("NOTION_KEY") });
export const notion = new NotionCompatAPI(notion_client);

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    const recordMap = await notion.getPage(pageId);

    const customizedRecordMap = await getBookmarks(recordMap);

    const previewImageMap = await getPreviewImageMap(customizedRecordMap);
    (customizedRecordMap as ExtendedRecordMap).preview_images = previewImageMap;

    return customizedRecordMap;
}

export async function getHomepage(): Promise<ExtendedRecordMap> {
    const pageId = getEnv("NOTION_SKILLS_PAGE_ID");
    const response = await getPage(pageId);
    return response;
}

export async function getBlogPosts(): Promise<BlogArticle[]> {
    const databaseId = getEnv("NOTION_BLOG_DATABASE_ID");
    const response: QueryDatabaseResponse = await notion_client.databases.query(
        {
            database_id: databaseId,
            filter: {
                property: "Publish",
                checkbox: {
                    equals: isDev ? false : true,
                },
            },
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
    const cachedPosts = await Promise.all(
        posts.map(async (post) => {
            const response = await db.set(post.url, post.id);
            isDev && console.log(post.title, response);
            return post;
        }),
    );
    return cachedPosts;
}

export async function getBlogArticle(id: string): Promise<BlogArticle> {
    const response: GetPageResponse = await notion_client.pages.retrieve({
        page_id: id,
    });
    const post: BlogArticle = extractBlogPost(response as BlogArticleInDB);
    return post;
}

export async function getBlogArticleByCanonical(
    url: string,
): Promise<BlogArticle> {
    const response = await db.get(url);
    return await getBlogArticle(response as string);
}

export async function getProjects(): Promise<Array<Project>> {
    const databaseId = getEnv("NOTION_PROJECT_DATABASE_ID");
    const response: QueryDatabaseResponse = await notion_client.databases.query(
        {
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
        },
    );
    const projects: Project[] = await Promise.all(
        response.results
            .map((item) => item as ProjectInDB)
            .map((projectInDB) => extractProject(projectInDB))
            .map(async (projectInDB) => {
                if (projectInDB.cover) {
                    projectInDB.coverPreview = await getPreviewImage(
                        domain + projectInDB.cover,
                        {
                            cacheKey: projectInDB.id,
                        },
                    );
                }
                return projectInDB;
            }),
    );
    return projects;
}

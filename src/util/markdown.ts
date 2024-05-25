import { domain, isDev } from "./config";
import { BlogArticle, BlogType, ITag, Project } from "./interface";
import { getPreviewImage } from "./preview-image";
import { db } from "./redis";
import { getCanonicalURL } from "./router";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const projectsDirectory = join(process.cwd(), "_projects");
const aboutMePath = join(projectsDirectory, "profile.md");

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

type MdBlogArticle = BlogArticle & {
    timestamp: number;
    publish: boolean;
};

export async function getMdBlogPosts(): Promise<BlogArticle[]> {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getMdPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) =>
            post1.modifiedDate > post2.modifiedDate ? -1 : 1,
        )
        .filter((post1) => post1.publish);
    const cachedPosts = await Promise.all(
        posts.map(async (post) => {
            await db.set(post.url, post.id);
            return post as BlogArticle;
        }),
    );
    return cachedPosts;
}

export function getMdPostBySlug(slug: string): MdBlogArticle {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const articleDate = new Date(data["date"]);
    const title = data["title"];
    const desc = data["description"] || data["excerpt"];

    const tags: string[] = data["tags"];
    const parsedTags: ITag[] = tags
        ? tags.map((tag) => ({
              id: tag,
              color: "black",
              name: tag,
          }))
        : [];
    const publish = data["publish"] ? true : false;
    return {
        id: realSlug,
        title: data["title"],
        type: BlogType.Markdown,
        timestamp: articleDate.getTime(),
        modifiedDate: dateFormatter.format(articleDate),
        url: getCanonicalURL(title),
        link: data["link"] || "",
        tags: parsedTags,
        description: desc,
        publish: publish || isDev,
    };
}

export async function getMdPostByCanonical(url: string): Promise<BlogArticle> {
    const response = await db.get(url);
    return (await getMdPostBySlug(response as string)) as BlogArticle;
}

export function getMdPostContentBySlug(slug: string): string {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);

    return content;
}

function getMdProjectByName(name: string): Project {
    const fileContents = fs.readFileSync(name, "utf8");
    const { data, content } = matter(fileContents);
    const tags: string[] = data["tags"];
    const articleDate = new Date(data["date"]);
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const parsedTags: ITag[] = tags
        ? tags.map((tag) => ({
              id: tag,
              color: "black",
              name: tag,
          }))
        : [];
    return {
        id: name,
        url: data["url"],
        cover: data["cover"],
        tags: parsedTags,
        description: content,
        title: data["title"],
        modifiedDate: dateFormatter.format(articleDate),
        lastUpdated: dateFormatter.format(articleDate),
        link: data["url"],
    };
}

export async function getMdProjects(): Promise<Array<Project>> {
    const projects = await Promise.all(
        fs
            .readdirSync(projectsDirectory)
            .map((filename) => join(projectsDirectory, filename))
            .filter((filename) => filename != aboutMePath)
            .map((filepath) => getMdProjectByName(filepath))
            .sort((post1, post2) =>
                post1.modifiedDate > post2.modifiedDate ? -1 : 1,
            )
            .map(async (project) => {
                if (project.cover) {
                    const image = "/images/" + project.cover + ".png";
                    project.cover = image;
                    project.coverPreview = await getPreviewImage(
                        domain + image,
                        {
                            cacheKey: project.id,
                        },
                    );
                }
                return project;
            }),
    );
    return projects;
}

export function getProfile(): string {
    const fileContents = fs.readFileSync(aboutMePath, "utf8");
    const { content } = matter(fileContents);

    return content;
}

export async function getLatestBlog(): Promise<BlogArticle> {
    const articles = await getMdBlogPosts();

    return articles[0];
}

export async function getFeaturedProject(): Promise<Project> {
    const projects = await getMdProjects();
    return projects[0];
}

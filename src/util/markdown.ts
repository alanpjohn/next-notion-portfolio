import { isDev } from "./config";
import { BlogArticle, BlogType, ITag } from "./interface";
import { db } from "./redis";
import { getCanonicalURL } from "./router";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

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

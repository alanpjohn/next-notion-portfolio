import { BlogArticle } from "./interface";
import fs from "fs";
import path from "path";

const allpostscache = "public/posts.json";

export const writeToCache = (blog: BlogArticle[]) => {
    fs.writeFileSync(
        path.join(process.cwd(), allpostscache),
        JSON.stringify(blog),
    );
};

const readFromCache = (): BlogArticle[] => {
    const cacheContents = fs.readFileSync(
        path.join(process.cwd(), allpostscache),
        "utf-8",
    );
    const cache: BlogArticle[] = JSON.parse(cacheContents);
    return cache;
};

export const readPost = (url: string): BlogArticle | undefined => {
    const blog: BlogArticle[] = readFromCache();
    const post: BlogArticle | undefined = blog.find((post) => {
        return post.url == url;
    });
    return post;
};

export const readPostById = (id: string): BlogArticle | undefined => {
    const blog: BlogArticle[] = readFromCache();
    const post: BlogArticle | undefined = blog.find((post) => {
        return post.id == id;
    });
    return post;
};

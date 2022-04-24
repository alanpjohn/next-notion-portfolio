import { BlogArticle } from "@util/interface";
import { getBlogArticle } from "@util/notion";
import { getHTML } from "@util/template";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { id } = req.query;
    try {
        const article: BlogArticle = await getBlogArticle(id.toString());
        const html = getHTML(article);
        res.setHeader("Content-Type", "text/html");
        res.end(html);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

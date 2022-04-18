import { getScreenshot } from "@util/chromium";
import { readPostById } from "@util/file-cache";
import { BlogArticle } from "@util/interface";
import { getHTML } from "@util/template";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { id } = req.query;
    try {
        const article: BlogArticle = readPostById(id.toString());
        const html = getHTML(article);
        // res.setHeader('Content-Type', 'text/html');
        //     res.end(html);
        //     return;
        const file = await getScreenshot(html);
        res.statusCode = 200;
        res.setHeader("Content-Type", `image/png`);
        res.setHeader(
            "Cache-Control",
            `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
        );
        res.end(file);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

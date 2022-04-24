import { getPreviewHTML } from "@util/get-html-preview";

import chrome from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { id } = req.query;
    try {
        const url = getPreviewHTML(id.toString());
        const options = process.env.AWS_REGION
            ? {
                  args: chrome.args,
                  executablePath: await chrome.executablePath,
                  headless: chrome.headless,
              }
            : {
                  args: [],
                  executablePath:
                      process.platform === "win32"
                          ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
                          : process.platform === "linux"
                          ? "/usr/bin/google-chrome"
                          : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
              };
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 628 });
        await page.goto(url, { waitUntil: "networkidle0" });
        const file = await page.screenshot({ type: "png" });
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

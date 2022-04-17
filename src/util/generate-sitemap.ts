import { getBaseURL } from "./router";
import { BlogArticle } from "./types";
import fs from "fs";

const sitemapxml = "public/sitemap.xml";

export const generateSiteMap = (posts: BlogArticle[]) => {
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
            <loc>${baseUrl + "/blog/" + post.url}</loc>
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

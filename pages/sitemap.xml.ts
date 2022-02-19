import { IPost } from "@util/interface";
import { readFromCache } from "@util/notion";
import { getBaseURL } from "@util/router";

import fs from "fs";
import { GetServerSideProps } from "next";

const Sitemap = (): void => {
    process.env.NODE_ENV == "production" || console.log("sitemap generated");
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const baseUrl = getBaseURL();

    const staticPages = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return ![
                "_app.js",
                "_document.js",
                "_error.js",
                "sitemap.xml.js",
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });

    const posts: IPost[] = readFromCache();

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
        ${posts.map((post) => {
            return `<url>
            <loc>${baseUrl + "/" + post.url}</loc>
            <lastmod>${post.modifiedDate}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>`;
        })}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;

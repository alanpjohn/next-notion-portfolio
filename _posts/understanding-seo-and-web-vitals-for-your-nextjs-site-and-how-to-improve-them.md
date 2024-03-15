---
title: Understanding SEO and Web Vitals for your NextJS site and how to improve them?
date: 2022-05-01
modifiedDate: 2022-10-20
description: "Part 3 of the series breaking down my portfolio/blog development. In this part, we look at improving our page rank by focusing on core web vitals and SEO."
tags:
    - nextjs
    - seo
    - corewebvitals
    - lighthouse
publish: true
---

# Prerequisites

This article is part of a series where I break down the process of building my developer portfolio. The previous 2 parts focussed on how I setup my portfolio and built it using Notion API as a headless CMS. Now that the portfolio and blog was ready, it was time to make it accessible to the public. To make sure that people are able to find and search your site organically, we need to have our site pop-up high on search engine results. This is where **Search Engine Optimization** comes into the picture. 

# Search Engine Optimization

Search Engine Optimization can be defined as making our content more search engine friendly so that relevant users can find it more easily. This would include:

## Adding meta Tags

Meta tags exist in the `head` element of the page providing important information about the page that can used by search engines and social media sites. There are a variety of meta tags that represent different types of information for different search engines. A popular subset of standardized meta tags are described in the [open graph protocol](https://ogp.me/). Managing these tags for every page and generating them dynamically for blog pages has it’s own overhead. Thus for that reason, I have used the [Next-SEO](https://github.com/garmeeh/next-seo) plugin. The Next-SEO plugin provides  `DefaultSEO` component that contains tags that will be defined for all routes by default which subsequently can be overwritten at a page level by then using the `NextSEO` component. Below is the default SEO config used by me.

```tsx
export const Layout: React.FC<Props> = ({ children }: Props) => {
    const router = useRouter();
    const url = `${domain}${router.asPath}`;
    return (
        <div className="flex w-full flex-col min-h-screen">
            <DefaultSeo
                titleTemplate="%s - Alan John"
                openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: url,
                    description:
                        "The personal website for Alan John, developer.",
                    site_name: "Alan John",
                    images: [
                        {
                            url: `${domain}/images/social_media_preview.png`,
                            width: 1200,
                            height: 628,
                            alt: "My Portfolio Preview",
                            type: "image/png",
                        },
                    ],
                }}
                canonical={url}
            />
            <Header />
            {children}
            <Footer />
        </div>
    );
};
```

And this is how I have overwritten only the tags that require to be changes at the page level for the home page.

```tsx
const Home: NextPage = () => {
    return (
        <Layout>
            <NextSeo
                title="Home"
                description="2022 Portfolio"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio",
                    },
                ]}
            />
            <Section className="mt-32 flex-grow">
						{/* Contents of Page */}
            </Section>
        </Layout>
    );
};
```

So when we inspect the `Head` element of the page, we get all the meta tags we would require for our page. 

> The contents of the meta tags has to studied properly to get best results. There are plenty of resources talking about great SEO strategies. The contents in the tags I have added are just for demonstration.
> 

```html
<meta name="viewport" content="width=device-width">
<meta charset="utf-8">
<meta property="og:type" content="website">
<meta property="og:image:alt" content="My Portfolio Preview">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="628">
<meta property="og:locale" content="en_IE">
<meta property="og:site_name" content="Alan John">
<title>Home - Alan John</title>
<meta name="robots" content="index,follow">
<meta name="description" content="2022 Portfolio">
<meta property="og:title" content="Home - Alan John">
<meta property="og:description" content="2022 Portfolio">
<meta property="keywords" content="Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio">
<meta property="og:url" content="https://alanjohn.dev/">
<meta property="og:image" content="https://alanjohn.dev/images/social_media_preview.png">
<link rel="canonical" href="https://alanjohn.dev/">
```

You can see how your site would appear in search results and social media posts at [metatags.io](http://metatags.io/).

## robots.txt and sitemap.xml

The `robots.txt` file and `sitemap.xml` file are two files that are vital to how our page is crawled by google crawler bots. The `robots.txt` file lets *good* crawler bots know which routes they are allowed to crawl and index. You can add a `robots.txt` file to your NextJS site by adding it to your `public` directory. 

```bash
# Allow all user agents.
User-agent: *
Allow: /

Sitemap: https://www.alanjohn.dev/sitemap.xml
```

The `sitemap.xml` is a file that lets the search engine crawler know what all routes are present on your website and how frequently they should be crawled and indexed. You could just manually add a `sitemap.xml` to your `public` directory but as there are dynamic paths that are created at build time, you would have to create a function to dynamically generate the `sitemap.xml`. 

```tsx
import { domain } from "./config";
import { BlogArticle } from "./interface";
import fs from "fs";

const sitemapxml = "public/sitemap.xml";

export const generateSiteMap = (posts: BlogArticle[]) => {
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
            return `${domain}/${staticPagePath.split(".")[0]}`;
        });

    staticPages.push(domain);

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
            <loc>${domain + "/blog/" + post.url}</loc>
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
```

## Social Media Preview Image

Whenever you share a link on whatsapp, telegram or any application, you get a preview which gives you a visual representation of the contents of that link. These social media preview images are important especially on social media sites like LinkedIn and Twitter to boost engagement. We are describing the social media image in the `DefaultSEO` and `NextSEO` components above. But the image we described is static in nature. It doesn’t change as per the page in the case of dynamic routing.
 
For regular static page routes, this might be tolerated. Though for blog page articles, not having a social media preview image that visually describes the content of the article might reduce the engagement. A descriptive social media image will go a long way into attracting people to click on the link.

![Default Social Media Preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pvu4iwpfxrrr68eif9rv.png)

To generate dynamic social media preview images for our blog articles, I have used two serverless functions implemented via [Next.js API routes](https://nextjs.org/docs/api-routes/introduction). I could have done the social media preview generation using one function but vercel has a 50mb size limit which gets exhausted by `puppeteer-core` and `chrome-aws-lambda` which I have utilized to create the social media preview image. So I created two API routes:

The `/api/preview-html` generates the preview using HTML, CSS and returns the HTML document in response.

```tsx
import { BlogArticle } from "@util/interface"; // Type definition for blog
import { getBlogArticle } from "@util/notion"; // Gets blog article details
import { getHTML } from "@util/template"; // Creates HTML preview based on template

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
```

The `/api/og-image` opens the preview HTML in headless chrome instance with the help of `puppeteer-core` and `chrome-aws-lambda`. It takes a screenshot which it returns in response.

```tsx
import { getPreviewHTML } from "@util/get-html-preview";
// Gets the preview-html url which we screenshot

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
```

## JSON-LD

We can help google search engine understand the content of our site even more by adding structured data with the help of [JSON-LD](https://json-ld.org/). Google can use the structured data to enable special search features which in turn boost your page rank. You can read more about this here: [https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)

The [Next-SEO plugin supports adding JSON-LD](https://www.npmjs.com/package/next-seo#json-ld) to our pages similar to how we add the meta tags. Though the `ArticleJsonLd` component did not pass the google rich text search. At the time of writing this article, it remains an [unresolved issue](https://github.com/garmeeh/next-seo#blog). So I created my own `CustomArticleJsonLd` component based on how the `ArticleJsonLd` is designed. 

```tsx
interface Author {
    "@type": "person";
    name: string;
    url: string;
}

export interface CustomArticleJsonLdProps extends JsonLdProps {
    type?: "Article" | "BlogPosting";
    url: string;
    title: string;
    images: ReadonlyArray<string>;
    datePublished: string;
    dateModified?: string;
    authorName: Author | Author[];
    description: string;
}

export const CustomArticleJsonLd: React.FC<CustomArticleJsonLdProps> = ({
    type = "Article",
    keyOverride,
    url,
    title,
    images,
    datePublished,
    dateModified,
    authorName,
    description,
}: CustomArticleJsonLdProps) => {
    const data = {
        datePublished,
        description,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: title,
        image: images,
        dateModified: dateModified || datePublished,
        author: authorName,
    };
    return (
        <JsonLd
            type={type}
            keyOverride={keyOverride}
            {...data}
            scriptKey="article"
        />
    );
};

export default CustomArticleJsonLd;
```

Using this component in my blog page route allowed me to add structured data which passed google’s rich text search. 

```tsx
<CustomArticleJsonLd
    type="BlogPosting"
    url={url}
    title={post.title}
    images={[socialimageurl]}
    datePublished={post.publishDate}
    dateModified={post.modifiedDate}
    authorName={{
        "@type": "person",
        name: "Alan John",
        url: "https://www.alanjohn.dev",
    }}
    description={truncated}
/>
```

# What are web vitals?

> 💡 I have just summarised the core web vitals based on content found at [https://web.dev/vitals/](https://web.dev/vitals/). My primary goal is to highlight how I improved my core web vitals and this is a prerequisite to that. If you want to learn more about web vitals in details, there is comprehensive content found at [https://web.dev](https://web.dev/vitals/) which i would strongly recommend. You can also refer [NextJS learn](https://nextjs.org/learn/seo/web-performance).
> 

Web vitals are a set of parameters introduced by google to quantify the user experience of a website. As of June 2021, Google has started using core web vitals in ranking pages. Core web vitals is a subset of web vitals that apply to all pages. As per [web.dev](http://web.dev), these are 

- **[Largest Contentful Paint (LCP)](https://web.dev/lcp/)**: measures *loading* performance. To provide a good user experience, LCP should occur within **2.5 seconds** of when the page first starts loading.
- **[First Input Delay (FID)](https://web.dev/fid/)**: measures *interactivity*. To provide a good user experience, pages should have a FID of **100 milliseconds** or less.
- **[Cumulative Layout Shift (CLS)](https://web.dev/cls/)**: measures *visual stability*. To provide a good user experience, pages should maintain a CLS of **0.1.** or less.

Improving this web vitals is not only beneficial to search engine rankings but also to judge the overall user experience. There is plenty of research online showing how improving web vitals has drastically improved business for multiple web based platforms. (Check out [https://web.dev/vitals-business-impact/](https://web.dev/vitals-business-impact/)).

## Measuring web vitals using Lighthouse

Lighthouse is a lab tool to measure web vitals in an isolated environment. You can use lighthouse online at [https://web.dev/measure](https://web.dev/measure). You can use lighthouse locally by install the lighthouse npm package.

```tsx
npm i -g lighthouse
```

You can also set up [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) as a github action to evaluate the web vitals on push or in pull requests. 

Beware that the vitals you get from lighthouse are from a controlled environment. This will slightly differ from your field data which is collected from your users. You can check out the differences in field data and lab data [here](https://web.dev/lab-and-field-data-differences). You can measure your site’s field data at [pagespeed.web.dev](https://pagespeed.web.dev/). If you are deploying your site on vercel, it also provides a performance score based on web vitals collected from users.

# Improving web vitals

I used the lab data that I got from lighthouse and worked towards improving those metrics. The web vitals that you get from lighthouse are the following

- **First Contentful Paint** marks the time at which the first text or image is painted.
- **Speed Index** shows how quickly the contents of a page are visibly populated.
- **Largest Contentful Paint** marks the time at which the largest text or image is painted.
- **Time to interactive** is the amount of time it takes for the page to become fully interactive.
- **Total Blocking Time** is sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.
- **Cumulative Layout Shift** measures the movement of visible elements within the viewport.

Below are some of the things which I had to rethink and change to improve the web vitals.

## Handling fonts

Typography is extremely important to the design of a website and the subsequent user experience. Though in the scope of this article, we would be more concerned with how fonts are loaded. Font loading affects the **FCP** and **LCP**. I was initially using fonts from Fontshare, Fontesk and Google fonts for my site. Google fonts has a lot servers and CDNs hosting them and NextJS provides [webfont optimizations](https://nextjs.org/docs/basic-features/font-optimization) for fonts hosted on google fonts. The same can not be said about the fonts from Fontshare and Fontesk, I found it better to self host those fonts. Depending on how important the fonts are to a page, they had to be preloaded using the `link` tag. For me, my display font was vital to the home page as the text on that page was also the largest contentful paint. So I preloaded the display font for the `/` route.

## Performance issues due to animations

I was using Framer motion and css animations in combination to create page transitions and micro-transitions. But framer motion isn’t a light-weight library and because I was utilizing it heavily, it led to a poorer **FCP**, **TBT** and **Speed Index**. So I removed framer motion and started to rely purely on CSS animations. Unfortunately that has it’s own limitations and I had to remove my page transitions altogether. Between web vitals and page transition animations, it was more practical to choose vitals. I am still looking at other javascript animation libraries and design patterns that could allow me to add those animations without sacrificing much performance. *Open to suggestions.*

## Dynamic loading for code splitting

NextJS by default gives route based code splitting when we build the code. But that might not be sufficient. Component level code splitting can help reduce the unused javascript and lazy load certain components which are more sparingly used. The [webpack bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) helped in analyzing in what my modules compose my chunks. 

Previously when I was [highlight.js](https://www.npmjs.com/package/highlight.js?activeTab=readme), I was importing a lot of highlight.js modules which I wasn’t really using leading to inflation in size of chunks. So I removed a lot of them and later dynamically loaded them reducing the total size of all the chunks from 1.4mb to less than 500kb.

> 💡 I had later removed highlight.js altogether for [prism.js](https://prismjs.com/) in this [PR](https://github.com/TheForeverLost/next-notion-portfolio/pull/14).

You have to be careful about not dynamically loading too many modules/components as it might increase your loading time.

## React-Notion-X

In [my previous article in this series](https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API), I had created my own react components to work with the Notion API due to the lack of a recognized renderer that works with Official Notion API. I came across the [react-notion-X](https://github.com/NotionX/react-notion-x) library but that did not use the Official Notion API then so I chose to create my own renderer. But soon after I published that article, [Travis Fischer](https://github.com/transitive-bullshit) (creator of react-notion-x and a couple of really handy tools) added support for the official Notion API with [notion-compat](https://www.npmjs.com/package/notion-compat) (still a WIP) which allows you to use react-notion-x’s powerful react renderer with the official API. So I replaced my renderer components with the react-notion-x renderer which gave me a huge performance boost.

> 💡 As far as why the renderer in `react-notion-x` outperformed what I had implemented for the scope of the project, the biggest difference in approach was that `react-notion-x` used react’s `useMemo` and `useContext` hooks followed by a lot of better design choices at block level.

# Conclusion

There are still ways that I can improve the SEO and core web vitals. The objective of this series was not showcasing the right way to do this but to provide a case study for people trying to do something similar. I am open to suggestion on how I can improve the performance and user experience for the website even further but don’t have any further plans of documenting the process as part of this series.

You can find the source code [here](https://github.com/TheForeverLost/next-notion-portfolio/).
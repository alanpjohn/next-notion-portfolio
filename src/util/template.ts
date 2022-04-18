import { BlogArticle } from "./types";
import { readFileSync } from "fs";

const space = readFileSync(
    `public/fonts/Space-Grotesk/SpaceGrotesk[wght].woff2`,
).toString("base64");

const getCSS = () => {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');

    @font-face {
        font-family: 'space-grotesk';
        font-weight: 300 700;
        src: url(data:font/woff2;charset=utf-8;base64,${space}) format('woff2');
    }

    body {
        font-family: "space-grotesk" , "system-ui";
        font-weight : 300;
        font-size: large;
        display: flex;
    }

    .main {
        margin: 14px auto 14px auto;
        max-width: 1000px;
        height: 628px;
        justify-content: space-evenly;
    }

    .main , .content {
        display: flex;
        flex-direction: column;
    }

    .header , .social , .tags {
        display: flex;
        flex-direction: row;
    }

    .header {
        justify-content: space-between;
    }

    .date {
        font-size: medium;
    }

    .title {
        font-size: 40px;
        font-weight: 500;
        width: 800px;
        line-height: 36px;
        margin: 0.5em 0;
    }

    .social{
        justify-content: space-between;
    }

    .link {
        font-size: small;
        font-weight: 400;
        display: flex;
        flex-direction: row;
        align-items: center;
        white-space: nowrap;
    }

    .logo {
        font-size: 30px;
        font-family: "Rubik","system-ui";
    }

    .link > img{
        margin-right: 0.4em;
        margin-left: 0.4em
    }

    .tag {
        font-weight: 400;
        padding: 0 5px;
    }
    `;
};

export const getHTML = (article: BlogArticle) => {
    return `<!DOCTYPE html>
    <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            ${getCSS()}
        </style>
        <body>
            <div class="main">
                <div class="header">
                    <span class="logo">AJ</span>
                    <span class="link">alanjohn.dev/</span>
                </div>
                <div class="content">
                    <div class="date">
                        Published on ${
                            article.publishDate || article.modifiedDate
                        }
                    </div>
                    <div class="title">
                        ${article.title}
                    </div>
                    <div class="tags">
                        ${article.tags
                            .map(
                                (tag) =>
                                    `<span class="tag" style="color:${tag.color};">#${tag.name}</span>`,
                            )
                            .join("")}
                    </div>
                </div>
                <div class="social">
                    <div class="link">
                        <img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/devdotto.svg" />
                        dev.to/theforeverlost
                    </div>
                    <div class="link">
                        <img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/github.svg" />
                        github.com/TheForeverLost
                    </div>
                    <div class="link">
                        <img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/linkedin.svg" />
                        linkedin.com/in/alan-john-b2b521193/
                    </div>
                </div>
            </div>
        </body>
    </html>`;
};

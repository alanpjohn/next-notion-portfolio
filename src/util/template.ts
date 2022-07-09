import { BlogArticle } from "./interface";

const getCSS = () => {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');

    @font-face {
        font-family: "clash-display";
        src: url("/fonts/ClashDisplay/ClashDisplay-Variable.woff2") format("woff2");
        font-weight: 200 700;
    }

    body {
        font-family: "clash-display" , "system-ui";
        font-weight : 400;
        font-size: large;
        display: flex;
    }

    .main {
        margin: 64px auto 14px auto;
        min-width: 1000px;
        height: 500px;
        justify-content: space-between;
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
        font-size: 48px;
        font-weight: 400;
        width: 800px;
        line-height: 46px;
        margin: 0.5em 0;
    }

    .social{
        justify-content: space-between;
    }

    .link {
        font-size: 16px;
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
        font-size: 20px;
        font-weight: 500;
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
                        dev.to/alanpjohn
                    </div>
                    <div class="link">
                        <img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/github.svg" />
                        github.com/alanpjohn
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

import chrome from "chrome-aws-lambda";
import core from "puppeteer-core";

let _page: core.Page | null;

const exePath =
    process.platform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux"
        ? "/usr/bin/google-chrome"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    let options: Options;
    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true,
        };
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    }
    return options;
}

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 1200, height: 628 });
    await page.setContent(html);
    const file = await page.screenshot({ type: "png" });
    return file;
}

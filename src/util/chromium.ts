import chrome from "chrome-aws-lambda";
import core from "puppeteer-core";

let _page: core.Page | null;

const exePath =
    process.platform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux"
        ? "/usr/bin/google-chrome"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function getScreenshot(html: string) {
    if (!_page) {
        const options = process.env.AWS_REGION
            ? {
                  args: chrome.args,
                  executablePath: await chrome.executablePath,
                  headless: chrome.headless,
              }
            : {
                  args: [],
                  executablePath: exePath,
              };
        const browser = await core.launch(options);
        _page = await browser.newPage();
    }
    const page = _page;

    await page.setViewport({ width: 1200, height: 628 });
    await page.setContent(html);
    const file = await _page.screenshot({ type: "png" });
    return file;
}

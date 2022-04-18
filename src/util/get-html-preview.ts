import { api, domain } from "./config";

export function getPreviewHTML(pageId: string) {
    const host = domain;
    try {
        const url = new URL(api.getPreviewHTML, host);

        if (pageId) {
            url.searchParams.set("id", pageId);
            return url.toString();
        }
    } catch (err) {
        console.warn("error invalid social image url", pageId, err.message);
    }

    return null;
}

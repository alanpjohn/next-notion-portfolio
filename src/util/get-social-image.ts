import { api, domain } from "./config";

export function getSocialImageUrl(pageId: string) {
    const host = domain;
    try {
        const url = new URL(api.getSocialImage, host);

        if (pageId) {
            url.searchParams.set("id", pageId);
            return url.toString();
        }
    } catch (err) {
        console.warn("error invalid social image url", pageId, err.message);
    }

    return null;
}

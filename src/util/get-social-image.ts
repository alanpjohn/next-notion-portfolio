import { api, domain } from "./config";

export function getSocialImageUrl(title: string, tags: string[], date: string) {
    const host = domain;
    try {
        const url = new URL(api.getSocialImage, host);

        url.searchParams.set("title", title);
        url.searchParams.set("date", date);

        tags.forEach((tag) => {
            url.searchParams.append("tag", tag);
        });

        return url.toString();
    } catch (err) {
        console.warn("error invalid social image url", title, err.message);
    }

    return null;
}

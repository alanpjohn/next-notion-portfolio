import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import { IPost, ITag, IPostDetails } from "@util/interface";

const getCanonicalURL = (title: string) => {
    const cleaned = title.replace(/[^-\]_.~!*'();:@&=+$,/?%#[A-z0-9]/g, " ");
    const removedSpaces = cleaned.split(" ").join("-");
    return removedSpaces;
};

export const getPosts = (response: QueryDatabaseResponse): IPost[] => {
    const posts: IPost[] = [];
    response.results.map((page) => {
        const anyproperties = JSON.parse(JSON.stringify(page))["properties"];
        const properties: IPostDetails = {
            tags: anyproperties["Tags"]["multi_select"].map((tag: ITag) => {
                return tag;
            }),
            date: anyproperties["Date"]["last_edited_time"],
            title: anyproperties["Title"]["title"][0]["plain_text"],
            description:
                anyproperties["Description"]["rich_text"][0]["plain_text"],
            link: anyproperties["Link"]["url"]
                ? anyproperties["Link"]["url"]
                : "",
        };
        posts.push({
            id: page.id,
            url: getCanonicalURL(properties.title),
            properties: properties,
        });
    });
    return posts;
};

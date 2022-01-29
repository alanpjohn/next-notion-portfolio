import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { IProject, IProjectDetails, ITag } from "./interface";

export const getProjects = (response: QueryDatabaseResponse): IProject[] => {
    const projects: IProject[] = [];
    response.results.map((page) => {
        const anyproperties = JSON.parse(JSON.stringify(page))["properties"];
        const properties: IProjectDetails = {
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
        projects.push({
            id: page.id,
            url: properties.link,
            properties: properties,
        });
    });
    return projects;
};

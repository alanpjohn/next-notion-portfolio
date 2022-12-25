import { BlogArticle, ITag, Project } from "./interface";
import { getCanonicalURL } from "./router";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { formatDate } from "react-notion-x";

export type PostResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;

type PropertyValueMap = PostResult["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
    PropertyValue,
    { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">;
export type PropertyValueUrl = ExtractedPropertyValue<"url">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueCheck = ExtractedPropertyValue<"checkbox">;
export type PropertyValueEditedTime =
    ExtractedPropertyValue<"last_edited_time">;

export type BlogArticleInDB = PostResult & {
    properties: {
        Title: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Publish: PropertyValueCheck;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        PublishDate: PropertyValueDate;
    };
};

export const extractBlogPost = (
    blogArticleInDB: BlogArticleInDB,
): BlogArticle => {
    const id = blogArticleInDB.id;
    const title = blogArticleInDB.properties.Title.title
        .map((text) => text.plain_text)
        .join(" ");
    const modifiedDate = formatDate(
        blogArticleInDB.properties.Date.last_edited_time,
    );
    const description = blogArticleInDB.properties.Description.rich_text
        .map((text) => text.plain_text)
        .join(" ");
    const url = getCanonicalURL(title);
    const link = blogArticleInDB.properties.Link.url || "";
    const tags = blogArticleInDB.properties.Tags.multi_select.map(
        (tag) => tag as ITag,
    );
    const publishDate = blogArticleInDB.properties.PublishDate.date
        ? formatDate(blogArticleInDB.properties.PublishDate.date.start)
        : null;
    return {
        id: id,
        title: title,
        modifiedDate: modifiedDate,
        description: description,
        url: url,
        link: link,
        tags: tags,
        publishDate: publishDate,
    };
};

type PropertyCover = {
    type: "file";
    file: {
        url: string;
        expiry_time: string;
    };
};

export type ProjectInDB = PostResult & {
    properties: {
        Title: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        LastUpdated: PropertyValueDate;
    };
    cover?: PropertyCover;
};

export const extractProject = (projectInDB: ProjectInDB): Project => {
    const id = projectInDB.id;
    const title = projectInDB.properties.Title.title
        .map((text) => text.plain_text)
        .join(" ");
    const modifiedDate = formatDate(
        projectInDB.properties.Date.last_edited_time,
    );
    const description = projectInDB.properties.Description.rich_text
        .map((text) => text.plain_text)
        .join(" ");
    const link = projectInDB.properties.Link.url || "";
    const tags = projectInDB.properties.Tags.multi_select.map(
        (tag) => tag as ITag,
    );
    const lastUpdated = projectInDB.properties.LastUpdated.date
        ? formatDate(projectInDB.properties.LastUpdated.date.start)
        : undefined;
    const cover = projectInDB.cover ? projectInDB.cover.file.url : null;
    return {
        id: id,
        title: title,
        modifiedDate: modifiedDate,
        description: description,
        url: link,
        link: link,
        tags: tags,
        lastUpdated: lastUpdated,
        cover: cover,
    };
};

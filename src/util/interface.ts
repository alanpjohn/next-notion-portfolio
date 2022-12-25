import { PreviewImage } from "notion-types";

export interface ITag {
    id: string;
    name: string;
    color: string;
}

export interface BlogArticle {
    id: string;
    url: string;
    tags: ITag[];
    modifiedDate: string;
    publishDate?: string;
    title: string;
    description: string;
    link?: string;
    readingTime?: string;
}

export interface Project {
    id: string;
    url: string;
    tags: ITag[];
    modifiedDate: string;
    title: string;
    description: string;
    link: string;
    lastUpdated: string;
    cover?: string;
    coverPreview?: PreviewImage;
}

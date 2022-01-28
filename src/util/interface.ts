export interface ITag {
    id: string;
    name: string;
    color: string;
}

export interface IPostDetails {
    tags: ITag[];
    date: string;
    title: string;
    description: string;
    link?: string;
}

export interface IPost {
    id: string;
    url: string;
    properties: IPostDetails;
}

export enum EBlockType {
    heading_1 = "heading_1",
    heading_2 = "heading_2",
    heading_3 = "heading_3",
    paragraph = "paragraph",
    quote = "quote",
    code = "code",
    callout = "callout",
    childDatabase = "childDatabase",
    divider = "divider", //done
    embed = "embed", //done
    file = "file",
    image = "image", //image (resize left)
    video = "video",
    pdf = "pdf",
    bookmark = "bookmark",
    bulleted_list = "bulleted_list",
    numbered_list = "numbered_list",
    bulleted_list_item = "bulleted_list_item",
    numbered_list_item = "numbered_list_item",
    to_do = "to_do",
    toggle = "toggle",
    table_of_contents = "table_of_contents",
    null = "null",
}

export enum ERichTextType {
    mention,
    text,
    equation,
}

export interface ITextContent {
    content: string;
    link: {
        url: string;
    };
}

export interface IAnnontations {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
}

export interface ITextData {
    type: ERichTextType;
    text: ITextContent;
    annotations: IAnnontations;
    plain_text: string;
    href: string;
}

export interface IFileData {
    url: string;
    expiry_time: string;
}

export interface IEmojiData {
    type: string;
    emoji: string;
}

export interface IBlockObject {
    text?: Array<ITextData>;
    language?: string;
    title?: string;
    caption?: Array<ITextData>;
    children?: Array<IBlock>;
    icon?: IEmojiData;
    checked?: boolean;
    url?: string;
    expression?: string;
    image?: IFileData;
    file?: IFileData;
    video?: IFileData;
    type?: string;
    external?: {
        url: string;
    };
}

type TBlock = {
    [blocktype in EBlockType]?: IBlockObject;
} & {
    object: string;
    id: string;
    created_time: Date;
    last_edited_time: Date;
    has_children: boolean;
    archived: boolean;
    type: EBlockType;
};

export type IBlock = TBlock;

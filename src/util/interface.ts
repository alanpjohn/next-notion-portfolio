import {
    Block,
    BlockType,
    BulletedListItemBlock,
} from "@notion-stuff/v4-types";

export interface ITag {
    id: string;
    name: string;
    color: string;
}

export interface IPost {
    id: string;
    url: string;
    tags: ITag[];
    date: string;
    title: string;
    description: string;
    link?: string;
}

export interface IProject extends IPost {
    link: string;
}

export type ListBlock = {
    id: string;
    object: string;
    type: "bulleted_list" | "numbered_list";
    children: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    created_time: string;
    last_edited_time: string;
};

export type ListItemBlock = {
    id: string;
    object: string;
    type: "list_item";
    children: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    list_item: BulletedListItemBlock["bulleted_list_item"];
    created_time: string;
    last_edited_time: string;
};

export type BlockWithChildren =
    | (Block & {
          type: BlockType;
          children: BlockWithChildren[];
      })
    | ListBlock
    | ListItemBlock;

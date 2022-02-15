import {
    ListBlockChildrenResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
export type PropertyValueEditedTime =
    ExtractedPropertyValue<"last_edited_time">;

export type Block = Extract<
    ListBlockChildrenResponse["results"][number],
    { type: string }
>;

export type BlockType = Block["type"];

type ExtractedBlockType<TType extends BlockType> = Extract<
    Block,
    { type: TType }
>;

export type ParagraphBlock = ExtractedBlockType<"paragraph">;

export type HeadingOneBlock = ExtractedBlockType<"heading_1">;
export type HeadingTwoBlock = ExtractedBlockType<"heading_2">;
export type HeadingThreeBlock = ExtractedBlockType<"heading_3">;

export type HeadingBlock =
    | HeadingOneBlock
    | HeadingTwoBlock
    | HeadingThreeBlock;

export type BulletedListItemBlock = ExtractedBlockType<"bulleted_list_item">;
export type NumberedListItemBlock = ExtractedBlockType<"numbered_list_item">;

export type QuoteBlock = ExtractedBlockType<"quote">;
export type EquationBlock = ExtractedBlockType<"equation">;
export type CodeBlock = ExtractedBlockType<"code">;
export type CalloutBlock = ExtractedBlockType<"callout">;
export type ToggleBlock = ExtractedBlockType<"toggle">;

export type RichText = ParagraphBlock["paragraph"]["text"][number];

export type ImageBlock = ExtractedBlockType<"image">;
export type File = ImageBlock["image"];

export type ListBlock = {
    id: string;
    object: string;
    type: "bulleted_list" | "numbered_list";
    childblocks: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    created_time: string;
    last_edited_time: string;
};

export type ListItemBlock = {
    id: string;
    object: string;
    type: "list_item";
    childblocks: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    list_item: BulletedListItemBlock["bulleted_list_item"];
    created_time: string;
    last_edited_time: string;
};

export type BlockWithChildren =
    | (Block & {
          type: BlockType;
          childblocks: BlockWithChildren[];
      })
    | ListBlock
    | ListItemBlock;

const createListBlock = (
    blocktype: "bulleted_list" | "numbered_list",
    blocks: Array<BlockWithChildren>,
) => {
    const processedChildren: BlockWithChildren[] = blocks.map(
        (block: BlockWithChildren) => {
            if (
                block.type == "bulleted_list_item" ||
                block.type == "numbered_list_item"
            ) {
                const blockContent =
                    block.type == "bulleted_list_item"
                        ? block.bulleted_list_item
                        : block.numbered_list_item;
                const ablock: ListItemBlock = {
                    ...block,
                    type: "list_item",
                    list_item: blockContent,
                };
                return ablock;
            }
            return block;
        },
    );
    const block: BlockWithChildren = {
        object: blocks[0].object,
        id: blocks[0].id,
        created_time: new Date(Date.now()).toISOString(),
        last_edited_time: new Date(Date.now()).toISOString(),
        has_children: true,
        archived: false,
        type: blocktype,
        childblocks: processedChildren,
    };
    return block;
};

export const extractListItems = (
    blocks: Array<BlockWithChildren>,
): Array<BlockWithChildren> => {
    const postprocessed = Array<BlockWithChildren>();
    const bulleted_list_stack = Array<BlockWithChildren>();
    const numbered_list_stack = Array<BlockWithChildren>();

    blocks.forEach((block: BlockWithChildren) => {
        switch (block.type) {
            case "bulleted_list_item":
                bulleted_list_stack.push(block);
                break;
            case "numbered_list_item":
                numbered_list_stack.push(block);
                break;
            default:
                if (bulleted_list_stack.length > 0) {
                    postprocessed.push(
                        createListBlock("bulleted_list", bulleted_list_stack),
                    );
                } else if (numbered_list_stack.length > 0) {
                    postprocessed.push(
                        createListBlock("numbered_list", numbered_list_stack),
                    );
                }
                postprocessed.push(block);
                bulleted_list_stack.length = 0;
                numbered_list_stack.length = 0;
                break;
        }
    });

    if (bulleted_list_stack.length > 0) {
        postprocessed.push(
            createListBlock("bulleted_list", bulleted_list_stack),
        );
    } else if (numbered_list_stack.length > 0) {
        postprocessed.push(
            createListBlock("numbered_list", numbered_list_stack),
        );
    }

    return postprocessed;
};

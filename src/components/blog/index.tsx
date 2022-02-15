import { MultilineCodeBlock } from "@components/blog/code";
import { Heading1, Heading2, Heading3 } from "@components/blog/headings";
import { BlogImage } from "@components/blog/image";
import { ListItem, OrderedList, UnorderedList } from "@components/blog/lists";
import {
    Callout,
    NotSupportedBlock,
    Paragraph,
    Quote,
} from "@components/blog/text";

import { BlockWithChildren, extractListItems } from "@util/interface";

import { PropsWithChildren } from "react";

export type BlockContentProps = PropsWithChildren<BlockWithChildren>;

const renderBlock = (block: BlockWithChildren): React.ReactNode => {
    const childblocks: BlockWithChildren[] = block.has_children
        ? extractListItems(block.childblocks)
        : [];
    const content: React.ReactNode = childblocks.map(
        (block: BlockWithChildren) => {
            return renderBlock(block);
        },
    );
    switch (block.type) {
        case "paragraph":
            return <Paragraph key={block.id} {...block} />;
        case "heading_1":
            return <Heading1 key={block.id} {...block} />;
        case "heading_2":
            return <Heading2 key={block.id} {...block} />;
        case "heading_3":
            return <Heading3 key={block.id} {...block} />;
        case "quote":
            return (
                <Quote key={block.id} {...block}>
                    {content}
                </Quote>
            );
        case "callout":
            return (
                <Callout key={block.id} {...block}>
                    {content}
                </Callout>
            );
        case "divider":
            return <hr key={block.id} />;
        case "code":
            return <MultilineCodeBlock key={block.id} {...block} />;
        case "image":
            return <BlogImage key={block.id} {...block} />;
        case "bulleted_list":
            return (
                <UnorderedList key={block.id} {...block}>
                    {content}
                </UnorderedList>
            );
        case "numbered_list":
            return (
                <OrderedList key={block.id} {...block}>
                    {content}
                </OrderedList>
            );
        case "list_item":
            return (
                <ListItem key={block.id} {...block}>
                    {content}
                </ListItem>
            );
        default:
            return <NotSupportedBlock key={block.id} />;
    }
};

export const renderPage = (blocks: Array<BlockWithChildren>): JSX.Element => {
    const blocksWithList = extractListItems(blocks);
    return (
        <article className="prose mx-auto mt-8 w-full text-justify lg:prose-lg lg:mt-16 lg:w-3/4">
            {blocksWithList.map((block: BlockWithChildren) => {
                return renderBlock(block);
            })}
        </article>
    );
};

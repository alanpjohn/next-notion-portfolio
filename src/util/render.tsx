import { Callout, NotSupportedBlock, Paragraph, Quote } from "@components/blog";
import { Heading1, Heading2, Heading3 } from "@components/blog/headings";
import { BlogImage } from "@components/blog/image";
import { ListItem, OrderedList, UnorderedList } from "@components/blog/lists";
import { ReactNode } from "react";
import {
    RichText,
    ParagraphBlock,
    HeadingBlock,
    QuoteBlock,
    CalloutBlock,
    ImageBlock,
    CodeBlock,
    BlockWithChildren,
    ListBlock,
    ListItemBlock,
} from "@util/interface";
import { MultilineCodeBlock } from "@components/blog/code";
import { CustomLink } from "@components/link";

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
        children: processedChildren,
    };
    return block;
};

const extractListItems = (
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

const renderText = (
    id: string,
    textBlocks?: Array<RichText>,
): React.ReactNode => {
    if (!textBlocks) {
        return <></>;
    }
    let count = 0;
    return textBlocks.map(({ annotations, plain_text, href }) => {
        const { bold, code, color, italic, strikethrough, underline } =
            annotations;
        count = count + 1;
        return (
            <span
                key={`text-${id}-${count}`}
                className={[
                    bold ? "bold-text" : "",
                    code ? "code-text" : "",
                    italic ? "italic-text" : "",
                    strikethrough ? "strikethrough-text" : "",
                    underline ? "underline-text" : "",
                ].join(" ")}
                style={color !== "default" ? { color } : {}}
            >
                {href ? (
                    <CustomLink className="default-link not-prose" href={href}>
                        {plain_text}
                    </CustomLink>
                ) : (
                    plain_text
                )}
            </span>
        );
    });
};

// const render = (block:BlockWithChildren):React.ReactNode => {}

const renderParagraph = (block: ParagraphBlock): React.ReactNode => {
    return (
        <Paragraph key={block.id}>
            {renderText(block.id, block.paragraph.text)}
        </Paragraph>
    );
};

const renderHeading = (block: HeadingBlock): React.ReactNode => {
    switch (block.type) {
        case "heading_1":
            return (
                <Heading1 key={block.id}>
                    {renderText(block.id, block.heading_1.text)}
                </Heading1>
            );
        case "heading_2":
            return (
                <Heading2 key={block.id}>
                    {renderText(block.id, block.heading_2.text)}
                </Heading2>
            );
        default:
            return (
                <Heading3 key={block.id}>
                    {renderText(block.id, block.heading_3.text)}
                </Heading3>
            );
    }
};

const renderQuote = (
    block: QuoteBlock,
    content: ReactNode,
): React.ReactNode => {
    return (
        <Quote key={block.id}>
            {block.has_children
                ? content
                : renderText(block.id, block.quote.text)}
        </Quote>
    );
};

const renderCallout = (
    block: CalloutBlock,
    content: ReactNode,
): React.ReactNode => {
    const emoji =
        block.callout.icon && block.callout.icon.type == "emoji"
            ? block.callout.icon.emoji
            : "💡";
    return (
        <Callout key={block.id} icon={emoji}>
            {block.has_children
                ? content
                : renderText(block.id, block.callout.text)}
        </Callout>
    );
};

const renderImage = (block: ImageBlock): React.ReactNode => {
    const altText = block.image.caption
        ? block.image.caption.map((richText) => richText.plain_text).join(" ")
        : "Some image";
    const src = block.image.type == "file" ? block.image.file.url : "external";
    if (src != "external") {
        return (
            <BlogImage key={block.id} src={src} altText={altText}>
                {renderText(block.id, block.image.caption)}
            </BlogImage>
        );
    }
    return <NotSupportedBlock key={block.id} />;
};

const renderOrderedList = (block: ListBlock, content: ReactNode) => {
    return <OrderedList key={block.id}>{content}</OrderedList>;
};

const renderUnorderedList = (block: ListBlock, content: ReactNode) => {
    return <UnorderedList key={block.id}>{content}</UnorderedList>;
};

const renderListItem = (
    block: ListItemBlock,
    content: ReactNode,
): React.ReactNode => {
    const text = block.list_item.text;
    return (
        <ListItem key={block.id}>
            {renderText(block.id, text)}
            {block.has_children ? content : ""}
        </ListItem>
    );
};

const renderCode = (block: CodeBlock): ReactNode => {
    return (
        <MultilineCodeBlock key={block.id} language={block.code.language}>
            {renderText(block.id, block.code.text)}
        </MultilineCodeBlock>
    );
};

const renderBlock = (block: BlockWithChildren): React.ReactNode => {
    const children: BlockWithChildren[] = block.has_children
        ? extractListItems(block.children)
        : [];
    const content: ReactNode = children.map((block: BlockWithChildren) => {
        return renderBlock(block);
    });
    switch (block.type) {
        case "paragraph":
            return renderParagraph(block);
        case "heading_1":
        case "heading_2":
        case "heading_3":
            return renderHeading(block);
        case "quote":
            return renderQuote(block, content);
        case "callout":
            return renderCallout(block, content);
        case "divider":
            return <hr key={block.id} />;
        case "code":
            return renderCode(block);
        case "image":
            return renderImage(block);
        case "bulleted_list":
            return renderUnorderedList(block, content);
        case "numbered_list":
            return renderOrderedList(block, content);
        case "list_item":
            return renderListItem(block, content);
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

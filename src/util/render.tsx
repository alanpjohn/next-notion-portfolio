import { Callout, NotSupportedBlock, Paragraph, Quote } from "@components/blog";
import { CodeBlock } from "@components/blog/code";
import { Heading1, Heading2, Heading3 } from "@components/blog/headings";
import { BlogImage } from "@components/blog/image";
import { ListItem, OrderedList, UnorderedList } from "@components/blog/lists";
import { EBlockType, IBlock, ITextData } from "@util/interface";

const renderText = (id: string, text?: Array<ITextData>): React.ReactNode => {
    if (!text) {
        return <></>;
    }
    let count = 0;
    return text.map((value) => {
        const {
            annotations: {
                bold,
                code,
                color,
                italic,
                strikethrough,
                underline,
            },
            text,
        } = value;
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
                {text.link ? (
                    <a href={text.link.url}>{text.content}</a>
                ) : (
                    text.content
                )}
            </span>
        );
    });
};

const renderBlockChildren = (block: IBlock): React.ReactNode => {
    const properties = block[block.type];

    if (properties) {
        if (properties.children) {
            return properties.children.map((block: IBlock) => {
                return renderBlock(block);
            });
        } else {
            return renderText(block.id, properties.text);
        }
    }

    return <></>;
};

const renderBlock = (block: IBlock): React.ReactNode => {
    const language = block.code?.language || "";
    const emoji = block.callout?.icon?.emoji || "💡";
    const src = block.image?.file?.url || "";

    switch (block.type) {
        case EBlockType.heading_1:
            return (
                <Heading1 key={block.id}>
                    {renderText(block.id, block[block.type]?.text)}
                </Heading1>
            );
        case EBlockType.heading_2:
            return (
                <Heading2 key={block.id}>
                    {renderText(block.id, block[block.type]?.text)}
                </Heading2>
            );
        case EBlockType.heading_3:
            return (
                <Heading3 key={block.id}>
                    {renderText(block.id, block[block.type]?.text)}
                </Heading3>
            );
        case EBlockType.paragraph:
            return (
                <Paragraph key={block.id}>
                    {renderText(block.id, block[block.type]?.text)}
                </Paragraph>
            );
        case EBlockType.quote:
            return <Quote key={block.id}>{renderBlockChildren(block)}</Quote>;
        case EBlockType.code:
            return (
                <CodeBlock key={block.id} language={language}>
                    {renderText(block.id, block[block.type]?.text)}
                </CodeBlock>
            );
        case EBlockType.callout:
            return (
                <Callout key={block.id} icon={emoji}>
                    {renderBlockChildren(block)}
                </Callout>
            );
        case EBlockType.divider:
            return <hr key={block.id} />;
        case EBlockType.numbered_list:
            return (
                <OrderedList key={block.id}>
                    {renderBlockChildren(block)}
                </OrderedList>
            );
        case EBlockType.bulleted_list:
            return (
                <UnorderedList key={block.id}>
                    {renderBlockChildren(block)}
                </UnorderedList>
            );
        case EBlockType.bulleted_list_item:
        case EBlockType.numbered_list_item:
            return (
                <ListItem key={block.id}>{renderBlockChildren(block)}</ListItem>
            );
        case EBlockType.image:
            if (src != "external") {
                return (
                    <BlogImage key={block.id} src={src}>
                        {renderText(block.id, block[block.type]?.caption)}
                    </BlogImage>
                );
            }
            return <NotSupportedBlock key={block.id} />;
        default:
            return <NotSupportedBlock key={block.id} />;
    }
};

const createListBlock = (blocktype: EBlockType, blocks: Array<IBlock>) => {
    const block: IBlock = {
        object: blocks[0].object,
        id: blocks[0].id,
        created_time: new Date(Date.now()),
        last_edited_time: new Date(Date.now()),
        has_children: true,
        archived: false,
        type: blocktype,
        [blocktype]: {
            children: blocks,
        },
    };
    return block;
};

const groupListItems = (blocks: Array<IBlock>): Array<IBlock> => {
    const preprocessed = Array<IBlock>();
    const bulleted_list_stack = Array<IBlock>();
    const numbered_list_stack = Array<IBlock>();

    blocks.forEach((block: IBlock) => {
        switch (block.type) {
            case EBlockType.bulleted_list_item:
                bulleted_list_stack.push(block);
                break;
            case EBlockType.numbered_list_item:
                numbered_list_stack.push(block);
                break;
            default:
                if (bulleted_list_stack.length > 0) {
                    preprocessed.push(
                        createListBlock(
                            EBlockType.bulleted_list,
                            bulleted_list_stack,
                        ),
                    );
                } else if (numbered_list_stack.length > 0) {
                    preprocessed.push(
                        createListBlock(
                            EBlockType.numbered_list,
                            numbered_list_stack,
                        ),
                    );
                } else {
                    preprocessed.push(block);
                }
                break;
        }
    });
    return blocks;
};

export const renderPage = (blocks: Array<IBlock>): JSX.Element => {
    blocks = groupListItems(blocks);
    return (
        <article className="prose lg:prose-lg">
            {blocks.map((block: IBlock) => {
                return renderBlock(block);
            })}
        </article>
    );
};

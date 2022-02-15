import { CustomLink } from "@components/link";

import {
    CalloutBlock,
    ParagraphBlock,
    QuoteBlock,
    RichText,
} from "@util/interface";

import { PropsWithChildren, PropsWithRef } from "react";
import { VscWarning } from "react-icons/vsc";

export const renderText = (
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

export const NotSupportedBlock: React.FC = () => {
    return (
        <div className="warning">
            <div className="icon">{<VscWarning />}</div>
            <div className="desc">
                Uh-oh! A certain Notion component has not been rendered as it is
                not supported by the blog yet.
            </div>
        </div>
    );
};
type ParagraphBlockProps = PropsWithRef<ParagraphBlock>;

export const Paragraph: React.FC<ParagraphBlockProps> = ({
    id,
    paragraph,
}: ParagraphBlockProps) => {
    return <p>{renderText(id, paragraph.text)}</p>;
};

type QuoteBlockProps = PropsWithChildren<QuoteBlock>;

export const Quote: React.FC<QuoteBlockProps> = ({
    id,
    quote,
    children,
    has_children,
}: QuoteBlockProps) => {
    console.log("children? ", has_children);
    console.log("text?", quote);
    return (
        <blockquote className="text-secondary">
            {has_children ? children : renderText(id, quote.text)}
        </blockquote>
    );
};

type CalloutProps = PropsWithChildren<CalloutBlock>;

export const Callout: React.FC<CalloutProps> = ({
    id,
    children,
    callout,
    has_children,
}: CalloutProps) => {
    const icon =
        callout.icon && callout.icon.type == "emoji"
            ? callout.icon.emoji
            : "💡";
    return (
        <div className="callout">
            <div>{icon}</div>
            <div>{has_children ? children : renderText(id, callout.text)}</div>
        </div>
    );
};

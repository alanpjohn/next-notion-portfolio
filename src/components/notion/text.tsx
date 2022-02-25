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
                    italic ? "font-playfair italic" : "",
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

type NotSupportedProps = PropsWithRef<{
    reason: string;
}>;

export const NotSupportedBlock: React.FC<NotSupportedProps> = ({
    reason,
}: NotSupportedProps) => {
    process.env.NODE_ENV == "development" && console.log(reason);
    return (
        <div className="mx-auto flex flex-row rounded-lg font-light px-6 items-center md:w-5/6 b-2 border-secondary">
            <div className="mr-4">{<VscWarning />}</div>
            <p>
                Uh-oh! A certain Notion component has not been rendered as it is
                not supported by the blog yet. {reason}
            </p>
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
    return (
        <blockquote className="ml-3 font-playfair italic bg-primary text-xl">
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
        <div className="mx-auto flex flex-col md:flex-row items-center rounded-lg font-light px-6 py-2 md:w-5/6 border-2 border-primary">
            <div>{icon}</div>
            <p className="ml-4">
                {has_children ? children : renderText(id, callout.text)}
            </p>
        </div>
    );
};

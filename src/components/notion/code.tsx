import { renderText } from "@components/notion/text";

import { CodeBlock } from "@util/interface";

import { PropsWithRef, useEffect, useRef } from "react";

type CodeBlockProps = PropsWithRef<CodeBlock>;

export const MultilineCodeBlock: React.FC<CodeBlockProps> = ({
    id,
    code,
}: CodeBlockProps) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        async function highlightcode() {
            const highlightjs = (await import("@util/highlight"))
                .getConfiguredHighlight;
            const hljs = highlightjs();
            if (ref.current) {
                hljs.highlightElement(ref.current);
            }
        }

        highlightcode();
    });

    return (
        <pre className="bg-codeblock">
            <code ref={ref} className={`${code.language}`}>
                {renderText(id, code.rich_text)}
            </code>
        </pre>
    );
};

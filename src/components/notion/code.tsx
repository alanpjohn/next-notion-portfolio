import { renderText } from "@components/notion/text";

import { getConfiguredHighlight } from "@util/highlight";
import { CodeBlock } from "@util/interface";

import { PropsWithRef, useEffect, useRef } from "react";

type CodeBlockProps = PropsWithRef<CodeBlock>;

export const MultilineCodeBlock: React.FC<CodeBlockProps> = ({
    id,
    code,
}: CodeBlockProps) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const hljs = getConfiguredHighlight();
        if (ref.current) {
            hljs.highlightElement(ref.current);
        }
    });

    return (
        <pre className="bg-codeblock">
            <code ref={ref} className={`${code.language}`}>
                {renderText(id, code.rich_text)}
            </code>
        </pre>
    );
};

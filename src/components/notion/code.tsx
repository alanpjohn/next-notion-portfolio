import { renderText } from "@components/notion/text";

import { CodeBlock } from "@util/interface";

import hljs from "highlight.js/lib/common";
import { PropsWithRef, useEffect, useRef } from "react";

type CodeBlockProps = PropsWithRef<CodeBlock>;

export const MultilineCodeBlock: React.FC<CodeBlockProps> = ({
    id,
    code,
}: CodeBlockProps) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        hljs.configure({ ignoreUnescapedHTML: true });
        if (ref.current) {
            hljs.highlightElement(ref.current);
        }
    });

    return (
        <pre className="codeblock">
            <code ref={ref} className={`${code.language}`}>
                {renderText(id, code.text)}
            </code>
        </pre>
    );
};

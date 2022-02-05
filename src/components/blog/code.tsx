import { BlockContentProps } from "@components/blog";
import { useEffect } from "react";

import highlight from "highlight.js";

type CodeProps = BlockContentProps & {
    language?: string;
};

export const MultilineCodeBlock: React.FC<CodeProps> = ({
    children,
    language = "",
}: CodeProps) => {
    useEffect(() => {
        highlight.configure({ ignoreUnescapedHTML: true });
        highlight.highlightAll();
    });

    return (
        <pre className="codeblock">
            <code className={`${language}`}>{children}</code>
        </pre>
    );
};

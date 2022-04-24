import { Footer } from "@components/footer";
import { NotionHeader } from "@components/header/blog";
import { CustomImage } from "@components/image";
import { CustomLink } from "@components/link";

import dynamic from "next/dynamic";
import { CodeBlock, ExtendedRecordMap } from "notion-types";
import React, { PropsWithChildren } from "react";
import { NotionRenderer } from "react-notion-x";

const Code = dynamic<{
    block: CodeBlock;
    defaultLanguage?: string | undefined;
    className?: string | undefined;
}>(
    import("react-notion-x/build/third-party/code").then(async (mod) => {
        await Promise.all([
            import("prismjs/components/prism-typescript"),
            import("prismjs/components/prism-javascript"),
            import("prismjs/components/prism-java"),
            import("prismjs/components/prism-bash"),
            import("prismjs/components/prism-shell-session"),
            import("prismjs/components/prism-json"),
            import("prismjs/components/prism-yaml"),
            import("prismjs/components/prism-docker"),
            import("prismjs/components/prism-hcl"),
            import("prismjs/components/prism-python"),
            import("prismjs/components/prism-go"),
        ]);
        return mod.Code;
    }),
);

export const NotionPage: React.FC<
    PropsWithChildren<{
        recordMap: ExtendedRecordMap;
    }>
> = ({ recordMap, children }) => {
    const components = React.useMemo(
        () => ({
            nextImage: CustomImage,
            nextLink: CustomLink,
            Code,
            Header: NotionHeader,
        }),
        [],
    );
    const footer = React.useMemo(() => <Footer />, []);
    return (
        <>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                showTableOfContents={true}
                previewImages={true}
                pageTitle={children}
                components={components}
                footer={footer}
            />
        </>
    );
};

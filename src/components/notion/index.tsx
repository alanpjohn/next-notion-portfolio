import { CustomImage } from "@components/image";
import { CustomLink } from "@components/link";

import dynamic from "next/dynamic";
import { CodeBlock, ExtendedRecordMap } from "notion-types";
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

export const NotionPage: React.FC<{
    recordMap: ExtendedRecordMap;
    post: boolean;
}> = ({ recordMap, post = true }) => {
    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={post}
            showTableOfContents={post}
            disableHeader={true}
            previewImages={true}
            pageCover={<></>}
            components={{
                nextImage: CustomImage,
                nextLink: CustomLink,
                Code: Code,
            }}
        />
    );
};

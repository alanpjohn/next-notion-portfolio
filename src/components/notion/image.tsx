import { NotSupportedBlock, renderText } from "@components/notion/text";

import { ImageBlock } from "@util/interface";

import Image from "next/image";
import { PropsWithRef } from "react";

type ImageProps = PropsWithRef<ImageBlock>;

export const BlogImage: React.FC<ImageProps> = ({ id, image }: ImageProps) => {
    const altText = image.caption
        ? image.caption.map((richText) => richText.plain_text).join(" ")
        : "Some image";
    const src = image.type == "file" ? image.file.url : "external";
    const children = renderText(id, image.caption);
    if (src == "external") {
        return (
            <NotSupportedBlock
                key={id}
                reason={`Image type ${image.type} not supported`}
            />
        );
    }
    return (
        <figure className="blog__image not-prose">
            <Image src={src} layout="fill" className="image" alt={altText} />
            {children && <figcaption>{children}</figcaption>}
        </figure>
    );
};

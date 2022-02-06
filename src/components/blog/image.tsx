import Image from "next/image";
import { BlockContentProps } from "@components/blog";

type ImageProps = BlockContentProps & {
    src: string;
    altText: string;
};

export const BlogImage: React.FC<ImageProps> = ({
    children,
    src,
    altText,
}: ImageProps) => {
    return (
        <figure className="image-container not-prose">
            <Image src={src} layout="fill" className="image" alt={altText} />
            {children && <figcaption>{children}</figcaption>}
        </figure>
    );
};

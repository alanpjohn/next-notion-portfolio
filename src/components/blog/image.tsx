import { BlockContentProps } from "@components/blog";

type ImageProps = BlockContentProps & {
    src: string;
};

export const BlogImage: React.FC<ImageProps> = ({
    children,
    src,
}: ImageProps) => {
    return (
        <figure className="h-1/3">
            <img src={src} className="relative" />
            {children && <figcaption>{children}</figcaption>}
        </figure>
    );
};

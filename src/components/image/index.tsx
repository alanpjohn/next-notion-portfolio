import Image from "next/image";

type ImageProps = {
    src: string;
    height: string;
    width: string;
    altText: string;
};

export const CustomImage: React.FC<ImageProps> = ({
    src,
    height,
    width,
    altText,
}: ImageProps) => {
    return (
        <Image
            src={src}
            height={height}
            width={width}
            className=""
            priority
            alt={altText}
        />
    );
};

import Image, { ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
    src: string;
};

export const CustomImage: React.FC<CustomImageProps> = ({
    src,
    alt,
    blurDataURL,
    priority,
    width,
    height,
    className = "",
    onLoad,
}: CustomImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            blurDataURL={blurDataURL}
            placeholder="blur"
            priority={priority}
            className={className}
            onLoad={onLoad}
        />
    );
};

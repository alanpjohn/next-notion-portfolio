import Image from "next/image";
import { FaHeartbeat } from "react-icons/fa";

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
        <div className="custom-img">
            <div className="top-nav">
                <span>{altText}</span>
                <FaHeartbeat />
            </div>
            <Image
                src={src}
                height={height}
                width={width}
                className="img"
                priority
                layout="intrinsic"
                alt={altText}
            />
        </div>
    );
};

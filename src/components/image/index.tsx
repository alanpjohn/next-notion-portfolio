import Image from "next/image"

type ImageProps = {
    src: string;
    height: string;
    width: string;
}

export const CustomImage:React.FC<ImageProps> = ({src,height,width}:ImageProps)=>{
    return <Image
        src={src}
        height={height}
        width={width}
        className="grayscale hover:grayscale-0 transition-all duration-300"
    />
}
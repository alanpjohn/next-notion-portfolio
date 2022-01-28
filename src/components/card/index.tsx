import { RoundButton } from "@components/button";
import { IPost, ITag } from "@util/interface";
import { PropsWithChildren } from "react";
import { FaArrowRight } from "react-icons/fa";

type TagProps = PropsWithChildren<ITag>;

export const Tag: React.FC<TagProps> = ({ name }: TagProps) => {
    return (
        <span className="p-2 decoration-dotted font-clash text-lg underline underline-offset-4 font-light text-eerie">
            {name}
        </span>
    );
};

type PostProps = PropsWithChildren<IPost>;

export const PostCard: React.FC<PostProps> = ({
    url,
    properties,
}: PostProps) => {
    const link = `/blog/${url}`;
    return (
        <a
            href={link}
            className="mx-auto my-16 max-w-3xl flex flex-row px-2 py-4 border-b-2 border-eerie"
        >
            <div className="flex-grow flex flex-col ">
                <span className="font-cabinet text-2xl md:text-5xl">
                    {properties.title}
                </span>
                <div className="pb-4">
                    {properties.tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <span className="font-cabinet font-light text-xl md:text-2xl">
                    {properties.description}
                </span>
            </div>
            <div className="flex">
                <div className="m-auto">
                    <RoundButton href={link} Icon={FaArrowRight} />
                </div>
            </div>
        </a>
    );
};

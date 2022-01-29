import { RoundButton } from "@components/button";
import { IPost, IProject, ITag } from "@util/interface";
import { PropsWithChildren } from "react";
import { FaArrowRight, FaCode } from "react-icons/fa";

type TagProps = PropsWithChildren<ITag>;

export const Tag: React.FC<TagProps> = ({ name }: TagProps) => {
    return (
        <span className="px-2 whitespace-nowrap decoration-dotted font-clash text-lg underline underline-offset-4 font-light text-eerie">
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
            className="mx-auto my-16 max-w-3xl flex flex-row px-2 py-4 border-b-2  border-eerie group"
        >
            <div className="flex-grow flex flex-col ">
                <span className="font-cabinet text-2xl md:text-5xl group-hover:text-red-500">
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

type ProjectProps = PropsWithChildren<IProject>;

export const ProjectCard: React.FC<ProjectProps> = ({
    properties,
}: ProjectProps) => {
    return (
        <a
            href={properties.link}
            className="flex group flex-row m-auto mb-8 pt-4 border-b-2 border-eerie"
        >
            <div className="flex flex-col flex-wrap lg:flex-grow">
                <span className="font-cabinet text-lg md:text-2xl group-hover:text-red-500">
                    {properties.title}
                </span>
                <div className="flex flex-wrap">
                    {properties.tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <div className="inline my-auto pt-2">
                    {properties.description}
                </div>
            </div>
            <div className="flex">
                <div className="mx-auto">
                    <RoundButton href={properties.link} Icon={FaCode} />
                </div>
            </div>
        </a>
    );
};

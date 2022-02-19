import { CustomButton, RoundButton } from "@components/button";
import { CustomLink } from "@components/link";

import { IPost, IProject, ITag } from "@util/interface";

import { motion } from "framer-motion";
import { PropsWithChildren, PropsWithRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { VscGitPullRequest } from "react-icons/vsc";

type TagProps = PropsWithRef<ITag>;

export const Tag: React.FC<TagProps> = ({ name }: TagProps) => {
    return (
        <span
            className="
        whitespace-nowrap bg-secondary m-1 w-fit 
        rounded-lg py-1 px-2 font-clash text-sm uppercase"
        >
            {name}
        </span>
    );
};

const cardVariants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
};

type PostProps = PropsWithChildren<IPost>;

export const PostCard: React.FC<PostProps> = ({
    url,
    title,
    tags,
    description,
}: PostProps) => {
    const link = `/blog/${url}`;
    return (
        <CustomLink
            href={link}
            className="mx-auto mb-16 flex max-w-3xl flex-row border-b-2 border-primary group"
        >
            <motion.div
                className="my-4 mx-2 flex flex-grow flex-col"
                variants={cardVariants}
            >
                <h3
                    className="font-cabinet text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                group-hover:text-razzmatazz dark:group-hover:text-mint"
                >
                    {title}
                </h3>
                <div className="py-4">
                    {tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <span className="font-cabinet text-xl font-light md:text-2xl">
                    {description}
                </span>
            </motion.div>
            <div className="flex">
                <div className="m-auto">
                    <RoundButton href={link} Icon={FaArrowRight} />
                </div>
            </div>
        </CustomLink>
    );
};

type ProjectCardProps = PropsWithRef<IProject>;

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    date,
    description,
    link,
    tags,
}: ProjectCardProps) => {
    return (
        <div className="card max-w-lg">
            <div className="card__nav">
                <VscGitPullRequest />
                <span>{date}</span>
            </div>
            <div className="card__title">
                <CustomLink href={link} className="">
                    {title}
                </CustomLink>
            </div>
            <div className="h-56 w-full border-y-2 px-2 flex flex-row items-center border-primary">
                <p className="text-base flex-1 px-2 font-light">
                    {description}
                </p>
                <div className="flex h-full flex-shrink flex-col py-4 px-2 justify-center border-l-2 border-primary">
                    {tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </div>
            <CustomButton href={link} text="Go to Project" />
        </div>
    );
};

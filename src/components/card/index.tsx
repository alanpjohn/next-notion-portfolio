import { RoundButton } from "@components/button";
import { CustomLink } from "@components/link";
import { RenderedProfileContent } from "@components/notion";

import { IPost, IProfileSection, IProject, ITag } from "@util/interface";

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
    modifiedDate: date,
    description,
    link,
    tags,
}: ProjectCardProps) => {
    return (
        <CustomLink href={link} className="">
            <div className="card group my-10 max-w-4xl">
                <div className="card__nav">
                    <VscGitPullRequest />
                    <span>{date}</span>
                </div>
                <div className="flex flex-col md:flex-row p-4 justify-evenly items-center">
                    <h3 className="my-10 md:m-0 md:basis-1/5 text-4xl">
                        {title}
                    </h3>
                    <p className="md:basis-2/5">{description}</p>
                    <div className="self-end my-4 md:self-auto md:my-0">
                        <RoundButton Icon={FaArrowRight} href={link} />
                    </div>
                </div>
                <div className="flex w-full flex-shrink flex-wrap flex-row p-2 justify-center border-t-2 border-primary">
                    {tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </div>
        </CustomLink>
    );
};

type ProfileDetailsProps = PropsWithRef<IProfileSection>;

export const ProfileSectionCard: React.FC<ProfileDetailsProps> = ({
    title,
    content,
}) => {
    return (
        <div className="md:card md:p-8 rounded-md ">
            <h3 className="text-4xl my-4">{title}</h3>
            <RenderedProfileContent blocks={content} />
        </div>
    );
};

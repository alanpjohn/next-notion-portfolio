import { RoundButton } from "@components/button";
import { IPost, IProject, ITag } from "@util/interface";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { FaArrowRight, FaCode } from "react-icons/fa";

type TagProps = PropsWithChildren<ITag>;

export const Tag: React.FC<TagProps> = ({ name }: TagProps) => {
    return <span className="tag">{name}</span>;
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
        <a href={link} className="post group">
            <motion.li className="content" variants={cardVariants}>
                <span className="title group-hover:text-accent">{title}</span>
                <div className="pb-4">
                    {tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <span className="description">{description}</span>
            </motion.li>
            <div className="sidebar">
                <div>
                    <RoundButton href={link} Icon={FaArrowRight} />
                </div>
            </div>
        </a>
    );
};

type ProjectProps = PropsWithChildren<IProject>;

export const ProjectCard: React.FC<ProjectProps> = ({
    link,
    title,
    tags,
    description,
}: ProjectProps) => {
    return (
        <a href={link}>
            <motion.li className="project group" variants={cardVariants}>
                <div className="content">
                    <span className="title group-hover:text-accent">
                        {title}
                    </span>
                    <div className="flex flex-wrap">
                        {tags.map((tag: ITag) => (
                            <Tag key={tag.id} {...tag} />
                        ))}
                    </div>
                    <div className="description">{description}</div>
                </div>
                <div className="sidebar">
                    <div>
                        <RoundButton href={link} Icon={FaCode} />
                    </div>
                </div>
            </motion.li>
        </a>
    );
};

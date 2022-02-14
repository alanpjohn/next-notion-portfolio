import { CustomButton, RoundButton } from "@components/button";
import { CustomLink } from "@components/link";
import { IPost, IProject, ITag } from "@util/interface";
import { motion } from "framer-motion";
import { PropsWithChildren, PropsWithRef } from "react";
import { FaArrowRight } from "react-icons/fa";

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
        <CustomLink href={link} className="post group">
            <motion.div className="content" variants={cardVariants}>
                <span className="title group-hover:text-accent dark:group-hover:text-darkaccent">
                    {title}
                </span>
                <div className="py-4">
                    {tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <span className="description">{description}</span>
            </motion.div>
            <div className="sidebar">
                <div>
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
        <div className="project-card">
            <div className="project-nav">{date}</div>
            <div className="project-title">
                <CustomLink href={link} className="">
                    {title}
                </CustomLink>
            </div>
            <div className="project-content">
                <div className="project-desc">{description}</div>
                <div className="project-tags">
                    {tags.map((tag) => (
                        <span key={tag.id}>{tag.name}</span>
                    ))}
                </div>
            </div>
            <CustomButton href={link} text="Go to Project" />
        </div>
    );
};

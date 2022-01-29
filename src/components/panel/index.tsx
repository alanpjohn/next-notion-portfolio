import { PostCard, ProjectCard } from "@components/card";
import { IPost, IProject } from "@util/interface";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const PanelVariants = {
    hidden: {},
    enter: {
        transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
};

type ProjectPanelProps = PropsWithChildren<{ projects: IProject[] }>;

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
    projects,
}: ProjectPanelProps) => {
    return (
        <motion.ul
            initial="hidden"
            whileInView="enter"
            variants={PanelVariants}
            className="m-auto"
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </motion.ul>
    );
};

type PostPanelProps = PropsWithChildren<{ posts: IPost[] }>;

export const PostPanel: React.FC<PostPanelProps> = ({
    posts,
}: PostPanelProps) => {
    return (
        <motion.ul initial="hidden" animate="enter" variants={PanelVariants}>
            {posts.map((post) => (
                <PostCard
                    id={post.id}
                    key={post.id}
                    url={post.url}
                    properties={post.properties}
                />
            ))}
        </motion.ul>
    );
};

export const TechStack: React.FC = () => {
    return <div>Python</div>;
};

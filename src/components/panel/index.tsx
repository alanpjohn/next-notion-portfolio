import { PostCard, ProjectCard } from "@components/card";
import { IPost, IProject } from "@util/interface";
import { techStackDetails } from "@util/tech";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";

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
            className="ml-2 w-full md:w-3/4"
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
                <PostCard key={post.id} {...post} />
            ))}
        </motion.ul>
    );
};

export const TechStack: React.FC = () => {
    const [isSelected, setSelected] = useState(techStackDetails[0]);

    return (
        <div className="tech-stack">
            <div className="nav">
                {techStackDetails.map((tech) => (
                    <div
                        key={tech.id}
                        className={`
                        nav-item 
                        ${tech.id == isSelected.id ? "selected" : ""}
                    `}
                        onClick={() => setSelected(tech)}
                    >
                        {tech.acronym}
                        {tech.id === isSelected.id ? (
                            <motion.div
                                className="highlight"
                                layoutId="underline"
                            />
                        ) : null}
                    </div>
                ))}
            </div>
            <div>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={isSelected ? isSelected.domain : "empty"}
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="main"
                    >
                        <span className="domain">{isSelected.domain}</span>
                        <div className="tools">
                            {isSelected.tools.map((Icon) => (
                                <Icon
                                    key={Icon.name}
                                    className="hover:text-accent"
                                />
                            ))}
                        </div>
                        <div className="description">
                            <p>{isSelected.description}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

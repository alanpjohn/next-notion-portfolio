import { PostCard } from "@components/card";

import { IPost } from "@util/interface";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const PanelVariants = {
    hidden: {},
    enter: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
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

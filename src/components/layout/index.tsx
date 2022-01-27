import { ReactNode } from "react";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";

type Props = {
    children: ReactNode;
    title: string;
    description: string;
};

const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: 0 },
};

export const Layout: React.FC<Props> = ({
    children,
    title,
    description,
}: Props) => {
    return (
        <div>
            <NextSeo title={title} description={description} />
            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: "linear" }}
                className="flex flex-col items-start w-full py-20"
            >
                {children}
            </motion.main>
        </div>
    );
};

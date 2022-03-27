import { CustomButton } from "@components/button";
import { DarkModeToggle } from "@components/darktoggle";
import { CustomLink } from "@components/link";
import { Menu } from "@components/menu";

import { motion, useTransform, useViewportScroll } from "framer-motion";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const headerVariants = {
    hidden: { opacity: 0, x: 0, y: -100 },
    enter: { opacity: 1, x: 0, y: 0 },
};

export const Header: React.FC = () => {
    const { scrollY } = useViewportScroll();
    const buttonAppearance = useTransform(
        scrollY,
        [0, 300, 325],
        [-100, -100, 0],
    );
    const headerDisappearance = useTransform(
        scrollY,
        [0, 250, 300],
        [0, 0, -300],
    );

    return (
        <header>
            <motion.div
                className="header border-b-2 border-secondary bg-primary"
                variants={headerVariants}
                initial="hidden"
                animate="enter"
                style={{ y: headerDisappearance }}
            >
                <CustomLink
                    href="/"
                    className="font-rubik text-4xl font-semibold "
                >
                    AJ
                </CustomLink>
                <DarkModeToggle className="hidden md:block" />
                <div className="w-2/5 md:w-min">
                    <Menu />
                </div>
            </motion.div>
            <motion.div className="header" style={{ y: buttonAppearance }}>
                <CustomButton text="Back to top" href="#" Icon={FaArrowUp} />
            </motion.div>
        </header>
    );
};

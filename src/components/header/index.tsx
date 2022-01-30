import { PrimaryButton } from "@components/button";
import { Menu } from "@components/menu";
import {
    motion,
    useSpring,
    useTime,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

export const Header: React.FC = () => {
    const { scrollYProgress } = useViewportScroll();
    const buttonAppearance = useTransform(
        scrollYProgress,
        [0, 0.3, 0.35],
        [-100, -100, 0],
    );
    const headerDisappearance = useTransform(
        scrollYProgress,
        [0, 0.25, 0.3],
        [0, 0, -300],
    );
    const time = useTime();
    const headerAppearance = useSpring(
        useTransform(time, [0, 1500, 1750], [0, 0, 1]),
        { stiffness: 300 },
    );
    return (
        <div>
            <motion.div
                className="header"
                style={{ y: headerDisappearance, opacity: headerAppearance }}
            >
                <Link href="/">
                    <a className="logo">AJ</a>
                </Link>
                <div className="w-2/5">
                    <Menu />
                </div>
            </motion.div>
            <motion.div className="header" style={{ y: buttonAppearance }}>
                <PrimaryButton text="Back to top" href="#" Icon={FaArrowUp} />
            </motion.div>
        </div>
    );
};

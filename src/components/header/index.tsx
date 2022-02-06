import { PrimaryButton } from "@components/button";
import { CustomLink } from "@components/link";
import { Menu } from "@components/menu";
import { isActiveLink } from "@util/router";
import {
    motion,
    useSpring,
    useTime,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

export const Header: React.FC = () => {
    const { pathname } = useRouter();
    const isHome = isActiveLink("/", pathname);

    const { scrollY } = useViewportScroll();
    const buttonAppearance = useTransform(
        scrollY,
        [0, 200, 250],
        [-100, -100, 0],
    );
    const headerDisappearance = useTransform(
        scrollY,
        [0, 175, 225],
        [0, 0, -300],
    );
    const time = useTime();
    const headerAppearance = useSpring(
        useTransform(time, [0, 1500, 1750], isHome ? [0, 0, 1] : [1, 1, 1]),
        { stiffness: 300 },
    );
    return (
        <div>
            <motion.div
                className="header"
                style={{ y: headerDisappearance, opacity: headerAppearance }}
            >
                <CustomLink href="/" className="logo">
                    AJ
                </CustomLink>
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

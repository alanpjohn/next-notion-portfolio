import { CustomLink } from "@components/link";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

type NavigationProps = {
    text: string;
    href: string;
    isOpen?: boolean;
};

const menuLinkVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

export const MenuLink: React.FC<NavigationProps> = ({
    text,
    href,
}: NavigationProps) => {
    return (
        <CustomLink
            className="my-24 w-full font-clash text-xl font-medium bg-primary hover:text-orange dark:hover:text-purple"
            href={href}
        >
            <motion.div
                variants={menuLinkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {text}
            </motion.div>
        </CustomLink>
    );
};

export const NavLink: React.FC<NavigationProps> = ({
    text,
    href,
}: NavigationProps) => {
    return (
        <CustomLink
            className="font-clash text-base font-medium hover:text-orange dark:hover:text-purple lg:text-xl"
            href={href}
        >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {text}
            </motion.div>
        </CustomLink>
    );
};

const menuVariants = {
    open: {
        y: 0,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        y: -150,
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export const Menu: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <motion.nav
            className="flex h-16 flex-col overflow-visible"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
        >
            <div className="my-auto hidden flex-row justify-center md:flex">
                <NavLink text="Home" href="/" />
                <span className="mx-4"> / </span>
                <NavLink text="Blog" href="/blog" />
                <span className="mx-4"> / </span>
                <NavLink text="Photography" href="photos.alanjohn.dev" />
            </div>
            <BiMenu
                className="absolute z-30 block h-16 self-end text-4xl md:hidden"
                onClick={() => setOpen(!isOpen)}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={menuVariants}
                        className="mt-20 block text-right md:hidden"
                        onClick={() => setOpen(!isOpen)}
                    >
                        <MenuLink text="Home" href="/" isOpen={isOpen} />
                        <MenuLink text="Blog" href="/blog" isOpen={isOpen} />
                        <MenuLink
                            text="Photography"
                            href="photos.alanjohn.dev"
                            isOpen={isOpen}
                        />
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

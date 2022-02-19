import { CustomLink } from "@components/link";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

type NavigationProps = {
    text: string;
    href: string;
    isOpen?: boolean;
};

const menuLinkVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: 50,
        opacity: 0,
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
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 0.95 }}
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
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            delayChildren: 0.3,
        },
    },
};

export const Menu: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeComplete", () => setOpen(false));
        return () => {
            router.events.off("routeChangeComplete", () => setOpen(false));
        };
    }, [router.events]);

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
                <NavLink
                    text="Photography"
                    href="https://photos.alanjohn.dev"
                />
            </div>
            {isOpen ? (
                <BiX
                    className="absolute z-30 block h-16 self-end text-4xl md:hidden"
                    onClick={() => setOpen(false)}
                />
            ) : (
                <BiMenu
                    className="absolute z-30 block h-16 self-end text-4xl md:hidden"
                    onClick={() => setOpen(true)}
                />
            )}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={menuVariants}
                        className="mt-20 block text-right md:hidden"
                        initial="closed"
                        onClick={() => setOpen(!isOpen)}
                        exit="closed"
                    >
                        <MenuLink text="Home" href="/" isOpen={isOpen} />
                        <MenuLink text="Blog" href="/blog" isOpen={isOpen} />
                        <MenuLink
                            text="Photography"
                            href="https://photos.alanjohn.dev"
                            isOpen={isOpen}
                        />
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

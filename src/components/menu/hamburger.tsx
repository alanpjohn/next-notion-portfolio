import { DarkModeToggle } from "@components/darktoggle";
import { CustomLink } from "@components/link";

import { navigationLinkData } from "@util/social";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { PropsWithRef, useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

type NavigationProps = PropsWithRef<{
    text: string;
    href: string;
}>;

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
            className="w-full font-clash text-xl font-medium bg-primary hover:text-orange dark:hover:text-purple"
            href={href}
        >
            <motion.div
                variants={menuLinkVariants}
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 0.95 }}
                className="my-4"
            >
                {text}
            </motion.div>
        </CustomLink>
    );
};

const menuVariants = {
    open: {
        x: 0,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        x: 300,
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
            delayChildren: 0.2,
        },
    },
};

type HamburgerProps = PropsWithRef<unknown>;

const HamburgerMenu: React.FC<HamburgerProps> = () => {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeComplete", () => setOpen(false));
        return () => {
            router.events.off("routeChangeComplete", () => setOpen(false));
        };
    }, [router.events]);

    return (
        <>
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
                        animate={isOpen ? "open" : "closed"}
                        variants={menuVariants}
                        className="min-h-screen bg-primary border-l-2 border-secondary text-center pt-40 pl-2 -mr-4"
                        initial="closed"
                        onClick={() => setOpen(!isOpen)}
                        exit="closed"
                    >
                        <DarkModeToggle className="mx-auto w-min py-4" />
                        {navigationLinkData.map(({ text, href }) => (
                            <MenuLink key={text} text={text} href={href} />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    );
};

export default HamburgerMenu;

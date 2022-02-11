import { CustomLink } from "@components/link";
import { motion } from "framer-motion";
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
    isOpen = true,
}: NavigationProps) => {
    return (
        <CustomLink className={`navlink ${isOpen ? "" : "hidden"}`} href={href}>
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
        <CustomLink className="navlink" href={href}>
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
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export const Menu: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <motion.nav
            className="nav"
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            <div className="navbar">
                <NavLink text="Home" href="/" />
                <NavLink text="Blog" href="/blog" />
                <NavLink
                    text="Photography"
                    href="https://alanjohn.myportfolio.com/"
                />
            </div>
            <BiMenu className="icon" onClick={() => setOpen(!isOpen)} />
            <motion.ul
                variants={menuVariants}
                className="navlinks"
                onClick={() => setOpen(!isOpen)}
            >
                <MenuLink text="Home" href="/" isOpen={isOpen} />
                <MenuLink text="Blog" href="/blog" isOpen={isOpen} />
                <MenuLink
                    text="Photography"
                    href="https://alanjohn.myportfolio.com/"
                    isOpen={isOpen}
                />
            </motion.ul>
        </motion.nav>
    );
};

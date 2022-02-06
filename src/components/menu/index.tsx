import { motion } from "framer-motion";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

type NavigationProps = {
    text: string;
    href: string;
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
        <a className="navlink" href={href}>
            <motion.li
                variants={menuLinkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {text}
            </motion.li>
        </a>
    );
};

export const NavLink: React.FC<NavigationProps> = ({
    text,
    href,
}: NavigationProps) => {
    return (
        <a className="navlink" href={href}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {text}
            </motion.div>
        </a>
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
            onPointerLeave={() => setOpen(false)}
        >
            <div className="navbar">
                <NavLink text="Home" href="/" />
                <NavLink text="Blog" href="/blog" />
                <NavLink
                    text="Photography"
                    href="https://alanjohn.myportfolio.com/"
                />
            </div>
            <BiMenu className="icon" onClick={() => setOpen(true)} />
            <motion.ul variants={menuVariants} className="navlinks">
                <MenuLink text="Home" href="/" />
                <MenuLink text="Blog" href="/blog" />
                <MenuLink
                    text="Photography"
                    href="https://alanjohn.myportfolio.com/"
                />
            </motion.ul>
        </motion.nav>
    );
};

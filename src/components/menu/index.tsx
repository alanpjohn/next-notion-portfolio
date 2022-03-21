import { CustomLink } from "@components/link";

import { navigationLinkData } from "@util/social";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PropsWithRef } from "react";
import { isMobile } from "react-device-detect";
import { BiMenu } from "react-icons/bi";

type HamburgerProps = PropsWithRef<unknown>;

const HamburgerMenu = dynamic<HamburgerProps>(
    import("@components/menu/hamburger"),
    {
        loading: () => (
            <BiMenu className="absolute z-30 block h-16 self-end text-4xl md:hidden" />
        ),
    },
);

type NavigationProps = PropsWithRef<{
    text: string;
    href: string;
}>;

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

export const Menu: React.FC = () => {
    return isMobile ? (
        <nav className="flex h-16 flex-col overflow-visible">
            <HamburgerMenu />
        </nav>
    ) : (
        <nav className="flex h-16 flex-col overflow-visible">
            <div className="my-auto hidden flex-row justify-center md:flex">
                {navigationLinkData.map(({ text, href }) => (
                    <div key={text} className="flex flex-row del-last">
                        <NavLink text={text} href={href} />
                        <span className="mx-2">/</span>
                    </div>
                ))}
            </div>
            <HamburgerMenu />
        </nav>
    );
};

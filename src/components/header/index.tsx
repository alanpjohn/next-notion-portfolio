import { NavigationLink } from "@components/menu";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
    return (
        <div
            className="
        w-full fixed flex flex-row justify-between items-center
        h-16 md:h-20 z-50
        px-4 md:px-8 lg:px-16 xl:px-28 2xl:px-36
        "
            data-testid="container"
        >
            <Link href="/">
                <a className="logo">AJ</a>
            </Link>
            <div className="flex flex-row items-center justify-center w-2/5">
                <NavigationLink text="About" href="#about" />
                <NavigationLink text="Blog" href="/blog" />
                <NavigationLink
                    text="Photography"
                    href="https://alanjohn.myportfolio.com/"
                />
            </div>
        </div>
    );
};

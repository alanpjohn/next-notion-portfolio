import { Contact } from "@components/contact";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
    return (
        <div
            className="
        w-full fixed flex flex-row justify-between items-center
        h-16 md:h-20 z-50
        px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-72
        "
            data-testid="container"
        >
            <Link href="/">
                <a className="logo">AJ</a>
            </Link>
            <div className="flex flex-row items-center">
                <Contact />
            </div>
        </div>
    );
};

import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
    return (
        <div
            className="
        w-full fixed bg-white flex flex-row justify-between items-center
        h-16 md:h-20 z-50
        px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96
        "
            data-testid="container"
        >
            <Link href="/">
                <a className="logo">AJ</a>
            </Link>
            <div className="flex flex-row items-center">Hello</div>
        </div>
    );
};

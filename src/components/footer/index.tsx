import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => (
    <footer className="w-full flex flex-col items-center">
        <a
            className="text-sm mb-4 text-jet hover:text-celadon dark:text-timberwolf dark:hover:text-soda transition-colors"
            href="mailto:alansandra2013@gmail.com?Subject=Hello"
        >
            alansandra2013@gmail.com
        </a>
        <Link href="/posts">
            <a className="text-sm mb-8 text-jet hover:text-celadon dark:text-timberwolf dark:hover:text-soda transition-colors">
                Powered by the Notion API. Find out more.
            </a>
        </Link>
    </footer>
);

import { DarkModeToggle } from "@components/darktoggle";
import { CustomLink } from "@components/link";

import { internalLinks } from "@util/config";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="flex flex-col md:flex-row w-full md:w-1/2 max-w-4xl mx-auto">
                <div className="flex-grow py-2 px-10 flex flex-row justify-between items-center">
                    <CustomLink
                        href="/"
                        className="font-rubik text-3xl font-semibold"
                    >
                        AJ
                    </CustomLink>
                    <DarkModeToggle />
                </div>
                <div className="flex-grow p-1 flex flex-row justify-evenly items-center">
                    {internalLinks.map((link) => (
                        <CustomLink
                            className="hover:text-orange dark:hover:text-purple uppercase font-grotesk text-lg font-medium"
                            key={link.text}
                            href={link.url.toString()}
                        >
                            {link.Icon ? <link.Icon /> : link.text}
                        </CustomLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

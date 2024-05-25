import { DarkModeToggle } from "@components/darktoggle";
import { CustomLink } from "@components/link";

import { internalLinks } from "@util/internalLinks";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="flex flex-col lg:flex-row w-full mx-auto">
                <div className="flex-grow py-2 px-10 flex flex-row justify-between items-center">
                    <CustomLink
                        href="/"
                        className="font-rubik text-3xl font-medium"
                    >
                        AJ
                    </CustomLink>
                    <DarkModeToggle />
                </div>
                <div className="p-1 flex flex-row justify-center items-center">
                    {internalLinks.map((link) => (
                        <CustomLink
                            className="hover:text-accent-primary dark:hover:text-accent-secondary mx-2 uppercase font-mono text-sm sm:text-lg font-medium"
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

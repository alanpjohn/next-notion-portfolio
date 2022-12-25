import { DarkModeToggle } from "@components/darktoggle";
import { CustomLink } from "@components/link";

import { BsArrowLeftCircle } from "react-icons/bs";

export const NotionHeader: React.FC = () => {
    return (
        <header className="notion-header h-20">
            <div className="notion-nav-header">
                <div className="notion-nav-header-rhs">
                    <CustomLink
                        href="/blog"
                        className="font-sans text-xl font-normal flex flex-row items-center hover:text-accent dark:hover:text-accent-secondary"
                    >
                        <BsArrowLeftCircle className="mx-2" /> Explore Blog
                    </CustomLink>
                </div>
                <DarkModeToggle className="mx-2" />
            </div>
        </header>
    );
};

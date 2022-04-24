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
                        className="font-display text-xl font-semibold flex flex-row items-center hover:text-orange dark:hover:text-mint"
                    >
                        <BsArrowLeftCircle className="mx-2" /> Back to Blog
                    </CustomLink>
                </div>
                <DarkModeToggle className="mx-2" />
            </div>
        </header>
    );
};

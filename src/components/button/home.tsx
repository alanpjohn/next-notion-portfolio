import { CustomLink } from "@components/link";

import { PropsWithRef } from "react";
import { BsArrowRight } from "react-icons/bs";

type HomeButtonProps = PropsWithRef<{
    href: URL | string;
    title: string;
    subtitle: string;
    description: string;
}>;

export const HomeButton: React.FC<HomeButtonProps> = ({
    href,
    title,
    subtitle,
    description,
}) => {
    return (
        <button
            key={title}
            className="group h-full px-4 py-1 md:py-4
            
            "
        >
            <CustomLink
                href={href.toString()}
                className="flex flex-row h-full text-background-primary bg-accent-alternate
                group-hover:bg-accent-primary dark:group-hover:bg-accent-secondary
                transition-transform duration-300
            "
            >
                <div className="flex">
                    <span
                        className="vertical uppercase text-lg font-mono font-light px-2
                    "
                    >
                        {title}
                    </span>
                </div>
                <div
                    className="flex flex-grow flex-col py-8 justify-center max-w-xs justify-items-start px-4
                    w-full
                "
                >
                    <span className="text-left text-lg leading-tight">
                        {subtitle}
                    </span>
                    <span className="font-sans text-left italic whitespace-normal leading-tight pt-4">
                        {description}
                    </span>
                    <BsArrowRight
                        className="
                                -rotate-45 group-hover:rotate-0 transition-transform duration-300
                                 rounded-full w-8 p-1
                                h-8 self-end flex-grow
                                "
                    />
                </div>
            </CustomLink>
        </button>
    );
};

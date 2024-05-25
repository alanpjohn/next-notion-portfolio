import { CustomLink } from "@components/link";

import { PropsWithChildren } from "react";
import { BsArrowRight } from "react-icons/bs";

type Props = PropsWithChildren<{
    title: string;
    subtitle: string;
    url?: string;
    isBlog?: boolean;
}>;

export const HomeCard: React.FC<Props> = ({
    title,
    subtitle,
    url = "/projects",
    isBlog = false,
    children,
}: Props) => {
    let keyText = "Featured Project";
    if (isBlog) {
        keyText = "Featured Blog Article";
    }
    return (
        <CustomLink
            href={url}
            className="m-2 p-4
            max-w-md
border-background-primary dark:border-foreground-primary 
bg-background-secondary dark:bg-foreground-secondary
border-2 rounded-md
flex flex-col justify-between
"
        >
            <span className="text-xs font-mono text-accent-primary dark:text-accent-secondary text-opacity-70">
                {keyText}
            </span>
            <span className="px-1 text-xl font-sans text-foreground-primary dark:text-background-primary">
                {title}
            </span>
            <span className="px-1 text-s text-foreground-primary dark:text-background-primary">
                {subtitle}
            </span>
            {children}

            <div className="flex flex-row items-center w-full justify-end">
                <span className="text-xs font-mono mr-2">Check out</span>
                <BsArrowRight />
            </div>
        </CustomLink>
    );
};

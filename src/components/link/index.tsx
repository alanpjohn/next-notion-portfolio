import { event } from "@util/ga";

import Link from "next/link";
import { PropsWithChildren } from "react";

type CustomLinkProps = PropsWithChildren<{
    href: string;
    className?: string;
    target?: string;
    rel?: string;
}>;

export const CustomLink: React.FC<CustomLinkProps> = ({
    href,
    children,
    className = "default-link",
    target = "_target",
    rel = "",
}: CustomLinkProps) => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const onClick = () => {
        event({
            label: href,
        });
    };

    const label = href
        .split("/")
        .filter((text) => text != "" && text.indexOf("?") == -1);
    if (href == "#") {
        return (
            <div className={className} onClick={scrollToTop}>
                {children}
            </div>
        );
    }
    const internal: boolean = href.startsWith("/") || href.startsWith("#");
    return internal ? (
        <Link href={href} passHref>
            <a className={className} aria-label={label[0]}>
                {children}
            </a>
        </Link>
    ) : (
        <a
            href={href}
            rel={rel}
            className={className}
            target={target}
            aria-label={label[1] ? label[1] : "back"}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

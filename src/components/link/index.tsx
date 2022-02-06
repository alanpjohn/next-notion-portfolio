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
    target = "",
    rel = "",
}: CustomLinkProps) => {
    const internal: boolean = href.startsWith("/") || href.startsWith("#");
    return internal ? (
        <Link href={href} passHref>
            <a className={className} target={target}>
                {children}
            </a>
        </Link>
    ) : (
        <a href={href} rel={rel} className={className} target={target}>
            {children}
        </a>
    );
};

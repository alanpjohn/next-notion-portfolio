import { CustomLink } from "@components/link";

import { PropsWithChildren } from "react";
import { BsArrowRight, BsArrowRightCircle } from "react-icons/bs";

type ButtonType = "default" | "retro" | "round";

type ButtonProps = PropsWithChildren<{
    href: URL | string;
    variant?: ButtonType;
}>;

export const CustomButton: React.FC<ButtonProps> = ({
    href,
    children,
    variant = "default",
}) => {
    if (variant == "default") {
        return (
            <button>
                <CustomLink
                    href={href.toString()}
                    className={`group button-default`}
                >
                    {children}
                </CustomLink>
            </button>
        );
    } else if (variant == "retro") {
        return (
            <button>
                <CustomLink
                    href={href.toString()}
                    className={`group button-retro`}
                >
                    <BsArrowRight
                        className="
                    group-hover:-rotate-45 transition-transform duration-300
                    h-8 mr-2
                    "
                    />
                    {children}{" "}
                </CustomLink>
            </button>
        );
    } else {
        return (
            <button className="button-round">
                <BsArrowRightCircle />
            </button>
        );
    }
};

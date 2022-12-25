import { CustomLink } from "@components/link";

import { PropsWithChildren } from "react";
import { BsArrowRightCircle } from "react-icons/bs";

type ButtonType = "default" | "round";

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
    } else {
        return (
            <button className="button-round">
                <BsArrowRightCircle />
            </button>
        );
    }
};

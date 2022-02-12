import { CustomLink } from "@components/link";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

type CustomButtonProps = {
    text: string;
    Icon?: IconType;
    href: string;
    primary?: boolean;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    Icon = FaArrowRight,
    href,
    primary = false,
}: CustomButtonProps) => {
    return (
        <CustomLink
            href={href}
            className={`button ${
                primary ? "button-primary" : "button-secondary"
            }`}
        >
            <span>{text}</span>
            <Icon className="icon" />
        </CustomLink>
    );
};

type RoundButtonProps = {
    Icon: IconType;
    href?: string;
};

export const RoundButton: React.FC<RoundButtonProps> = ({
    Icon,
}: RoundButtonProps) => {
    return (
        <div className="round-button">
            <Icon className="icon" />
        </div>
    );
};

import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

type PrimaryButtonProps = {
    text: string;
    Icon?: IconType;
    href: string;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
    Icon = FaArrowRight,
    href,
}: PrimaryButtonProps) => {
    return (
        <a href={href} className="primary-button">
            <span>{text}</span>
            <Icon className="icon" />
        </a>
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
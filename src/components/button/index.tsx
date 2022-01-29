import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

type PrimaryButtonProps = {
    text: string;
    Icon?: IconType;
    href: string;
};

type RoundButtonProps = {
    Icon: IconType;
    href?: string;
};

type ContactButtonProps = RoundButtonProps & {
    color: string;
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

export const RoundButton: React.FC<RoundButtonProps> = ({
    Icon,
}: RoundButtonProps) => {
    return (
        <div className="round-button">
            <Icon className="icon" />
        </div>
    );
};

export const ContactButton: React.FC<ContactButtonProps> = ({
    Icon,
    href,
    color,
}: ContactButtonProps) => {
    return (
        <a href={href} className="contact-button">
            <Icon className="icon" />
        </a>
    );
};

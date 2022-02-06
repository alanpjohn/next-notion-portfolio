import { CustomLink } from "@components/link";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { FaAngleDoubleDown, FaArrowRight } from "react-icons/fa";

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
        <CustomLink href={href} className="primary-button">
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

export const DoubleIconButton: React.FC<PrimaryButtonProps> = ({
    text,
    Icon = FaAngleDoubleDown,
    href,
}: PrimaryButtonProps) => {
    return (
        <CustomLink href={href} className="double-button hover:text-accent">
            <Icon className="icon " />
            <span>{text}</span>
            <Icon className="icon " />
        </CustomLink>
    );
};

const quickLinkItemVariants = {
    hidden: {
        opacity: 0,
        x: 500,
    },
    enter: {
        opacity: 1,
        x: 0,
        rotate: -20,
    },
    view: {
        x: [0, 50, 0],
        rotate: -20,
    },
};

type ContactProps = PropsWithChildren<{
    Icon: IconType;
    text: string;
    href: string;
}>;

export const QuickLink: React.FC<ContactProps> = ({
    Icon,
    text,
    href,
}: ContactProps) => {
    return (
        <CustomLink href={href}>
            <motion.div
                whileInView="view"
                variants={quickLinkItemVariants}
                className="quick-link"
            >
                <Icon className="mr-8 text-2xl" />
                <span>{text}</span>
            </motion.div>
        </CustomLink>
    );
};

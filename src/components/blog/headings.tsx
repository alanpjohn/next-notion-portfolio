import { BlockContentProps } from "@components/blog";

export const Heading1: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <h2>{children}</h2>;
};

export const Heading2: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <h3>{children}</h3>;
};

export const Heading3: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <h4>{children}</h4>;
};

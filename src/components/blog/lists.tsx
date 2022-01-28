import { BlockContentProps } from "@components/blog";

export const UnorderedList: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <ul>{children}</ul>;
};

export const OrderedList: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <ol>{children}</ol>;
};

export const ListItem: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <li>{children}</li>;
};

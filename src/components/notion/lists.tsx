import { renderText } from "@components/notion/text";

import { ListBlock, ListItemBlock } from "@util/interface";

import { PropsWithChildren } from "react";

type BlockContentProps = PropsWithChildren<ListBlock>;

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

type ListItemBlockProps = PropsWithChildren<ListItemBlock>;

export const ListItem: React.FC<ListItemBlockProps> = ({
    id,
    list_item,
    children,
}: ListItemBlockProps) => {
    return (
        <li>
            {renderText(id, list_item.text)}
            {children}
        </li>
    );
};

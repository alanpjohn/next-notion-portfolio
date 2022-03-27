import { renderText } from "@components/notion/text";

import { ListBlock, ListItemBlock } from "@util/interface";

import { PropsWithChildren } from "react";

type ListBlockProps = PropsWithChildren<ListBlock>;

export const UnorderedList: React.FC<ListBlockProps> = ({
    children,
}: ListBlockProps) => {
    return <ul>{children}</ul>;
};

export const OrderedList: React.FC<ListBlockProps> = ({
    children,
}: ListBlockProps) => {
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
            {renderText(id, list_item.rich_text)}
            {children}
        </li>
    );
};

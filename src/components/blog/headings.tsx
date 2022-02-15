import { renderText } from "@components/blog/text";

import {
    HeadingOneBlock,
    HeadingThreeBlock,
    HeadingTwoBlock,
} from "@util/interface";

import { PropsWithRef } from "react";

type HeadingOneBlockProps = PropsWithRef<HeadingOneBlock>;

export const Heading1: React.FC<HeadingOneBlockProps> = ({
    id,
    heading_1,
}: HeadingOneBlockProps) => {
    return <h2 className="heading">{renderText(id, heading_1.text)}</h2>;
};

type HeadingTwoBlockProps = PropsWithRef<HeadingTwoBlock>;

export const Heading2: React.FC<HeadingTwoBlockProps> = ({
    id,
    heading_2,
}: HeadingTwoBlockProps) => {
    return <h3 className="heading">{renderText(id, heading_2.text)}</h3>;
};

type HeadingThreeBlockProps = PropsWithRef<HeadingThreeBlock>;

export const Heading3: React.FC<HeadingThreeBlockProps> = ({
    id,
    heading_3,
}: HeadingThreeBlockProps) => {
    return <h4 className="heading">{renderText(id, heading_3.text)}</h4>;
};

import { PropsWithChildren } from "react";

export type BlockContentProps = PropsWithChildren<{ id?: string }>;

export const Paragraph: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <p>{children}</p>;
};

export const Quote: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <blockquote>{children}</blockquote>;
};

type CalloutProps = BlockContentProps & {
    icon?: string;
};

export const Callout: React.FC<CalloutProps> = ({
    children,
}: BlockContentProps) => {
    return <div>{children}</div>;
};

export const NotSupportedBlock: React.FC = () => {
    return <div>Not supported</div>;
};

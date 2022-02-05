import { PropsWithChildren } from "react";
import { VscWarning } from "react-icons/vsc";

export type BlockContentProps = PropsWithChildren<{ id?: string }>;

export const Paragraph: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <p>{children}</p>;
};

export const Quote: React.FC<BlockContentProps> = ({
    children,
}: BlockContentProps) => {
    return <blockquote className="text-secondary">{children}</blockquote>;
};

type CalloutProps = BlockContentProps & {
    icon?: string;
};

export const Callout: React.FC<CalloutProps> = ({
    icon = "X",
    children,
}: CalloutProps) => {
    return (
        <div className="callout">
            <div>{icon}</div>
            <div>{children}</div>
        </div>
    );
};

export const NotSupportedBlock: React.FC = () => {
    return (
        <div className="warning">
            <div className="icon">{<VscWarning />}</div>
            <div className="desc">
                Uh-oh! A certain Notion component has not been rendered as it is
                not supported by the blog yet.
            </div>
        </div>
    );
};

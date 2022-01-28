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
    return <blockquote>{children}</blockquote>;
};

type CalloutProps = BlockContentProps & {
    icon?: string;
};

export const Callout: React.FC<CalloutProps> = ({
    icon = "X",
    children,
}: CalloutProps) => {
    return (
        <div className="flex flex-row border-1 bg-slate-100 p-6">
            <div className="my-auto mx-4">{icon}</div>
            <div className="flex-grow">{children}</div>
        </div>
    );
};

export const NotSupportedBlock: React.FC = () => {
    return (
        <div className="flex flex-row border-1 bg-yellow-200 p-6">
            <div className="my-auto mx-4 text-2xl">{<VscWarning />}</div>
            <div className="font-mono font-light italic">
                Uh-oh! A certain Notion component has not been rendered as it is
                not supported by the blog yet.
            </div>
        </div>
    );
};

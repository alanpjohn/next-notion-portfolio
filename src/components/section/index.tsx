import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title?: string;
    className?: string;
};

export const Section: React.FC<Props> = ({
    children,
    title = "",
    className = "",
}: Props) => {
    return (
        <section id={title} className={`flex w-full flex-col ${className}`}>
            {children}
        </section>
    );
};

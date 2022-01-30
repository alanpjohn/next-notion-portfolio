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
        <section
            id={title}
            className={`pt-20 flex flex-col w-full snap-y snap-center snap-proximity ${className}`}
        >
            {children}
        </section>
    );
};

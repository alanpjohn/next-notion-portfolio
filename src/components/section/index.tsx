import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Section: React.FC<Props> = ({ children }: Props) => {
    return (
        <section className="flex flex-col w-full min-h-screen justify-center">
            { children }
        </section>
    );
};

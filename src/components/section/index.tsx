import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Section: React.FC<Props> = ({ children }: Props) => {
    return <div>{{ children }}</div>;
};

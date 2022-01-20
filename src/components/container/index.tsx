import { ReactNode } from "react";

export const Container:React.FC = ({ children }) => {
    return <div className="min-h-screen pt-20 flex flex-col">{children}</div>;
};

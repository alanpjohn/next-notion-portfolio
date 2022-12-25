import { ITag } from "@util/interface";

import { PropsWithRef } from "react";

type Props = PropsWithRef<ITag>;

export const Tag: React.FC<Props> = ({ id, name }: Props) => {
    return (
        <span
            key={id}
            className=" text-jet
            bg-accent-primary dark:bg-accent-secondary whitespace-nowrap
       h-8 px-4 m-1 rounded-full 
        font-sans text-lg"
        >
            {name}
        </span>
    );
};

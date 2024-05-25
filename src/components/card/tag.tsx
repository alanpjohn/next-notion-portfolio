import { ITag } from "@util/interface";

import { PropsWithRef } from "react";

type Props = PropsWithRef<ITag>;

export const Tag: React.FC<Props> = ({ id, name }: Props) => {
    return (
        <span
            key={id}
            className=" text-background-secondary
            bg-accent-primary dark:bg-accent-secondary whitespace-nowrap
       h-6 px-4 m-1 rounded-full items-center flex
        font-sans text-sm"
        >
            {name}
        </span>
    );
};

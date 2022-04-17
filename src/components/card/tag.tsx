import { ITag } from "@util/types";

import { PropsWithRef } from "react";

type Props = PropsWithRef<ITag>;

export const Tag: React.FC<Props> = ({ id, name }: Props) => {
    return (
        <span
            key={id}
            className="bg-orange dark:bg-mint text-jet
        group-hover:bg-razzmatazz dark:group-hover:bg-purple
        h-8 px-4 m-1 rounded-full 
        font-grotesk text-xl"
        >
            {name}
        </span>
    );
};

import { BlockWithChildren } from "./interface";

export type Skill = {
    id: number;
    domain: string;
    acronym: string;
    content: BlockWithChildren[];
};

export const getAcronym = (domain: string): string => {
    const regex = /[A-Z\W]/gm;
    let m: RegExpExecArray | null;

    let acronym = "";

    while ((m = regex.exec(domain)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
            acronym = match == " " ? acronym : acronym.concat(match);
        });
    }

    return acronym;
};

import { CustomButton } from "@components/button";
import { CustomLink } from "@components/link";

import { Project } from "@util/types";

import { Tag } from "./tag";
import { PropsWithRef } from "react";
import { VscGitPullRequest } from "react-icons/vsc";

type Props = PropsWithRef<Project>;

export const ProjectCard: React.FC<Props> = ({
    title,
    url,
    lastUpdated,
    description,
    tags,
}: Props) => {
    return (
        <CustomLink href={url} className="">
            <div className="card group my-10 max-w-4xl">
                <div className="card__nav">
                    <VscGitPullRequest />
                    <span>{lastUpdated}</span>
                </div>
                <div className="flex flex-col md:flex-row p-4 justify-evenly items-start md:items-center">
                    <h3 className="my-10 md:m-0 md:basis-1/5 text-4xl">
                        {title}
                    </h3>
                    <p className="md:basis-2/5">{description}</p>
                    <div className="self-end my-4 md:self-auto md:my-0">
                        <CustomButton variant="round" href={url} />
                    </div>
                </div>
                <div className="flex w-full flex-shrink flex-wrap flex-row p-2 justify-center border-t-2 border-primary">
                    {tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </div>
        </CustomLink>
    );
};

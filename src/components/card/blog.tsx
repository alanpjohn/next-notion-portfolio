import { CustomButton } from "@components/button";
import { CustomLink } from "@components/link";

import { BlogArticle, ITag } from "@util/types";

import { Tag } from "./tag";
import { PropsWithRef } from "react";

type Props = PropsWithRef<BlogArticle>;

export const BlogCard: React.FC<Props> = ({
    title,
    url,
    tags,
    description,
}: Props) => {
    const link = "/blog/" + url;
    return (
        <CustomLink
            href={link}
            className="mx-1 mb-16 flex max-w-3xl flex-row border-b-2 px-2 border-secondary group"
        >
            <div className="my-4 px-1 flex flex-grow flex-col">
                <h3
                    className="font-clash text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
            group-hover:text-razzmatazz dark:group-hover:text-purple"
                >
                    {title}
                </h3>
                <div className="py-4 flex flex-wrap">
                    {tags.map((tag: ITag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <span className="font-sans text-lg font-light md:text-xl">
                    {description}
                </span>
            </div>
            <div className="hidden md:flex">
                <div className="m-auto">
                    <CustomButton href={link} variant="round" />
                </div>
            </div>
        </CustomLink>
    );
};

import { CustomButton } from "@components/button";
import { CustomLink } from "@components/link";

import { BlogArticle, ITag } from "@util/interface";

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
            className="mx-1 mb-16 flex max-w-3xl flex-row border-b-4 px-2 border-dotted border-foreground-secondary group"
        >
            <div className="my-4 px-1 flex flex-grow flex-col">
                <h3
                    className="font-clash text-2xl md:text-3xl lg:text-4xl 
            group-hover:text-accent-primary dark:group-hover:text-accent-secondary"
                >
                    {title}
                </h3>
                {tags.length > 0 && (
                    <div className="py-3 flex flex-wrap">
                        {tags.map((tag: ITag) => (
                            <Tag key={tag.id} {...tag} />
                        ))}
                    </div>
                )}
                <span className="font-sans text-foreground-primary dark:text-background-primary text-lg font-light md:text-xl">
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

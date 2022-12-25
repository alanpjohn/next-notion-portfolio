import { CustomButton } from "@components/button";
import { Tag } from "@components/card/tag";
import { CustomImage } from "@components/image";
import { CustomLink } from "@components/link";

import { Project } from "@util/interface";

import { PropsWithRef } from "react";
import { VscGitPullRequest } from "react-icons/vsc";

type Props = PropsWithRef<Project>;

export const ProjectCard: React.FC<Props> = ({
    title,
    url,
    description,
    tags,
    cover = "",
    coverPreview = null,
}: Props) => {
    return (
        <CustomLink
            href={url}
            className="group flex flex-col justify-center lg:odd:flex-row lg:even:flex-row-reverse my-12"
        >
            <div className="basis-1/2 flex flex-col justify-center lg:px-4">
                <h3
                    className="font-clash text-3xl md:text-4xl lg:text-5xl py-4 flex flex-row justify-between align-middle
                    border-b-4 border-dotted
                    group-hover:text-accent-primary dark:group-hover:text-accent-secondary"
                >
                    {title}
                    <CustomButton variant="round" href={url} />
                </h3>

                <div className="flex flex-wrap justify-end my-4">
                    {tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
                <p className="">{description}</p>
            </div>
            <div className="basis-1/3 m-4 border-2 border-foreground-primary dark:border-background-primary max-w-2xl">
                <div
                    className="
                    flex justify-between p-1 border-b-2 border-foreground-primary dark:border-background-primary
                    group-hover:bg-accent-primary dark:group-hover:bg-accent-secondary
                    bg-accent-primary dark:bg-accent-secondary md:bg-transparent dark:md:bg-transparent

                "
                >
                    <VscGitPullRequest />
                    <span className="font-mono">{title}</span>
                </div>
                {cover && (
                    <div className="p-2 ">
                        <CustomImage
                            className=""
                            alt={title}
                            src={cover}
                            height={coverPreview.originalHeight}
                            width={coverPreview.originalWidth}
                            placeholder="blur"
                            blurDataURL={coverPreview.dataURIBase64}
                        />
                    </div>
                )}
            </div>
        </CustomLink>
    );
};

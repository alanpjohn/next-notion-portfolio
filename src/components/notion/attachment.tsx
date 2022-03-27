import { RoundButton } from "@components/button";
import { CustomLink } from "@components/link";

import { WebBookmarkBlock } from "@util/interface";
import { getDomainName } from "@util/router";

import { PropsWithRef } from "react";
import { FaArrowRight } from "react-icons/fa";

type WebBookmarkProps = PropsWithRef<WebBookmarkBlock>;

export const WebBookmark: React.FC<WebBookmarkProps> = ({
    id,
    bookmark,
}: WebBookmarkProps) => {
    const altText = bookmark.caption
        ? bookmark.caption.map((richText) => richText.plain_text).join(" ")
        : "Learn more";
    return (
        <CustomLink
            key={id}
            className="flex flex-row group items-center card justify-between prose m-2 p-4 font-clash no-underline"
            href={bookmark.url}
        >
            <div className="flex flex-col">
                <span className="my-2">{altText}</span>
                <span className="font-rubik text-sm break-words">
                    {getDomainName(bookmark.url)}
                </span>
            </div>
            <RoundButton href={bookmark.url} Icon={FaArrowRight} />
        </CustomLink>
    );
};

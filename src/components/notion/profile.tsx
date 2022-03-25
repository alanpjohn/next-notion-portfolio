import { renderText } from "@components/notion/text";

import { BlockWithChildren } from "@util/interface";

import { RenderProps } from ".";

const renderProfileBlock = (block: BlockWithChildren): React.ReactNode => {
    switch (block.type) {
        case "heading_1":
            return (
                <h2 key={block.id} className="text-3xl md:text-5xl mt-4 py-4">
                    {renderText(block.id, block.heading_1.rich_text)}
                </h2>
            );
        case "paragraph":
            return (
                <p key={block.id} className="py-4">
                    {renderText(block.id, block.paragraph.rich_text)}
                </p>
            );
        default:
            return <></>;
    }
};

export const ProfileIntroduction: React.FC<RenderProps> = ({
    blocks,
}: RenderProps) => {
    return (
        <div className="w-4/5 px-2 lg:w-2/5">
            {blocks.map((block) => {
                return renderProfileBlock(block);
            })}
        </div>
    );
};

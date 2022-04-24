import { Block } from "notion-types";
import { defaultMapImageUrl } from "react-notion-x";

export const mapImageUrl = (url: string, block: Block) => {
    return defaultMapImageUrl(url, block);
};

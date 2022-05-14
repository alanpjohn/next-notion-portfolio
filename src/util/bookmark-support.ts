import { getDomainName } from "./router";
import { parse } from "node-html-parser";
import { ExtendedRecordMap } from "notion-types";

type bookmarkDetails = {
    title?: string;
    description?: string;
    preview?: string;
};

async function getPageMeta(link: string): Promise<bookmarkDetails> {
    const details: bookmarkDetails = await fetch(link)
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            const doc = parse(html);

            const titleMetaElement = doc.querySelector(`title`);
            const title = titleMetaElement ? titleMetaElement.text : null;

            const descMetaElement =
                doc.querySelector(`meta[property="og:description"]`) ||
                doc.querySelector(`meta[property="twitter:description"]`);
            const description = descMetaElement
                ? descMetaElement.attributes["content"]
                : null;

            const imageMetaElement =
                doc.querySelector(`meta[property="og:image"]`) ||
                doc.querySelector(`meta[property="twitter:image"]`);
            const preview = imageMetaElement
                ? imageMetaElement.attributes["content"]
                : null;

            let previewImage: string;
            if (preview) {
                if (
                    preview.indexOf("http://") === 0 ||
                    preview.indexOf("https://") === 0
                ) {
                    previewImage = preview;
                } else {
                    previewImage = new URL(
                        preview,
                        "https://" + getDomainName(link),
                    ).toString();
                }
            } else {
                previewImage = null;
            }

            return {
                title: title,
                description: description,
                preview: previewImage,
            };
        })
        .catch(function (err) {
            console.error(err);
            return {};
        });

    return details;
}

export async function getBookmarks(
    recordMap: ExtendedRecordMap,
): Promise<ExtendedRecordMap> {
    const blockIds = Object.keys(recordMap.block);
    await Promise.all(
        blockIds.flatMap(async (blockId: string) => {
            const block = recordMap.block[blockId]?.value;
            if (block.type == "bookmark") {
                const link = block.properties.link[0][0];

                const pageData = await getPageMeta(link);
                block.properties.description = pageData.description
                    ? [[pageData.description]]
                    : [];
                block.properties.title = pageData.title
                    ? [[pageData.title]]
                    : [[getDomainName(link)]];
                block.format.bookmark_cover = pageData.preview || null;

                return block;
            }
        }),
    );
    return recordMap;
}

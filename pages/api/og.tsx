// /pages/api/og.tsx
import { seoDescription } from "@util/config";

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
    runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
    new URL(
        "../../public/fonts/ClashDisplay/ClashDisplay-Regular.otf",
        import.meta.url,
    ),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
    const fontData = await font;

    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "Developer Portfolio";

    const hasTags = searchParams.has("tag");
    const tags = hasTags
        ? searchParams.getAll("tag")
        : ["Test", "Notion", "NextJS"];

    const hasDate = searchParams.has("date");
    const date = hasDate ? searchParams.get("date") : "Today";

    const hasDescription = searchParams.has("description");
    const description = hasDescription
        ? searchParams.get("description")
        : seoDescription;

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundColor: "white",
                    height: "100%",
                    width: "100%",
                    fontSize: "large",
                    fontFamily: '"Clash Display"',
                    display: "flex",
                }}
            >
                <div tw="bg-stone-900 flex flex-col justify-between p-8 w-full h-full">
                    <div tw="flex flex-col md:flex-row w-full px-8 md:items-center justify-between">
                        <h2 tw="flex flex-col text-3xl sm:text-4xl tracking-tight text-gray-900 text-left">
                            <span tw="text-stone-50">Alan John</span>
                            <span tw="text-emerald-500 text-base">
                                Software Developer
                            </span>
                        </h2>
                        <div tw="mt-8 flex md:mt-0">
                            <div tw="flex rounded-md shadow">
                                <a
                                    href="#"
                                    tw="flex font-mono items-center justify-center rounded-md border border-transparent bg-emerald-500 px-5 py-3 text-base text-stone-800"
                                >
                                    alanjohn.dev
                                </a>
                            </div>
                        </div>
                    </div>
                    {hasDate && hasTags ? (
                        <div tw="flex flex-col px-10">
                            <div tw="flex text-lg text-emerald-500 px-8">
                                Published on {date}
                            </div>
                            <div tw="flex text-6xl text-stone-50 px-10 my-4">
                                {title}
                            </div>
                            <div tw="flex flex-row text-emerald-500 text-xl px-12">
                                {tags.map((tag) => (
                                    <span key={tag} tw="mx-2">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div tw="flex flex-col px-20">
                            <div tw="flex text-3xl text-emerald-500 px-28">
                                {title}
                            </div>
                            <div tw="flex text-9xl text-stone-50 pl-36 pr-12 my-8">
                                Alan{" "}John
                            </div>
                            <div tw="flex text-emerald-500 text-2xl pl-36 pr-36">
                                {description}
                            </div>
                        </div>
                    )}
                    <div></div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Clash Display",
                    data: fontData,
                    style: "normal",
                },
            ],
        },
    );
}

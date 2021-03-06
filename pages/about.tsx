import { CustomButton } from "@components/button";
import { CustomImage } from "@components/image";
import { Layout } from "@components/layout";
import { CustomLink } from "@components/link";
import { Section } from "@components/section";

import { domain, socialLinks } from "@util/config";
import { getHomepage } from "@util/notion";
import { getPreviewImage } from "@util/preview-image";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { ExtendedRecordMap, PreviewImage } from "notion-types";
import { NotionRenderer } from "react-notion-x";

type Props = {
    recordMap: ExtendedRecordMap;
    preview: PreviewImage;
};

const Home: NextPage<Props> = ({ recordMap, preview }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="About"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />
            <Section className="notion-page pt-32 md:pt-24 items-center">
                <CustomImage
                    alt="Alan John"
                    src="/images/home_light.png"
                    height={preview.originalHeight}
                    width={preview.originalWidth}
                    placeholder="blur"
                    blurDataURL={preview.dataURIBase64}
                />
                <div className="flex mx-auto flex-col my-2 items-center">
                    <div className="grid grid-flow-row grid-cols-5 gap-2 max-w-sm mx-auto">
                        {socialLinks.slice(0, 5).map(({ Icon, url }) => (
                            <CustomLink
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                key={Icon.name}
                                href={url}
                                className="p-2"
                            >
                                <Icon className="text-3xl hover:text-orange dark:hover:text-purple" />
                            </CustomLink>
                        ))}
                    </div>
                    <CustomButton href="https://drive.google.com/file/d/1OAWqwJ6cXa4yS0vrsdn-Ni3lAtw8aNA3/view?usp=sharing">
                        View Resume
                    </CustomButton>
                </div>
            </Section>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={false}
                components={{
                    nextImage: CustomImage,
                    nextLink: CustomLink,
                }}
            />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const recordMap = await getHomepage();
    const preview = await getPreviewImage(domain + "/images/home_light.png", {
        cacheKey: "about",
    });

    return {
        props: {
            recordMap: recordMap,
            preview: preview,
        },
        revalidate: 86400,
    };
};

export default Home;

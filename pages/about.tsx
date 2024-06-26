import { CustomButton } from "@components/button";
import { CustomImage } from "@components/image";
import { Layout } from "@components/layout";
import { CustomLink } from "@components/link";
import { MarkdownAboutPage } from "@components/markdown/about";
import { Section } from "@components/section";

import { domain } from "@util/config";
import { socialLinks } from "@util/internalLinks";
import { getProfile } from "@util/markdown";
import { getPreviewImage } from "@util/preview-image";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { PreviewImage } from "notion-types";

type Props = {
    mdContent: string;
    preview: PreviewImage;
};

const About: NextPage<Props> = ({ preview, mdContent }: Props) => {
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
                    className="rounded-full"
                    src="/images/Alan.jpg"
                    height={preview.originalHeight}
                    width={preview.originalWidth}
                    placeholder="blur"
                    blurDataURL={preview.dataURIBase64}
                />
                <div className="flex mx-auto flex-col my-2 items-center">
                    <div className="grid grid-flow-row grid-cols-6 gap-2 max-w-sm mx-auto">
                        {socialLinks.slice(0, 6).map(({ Icon, url }) => (
                            <CustomLink
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                key={Icon.name}
                                href={url}
                                className="p-2"
                            >
                                <Icon className="text-3xl hover:text-accent-primary dark:hover:text-accent-secondary" />
                            </CustomLink>
                        ))}
                    </div>
                    <CustomButton href="https://drive.google.com/file/d/1OAWqwJ6cXa4yS0vrsdn-Ni3lAtw8aNA3/view?usp=sharing">
                        View Resume
                    </CustomButton>
                </div>
            </Section>
            <MarkdownAboutPage content={mdContent} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const mdContent = getProfile();
    const preview = await getPreviewImage(domain + "/images/Alan.jpg", {
        cacheKey: "about",
    });

    return {
        props: {
            mdContent: mdContent,
            preview: preview,
        },
        revalidate: 86400,
    };
};

export default About;

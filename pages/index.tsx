import { HomeCard } from "@components/card/home";
import { Tag } from "@components/card/tag";
import { CustomImage } from "@components/image";
import { Layout } from "@components/layout";
import { Section } from "@components/section";

import { domain } from "@util/config";
import { BlogArticle, ITag, Project } from "@util/interface";
import { getFeaturedProject, getLatestBlog } from "@util/markdown";
import { getPreviewImage } from "@util/preview-image";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { PreviewImage } from "notion-types";

type Props = {
    preview: PreviewImage;
    blog: BlogArticle;
    project: Project;
};

const Home: NextPage<Props> = ({ preview, blog, project }: Props) => {
    return (
        <Layout>
            <NextSeo
                title="Home"
                additionalMetaTags={[
                    {
                        property: "keywords",
                        content:
                            "Alan, John, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native",
                    },
                ]}
            />
            <Section className="mt-32 lg:mt-24 flex-grow mx-auto justify-center">
                <div className="flex flex-col px-4">
                    <h1
                        className="text-3xl lg:text-4xl 
                        font-light pr-12 mb-4 pb-2 w-min whitespace-nowrap border-dotted
                        border-b-4 border-accent-alternate"
                    >
                        Alan John
                    </h1>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl md:pl-4 whitespace-pre-wrap">
                        Software Developer
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row mx-auto mt-6">
                    <div className="md:row-span-2 max-w-sm p-4 mx-auto">
                        <CustomImage
                            alt="Alan John"
                            src="/images/Alan.jpg"
                            height={preview.originalHeight}
                            width={preview.originalWidth}
                            className="rounded-md"
                            placeholder="blur"
                            blurDataURL={preview.dataURIBase64}
                        />
                    </div>
                    <HomeCard
                        title={blog.title}
                        subtitle={blog.description}
                        isBlog={true}
                        url={"/blog/" + blog.url}
                    >
                        {blog.tags.length > 0 && (
                            <div className="flex flex-wrap shrink">
                                {blog.tags.map((tag: ITag) => (
                                    <Tag key={tag.id} {...tag} />
                                ))}
                            </div>
                        )}
                    </HomeCard>
                    <HomeCard
                        title={project.title}
                        subtitle={project.description}
                    >
                        {project.tags.length > 0 && (
                            <div className="flex flex-wrap shrink">
                                {blog.tags.map((tag: ITag) => (
                                    <Tag key={tag.id} {...tag} />
                                ))}
                            </div>
                        )}
                    </HomeCard>
                </div>
            </Section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const preview = await getPreviewImage(domain + "/images/Alan.jpg", {
        cacheKey: "home",
    });

    const project = await getFeaturedProject();
    const blogArticle = await getLatestBlog();

    return {
        props: {
            preview: preview,
            blog: blogArticle,
            project: project,
        },
        revalidate: 86400,
    };
};

export default Home;

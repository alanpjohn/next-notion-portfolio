import { Footer } from "@components/footer";
import { Header } from "@components/header";

import { getBaseURL } from "@util/router";

import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
    const router = useRouter();
    const baseUrl = getBaseURL();
    const url = `${baseUrl}${router.asPath}`;
    return (
        <div className="flex w-full flex-col min-h-screen">
            <DefaultSeo
                titleTemplate="%s - Alan John"
                openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: url,
                    description:
                        "The personal website for Alan John, developer.",
                    site_name: "Alan John",
                    images: [
                        {
                            url: `${baseUrl}/images/social_media_preview.png`,
                            width: 1200,
                            height: 628,
                            alt: "My Portfolio Preview",
                            type: "image/png",
                        },
                    ],
                }}
                canonical={url}
            />
            <Header />
            {children}
            <Footer />
        </div>
    );
};

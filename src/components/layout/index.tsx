import { Footer } from "@components/footer";
import { Header } from "@components/header";

import { domain, seoDescription } from "@util/config";

import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
    const router = useRouter();
    const url = `${domain}${router.asPath}`;
    return (
        <div className="flex w-full flex-col min-h-screen">
            <DefaultSeo
                titleTemplate="%s - Alan John"
                description={seoDescription}
                openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: url,
                    description: seoDescription,
                    site_name: "Alan John",
                    images: [
                        {
                            url: `${domain}/images/social_media_preview.png`,
                            width: 1200,
                            height: 628,
                            alt: "My Portfolio Preview",
                            type: `${domain}/api/og`,
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

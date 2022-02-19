import { Footer } from "@components/footer";
import { Header } from "@components/header";

import { pageview } from "@util/ga";
import { getBaseURL } from "@util/router";

import "highlight.js/styles/github-dark-dimmed.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import "@styles/styles.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();
    const baseUrl = getBaseURL();

    const url = `${baseUrl}${router.route}`;

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
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
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;

import { Footer } from "@components/footer";
import { Header } from "@components/header";

import { pageview } from "@util/ga";

import "highlight.js/styles/github-dark-dimmed.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import "@styles/styles.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();
    const domain = process.env.LOCAL
        ? "https://localhost:3000"
        : "https://alan-john-portfolio.vercel.app";

    const url = `${domain}${router.route}`;

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            pageview(url);
        };
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on("routeChangeComplete", handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
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
                    url,
                    description:
                        "The personal website for Alan John, developer.",
                    site_name: "Alan John",
                    images: [
                        {
                            url: `${domain}/images/social_media_preview.png`,
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

import { Footer } from "@components/footer";

import { pageview } from "@util/ga";
import { getBaseURL } from "@util/router";

import "highlight.js/styles/github-dark-dimmed.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";

import "@styles/styles.scss";

const Header = dynamic<unknown>(
    import("@components/header").then((mod) => mod.Header),
);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();
    const baseUrl = getBaseURL();

    const url = `${baseUrl}${router.route}`;

    const GA_MEASUREMENT_ID =
        process.env.NODE_ENV == "production" &&
        process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

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
            <Script
                strategy="afterInteractive"
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google analytics"
                async
                strategy="afterInteractive"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                        `,
                }}
            />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;

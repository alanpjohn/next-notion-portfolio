import { pageview } from "@util/ga";

import "highlight.js/styles/github-dark-dimmed.css";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Script from "next/script";
import React, { useEffect } from "react";

import "@styles/styles.scss";

const Header = dynamic<unknown>(
    import("@components/header").then((mod) => mod.Header),
);

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
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
        </>
    );
}

export default MyApp;

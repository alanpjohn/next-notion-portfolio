import { analyticsEnabled } from "@util/config";
import { pageview } from "@util/ga";

import { AppProps } from "next/app";
import Script from "next/script";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect } from "react";
import "react-notion-x/src/styles.css";

import "@styles/styles.scss";

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
            {analyticsEnabled && (
                <Script
                    strategy="afterInteractive"
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                />
            )}
            {analyticsEnabled && (
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
            )}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

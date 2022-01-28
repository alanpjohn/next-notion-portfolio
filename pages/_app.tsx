import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.scss";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
    const url = `https://localhost:3000${router.route}`;
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
                    images: [],
                }}
                canonical={url}
            />

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

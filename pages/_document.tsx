import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript,
} from "next/document";

class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render(): JSX.Element {
        const GA_MEASUREMENT_ID =
            process.env.NODE_ENV == "production" &&
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
        return (
            <Html lang="en">
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    />
                    <script
                        async
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
                    <link
                        rel="preload"
                        href="/fonts/CabinetGrotesk/CabinetGrotesk-Variable.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/ClashDisplay/ClashDisplay-Variable.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin=""
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
                        rel="stylesheet"
                    />
                    {/* <link rel="preload" href="styles.css" as="style"/> */}
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;

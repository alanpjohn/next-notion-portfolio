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
        return (
            <Html>
                <Head>
                    <link
                        href="https://api.fontshare.com/css?f[]=clash-display@200,300,400,500,600,700,1&f[]=cabinet-grotesk@100,200,300,400,500,700,800,900,1&display=swap"
                        rel="stylesheet"
                    />
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

import { Footer } from "@components/footer";

import { getBaseURL } from "@util/router";

import { motion } from "framer-motion";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
    const router = useRouter();
    const baseUrl = getBaseURL();
    const url = `${baseUrl}${router.asPath}`;
    return (
        <div>
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
            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: "linear" }}
                className="flex w-full flex-col items-start"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
};

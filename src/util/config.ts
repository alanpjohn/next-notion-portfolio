import { FaCameraRetro } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { SiDevdotto, SiGithub, SiGmail, SiLinkedin } from "react-icons/si";

export function getEnv(
    key: string,
    defaultValue?: string,
    env = process.env,
): string {
    const value = env[key];

    if (value !== undefined) {
        return value;
    }

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error(`Config error: missing required env variable "${key}"`);
}

export const apiBaseUrl = `/api`;

export const api = {
    getSocialImage: `${apiBaseUrl}/og-image`,
    getPreviewHTML: `${apiBaseUrl}/preview-html`,
};

type TLink = {
    text: string;
    url: string;
    Icon?: IconType;
};

export const internalLinks: TLink[] = [
    {
        text: "Home",
        url: "/",
    },
    {
        text: "Blog",
        url: "/blog",
    },
    {
        text: "About",
        url: "/about",
    },
    {
        text: "Projects",
        url: "/projects",
    },
];

export const socialLinks: TLink[] = [
    {
        Icon: SiGithub,
        text: "Github",
        url: "https://github.com/TheForeverLost",
    },
    {
        Icon: SiLinkedin,
        text: "Linkedin",
        url: "https://www.linkedin.com/in/alan-john-b2b521193/",
    },
    {
        Icon: FaCameraRetro,
        text: "Pictures",
        url: "https://photos.alanjohn.dev",
    },
    {
        Icon: SiDevdotto,
        text: "DevTo",
        url: "https://dev.to/theforeverlost",
    },
    {
        Icon: SiGmail,
        text: "Gmail",
        url: "mailto:alansandra2013@gmail.com",
    },
];

export const isDev =
    process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export const port = process.env.PORT || 3000;

export const redisHost: string | null = getEnv("REDIS_HOST", null);
export const redisPassword: string | null = getEnv("REDIS_PASSWORD", null);
export const redisUser: string = getEnv("REDIS_USER", "default");
export const redisUrl = getEnv(
    "REDIS_URL",
    `redis://${redisUser}:${redisPassword}@${redisHost}`,
);
export const redisNamespace: string | null = getEnv(
    "REDIS_NAMESPACE",
    "preview-images",
);

export const domain = getEnv(
    "DOMAIN",
    process.env.NODE_ENV == "development"
        ? "http://localhost:3000"
        : "https://alanjohn.dev",
);

export const analyticsEnabled = getEnv("ANALYTICS_ENABLED", "");

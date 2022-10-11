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
    getSocialImage: `${apiBaseUrl}/og`,
    getPreviewHTML: `${apiBaseUrl}/preview-html`,
};

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
    isDev ? "http://localhost:3000" : "https://alanjohn.dev",
);

export const analyticsEnabled = getEnv("ANALYTICS_ENABLED", "");

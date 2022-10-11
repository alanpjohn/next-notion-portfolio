import { analyticsEnabled, getEnv } from "./config";

export const pageview = (url: URL): void => {
    if (analyticsEnabled) {
        window.gtag("config", getEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS"), {
            page_path: url,
        });
    }
};

type GTagEvent = {
    action?: string;
    category?: string;
    label: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
    action = "click",
    category = "outbound",
    label,
}: GTagEvent): void => {
    if (analyticsEnabled) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
        });
    }
};

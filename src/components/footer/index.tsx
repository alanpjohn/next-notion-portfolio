import { CustomLink } from "@components/link";

import { socialLinks } from "@util/internalLinks";

import pjson from "package.json";

export const Footer: React.FC = () => {
    return (
        <div className="footer">
            <CustomLink
                href="/"
                className="font-rubik text-xl font-medium hidden md:block"
            >
                AJ
            </CustomLink>
            <div className="grid grid-flow-row grid-cols-6 max-w-sm mx-auto">
                {socialLinks.slice(0, 6).map(({ Icon, url }) => (
                    <CustomLink
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        key={Icon.name}
                        href={url}
                        className="p-4"
                    >
                        <Icon className="text-2xl hover:text-accent-primary dark:hover:text-accent-secondary" />
                    </CustomLink>
                ))}
            </div>
            <div className="flex flex-col text-sm font-sans text-foreground-secondary dark:text-background-secondary">
                <span>Powered by Notion</span>
                <span>Release: v{pjson.version}</span>
            </div>
        </div>
    );
};

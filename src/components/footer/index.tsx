import { CustomLink } from "@components/link";

import { socialLinks } from "@util/config";

import pjson from "package.json";

export const Footer: React.FC = () => {
    return (
        <div className="footer">
            <CustomLink href="/" className="font-rubik text-xl font-semibold">
                AJ
            </CustomLink>
            <div className="grid grid-flow-row grid-cols-5 max-w-sm mx-auto">
                {socialLinks.slice(0, 5).map(({ Icon, url }) => (
                    <CustomLink
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        key={Icon.name}
                        href={url}
                        className="p-4"
                    >
                        <Icon className="text-xl hover:text-orange dark:hover:text-purple" />
                    </CustomLink>
                ))}
            </div>
            <div className="flex flex-col text-sm font-grotesk text-jet dark:text-cultured">
                <span>Powered by Notion</span>
                <span>Release: v{pjson.version}</span>
            </div>
        </div>
    );
};

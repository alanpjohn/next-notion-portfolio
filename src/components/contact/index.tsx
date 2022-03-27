import { CustomLink } from "@components/link";

import { quicklinks } from "@util/social";

export const Contact: React.FC = () => (
    <div className="my-2 flex flex-row flex-wrap text-secondary dark:text-darksecondary">
        {quicklinks.map(({ Icon, href }) => (
            <CustomLink
                target="_blank"
                rel="noopener noreferrer nofollow"
                key={Icon.name}
                href={href}
                className="hover:text-orange dark:hover:text-purple font-clash"
            >
                <Icon className="text-2xl hover:text-orange dark:hover:text-purple m-4" />
            </CustomLink>
        ))}
    </div>
);

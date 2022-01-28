import { IPost } from "@util/interface";
import { PropsWithChildren } from "react";

type PostProps = PropsWithChildren<IPost>;

export const PostCard: React.FC<PostProps> = ({
    url,
    properties,
}: PostProps) => {
    return (
        <div>
            <a href={`/blog/${url}`}>{properties.title}</a>
        </div>
    );
};

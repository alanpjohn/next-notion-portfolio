import { ProjectCard } from "@components/card";
import { IProject } from "@util/interface";
import { PropsWithChildren } from "react";

type ProjectPanelProps = PropsWithChildren<{ projects: IProject[] }>;

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
    projects,
}: ProjectPanelProps) => {
    return (
        <div className="m-auto">
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </div>
    );
};

export const TechStack: React.FC = () => {
    return <div>Python</div>;
};

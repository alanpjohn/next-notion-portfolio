import { Section } from "@components/section";
import { IProject } from "@util/interface";
import { FaGithub } from "react-icons/fa";
import { CustomButton } from "@components/button";
import { ProjectCard } from "@components/card";

type Props = {
    projects: IProject[];
};

export const ProjectSection: React.FC<Props> = ({ projects }: Props) => {
    return (
        <Section
            title="Projects"
            className="border-b-2 border-primary-100 py-20 dark:border-darkprimary-100"
        >
            <div className="project-grid">
                <div className="hero-card">
                    <span className="hero-title">Featured Projects</span>
                    <p className="hero-text">
                        Here are some of my favourite projects that I have made
                        for either personal, competition or academic purposes.
                        You can check out more at my Github Profile.
                    </p>
                    <div className="float-left py-4">
                        <CustomButton
                            text={"Go to Github"}
                            Icon={FaGithub}
                            href="https://github.com/TheForeverLost"
                        />
                    </div>
                </div>
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </Section>
    );
};

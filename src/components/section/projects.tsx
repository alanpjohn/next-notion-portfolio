import { CustomButton } from "@components/button";
import { ProjectCard } from "@components/card";
import { Section } from "@components/section";

import { IProject } from "@util/interface";

import { FaGithub } from "react-icons/fa";

type Props = {
    projects: IProject[];
};

export const ProjectSection: React.FC<Props> = ({ projects }: Props) => {
    return (
        <Section title="Projects" className="border-b-2 border-secondary">
            <div
                className="
                mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3 max-w-6xl my-24
            "
            >
                <div className="mx-4 md:col-span-2 md:mx-8 xl:col-span-1 xl:mx-2">
                    <h2 className="section__heading">Featured Projects</h2>
                    <p className="section__desc">
                        Here are some of my favourite projects that I have made
                        for either personal, competition or academic purposes.
                        You can check out more at my Github Profile.
                    </p>
                    <div className="float-left py-4">
                        <CustomButton
                            text={"Go to Github"}
                            Icon={FaGithub}
                            href="https://github.com/TheForeverLost"
                            primary
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

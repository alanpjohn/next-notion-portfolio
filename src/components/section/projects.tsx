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
        <Section title="Projects" className="py-32">
            <div
                className="
                flex flex-col lg:flex-row mx-auto w-11/12 lg:w-4/5
            "
            >
                <div className="mx-8 basis-1/3">
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
                <div>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </Section>
    );
};

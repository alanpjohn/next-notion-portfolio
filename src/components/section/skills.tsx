import { CustomButton } from "@components/button";
import { RenderedSkillContent, extractSkills } from "@components/notion";
import { Section } from "@components/section";

import { BlockWithChildren } from "@util/interface";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";

type SkillSectionProps = {
    skillsdata: BlockWithChildren[];
};

export const SkillsSection: React.FC<SkillSectionProps> = ({ skillsdata }) => {
    const skills = extractSkills(skillsdata);
    const [isSelected, setSelected] = useState(skills[0]);
    return (
        <Section
            title="Skills"
            className="border-b-2 border-primary-100 py-20 dark:border-darkprimary-100"
        >
            <div className="section-banner-top flex-col-reverse">
                <div className="skill-panel">
                    <div className="top-nav">Change tabs for more details</div>
                    <div className="nav">
                        {skills.map((tech) => (
                            <div
                                key={tech.id}
                                className={`
                                nav-item 
                                ${tech.id == isSelected.id ? "selected" : ""}
                            `}
                                onClick={() => setSelected(tech)}
                            >
                                {tech.acronym}
                                {tech.id === isSelected.id ? (
                                    <motion.div
                                        className="highlight"
                                        layoutId="underline"
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div>
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                key={isSelected ? isSelected.domain : "empty"}
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.15 }}
                                className="main"
                            >
                                <div className="heading">
                                    <span className="domain">
                                        {isSelected.domain}
                                    </span>
                                </div>

                                <div className="description">
                                    <RenderedSkillContent
                                        blocks={isSelected.content}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="hero-card px-2 md:px-8">
                    <span className="hero-title">Skillset</span>
                    <p className="hero-text">
                        My go-to tech stack right now would be NextJS for
                        frontend and FastAPI and/or gRPC to make my backend
                        architecture deployed with the help of a kubernetes
                        service provider. Outside of tech, I am comfortable with
                        adobe tools such as Photoshop, Lightroom and
                        Illustrator.
                    </p>
                    <div className="float-left py-4">
                        <CustomButton
                            text={"Download Resume"}
                            Icon={FaFileDownload}
                            href="https://drive.google.com/file/d/1OAWqwJ6cXa4yS0vrsdn-Ni3lAtw8aNA3/view?usp=sharing"
                            primary
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

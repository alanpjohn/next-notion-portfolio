import { CustomButton } from "@components/button";
import { RenderedSkillContent, extractSkills } from "@components/notion";
import { Section } from "@components/section";

import { event } from "@util/ga";
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
        <Section title="Skills">
            <div className="banner flex-col-reverse mx-2 lg:flex-row">
                <div className="ml-4 flex-grow card max-w-4xl">
                    <div className="card__nav">
                        Change tabs for more details
                    </div>
                    <div className="mb-3 flex h-16 flex-row justify-evenly gap-0 border-b-2 border-secondary">
                        {skills.map((tech) => (
                            <button
                                key={tech.id}
                                className={`
                                w-full py-4 text-center text-xl 
                                ${tech.id == isSelected.id ? "selected" : ""}
                            `}
                                onClick={() => {
                                    setSelected(tech);
                                    event({
                                        category: "SkillTab",
                                        action: "switch",
                                        label: tech.domain,
                                    });
                                }}
                            >
                                {tech.acronym}
                                {tech.id === isSelected.id ? (
                                    <motion.div
                                        className="mt-4 h-2 bg-orange dark:bg-purple"
                                        layoutId="underline"
                                    />
                                ) : null}
                            </button>
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
                                <div className="">
                                    <h3 className="my-6 mx-4 w-full px-3 text-3xl">
                                        {isSelected.domain}
                                    </h3>
                                </div>

                                <div className="h-80 overflow-scroll overflow-x-hidden py-4 px-6">
                                    <RenderedSkillContent
                                        blocks={isSelected.content}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex-shrink px-2 md:px-8 lg:max-w-lg mb-10">
                    <h3 className="section__heading">Skillset</h3>
                    <p className="section__desc">
                        You can learn more about work philosophy and core
                        skills. Alternatively, you can check out my resume.
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

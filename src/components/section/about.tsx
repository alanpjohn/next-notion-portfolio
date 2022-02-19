import { CustomImage } from "@components/image";
import { Section } from "@components/section";

export const AboutSection: React.FC = () => {
    return (
        <Section title="About">
            <div className="text-justify flex-col lg:flex-row banner">
                <div>
                    <CustomImage
                        altText="Me"
                        src="/images/home_light.png"
                        height="500px"
                        width="500px"
                    />
                </div>

                <div className="w-4/5 px-2 lg:w-2/5">
                    <h2 className="text-3xl md:text-5xl mt-4 py-4">
                        Hi, I am Alan, A twenty-two year old{" "}
                        <span className="font-playfair italic">
                            software engineer
                        </span>{" "}
                        currently based in{" "}
                        <span className="font-playfair italic">
                            Shillong, India
                        </span>
                        .
                    </h2>
                    <p className="py-4">
                        After gaining interest in computers in my school days, I
                        pursued my Bachelors of Engineering in Computer
                        Engineering from Army Institute of Technology. After my
                        graduation in 2021, I joined HSBC Technology India as a
                        Trainee Software Engineer.
                    </p>
                    <p className="py-4">
                        My area of interests are DevOps and Cloud Native
                        Technolgies. Always looking forward to contributing to{" "}
                        <span className="font-playfair italic">
                            Open Source{" "}
                        </span>
                        projects and networking through communities. Outside of
                        tech, I pursue my time in photography and design purely
                        as a hobby.
                    </p>
                    <p className="py-4">
                        Feel free to hit me for conversations about{" "}
                        <span className="font-playfair italic">Technology</span>
                        , <span className="font-playfair italic">Design</span>{" "}
                        or{" "}
                        <span className="font-playfair italic">Football </span>.
                    </p>
                </div>
            </div>
        </Section>
    );
};

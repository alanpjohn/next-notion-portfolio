import { CustomImage } from "@components/image";
import { Section } from "@components/section";

export const AboutSection: React.FC = () => {
    return (
        <Section title="About" className="border-b-2 border-secondary">
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
                        Hi, I am a{" "}
                        <span className="font-playfair italic">
                            software engineer
                        </span>{" "}
                        working at HSBC currently based in{" "}
                        <span className="font-playfair italic">
                            Shillong, India
                        </span>
                        .
                    </h2>
                    <p className="py-4">
                        I am a BE Computer Engineering Graduate from Army
                        Insitute of Techology, Pune (Affliated with Savitribai
                        Phule Pune University). I developed an interest in
                        computers during my school days. During my
                        undergraduate, I had the chance to explore many
                        technologies at the end of which I got hooked to cloud
                        native technologies and DevSecOps and always am looking
                        for an opportunity to work with them.
                    </p>
                    <p className="py-4">
                        Always looking forward to contributing to{" "}
                        <span className="font-playfair italic">
                            Open Source{" "}
                        </span>
                        projects and networking through communities.
                    </p>
                </div>
            </div>
        </Section>
    );
};

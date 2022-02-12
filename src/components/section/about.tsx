import { CustomImage } from "@components/image";
import { Section } from "@components/section";

export const AboutSection: React.FC = () => {
    return (
        <Section title="About" className="border-b-2 border-primary-100">
            <div className="section-banner flex-col ">
                <div>
                    <CustomImage
                        altText="Alan John"
                        src="/images/home_light.png"
                        height="500px"
                        width="500px"
                    />
                </div>

                <div className="about-main">
                    <div className="text-5xl">
                        Hi, I am a{" "}
                        <span className="font-playfair italic">
                            software engineer
                        </span>{" "}
                        working at HSBC currently based in{" "}
                        <span className="font-playfair italic">
                            Shillong, India
                        </span>
                        .
                    </div>
                    <div className="text-xl">
                        I am a BE Computer Engineering Graduate from Army
                        Insitute of Techology, Pune (Affliated with Savitribai
                        Phule Pune University). I developed an interest in
                        computers during my school days. During my
                        undergraduate, I had the chance to explore many
                        technologies at the end of which I got hooked to cloud
                        native technologies and DevSecOps and always am looking
                        for an opportunity to work with them.
                    </div>
                    <div className="text-xl">
                        Always looking forward to contributing to{" "}
                        <span className="font-playfair italic">
                            Open Source{" "}
                        </span>
                        projects and networking through communities.
                    </div>
                </div>
            </div>
        </Section>
    );
};

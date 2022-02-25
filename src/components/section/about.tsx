import { ProfileSectionCard } from "@components/card";
import { CustomImage } from "@components/image";
import { ProfileIntroduction } from "@components/notion/profile";
import { Section } from "@components/section";

import { IProfile } from "@util/interface";

type ProfileSectionProps = {
    profileData: IProfile;
};

export const AboutSection: React.FC<ProfileSectionProps> = ({
    profileData,
}: ProfileSectionProps) => {
    return (
        <Section title="About">
            <div className="flex-col lg:flex-row banner">
                <div>
                    <CustomImage
                        altText="Me"
                        src="/images/home_light.png"
                        height="500px"
                        width="500px"
                    />
                </div>
                <ProfileIntroduction blocks={profileData.about} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 w-4/5 mx-auto gap-10">
                {profileData.sections.map((section) => (
                    <ProfileSectionCard key={section.title} {...section} />
                ))}
            </div>
        </Section>
    );
};

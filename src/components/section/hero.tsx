import { DoubleIconButton, QuickLink } from "@components/button";
import { motion, useTime, useTransform } from "framer-motion";
import { Section } from "@components/section";
import {
    SiGithub,
    SiInstagram,
    SiLinkedin,
    SiLinuxfoundation,
} from "react-icons/si";
import { BiNews } from "react-icons/bi";
import { FaCameraRetro } from "react-icons/fa";

const quicklinks = [
    {
        Icon: BiNews,
        text: "Blog",
        href: "/blog",
    },
    {
        Icon: FaCameraRetro,
        text: "Photography",
        href: "http://alanjohn.myportfolio.com/",
    },
    {
        Icon: SiGithub,
        text: "Github",
        href: "https://github.com/TheForeverLost",
    },
    {
        Icon: SiLinkedin,
        text: "Linkedin",
        href: "https://www.linkedin.com/in/alan-john-b2b521193/",
    },
    {
        Icon: SiInstagram,
        text: "Instagram",
        href: "https://www.instagram.com/_alan_not_allen_/",
    },
    {
        Icon: SiLinuxfoundation,
        text: "LF Profile",
        href: "https://openprofile.dev/profile/alanpjohn",
    },
];

const quickLinkVariants = {
    hidden: {},
    enter: {
        transition: { staggerChildren: 0.07, delayChildren: 1.5 },
    },
    view: {
        transition: { staggerChildren: 0.07, delayChildren: 0.5 },
    },
};

export const HeroSection: React.FC = () => {
    const time = useTime();

    const moveTitleup = useTransform(time, [1500, 1750], [72, 0]);
    const moveSubtitleIn = useTransform(time, [1750, 2000], [-200, 0]);
    const subtitleOpacity = useTransform(time, [1750, 2000], [0, 1]);
    const moveScrollOption = useTransform(time, [1750, 2000], [200, 1]);

    return (
        <Section className="hero-section">
            <div className="main">
                <div className="main-text">
                    <motion.div
                        style={{
                            y: moveTitleup,
                        }}
                        className="title"
                    >
                        Alan John
                    </motion.div>
                    <motion.div
                        style={{
                            x: moveSubtitleIn,
                            opacity: subtitleOpacity,
                        }}
                        className="subtitle"
                    >
                        Software
                    </motion.div>
                    <motion.div
                        style={{
                            x: moveSubtitleIn,
                            opacity: subtitleOpacity,
                        }}
                        className="subtitle -mt-2"
                    >
                        Engineer
                    </motion.div>
                </div>
                <div className="hero-menu">
                    <motion.ul
                        initial="hidden"
                        animate="enter"
                        whileInView="view"
                        variants={quickLinkVariants}
                        className="
                                grid mx-auto my-16 lg:m-auto gap-2
                                grid-rows-6 grid-cols-1 h-72 w-56
                                lg:h-96 lg:w-72
                            "
                    >
                        {quicklinks.map((contact) => (
                            <QuickLink key={contact.text} {...contact} />
                        ))}
                    </motion.ul>
                </div>
            </div>
            <motion.div
                style={{ y: moveScrollOption }}
                className="mx-auto mb-8"
            >
                <DoubleIconButton text="Scroll for more" href="#About" />
            </motion.div>
        </Section>
    );
};

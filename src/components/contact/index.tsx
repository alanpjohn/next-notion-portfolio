import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const links = [
    {
        Icon: FaInstagram,
        href: "https://www.instagram.com/_alan_not_allen_/",
    },
    {
        Icon: FaGithub,
        href: "https://github.com/TheForeverLost",
    },
    {
        Icon: FaLinkedinIn,
        href: "https://www.linkedin.com/in/alan-john-b2b521193/",
    },
];

export const Contact: React.FC = () => (
    <div className="my-6 flex flex-row text-2xl text-eerie">
        {links.map(({ Icon, href }, i) => (
            <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`transition-colors hover:text-red-600 ${
                    i < links.length - 1 ? "mr-3" : ""
                }`}
            >
                <Icon />
            </a>
        ))}
    </div>
);

import { Contact } from "@components/contact";
import { CustomLink } from "@components/link";

export const Footer: React.FC = () => (
    <footer className="footer">
        <Contact />
        <CustomLink
            className="email"
            href="mailto:alansandra2013@gmail.com?Subject=Hello"
        >
            alansandra2013@gmail.com
        </CustomLink>
        <span className="subtext">
            Powered by the Next JS, Notion API, Framer motion and TailwindCSS.
        </span>
    </footer>
);

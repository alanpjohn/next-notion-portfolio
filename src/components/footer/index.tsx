import { Contact } from "@components/contact";
import { CustomLink } from "@components/link";

export const Footer: React.FC = () => (
    <footer className="bottom-0 mt-10 pb-10 flex w-full flex-col items-center">
        <Contact />
        <CustomLink
            className="font-clash mb-4 text-sm transition-colors hover:text-orange dark:hover:text-purples"
            href="mailto:alansandra2013@gmail.com?Subject=Hello"
        >
            alansandra2013@gmail.com
        </CustomLink>
        <span className="font-cabinet text-center mx-10 font-light text-eerie dark:text-cultured">
            Powered by the Next JS, Notion API, Framer motion and TailwindCSS.
        </span>
    </footer>
);

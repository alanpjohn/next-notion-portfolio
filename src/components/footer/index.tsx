import { Contact } from "@components/contact";

export const Footer: React.FC = () => (
    <footer className="bottom-0 mt-10 pb-10 flex w-full flex-col items-center">
        <Contact />
        <span className="font-cabinet text-center mx-10 font-light text-eerie dark:text-cultured">
            Powered by the Next JS, Notion API, Framer motion and TailwindCSS.
        </span>
        <span className="font-cabinet text-center mx-10 font-light text-eerie dark:text-cultured ">
            Fonts courtesy of Fontshare and Google Fonts
        </span>
    </footer>
);

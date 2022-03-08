import { Contact } from "@components/contact";

export const Footer: React.FC = () => (
    // <footer className="bottom-0 mt-10 pb-10 flex w-full flex-col items-center">
    //     <Contact />
    // <span className="font-rubik text-center mx-10 font-light text-eerie dark:text-cultured">
    //     Powered by the Next JS, Notion API, Framer motion and TailwindCSS.
    // </span>
    // <span className="font-rubik text-center mx-10 font-light text-eerie dark:text-cultured ">
    //     Fonts courtesy of Fontshare and Google Fonts
    // </span>
    // </footer>
    <footer
        className="bottom-0 py-6 
        flex flex-col items-start px-4 
        md:flex-row md:justify-evenly md:items-center
        border-t-2 border-primary
        "
    >
        <div className="flex flex-col">
            <span className="footer__text">
                Hosted <span>on</span> Vercel
            </span>
            <span className="footer__text">
                Powerd <span>by</span> Notion
            </span>
            <span className="footer__text">
                Cabinet Grotesk <span>by</span> FontShare
            </span>
            <span className="footer__text">
                Clash Display <span>by</span> Fontshare
            </span>
            <span className="footer__text">
                Playfair Display <span>by</span> Google fonts{" "}
            </span>
        </div>
        <Contact />
        <div className="flex flex-col items-center">
            <span className="footer__text text-xl">©2022 Alan John</span>
        </div>
    </footer>
);

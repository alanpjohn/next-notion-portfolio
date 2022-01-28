type NavigationProps = {
    text: string;
    href: string;
};

export const NavigationLink: React.FC<NavigationProps> = ({
    text,
    href,
}: NavigationProps) => {
    return (
        <a
            className="p-4 font-clash font-light text-xl hover:text-red-500"
            href={href}
        >
            {text}
        </a>
    );
};

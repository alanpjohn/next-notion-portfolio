export const isActiveLink = (
    href: string,
    currentPathname?: string,
): boolean => {
    if (!currentPathname) {
        return false;
    }
    if (href === "/") {
        return href === currentPathname;
    }

    return currentPathname.startsWith(href);
};

export const getCanonicalURL = (title: string): string => {
    const cleaned = title.replace(/\W/gm, " ");
    const removedSpaces = cleaned
        .split(" ")
        .filter((str) => str)
        .join("-");
    return removedSpaces;
};

export const getDomainName = (link: string): string => {
    const url = new URL(link);
    const title = url.hostname;
    return title;
};

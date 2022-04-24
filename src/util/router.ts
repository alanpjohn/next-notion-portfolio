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

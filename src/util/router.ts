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

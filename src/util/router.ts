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

export const getBaseURL = (): string => {
    const baseUrl = process.env.LOCAL
        ? "http://localhost:3000"
        : {
              test: "https://alan-john-portfolio.vercel.app",
              development: "https://alan-john-portfolio.vercel.app",
              production: "https://www.alanjohn.dev",
          }[process.env.NODE_ENV];
    return baseUrl;
};

export const getDomainName = (url: string): string => {
    const domainSelectionRe =
        /\bhttps?:\/\/(?:www\.|ww2\.)?((?:[\w-]+\.){1,}\w+)\b/gm;
    let domainName = "dev.to"; // Default case
    let matches;
    while ((matches = domainSelectionRe.exec(url)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matches.index === domainSelectionRe.lastIndex) {
            domainSelectionRe.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        matches.forEach((match) => {
            domainName = match;
        });
    }
    return domainName;
};

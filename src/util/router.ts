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
    const cleaned = title.replace(/[^-\]_.~!*'();:@&=+$,/?%#[A-z0-9]/g, " ");
    const removedSpaces = cleaned.split(" ").join("-");
    return removedSpaces;
};

export const getBaseURL = (): string => {
    const baseUrl = process.env.LOCAL
        ? "http://localhost:3000"
        : {
              test: "https://alan-john-portfolio.vercel.app",
              development: "https://alan-john-portfolio.vercel.app",
              production: "https://www.alanjohn.dev.dev",
          }[process.env.NODE_ENV];
    return baseUrl;
};

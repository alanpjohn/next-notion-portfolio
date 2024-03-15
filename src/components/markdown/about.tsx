import { CustomLink } from "@components/link";

import { getDomainName } from "@util/router";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import Prism from "prismjs";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";

const getClassNamesFromCode = (element: ReactNode): string[] => {
    if (React.isValidElement(element)) {
        const { type, props } = element as ReactElement;
        if (type === "code") {
            const { className } = props;

            if (className) {
                return className.split(" ");
            }
        }

        // Recursively traverse children
        if (props && props.children) {
            return React.Children.toArray(props.children)
                .map((child) => getClassNamesFromCode(child))
                .flat();
        }
    }

    return [];
};

const MarkdownPre: React.FC<PropsWithChildren> = ({ children }) => {
    const [langClass, setLangClass] = useState<string>("language-plaintext");

    useEffect(() => {
        const classNames = React.Children.toArray(children)
            .map((child) => getClassNamesFromCode(child))
            .flat();
        if (classNames.length != 0) {
            setLangClass(classNames.join(" "));
        }
    }, [children]);
    return <pre className={`notion-code ${langClass}`}>{children}</pre>;
};

const MarkdownCode: React.FC<PropsWithChildren<{ className: string }>> = ({
    children,
    className,
}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [className, children]);
    const languageMatch = /language-(\w+)/.exec(className);
    const language = languageMatch ? languageMatch[1] : "plaintext";
    return <code className={`language-${language}`}>{children}</code>;
};

const MarkdownImage: React.FC<ImageProps> = ({ src, alt }) => {
    const [fileSrc, setFileSrc] = useState<StaticImport | string>();

    useEffect(() => {
        async function loadData(path: string) {
            try {
                const domainName = getDomainName(path);
                console.log(domainName);
                const filename = path.split("/").pop();
                const data = await import(`public/images/${filename}`);
                setFileSrc(data);
            } catch (error) {
                setFileSrc(path);
            }
        }

        if (typeof src === "string") {
            loadData(src);
        } else {
            setFileSrc(src);
        }
    }, [src]);

    return <Image src={fileSrc} alt={alt} />;
};

export const MarkdownAboutPage: React.FC<
    PropsWithChildren<{
        content: string;
    }>
> = ({ content, children }) => {
    return (
        <div className="notion notion-app light-mode">
            <div className="notion-viewport"></div>
            <div className="notion-frame">
                <div className="notion-page-scroller">
                    <main className="notion-page notion-page-no-cover notion-page-no-icon notion-page-has-text-icon notion-full-page">
                        <h1 className="notion-title">{children}</h1>
                        <ReactMarkdown
                            className="notion-page-content"
                            components={{
                                // Map `h1` (`# heading`) to use `h2`s.
                                a: ({ children, href, ...props }) => (
                                    <CustomLink href={href} {...props}>
                                        {children}
                                    </CustomLink>
                                ),
                                blockquote: ({ children, ...props }) => (
                                    <blockquote
                                        className="notion-quote notion-default"
                                        {...props}
                                    >
                                        {children}
                                    </blockquote>
                                ),
                                h1: ({ children }) => {
                                    const id = Math.floor(
                                        Math.random() * 50,
                                    ).toString();
                                    return (
                                        <h2 className="notion-h notion-h1 notion-default notion-h-indent-0">
                                            <span>
                                                <div
                                                    id={id}
                                                    className="notion-header-anchor"
                                                ></div>
                                                <a
                                                    className="notion-hash-link"
                                                    href={"#" + id}
                                                >
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        width="16"
                                                        height="16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                                        />
                                                    </svg>
                                                </a>
                                                <span className="notion-h-title">
                                                    {children}
                                                </span>
                                            </span>
                                        </h2>
                                    );
                                },
                                h2: ({ children }) => {
                                    const id = Math.floor(
                                        Math.random() * 50,
                                    ).toString();
                                    return (
                                        <h3 className="notion-h notion-h2 notion-default notion-h-indent-0">
                                            <span>
                                                <div
                                                    id={id}
                                                    className="notion-header-anchor"
                                                ></div>
                                                <a
                                                    className="notion-hash-link"
                                                    href={"#" + id}
                                                >
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        width="16"
                                                        height="16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                                        />
                                                    </svg>
                                                </a>
                                                <span className="notion-h-title">
                                                    {children}
                                                </span>
                                            </span>
                                        </h3>
                                    );
                                },
                                h3: ({ children }) => {
                                    const id = Math.floor(
                                        Math.random() * 50,
                                    ).toString();
                                    return (
                                        <h4 className="notion-h notion-h3 notion-default notion-h-indent-0">
                                            <span>
                                                <div
                                                    id={id}
                                                    className="notion-header-anchor"
                                                ></div>
                                                <a
                                                    className="notion-hash-link"
                                                    href={"#" + id}
                                                >
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        width="16"
                                                        height="16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                                        />
                                                    </svg>
                                                </a>
                                                <span className="notion-h-title">
                                                    {children}
                                                </span>
                                            </span>
                                        </h4>
                                    );
                                },
                                h4: ({ children }) => {
                                    const id = Math.floor(
                                        Math.random() * 50,
                                    ).toString();
                                    return (
                                        <h5 className="notion-h notion-h4 notion-default notion-h-indent-0">
                                            <span>
                                                <div
                                                    id={id}
                                                    className="notion-header-anchor"
                                                ></div>
                                                <a
                                                    className="notion-hash-link"
                                                    href={"#" + id}
                                                >
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        width="16"
                                                        height="16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                                        />
                                                    </svg>
                                                </a>
                                                <span className="notion-h-title">
                                                    {children}
                                                </span>
                                            </span>
                                        </h5>
                                    );
                                },
                                h5: ({ children }) => {
                                    const id = Math.floor(
                                        Math.random() * 50,
                                    ).toString();
                                    return (
                                        <h6 className="notion-h notion-h5 notion-default notion-h-indent-0">
                                            <span>
                                                <div
                                                    id={id}
                                                    className="notion-header-anchor"
                                                ></div>
                                                <a
                                                    className="notion-hash-link"
                                                    href={"#" + id}
                                                >
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        width="16"
                                                        height="16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                                        />
                                                    </svg>
                                                </a>
                                                <span className="notion-h-title">
                                                    {children}
                                                </span>
                                            </span>
                                        </h6>
                                    );
                                },
                                ol: ({ children, ...props }) => (
                                    <ol
                                        className="notion-list notion-list-disc"
                                        {...props}
                                    >
                                        {children}
                                    </ol>
                                ),
                                p: ({ children }) => (
                                    <div className="notion-text notion-default">
                                        {children}
                                    </div>
                                ),
                                pre: ({ children }) => (
                                    <MarkdownPre>{children}</MarkdownPre>
                                ),
                                code: ({ inline, className, children }) => {
                                    return !inline ? (
                                        <MarkdownCode className={className}>
                                            {children}
                                        </MarkdownCode>
                                    ) : (
                                        <code
                                            className={`notion-inline-code ${className}`}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul className="notion-list notion-list-disc">
                                        {children}
                                    </ul>
                                ),
                                img: ({ src, alt }) => (
                                    <MarkdownImage src={src} alt={alt} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </main>
                </div>
            </div>
        </div>
    );
};

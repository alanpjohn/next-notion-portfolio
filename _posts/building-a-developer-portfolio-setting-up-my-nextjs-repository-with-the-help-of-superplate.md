---
title: "Building a Developer Portfolio: Setting up my NextJS repository with the help of Superplate"
date: 2022-03-14
description: "Part 1 of the series breaking down my portfolio/blog design. We look at setting up the code repository and workflow for the site with the help of superplate CLI."
tags:
    - nextjs
    - portfolio
    - typescript
    - beginners
publish: true
link: https://dev.to/alanpjohn/building-a-developer-portfolio-setting-up-my-nextjs-repository-with-the-help-of-superplate-4n6b
---

> This article is for outdated version of my portfolio

A developer portfolio is a good place to centralize all the things about you as a software developer, from you projects and open source contributions to networking through social platforms. It allows you to showcase who you are and what you are capable of. And this does not necessarily apply just to front developers or freelance developers. 

Like any project, a developer portfolio should be well thought of before starting. What do you want to showcase? How do you want it to look? How do you want to manage it? what tools and frameworks to use? In this article, I am going to take you through the tools I have used and why I chose to use them. It’s important to keep in mind the “why”, as it’s easy to lose track of what is required even in something as simple as a static portfolio site. This article is the first part of a series where I break down my developer portfolio whose code can be found on [github.](https://github.com/alanpjohn/next-notion-portfolio/tree/v0.4.3)

# Selecting NextJS

I have used NextJS as it’s an excellent react framework to make production ready single page applications. NextJS is an excellent choice for static sites like blogs and portfolios with some of the features it offers.

## Static Site Generation with Incremental Static Rendering

The most important feature that NextJS provides which makes it a great choice for developing sites like blogs is static site generation (SSG) with incremental static rendering (ISR). Static site generation in NextJS happens in the absense of `getInitialProps()` and `getServerSideProps()`. NextJS pre-renders the page at build time that can be cached in CDN making delivery faster and improving SEO. 

```tsx
export const getStaticProps: GetStaticProps<BlockPageProps> = async () => {
    const posts = await getBlogPosts(); // Gets posts at build time
    return {
        props: {
            posts: posts, // the data is passed to page as part of props
        },
				revalidate: 3600,
    };
};

export default BlogPage;
```

Next.js allows you to create or update static pages *after* you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. This happens with the help of `revalidate` attribute. Lets say you set `revalidate` at 60 seconds. The page is pre-rendered at build time and the static file is served at request for the 60 second interval. The first request after the 60s interval would trigger a regeneration for that static page. Once the new page is generated, it will replace the old static page in the cache. This is useful in blogs as we don’t have to manually build the whole web app again whenever there is a change in the blog database.

- [How vercel handles NextJS ISR](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

## MDX and AMP support

Markdown is a developer’s preferred way of documentation. So it’s natural many developers would prefer storing their blogs posts and content in the form of markdown and have their site generator convert their markdown into websites. NextJS supports MDX which allows you embed your react component into markdown allowing you to make feature rich markdown sites.

- [MDX support in NextJS](https://nextjs.org/docs/advanced-features/using-mdx)

NextJS also supports converting your react pages into AMP pages which provides a rich experience to reading articles and boosts your search engine rankings and user engagement.

- [More about AMP](https://amp.dev/)
- [AMP support in NextJS](https://nextjs.org/docs/advanced-features/amp-support/introduction)

## Image and font optimizations

Images and fonts are important static assets for any website and key to their design. But often they come with their own set of problems when it comes loading and serving them to different viewports. NextJS provides an Image component to handle all the problems you could face with your images. Images are rendered such that there is no cumulative layout shift. Images are lazy loaded by default but that can be changed to prioritize.

- [Image Optimization in Next.js](https://nextjs.org/docs/basic-features/image-optimization)

Accessing fonts from third party application can slow down your load time. NextJS provides in-built font optimization for fonts provided by Google Fonts and Adobe Fonts (previously Typekit).

- [Font Optimization in Next.js](https://nextjs.org/docs/basic-features/font-optimization)

It is easy to start with NextJS as there is a large community around it plus the docs are comprehensive and easy to understand even for advanced use cases. Though Gatsby is another framework you might want to look at. Especially when it comes to developing static sites, Gatsby has a slight edge over NextJS in performance. At the day, both are amazing frameworks for your applications, so check them out if you haven’t already.

# Setting up your site

I used [**SuperplateCLI**](https://pankod.github.io/superplate) to generate a boilerplate closest to my requirements. Superplate is a library that allows you to create a customizable boiler plate code for react and nextjs sites. There is work going to add more frameworks. You can use Superplate and create a boilerplate with your preferred libraries and tools.

```bash
$ npx superplate-cli test

✔ Cloned remote source successfully.
✔ Select your project type › nextjs
✔ What will be the name of your app · test
✔ Package manager: · npm
✔ UI framework: · tailwind
✔ CSS Preprocessor: · scss
✔ Features: · env,bundle-analyzer
✔ Hooks · 
✔ State Management: · none
✔ i18n - Internationalization · none
✔ Linting tools: · eslint,prettier
✔ Do you want to use lint-staged? · none
✔ Testing Framework: · none
✔ E2E Testing framework: · none
✔ Docker integration: · none
✔ Continuous integration: · github-actions

Success! Created test at /tmp/test

You can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Bundles the app for production.

  npm run start
    Starts the production server.

Start developing by typing:

  cd test
  npm run dev
```

It can seem a little overwhelming for beginners when you use superplate to know which options you want to select. Superplate has very good documentation breaking down what each option offers but also how to set them up later manually. Here are some of the tools and libraries that I generally include.

> 💡 There are a lot more plugins that Superplate offers. I am just covering a handful that I am using for my portfolio.

## Tailwind css with SCSS

Tailwind CSS is a handy CSS framework especially if you are someone who hates having ridiculously large css files in your repositories. Tailwind is a utility first css framework which allows you to compose your styling within your HTML with the help of predefined classes. It gives you more control compared to other frameworks as there is no predefined theme or style. When you build tailwind, it only includes the css for the classes that you have used. Tailwind allows you to create your own classes extending tailwind for reusability and customization. It makes writing media queries much easier for responsive design and has support for dark mode. Personally tailwindcss has made my work more readable and easier to manage but it might not be to everyone’s way of working. The tailwind typography plugin is especially useful fo styling blog components.

- [More about Tailwind CSS](https://tailwindcss.com)

## Eslint and Prettier

ESlint is a JS linting tool which checks your code for styling and syntax errors. It helps maintain higher standards of code quality. Prettier examines your files for style issues and reformats your code automatically to guarantee that consistent standards for indentation, space, semicolons, and single vs double quotes are followed. Using both can increase developer productivity by identifying problems. Personally, even though initially might feel like it’s a hassle but as time goes you find yourself writing better cleaner code. Both offer a variety of plugins and options allowing you to decide your style. If you are using eslint with NextJS, you should check out the `@next/eslint-plugin-next` which ensures you are using the best practices with NextJS and making the most of it. Similarly prettier has a plugin for tailwind which can organise your utility classes better.

> 💡 Use the `--fix` flag with ESlint to allow prettier and eslint to fix issues automatically wherever possible

- [More about ESlint](https://eslint.org/)
- [More about Prettier](https://prettier.io/)

## Bundle analyzer

Bundle analyzer visualises the sizes of various modules included in your bundle in an interactive zoom map. It is useful in analyzing your bundles and debugging them.

- [More about bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

## Github actions

It’s 2022 and you should be using a CI to automate builds and test commits and pull requests. As this is hosted on github, I’ll be using Github actions to test and check the build for commits on master. I’ll also create a action to run lighthouse but I’ll cover that in more detail in a future article where I cover core web vitals.

# Next Steps

Once you generate you superplate boilerplate, you might want to check all the scripts and run `npm audit` to check for security vulnerabilities before you start work. Some more libraries that you can include which were not part of superplate can be:

- [Framer Motion](https://www.framer.com/motion/): Good websites employ animations and transitions to give their users a smooth experience. Framer motion is a declarative motion library for react.
- [Next-SEO](https://github.com/garmeeh/next-seo): SEO is an important part of building a website and NextSEO simplifies SEO for next sites.
- [Stylelint](https://stylelint.io/) : While ESLint is a linting tool for your JS code, stylelint is tool for linting your css and scss code.


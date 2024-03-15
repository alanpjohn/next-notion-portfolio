# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.1] - 2024-03-15
Removed Notion Support
### Added
- Pages are now powered by Markdown
### Removed
- Notion Support

## [3.1.2] - 2022-09-18
### Added
- Images for go-cdcl and ukfaas
### Changed
- Fixed null preview error for project card

## [3.1.1] - 2022-09-17
### Changed
- Adds Markdown support to transition away from Notion Content
- Bumps [next-seo](https://github.com/garmeeh/next-seo) from 5.15.0 to 6.1.0.

## [3.0.3] - 2022-09-13
### Changed
- Bumps several dependecies such as next, tailwind, notion-client to latest versions.
- Reduces blog page ISR revalidate period to 1Hr

## [3.0.2] - 2023-03-13
### Changed
- Migrated to Next 13 from Next 12. Upgraded [next](https://github.com/vercel/next.js) from 12.3.1 to 13.2.4.
- Mitigated CVE-2022-25881 by upgrading [http-cache-semantics](https://www.npmjs.com/package/@types/http-cache-semantics) to 4.1.1.
- Mitigated CVE-2022-46175 by upgrading [json5](https://www.npmjs.com/package/json5) to 2.2.3.
- Removed NodeJS version 14 checks from github CI.
- Upgraded vercel environment to Node 16.
- Changed edge runtime for `/api/og` from `experimental-edge` to `edge`.

## [3.0.1] - 2022-27-12
### Changed
- Fixes [Next Image 502_BAD_GATEWAY error](https://github.com/vercel/next.js/issues/42776) for Project images.

## [3.0.0] - 2022-26-12
### Added
- Added support project cover image
### Changed
- Bumps [notion-compat](https://github.com/NotionX/react-notion-x) from 6.13.11 to 6.15.6.
- Changes Layout for home page and projects page.
- Changes Color theme.
- Changes Fonts to Space Grotesk and Space Mono.
- Changed `styles.scss`
### Removed
- Removed 2022 Portfolio spinner

## [2.2.1] - 2022-12-10
### Changed
- Bumps [react-icons](https://github.com/react-icons/react-icons) from 4.6.0 to 4.7.1.
- Bumps [react-notion-x](https://github.com/NotionX/react-notion-x) from 6.13.10 to 6.15.7.
- Bumps [react-remove-scroll-bar](https://github.com/theKashey/react-remove-scroll-bar) from 2.3.3 to 2.3.4.
- Bumps [react-modal](https://github.com/reactjs/react-modal) from 3.15.1 to 3.16.1.
- Bumps [loader-utils](https://github.com/webpack/loader-utils) from 2.0.2 to 2.0.4 ([CVE-2022-37601](https://github.com/advisories/GHSA-76p3-8jx3-jpfq))

## [2.2.0] - 2022-10-20
### Added
- Added [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) for effecient social preview image generation instead of using `chrome-aws-lambda` and `puppeteer-core`
### Changed
- Added `/api/og` : Social image preview generation is now done by `/api/og` instead of `/api/og-image` and `/api/preview-html` 
- Bumps [notion-compat](https://github.com/NotionX/react-notion-x) from 6.12.10 to 6.13.11.
- Bumps [react-notion-x](https://github.com/NotionX/react-notion-x) from 6.12.10 to 6.13.10.
- Bumps [next](https://github.com/vercel/next.js) from 12.2.5 to 12.3.1.
- Bumps [react-icons](https://github.com/react-icons/react-icons) from 4.4.0 to 4.6.0.

### Removed
- Removed [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)
- Removed [puppeteer-core](https://github.com/puppeteer/puppeteer)
- Removed `@util/template.ts` as part of social image preview generation optimization
- Removed `@util/get-html-preview.ts` as part of social image preview generation optimization
- Removed `@util/chromium.ts` as part of social image preview generation optimization
- Removed `/api/og-image` as part of social image preview generation optimization
- Removed `/api/preview-html` as part of social image preview generation optimization

## [2.1.0] - 2022-08-30
### Changed
- Bumps [next](https://github.com/vercel/next.js) from 12.2.1 to 12.2.5.
- Bumps [react-hotkeys-hook](https://github.com/JohannesKlauss/react-keymap-hook) from 3.4.6 to 3.4.7.
- Bumps [terser](https://github.com/terser/terser) from 5.14.1 to 5.14.2.
- Bumps [next-seo](https://github.com/garmeeh/next-seo) from 5.4.0 to 5.5.0.
- Reduced `/api/og-image` build size by refactoring `config.ts`.
- `next.config.js` to remove next-compose-plugins as per latest NextJS
### Removed
- Removed next-compose-plugins. Refer [here](https://dev.to/krzysztofzuraw/migrating-nextjs-plugins-from-next-compose-plugins-2gnl)

## [2.0.7] - 2022-07-15
### Changed
- Meta description for default page SEO

## [2.0.6] - 2022-06-19
### Changed
- Github and Dev.to links updated
- Bumps [react-dom](https://github.com/facebook/react/tree/HEAD/packages/react-dom) from 18.1.0 to 18.2.0.
- Bumps [next](https://github.com/vercel/next.js) from 12.1.6 to 12.2.1.

## [2.0.5] - 2022-06-02
### Added
- Added reading time to blog posts
### Changed
- Home page button design
- Increased paragraph text size
- Bumps [react-use](https://github.com/streamich/react-use) from 17.3.2 to 17.4.0.
- Bumps [sharp](https://github.com/lovell/sharp) from 0.30.3 to 0.30.5
- Bumps [notion-compat](https://github.com/NotionX/react-notion-x) from 6.12.4 to 6.12.10.
- Bumps [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) from 2.5.3 to 2.5.4.

## [2.0.4] - 2022-05-29
### Changed
- Bumps [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) from 2.4.4 to 2.5.3.

## [2.0.3] - 2022-05-14
### Changed
- Bump next from 12.1.5 to 12.1.6 
- Bump react-notion-x from 6.11.0 to 6.12.9
- Improved Bookmarks styling
- Improved Quote styling
### Fixed
- Bookmarks not showing link preview due to limitation of `react-notion-x` when used with official notion client by creating `@util/bookmark-support` 

## [2.0.2] - 2022-04-28
### Added
- Custom 404 page
- Custom error page
- Added description, external link to blog article page
### Changed
- `CustomArticleJsonLdProps` and `CustomArticleJsonLdProps` changed
- Meta description updated for static routes
- Template design for social media preview
- Google analytics only works in env variable `ANALYTICS_ENABLED`

## [2.0.1] - 2022-04-25
### Changed
- Bumped `notion-compat` to `v6.12.4`
- styling for notion toggle blocks

## [2.0.0] - 2022-04-24
### Added
- Dependabot to manage version updates
- `/projects` route for project details
- `/about` route for personal details
- `/api/og-image` for social image generation
- LQIP to generate base64 encoded images
- redis support to store blurDataURL
- react-notion-x with the help of notion-compat for better performance
- common config file to manage configuration
- New font : Uncut Sans
- Cover image display on blog posts

### Changed
- block rendering is now handled by `NotionRenderer`
- styling changed to suit lighter site
- blog pages do not follow layout pattern
### Removed
- Framer motion classes for performance improvements
- Hero SVG
- Cabinet Grotesk font
- Hamburger menu for performance improvements

## [1.1.2] - 2022-04-09
### Changed
- ts configuration target changed from `es5` to `es2017`
- moved Default SEO configuration from `_app.tsx` to `@components/layout`
- highlight.js configuration is now dynamically loaded
### Fixed
- Canonical URL for dynamic routes fixed

## [1.1.1] - 2022-03-27
### Fixed
- Broken page width on mobile due to misconfigured overflow-wrap style

## [1.1.0] - 2022-03-27
### Added
- Added getDomainName function to get domain name from links
- Added Social.ts to handle all links in one place
- Added react-device-detect v2.1.2
- Added Hamburger Menu which handles the mobile friendly hamburger menu
### Changed
- Bumped up @notionhq/client to v1.0.4. Notion API is finally out of Beta :)
- Notion web bookmark now displays the link as well
- Converted Header is now a dynamic component
- Removed Components like the HeroSVG and navbar for mobile devices
- Footer is now a part of layout.
- cabinet grotesk is now preloaded
### Fixed
- Accessibility issue due to poor color contrast in buttons
- Link text at blog articles

## [1.0.8] - 2022-03-14
### Fixed
- Font rendering issue in typekit hosted fonts, replaced with google fonts

## [1.0.7] - 2022-03-14
### Fixed
- External links and canonical URLS
### Changed 
- Social media preview
- Bumped `@notionhq/client` to v0.4.13
- Bumped `framer-motion` to v6.2.8
- Bumped `@next/bundle-analyzer` to v12.1.0
### Removed
- Cover image in blog articles

## [1.0.6] - 2022-03-12
### Added
- Links to about section and project section to navigation
### Changed
- Redirect behance link to Adobe portolfio
- Blog page content altered
- Darktoggle moved to hamburger menu for mobile screens
- Bookmark component
- Sitemap generation
- Canonical URL generation

## [1.0.5] - 2022-03-05
### Changed
- Footer contents
- Notion paragraph text styling
### Fixed
- Accessibility issue due to color contrast in card headers

## [1.0.4] - 2022-02-27
### Added
- SVGs injected
### Changed
- Styling for header and menu
- Styling for long links
- Styling for blog pages
- Social media preview


## [1.0.3] - 2022-02-26
### Changed
- Improved Header Menu
- Instead of getting just skills, all homepage data comes from Notion. Added Profile data render component and profile details section
- Changes Project Card styling
- Improved Hero
### Fixed
- Back to top broken behaviour, now route is replaced smoothly
### Removed
- Skills section
- Skills @util file
- Skills notion render components

## [1.0.2] - 2022-02-19
### Added
- Function to access BaseURL
- Added `CustomArticleJSONld` tag for rich text search

## [1.0.1] - 2022-02-19
### Added 
- Added Sitemap and robots.txt
- ArticleLd for blog articles
- Behance social icon
### Fixed
- Blog page heading padding
- HighlightJS bundle inflation by supporting select fonts
- Dark Toggle behaviour when preferred theme is dark
### Changed
- Datetime formatter
- Split Blog post date into `publishedDate` and `modifiedDate`
### Removed
- Github actions - version branch creation removed
## [1.0.0] - 2022-02-19
### Added
- Skills tabs generation from Notion Page
- Trivago import sorting plugin to organize imports during linting
- Google Analytics for production environent
- Added Font Playfair from Google fonts for cursive display
- Cover Image support for blog articles (Only Unsplash)
- Web Bookmark support for blog articles
- Card style display for image blocks on home page
- Dark mode support
- Added new Custom Button replacing Primary Button and Secondary Button
- Seperate Section components for homepage sections
- Tailwind optimized SCSS in styles.scss
### Fixed
- Mobile screen hamburger menu using AnimatePresence
- Scrolling using `Back to Top` using JS scrolling
- highlight.js inflated bundle size by using select language support
### Changed
- Refaactored Render functions into React components
- Moved all notion related rendering from `@util` to `@components/notion`
- update color scheme
- Update Favicon
- update SEO
### Removed
- Unneccessary SCSS.

## [0.4.3] - 2022-02-11
### Added
- Link to preload fonts fron Google fonts
### Fixed
- CustomLink Highlighting
- Hamburger menu links being accessible when menu closed

## [0.4.2] - 2022-02-06
### Added
- Custom link to for smoother routing
- Font file preloading
### Changed
- NextSEO configurations for article tags and social media preview
- Replaced Placeholder text on home page

## [0.4.1] - 2022-02-06
### Added
- Added SCSS stylesheet to handle imported fonts
### Changed
- Menu to hide hamburger menu on large screens
- Added favicon.ico
- Fonts are now self-hosted instead of using the FontShare API
- Header and Footer are now outside the Layout component and fixed accross pages.
### Fixed
- Header disappearance is now based on absolute y-scroll rather than percentage
- Security vulnerabities caused by "@notion-stuff/v4-types" by adding custom typing
### Removed
- Removed Icons from Superplate template
- Parallax component due to high CLS

## [0.4.0] - 2022-02-05
### Added
- Pagination support for fetching blocks from Notion
- Notion typing to resolve [typing issue](https://github.com/makenotion/notion-sdk-js/issues/219) with the help of "@notion-stuff/v4-types": "^5.1.0"
### Fixed
- Notion block children processing
- Notion components list block generation
- Blog image using Next/Image to reduce CLS
- Color tagging in tailwindcss
### Removed
- `Post.ts` and `Project.ts` as new typing simplifies extracting information from `QueryDatabaseResponse`.

## [0.3.4] - 2022-01-30
### Added
- Stylesheets for all components necessary
- Parallax Divs
- TechStack Panel
- Double Icon button
### Changed
- Section layout improved
- Hero Section animations and layout
- Colors
- Footer content
- Menu now closes on mouse leave
### Removed
- Marquee component

## [0.3.3] - 2022-01-29
### Added
- Stylesheet for blog components
- Accordian menu
- Button to scroll back to top
- Stylesheet for cards
- Stylesheet for Header components
### Changed
- Layout animations
- Header animations
- Button styling

## [0.3.2] - 2022-01-29
### Added
- Panels to show projects (unstyled)
- Notion support to read Project database
### Changed
- Tag component padding
- Round button styling
- Home hero component alinment
### Removed
- Image grayscale filter

## [0.3.1] - 2022-01-28
### Added 
- Sharp for image optimization
- Post Card for blog
- Datetime parsing
### Changed
- Improvement in layout transitions
- Responsive design  for Blog and Post pages
### Fixed
- Broken "About" link

## [0.3.0] - 2022-01-28
### Added
- All Posts page (unstyled)
- Read Post page (unstyled)
- Notion API utilities to read Blog posts from Notion Database
- Tailwind Typography plugin for post rendering
- Blog components
- Post cache in JSON format
- Highlight.js for code highlighting
### Changed
- Image filters
- React.FC replaced by NextPage in pages
### Removed
- Boilerplate example files
- Zustland
### Fixed
- Header alignment

## [0.2.2] - 2022-01-28
### Added
- Button components
- Navigation links
- About me section with filler text
- Image component
- Release branch automation using actions
### Changed
- Section to be customizable at page level
- Header structure

## [0.2.1] - 2022-01-28
### Removed
- Animated background due to performance issues
### Changed
- Bumped Next JS to v12.0.9
- Bumped TailwindCSS to v3.0.17
- Bumped Framer Motion to v6.2.3
- Header, Footer, Section, Layout Hierachy

## [0.2.0] - 2022-01-27
### Added
- Support for React Icons
- Animated Background gradient with noise
- Contact icons
- Layout component for the pages
- Section component for the page section
### Changed
- Github actions to run in node 12 environment as well
### Removed
- The container component

## [0.1.0] - 2022-01-20
### Added
- Basic template to start development on using [superplate CLI](https://pankod.github.io/superplate/)
- ESlint and Prettier configuration for linting
- Fonts using [Fontshare API](https://www.fontshare.com/)
- Framer Notion dependency @5.6.0
- Notion Client dependency @0.4.12
- NextSEO dependency @4.28.1
### Removed
- Unnecessary files from the template
### Fixed
- `package.json` to fix linting errors on running `lint` script

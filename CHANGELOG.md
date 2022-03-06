# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2022-03-06
### Added
- Links to about section and project section to navigation
### Changed
- Redirect behance link to Adobe portolfio
- Blog page content altered
- Darktoggle moved to hamburger menu for mobile screens
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
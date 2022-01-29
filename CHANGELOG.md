# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
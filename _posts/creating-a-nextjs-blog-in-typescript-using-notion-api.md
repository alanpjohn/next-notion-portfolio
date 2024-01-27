---
title: Creating a NextJS blog in typescript using Notion API
date: 2022-03-28
modifiedDate: 2022-10-20
description: "Part 2 of the series breaking down my portfolio/blog development. Here I’ll break down on how I am using Notion as an headless CMS."
tags:
    - nextjs
    - portfolio
    - notion
    - typescript
publish: true
---

> This article is for an outdated version of the notion API. Currently I am moving away from Notion as they have introduced a limit on the blocks in the free tier which limits my note making progress.

# Prerequisites

This article is a follow up to my [last article](https://alanjohn.dev/blog/building-a-developer-portfolio-setting-up-my-nextjs-repository-with-the-help-of-superplate.md) where I covered how to setup a NextJS repository for your developer portfolio. In this article, I would be covering how I used Notion as a headless CMS for my blog content.

It is expected that you know

- How to create react components
- how to use dynamic routing in NextJS
- static site generation in NextJS with `getStaticProps` and `getStaticPaths`.
- typescript

You can find the source code [here](https://github.com/TheForeverLost/next-notion-portfolio).

## Do you need a CMS?

In my last post, I explained how NextJS has MDX support and as developers we are used to writing in markdown. So for most developers, it might preferable to use MDX with their blog which would be a much simpler solution than integrating with a CMS. Then why did I chose to use Notion as a CMS? Primarily because I use Notion on a day to day basis to manage my study notes, work tracker, travel planner etc. So it made sense to store my blogs in Notion as well. There are some other benefits to use the Notion API as a headless CMS.

Having your code lie separately from your data gives you more flexibility. I can edit and manage my posts from the Notion website or the mobile app without having to make commits or pull requests. It makes for a cleaner repository where your commit history isn’t swamped with commits made to correct grammatical mistakes and updating content. The Notion application acts as a dashboard for me to manage my content and the website becomes the outlet where it is presented to the users. It also handles the issue of storing static assets as you can upload your pictures and videos to notion and then retrieve your content from there instead of putting all your static files in your `/public` directory.

# Setting up Notion

The first you would need a Notion account. Sign up at [notion.so](http://notion.so) and create your workspace. After that you would require a database on Notion for you to store and fetch blog articles from. You can duplicate the [template](https://pricey-oriole-ef1.notion.site/f3ca7846fd7f4430ab7f311d8872dc64?v=12f43c4f5b3e440b8ace65b0be8699b2) I have used if you want to (this guide would follow this template). Just open the template and click on **duplicate**.

In the template that I made, I have the following columns

```
Title : title
Tags : multi_select
Publish : check_box
Date: last_edited_time
Description : rich_text
Link : url
PublishDate : Date 
```

- The title is the page.
- The tags is a `multi_select` that allows us to add tags to our blog post.
- Publish is a `checkbox` that controls whether this page is a draft or a published article on the site.
- Date stores the `last_edited_time` to keep track of when an article was last updated.
- The description is a `rich_text` summary.
- Link is a `url` to another other site where the article was published.
- PublishDate is the `date` on which it was published.

Now that you have a notion database to store your blog articles with a dummy article. Now you need to create an integration. For that, go to [https://www.notion.com/my-integrations](https://www.notion.com/my-integrations) and create a new integration. Give it a name and give it read capabilities with the workspace you have created. Copy the token and save it somewhere securely. Next go to your database and click on **share**. Now you add your integration name here and copy the database ID. 

```bash
https://www.notion.so/a8aec43384f447ed84390e8e42c2e089?v=...
                      |--------- Database ID --------|
```

Store your notion integration token and the ID of your database in the `.env` file inside your directory. Do not push this file to github.

```bash
NOTION_KEY=<YOUR NOTION INTEGRATION TOKEN>
NOTION_BLOG_DATABASE_ID=<YOUR NOTION BLOG DATABASE ID>
```

You are now all set. Follow the [getting started documentation](https://developers.notion.com/docs/getting-started) provided by notion for more details.

# Retrieving data from Notion API

Go to your NextJS directory and install the notion client.

```bash
$ npm install @notionhq/client
```

> 💡 There are a lot of unofficial open source notion integration libraries out there you should check them out to see if they meet your requirements or not before making your own integration. I might separate the code that I wrote to integrate notion to create React components into a separate library for others to use in the near future.

Let’s look at the sample code of the two API calls we’ll be using. The first is to query the database to collect all blog article data.

```tsx
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function getBlogPosts(){
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
    });

    return response;
}
```

Retrieving the page data is slightly different. Notion stores its page data in the form of blocks. So to get the content of a page, you need to retrieve the blocks. Here is how you would retrieve the blocks in a page.

```tsx
export const getBlocks = async (id: string) => {
    let response = await notion.blocks.children.list({
        block_id: id
    });

    return response;
};
```

When you retrieve the blocks for a page, you only get one level of blocks. So you’ll have to send subsequent requests for every block to retrieve any children of the block if the block has any children.

## Typing Issues

> If you’re not using typescript then the you don’t have to worry about the typing issue.

When using the notion API in typescript, you’ll find it difficult to use the typing provided as notion auto-generates the typing which leads to a large union of types aggregated in a few types. This poses a problem when you want a type definition for a specific property or block type. You don’t have a type defined for them as those definitions are part of very large union (which isn’t easily readable either). This is not ergonomic to work with. You can learn more about this issue [here](https://github.com/makenotion/notion-sdk-js/issues/219). 

You could just use the `any` type but that isn’t a recommended practice. A better workaround would be to use the [`extract` utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union). The extract type is a generic type will help us extract the specific type we need from a union of types.

## Getting all blog posts from Notion database

Lets look at our blog database query response. If you print the query database response on the console, you would get something like this. 

```bash
{
  object: 'list',
  results: [
    {
      object: 'page',
      id: '270434234-31fc-4193-86e2-5ebd7f0de8de',
      created_time: '2022-02-18T18:27:00.000Z',
      last_edited_time: '2022-03-25T17:44:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: [Object],
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/TestPage-270bd3023413c419386e25ebd7f0de8de'
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'page',
  page: {}
}
```

The `results` member of the `QueryDatabaseResponse` object holds the database entries. The database entry would consist of a `properties` object which holds the data stored in each column of your database table.

If you look at the type defintion of the `response.results` on your IDE in the tooltip, you would see that it is a very large union of type definitions. Similarly, the type definition for `response.results.[*].properties` is an even bigger union of type definitions. Using extract, we can get the exact type definition we need from the union and give it an alias. Having these aliases will allow you to safely extract information from your query database response and store them in a object which you can use more easily.

```tsx
import {
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type PostResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;
```

Now, `PostResult` type is an alias to the type definitions in `response.results` with a `properties` attribute. We can then extract the type definitions for the specific property types used in our columns using extract as well.

```tsx
import {
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type PostResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;

type PropertyValueMap = PostResult["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
    PropertyValue,
    { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">;
export type PropertyValueUrl = ExtractedPropertyValue<"url">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueEditedTime =
    ExtractedPropertyValue<"last_edited_time">;
```

Now let’s define an interface for our post data which we would require.

```tsx
export interface IPost {
    id: string;
    url: string;
    tags: string[];
    modifiedDate: string;
    publishDate: string;
    title: string;
    description: string;
    link?: string;
}
```

Now, we’ll extract an array of `IPost` from the `QueryDatabaseResponse`.

```tsx
type DatabaseItem = PostResult & {
    properties: {
        Title: PropertyValueTitle;
        Date: PropertyValueEditedTime;
        Tags: PropertyValueMultiSelect;
        Description: PropertyValueRichText;
        Link: PropertyValueUrl;
        PublishDate: PropertyValueDate;
        LastUpdated?: PropertyValueDate;
    };
};

const extractPosts = async (
    response: QueryDatabaseResponse,
): Promise<IPost[]> => {
    const databaseItems: DatabaseItem[] = response.results.map(
        (databaseItem) => databaseItem as DatabaseItem,
    );
    const posts: IPost[] = await Promise.all(
        databaseItems.map(async (postInDB: DatabaseItem) => {
            const title = postInDB.properties.Title.title[0].plain_text;
            const date = postInDB.properties.Date.last_edited_time;
            const description =
                postInDB.properties.Description.rich_text[0].plain_text;
            const url = getCanonicalURL(title);
            const link = postInDB.properties.Link.url || "";
            const tags = postInDB.properties.Tags.multi_select;
            const cover = await getPageCover(postInDB.id);
            const publishdate = postInDB.properties.PublishDate.date?.start;

            const post: IPost = {
                id: postInDB.id,
                title: title,
                modifiedDate: date,
                description: description,
                url: url,
                link: link,
                cover: cover,
                tags: tags,
                publishDate: publishdate || date,
            };
            return post;
        }),
    );
    return posts;
};

export async function getBlogPosts(): Promise<IPost[]> {
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID || "";
    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
    });
    console.log(response);
    const posts = await extractPosts(response);
    return posts;
}
```

The property types we created previously using `extract` help us in get the information we require from the `QueryDatabaseResponse` without having to deal with possible undefined fields. Now, the `getBlogPosts` function returns an array of `IPost` which is much easier to work with.

The `getCanonicalURL` function creates a URL for the blog post based on its title.

```tsx
export const getCanonicalURL = (title: string): string => {
    const cleaned = title.replace(/\W/gm, " ");
    const removedSpaces = cleaned
        .split(" ")
        .filter((str) => str)
        .join("-");
    return removedSpaces;
};
```

## Getting all blocks of a page

Now that we have the ID of all our blog pages. We can retrieve the blocks for each page. Let’s look at the `ListBlockChildrenResponse` that we get when we retrieve the blocks.

```tsx
{
  object: 'list',
  results: [
    {
      object: 'block',
      id: 'a6fc6649-1a48-4be7-9772-f945780b09fe',
      created_time: '2022-02-19T08:11:00.000Z',
      last_edited_time: '2022-03-25T17:41:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      has_children: false,
      archived: false,
      type: 'bookmark',
      bookmark: [Object]
    },
    ... // Truncated
    {
      object: 'block',
      id: '191d3863-cd7b-45ca-8b82-83c968b5be3a',
      created_time: '2022-03-25T17:44:00.000Z',
      last_edited_time: '2022-03-25T17:44:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: [Object]
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'block',
  block: {}
}
```

1. You only get one level of blocks when you retrieve the blocks of a page. If one block has child blocks, you’ll have to call the function again with the block ID to get it’s children. You can know if a block has children by seeing the value of `has_children` .
2. Depending on the block type, the object will have different member. For "paragraph” type blocks, the information about the block is stored in `paragraph` member and so on for [all the block types offered by Notion](https://developers.notion.com/reference/block). The type definitions for these are again not properly defined as everything inside `ListBlockChildrenResponse` is defined as a union of type definitions.

So to properly extract information from the blocks, we’ll again use the `Extract` utility class to extract the block type definitions.

```tsx
export type Block = Extract<
    ListBlockChildrenResponse["results"][number],
    { type: string }
>;

export type BlockType = Block["type"];

type ExtractedBlockType<TType extends BlockType> = Extract<
    Block,
    { type: TType }
>;

export type ParagraphBlock = ExtractedBlockType<"paragraph">;

export type HeadingOneBlock = ExtractedBlockType<"heading_1">;
export type HeadingTwoBlock = ExtractedBlockType<"heading_2">;
export type HeadingThreeBlock = ExtractedBlockType<"heading_3">;

export type HeadingBlock =
    | HeadingOneBlock
    | HeadingTwoBlock
    | HeadingThreeBlock;

export type BulletedListItemBlock = ExtractedBlockType<"bulleted_list_item">;
export type NumberedListItemBlock = ExtractedBlockType<"numbered_list_item">;

export type QuoteBlock = ExtractedBlockType<"quote">;
export type EquationBlock = ExtractedBlockType<"equation">;
export type CodeBlock = ExtractedBlockType<"code">;
export type CalloutBlock = ExtractedBlockType<"callout">;
export type ToggleBlock = ExtractedBlockType<"toggle">;
export type EmbedBlock = ExtractedBlockType<"embed">;
export type WebBookmarkBlock = ExtractedBlockType<"bookmark">;
export type ImageBlock = ExtractedBlockType<"image">;
```

Notion uses the same definition for rich text and file objects so we can create aliases for that as well for reusability.

```tsx
export type RichText = ParagraphBlock["paragraph"]["rich_text"][number];
export type File = ImageBlock["image"];
```

As we have seen when we printed  `ListBlockChildrenResponse`, the Block type that we have extracted doesn’t have an attribute to store children in it. But it would be better for us if we can store the children of block inside the block object itself. So we define a new type that extends the extracted `Block` type.

```tsx
export type BlockWithChildren = Block & {
          type: BlockType;
          childblocks: BlockWithChildren[];
      }
```

Now to retrieve all the blocks inside the page.

```tsx
export const getBlocks = async (blockId: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let response = await notion.blocks.children.list({
        block_id: blockId,
    });

    response.results.map((block) => {
        blocks.push(block as Block);
    });
    
    return blocks;
};
```

The max number of blocks you can get per request is 100, so you’ll have to utilize [pagination](https://developers.notion.com/reference/pagination) to get all the blocks if they exceed a 100.

```tsx
export const getBlocks = async (blockId: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 25,
    });

    response.results.map((block) => {
        blocks.push(block as Block);
    });
    while (response.has_more && response.next_cursor) {
        response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 25,
            start_cursor: response.next_cursor,
        });
        response.results.map((block) => {
            blocks.push(block as Block);
        });
    }
    return blocks;
};
```

Now we also need a function to get the children of the block if the block has children and convert the `Block` object into a `BlockWithChildren` object.

```tsx
const getChildren = async (block: Block): Promise<BlockWithChildren> => {
    const children: BlockWithChildren[] = [];
    if (block.has_children) {
        const childBlocks = await getBlocks(block.id);
        const childBlocksWithChildren = await Promise.all(
            childBlocks.map(async (block) => await getChildren(block)),
        );
        childBlocksWithChildren.map((block: BlockWithChildren) => {
            children.push(block);
        });
    }
    const ablock: BlockWithChildren = {
        ...block,
        childblocks: children,
    };
    return ablock;
};
```

The `getChildren` method takes a `Block` and recursively retrieves the children for the block if it has any and returns a `BlockWithChildren`. Now adding all of it together, I have created a `getPageBlocks` method which will return an array of `BlockWithChildren` having all the blocks of the page.

```tsx
export const getBlocks = async (blockId: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 25,
    });

    response.results.map((block) => {
        blocks.push(block as Block);
    });
    while (response.has_more && response.next_cursor) {
        response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 25,
            start_cursor: response.next_cursor,
        });
        response.results.map((block) => {
            blocks.push(block as Block);
        });
    }
    return blocks;
};

const getChildren = async (block: Block): Promise<BlockWithChildren> => {
    const children: BlockWithChildren[] = [];
    if (block.has_children) {
        const childBlocks = await getBlocks(block.id);
        const childBlocksWithChildren = await Promise.all(
            childBlocks.map(async (block) => await getChildren(block)),
        );
        childBlocksWithChildren.map((block: BlockWithChildren) => {
            children.push(block);
        });
    }
    const ablock: BlockWithChildren = {
        ...block,
        childblocks: children,
    };
    return ablock;
};

export const getPostBlocks = async (
    pageId: string,
): Promise<BlockWithChildren[]> => {
    const blocks: Block[] = await getBlocks(pageId);
    const blocksWithChildren: BlockWithChildren[] = await Promise.all(
        blocks.map(async (block: Block) => {
            const blockWithChildren = await getChildren(block);
            return blockWithChildren;
        }),
    );
    return blocksWithChildren;
};
```

The `getBlogPosts` function and the `getPageBlocks` function should be called in the `getStaticProps` method of your page. The page will built at runtime so you don’t have to worry about your site making repeated requests to your notion API each time the user requests the page. With ISR, you can make sure your pages are up to date with the content inside Notion by rebuilding the pages after a certain time period.

# Rendering Page Content

Now that we have an array of `BlockWithChildren`, we can just iterate through the array and return a react component based on the type of block. We can similarly render the children of the block inside that react component.

```tsx
const renderBlock = (block: BlockWithChildren): React.ReactNode => {
    const childblocks: BlockWithChildren[] = block.has_children
        ? block.childblocks
        : [];
    const content: React.ReactNode = childblocks.map(
        (block: BlockWithChildren) => {
            return renderBlock(block);
        },
    );
    switch (block.type) {
        case "paragraph":
            return <Paragraph key={block.id} {...block} />;
        case "heading_1":
            return <Heading1 key={block.id} {...block} />;
				/* Truncated code for readability */
        default:
						// to handle unsupported block by our integration
            return <NotSupportedBlock key={block.id} reason={block.type} />;
    }
};

export type PostContentProps = {
    blocks: Array<BlockWithChildren>;
};

export const PostContent: React.FC<PostContentProps> = ({
    blocks,
}: PostContentProps) => {
    return (
        <article>
            {blocks.map((block: BlockWithChildren) => {
                return renderBlock(block);
            })}
        </article>
    );
};
```

And then inside our page, we can use the `PostContent` component.

```tsx
<PostContent blocks={blocks} />
```

Now let’s look at how we handle the common blocks.

## Text Blocks

When I mean text blocks, I am referring to paragraph, headings, callouts and quotes. These blocks have rich text objects inside them which are presented in different ways on the frontend. So all we have to do is make a function to render the rich text and present them inside the react components we make for these blocks. If you look at the type definitions for these block types, you’ll notice they have an array of `RichText` stored in the `rich_text` member. We’ll take this array and return a `span` for each `RichText`. The text content of a `RichText` object is stored in the `plain_text` member. `RichText` can be bold, italic, code, strikethrough, underlined, links, different colors etc so we’ll have to add that in the styling of the `span`.

```tsx
export const renderText = (
    id: string,
    textBlocks?: Array<RichText>,
): React.ReactNode => {
    if (!textBlocks) {
        return <></>;
    }
    let count = 0;
    return textBlocks.map(({ annotations, plain_text, href }) => {
        const { bold, code, color, italic, strikethrough, underline } =
            annotations;
        count = count + 1;
        return (
            <span
                key={`text-${id}-${count}`}
                className={[
                    bold ? "bold" : "",
                    code ? "mono" : "",
                    italic ? "italic" : "",
                    strikethrough ? "strikethrough" : "",
                    underline ? "underline" : "",
                ].join(" ")}
                style={color !== "default" ? { color } : {}}
            >
                {href ? (
                    <a className="default-link not-prose" href={href}>
                        {plain_text}
                    </a>
                ) : (
                    plain_text
                )}
            </span>
        );
    });
};
```

Based on that, the react component for paragraph type blocks would look like

```tsx
type ParagraphBlockProps = PropsWithRef<ParagraphBlock>;

export const Paragraph: React.FC<ParagraphBlockProps> = ({
    id,
    paragraph,
}: ParagraphBlockProps) => {
    return <p>{renderText(id, paragraph.rich_text)}</p>;
};
```

## List Blocks

List blocks are more complicated to handle as Notion treats lists similar to how markdown handles lists. They do not follow a nested structure.

```markdown
- Item 1
	- SubItem 1
	- SubItem 2
- Item 2
	- SubItem 3
		- SubItem4
```

Meanwhile in HTML, this would be represented differently

```html
<ul>
	<li> 
		Item 1
		<ul>
			<li>
				SubItem 1
			</li>
			<li>
				SubItem 2
			</li>
		</ul>
	</li>
	<li>
		Item 2
		<ul>
			<li>
				SubItem 3
				<ul>
					<li>
						SubItem 4
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
```

In HTML, the list items needs to be nested inside a `<ul>` or `<ol>` tag. When we get the `bulleted_list_item` or the `ordered_list_item` type of block, they don’t have any data indicating whether they belong to the same list or not. So we need to pre-process the list items that we get from Notion to create the nested structure of lists. My approach has been to create my own `ListBlock` type which I extend the extracted `BlockWithChildren` type definition. 

```tsx
export type ListBlock = {
    id: string;
    object: string;
    type: "bulleted_list" | "numbered_list";
    childblocks: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    created_time: string;
    last_edited_time: string;
};

export type ListItemBlock = {
    id: string;
    object: string;
    type: "list_item";
    childblocks: BlockWithChildren[];
    has_children: boolean;
    archived: boolean;
    list_item: BulletedListItemBlock["bulleted_list_item"];
    created_time: string;
    last_edited_time: string;
};

export type BlockWithChildren =
    | (Block & {
          type: BlockType;
          childblocks: BlockWithChildren[];
      })
    | ListBlock
    | ListItemBlock;
```

The new `ListBlock` allows me to create a nested structure where I put adjacent `bulleted_list_item` or  `ordered_list_item` types of block into a `ListBlock` object and put the contents of these list item blocks into `ListItemBlock` objects. So the `ListBlock` represents my `ul` and `ol` tags while the `ListItemBlock` represents my `li` tag. I have used queues to convert all the `bulleted_list_item` or  `ordered_list_item` types of blocks into a `ListBlock` oject with an array of `ListItemBlock` objects as its children.

```tsx
const createListBlock = (
    blocktype: "bulleted_list" | "numbered_list",
    blocks: Array<BlockWithChildren>,
) => {
    const processedChildren: BlockWithChildren[] = blocks.map(
        (block: BlockWithChildren) => {
            if (
                block.type == "bulleted_list_item" ||
                block.type == "numbered_list_item"
            ) {
                const blockContent =
                    block.type == "bulleted_list_item"
                        ? block.bulleted_list_item
                        : block.numbered_list_item;
                const ablock: ListItemBlock = {
                    ...block,
                    type: "list_item",
                    list_item: blockContent,
                };
                return ablock;
            }
            return block;
        },
    );
    const block: BlockWithChildren = {
        object: blocks[0].object,
        id: blocks[0].id,
        created_time: new Date(Date.now()).toISOString(),
        last_edited_time: new Date(Date.now()).toISOString(),
        has_children: true,
        archived: false,
        type: blocktype,
        childblocks: processedChildren,
    };
    return block;
};

export const extractListItems = (
    blocks: Array<BlockWithChildren>,
): Array<BlockWithChildren> => {
    const postprocessed = Array<BlockWithChildren>();
    const bulleted_list_stack = Array<BlockWithChildren>();
    const numbered_list_stack = Array<BlockWithChildren>();

    blocks.forEach((block: BlockWithChildren) => {
        switch (block.type) {
            case "bulleted_list_item":
                bulleted_list_stack.push(block);
                break;
            case "numbered_list_item":
                numbered_list_stack.push(block);
                break;
            default:
                if (bulleted_list_stack.length > 0) {
                    postprocessed.push(
                        createListBlock("bulleted_list", bulleted_list_stack),
                    );
                } else if (numbered_list_stack.length > 0) {
                    postprocessed.push(
                        createListBlock("numbered_list", numbered_list_stack),
                    );
                }
                postprocessed.push(block);
                bulleted_list_stack.length = 0;
                numbered_list_stack.length = 0;
                break;
        }
    });

    if (bulleted_list_stack.length > 0) {
        postprocessed.push(
            createListBlock("bulleted_list", bulleted_list_stack),
        );
    } else if (numbered_list_stack.length > 0) {
        postprocessed.push(
            createListBlock("numbered_list", numbered_list_stack),
        );
    }

    return postprocessed;
};
```

The `extractListItems` function takes the Array of `BlockWithChildren` which doesn't have a nested list structure and returns the Array of `BlockWithChildren` with the `ListBlock` objects. We need to call this function to pre-process any array of type `BlockWithChildren` before we create react components for it.

```tsx
const renderBlock = (block: BlockWithChildren): React.ReactNode => {
    const childblocks: BlockWithChildren[] = block.has_children
        ? extractListItems(block.childblocks) // Preprocessing list items
        : [];
    const content: React.ReactNode = childblocks.map(
        (block: BlockWithChildren) => {
            return renderBlock(block);
        },
    );
    switch (block.type) {
        case "paragraph":
            return <Paragraph key={block.id} {...block} />;
        case "heading_1":
            return <Heading1 key={block.id} {...block} />;
				/* Truncated code for readability */
        default:
            return <NotSupportedBlock key={block.id} reason={block.type} />;
    }
};

export type PostContentProps = {
    blocks: Array<BlockWithChildren>;
};

export const PostContent: React.FC<PostContentProps> = ({
    blocks,
}: PostContentProps) => {
		const blocksWithList = extractListItems(blocks); // Preprocessing list items
    return (
        <article>
            {blocksWithList.map((block: BlockWithChildren) => {
                return renderBlock(block);
            })}
        </article>
    );
};
```

The react components for List blocks would be as follows.

```tsx
type ListBlockProps = PropsWithChildren<ListBlock>;

export const UnorderedList: React.FC<ListBlockProps> = ({
    children,
}: ListBlockProps) => {
    return <ul>{children}</ul>;
};

export const OrderedList: React.FC<ListBlockProps> = ({
    children,
}: ListBlockProps) => {
    return <ol>{children}</ol>;
};

type ListItemBlockProps = PropsWithChildren<ListItemBlock>;

export const ListItem: React.FC<ListItemBlockProps> = ({
    id,
    list_item,
    children,
}: ListItemBlockProps) => {
    return (
        <li>
            {renderText(id, list_item.rich_text)}
            {children}
        </li>
    );
};
```

## Code Blocks

Code blocks have a extra layer of complexity over text blocks which is syntax highlighting. We will use [highlight.js](https://highlightjs.org/) for syntax highlighting. First, we install highlight.js.

```bash
$ npm i highlight.js
```

In your `_app.js` , add your preferred highlight.js stylesheet. You can see a full list of highlight.js stylesheets [here](https://highlightjs.org/static/demo/).

```tsx
import "highlight.js/styles/github-dark-dimmed.css";
```

highlight.js contains support for a lot of languages, most of which you won’t be needing. Importing syntax highlighting for all the languages will cause your site to load slower. Even the common languages subset is very big. I would recommend creating another file where you configure your highlight.js instance.

```tsx
import { HLJSApi } from "highlight.js";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cplusplus from "highlight.js/lib/languages/cpp";
// add remove languages as per your preference

export const getConfiguredHighlight = (): HLJSApi => {
		// register the languages
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("shell", shell);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("cplus", cplusplus);
    
		// add aliases for flexibilty
		hljs.registerAliases(["c++", "cplusplus"], { languageName: "cplus" });
    
    hljs.configure({ ignoreUnescapedHTML: true });

    return hljs;
};
```

Now to highlight the code syntax inside the react component for code blocks, we import the configured hljs and highlight the `code` element.

```tsx
import { renderText } from "@components/notion/text";

import { getConfiguredHighlight } from "@util/highlight";
import { CodeBlock } from "@util/interface";

import { PropsWithRef, useEffect, useRef } from "react";

type CodeBlockProps = PropsWithRef<CodeBlock>;

export const MultilineCodeBlock: React.FC<CodeBlockProps> = ({
    id,
    code,
}: CodeBlockProps) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const hljs = getConfiguredHighlight();
        if (ref.current) {
            hljs.highlightElement(ref.current);
        }
    });

    return (
        <pre className="bg-codeblock">
            <code ref={ref} className={`${code.language}`}>
                {renderText(id, code.rich_text)}
            </code>
        </pre>
    );
};
```

## Image Blocks

NextJS provides in built-image optimization with it’s `next/image` component. You will have to specify the domains from where the images are fetched in your NextJS configuration. It is easy to add the domains for whenever you upload an image to notion. But it is not feasible to handle images which aren’t uploaded to notion. So for now till we find a workaround for that, we’ll avoid the external image case. You can check where your upload images are stored and add the domain name to your `next.config.js`.

```tsx
module.exports = {
    images: {
        domains: [
            "s3.us-west-2.amazonaws.com",
        ],
    },
});
```

A problem you would come across with the `next/image` component is displaying responsize images without knowing the size of the image beforehand. We can solve that using the fill layout option and css styling.

```tsx
type ImageProps = PropsWithRef<ImageBlock>;

export const BlogImage: React.FC<ImageProps> = ({ id, image }: ImageProps) => {
    const altText = image.caption
        ? image.caption.map((richText) => richText.plain_text).join(" ")
        : "Some image";
    const src = image.type == "file" ? image.file.url : "external";
    const children = renderText(id, image.caption);
    if (src == "external") {
        return (
            <NotSupportedBlock
                key={id}
                reason={`Image type ${image.type} not supported`}
            />
        );
    }
    return (
        <figure className="blog__image">
            <Image src={src} layout="fill" className="image" alt={altText} />
            {children && <figcaption>{children}</figcaption>}
        </figure>
    );
};
```

```scss
.blog__image {
        width: 100%;
        position: relative;

        > div,
        span {
            position: unset !important;
        }

        .image {
            object-fit: contain;
            width: 100% !important;
            position: relative !important;
            height: unset !important;
        }
    }
```

> Please note I have used SCSS, the CSS code snippet for this will be slightly different.

# What’s next?

- You can create react components for other blocks like embed helping you create a more rich user experience.
- You can generate your non blog pages like a on-site resume or details about your projects etc from Notion as well. (I have done that so you can refer that in the source code).
- You can use dynamic loading to improve the performance of your site.
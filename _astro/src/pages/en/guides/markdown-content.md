---
layout: ~/layouts/MainLayout.astro
title: Markdown
description: Using Markdown with Astro
i18nReady: true
---

Markdown content is commonly used to author text-heavy content like blog posts and documentation. Astro includes built-in support for standard Markdown (`.md`) files. With the [@astrojs/mdx integration](/en/guides/integrations-guide/mdx/), Astro supports MDX (`.mdx`) files which bring added features like support for JavaScript expressions and components right in your Markdown.

## Markdown and MDX Pages

Astro treats any `.md` or `.mdx` file inside of the `/src/pages/` directory as a page. Placing a file in this directory, or any sub-directory, will automatically build a page route using the pathname of the file.

📚 Read more about Astro's [file-based routing](/en/core-concepts/routing/).

### Basic Example

To start using Markdown in Astro, add a new file `page-1.md` to your project in the `src/pages/` folder. Copy the basic template below into your file, and then view the rendered HTML in your browser preview. Usually, this is at [http://localhost:3000/page-1](http://localhost:3000/page-1).



```markdown
---
# Example: src/pages/page-1.md
title: Hello, World
---

# Hi there!

This is your first markdown page. It probably isn't styled much, although
Markdown does support **bold** and _italics._

To learn more about adding a layout to your page, read the next section on **Markdown Layouts.**
```

### Frontmatter `layout`

In Astro, Markdown and MDX pages have a special frontmatter property for `layout` that defines the relative path to an Astro [layout component](/en/core-concepts/layouts/). This component will wrap your Markdown content, providing a page shell and any other included page template elements.

```markdown
---
// src/pages/page.md
layout: ../layouts/BaseLayout.astro
---
```

A typical layout for Markdown pages includes:

1. The `frontmatter` prop to access the Markdown or MDX page's frontmatter and other data. See [Markdown Layout Props](#markdown-layout-props) for a complete list of props available.
2. A default [`<slot />`](/en/core-concepts/astro-components/#slots) to indicate where the page's Markdown content should be rendered.

```astro /(?<!//.*){?frontmatter(?:\\.\w+)?}?/ "<slot />"
---
// src/layouts/BaseLayout.astro
// 1. The frontmatter prop gives access to frontmatter and other data
const { frontmatter } = Astro.props;
---
<html>
  <head>
    <!-- Add other Head elements here, like styles and meta tags. -->
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <!-- Add other UI components here, like common headers and footers. -->
    <h1>{frontmatter.title} by {frontmatter.author}</h1>
    <!-- 2. Rendered HTML will be passed into the default slot. -->
    <slot />
    <p>Written on: {frontmatter.date}</p>
  </body>
</html>
```

### Markdown Layout Props

:::note
Markdown and MDX files do not return identical `Astro.props` objects. See the MDX integration guide for [MDX properties exposed](/en/guides/integrations-guide/mdx/#exported-properties).
:::

A Markdown layout will have access to the following information via `Astro.props`:

- **`frontmatter`** - all frontmatter from the Markdown or MDX document.
  - **`frontmatter.file`** - The absolute path of this file (e.g. `/home/user/projects/.../file.md`).
  - **`frontmatter.url`** - If it's a page, the URL of the page (e.g. `/en/guides/markdown-content`).
- **`headings`** - A list of headings (`h1 -> h6`) in the Markdown document with associated metadata. This list follows the type: `{ depth: number; slug: string; text: string }[]`.
- **`rawContent()`** - A function that returns the raw Markdown document as a string.
- **`compiledContent()`** - A function that returns the Markdown document compiled to an HTML string.

An example blog post may pass the following `Astro.props` object to its layout:

```js
Astro.props = {
  frontmatter: {
    /** Frontmatter from a blog post */
    title: "Astro 0.18 Release",
    date: "Tuesday, July 27 2021",
    author: "Matthew Phillips",
    description: "Astro 0.18 is our biggest release since Astro launch.",
    /** Generated values */
    file: "/home/user/projects/.../file.md",
    url: "/en/guides/markdown-content/"
  },
  headings: [
    {
      "depth": 1,
      "text": "Astro 0.18 Release",
      "slug": "astro-018-release"
    },
    {
      "depth": 2,
      "text": "Responsive partial hydration",
      "slug": "responsive-partial-hydration"
    }
    /* ... */
  ],
  rawContent: () => "# Astro 0.18 Release\nA little over a month ago, the first public beta [...]",
  compiledContent: () => "<h1>Astro 0.18 Release</h1>\n<p>A little over a month ago, the first public beta [...]</p>",
}
```

#### Example: Using one Layout that works for `.md`, `.mdx`, and `.astro` files

A single Astro layout can be written to receive the `frontmatter` object from `.md` and `.mdx` files, as well as any named props passed from `.astro` files.

In the example below, the layout will display the page title either from an Astro component passing a `title` attribute or from a frontmatter YAML `title` property:

```astro /{?title}?/ /Astro.props[.a-z]*/
---
// src/components/MyLayout.astro
const { title } = Astro.props.frontmatter || Astro.props;
---
<html>
  <head></head>
  <body>
    <h1>{title}</h1>
    <slot />
  </body>
</html>
```

### Markdown Heading IDs

Astro will add autogenerated ids to all headings in Markdown files automatically using [github-slugger](https://github.com/Flet/github-slugger). But, if a custom id is specified, it won't be overriden.

These ids will be added _after_ all the other plugins are executed, so if you have a plugin like `rehype-toc` that needs ids, you should add your own slugging plugin (like `rehype-slug`).

### Markdown Drafts

`draft: true` is an optional frontmatter value that will mark an individual `.md` page or post as "unpublished." By default, this page will be excluded from the site build.

Markdown pages without the `draft` property or those with `draft: false` are unaffected and will be included in the final build.

```markdown {5}
---
# src/pages/post/blog-post.md
layout: ../../layouts/BaseLayout.astro
title: My Blog Post
draft: true
---

This is my in-progress blog post.

No page will be built for this post.

To build and publish this post:

- update the frontmatter to `draft: false` or
- remove the `draft` property entirely.
```

:::caution[Drafts and Astro.glob()]
Although `draft: true` will prevent a page from being built on your site at that page route, [`Astro.glob()`](/en/reference/api-reference/#astroglob) currently returns **all your Markdown files**.
:::

To exclude draft posts from being included in a post archive, or list of most recent posts, you can filter the results returned by your `Astro.glob()`.

```js
const posts = await Astro.glob('../pages/post/*.md');
const nonDraftPosts = posts.filter((post) => !post.frontmatter.draft);
```

⚙️ To enable building draft pages:

Add `drafts: true` to `markdown` in `astro.config.mjs`

```js ins={4}
// astro.config.mjs
export default defineConfig({
  markdown: {
    drafts: true,
  },
});
```

:::tip
You can also pass the `--drafts` flag when running `astro build` to build draft pages!
:::

### Variables and Components

:::caution[Deprecated]
Astro v1.0 **only supports standard Markdown in `.md` files**. The ability to use [components or JSX in Markdown pages is no longer enabled by default](/en/migrate/#deprecated-components-and-jsx-in-markdown) and support will eventually be removed entirely. 

Astro config supports a [legacy flag](/en/reference/configuration-reference/#legacyastroflavoredmarkdown) that will re-enable these features in Markdown pages until you are able to migrate to MDX in Astro. The Astro MDX integration is the recommended path forward if you need more features than standard Markdown provides.
:::

Please install the official [`@astrojs/mdx`](/en/guides/integrations-guide/mdx/) integration to use:

- [variables and JSX expressions in MDX (`.mdx`) files](/en/guides/integrations-guide/mdx/#variables).

- [Astro components](/en/core-concepts/astro-components/) or [UI framework components](/en/core-concepts/framework-components/) in MDX (`.mdx`) files.

See the migration guide for help [converting your existing Astro `.md` files to `.mdx`](/en/migrate/#converting-existing-md-files-to-mdx).

## MDX Features

Astro includes full support for MDX with the official `@astrojs/mdx` integration. See the [MDX integration guide](/en/guides/integrations-guide/mdx/) for more information on this integration, which supports the deprecated features from the previous section and enhances your Markdown authoring. 

### Using Variables in MDX

With the `@astrojs/mdx` integration, you can use [variables and JSX expressions in MDX (`.mdx`) files](/en/guides/integrations-guide/mdx/#variables).


### Using Components in MDX

With the `@astrojs/mdx` integration, you can use Astro or UI framework components in MDX (`.mdx`) files just as you would [use them in any other Astro component](/en/core-concepts/framework-components/#using-framework-components).

Don't forget to include a `client:directive` if necessary!


## Importing Markdown

You can import Markdown files directly into your Astro files! You can import one specific page with `import` or multiple pages with `Astro.glob()`.

```astro title="src/pages/index.astro" {3,6}
---
// Import some markdown. Dynamic import() is also supported!
import * as greatPost from '../pages/post/great-post.md';

// Also, you can import multiple files with Astro.glob
const posts = await Astro.glob('../pages/post/*.md');
---

A Great Post: <a href={greatPost.url}>{greatPost.frontmatter.title}</a>

<ul>
  {posts.map(post => <li>{post.frontmatter.title}</li>)}
</ul>
```

You can optionally provide a type for the `frontmatter` variable using a TypeScript generic:

```astro title="src/pages/index.astro" ins={2-5} ins="<Frontmatter>"
---
interface Frontmatter {
  title: string;
  description?: string;
}
const posts = await Astro.glob<Frontmatter>('../pages/post/*.md');
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
  <!-- post.title will be `string`! -->
</ul>
```

### Exported Properties

Each Markdown file exports the following properties.

#### `frontmatter`

Contains any data specified in this file's YAML frontmatter.

#### `file`

The absolute path of this file (e.g. `/home/user/projects/.../file.md`).

#### `url`

If it's a page, URL of the page (e.g. `/en/guides/markdown-content`).

#### `getHeadings()`

An async function that returns the headers of the Markdown file. The response follows this type: `{ depth: number; slug: string; text: string }[]`.

#### `rawContent()`

A function that returns the raw content of the Markdown file (excluding the frontmatter block) as a string.

:::tip
If you plan to use `rawContent` for calculating values like "reading time," we suggest using a remark or rehype plugin to inject frontmatter instead! See [our reading time example](#example-calculate-reading-time) for more.
:::

#### `compiledContent()`

A function that returns the parsed HTML document as a string. Note **this does not include layouts configured in your frontmatter**! Only the markdown document itself will be returned as HTML. 

:::caution
**[For `legacy.astroFlavoredMarkdown` users](/en/reference/configuration-reference/#legacyastroflavoredmarkdown):** This does not parse `{jsx expressions}` or `<Components />`. Only standard Markdown blocks like `## headings` and `- lists` will be parsed to HTML.
:::

#### `Content`

A component that returns the full rendered contents of the Markdown file. Here is an example:

```astro title="src/pages/content.astro" "Content"
---
import {Content as PromoBanner} from '../components/promoBanner.md';
---

<h2>Today's promo</h2>
<PromoBanner />
```

When using `getStaticPaths` and `Astro.glob()` to generate pages from Markdown files, you can pass the `<Content/>` component through the page’s `props`. You can then retrieve the component from `Astro.props` and render it in your template. 

```astro title="src/pages/[slug].astro" {9-11} "Content" "Astro.props.post"
---
export async function getStaticPaths() {
  const posts = await Astro.glob('../posts/**/*.md')

  return posts.map(post => ({
    params: { 
      slug: post.frontmatter.slug 
    },
    props: {
      post
    },
  }))
}

const { Content } = Astro.props.post
---
<article>
  <Content/>
</article>
```

## Configuring Markdown

Markdown support in Astro is powered by [remark](https://remark.js.org/), a powerful parsing and processing tool with an active ecosystem. Other Markdown parsers like Pandoc and markdown-it are not currently supported.

You can customize how remark parses your Markdown in `astro.config.mjs`. See [the reference documentation](/en/reference/configuration-reference/#markdown-options) for full configuration details or follow our guides below on how to add remark plugins and customize syntax highlighting.

:::note
These instructions are for standard Markdown. If you need to configure MDX, then see the relevant section in the [MDX integration guide](/en/guides/integrations-guide/mdx/#configuration).
:::

### Markdown Plugins

Astro supports third-party [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) plugins for Markdown. You can provide your plugins in `astro.config.mjs`.

:::note
Enabling custom `remarkPlugins` or `rehypePlugins` will remove these built-in plugins and you need to explicitly add these plugins if desired.

By default, Astro comes with [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) and [remark-smartypants](https://github.com/silvenon/remark-smartypants) pre-enabled.
:::

#### How to add a Markdown plugin in Astro

1. Install the npm package dependency in your project.

2. Update `remarkPlugins` or `rehypePlugins` inside the `markdown` options:

    ```js
    // astro.config.mjs
    export default {
      markdown: {
        remarkPlugins: [
          // Add a Remark plugin that you want to enable for your project.
          // If you need to provide options for the plugin, you can use an array and put the options as the second item.
          // ['remark-autolink-headings', { behavior: 'prepend'}],
        ],
        rehypePlugins: [
          // Add a Rehype plugin that you want to enable for your project.
          // If you need to provide options for the plugin, you can use an array and put the options as the second item.
          // 'rehype-slug',
          // ['rehype-autolink-headings', { behavior: 'prepend'}],
        ],
      },
    };
    ```

    You can provide names of the plugins as well as import them:

    ```js ins={2,6}
    // astro.config.mjs
    import autolinkHeadings from 'remark-autolink-headings';

    export default {
      markdown: {
        remarkPlugins: [[autolinkHeadings, { behavior: 'prepend' }]],
      },
    };
    ```

### Injecting frontmatter

You may want to add frontmatter properties to your Markdown files programmatically. By using a [remark or rehype plugin](#markdown-plugins), you can generate these properties based on a file's contents.

You can append to the `data.astro.frontmatter` property from your plugin's `file` argument like so:

```js title="example-remark-plugin.mjs"
export function exampleRemarkPlugin() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    file.data.astro.frontmatter.customProperty = 'Generated property';
  }
}
```

After applying this plugin to your `markdown` config:

```js title="astro.config.mjs" "import { exampleRemarkPlugin } from './example-remark-plugin.mjs';" "remarkPlugins: [exampleRemarkPlugin],"
import { exampleRemarkPlugin } from './example-remark-plugin.mjs';

export default {
  markdown: {
    remarkPlugins: [exampleRemarkPlugin],
  },
};

```

...every Markdown file will have `customProperty` in its frontmatter! This is available when [importing your markdown](#importing-markdown) and from [the `Astro.props.frontmatter` property in your layouts](#markdown-and-mdx-pages).

#### Example: calculate reading time

You can use a [remark plugin](https://github.com/remarkjs/remark) to add a reading time to your frontmatter. We recommend two helper packages:
- [`reading-time`](https://www.npmjs.com/package/reading-time) to calculate minutes read
- [`mdast-util-to-string`](https://www.npmjs.com/package/mdast-util-to-string) to extract all text from your markdown

```shell
npm i reading-time mdast-util-to-string
```

We can apply these packages to a remark plugin like so:

```js title="remark-reading-time.mjs"
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
	return function (tree, { data }) {
    const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}
```

Once you apply this plugin to your config:

```js title="astro.config.mjs" "import { remarkReadingTime } from './remark-reading-time.mjs';" "remarkPlugins: [remarkReadingTime],"
import { remarkReadingTime } from './remark-reading-time.mjs';

export default {
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
};

```

...all Markdown documents will have a calculated `minutesRead`. You can use this to include an "X min read" banner in a [markdown layout](#markdown-and-mdx-pages), for instance:

```astro title="src/layouts/BlogLayout.astro" "const { minutesRead } = Astro.props.frontmatter;" "<p>{minutesRead}</p>"
---
const { minutesRead } = Astro.props.frontmatter;
---

<html>
  <head>...</head>
  <body>
    <p>{minutesRead}</p>
    <slot />
  </body>
</html>
```

### Syntax Highlighting

Astro comes with built-in support for [Shiki](https://shiki.matsu.io/) and [Prism](https://prismjs.com/). This provides instant syntax highlighting for:

- all code fences (\`\`\`) used in a markdown (`.md`) file.
- content within the [built-in `<Code />` component](/en/reference/api-reference/#code-) (powered by Shiki), or the [`<Prism />` component](/en/reference/api-reference/#prism-) (powered by Prism).

Shiki is enabled by default, preconfigured with the `github-dark` theme. The compiled output will be limited to inline `style`s without any extraneous CSS classes, stylesheets, or client-side JS.

If you opt to use Prism, we will apply Prism's CSS classes instead. Note that **you need to bring your own CSS stylesheet** for syntax highlighting to appear! See the [Prism configuration section](#prism-configuration) for more details.

#### Choose a syntax highlighter

Shiki is our default syntax highlighter. If you'd like to switch to `'prism'` or disable syntax highlighting entirely, you can use the `markdown` config object:

```js ins={5}
// astro.config.mjs
export default {
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'prism',
  },
};
```

#### Shiki configuration

When using Shiki, you'll configure all options via the `shikiConfig` object like so:

```js
// astro.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
};
```

We also suggest [diving into their theme documentation](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) to explore loading custom theme, light vs dark mode toggles, or styling via CSS variables.

#### Prism configuration

When using Prism, you'll need to add a stylesheet to your project for syntax highlighting. If you're just getting started and prefer to use Prism over Shiki, we suggest:

1. [Setting `syntaxHighlight: 'prism'`](#choose-a-syntax-highlighter) from your `@astrojs/markdown-remark` config.
1. Choosing a premade stylesheet from the available [Prism Themes](https://github.com/PrismJS/prism-themes).
2. Adding this stylesheet to [your project's `public/` directory](/en/core-concepts/project-structure/#public).
3. Loading this [into your page's `<head>`](/en/core-concepts/astro-pages/#page-html) via a `<link>` tag.

You can also visit the [list of languages supported by Prism](https://prismjs.com/#supported-languages) for options and usage.

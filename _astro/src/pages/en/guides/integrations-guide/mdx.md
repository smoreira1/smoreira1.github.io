---
# NOTE: This file is auto-generated from 'scripts/generate-integration-pages.ts'
#       and pulls content directly from the package’s README.
#       DO NOT MAKE EDITS TO THIS FILE DIRECTLY, THEY WILL BE OVERWRITTEN!
#       For corrections, please edit the package README at
#       https://github.com/withastro/astro/tree/main/packages/integrations/mdx/

layout: ~/layouts/IntegrationLayout.astro
title: '@astrojs/mdx'
githubURL: 'https://github.com/withastro/astro/tree/main/packages/integrations/mdx/'
category: other
i18nReady: false
setup : |
  import Video from '~/components/Video.astro'
---

This **[Astro integration][astro-integration]** enables the usage of [MDX](https://mdxjs.com/) components and allows you to create pages as `.mdx` files.

## Why MDX?

MDX is the defacto solution for embedding components, such as interactive charts or alerts, within Markdown content. If you have existing content authored in MDX, this integration makes migrating to Astro a breeze.

**Want to learn more about MDX before using this integration?**\
Check out [“What is MDX?”](https://mdxjs.com/docs/what-is-mdx/), a deep-dive on the MDX format.

## Installation

### Quick Install

The `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add mdx
# Using Yarn
yarn astro add mdx
# Using PNPM
pnpx astro add mdx
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.

Because this command is new, it might not properly set things up. If that happens, [feel free to log an issue on our GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

First, install the `@astrojs/mdx` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install @astrojs/mdx
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**`astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // ...
  integrations: [mdx()],
});
```

Finally, restart the dev server.

## Usage

You can [add MDX pages to your project](/en/guides/markdown-content/) by adding `.mdx` files within your `src/pages/` directory.

### Components

To use components in your MDX pages in Astro, head to our [UI framework documentation][astro-ui-frameworks]. You'll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🪆 opportunities to mix and nest frameworks together

[**Client Directives**](/en/reference/directives-reference/) are still required in `.mdx` files.

> **Note**: `.mdx` files adhere to strict JSX syntax rather than Astro's HTML-like syntax.

### Variables

MDX supports `export` statements to add variables to your templates. These variables are accessible both from the template itself *and* as named properties when importing the template somewhere else.

For instance, you can export a `title` field from an MDX page or component to use as a heading with `{JSX expressions}`:

```mdx
export const title = 'My first MDX post'

# {title}
```

This `title` will be accessible from `import` and [glob](/en/reference/api-reference/) statements as well:

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('./*.mdx');
---

{posts.map(post => <p>{post.title}</p>)}
```

See [the official "how MDX works" guide](https://mdxjs.com/docs/using-mdx/#how-mdx-works) for more on MDX variables.

### Exported properties

Alongside your [MDX variable exports](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/#variables), we generate a few helpful exports as well. These are accessible when importing an MDX file via `import` statements or [`Astro.glob`](/en/reference/api-reference/).

#### `file`

The absolute path to the MDX file (e.g. `home/user/projects/.../file.md`).

#### `url`

The browser-ready URL for MDX files under `src/pages/`. For example, `src/pages/en/about.mdx` will provide a `url` of `/en/about/`. For MDX files outside of `src/pages`, `url` will be `undefined`.

#### `getHeadings()`

**Returns:** `{ depth: number; slug: string; text: string }[]`

A function that returns an array of all headings (i.e. `h1 -> h6` elements) in the MDX file. Each heading’s `slug` corresponds to the generated ID for a given heading and can be used for anchor links.

### Frontmatter

Astro also supports YAML-based frontmatter out-of-the-box. By default, all variables declared in a frontmatter fence (`---`) will be accessible via the `frontmatter` export.

For example, we can add a `title` and `publishDate` to an MDX page or component like so:

```mdx
---
title: 'My first MDX post'
publishDate: '21 September 2022'
---

# {frontmatter.title}
```

Now, this `title` and `publishDate` will be accessible from `import` and [glob](/en/reference/api-reference/) statements via the `frontmatter` property. This matches the behavior of [plain markdown in Astro](/en/reference/api-reference/) as well!

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('./*.mdx');
---

{posts.map(post => (
  <Fragment>
    <h2>{post.frontmatter.title}</h2>
    <time>{post.frontmatter.publishDate}</time>
  </Fragment>
))}
```

### Inject frontmatter via remark or rehype plugins

You may want to inject frontmatter properties across all of your MDX files. By using a [remark](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/#remarkPlugins) or [rehype](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/#remarkplugins) plugin, you can generate these properties based on a file’s contents.

You can append to the `data.astro.frontmatter` property from your plugin’s `file` argument like so:

```js
// example-remark-plugin.mjs
export function exampleRemarkPlugin() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    file.data.astro.frontmatter.customProperty = 'Generated property';
  }
}
```

After applying this plugin to your MDX integration config:

```js
// astro.config.mjs
import mdx from '@astrojs/mdx';
import { exampleRemarkPlugin } from './example-remark-plugin.mjs';

export default {
  integrations: [
    mdx({
      remarkPlugins: [exampleRemarkPlugin],
    }),
  ],
};
```

…every MDX file will have `customProperty` in its frontmatter! See [our Markdown documentation](/en/guides/markdown-content/) for more usage instructions and a [reading time plugin example](/en/guides/markdown-content/).

### Layouts

Layouts can be applied [in the same way as standard Astro Markdown](/en/guides/markdown-content/). You can add a `layout` to [your frontmatter](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/#frontmatter) like so:

```yaml
---
layout: '../layouts/BaseLayout.astro' 
title: 'My Blog Post'
---
```

Then, you can retrieve all other frontmatter properties from your layout via the `frontmatter` property, and render your MDX using the default [`<slot />`](/en/core-concepts/astro-components/):

```astro
---
// src/layouts/BaseLayout.astro
const { frontmatter } = Astro.props;
---
<html>
  <head>
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <h1>{frontmatter.title}</h1>
    <!-- Rendered MDX will be passed into the default slot. -->
    <slot />
  </body>
</html>
```

#### Importing layouts manually

You may need to pass information to your layouts that does not (or cannot) exist in your frontmatter. In this case, you can import and use a [`<Layout />` component](/en/core-concepts/layouts/) like any other component:

```mdx
---
// src/pages/posts/first-post.mdx

title: 'My first MDX post'
publishDate: '21 September 2022'
---
import BaseLayout from '../layouts/BaseLayout.astro';

function fancyJsHelper() {
  return "Try doing that with YAML!";
}

<BaseLayout title={frontmatter.title} fancyJsHelper={fancyJsHelper}>
  Welcome to my new Astro blog, using MDX!
</BaseLayout>
```

Then, your values are available to you through `Astro.props` in your layout, and your MDX content will be injected into the page where your `<slot />` component is written:

```astro
---
// src/layouts/BaseLayout.astro
const { title, fancyJsHelper } = Astro.props;
---
<!-- -->
<h1>{title}</h1>
<slot />
<p>{fancyJsHelper()}</p>
<!-- -->
```

### Syntax highlighting

The MDX integration respects [your project's `markdown.syntaxHighlight` configuration](/en/guides/markdown-content/).

We will highlight your code blocks with [Shiki](https://github.com/shikijs/shiki) by default [using Shiki twoslash](https://shikijs.github.io/twoslash/). You can customize [this remark plugin](https://www.npmjs.com/package/remark-shiki-twoslash) using the `markdown.shikiConfig` option in your `astro.config`. For example, you can apply a different built-in theme like so:

```js
// astro.config.mjs
export default {
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  integrations: [mdx()],
}
```

Visit [our Shiki configuration docs](/en/guides/markdown-content/) for more on using Shiki with Astro.

#### Switch to Prism

You can also use the [Prism](https://prismjs.com/) syntax highlighter by setting `markdown.syntaxHighlight` to `'prism'` in your `astro.config` like so:

```js
// astro.config.mjs
export default {
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [mdx()],
}
```

This applies a minimal Prism renderer with added support for `astro` code blocks. Visit [our "Prism configuration" docs](/en/guides/markdown-content/) for more on using Prism with Astro.

## Configuration

### remarkPlugins

**Default plugins:** [remark-gfm](https://github.com/remarkjs/remark-gfm), [remark-smartypants](https://github.com/silvenon/remark-smartypants)

[Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) allow you to extend your Markdown with new capabilities. This includes [auto-generating a table of contents](https://github.com/remarkjs/remark-toc), [applying accessible emoji labels](https://github.com/florianeckerstorfer/remark-a11y-emoji), and more. We encourage you to browse [awesome-remark](https://github.com/remarkjs/awesome-remark) for a full curated list!

We apply [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) and [Smartypants](https://github.com/silvenon/remark-smartypants) by default. This brings some niceties like auto-generating clickable links from text (ex. `https://example.com`) and formatting quotes for readability. When applying your own plugins, you can choose to preserve or remove these defaults.

To apply plugins *while preserving* Astro's default plugins, use a nested `extends` object like so:

```js
// astro.config.mjs
import remarkToc from 'remark-toc';

export default {
  integrations: [mdx({
    // apply remark-toc alongside GitHub-flavored markdown and Smartypants
    remarkPlugins: { extends: [remarkToc] },
  })],
}
```

To apply plugins *without* Astro's defaults, you can apply a plain array:

```js
// astro.config.mjs
import remarkToc from 'remark-toc';

export default {
  integrations: [mdx({
    // apply remark-toc alone, removing other defaults
    remarkPlugins: [remarkToc],
  })],
}
```

### rehypePlugins

[Rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) allow you to transform the HTML that your Markdown generates. We recommend checking the [Remark plugin](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) catalog first *before* considering rehype plugins, since most users want to transform their Markdown syntax instead. If HTML transforms are what you need, we encourage you to browse [awesome-rehype](https://github.com/rehypejs/awesome-rehype) for a full curated list of plugins!

We apply our own (non-overridable) [`collect-headings`](https://github.com/withastro/astro/blob/main/packages/integrations/mdx/src/rehype-collect-headings.ts) plugin. This applies IDs to all headings (i.e. `h1 -> h6`) in your MDX files to [link to headings via anchor tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page).

To apply additional rehype plugins, pass an array to the `rehypePlugins` option like so:

```js
// astro.config.mjs
import rehypeMinifyHtml from 'rehype-minify';

export default {
  integrations: [mdx({
    rehypePlugins: [rehypeMinifyHtml],
  })],
}
```

## Examples

*   The [Astro MDX example](https://github.com/withastro/astro/tree/latest/examples/with-mdx) shows how to use MDX files in your Astro project.

## Troubleshooting

For help, check out the `#support-threads` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Contributing

This package is maintained by Astro's Core team. You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: /en/guides/integrations-guide/

[astro-ui-frameworks]: /en/core-concepts/framework-components/

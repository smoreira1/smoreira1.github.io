---
layout: ~/layouts/MainLayout.astro
title: Styling & CSS
description: Learn how to style components with Astro.
i18nReady: true
setup: |
  import Since from '../../../components/Since.astro';
---

Astro was designed to make styling and writing CSS a breeze. Write your own CSS directly inside of an Astro component or import your favorite CSS library like [Tailwind][tailwind]. Advanced styling languages like [Sass][sass] and [Less][less] are also supported.

## Styling in Astro

Styling an Astro component is as easy as adding a `<style>` tag to your component or page template. When you place a `<style>` tag inside of an Astro component, Astro will detect the CSS and handle your styles for you, automatically.

```astro title="src/components/MyComponent.astro"
<style>
  h1 { color: red; }
</style>
```

### Scoped Styles

Astro `<style>` CSS rules are automatically **scoped by default**. Scoped styles are compiled behind-the-scenes to only apply to HTML written inside of that same component. The CSS that you write inside of an Astro component is automatically encapsulated inside of that component.

```astro del={2,5} ins={3,6} ins=":where(.astro-HHNQFKH6)"
<style>
  h1 { color: red; }
  h1:where(.astro-HHNQFKH6) { color: red; }

  .text { color: blue; }
  .text:where(.astro-HHNQFKH6) { color: blue; }
</style>
```

Scoped styles don't leak and won't impact the rest of your site. In Astro, it is okay to use low-specificity selectors like `h1 {}` or `p {}` because they will be compiled with scopes in the final output.

Scoped styles also won't apply to other Astro components contained inside of your template. If you need to style a child component, consider wrapping that component in a `<div>` (or other element) that you can then style.

The specificity of scoped styles is preserved, allowing them to work consistently alongside other CSS files or CSS libraries while still preserving the exclusive boundaries that prevent styles from applying outside the component.

#### Global Styles

While we recommend scoped styles for most components, you may eventually find a valid reason to write global, unscoped CSS. You can opt-out of automatic CSS scoping with the `<style is:global>` attribute.

```astro title="src/components/GlobalStyles.astro" "is:global"
<style is:global>
  /* Unscoped, delivered as-is to the browser.
     Applies to all <h1> tags on your site. */
  h1 { color: red; }
</style>
```

You can also mix global & scoped CSS rules together in the same `<style>` tag using the `:global()` selector. This becomes a powerful pattern for applying CSS styles to children of your component.

```astro title="src/components/MixedStyles.astro" ":global(h1)"
<style>
  /* Scoped to this component, only. */
  h1 { color: red; }
  /* Mixed: Applies to child `h1` elements only. */
  article :global(h1) {
    color: blue;
  }
</style>
<h1>Title</h1>
<article><slot /></article>
```

This is a great way to style things like blog posts, or documents with CMS-powered content where the contents live outside of Astro. But be careful: components whose appearance differs based on whether or not they have a certain parent component can become difficult to troubleshoot.

Scoped styles should be used as often as possible. Global styles should be used only as-needed.

### CSS Variables

<Since v="0.21.0" />

The Astro `<style>` can reference any CSS variables available on the page. You can also pass CSS variables directly from your component front matter using the `define:vars` directive.

```astro title="src/components/DefineVars.astro" /define:vars={{.*}}/ /var\\(.*\\)/
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
---
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
  }
</style>
<h1>Hello</h1>
```

📚 See our [directives reference](/en/reference/directives-reference/#definevars) page to learn more about `define:vars`.

## External Styles

There are two ways to resolve external global stylesheets: an ESM import for files located within your project source, and an absolute URL link for files in your `public/` directory, or hosted outside of your project.

📚 Read more about using [static assets](/en/guides/imports/) located in `public/` or `src/`.

### Import a local stylesheet

:::caution[Using an npm package?]
You may need to update your `astro.config` when importing from npm packages. See the ["import stylesheets from an npm package" section](#import-a-stylesheet-from-an-npm-package) below.
:::

You can import stylesheets in your Astro component front matter using ESM import syntax. CSS imports work like [any other ESM import in an Astro component](/en/core-concepts/astro-components/#the-component-script), which should be referenced as **relative to the component** and must be written at the **top** of your component script, with any other imports.

```astro title="src/pages/index.astro" {4}
---
// Astro will bundle and optimize this CSS for you automatically
// This also works for preprocessor files like .scss, .styl, etc.
import '../styles/utils.css';
---
<html><!-- Your page here --></html>
```

CSS `import` via ESM are supported inside of any JavaScript file, including JSX components like React & Preact.  This can be useful for writing granular, per-component styles for your React components.

### Import a stylesheet from an npm package

You may also need to load stylesheets from an external npm package. This is especially common for utilities like [Open Props](https://open-props.style/). If your package **recommends using a file extension** (i.e. `package-name/styles.css` instead of `package-name/styles`), this should work like any local stylesheet:

```astro {3}
---
// src/pages/random-page.astro
import 'package-name/styles.css';
---
<html><!-- Your page here --></html>
```

If your package **does _not_ suggest using a file extension** (i.e. `package-name/styles`), you'll need to update your Astro config first! 

Say you are importing a CSS file from `package-name` called `normalize` (with the file extension omitted). To ensure we can prerender your page correctly, add `package-name` to [the `vite.ssr.noExternal` array](https://vitejs.dev/config/#ssr-noexternal):

```js ins={7}
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['package-name'],
    }
  }
})
```

:::note
This is a [Vite-specific setting](https://vitejs.dev/config/#ssr-noexternal) that does _not_ relate to (or require) [Astro SSR](/en/guides/server-side-rendering/).
:::

Now, you are free to import `package-name/normalize`. This will be bundled and optimized by Astro like any other local stylesheet.


```astro {3}
---
// src/pages/random-page.astro
import 'package-name/normalize';
---
<html><!-- Your page here --></html>
```

### Load a static stylesheet via "link" tags

You can also use the `<link>` element to load a stylesheet on the page. This should be an absolute URL path to a CSS file located in your `/public` directory, or an URL to an external website. Relative `<link>` href values are not supported.

```astro title="src/pages/index.astro" {3,5}
<head>
  <!-- Local: /public/styles/global.css -->
  <link rel="stylesheet" href="/styles/global.css" />
  <!-- External -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-tomorrow.css" />
</head>
```

Because this approach uses the `public/` directory, it skips the normal CSS processing, bundling and optimizations that are provided by Astro. If you need these transformations, use the [Import a Stylesheet](#import-a-local-stylesheet) method above.


## CSS Integrations

Astro comes with support for adding popular CSS libraries, tools and frameworks to your project like [Tailwind][tailwind] and more!

📚 See the [Integrations Guide](/en/guides/integrations-guide/) for instructions on installing, importing and configuring these integrations.


## CSS Preprocessors

Astro supports CSS preprocessors such as [Sass][sass], [Stylus][stylus], and [Less][less] through [Vite][vite-preprocessors].

### Sass

 ```shell
 npm install -D sass
 ```

Use  `<style lang="scss">` or `<style lang="sass">` in `.astro` files

### Stylus

```shell
npm install -D stylus
```

Use `<style lang="styl">` or `<style lang="stylus">` in `.astro` files

### Less

```shell
npm install -D less
```

Use `<style lang="less">` in `.astro` files.

### In framework components

You can also use all of the above CSS preprocessors within JS frameworks as well! Be sure to follow the patterns each framework recommends:

- **React** / **Preact**: `import Styles from './styles.module.scss'`;
- **Vue**: `<style lang="scss">`
- **Svelte**: `<style lang="scss">`

## PostCSS

Astro comes with PostCSS included as part of [Vite](https://vitejs.dev/guide/features.html#postcss). To configure PostCSS for your project, create a `postcss.config.js` file in the project root. You can import plugins using `require()` after installing them (for example `npm i autoprefixer`).

```js title="postcss.config.js" ins={3-4}
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
  ],
};
```


## Frameworks and Libraries

### 📘 React / Preact

`.jsx` files support both global CSS and CSS Modules. To enable the latter, use the `.module.css` extension (or `.module.scss`/`.module.sass` if using Sass).

```jsx title="src/components/MyReactComponent.jsx" /[a-z]+(\\.module\\.css)/
import './global.css'; // include global CSS
import Styles from './styles.module.css'; // Use CSS Modules (must end in `.module.css`, `.module.scss`, or `.module.sass`!)
```

### 📗 Vue

Vue in Astro supports the same methods as `vue-loader` does:

- [vue-loader - Scoped CSS][vue-scoped]
- [vue-loader - CSS Modules][vue-css-modules]

### 📕 Svelte

Svelte in Astro also works exactly as expected: [Svelte Styling Docs][svelte-style].


## Advanced

:::caution
Be careful when bypassing Astro's built-in CSS bundling! Styles won't be automatically included in the built output, and it is your responsibility to make sure that the referenced file is properly included in the final page output.
:::

### `?raw` CSS Imports

For advanced use cases, CSS can be read directly from disk without being bundled or optimized by Astro. This can be useful when you need complete control over some snippet of CSS, and need to bypass Astro's automatic CSS handling.

This is not recommended for most users.

```astro title="src/components/RawInlineStyles.astro" "?raw"
---
// Advanced example! Not recommended for most users.
import rawStylesCSS from '../styles/main.css?raw';
---
<style is:inline set:html={rawStylesCSS}></style>
```

See [Vite's docs](https://vitejs.dev/guide/assets.html#importing-asset-as-url) for full details.
### `?url` CSS Imports

For advanced use cases, you can import a direct URL reference for a CSS file inside of your project `src/` directory. This can be useful when you need complete control over how a CSS file is loaded on the page. However, this will prevent the optimization of that CSS file with the rest of your page CSS .

This is not recommended for most users. Instead, place your CSS files inside of `public/` to get a consistent URL reference.

:::caution
Importing a smaller CSS file with `?url` may return the base64 encoded contents of the CSS file as a data URL in your final build. Either write your code to support encoded data URLs (`data:text/css;base64,...`) or set the [`vite.build.assetsInlineLimit`](https://vitejs.dev/config/#build-assetsinlinelimit) config option to `0`  to disable this feature.
:::

```astro title="src/components/RawStylesUrl.astro" "?url"
---
// Advanced example! Not recommended for most users.
import stylesUrl from '../styles/main.css?url';
---
<link rel="preload" href={stylesUrl} as="style">
<link rel="stylesheet" href={stylesUrl}>
```

See [Vite's docs](https://vitejs.dev/guide/assets.html#importing-asset-as-url) for full details.


[less]: https://lesscss.org/
[sass]: https://sass-lang.com/
[stylus]: https://stylus-lang.com/
[svelte-style]: https://svelte.dev/docs#component-format-style
[tailwind]: https://github.com/withastro/astro/tree/main/packages/integrations/tailwind
[vite-preprocessors]: https://vitejs.dev/guide/features.html#css-pre-processors
[vue-css-modules]: https://vue-loader.vuejs.org/guide/css-modules.html
[vue-scoped]: https://vue-loader.vuejs.org/guide/scoped-css.html

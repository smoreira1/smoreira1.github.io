---
layout: ~/layouts/MainLayout.astro
title: 样式 & CSS
description: 了解如何使用 Astro 组件样式。
setup: |
  import Since from '../../../components/Since.astro';
---

Astro 的设计为了使设计和编写 CSS 变得轻而易举。直接在 Astro 组件中编写你自己的 CSS，或者导入你最喜欢的 CSS 库，如 [Tailwind][tailwind] 外。也支持高级样式设计语言，如 [Sass][sass] 和 [Less][less]。

## 在 Astro 进行设计

为 Astro 组件设计样式，就像在你的组件或页面模板上添加 `<style>` 标签一样容易。当你在 Astro 组件内置了 `<style>` 标签时，Astro 就会自动检测 CSS 并开始为你处理样式。

```astro
<style>
  h1 { color: red; }
</style>
```

### 作用域样式

Astro `<style>` 标签内的 CSS 规则**默认自动限定范围**。作用域样式在幕后编译，只适用于写在同一组件内的 HTML。你在 Astro 组件中编写的 CSS 会自动封装在该组件中。

```diff
<style>
-  h1 { color: red; }
+  h1.astro-HHNQFKH6 { color: red; }
-  .text { color: blue; }
+  .text.astro-HHNQFKH6 { color: blue; }
</style>
```

作用域样式不会泄漏，也不会影响你网站的其他部分。在 Astro 中，可以使用像 `h1 {}` 或 `p {}` 这样的低特定性选择器，因为在最终输出中它们与作用域一起被编译。

作用域样式也不适用于模板内的其他 Astro 组件。如果你需要修改子组件的样式，可以考虑将该组件包裹在 `<div>`（或其他元素）中，然后你就可以对其编写样式了。

#### 全局样式

虽然我们推荐大多数组件使用范围化的样式，但有时你可能有必要使用全局的、非限定范围的 CSS。你可以通过 `<style is:global>` 属性选择不自动限定 CSS 范围。

```html
<style is:global>
  /* 无范围，按原样传递给浏览器。
     适用于网站上的所有 <h1> 标签 */
  h1 { color: red; }
</style>
```

你也可以使用 `:global()` 选择器在同一个 `<style>` 标签中混合全局和作用域 CSS 规则。这可以将 CSS 样式应用于子组件。

```astro
<style>
  /* 仅适用于作用域 */
  h1 { color: red; }
  /* 混合，仅适用于子 `h1` 元素 */
  article :global(h1) {
    color: blue;
  }
</style>
<h1>Title</h1>
<article><slot /></article>
```

它适合用于像博客文章，或由 CMS 驱动的内容文档，这些内容在 Astro 之外的样式。但要注意会因为某个父级组件有无而导致样式不同会使得很难进行错误排查。

应尽可能多的使用作用域样式，而仅在必要时使用全局样式。

### CSS 变量

<Since v="0.21.0" />

Astro `<style>` 可以引用页面上任何可用的 CSS 变量。你也可以使用 `define:vars` 指令直接通过组件传递 CSS 变量。

```astro
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

参见[指令参考](/zh-cn/reference/directives-reference/#definevars)页面，了解更多关于 `define:vars` 的信息。

## 外部样式

有两种使用外部全局样式表的方法：项目源文件中使用 ESM 导入；使用绝对链接引用 `public/` 目录中的文件或托管于别处的文件。

📚 阅读更多关于使用位于 `public/` 或 `src/` 的[静态资源](/zh-cn/guides/imports/)。

### 导入本地样式表

:::caution[使用 npm 包？]
想要导入 npm 包，你可能需要更新 `astro.config` 文件。参见下面的[“从 npm 包中导入样式表”部分](#从-npm-包中导入样式表)。
:::

你可以在 Astro 组件中使用 ESM 导入语法显式导入样式表。CSS 导入方式与 [Astro 组件中的其他 ESM 导入](/zh-cn/core-concepts/astro-components/#组件-script)一样，它应该**基于组件**进行引用，并且与其他导入一样必须位于组件脚本**顶层**：

```astro
---
// Astro 会自动为你捆绑和优化这些CSS。
// 这也适用于预处理器文件，如 .scss、.styl 等。
import '../styles/utils.css';
---
<html><!-- Your page here --></html>
```

任何 JavaScript 文件都支持通过 ESM `import`导入  CSS，包括像 React 和 Preact 这样的 JSX 组件。这有助于为 React 组件编写细化的，具有针对性的样式

### 从 npm 包中导入样式表

你也可能需要从外部 npm 包中加载样式表。它常用于像导入 [Open Props](https://open-props.style/) 这样的工具类。如果你的包**建议使用文件扩展名**（即 `package-name/styles.css` 而不是 `package-name/styles`），那么它的行为应该与本地样式表一致：

```astro
---
// src/pages/random-page.astro
import 'package-name/styles.css';
---
<html><!-- Your page here --></html>
```

如果你所用的包**不建议使用文件扩展名**（即 `包名/样式`），那么你就需要先更新 Astro 配置 

假设你从 `package-name` 导入名为 `normalize` 的 CSS 文件（省略文件扩展名）。为了确保我们能正确地预渲染你的页面，需要把`package-name` 添加到 [`vite.ssr.noExternal` 数组](https://vitejs.dev/config/#ssr-noexternal)中。

```js
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
这是[针对 Vite 的设置](https://vitejs.dev/config/#ssr-noexternal) 与 [Astro SSR](/zh-cn/guides/server-side-rendering/) 无关。
:::

现在，你可以导入 `package-name/normalize` 了。Astro 将对其进行捆绑和优化，就像任何其他本地样式表一样。


```astro
---
// src/pages/random-page.astro
import 'package-name/normalize';
---
<html><!-- Your page here --></html>
```

### 通过 `link` 标签加载静态样式表

你也可以使用 `<link>` 元素在页面上加载样式表。它是应该位于 `/public` 目录下的 CSS 文件的绝对路径，或者是外部网站的链接。不支持使用相对路径的 `<link>` href 值。

```html
<head>
  <!-- 本地：/public/styles/global.css -->
  <link rel="stylesheet" href="/styles/global.css" />
  <!-- 外部 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-tomorrow.css">
</head>
```

因为这种方法使用 `public/` 目录，它跳过了 Astro 提供的 CSS 处理、捆绑和压缩。如果你需要这些转换，请使用上面的[导入样式表](#导入本地样式表)方法。


## CSS 集成

Astro 支持在项目中添加流行的 CSS 库、工具和框架，如 [Tailwind][tailwind] 和其他库!

📚 参见[集成指南](/zh-cn/guides/integrations-guide/)，了解安装、导入和配置这些集成的说明。

## CSS 预处理器

Astro 支持通过 [Vite][vite-preprocessors] 使用 CSS 预处理器，如 [Sass][sass]、[Stylus][stylus] 和 [Less][less]，。

### Sass

 ```
 npm install -D sass
 ```

在 `.astro` 文件中使用 `<style lang="scss">` 或 `<style lang="sass">`。

### Stylus

```
npm install -D stylus
```

在 `.astro` 文件中使用 `<style lang="styl">` 或 `<style lang="stylus">`。

### Less

```
npm install -D less
```

在`.astro` 文件中使用 `<style lang="less">`。

### 在框架组件中

你也可以在 JS 框架内使用上述所有的 CSS 预处理程序! 请务必遵循每个框架推荐的模式。

- **React** / **Preact**: `import Styles from './styles.module.scss'`;
- **Vue**: `<style lang="scss">`
- **Svelte**: `<style lang="scss">`

## PostCSS

Astro 内置了 PostCSS，作为 [Vite](https://vitejs.dev/guide/features.html#postcss) 的一部分。要为你的项目配置 PostCSS，在项目根部创建 `postcss.config.js` 文件。然后你就你可以在安装插件后使用 `require()` 导入插件（例如 `npm i autoprefixer`）。

```js
// ./postcss.config.js

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
  ],
};
```

---

## 框架和库

### 📘 React / Preact

`.jsx` 文件同时支持全局 CSS 和 CSS 模块。要启用后者，请使用 `.module.css` 扩展名（如果使用 Sass 则是 `.module.scss`/`.module.sass` ）。

```js
import './global.css'; //包括全局CSS
import Styles from './styles.module.css'; // 使用 CSS 模块（必须以 `.module.css`、`.module.scss` 或 `.module.sass` 结尾！)
```

### 📗 Vue

Astro 中的 Vue 支持与 `vue-loader` 一样的方法。

- [vue-loader - Scoped CSS][vue-scoped]
- [vue-loader - CSS Modules][vue-css-modules]

### 📕 Svelte

Astro 中的 Svelte 也完全按照预期工作。[Svelte Styling Docs][svelte-style]。


## 高级

:::caution
绕过 Astro 内置的 CSS 捆绑时要小心！样式不会自动包含在内置的输出中。样式不会自动包含在构建的输出中，你有责任确保引用的文件被正确地包含在最终的页面输出中。
:::

### 导入 `?raw` CSS

对于高级用例，CSS 可以直接从磁盘上读取，而 Astro 不进行捆绑或压缩。当你需要完全控制某些 CSS 片段，并需要绕过 Astro 的自动 CSS 处理时，这可能有用的。

对于大多数用户来说，不建议这样做：

```astro
---
// 高级用例! 不建议大多数用户使用
import rawStylesCSS from '../styles/main.css?raw';
---
<style is:inline set:html={rawStylesCSS}></style>
```

完整的细节见[Vite的文档](https://vitejs.dev/guide/assets.html#importing-asset-as-url)。

### 导入 `?url` CSS

一个高级用例，你可以在你的项目 `src/` 目录中直接导入 CSS 文件链接。当你需要完全控制 CSS 文件在页面上的加载方式时可能有用。然而，这将阻止该 CSS 文件和你的页面上的其他 CSS 进行优化。

对于大多数用户来说，不建议这样做。相反，将 CSS 文件放在 `public/` 内，你可以获得一致的链接。

:::caution
用 `?url` 导入较小的 CSS 文件，可能会在最终构建时将 CSS 文件的 base64 编码内容作为数据链接返回值。你可以编写代码以支持经编码的数据链接（`data:text/css;base64,...`），或者将 [`vite.build.assetsInlineLimit`](https://vitejs.dev/config/#build-assetsinlinelimit) 配置选项设为 `0` 以禁用这一功能。
:::

```astro
---
// 高级用例! 不建议大多数用户使用
import stylesUrl from '../styles/main.css?url';
---
<link rel="preload" href={stylesUrl} as="style">
<link rel="stylesheet" href={stylesUrl}>
```

完整的细节见 [Vite 文档](https://vitejs.dev/guide/assets.html#importing-asset-as-url)。


[less]: https://lesscss.org/
[sass]: https://sass-lang.com/
[stylus]: https://stylus-lang.com/
[svelte-style]: https://svelte.dev/docs#component-format-style
[tailwind]: https://github.com/withastro/astro/tree/main/packages/integrations/tailwind
[vite-preprocessors]: https://vitejs.dev/guide/features.html#css-pre-processors
[vue-css-modules]: https://vue-loader.vuejs.org/guide/css-modules.html
[vue-scoped]: https://vue-loader.vuejs.org/guide/scoped-css.html

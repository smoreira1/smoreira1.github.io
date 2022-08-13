---
layout: ~/layouts/MainLayout.astro
title: 設定方法
i18nReady: true
setup: |
  import Since from '../../../components/Since.astro';
---

次のリファレンスは Astro でサポートされているすべての設定項目をカバーしています。Astro の設定についてもっと知りたい場合は、[Astro の設定](/ja/guides/configuring-astro/)の解説をご覧ください。

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  // 設定項目をこちらに記載
})
```
## トップレベルのオプション

### root

<p>

**データ型:** `string`<br>
**CLI:** `--root`<br>
**デフォルト値:** `"."` (現在の作業ディレクトリ)
</p>

このオプションはプロジェクトルートのディレクトリ以外のディレクトリで `astro` の CLI コマンドを実行するときのみに指定する必要があります。Astro は設定ファイルを見つける前にプロジェクトルートを知る必要があるため、通常このオプションは [Astro の設定ファイル](/ja/guides/configuring-astro/#サポートされている設定ファイルの種類)のかわりに CLI 経由で指定されます。

もし相対パスを渡した場合 (例: `--root: './my-project'`) 、Astro は現在の作業ディレクトリに対して相対パスを解決します。

#### 例

```js
{
  root: './my-project-directory'
}
```

```bash
$ astro build --root ./my-project-directory
```


### srcDir

<p>

**データ型:** `string`<br>
**デフォルト値:** `"./src"`
</p>

Astro がサイトを読み込むディレクトリを設定します。

この値はファイルシステムの絶対パスかプロジェクトルートからの相対パスのどちらかで設定されます。

```js
{
  srcDir: './www'
}
```


### publicDir

<p>

**データ型:** `string`<br>
**デフォルト値:** `"./public"`
</p>

静的アセットを置くディレクトリを設定します。このディレクトリのファイルは開発環境では `/` で配信され、ビルド時にはビルド用のディレクトリにコピーされます。これらのファイルは変換、バンドルされることはなく、常にそのままの状態で配信、コピーされます。

この値はファイルシステムの絶対パスかプロジェクトルートからの相対パスのどちらかで設定されます。

```js
{
  publicDir: './my-custom-publicDir-directory'
}
```


### outDir

<p>

**データ型:** `string`<br>
**デフォルト値:** `"./dist"`
</p>

`astro build` コマンドが最終的にビルドした成果物を出力するディレクトリを設定します。

この値はファイルシステムの絶対パスかプロジェクトルートからの相対パスのどちらかで設定されます。

```js
{
  outDir: './my-custom-build-directory'
}
```


### site

<p>

**データ型:** `string`
</p>

最終的にデプロイされた URL です。Astro は最後のビルドでサイトマップと canonical タグの URL を生成するためにこの完全な URL を使用します。Astro を最大限活用するためにこちらを設定することを強く推奨します。

```js
{
  site: 'https://www.my-site.dev'
}
```


### base

<p>

**データ型:** `string`
</p>

デプロイするベースのパスです。開発体験をビルド環境とできるだけ近づけるために Astro はこのパス名を一致させます。以下の例では、`astro dev` コマンドは `/docs` でサーバーを起動します。

```js
{
  base: '/docs'
}
```


### trailingSlash

<p>

**データ型:** `'always' | 'never' | 'ignore'`<br>
**デフォルト値:** `'ignore'`
</p>

開発サーバーのルーティングを合わせる動作の設定をします。次のオプションから選択してください。
  - `'always'` - 末尾にスラッシュを含むURLにのみマッチする (例: "/foo/")
  - `'never'` - 末尾にスラッシュを含むURLにはマッチしない (ex: "/foo")
  - `'ignore'` - URL の末尾に "/" があるかどうかに関係なく一致する

本番用ホストが末尾のスラッシュどのように機能するか、機能しないかについて厳格な取り扱いをしている場合、この設定項目を使用してください。

末尾のスラッシュを含む、または含まない URL が開発時に動作させないようにより厳格にしたい場合はこのオプションを設定することもできます。

```js
{
  // 例: 開発時に末尾のスラッシュを必須にするdevelopment
  trailingSlash: 'always'
}
```
**こちらもご覧ください:**
- buildOptions.pageUrlFormat


## ビルドのオプション

### build.format

<p>

**データ型:** `('file' | 'directory')`<br>
**デフォルト値:** `'directory'`
</p>

それぞれのページの出力ファイルの形式を取り扱います。
  - 'file' が指定された場合、Astro はそれぞれのページで HTML ファイルを生成します。 (例: "/foo.html")
  - 'directory' が指定された場合、Astro はそれぞれのページでネストされた `index.html` ファイル (例: "/foo/index.html") があるディレクトリを生成します。

```js
{
  build: {
    // 例: ビルドの間に `page/index.html` のかわりに `page.html` を生成します。
    format: 'file'
  }
}
```


## サーバーのオプション


`astro dev` と `astro preview` の両方で使用される、Astro の開発サーバーをカスタマイズします。

```js
{
  server: { port: 1234, host: true }
}
```

実行するコマンド ("dev", "preview") に応じて異なる設定をするために、この設定項目に関数も渡すことができます。

```js
{
  // 例: コマンドに応じてカスタマイズするためには関数の構文を使用します
  server: (command) => ({ port: command === 'dev' ? 3000 : 4000 })
}
```

### server.host

<p>

**データ型:** `string | boolean`<br>
**デフォルト値:** `false`<br>
<Since v="0.24.0" />
</p>

どのネットワーク IP アドレスでサーバーがリッスンするか設定します。(例: localhost ではない IP)
- `false` - ネットワーク IP アドレスを公開しない
- `true` - LAN やパブリックなアドレスを含むすべてのアドレスでリッスンする
- `[custom-address]` - `[custom-address]` (例: `192.168.0.1`) のネットワーク IP アドレスを公開する

### server.port

<p>

**データ型:** `number`<br>
**デフォルト値:** `3000`
</p>

ポートがリッスンするポートを設定する。

設定されたポートが使用されていた場合、Astro は自動的に次の利用可能なポート番号を試みます。

```js
{
  server: { port: 8080 }
}
```


## マークダウンのオプション

### markdown.drafts

<p>

**データ型:** `boolean`<br>
**デフォルト値:** `false`
</p>

マークダウンのドラフトページがビルドに含まれるかを制御します。

マークダウンページが front-matter に `draft: true` を含む場合、ドラフトとみなされます。ドラフトページは開発環境 (`astro dev`) では常に含まれ、閲覧できますが、デフォルトでは最終的なビルドに含まれません。

```js
{
  markdown: {
    // 例: 最終的なビルドにドラフトをすべて含む
    drafts: true,
  }
}
```


### markdown.shikiConfig

<p>

**データ型:** `Partial<ShikiConfig>`
</p>

Shiki の設定項目です。使い方は[マークダウンの設定のドキュメント](/ja/guides/markdown-content/#shikiの設定)をご覧ください。


### markdown.syntaxHighlight

<p>

**データ型:** `'shiki' | 'prism' | false`<br>
**デフォルト値:** `shiki`
</p>

もしあれば、使用するシンタックスハイライトを設定します。
- `shiki` - [Shiki](https://github.com/shikijs/shiki) のハイライトを使用します
- `prism` - [Prism](https://prismjs.com/) のハイライトを使用します
- `false` - シンタックスハイライトを使用しません

```js
{
  markdown: {
    // 例: マークダウンで prism のシンタックスハイライトを使用するよう変更する
    syntaxHighlight: 'prism',
  }
}
```


### markdown.remarkPlugins

<p>

**データ型:** `RemarkPlugins`
</p>

どのようにマークダウンがビルドされるかをカスタマイズするために [Remark](https://github.com/remarkjs/remark) のプラグインを渡します。

**注意:** カスタムの `remarkPlugins` または `rehypePlugins` を有効にすると、Astro の [GitHub-flavored Markdown](https://github.github.com/gfm/) と [Smartypants](https://github.com/silvenon/remark-smartypants) のビルトインサポートが無効になります。必要であれば、これらのプラグインを `astro.config.mjs` ファイルに明示的に追加する必要があります。

```js
{
  markdown: {
    // 例: Astro で使用されるデフォルトの remark のプラグイン
    remarkPlugins: ['remark-gfm', 'remark-smartypants'],
  },
};
```


### markdown.rehypePlugins

<p>

**データ型:** `RehypePlugins`
</p>

どのようにマークダウンがビルドされるかをカスタマイズするために [Rehype](https://github.com/remarkjs/remark-rehype) のプラグインを渡します。

**注意:** カスタムの `remarkPlugins` または `rehypePlugins` を有効にすると、Astro の [GitHub-flavored Markdown](https://github.github.com/gfm/) と [Smartypants](https://github.com/silvenon/remark-smartypants) のビルトインサポートが無効になります。必要であれば、これらのプラグインを `astro.config.mjs` ファイルに明示的に追加する必要があります。

```js
{
  markdown: {
    // 例: Astro で使用されるデフォルトの rehype のプラグイン
    rehypePlugins: [],
  },
};
```


## アダブター

ビルドアダプタを使用して、お好きなサーバー、サーバーレス、エッジのホストにデプロイできます。[Netlify](/ja/guides/deploy/netlify/#adapter-for-ssredge) や [Vercel](/ja/guides/deploy/vercel/#adapter-for-ssr) などのファーストパーティーのアダプターを Astro の SSRにインポートしてください。

SSR についてより詳しく知りたい場合は[サーバーサイドレンダリングのガイド](/ja/guides/server-side-rendering/)を、ホストの完全な一覧は[デプロイのガイド](/ja/guides/deploy/)をご覧ください。

```js
import netlify from '@astrojs/netlify/functions';
{
  // 例: Netlify のサーバーレスのデプロイのためのビルド
  adapter: netlify(),
}
```


## インテグレーション

カスタムインテグレーションで Astro を拡張します。インテグレーションは、フレームワークのサポート (Solid.js など) 、新機能 (サイトマップなど) 、新しいライブラリ(Partytown や Turbolinks など) を追加するためのワンストップ・ショップです。

Astro のインテグレーションを使い始めるためには[インテグレーションガイド](/ja/guides/integrations-guide/)をご覧ください。

```js
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
{
  // 例: Astro に React と Tailwind のサポートを追加
  integrations: [react(), tailwind()]
}
```

## Vite

Vite に追加の設定項目を渡します。Astro が必要な高度な設定をサポートしていない場合に有用です。

`vite` に設定するオブジェクトの完全なドキュメントは [vitejs.dev](https://vitejs.dev/config/) でご覧になれます。

#### 例

```js
{
  vite: {
    ssr: {
      // 例: 必要な場合、壊れたパッケージが SSR の処理を行うのをスキップさせます
      external: ['broken-npm-package'],
    }
  }
}
```

```js
{
  vite: {
    // 例: Astro プロジェクトに直接カスタムの vite プラグインを追加する
    plugins: [myPlugin()],
  }
}
```

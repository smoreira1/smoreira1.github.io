---
layout: ~/layouts/MainLayout.astro
title: ルーティング
description: Astroのルーティングの紹介
i18nReady: true
---

Astroは**ファイルベースルーティング**を採用しているため、プロジェクトの`src/pages/`ディレクトリのファイルレイアウトを元にビルドURLを生成します。プロジェクトの `src/pages` ディレクトリにファイルが追加されると、そのファイル名に基づいて自動的にルーティングされます。


## 静的ルーティング

`src/pages`ディレクトリにある、Astroコンポーネント（`.astro`）とMarkdownファイル（`.md`）は**自動的にウェブサイトのページとなります**。各ページのルーティングは、`src/pages`ディレクトリ内のパスとファイル名に対応しています。

```bash
# 例: 静的ルーティング
src/pages/index.astro        -> mysite.com/
src/pages/about.astro        -> mysite.com/about
src/pages/about/index.astro  -> mysite.com/about
src/pages/about/me.astro     -> mysite.com/about/me
src/pages/posts/1.md         -> mysite.com/posts/1
```

:::tip
Astroのプロジェクトでは、別途「ルーティング設定」を管理する必要はありません。静的ページは、`/src/pages/` ディレクトリにファイルを配置することで作成されます。
:::


## 動的ルーティング

1つのAstroページコンポーネントは、ファイル名に動的ルーティングパラメーターを指定して、指定した条件に合致する複数のルーティングを生成することもできます。著者ページやブログタグごとのページなど、複数の関連ページを一度に作成できます。名前付きパラメーターでは、これらのルーティングパスの「名前付き」レベルの値を指定でき、レストパラメーターでは、より柔軟な「キャッチオール」ルーティングを指定できます。

:::note
動的に作成されたページやルーティングも、ビルド時に生成されます。
:::

動的ルーティングを作成するAstroページは、以下のようにしなければなりません。

1. `[ブラケット]`記法を用いて、動的なパラメーターを識別する。

2. `getStaticPaths()`関数をエクスポートして、Astroでプリレンダリングされるパスを正確に指定します。

### 名前付きパラメーター

以下のように `getStaticPaths()` 関数に使用する値を指定することで、`[名前付き]`パラメーターを持つルーティングを生成できます。

```astro
---
// src/pages/dogs/[dog].astro

export function getStaticPaths() {
  return [
    // 生成対象: /dogs/clifford
    {params: {dog: 'clifford'}},
    // 生成対象: /dogs/rover
    {params: {dog: 'rover'}},
    // 生成対象: /dogs/spot
    {params: {dog: 'spot'}},
  ];
}
---
```

📚 [`getStaticPaths()`](/ja/reference/api-reference/#getstaticpaths) についてはこちらを参照してください。

ルーティングは、ファイルパスのどのレベルでも、複数の名前付きパラメーターから生成できます。

- `pages/blog/[slug].astro` → （`/blog/hello-world`、`/blog/post-2`など）
- `pages/[username]/settings.astro` → （`/fred/settings`、`/drew/settings`など）
- `pages/[lang]-[version]/info.astro` → （`/en-v1/info`、`/fr-v2/info`など）

#### `Astro.params` オブジェクト

動的にルーティングを生成するAstroコンポーネントは、各ルーティングに対して `Astro.params` オブジェクトを利用できます。これにより、コンポーネントスクリプトやテンプレートの中で、URLのこれらの生成された部分を使用できます。

```astro
---
// 例: src/pages/posts/[id].astro
const { id } = Astro.params;
---
<p>投稿: { id }</p>


// ルーティング `/post/abc` に渡されるAstro.paramsオブジェクト
{ "id": "abc" }
```

複数の動的ルーティングセグメントを組み合わせて、同じように動作させることができます。

```astro
---
// 例: src/pages/post/[id]/[comment].astro
const { id, comment } = Astro.params;
---

// ルーティング `/post/abc/a-comment` に渡されるAstro.paramsオブジェクト
{ "id": "abc", "comment": "a-comment" }
```

### レストパラメーター

URLルーティングに柔軟性が必要な場合は、`.Astro`ファイル名にレストパラメーターを使用します。これは、ブラケット内に3つのドット（`...`）を追加して、深さに関係なく、ファイルパスをすべて受け取れます。

たとえば、以下のようになります。

- `pages/post/[...slug].astro` → (`/post/a`, `/post/a/b`, `/post/a/b/c`, etc.)

マッチしたパラメーターは、クエリーパラメーター（例では `slug`）としてページに渡されます。

```json
// ルーティング `/post/a/b/c` に渡されるAstro.paramsオブジェクト
{ "slug": "a/b/c" }
```

:::tip
レストパラメーターはデフォルトではオプションなので、`pages/post/[...slug].astro` は `/post/` にもマッチする可能性があります。
:::

#### 例：レストパラメーター

実際の例として、GitHubのファイルビューアーを以下の名前付きパラメーターとレストパラメーターで実装してみましょう。

```
/[org]/[repo]/tree/[branch]/[...file]
```

この例では、 `/withastro/astro/tree/main/docs/public/favicon.svg` をリクエストすると、以下のパラメーターがページで利用できるようになります。

```js
{
	org: 'withastro',
	repo: 'astro',
	branch: 'main',
	file: 'docs/public/favicon.svg'
}
```


## ルーティングの優先順位

複数のルーティングが同じURLのパスにマッチすることがあります。たとえば、以下の各ルーティングは `/posts/create` にマッチします。

```
└── pages/
│       ├── posts/
│       │   ├── create.astro
│       │   ├── [pid].astro
│       │   └── [...slug].astro

```

Astroは、ページを構築するためにどのルーティングを使用すべきかを知る必要があります。そのために、以下のルールにしたがってソートします。

- パスパラメーターを持たない静的ルーティングは、他のすべてのルーティングよりも優先
- 名前付きパラメーターを使用する動的ルーティングは、レストパラメーターよりも優先
- レストパラメーターはもっとも低い優先度
- 同順位はアルファベット順に解決される

上記の例で、要求されたURLとHTMLを構築するために使用されるルーティングがどのようにマッチングされるかの例をいくつか挙げてみましょう。

- `pages/posts/create.Astro` - `/posts/create`をビルドします。
- `pages/posts/[pid].astro` - `/posts/1`, `/posts/abc` などをビルドします。しかし、`/posts/create`はビルドされません。
- `pages/posts/[...slug].Astro` - `/posts/1/2`, `/posts/a/b/c` などをビルドする。しかし、 `/posts/create`, `/posts/1`, `/posts/abc` はビルドされません。

## ページ分割

Astroは、複数のページに分割する必要がある大規模なデータコレクションのために、ビルトインのページ分割をサポートしています。Astroは、前ページ/次ページのURL、総ページ数など、一般的なページネーションプロパティを生成します。

ページ分割されたルーティング名には、標準的な動的ルーティングと同じ `[ブラケット]` 構文を使用する必要があります。たとえば、ファイル名 `/astronauts/[page].astro` は `/astronauts/1`, `/astronauts/2` などのルーティングを生成し、 `[page]` は生成されるページ番号となります。

`paginate()` 関数を使用すると、次のように値の配列に対してこれらのページを生成できます。

```astro
---
// 例: /src/pages/astronauts/[page].astro
export async function getStaticPaths({ paginate }) {
  const astronautPages = [{
    astronaut: 'ニール・アームストロング',
  }, {
    astronaut: 'バズ・オルドリン',
  }, {
    astronaut: 'サリー・ライド',
  }, {
    astronaut: 'ジョン・グレン',
  }];
  // 宇宙飛行士の配列から、1ページに2人づつ入るようにページを生成する
  return paginate(astronautPages, { pageSize: 2 });
}
// ページ分割されたデータは、すべて "page" プロパティとして渡される
const { page } = Astro.props;
---

<!--現在のページ番号を表示します。Astro.params.pageも使用可能です！-->
<h1>{page.currentPage}ページ</h1>
<ul>
  <!--宇宙飛行士情報の配列を列挙する-->
  {page.data.map(({ astronaut }) => <li>{astronaut}</li>)}
</ul>
```

これで、1ページに2つのアイテムが配置された、以下のようなページが生成されます。
- `/astronauts/1` - 1ページ目: "ニール・アームストロング" と "バズ・オルドリン" を表示
- `/astronauts/2` - 2ページ目: "サリー・ライド" と "ジョン・グレン" を表示


### `page` プロパティ

`paginate()` 関数を使用すると、各ページのデータは `page` プロパティで渡されます。page` プロパティは多くの便利なプロパティを持っていますが、ここではそのハイライトを紹介します。
- **page.data** - `paginate()`関数に渡された、ページのスライスデータを含む配列です。
- **page.url.next** - セット内の次のページへのリンクです。
- **page.url.prev** - セット内の前のページへのリンクです。

```astro
---
// 例: /src/pages/astronauts/[page].astro
// 前の例と同じように、{ astronaut } オブジェクトのリストをページ分割します。
export async function getStaticPaths({ paginate }) { /* ... */ }
const { page } = Astro.props;
---
<h1>{page.currentPage}ページ</h1>
<ul>
  {page.data.map(({ astronaut }) => <li>{astronaut}</li>)}
</ul>
{page.url.prev ? <a href={page.url.prev}>Previous</a> : null}
{page.url.next ? <a href={page.url.next}>Next</a> : null}
```


#### 完全なAPIリファレンス

```ts
interface Page<T = any> {
	/** 結果 */
	data: T[];
	/** メタデータ */
	/** 0から始まるページ上の最初のアイテムのカウント */
	start: number;
	/** 0から始まるページ上の最後のアイテムの数 */
	end: number;
	/** 結果の総数 */
	total: number;
	/** 1から始まる現在のページ番号 */
	currentPage: number;
	/** 1ページあたりのアイテム数（デフォルト：25） */
	size: number;
	/** 最終ページ数 */
	lastPage: number;
	url: {
		/** 現在のページのURL */
		current: string;
		/** 前のページのURL（もしあれば） */
		prev: string | undefined;
		/** 次のページのURL（もしあれば） */
		next: string | undefined;
	};
}
```

## ネストされたページ分割

ページ分割のより高度なユースケースは**ネストされたページ分割**です。これは、ページ分割を他の動的ルーティングパラメーターと組み合わせた場合です。ネストされたページ分割を使用すると、ページ分割されたコレクションを何らかのプロパティやタグでグループ化できます。

たとえば、ページ分割されたMarkdownの投稿を何らかのタグでグループ化したい場合、以下のURLにマッチする `/src/pages/[tag]/[page].Astro` ページを作成することでネストされたページングを使用することになります。

- `/red/1` (tag=red)
- `/red/2` (tag=red)
- `/blue/1` (tag=blue)
- `/green/1` (tag=green)

ネストされたページ分割は、 `getStaticPaths()` から `paginate()` の結果を、グループ化ごとに配列として返すことで動作します。

この例では、上記のURLを作成するために、ネストされたページ送りを実装します。

```astro
---
// 例: /src/pages/[tag]/[page].astro
export function getStaticPaths({paginate}) {
  const allTags = ['red', 'blue', 'green'];
  const allPosts = await Astro.glob('../../posts/*.md');
  // すべてのタグに対して、paginate() の結果を返す。
  // 必ず、`{params: {tag}} を `paginate()` に渡してください。
  // そうすれば、Astroは結果がどのタググループに対するものか分かります。
  return allTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) => post.frontmatter.tag === tag);
    return paginate(filteredPosts, {
      params: { tag },
      pageSize: 10
    });
  });
}
const { page } = Astro.props;
const params = Astro.params;
```

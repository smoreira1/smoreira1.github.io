---
layout: ~/layouts/MainLayout.astro
title: Astroコンポーネント
description: Astroコンポーネント構文の紹介です。
i18nReady: true
---

**Astroコンポーネント**は、あらゆるAstroプロジェクトの基本的な構成要素です。クライアントサイドのランタイムを持たない、HTMLのみのテンプレートコンポーネントです。

**HTMLをご存知の方なら、すでに最初のAstroコンポーネントを書くのに十分な知識を持っています。**

Astroコンポーネントの構文は、HTMLのスーパーセットです。この構文は、[HTMLやJSXを書いたことのある人なら誰でも親しみやすいように設計されています](#astroとjsxの違い)。また、コンポーネントとJavaScript式を含むためのサポートも追加されています。Astroコンポーネントは、ファイル拡張子が`.astro`なので、すぐ見分けられます。

Astroコンポーネントは非常に柔軟です。多くの場合、Astroコンポーネントは、ヘッダーやプロフィールカードのような、ページ上で**再利用可能なUI**を含むことになります。また、Astroコンポーネントには、SEO対策を容易にする一般的な`<meta>`タグのコレクションのような、小さなHTMLのスニペットが含まれることもあります。Astroコンポーネントは、ページ全体のレイアウトを含められます。

Astroコンポーネントについて知っておくべきもっとも重要なことは、**ビルド中にHTMLへ変換される**ことです。コンポーネントの内部でJavaScriptコードを実行しても、すべて事前に実行され、ユーザーに送られる最終ページからは取り除かれます。その結果、デフォルトでは、追加されるJavaScriptの痕跡のない、より高速なサイトが実現します。


## コンポーネント構造

Astroコンポーネントは、**コンポーネントスクリプト**と**コンポーネントテンプレート**という2つの主要な部分で構成されています。それぞれのパーツは異なる仕事を行いますが、この2つを組み合わせることで、使いやすさと、どんなものにも対応できる表現力を兼ね備えたフレームワークを提供することを目指しています。


```astro title="src/components/EmptyComponent.astro"
---
// コンポーネントスクリプト (JavaScript)
---
<!-- コンポーネントテンプレート (HTML + JS Expressions) -->
```

コンポーネントを他のコンポーネントの内部で使用し、より高度なUIを構築できます。たとえば、`Button`コンポーネントを使用して、`ButtonGroup`コンポーネントを作成すると、次のようになります。

```astro title="src/components/ButtonGroup.astro"
---
// 例: ButtonGroup.astro
import Button from './Button.astro';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

### コンポーネントスクリプト

Astroでは、Astroコンポーネント内のコンポーネントスクリプトを識別するためにコードフェンス（`---`）を使用します。Markdownを書いたことがある方なら、すでに*front-matter*という同様の概念に馴染みがあるかもしれません。Astroのコンポーネントスクリプトの考え方は、この概念から直接着想を得ています。

コンポーネントスクリプトを使用して、テンプレートをレンダリングするために必要なあらゆるJavaScriptコードを記述できます。

- 他のAstroコンポーネントのインポート
- 他のフレームワークコンポーネント（Reactなど）のインポート
- データ（JSONファイルなど）のインポート
- APIやデータベースからコンテンツを取得するコード
- テンプレートで参照する変数の作成

```astro title="src/components/MyComponent.astro"
---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// 渡されたコンポーネントのprops（`<X title="Hello, World" />`など）にアクセスする。
const {title} = Astro.props;
// 外部データを取得する（プライベートAPIやデータベースからでも可）
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- テンプレートはここに書きます -->
```

コードフェンスは、その中に書かれたJavaScriptが「守られる」ことを保証するために設計されています。フロントエンドのアプリケーションに漏れたり、ユーザーの手に渡ったりしません。高コストなコードや機密性の高いコード（プライベートなデータベースの呼び出しなど）が、ユーザーのブラウザに届くことを心配せずに、安全にコードを書けます。

:::tip
コンポーネントスクリプトの中には、TypeScriptも書けます！
:::

### コンポーネントテンプレート

コンポーネントスクリプトの下には、コンポーネントテンプレートがあります。コンポーネントテンプレートは、コンポーネントの出力するHTMLを決定します。

ここにプレーンなHTMLを書けば、そのコンポーネントはAstroのページでインポートされて使用される際にそのHTMLをレンダリングします。

ただし、Astroのコンポーネントテンプレート構文は、**JavaScript式**、**インポートしたコンポーネント**、[**特別なAstroディレクティブ**](/ja/reference/directives-reference/)もサポートしています。コンポーネントスクリプトで（ページ構築時に）定義されたデータと値は、コンポーネントテンプレートで使用され、動的に作成されたHTMLを生成できます。

```astro title="src/components/MyFavoritePokemon.astro"
---
// コンポーネントスクリプトはここに書きます
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- HTMLコメントに対応しています -->

<h1>Hello, world!</h1>

<!-- propsやコンポーネントスクリプトの変数を使用します。 -->
<p>好きなポケモンは: {Astro.props.title}</p>

<!-- `client:`ディレクティブで他のコンポーネントをハイドレートに含める -->
<ReactPokemonComponent client:visible />

<!-- JSXと同じように、HTMLとJavaScriptの式を混ぜる -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>

<!-- テンプレートディレクティブを使って、複数の文字列やオブジェクトからクラス名を作成する -->
<p class:list={["add", "dynamic", {classNames: true}]} />
```


## JSXに似た式

Astroコンポーネントのfront-matterコンポーネント・スクリプト内で、ローカルJavaScript変数を定義できます。また、JSXに似た式を使用して、これらの変数をコンポーネントのHTMLテンプレートに挿入できます。

### 変数

ローカル変数は、中括弧（`{}`）で囲んで使うことで、HTMLに追加できます。

```astro title="src/components/Variables.astro" "{name}"
---
const name = "Astro";
---
<div>
  <h1>Hello {name}!</h1>  <!-- 出力: <h1>Hello Astro!</h1> -->
</div>
```

### 動的な属性

ローカル変数は、中括弧で囲んで、HTML要素やコンポーネントに属性の値を渡せます。

```astro title="src/components/DynamicAttributes.astro" "{name}" "${name}"
---
const name = "Astro";
---
<h1 class={name}>属性式がサポートされています</h1>

<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

### 動的なHTML

ローカル変数は、JSXのような関数で使用でき、動的に生成されたHTML要素を生成できます。

```astro title="src/components/DynamicHtml.astro" "{item}"
---
const items = ["犬", "猫", "カモノハシ"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

:::tip
タグを動的に設定することもできます。

```astro "El"
---
// src/pages/index.astro
const El = 'div'
---
<El>こんにちは！</El> <!-- <div>こんにちは！</div> としてレンダリングされます -->
```
:::

### フラグメントと複数要素

Astroコンポーネントテンプレートは、JavaScriptやJSXとは異なり、すべてを1つの `<div>` や `<>` で囲む必要がなく、複数の要素をレンダリングできます。

```astro title="src/components/RootElements.astro"
---
// 複数の要素を含むテンプレート
---
<p>要素を1つの要素で包む必要はありません。</p>
<p>Astroはテンプレート内の複数のルート要素をサポートします。</p>
```

しかし、式を使用して複数の要素を動的に作成する場合は、JavaScriptやJSXと同様に、これらの要素を**フラグメント**で囲む必要があります。Astroでは、`<Fragment> </Fragment>` または省略形の `<> </>` のいずれかを使用できます。

```astro title="src/components/FragmentWrapper.astro" "<>" "</>"
---
const items = ["犬", "猫", "カモノハシ"];
---
<ul>
  {items.map((item) => (
    <>
      <li>赤い{item}</li>
      <li>青い{item}</li>
      <li>緑の{item}</li>
    </>
  ))}
</ul>
```

また、以下の例のように、[`set:*` ディレクティブ](/ja/reference/directives-reference/#sethtml)を追加する際に、ラッパー要素を避けるためにフラグメントが役に立つことかもしれません。

```astro title="src/components/SetHtml.astro" "Fragment"
---
const htmlString = '<p>Raw HTML content</p>';
---
<Fragment set:html={htmlString} />
```

### AstroとJSXの違い

Astroコンポーネントの構文は、HTMLのスーパーセットです。HTMLやJSXの経験がある人なら誰でも親しみやすいように設計されていますが、`.astro`ファイルとJSXの間には、いくつかの重要な違いがあります。

#### 属性

Astroでは、JSXで使用されている`camelCase`の代わりに、すべてのHTML属性に標準的な`kebab-case`フォーマットを使用します。これは、Reactでサポートされていない`class`に対しても有効です。

```jsx del={1} ins={2} title="example.astro"
<div className="box" dataValue="3" />
<div class="box" data-value="3" />
```

#### `<head>`を変更する

JSXでは、ページの`<head>`タグを管理するために、特別なライブラリが使用されているのを見かけます。Astroでは必要ありません。トップレベルのレイアウトに `<head>` とその中身を記述します。

#### コメント

JSXではJavaScript形式のコメントを使用しますが、Astroでは標準的なHTMLのコメントを使用できます。

```html title="example.astro"
<!-- .astroファイルではHTMLコメント構文が有効です -->
```

## コンポーネントのprops

Astroコンポーネントは、propsを定義し、受け取れます。propsは、HTMLをレンダリングするためにコンポーネントテンプレートで利用できます。propsは、front-matterスクリプトのグローバルな `Astro.props` で利用できます。

以下は、`greeting`と`name`のpropsを受け取るコンポーネントの例です。受け取るpropsは、グローバルな `Astro.props` オブジェクトから再構成されることに注意してください。

```astro "Astro.props"
---
// src/components/GreetingHeadline.astro
// 使い方: <GreetingHeadline greeting="Howdy" name="Partner" />
const { greeting, name } = Astro.props;
---
<h2>{greeting}、{name}！</h2>
```

このコンポーネントをインポートして、他のAstroコンポーネント、レイアウト、ページでレンダリングする場合、属性としてこれらのpropsを渡せます。

```astro /(\w+)=\S+/
---
// src/components/GreetingCard.astro
import GreetingHeadline from './GreetingHeadline.astro';
const name = "Astro"
---
<h1>グリーティングカード</h1>
<GreetingHeadline greeting="やぁ" name={name} />
<p>素敵な一日をお過ごしください！</p>
```

`Props`型のインターフェイスをエクスポートすることで、TypeScriptでpropsを定義できます。Astroはエクスポートされた`Props`インターフェイスを自動的に検出し、プロジェクトに対して型の警告やエラーを出します。propsは、`Astro.props`から再構成する際に、デフォルト値を与えることもできます。

```astro ins={3-6} ins="as Props"
---
// src/components/GreetingHeadline.astro
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = Astro.props as Props;
---
<h2>{greeting}, {name}!</h2>
```

コンポーネントのpropsは、何も提供されない場合に使用するデフォルト値を指定できます。

```astro ins="= \"こんにちは\"" ins="= \"宇宙飛行士\""
---
// src/components/GreetingHeadline.astro
 const { greeting = "こんにちは", name = "宇宙飛行士" } = Astro.props;
---
<h2>{greeting}、{name}！</h2>
```

## スロット

`<slot />` 要素は外部HTMLコンテンツのプレースホルダーで、他のファイルからコンポーネントテンプレートに子要素を注入（はめ込む＝スロット）できます。

デフォルトでは、コンポーネントに渡されたすべての子要素は、その `<slot />` 内でレンダリングされます。

:::note
Astroコンポーネントに渡される属性で、`Astro.props()`でコンポーネント全体から使用できる_props_とは異なり、_slot_は書かれた場所に子要素をレンダリングします。
:::

```astro "<slot />"
---
// src/components/Wrapper.astro
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { title } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- 子要素はここに入ります -->
  <Footer />
</div>
```

```astro {6-7}
---
// src/pages/fred.astro
import Wrapper from '../components/Wrapper.astro';
---
<Wrapper title="Fred's Page">
  <h2>フレッドについて</h2>
  <p>ここでは、フレッドについて紹介します。</p>
</Wrapper>
```

このパターンはAstroレイアウトコンポーネントの基本です。HTMLコンテンツのページ全体を「`<Layout></Layout>`」タグで囲んでレイアウトコンポーネントに送り、共通のページ要素の中にレンダリングさせられます。

### 名前付きスロット

Astroコンポーネントは、名前付きスロットも使えます。これを利用すると、対応するスロット名を持つHTML要素のみをスロットの場所に渡せます。

```astro /<slot .*?/>/
---
// src/components/Wrapper.astro
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { title } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header"/>  <!--  `slot="after-header"` 属性を持つ子要素はここに入ります。 -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!--  `slot`属性をもたない子要素、`slot="default"`属性を持つ子要素はここに入ります。 -->
  <Footer />
  <slot name="after-footer"/>  <!--  `slot="after-footer"` 属性を持つ子要素はここに入ります。 -->
</div>
```

```astro /slot=".*?"/
---
// src/pages/fred.astro
import Wrapper from '../components/Wrapper.astro';
---
<Wrapper title="フレッドのページ">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>フレッドについて</h2>
  <p>ここでは、フレッドについて紹介します。</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

子要素の `slot="my-slot"` 属性を使用して、コンポーネント内の `<slot name="my-slot" />` にマッチするプレースホルダに渡します。

:::tip
名前付きスロットは、[UIフレームワークコンポーネント](/ja/core-concepts/framework-components/)に渡すこともできます！
:::

### スロットのフォールバックコンテンツ

スロットは、**フォールバックコンテンツ**をレンダリングすることもできます。スロットに渡される子要素がない場合、 `<slot />` 要素はそれ自身のプレースホルダーの子要素をレンダリングします。

```astro {14}
---
// src/components/Wrapper.astro
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { title } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>これは、スロットに渡された子要素がない場合の代替コンテンツです。</p>
  </slot>
  <Footer />
</div>
```

## CSSスタイル

CSSの `<style>` タグも、コンポーネントテンプレートの内部でサポートされています。

これらのタグはコンポーネントのスタイル設定に使えます。すべてのスタイルルールはそのコンポーネントに自動的にスコープが作られ、大規模なアプリでのCSSのコンフリクトを防げます。

```astro title="src/components/StyledHeading.astro"
---
// コンポーネントスクリプトはここに書く
---
<style>
  /* コンポーネントでスコープが作られ、ページ上の他のh1要素には影響しません */
  h1 { color: red }
</style>

<h1>Hello, world!</h1>
```

:::caution
ここで定義されたスタイルは、そのコンポーネント自身のコンポーネントテンプレートに直接書かれたコンテンツにのみ適用されます。子コンポーネントやインポートされたコンポーネントは、デフォルトではスタイルが**適用されません**。
:::

📚 スタイルの適用に関する詳細は、[スタイリングガイド](/ja/guides/styling/)を参照してください。

## クライアントサイドスクリプト

[フレームワークコンポーネント](/ja/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) や [Astroインテグレーション](https://astro.build/integrations/) (astro-XElement 等) を使わずにブラウザに JavaScript を送信するには、Astro コンポーネントのテンプレートで `<script>` タグを使ってグローバルスコープ内で実行されるJavaScriptをブラウザに送信してください。

デフォルトでは、`<script>` タグはAstroによって処理されます。

- インポートされたものはバンドルされ、ローカルファイルやNodeモジュールのインポートができます。
- 処理されたスクリプトは、ページの `<head>` に [`type="module"`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules) と共に挿入されます。
- TypeScriptを完全にサポートし、TypeScriptファイルのインポートを含みます。
- コンポーネントがページ内で何度も使用される場合、scriptタグは一度だけ含まれます。

```astro
<script>
  // 処理、バンドルされます。TypeScript対応。npmパッケージに対してもESMのインポートできます。
</script>
```

スクリプトをバンドルしないようにするには、 `is:inline` 属性を使用します。

```astro "is:inline"
<script is:inline>
  // 書かれたとおりにHTMLにレンダリングされます!
  // ESM import はファイルからの相対パスで解決されません。
</script>
```

上記の方法を組み合わせることで、同じ `.astro` ファイルに複数の `<script>` タグを使用できます。

:::note
`<script>`タグに`type="module"`やその他の属性を追加すると、Astroのデフォルトのバンドル動作が無効になり、`is:inline`ディレクティブがあるかのようにタグが処理されます。
:::

📚 `<script>` タグで使用できるディレクティブの詳細については、[ディレクティブリファレンス](/ja/reference/directives-reference/#script--style-directives)を参照してください。

### 外部スクリプトの読み込み

**使用するタイミング:** JavaScriptファイルが `public/` 内にある場合。

この方法では、以下に説明する `import` メソッドを使用したときに、Astroが提供するJavaScriptの処理、バンドル、最適化をスキップすることに注意してください。

```astro
// 絶対URLパス
<script is:inline src="/some-external-script.js"></script>
```
### `src/`に配置されたスクリプトを使用する

**使用するタイミング:** 外部スクリプトが `src/` 内にあり、かつ、ESMモジュールタイプをサポートしている場合。

Astroは、これらのJavaScriptクライアントサイドインポートを検出し、自動的にJSをビルド・最適化してページに追加します。

```astro
// ESM import
<script>
  import './some-external-script.js';
</script>
```


## 次のステップ

📚 [Astroの組み込みコンポーネント](/ja/reference/api-reference/#built-in-components)を学びます。

📚 Astroプロジェクトでの[JavaScriptフレームワークコンポーネント](/ja/core-concepts/framework-components/)の使用方法について学びます。

---
layout: ~/layouts/MainLayout.astro
title: Astroアイランド
description: "Astroアイランド（別名：コンポーネントアイランド）は、Astroが開拓したWebアーキテクチャーのパターンの1つです。「アイランドアーキテクチャ」は、2019年にEtsyのフロントエンドアーキテクトKatie Sylor-Millerによって初めて作られ、Preactの作者、Jason Millerによって広まりました。"
i18nReady: true
setup: |
  import IslandsDiagram from '~/components/IslandsDiagram.astro';
---

**Astroアイランド**（別名：コンポーネントアイランド）は、Astroが開拓したWebアーキテクチャーのパターンです。「アイランドアーキテクチャー」のアイデアは、2019年にEtsyのフロントエンドアーキテクトである[Katie Sylor-Miller](https://twitter.com/ksylor)によってはじめて作られ、Preact作者のJason Millerによって[この投稿](https://jasonformat.com/islands-architecture/)で広められました。


## Astroアイランドとは？

「Astroアイランド」とは、HTMLの静的なページ上にあるインタラクティブなUIコンポーネントを指します。1つのページに複数のアイランドが存在でき、アイランドは常に孤立して表示されます。静的で非インタラクティブなHTMLの海に浮かぶ島（アイランド）とお考えください。

<IslandsDiagram>
    <Fragment slot="headerApp">ヘッダー（インタラクティブアイランド）</Fragment>
    <Fragment slot="sidebarApp">サイドバー（静的HTML）</Fragment>
    <Fragment slot="main">
        テキスト、画像などの静的コンテンツ
    </Fragment>
    <Fragment slot="carouselApp">イメージカルーセル（インタラクティブアイランド）</Fragment>
    <Fragment slot="footer">フッター（静的HTML）</Fragment>
    <Fragment slot="source">出典：[Islands Architecture: Jason Miller](https://jasonformat.com/islands-architecture/)</Fragment>
</IslandsDiagram>

Astroでは、サポートされているUIフレームワーク（React、Svelte、Vueなど）を使って、ブラウザ上でアイランドをレンダリングできます。同じページでさまざまなフレームワークを混在させることも、ただ好きなものを選ぶこともできます。

このアーキテクチャパターンは、**パーシャルハイドレーション**または**選択的ハイドレーション**として知られている技術に基づいています。Astroはこの技術を裏側で活用し、アイランドを自動的に動かします。


## Astroでアイランドはどのように機能しますか？

**Astroは、デフォルトでクライアントサイドのJavaScriptを一切使用せずにすべてのウェブサイトを生成します。** [React](https://reactjs.org/)、[Preact](https://preactjs.com/)、[Svelte](https://svelte.dev/)、[Vue](https://vuejs.org/)、[SolidJS](https://www.solidjs.com/)、[AlpineJS](https://alpinejs.dev/)、または[Lit](https://lit.dev/)で作られたフロントエンドUIコンポーネントを使うと、Astroが自動的に前もってHTMLとして生成し、すべてのJavaScriptを取り除いてから、それを表示します。このように、ページ内の未使用のJavaScriptをすべて削除することで、すべてのサイトをデフォルトで高速に保つことができます。

```astro title="src/pages/index.astro"
---
// 例：JavaScriptを使用せず、ページ上で静的なReactコンポーネントを使用します。
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- 100%HTMLで、ページ上に読み込まれるJavaScriptはゼロ！ -->
<MyReactComponent />
```

しかし、インタラクティブなUIを作成するためには、クライアントサイドのJavaScriptが必要になります。ページ全体をSPAのようなJavaScriptアプリケーションにするのではなく、Astroはアイランドを作成するように依頼します。

```astro title="src/pages/index.astro" ins="client:load"
---
// 例：ページ上で動的なReactコンポーネントを使用します。
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- このコンポーネントは、ページ上でインタラクティブに動作するようになります！
     残りの部分は静的でJSゼロのままです。 -->
<MyReactComponent client:load />
```

Astroアイランドでは、サイトの大部分は純粋で軽量のHTMLとCSSのままです。上の例では、ページの残りの部分を変更することなく、単一の孤立した**島にインタラクティブ機能**を追加しただけです。


## アイランドの利点は何ですか？

Astroアイランドで構築するもっとも明白な利点は、パフォーマンスです。ウェブサイトの大部分は高速で静的なHTMLに変換され、JavaScriptは必要とする個々のコンポーネントにのみ読み込まれます。JavaScriptは、バイト単位で読み込むことができるもっとも遅いリソースの1つなので、1バイトが重要なのです。

もうひとつのメリットは、並列ロードです。上のイラストの例では、優先度の低い「画像カルーセル」のアイランドが、優先度の高い「ヘッダー」のアイランドをブロックする必要はないのです。この2つは並行してロードされ、分離してハイドレーションされます。つまり、ヘッダーは、ページ下部の重いカルーセルを待つことなく、すぐにインタラクティブな状態になります。

さらに、各コンポーネントのレンダリング方法とタイミングをAstroに正確に指示できます。画像カルーセルの読み込みコストが非常に高い場合は、特別な[clientディレクティブ](/ja/reference/directives-reference/#client-directives)を付けて、カルーセルが画面上で見えるようになったときだけ読み込むようにAstroに指示できます。ユーザーがそこまでスクロールしなければ、ロードされることはありません。

Astroでは、ページ上のどのコンポーネントがブラウザで実行される必要があるか、Astroに明示的に伝えるのは、開発者の仕事です。Astroは、ページ上で必要なものだけを正確にハイドレーションし、サイトの残りの部分は静的なHTMLとして残します。

**Astroのデフォルトで高速なパフォーマンスの秘密は、アイランドにあります。**

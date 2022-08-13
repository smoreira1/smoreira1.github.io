---
layout: ~/layouts/MainLayout.astro
title: Composants Framework
description: Apprennez à utiliser React, Svelte, etc.. avec Astro
---

Construisez votre site Astro sans sacrifier votre Framework favori.

Astro supporte un large choix de Frameworks comme [React](https://reactjs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) et [Lit](https://lit.dev/).

## Installation d'intégrations

Astro peut être installé avec des intégrations pour React, Preact, Svelte, Vue, SolidJS et Lit. Une ou plusieurs de ces intégrations peuvent être installées et configurées dans votre projet.

Afin de configurer Astro pour utiliser ces Frameworks, d'abord, installez son intégration et toutes ses dépendances associées :

```bash
npm install --save-dev @astrojs/react react react-dom
```

Ensuite, importez et ajoutez la fonction à votre liste d'intégrations dans `astro.config.mjs` :

```js
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import preact from '@astrojs/preact';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';
import lit from '@astrojs/lit';

export default defineConfig({
	integrations: [react(), preact(), svelte(), vue(), solid() , lit()],
});
```

⚙️ Consultez le [Guide d'Intégrations](/fr/guides/integrations-guide/) pour plus de détails sur l'installation et la configuration d'intégrations Astro.

⚙️ Vous voulez voir un exemple pour le Framework de votre choix ? Visitez [astro.new](https://astro.new/) et sélectionnez un des modèles de Framework disponible.

## Utilisation des composants de Framework

Utilisez vos composants de Framework JavaScript dans vos composants Astro, Pages et Layouts comme des composants Astro classiques ! Tous vos composants peuvent être placés dans `/src/components`, ou peuvent être organisés de la manière que vous le souhaitez.

Pour utiliser un composant de Framework, importez-le à partir de son chemin relatif (y compris l'extension de fichier) dans le script du composant Astro. Ensuite, utilisez le composant avec d'autres composants, des éléments HTML et des expressions similaire au JSX dans le modèle du composant.

```astro
---
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<html>
  <body>
    <h1>Utilisez des composants React directement dans Astro !</h1>
    <MyReactComponent />
  </body>
</html>
```

:::tip
N'oubliez pas : Toutes les importations doivent être **en haut** de votre script de composant Astro !
:::

Par défaut, vos composants de Framework seront rendus en HTML statique. C'est pratique pour les composants qui n'ont pas à être interactifs et évite de transmettre à l'utilisateur du JavaScript inutile.

## Hydratation des composants interactifs

Un composant de Framework peut être hydraté en utilisant une directive `client:*`. C'est un attribut de composant pour définir comment votre composant devrait être **rendu** et **hydraté**.

Cette [directive `client:*`](/fr/reference/directives-reference/#client-directives) définit si oui ou non votre composant doit être rendu au moment de la compilation, et quand votre composant doit être chargé par le navigateur, côté client.

La plupart des directives rendront le composant sur le serveur à la compilation. Le JS du composant sera envoyé au client en fonction de la directive spécifiée. Le composant sera hydraté quand son JS aura terminé l'importation.

```astro
---
// Exemple: hydratation des composants de Framework dans le navigateur.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- Le JS du composant commencera à importer au chargement de la page -->
<InteractiveButton client:load />

<!-- Le JS du composant ne sera pas envoyé au client tant que l'utilisateur
     ne défile pas vers le bas et que le composant est visible sur la page -->
<InteractiveCounter client:visible />
```

:::caution
Tout le JS de rendu nécessaire au Framework (par exemple React, Svelte) est téléchargé avec la page. Les directives `client:*` définissent seulement quand le _JS du composant_ est importé et quand le _composant_ est hydraté.
:::

### Directives d'hydratation disponibles

Il y a plusieurs directives d'hydratation disponibles pour les composants de Framework : `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` et `client:only={FRAMEWORK}`.

📚 Allez voir notre [page de référence des directives](/fr/reference/directives-reference/#client-directives) pour une description complète de ces directives, et de leur utilisation.

## Mixer des Frameworks

Vous pouvez importer et afficher des composants de plusieurs Frameworks, dans le même composant Astro.

```astro
---
// src/pages/MyAstroPage.astro
// Exemple: Mixer des composants de Framework sur la même page.
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

:::caution
Seul les composants **Astro** (`.astro`) peuvent contenir des composants de différents Frameworks.
:::

## Passer des Enfants à des Composants de Framework

Dans un composant Astro, vous pouvez passer des enfants à des composants de Framework. Chaque Framework a son propre modèle pour référencer ces enfants : React, Preact et Solid utilisent une propriété spéciale nommée `children`, tandis que Svelte et Vue utilisent l'élément `<slot />`.


```astro
---
// src/pages/MyAstroPage.astro
import MyReactSidebar from '../components/MyReactSidebar.jsx';
---
<MyReactSidebar>
  <p>Voilà un panneau latéral avec du texte et un bouton.</p>
</MyReactSidebar>
```

De plus, vous pouvez utiliser les ["Slots" Nommés](/fr/core-concepts/astro-components/#emplacements-nommés) pour grouper des enfants spécifiques ensemble.

Dans React, Preact et Solid, ces "Slots" seront convertis en propriété de niveau supérieur. Les noms de slots utilisant le format `kebab-case` seront convertis en `camelCase`.

```astro
---
// src/pages/MyAstroPage.astro
import MySidebar from '../components/MySidebar.jsx';
---
<MySidebar>
  <h2 slot="title">Menu</h2>
  <p>Voilà un panneau latéral avec du texte et un bouton.</p>
  <ul slot="social-links">
    <li><a href="https://twitter.com/astrodotbuild">Twitter</a></li>
    <li><a href="https://github.com/withastro">GitHub</a></li>
  </ul>
</MySidebar>
```

```jsx
// src/components/MySidebar.jsx
export default function MySidebar(props) {
  return (
    <aside>
      <header>{props.title}</header>
      <main>{props.children}</main>
      <footer>{props.socialLinks}</footer>
    </aside>
  )
}
```

Pour Svelte et Vue ces "Slots" peuvent être référencés avec un élément `<slot>` et l'attribut `name`. Les noms de slots utilisant le format `kebab-case` seront conservés.

```jsx
// src/components/MySidebar.svelte
<aside>
  <header><slot name="title" /></header>
  <main><slot /></main>
  <footer><slot name="social-links" /></footer>
</aside>
```

## Imbriquer des composants de Framework

Dans un fichier Astro, les enfants de composants de Framework peuvent aussi être des composants hydratés. Cela signifie que vous pouvez imbriquer des composants de Framework dans d'autres composants de Framework.

```astro
---
// src/pages/MyAstroPage.astro
import MyReactSidebar from '../components/MyReactSidebar.jsx';
import MyReactButton from '../components/MyReactButton.jsx';
import MySvelteButton from '../components/MySvelteButton.svelte';
---

<MyReactSidebar>
  <p>Voici une sidebar avec du texte et un bouton.</p>
  <div slot="actions">
    <MyReactButton client:idle />
    <MySvelteButton client:idle />
  </div>
</MyReactSidebar>
```

:::caution
N'oubliez pas : les fichiers composants de Framework eux-mêmes (par exemple `.jsx`, `.svelte`) ne peuvent pas se mélanger à d'autres Frameworks.
:::

Ceci permet de construire des applications entières dans votre Framework JavaScript préféré et de les rendre via un composant parent, à une page Astro.

:::note
Les composants sont toujours rendus en HTML statique, même lorsqu'ils contiennent des composants de Framework qui sont hydratés. Cela signifie que vous ne pouvez pas passer des propriétés `render` à un composant de Framework depuis un composant Astro. Les composants Astro ne peuvent pas fournir le comportement client requis par ce modèle. À la place, vous pouvez utiliser les "Slots" nommés.
:::

## Puis-je hydrater des composants Astro ?

Si vous essayez d'hydrater un composant Astro avec un modificateur `client:`, vous obtiendrez une erreur.

Les composants Astro sont des composants de Template uniquement en HTML sans éxécution côté client. Mais, vous pouvez utiliser une balise `<script>` dans votre Template de composant Astro pour envoyer du JavaScript au navigateur qui s'exécute dans le contexte global

📚 Apprenez-en plus sur [les `<script>` client-side dans les composants Astro](/fr/core-concepts/astro-components/#scripts-côté-client)

[mdn-io]: https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/fr/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia

---
layout: ~/layouts/MainLayout.astro
title: Dépannage
description: Besoin d'aide ? Bloqué sur quelque chose ? Ce guide est fait pour vous.
---

Astro fournit plusieurs outils différents pour vous aider à dépanner et à déboguer votre code.

## Erreurs courantes

Voici une liste de quelques messages d'erreurs courants que vous pourriez rencontrer dans votre terminal, ce qu'ils signifient et ce que vous pouvez faire pour les corriger.

### Transform failed with X error

Ce message apparaît souvent à cause d'une limitation actuelle dans Astro qui exige que vos appels `import` et `export` soient au début de votre fichier `.astro`.

**Solution**: Écrivez vos imports et exports au début de votre Script de composant.

**Statut**: Limitation actuelle; Un correctif est en cours de développement.

💡 Vous n'êtes pas certain que cela va résoudre votre problème ? Vérifiez si quelqu'un d'autre a déjà [signalé ce type d'erreur](https://github.com/withastro/astro/issues?q=is%3Aissue+is%3Aopen+Transform+failed+with+*+error) !

### Cannot use import statement outside a module

Dans les composants Astro, les balises `<script>` sont hoistées et chargées comme des [modules JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) par défaut. Si vous avez ajouté la directive [`is:inline`](/fr/reference/directives-reference/#isinline) ou n'importe quel autre attribut dans votre balise, ce comportement par défaut est désactivé.

**Solution**: Si vous avez ajouté n'importe quel attribut à votre balise `<script>`, vous devez aussi ajouter la directive `type="module"` pour pouvoir utiliser les importations.

**Statut**: Comportement attendu par Astro, comme prévu.

💡 Vous n'êtes pas certain que cela va résoudre votre problème ? Vérifiez si quelqu'un d'autre a déjà [signalé ce type d'erreur](https://github.com/withastro/astro/issues?q=is%3Aissue+is%3Aopen+Cannot+use+import+statement) !

### Unable to render component

Cette erreur indique une erreur dans un composant que vous avez importé et utilisé dans votre Template de composant Astro.

#### Cas classiques

Ceci peut être causé par l'accès à l'objet `window` ou `document` au moment de la génération du composant. Par défaut, Astro génère votre composant [isomorphiquement](https://fr.wikipedia.org/wiki/Isomorphisme), c'est-à-dire qu'il est exécuté sur le serveur où l'environnement du navigateur n'est pas disponible. Vous pouvez désactiver cette étape de pré-génération en utilisant [la directive `client:only`](/fr/reference/directives-reference/#clientonly).

**Solution**: Essayez d'accéder à ces objets après la génération du composant (ex: [`useEffect()`](https://fr.reactjs.org/docs/hooks-reference.html#useeffect) dans React ou [`onMounted()`](https://vuejs.org/api/composition-api-lifecycle.html#onmounted) dans Vue et Svelte)

**Statut**: Comportement attendu par Astro, comme prévu.

#### Ce n'est pas ça ?

**Solution**: Vérifiez la documentation appropriée pour votre composant [Astro](/fr/core-concepts/astro-components/) ou de [Framework UI](/fr/core-concepts/framework-components/). Vous pouvez aussi ouvrir un Template de démarrage Astro [astro.new](https://astro.new/) et déboguer votre composant dans un projet Astro minimal.

💡 Vous n'êtes pas certain que cela va résoudre votre problème ? Vérifiez si quelqu'un d'autre a déjà [signalé ce type d'erreur](https://github.com/withastro/astro/issues?q=is%3Aissue+is%3Aopen+Unable+to+render+Component) !

### Expected a default export

Cette erreur peut être levée lorsque vous essayez d'importer ou de rendre un composant invalide, ou un qui ne fonctionne pas correctement. (Ce message d'erreur apparaît car le fonctionnement de l'importation d'un composant UI se fait d'une façon spécifique à Astro.)

**Solution**: Essayez de trouver des erreurs dans les composants que vous importez et affichez et assurez-vous qu'ils fonctionnent correctement. Vous pouvez aussi ouvrir un Template de démarrage Astro [astro.new](https://astro.new) et déboguer votre composant dans un projet Astro minimal.

**Statut**: Comportement attendu par Astro, comme prévu.

## Pièges courants

### Mon composant ne s'affiche pas

En premier lieu, vérifiez que vous avez **importé le composant** dans votre [Script de composant `.astro`](/fr/core-concepts/astro-components/#le-script-du-composant) ou dans [le Frontmatter `.md`](/fr/guides/markdown-content/#utilisez-des-composants-dans-markdown).

Ensuite, vérifiez votre appel `import` :

- Votre importation dirige-t-elle vers le bon endroit ? (Vérifiez votre chemin d'import.)

- Est-ce que votre importation a le même nom que le composant importé ? (Vérifiez le nom de votre composant et que cela [suit la syntaxe `.astro`](/fr/comparing-astro-vs-other-tools/#astro-vs-jsx).)

- Avez-vous inclu l'extension dans l'importation ? (Vérifiez que le fichier importé contient une extension. Ex: `.astro`, `.md`, `.jsx`, `.vue`)

### Mon composant n'est pas interactif

Si votre composant est rendu (voir la précédente section) mais ne répond pas à l'interaction utilisateur, alors vous avez peut-être oublié une [directive `client:*`](/fr/reference/directives-reference/#client-directives) pour hydrater votre composant.

Par défaut, un [composants UI de Framework n'est pas hydraté sur le navigateur](/fr/core-concepts/framework-components/#hydratation-des-composants-interactifs). Si aucune directive `client:*` n'est fournie, son HTML est rendu sur la page sans JavaScript.

Note : Les [composants Astro](/fr/core-concepts/astro-components/) sont des composants HTML sans exécution sur le navigateur. Mais, vous pouvez utiliser une balise `<script>` dans votre Template de composant Astro pour envoyer du JavaScript au navigateur qui s'exécute globalement sur toute la page.

### Cannot find package 'X'

Allez jeter un oeil au [guide pour les intégrations Astro](/fr/guides/integrations-guide/) pour les instructions sur l'ajout de Framework, des outils CSS et d'autres Packages vers Astro.

Vous pourriez aussi avoir besoin d'installer des _"peer dependencies"_ pour certaines intégrations. Si vous voyez un message « missing peer dependencies », vous pouvez suivre les instructions afin de [gérer les dépendances](/fr/guides/integrations-guide/#gérer-les-dépendances-dintégration).

### `Astro.glob()` - no matches found

Quant vous utilisez `Astro.glob()` pour importer des fichiers, assurez-vous d'utiliser la syntaxe glob correcte qui va correspondre à tous les fichiers dont vous auriez besoin.

#### Chemins d'accès

Par exemple, utilisez `../components/**/*.js` dans `src/pages/index.astro` pour importer les deux fichiers suivants :

- `src/components/MyComponent.js`
- `src/components/includes/MyOtherComponent.js`

#### Valeurs prises en charge

`Astro.glob()` ne prend pas en charge les variables dynamiques et les interpolations.

Ce n'est pas un bug d'Astro. C'est dû à une limitation de la fonctionnalité [`import.meta.glob()` de Vite](https://vitejs.dev/guide/features.html#glob-import) qui ne supporte que des chaînes de caractères statiques.

L'alternative la plus courante est d'importer un ensemble plus grand de fichiers qui inclut tous les fichiers dont vous avez besoin en utilisant `Astro.glob()`, puis de les filtrer :

```astro
---
// src/components/featured.astro
const { postSlug } = Astro.props
const pathToMyFeaturedPost = `src/pages/blog/${postSlug}.md`

const posts = await Astro.glob('../pages/blog/*.md');
const myFeaturedPost = posts.find(post => post.file.includes(pathToMyFeaturedPost));
---

<p>
    Jetez un oeil à mon article favori, <a href={myFeaturedPost.url}>{myFeaturedPost.frontmatter.title}</a> !
</p>
```

### Utilisation d'Astro avec Yarn 2+ (Berry)

Dans Yarn version 2 ou plus (a.k.a. Berry), utilise une technique appelée ["Plug'n'Play" (PnP)](https://yarnpkg.com/features/pnp) pour stocker et gérer les modules Node, qui peut [causer des problèmes](https://github.com/withastro/astro/issues/3450) lors de l'initialisation d'un nouveau projet Astro utilisant `create-astro` ou lors de l'utilisation de Astro. Une solution est de définir la propriété [`nodeLinker`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) dans `yarnrc.yml` à la valeur `node-modules` :

```yaml
nodeLinker: "node-modules"
```

## Trucs et astuces

### Débogage avec `console.log()`

`console.log()` est un moyen simple mais populaire de déboguer votre code Astro. Lorsque vous écrivez votre appel à `console.log`, il déterminera où votre sortie de débogage sera affichée.

#### Frontmatter

Un appel à `console.log()` dans le Frontmatter d'Astro sera toujours sorti dans le **terminal** qui exécute le processus d'Astro. Car Astro s'exécute sur le serveur, et jamais dans le navigateur.

```astro
---
const sum = (a, b) => a + b;

// Exemple : Affiche "4" dans le terminal
console.log(sum(2, 2));
---
```

#### Scripts JS

Le code qui est écrit ou importé dans un `<script>` d'Astro sera exécuté dans le navigateur. Toutes les sorties de débogage ou autres appels à `console.log()` seront affichés dans votre navigateur.

### Débogage des composants de Framework

[Les composants de Framework](/fr/core-concepts/framework-components/) (comme React et Svelte) sont uniques : ils sont rendus sur le serveur par défaut, ce qui signifie que les sorties de débogage seront visibles dans le terminal. Cependant, ils peuvent également être hydratés pour le navigateur, ce qui peut aussi entraîner que vos logs de débogage apparaissent également dans le navigateur.

Cela peut être utile pour déboguer les différences entre la sortie SSR et les composants hydratés dans le navigateur.

### Le composant `<Debug />` d'Astro

Pour vous aider à déboguer vos composants Astro, Astro propose un composant [`<Debug />`](/fr/reference/api-reference/#debug-) qui affiche directement une valeur dans votre template HTML de composant. Cela est utile pour un débogage rapide dans le navigateur sans avoir à faire les aller-retour entre votre terminal et votre navigateur.

```astro
---
import { Debug } from 'astro/components';
const sum = (a, b) => a + b;
---

<!-- Exemple : Affiche {answer: 6} dans le navigateur -->
<Debug answer={sum(2, 4)} />
```

Le composant `<Debug />` d'Astro supporte une variété d'options de syntaxe pour un débogage plus flexible et concis :

```astro
---
import { Debug } from 'astro/components';
const sum = (a, b) => a + b;
const answer = sum(2, 4);
---
<!-- Exemple : Les trois exemples sont équivalents. -->
<Debug answer={sum(2, 4)} />
<Debug {{answer: sum(2, 4)}} />
<Debug {answer} />
```

## Besoin de plus ?

Venez discuter avec nous sur [Discord](https://astro.build/chat/) et expliquez votre problème dans le salon `#support-threads`. Nous sommes toujours heureux de pouvoir vous aider !

Visitez les [_"Issues"_ GitHub ouvertes dans Astro](https://github.com/withastro/astro/issues/) pour voir si vous rencontrez un problème connu ou soumettre un rapport de bug.

Vous pouvez aussi visiter [les discussions RFC](https://github.com/withastro/rfcs/discussions/) pour voir si vous avez trouvé une limitation connue d'Astro et regarder si il y a des propositions en rapport avec votre utilisation.

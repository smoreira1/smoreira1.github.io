---
layout: ~/layouts/MainLayout.astro
setup: |
  import Badge from '~/components/Badge.astro';
title: Utiliser les Intégrations
---

Les **intégrations Astro** permettent d'ajouter de nouvelles fonctionnalités et de nouveaux comportements à votre projet en quelques lignes de code. Vous pouvez écrire une intégration personnalisée vous-même, ou récupérer les plus populaires depuis [npm](https://www.npmjs.com/search?q=keywords%3Aastro-component&ranking=popularity).

- Permet d'utiliser React, Vue, Svelte, Solid et d'autres Frameworks populaires.
- Intégrez des outils comme Tailwind, Turbolinks et Partytown en quelques lignes de code.
- Ajoutez de nouvelles fonctionnalités à votre projet, comme la génération automatique de sitemap.
- Écrivez du code personnalisé qui s'accroche au processus de construction, au serveur de développement, etc.

> Les intégrations sont encore nouvelles et l'API n'a pas encore été finalisée. Seules les intégrations officielles d'Astro (celles publiées dans `@astrojs/` sur npm) sont actuellement prises en charge afin de protéger les utilisateurs contre les changements majeurs.
>
> **Pour activer les intégrations tierces :** Exécutez Astro avec la commande CLI `--experimental-integrations`.

## Tutoriel : Ajouter React à votre projet

Dans cet exemple, nous allons ajouter l'intégration `@astrojs/react` pour ajouter le React à votre projet Astro. Le processus d'ajout de tout autre Framework (Preact, Vue, Svelte ou Solid) est presque identique et peut être suivi en utilisant les mêmes étapes décrites ci-dessous.

<blockquote>
  <Badge variant="accent">Sentez-vous l'appel de l'aventure ?</Badge>

  Astro a récemment lancé une commande **expérimentale** `astro add` pour automatiser ce processus ! Au lieu des étapes ci-dessous, vous pouvez exécuter `npx astro add react`. C'est tout !

  Passez à [Configuration d'intégration automatique](#configuration-dintégration-automatique) pour plus de détails.
</blockquote>

Tout d'abord, vous devrez installer à la fois l'intégration et tous les Packages liés que vous pensez utiliser dans votre projet. Pour React, cela signifie installer l'intégration `@astrojs/react` ***et*** les Packages `react` + `react-dom`.

```bash
npm install --save-dev @astrojs/react
```

Une fois que vos Packages ont été installés, ajoutez deux nouvelles lignes au fichier de configuration de votre projet `astro.config.mjs`.

```diff
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
+ import react from '@astrojs/react';

  export default defineConfig({
+   integrations: [react()],
  });
```

La première ligne est l'importation de l'intégration dans votre fichier de configuration. La deuxième ligne appelle la fonction d'intégration (`react()`) et ajoute l'intégration pour qu'Astro sache l'utiliser.

C'est tout ! Redémarrez Astro, et la nouvelle intégration devrait prendre effet immédiatement.

Si vous voyez une erreur au démarrage, assurez-vous que vous avez :

- ✅ ajouté les Packages requis avec npm
- ✅ importé l'intégration dans votre fichier `astro.config.mjs`
- ✅ appelé votre intégration comme une fonction (`[react()]`, pas `[react]`)
- ✅ supprimé toute configuration `renderers:` obsolète (avant la version 0.25)

## Configuration d'intégration automatique

Astro a récemment lancé une commande **expérimentale** `astro add` pour automatiser la configuration des intégrations.

> Nous vous demanderons toujours une confirmation avant de mettre à jour l'un de vos fichiers, mais il n'est jamais inutile de disposer d'une sauvegarde, au cas où.

Au lieu de la configuration manuelle décrite ci-dessus, exécutez simplement `astro add [name]` et notre assistant d'intégration automatique mettra à jour votre fichier de configuration et installera toutes les dépendances nécessaires.

```shell
# Utilisant NPM
npx astro add react
# Utilisant Yarn
yarn astro add react
# Utilisant PNPM
pnpx astro add react
```

Il est aussi possible de configurer plusieurs intégrations en même temps !

```shell
# Utilisant NPM
npx astro add react tailwind partytown
# Utilisant Yarn
yarn astro add react tailwind partytown
# Utilisant PNPM
pnpx astro add react tailwind partytown
```

## Gérer les dépendances d'intégration

Lorsque vous installez une intégration Astro dans votre projet, soyez attentif aux avertissements `"missing peer dependencies"` qui apparaissent au cours de l'étape d'installation. Tous les gestionnaires de Packages n'installent pas automatiquement les dépendances pour vous. Si vous utilisez Node v16+ et npm, vous n'avez pas à vous soucier de cette section.

Si vous voyez un avertissement `"Cannot find package 'react'"` (ou un avertissement similaire) lorsque vous démarrez Astro, cela signifie que vous devez installer ce Package dans votre projet. React, par exemple, est une dépendance de l'intégration `@astrojs/react`. Cela signifie que vous devez installer les Packages officiels `react` et `react-dom` en même temps que votre intégration. L'intégration puisera automatiquement dans ces Packages.

```diff
# Exemple : Installer les intégrations et les Frameworks ensemble
- npm install @astrojs/react
+ npm install @astrojs/react react react-dom
```

Si vous manquez cette étape, ne vous inquiétez pas, Astro vous avertira au cours du démarrage si des _"peer dependencies"_ manquantes sont requises mais non trouvées dans votre projet.

La gestion de vos propres dépendances peer peut représenter un peu plus de travail, mais elle vous permet également de contrôler exactement les versions des Packages que vous utilisez pour des choses comme React, Tailwind, et plus encore. Cela vous donne plus de contrôle sur votre projet.

À l'avenir, une commande utilitaire `astro add` sera capable de gérer toute cette configuration pour vous, et d'installer automatiquement les dépendances correctes des peers pour vos intégrations.

## Utiliser les intégrations

Les intégrations Astro sont toujours ajoutées par le biais de la propriété `integrations` dans votre fichier `astro.config.mjs`.

> Vous souhaitez en savoir plus sur l'utilisation ou la configuration d'une intégration spécifique ? Trouvez-la dans notre [répertoire des intégrations](https://astro.build/integrations/) et suivez le lien vers son dépôt sur GitHub.

Il existe trois façons courantes d'importer une intégration dans votre projet Astro :

1. En installant une intégration à partir d'un Package npm.
2. En important votre propre intégration à partir d'un fichier local dans votre projet.
3. En écrivant votre intégration en ligne, directement dans votre fichier de configuration.

```js
// astro.config.mjs
import {defineConfig} from 'astro/config';
import installedIntegration from '@astrojs/vue';
import localIntegration from './my-integration.js';

export default defineConfig({
  integrations: [
    // 1. Importée à partir d'un paquet npm installé
    installedIntegration(),
    // 2. Importée à partir d'un fichier JS local
    localIntegration(),
    // 3. Un objet directement dans le fichier de configuration
    {name: 'namespace:id', hooks: { /* ... */ }},
  ]
})
```

Consultez la référence à l'[API d'intégration](/fr/reference/integrations-reference/) pour connaître toutes les différentes façons d'écrire une intégration.

### Options personnalisées

Les intégrations sont presque toujours conçues comme des fonctions _"factory"_ qui renvoient l'objet d'intégration. Cela vous permet de passer des arguments et des options à la fonction afin de personnaliser l'intégration pour votre projet.

```js
integrations: [
  // Exemple : Personnalisez votre intégration avec des arguments de fonction
  sitemap({filter: true})
]
```

### Activer une intégration

Les intégrations `false` sont ignorées, ce qui vous permet d'activer et de désactiver les intégrations sans vous soucier des valeurs booléennes et des `undefined` restants.

```js
integrations: [
  // Exemple : Ignorer la construction d'un sitemap sur Windows
  process.platform !== 'win32' && sitemap()
]
```

## Construire votre propre intégration

L'API d'intégration d'Astro est inspirée de Rollup et de Vite, et est conçue pour être familière à toute personne ayant déjà écrit un plugin Rollup ou Vite.

Consultez l'[API d'intégration](/fr/reference/integrations-reference/) pour savoir ce que les intégrations peuvent faire et comment en écrire une vous-même.

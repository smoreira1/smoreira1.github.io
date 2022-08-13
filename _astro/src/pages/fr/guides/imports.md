---
layout: ~/layouts/MainLayout.astro
title: Fichiers Statiques
description: Apprenez à importer différents types de contenu avec Astro.
---

Astro supporte la plupart des ressources statiques sans aucune configuration requise. Vous pouvez utiliser la directive `import` n'importe où dans votre projet JavaScript (y compris votre *front matter* d'Astro) et Astro inclura une copie construite et optimisée de cette ressource statique dans votre build final. `@import` est également prise en charge dans les balises CSS et `<style>`.

## Types de fichiers supportés

Les types de fichiers suivants sont pris en charge d'emblée par Astro :

- Composants Astro (`.astro`)
- Markdown (`.md`)
- JavaScript (`.js`, `.mjs`)
- TypeScript (`.ts`, `.tsx`)
- Packages NPM
- JSON (`.json`)
- JSX (`.jsx`, `.tsx`)
- CSS (`.css`)
- Modules CSS (`.module.css`)
- Images & éléments (`.svg`, `.jpg`, `.png`, etc.)

Si vous ne trouvez pas le type de ressource que vous recherchez, consultez notre [Bibliothèque d'intégrations](https://astro.build/integrations/). Vous pouvez étendre Astro pour ajouter la prise en charge de différents types de fichiers, comme les composants Svelte et Vue.

Ce guide explique en détail comment différents types de ressources sont créés par Astro et comment les importer avec succès.

N'oubliez pas que vous pouvez également placer n'importe quelle ressource statique dans le répertoire [`public/`](/fr/core-concepts/project-structure/#public) de votre projet, et Astro les copiera directement dans votre build final. Les fichiers `public/` ne sont pas compilés ou assemblés par Astro, ce qui signifie que tout type de fichier est supporté. Vous pouvez référencer un fichier `public/` par une URL directement dans vos modèles HTML.

## JavaScript

```js
import { getUser } from './user.js';
```

Du JavaScript peut être importé en utilisant la syntaxe normale d'ESM `import` et `export`. Cela fonctionne comme prévu, sur la façon de fonctionner par défaut de Node.js et du navigateur.

## TypeScript

```js
import { getUser } from './user.ts';
import type { UserType } from './user.ts';
```

Astro comprend une prise en charge intégrée de [TypeScript](https://www.typescriptlang.org/). Vous pouvez importer des fichiers `.ts` et `.tsx` directement dans votre projet Astro, et même écrire du code TypeScript directement dans votre [composant Astro](/fr/core-concepts/astro-components/#le-script-du-composant).

**Astro n'effectue aucune vérification de type de lui-même.**, soit par votre IDE, soit par un script distinct. L'extension [VSCode d'Astro](/fr/editor-setup/) fournit automatiquement des indications et des erreurs TypeScript dans vos fichiers ouverts.

📚 En savoir plus sur [la prise en charge de TypeScript dans Astro.](/fr/guides/typescript/)

## JSX / TSX

```js
import { MyComponent } from './MyComponent.jsx';
```

Astro inclut un support intégré pour les fichiers JSX (`*.jsx` et `*.tsx`) dans votre projet. La syntaxe JSX est automatiquement transposée en JavaScript.

Bien qu'Astro comprenne la syntaxe JSX dès le départ, vous devrez inclure une intégration de framework pour les afficher, comme React, Preact et Solid. Consultez notre guide [Using Integrations](/fr/guides/integrations-guide/) pour en savoir plus.

**Remarque : Astro ne prend pas en charge JSX dans les fichiers `.js`/`.ts`. JSX ne sera traité qu'à l'intérieur des fichiers dont l'extension se termine par `.jsx` et `.tsx`.

## Packages NPM

```js
// Retourne les packages NPM React & React-DOM
import React from 'react';
import ReactDOM from 'react-dom';
```

Astro vous permet d'importer des modules npm directement dans le navigateur. Même si un module a été publié dans un format ancien, Astro le convertit au format ESM avant de le fournir au navigateur.

## JSON

```js
// Charge l'objet JSON via l'export par défaut
import json from './data.json';
```

Astro prend en charge l'importation de fichiers JSON directement dans votre application. Les fichiers importés retournent l'objet JSON complet dans l'importation par défaut.

## CSS

```js
// Charge et intègre 'style.css' sur la page
import './style.css';
```

Astro supporte l'importation de fichiers CSS directement dans votre application. Les styles importés n'exposent aucune exportation, mais l'importation d'un style ajoutera automatiquement ces styles à la page. Cela fonctionne pour tous les fichiers CSS par défaut, et peut prendre en charge les langages de compilation vers le CSS comme Sass et Less via des plugins.

Si vous préférez ne pas écrire de CSS, Astro prend également en charge toutes les bibliothèques CSS-in-JS populaires (ex : styled-components) pour le style.

## Modules CSS

```jsx
// 1. Convertit les noms de classes './style.module.css' en valeurs uniques, portées.
// 2. Retourne un objet qui associe les noms de classes d'origine à leur valeur portée finale.
import styles from './style.module.css';

// Cet exemple utilise JSX, mais vous pouvez utiliser les modules CSS avec n'importe quel Framework.
return <div className={styles.error}>Votre message d'erreur</div>;
```

Astro supporte les modules CSS en utilisant la convention de dénomination `[nom].module.css`. Comme tout fichier CSS, l'importation d'un module CSS entraîne l'application automatique de ce CSS à la page. Toutefois, les modules CSS exportent un objet `styles` spécial par défaut qui transforme vos noms de classe originaux en identifiants uniques.

Les modules CSS vous aident à renforcer la délimitation et l'isolation des composants sur le front-end grâce à des noms de classe générés de manière unique pour vos feuilles de style.

## Autres ressources

```jsx
import imgReference from './image.png'; // img === '/src/image.png'
import svgReference from './image.svg'; // svg === '/src/image.svg'
import txtReference from './words.txt'; // txt === '/src/words.txt'

// Cet exemple utilise JSX, mais vous pouvez utiliser des références d'importation avec n'importe quel Framework.
<img src={imgReference} />;
```

Toutes les autres ressources qui ne sont pas explicitement mentionnés ci-dessus peuvent être importés via ESM `import` et retourneront une référence URL vers la ressource finale construit. Cela peut être utile pour référencer des ressources non-JS par URL, comme créer un élément image avec un attribut `src` pointant vers cette image.

Il peut également être utile de placer les images dans le dossier `public/` comme expliqué sur la page [page de structure du projet](/fr/core-concepts/project-structure/#public).

## WASM

```js
// Charge et initialise le fichier WASM demandé
const wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Astro supporte le chargement de fichiers WASM directement dans votre application en utilisant l'API [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) du navigateur.

## Intégrations Node

Nous encourageons les utilisateurs d'Astro à éviter les "Built-in" Node.js (`fs`, `path`, etc.) autant que possible. Astro a pour objectif d'être compatible avec plusieurs environnements de développement. Cela inclut [Deno](https://deno.land/) et [Cloudflare Workers](https://workers.cloudflare.com/) qui ne prennent pas en charge les modules intégrés de Node tels que `fs`.

Notre objectif est de fournir des alternatives aux modules intégrés courants de Node.js. Cependant, aucune alternative de ce type n'existe aujourd'hui. Donc, si vous avez _vraiment_ besoin d'utiliser ces modules Built-in, nous ne voulons pas vous en empêcher. Astro supporte les modules Built-in de Node.js en utilisant le préfixe `node:` de Node. Si vous voulez lire un fichier, par exemple, vous pouvez le faire comme ceci :

```astro
---
// Exemple : importation de l'intégration "fs/promises" de Node.js
import fs from 'node:fs/promises';

const url = new URL('../../package.json', import.meta.url);
const json = await fs.readFile(url, 'utf-8');
const data = JSON.parse(json);
---

<span>Version : {data.version}</span>
```

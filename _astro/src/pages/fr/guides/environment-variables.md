---
layout: ~/layouts/MainLayout.astro
title: Utiliser des variables d'environnement
description: Apprenez comment utiliser les variables d'environnement dans un projet Astro.
---

Astro utilise Vite pour les variables d'environnement, et permet d'utiliser [n'importe quelle méthode de Vite](https://vitejs.dev/guide/env-and-mode.html) pour obtenir et définir des variables d'environnement.

Notez que _toutes_ les variables d'environnement sont disponibles dans le code coté serveur, mais seulement les variables préfixées avec `PUBLIC_` sont disponibles dans le code client pour des raisons de sécurité.

Jetez un oeil à l'exemple officiel des [variables d'environnement](https://github.com/withastro/astro/tree/main/examples/env-vars) pour un aperçu des pratiques à appliquer.

```ini
SECRET_PASSWORD=motdepasse123
PUBLIC_ANYBODY=juste là
```

Dans cet exemple, `PUBLIC_ANYBODY` ( disponible en tant que `import.meta.env.PUBLIC_ANYBODY` ) sera accessible à la fois dans le code côté serveur et côté client, alors que `SECRET_PASSWORD` ( disponible en tant que `import.meta.env.SECRET_PASSWORD` ) ne sera accessible que côté serveur.

## Variables d'environnement par défaut

Astro inclut quelques variables d'environnement par défaut :

- `import.meta.env.MODE` (`development` | `production`): Représente le mode dans lequel le site tourne actuellement. Défini comme `development` en utilisant la commande `astro dev` et à `production` en utilisant `astro build`.
- `import.meta.env.BASE_URL` (`string`): Représente l'URL de base sous laquelle votre site est déployé. Déterminé par [l'option `base` dans votre configuration](/fr/reference/configuration-reference/#base).
- `import.meta.env.PROD` (`boolean`): Si votre site tourne en mode <i>"production"</i>.
- `import.meta.env.DEV` (`boolean`): Si votre site tourne en mode <i>"development"</i> (toujours opposé à la valeur de `import.meta.env.PROD`).
- `import.meta.env.SITE` (`string`): [L'option `site` dans votre configuration](/fr/reference/configuration-reference/#site) spécifié dans le fichier `astro.config.mjs` de votre projet.

## Définir des variables d'environnement

Les variables d'environnement peuvent être chargées depuis les fichiers `.env` dans le répertoire de votre projet.

Vous pouvez aussi ajouter/attacher un mode (soit `production` ou `development`) en suffixe au nom du fichier, comme `.env.production` ou `.env.development`, qui rendent ces variables d'environnement uniquement actives dans ce mode.

Créez un fichier `.env` dans le répertoire de votre projet et ajoutez quelques variables à ce fichier.

```bash
# .env
# Ceci ne sera disponible que lorsque vous lancerez le serveur !
DB_PASSWORD="foobar"
# Ceci sera disponible partout !
PUBLIC_POKEAPI="https://pokeapi.co/api/v2"
```

```ini
.env                # Chargé dans tous les cas
.env.local          # Chargé dans tous les cas, ignoré par git
.env.[mode]         # Chargé uniquement dans le mode spécifié
.env.[mode].local   # Chargé uniquement dans le mode spécifié, ignoré par git
```

## Obtenir des variables d'environnement

Au lieu d'utiliser `process.env`, avec Vite, vous utilisez `import.meta.env`, qui utilise la fonctionnalité `import.meta` ajoutée dans ES2020.

Par exemple, utilisez `import.meta.env.PUBLIC_POKEAPI` pour obtenir la variable d'environnement `PUBLIC_POKEAPI`.

```js
// Quand import.meta.env.SSR === true
const data = await db(import.meta.env.DB_PASSWORD);

// Quand import.meta.env.SSR === false
const data = fetch(`${import.meta.env.PUBLIC_POKEAPI}/pokemon/squirtle`);
```

_Ne vous inquiétez pas si votre navigateur ne supporte pas `import.meta.env`, Vite remplace toutes les mentions de `import.meta.env` par des valeurs statiques._

> ⚠️ATTENTION⚠️ :
> Étant donné que Vite remplace statiquement `import.meta.env`, vous ne pouvez pas y accéder avec des clés dynamiques comme `import.meta.env[key]`.

## Autocomplétion pour TypeScript

Par défaut, Vite fournit des définitions de type pour `import.meta.env` dans `vite/client.d.ts`.

Vous pouvez aussi définir d'autres variables d'environnement dans les fichiers `.env.[mode]`, mais vous voulez sûrement accéder à l'autocomplétion pour les variables d'environnement définies par l'utilisateur qui commencent par `PUBLIC_`.

Pour faire cela, vous pouvez créer un fichier `env.d.ts` dans le répertoire `src/`, puis étendre `ImportMetaEnv` comme ceci :

```ts
interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  // plus de variables d'environnement...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

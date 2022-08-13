---
layout: ~/layouts/MainLayout.astro
title: Composants Layout
description: Une introduction aux composants Layouts, un type de composant Astro qui est partagé entre les pages pour des modèles communs.
---

Les **Layouts** (ou "mise-en-pages" en français) sont des [composants Astro](/fr/core-concepts/astro-components/) spéciaux utilisés pour créer des modèles de page réutilisables.

Un composant Layout est conventionnellement utilisé pour fournir un [composant Page en `.astro` ou `.md`](/fr/core-concepts/astro-pages/) avec une **coquille de page** (`<html>`, `<head>` et `<body>` balises) et un `<slot />` pour spécifier où dans le composant Layout ce contenu doit-être injecté.

Les Layouts offrent souvent des éléments communs `<head>` et des éléments UI communs pour la page, comme des en-têtes, des barres de navigation et des pieds de page.

Les composants Layout sont généralement placés dans un dossier `src/layouts` dans votre projet.

## Exemple de Layout

```astro
---
// Exemple: src/layouts/MySiteLayout.astro
---
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <nav>
      <a href="#">Accueil</a>
      <a href="#">Articles</a>
      <a href="#">Contact</a>
    </nav>
    <article>
      <slot /> <!-- Votre contenu est injecté ici -->
    </article>
  </body>
</html>
```

```astro
---
// Exemple: src/pages/index.astro
import MySiteLayout from '../layouts/MySiteLayout.astro';
---
<MySiteLayout>
  <p>Le contenu de ma page, inséré dans un Layout !</p>
</MySiteLayout>
```

📚 Apprenez-en plus sur [les Slots](/fr/core-concepts/astro-components/#emplacements).

## Inclure des Layouts

Les composants Layout ne nécessitent pas contenir une page HTML complète. Vous pouvez découper vos Layouts en composants plus petits, et ensuite réutiliser ces composants pour créer des Layouts plus flexibles et puissants dans votre projet.

Par exemple, un Layout commun pour les articles de blog peut afficher un titre, une date et un auteur. Un composant Layout `BlogPostLayout.astro` pourrait ajouter cette UI à la page et aussi utiliser un Layout plus général pour gérer le reste de votre page.

```astro
---
// Exemple: src/layout/BlogPostLayout.astro
import BaseLayout from '../layouts/BaseLayout.astro'
const {content} = Astro.props;
---
<BaseLayout>
  <h1>{content.title}</h1>
  <h2>Auteur de l'article : {content.author}</h2>
  <slot />
</BaseLayout>
```

## Layouts Markdown

Les composants Layouts sont particulièrement utiles pour les [fichiers Markdown](/fr/guides/markdown-content/#pages-markdown). Les fichiers Markdown peuvent utiliser la propriété `layout` dans leur en-tête pour spécifier un composant Layout qui va entourer leur contenu Markdown dans une page HTML complète.

Quand une page Markdown utilise un Layout, il passe le Layout une propriété `content` qui inclut toutes les données de l'en-tête Markdown et du HTML final. Voir l'exemple `BlogPostLayout.astro` ci-dessus pour une explication de comment utiliser cette propriété `content` dans votre composant Layout.

```markdown
// Exemple: src/pages/posts/post-1.md
---
title: Article de blog
description: Mon premier article de blog !
layout: ../layouts/BlogPostLayout.astro
---
C'est un article écrit en Markdown.
```

📚 Apprenez-en plus sur le support de Markdown dans notre [guide Markdown](/fr/guides/markdown-content/).

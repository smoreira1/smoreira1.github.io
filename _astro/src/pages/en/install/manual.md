---
title: Install Astro manually
description: How to install Astro manually with NPM, PNPM, or Yarn.
layout: ~/layouts/MainLayout.astro
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.astro';
i18nReady: true
---
Ready to install Astro? Follow our automatic or manual set-up guide to get started.

#### Prerequisites

- **Node.js** - `14.18.0`, `v16.12.0`, or higher.
- **Text editor** - We recommend [VS Code](https://code.visualstudio.com/) with our [Official Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).
- **Terminal** - Astro is accessed through its command-line interface (CLI).

<InstallGuideTabGroup />

#### Installation

If you prefer not to use our automatic `create-astro` CLI tool, you can set up your project yourself by following the guide below.

## 1. Create your directory

Create an empty directory with the name of your project, and then navigate into it.

```bash
mkdir my-astro-project
cd my-astro-project
```

Once you are in your new directory, create your project `package.json` file. This is how you will manage your project dependencies, including Astro. If you aren't familiar with this file format, run the following command to create one.

```bash
npm init --yes
```


## 2. Install Astro

First, install the Astro project dependencies inside your project.

```bash
npm install astro
```

Then, replace any placeholder "scripts" section of your `package.json` with the following:

```json title="package.json" del={2} ins={3-6}
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
```

You'll use these scripts later in the guide to start Astro and run its different commands.

## 3. Create your first page

In your text editor, create a new file in your directory at `src/pages/index.astro`. This will be your first Astro page in the project.

For this guide, copy-and-paste the following code snippet (including `---` dashes) into your new file:

```astro title="src/pages/index.astro"
---
// Welcome to Astro! Everything between these triple-dash code fences
// is your "component front matter". It never runs in the browser.
console.log('This runs in your terminal, not the browser!');
---
<!-- Below is your "component template." It's just HTML, but with
     some magic sprinkled in to help you build great templates. -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

## 4. Create your first static asset

You will also want to create a `public/` directory to store your static assets. Astro will always include these assets in your final build, so you can safely reference them from inside your component templates.

In your text editor, create a new file in your directory at `public/robots.txt`. `robots.txt` is a simple file that most sites will include to tell search bots like Google how to treat your site.

For this guide, copy-and-paste the following code snippet into your new file:

```diff title="public/robots.txt"
# Example: Allow all bots to scan and index your site.
# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

## 5. Create `astro.config.mjs`

Astro is configured using `astro.config.mjs`. This file is optional if you do not need to configure Astro, but you may wish to create it now.

Create `astro.config.mjs` at the root of your project, and copy the code below into it:

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});
```

If you want to include [UI framework components](/en/core-concepts/framework-components/) such as React, Svelte, etc. or use other tools such as Tailwind or Partytown in your project, here is where you will [manually import and configure integrations](/en/guides/integrations-guide/).

📚 Read Astro's [API configuration reference](/en/reference/configuration-reference/) for more information.

## 6. Next Steps

If you have followed the steps above, your project directory should now look like this:

```
├── node_modules/
├── src/
│   └── pages/
│   │   └── index.astro
├── public/
│   ├── robots.txt
├── astro.config.mjs
├── package.json
└── package-lock.json (or: yarn.lock, pnpm-lock.yaml, etc.)
```

Congratulations, you're now set up to use Astro!

If you followed this guide completely, you can jump directly to [Step 2: Start Astro](/en/install/auto/#2-start-astro-) to continue and learn how to run Astro for the first time.

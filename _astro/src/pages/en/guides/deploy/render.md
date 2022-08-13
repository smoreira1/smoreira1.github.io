---
title: Deploy your Astro Site to Render
description: How to deploy your Astro site to the web using Render.
layout: ~/layouts/DeployGuideLayout.astro
i18nReady: true
---

You can deploy your Astro project to [Render](https://render.com/), a service to build websites with free TLS certificates, a global CDN, DDoS protection, private networks, and auto deploys from Git.

## How to deploy

1. Create a [render.com account](https://dashboard.render.com/) and sign in
2. Click the **New +** button from your dashboard and select **Static Site**
3. Connect your [GitHub](https://github.com/) or [GitLab](https://about.gitlab.com/) repository or alternatively enter the public URL of a public repository
4. Give your website a name, select the branch and specify the build command and publish directory
   - **build command:** `npm run build`
   - **publish directory:** `dist`
5. Click the **Create Static Site** button

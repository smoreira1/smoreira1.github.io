---
layout: ~/layouts/MainLayout.astro
setup: |
  import Badge from '~/components/Badge.astro';
title: Configuração do Editor
description: Configure seu editor para desenvolver com Astro.
i18nReady: true
---

Customize seu editor de código para melhorar a sua experiência de desenvolvimento com Astro e desfrute de novas funcionalidades.

## VS Code

[VS Code](https://code.visualstudio.com) é um popular editor de código para desenvolvedores web, feito pela Microsoft. O motor do VS Code também viabiliza editores de código populares no navegador como o [GitHub Codespaces](https://github.com/features/codespaces) e o [Gitpod](https://gitpod.io).

Astro funciona com qualquer editor de código. Porém, VS Code é o nosso editor recomendado para projetos Astro. Nós mantemos uma [extensão Astro oficial para VS Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) que permite desfrutar de várias funcionalidades-chave e melhorias na experiência do desenvolvedor em projetos Astro.

- Syntax highlighting para arquivos `.astro`.
- Informação de tipos do TypeScript para arquivos `.astro`.
- [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense) para acabamento de código, dicas e mais.

Para começar, instale a [extensão Astro para VS Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) hoje.

📚 Veja como [configurar TypeScript](/pt-br/guides/typescript/) em seu projeto Astro.

## Outros Editores de Código

Nossa espetacular comunidade mantém várias extensões para outros editores populares, incluindo:

- [Extensão para VS Code na Open VSX](https://open-vsx.org/extension/astro-build/astro-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Oficial</Badge></span> - A extensão oficial do Astro para VS Code, disponível no registro Open VSX para plataformas abertas como [VSCodium](https://vscodium.com/)
- [Extensão para Nova](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.astro/)<span style="margin: 0.25em;"><Badge variant="neutral">Comunidade</Badge></span> - Syntax highlighting, IntelliSense e autocompletação para Astro

## Editores no Navegador

Em adição a editores locais, Astro também funciona bem em editores hospedados no navegador, incluindo:

- [StackBlitz](https://stackblitz.com) e [CodeSandbox](https://codesandbox.io) - editores online que rodam no seu navegador, com syntax highlight por padrão para arquivos `.astro`. Sem instalação ou configuração necessária!
- [GitHub.dev](https://github.dev) - permite que você instale a extensão Astro para VS Code como uma [extensão web](https://code.visualstudio.com/api/extension-guides/web-extensions), que te dá acesso a somente algumas das funcionalidades da extensão completa. Atualmente, apenas o syntax highlight é suportado.
- [Gitpod](https://gitpod.io) - um completo ambiente de desenvolvimento na nuvem em que se pode instalar a extensão oficial Astro para VS Code pela Open VSX.

## Outras ferramentas

### ESLint

[ESLint](https://eslint.org/) é um popular linter para JavaScript e JSX. Para suporte com o Astro, [um plugin mantido pela comunidade](https://github.com/ota-meshi/eslint-plugin-astro) pode ser instalado.

Veja [o Guia de Usuário do projeto](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) para mais informações em como instalar e configurar o ESLint para seu projeto.

### Prettier

[Prettier](https://prettier.io/) é um popular formatador para JavaScript, HTML, CSS e mais. Para adicionar suporte para formatação de arquivos `.astro`, utilize [o plugin oficial do Prettier para Astro](https://github.com/withastro/prettier-plugin-astro).

Para começar, primeiro instale Prettier e o plugin:

```shell
npm install --save-dev prettier prettier-plugin-astro
```

Prettier irá automaticamente detectar o plugin e usá-lo para processar arquivos `.astro` quando você executá-lo:

```shell
prettier --write .
```

Veja o [README do plugin do Prettier](https://github.com/withastro/prettier-plugin-astro/blob/main/README.md) para mais informações sobre as opções suportadas, como configurar o Prettier dentro do VS Code, e mais.

:::caution[Usando com pnpm]
Por conta de problemas de upstream dentro do Prettier, o plugin não será automaticamente detectado quando estiver usando [pnpm](https://pnpm.io/). Para que o plugin seja encontrado, o seguinte parâmetro precisa ser adicionado ao executar Prettier:

```shell
prettier --write --plugin-search-dir=. .
```

Configurações adicionais também são necessárias quando se utilizar Prettier dentro do VS Code. Veja o README do plugin para mais informações.
:::

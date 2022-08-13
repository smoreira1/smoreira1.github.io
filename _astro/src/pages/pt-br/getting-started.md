---
setup: |
    import Button from '../../components/Button.astro'
    import ContributorList from '../../components/ContributorList.astro'
    import PackageManagerTabs from '~/components/tabs/PackageManagerTabs.astro'
layout: ~/layouts/MainLayout.astro
title: Introdução
description: Uma básica introdução ao Astro.
i18nReady: true
---

#### O que é Astro?

Astro é um **framework web** **tudo em um** para criação de websites **rápidos**, **focados em conteúdo**.

#### Funcionalidades Principais

- **Ilhas de Componente:** Uma nova arquitetura web para construção de websites rápidos.
- **API feita com o servidor em primeiro lugar:** Mova a hidratação pesada para fora do dispositivos dos seus usuários.
- **Zero JS, por padrão:** Nenhum overhead de runtime JavaScript te desacelerando.
- **Pronto para a Edge:** Faça deploy em qualquer lugar, até mesmo em um runtime edge global como Deno ou Cloudflare.
- **Customizável:** Tailwind, MDX e +100 outras integrações para escolher.
- **UI agnóstica:** Suporta React, Preact, Svelte, Vue, Solid, Lit e mais.

Veja o nosso guia detalhado [Por que Astro?](/pt-br/concepts/why-astro/) para aprender mais sobre o que faz Astro especial. ✨

## Experimente Astro no seu navegador

Visite [astro.new](https://astro.new/) e escolha entre uma variedade de templates para começar. Se divirta com uma versão completa e funcional do Astro direto do seu navegador!

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <Button href="https://astro.new/basics?on=stackblitz">Início rápido!</Button>
    <Button variant="outline" href="https://astro.new/">Veja todos os templates →</Button>
</div>

## Comece seu primeiro projeto

Tenha um novo projeto Astro rodando localmente com o nosso útil assistente de linha de comando `create-astro`!

<PackageManagerTabs>
  <Fragment slot="npm">
  ```shell
  # crie um novo projeto com o npm
  npm create astro@latest
  ```
  </Fragment>
  <Fragment slot="pnpm">
  ```shell
  # crie um novo projeto com o pnpm
  pnpm create astro@latest
  ```
  </Fragment>
  <Fragment slot="yarn">
  ```shell
  # crie um novo projeto com o yarn
  yarn create astro
  ```
  </Fragment>
</PackageManagerTabs>

Nosso [Guia de Instalação](/pt-br/install/auto/) tem instruções detalhadas passo-a-passo de como instalar Astro com seu gerenciador de pacotes favorito.


## Aprenda Astro

Veja exemplos de alguns dos conceitos-chave e padrões de um site Astro!

📚 [Adicione sua primeira página](/pt-br/core-concepts/astro-pages/) no seu site.

📚 Leia mais sobre a [estrutura de projetos](/pt-br/core-concepts/project-structure/) do Astro.

📚 Aprenda mais sobre o [roteamento baseado em arquivos](/pt-br/core-concepts/routing/) do Astro.

*... encontre a documentação completa da API na aba **Referência**.*


## Estenda Astro

🧰 Comece o seu próximo projeto com um [tema pré-construído](https://astro.build/themes).

🧰 Customize seu site com [plugins e componentes](https://astro.build/integrations/) da comunidade.

🧰 Se inspire visitando nossa [galeria de sites](https://astro.build/showcase).

*... veja nosso [guia em como utilizar integrações](/pt-br/guides/integrations-guide/)*.



## Junte-se a comunidade

Junte-se a nós no [Discord do Astro](https://astro.build/chat) para compartilhar e conseguir ajuda de uma comunidade ativa e amigável!

💬 Diga oi no canal `#introduce-yourself`!

💬 Pergunte a nossa Equipe de Suporte no canal `#support-threads`!

💬 Compartilhe o que você tem feito no canal `#showcase`!


## Aprenda Mais

[Blog do Astro](https://astro.build/blog/)

[Histórico de alterações do Astro](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md)

[Guia de Migração do Astro](/pt-br/migrate/)


## Contribua

Essa documentação é trazida até você por todas essas pessoas colaborativas. [Junte-se a nós no GitHub!](https://github.com/withastro/docs)

<ContributorList githubRepo="withastro/docs" />

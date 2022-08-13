---
layout: ~/layouts/MainLayout.astro
title: Componentes
description: Uma introdução à sintaxe de componentes .astro.
i18nReady: true
---

**Componentes Astro** são parte fundamental de qualquer projeto Astro. São componentes de template com apenas HTML e sem execução no lado do cliente.

A sintaxe de um componente Astro é um superset de HTML. A sintaxe foi [projetada para parecer familiar a qualquer um com experiência em escrever HTML ou JSX](/pt-br/comparing-astro-vs-other-tools/#astro-vs-jsx) e adiciona suporte para a inclusão de componentes e expressões JavaScript. Você pode localizar um componente Astro por sua extensão de arquivo: `.astro`.

Componentes Astro são extremamente flexíveis. Geralmente, um componente Astro irá conter alguma **UI reutilizável na página**, como um cabeçalho ou um cartão de perfil. Outras vezes, um componente Astro pode conter um pequeno pedaço de HTML, como uma coleção de tags `<meta>` comuns que facilitam trabalhar com SEO. Componentes Astro também pode conter o layout inteiro de uma página.

A coisa mais importante de entender sobre componentes Astro é que eles vão **renderizar HTML durante sua build**. Mesmo que você execute código JavaScript dentro dos seus componentes, tudo será executado previamente e então removido da página final que você envia aos seus usuários. O resultado é um site mais rápido, com nenhum JavaScript por padrão.

## Visão Geral sobre Componentes

Um componente Astro é feito de duas partes principais: o **Script do Componente** e o **Template do Componente**. Cada parte executa um trabalho diferente, porém juntos eles pretendem providenciar um framework que é ao mesmo tempo fácil de utilizar e expressivo o suficiente para lidar com qualquer que seja o que você deseja construir.

```astro
---
// Script do Componente (JavaScript)
---
<!-- Template do Componente (HTML + Expressões do JS) -->
```

Você pode utilizar componentes dentro de outros componentes, criando UIs cada vez mais avançadas. Por exemplo, um componente `Botao` pode ser utilizado para criar um componente `GrupoBotoes` assim:

```astro
---
// Exemplo: GrupoBotoes.astro
import Botao from './Botao.astro';
---
<div>
  <Botao titulo="Botão 1" />
  <Botao titulo="Botão 2" />
  <Botao titulo="Botão 3" />
</div>
```


### O Script do Componente

Astro utiliza uma cerca de código (`---`) para identificar o script do seu componente Astro. Se você já escreveu Markdown antes, você já deve estar familiar com um conceito similar chamado de *frontmatter*. A ideia do Astro de um script do componente foi diretamente inspirado por este conceito.

Você pode utilizar o script do componente para escrever qualquer código JavaScript necessário para renderizar o seu template. Isso pode incluir:

- Importar outros componentes Astro
- Importar componentes de outros frameworks, como React
- Importar dados, como um arquivo JSON
- Buscar conteúdo de uma API ou banco de dados
- Criar variáveis que você vai referenciar no seu template

```astro
---
// Nota: Importações tem que estar no topo do seu arquivo.
import UmComponenteAstro from '../components/UmComponenteAstro.astro';
import UmComponenteReact from '../components/UmComponenteReact';
import algunsDados from '../dados/pokemon.json';

// Acesse props passadas ao componente, como `<X titulo="Olá, Mundo!" />`
const { titulo } = Astro.props;
// Busque dados externos, até mesmo de uma API privada ou banco de dados
const dados = await fetch('ALGUMA_URL_SECRETA_API/usuarios').then(r => r.json());
---
<!-- Seu template está aqui! -->
```

A cerca de código é projetada para garantir que o JavaScript que você escreve nela está "cercado". Ele não irá escapar para a sua aplicação frontend ou cair na mão dos seus usuários. Você pode com segurança escrever aqui código que é custoso ou sensível (como uma chamada ao seu banco de dados privado) sem se preocupar com ele cair no navegador do seu usuário.

:::tip
Você até mesmo pode escrever TypeScript no script do componente!
:::

### O Template do Componente

Abaixo do script do componente, reside o template do componente. O template do componente decide o HTML que irá sair do seu componente.

Se você escrever puro HTML aqui, o seu componente irá renderizar esse HTML em qualquer página Astro em que é importado e utilizado.

Porém, a sintaxe do template do script do Astro também suporta **expressões JavaScript**, **componentes importados** e [**diretivas especiais do Astro**](/pt-br/reference/directives-reference/). Dados e valores definidos (em tempo de build da página) no script de componente podem ser utilizados no template do script para produzir HTML criado dinamicamente.

```astro
---
// O script do seu componente está aqui!
import ComponentePokemonReact from '../components/ComponentePokemonReact';
const meuPokemonFavorito = [/* ... */];
---
<!-- comentários HTML são suportados! -->

<h1>Olá, mundo!</h1>

<!-- Use props e outras variáveis do script do componente: -->
<p>Meu pokemon favorito é: {Astro.props.titulo}</p>

<!-- Inclua outros componentes com a diretiva `client:` para hidratá-los: -->
<ComponentePokemonReact client:visible />

<!-- Misture HTML com expressões JavaScript, similar ao JSX: -->
<ul>
  {meuPokemonFavorito.map((dados) => <li>{dados.nome}</li>)}
<ul>

<!-- Use uma diretiva de template para inserir uma string de HTML não-escapada dentro de um elemento: -->
<p set:html={stringHtmlBruta} />
```

### Expressões JSX

Você pode definir variáveis JavaScript locais dentro do frontmatter do script do componente em um componente Astro. Você pode então injetar essas variáveis no template HTML do componente utilizando expressões JSX!

Componentes Astro podem definir variáveis locais dentro do frontmatter do script do componente. Quaisquer variáveis do script são então automaticamente disponibilizadas no HTML do template do componente abaixo.

#### Variáveis

Variáveis locais podem ser adicionadas ao HTML utilizando a sintaxe de chaves:

```astro
---
const nome = "Astro";
---
<div>
  <h1>Olá {nome}!</h1>  <!-- Resulta em <h1>Olá Astro!</h1> -->
</div>
```

#### Atributos Dinâmicos

Variáveis locais podem ser utilizadas entre chaves para passar valores para ambos atributos de elementos HTML e componentes:

```astro
---
const nome = "Astro";
---
<h1 class={nome}>Expressões em atributos são suportadas</h1>

<MeuComponente templateAtributoLiteralNome={`MeuNomeÉ${nome}`} />
```

#### HTML Dinâmico

Variáveis locais podem ser utilizadas como funções similares a JSX para gerar elementos HTML dinamicamente:

```astro
---
const itens = ["Cachorro", "Gato", "Ornitorrinco"];
---
<ul>
  {itens.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragmentos & Múltiplos Elementos

O template de um componente Astro pode renderizar múltiplos elementos sem a necessidade de envolver tudo em uma `<div>` ou `<>`, diferente do JavaScript ou JSX.

```astro
---
// Template com múltiplos elementos
---
<p>Sem necessidade de envolver os elementos em um único elemento de contenção.</p>
<p>Astro suporta múltiplos elementos raiz em um template.</p>
```

Porém, quando estiver usando uma expressão para dinamicamente criar múltiplos elementos, você deve envolver esses elementos dentro de um **fragmento** assim como você faria no JavaScript ou JSX. Astro permite que você utilize `<Fragment> </Fragment>` ou a forma abreviada `<> </>`.

```astro
---
const itens = ["Cachorro", "Gato", "Ornitorrinco"];
---
<ul>
  {itens.map((item) => (
    <>
      <li>{item} Vermelho</li>
      <li>{item} Azul</li>
      <li>{item} Verde</li>
    </>
  ))}
</ul>
```

Fragmentos também podem ser úteis para evitar elementos de invólucro quando se for adicionar [diretivas `set:*`](/pt-br/reference/directives-reference/#sethtml), como no exemplo a seguir:

```astro
---
const stringHtml = '<p>Conteúdo HTML bruto</p>';
---
<Fragment set:html={stringHtml} />
```

### Props do Componente

Um componente Astro pode definir e aceitar props. Essas props então se tornam disponíveis ao template do componente para renderizar HTML. Props estão disponíveis na global `Astro.props` no script do frontmatter.

Aqui está um exemplo de um componente que recebe uma prop `saudacao` e uma prop `nome`. Note que as props a serem recebidas são desconstruídas a partir do objeto global `Astro.props`.

```astro
---
// Exemplo: TituloSaudacao.astro
// Uso: <TituloSaudacao saudacao="Salve" nome="Parceiro" />
const { saudacao, nome } = Astro.props
---
<h2>{saudacao}, {nome}!</h2>
```

Você também pode definir suas props com TypeScript, exportando uma interface de tipo `Props`. Astro vai automaticamente pegar qualquer interface `Props` exportada e dar avisos/erros de tipagem para o seu projeto. Estas props também podem dar valores padrão quando desconstruídas de `Astro.props`.

```astro
---
// src/components/TituloSaudacao.astro
export interface Props {
  nome: string;
  saudacao?: string;
}

const { saudacao = "Olá", nome } = Astro.props as Props;
---
<h2>{saudacao}, {nome}!</h2>
```

Esse componente, quando importado e renderizado em outros componentes Astro, layouts ou páginas, pode passar essas props como atributos:

```astro
---
// src/components/CartaoSaudacoes.astro
import TituloSaudacao from './TituloSaudacao.astro';
const nome = "Astro"
---
<h1>Cartão de Saudações</h1>
<TituloSaudacao saudacao="Oi" nome={nome} />
<p>Espero que você tenha um ótimo dia!</p>
```

### Slots

O elemento `<slot />` é um placeholder para conteúdo HTML externo, permitindo que você injete elementos-filho de outros arquivos no template do seu componente.

Por padrão, todos os elementos-filho passados para o componente serão renderizados em seu `<slot />`.

:::note
Diferente de _props_, que são atributos passados para um componente Astro, disponível para uso dentro de si com `Astro.props()`, _slots_ renderizam elementos HTML filho aonde eles estão escritos.
:::

```astro
---
// src/components/Involucro.astro
import Cabecalho from './Cabecalho.astro';
import Logo from './Logo.astro';
import Rodape from './Rodape.astro';

const { titulo } = Astro.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <Logo />
  <h1>{titulo}</h1>
  <slot />  <!-- filhos irão para cá -->
  <Rodape />
</div>
```

```astro
---
// src/pages/fred.astro
import Involucro from '../components/Involucro.astro';
---
<Involucro titulo="Página do Fred">
  <h2>Tudo sobre Fred</h2>
  <p>Aqui estão algumas coisas sobre Fred.</p>
</Involucro>
```

Este padrão é a base de um componente de layout Astro: uma página inteira de conteúdo HTML pode ser "envolta" com tags `<Layout></Layout>` e enviadas até o componente Layout para ser renderizada dentro de elementos comuns da página.

#### Slots Nomeados

Um componente Astro também pode ter slots nomeados. Isto permite que você passe apenas elementos HTML com o nome de slot correspondente até a localização do slot.

```astro
---
// src/components/Wrapper.astro
import Cabecalho from './Cabecalho.astro';
import Logo from './Logo.astro';
import Rodape from './Rodape.astro';

const { titulo } = Astro.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <slot name="depois-do-cabecalho"/>  <!--  filhos com o atributo `slot="depois-do-cabecalho"` irão para cá -->
  <Logo />
  <h1>{titulo}</h1>
  <slot />  <!--  filhos sem um atributo `slot`, ou com `slot="default"` irão para cá -->
  <Rodape />
  <slot name="depois-do-rodape"/>  <!--  filhos com o atributo `slot="depois-do-rodape"` irão para cá -->
</div>
```

```astro
---
// src/pages/fred.astro
import Involucro from '../components/Involucro.astro';
---
<Involucro title="Página do Fred">
  <img src="https://minha.foto/fred.jpg" slot="depois-do-cabecalho">
  <h2>Tudo sobre Fred</h2>
  <p>Aqui estão algumas coisas sobre Fred.</p>
  <p slot="depois-do-rodape">Copyright 2022</p>
</Involucro>
```

Use um atributo `slot="meu-slot"` no elemento filho que você quer passar através de um correspondente placeholder `<slot name="meu-slot"/>` no seu componente.

:::tip
Slots nomeados também podem ser passados para [componentes de frameworks de UI](/pt-br/core-concepts/framework-components/)!
:::

#### Conteúdo de Fallback para Slots

Slots também podem renderizar **conteúdo de fallback**. Quando não tem filhos correspondentes passados a um slot, um elemento `<slot />` irá renderizar o seu próprio filho placeholder.

```astro
---
// src/components/Involucro.astro
import Cabecalho from './Cabecalho.astro';
import Logo from './Logo.astro';
import Rodape from './Rodape.astro';

const { titulo } = Astro.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <Logo />
  <h1>{titulo}</h1>
  <slot>
    <p>Esse é o meu conteúdo de fallback se nenhum filho for passado ao slot</p>
  </slot>
  <Rodape />
</div>
```

### Estilos CSS

Tags de `<style>` CSS também são suportadas dentro do template do componente.

Elas podem ser utilizadas para estilizar seus componentes, e todas as regras de estilos são automaticamente fechadas ao escopo do próprio componente para prevenir conflitos de CSS em aplicações grandes.

```astro
---
// O script do seu componente está aqui!
---
<style>
  /* Fechado ao escopo do componente, outros H1s na página continuam os mesmos */
  h1 { color: red }
</style>

<h1>Olá, mundo!</h1>
```

:::caution
Os estilos definidos aqui se aplicam apenas ao conteúdo escrito diretamente no próprio template do componente. Filhos e componentes importados **não** serão estilizados por padrão.
:::

📚 Veja nosso [Guia de Estilização](/pt-br/guides/styling/) para mais informação em como aplicar estilos.

### Scripts no Lado do Cliente

Para enviar JavaScript ao navegador sem [usar um componente de framework](/pt-br/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) ou uma [integração Astro](https://astro.build/integrations/) (e.x. astro-XElement), você pode utilizar a tag `<script>` no template do seu componente Astro e enviar JavaScript ao navegador que é executado no escopo global.

Por padrão, tags `<script>` são processadas por Astro.

- Qualquer importação será empacotada, permitindo-o de importar arquivos locais ou módulos Node.
- O script processado será injetado no `<head>` de sua página com o atributo [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- Se o seu componente é utilizado várias vezes na mesma página, a tag de script será incluída apenas uma vez

:::caution
Atualmente você não pode escrever código TypeScript em scripts do lado do cliente, mas você _pode_ importar um arquivo TypeScript se preferir escrever com essa sintaxe.
:::

```astro
<script>
  // Processado! Passou por bundle! Importações ESM funcionam, até mesmo para pacotes npm.
</script>
```

Para evitar que o script passe por bundle, você pode usar o atributo `is:inline`.

```astro
<script is:inline>
  // Será renderizado no HTML exatamente como escrito!
  // Importações ESM não serão resolvidos relativamente ao arquivo.
</script>
```

Múltiplas tags `<script>` podem ser usadas no mesmo arquivo `.astro` combinando os métodos acima.

:::note
Adicionar `type="module"` ou qualquer outro atributo em uma tag `<script>` irá desabilitar o comportamento padrão de bundling do Astro, tratando a tag como se houvesse a diretiva `is:inline`.
:::

📚 Veja nossa página de [referência de diretivas](/pt-br/reference/directives-reference/#diretivas-de-script-e-estilização) para mais informação sobre as diretivas disponíveis em tags `<script>`.

#### Carregando Scripts Externos

**Quando utilizar isso:** Se o seu arquivo está dentro de `public/`.

Note que esta abordagem pula o processamento, empacotamento e otimização do JavaScript que é providenciado pelo Astro quando você usa o método `import` descrito abaixo.

```astro
// caminho absoluto da URL
<script is:inline src="/algum-script-externo.js"></script>
```
#### Usando Scripts Hoisted

**Quando utilizar isso:** Se o seu script externo está dentro de `src/` _e_ ele suporta módulos do tipo ESM.

Astro detecta estas importações de JavaScript no lado do cliente e então faz build, otimiza e adiciona o JS a página automaticamente.

```astro
// Importação ESM
<script>
  import './algum-script-externo.js';
</script>
```


## Próximos Passos

📚 Leia sobre os [componentes internos do Astro](/pt-br/reference/api-reference/#componentes-integrados).

📚 Aprenda sobre como utilizar [componentes de frameworks JavaScript](/pt-br/core-concepts/framework-components/) em seu projeto Astro.

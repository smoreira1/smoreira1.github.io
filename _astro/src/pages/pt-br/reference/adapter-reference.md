---
layout: ~/layouts/MainLayout.astro
title: API de Adaptadores do Astro
i18nReady: true
---

Astro foi projetado para ser fácil realizar deploy em qualquer provedor da nuvem para SSR (renderização no lado do servidor). Essa habilidade é providenciada por __adaptadores__, que são [integrações](/pt-br/reference/integrations-reference/).

## O que é um adaptador

Um adaptador é um tipo especial de [integração](/pt-br/reference/integrations-reference/) que providencia um ponto de entrada para a renderização no lado do servidor. Um adaptador faz duas coisas:

- Implementa APIs específicas de uma hospedagem para lidar com requisições.
- Configura a construção final de acordo com as convenções da hospedagem.

## Construindo um Adaptador

Um adaptador é uma [integração](/pt-br/reference/integrations-reference/) e pode fazer tudo que uma integração pode.

Um adaptador __deve__ chamar a API `setAdapter` no hook `astro:config:done` assim:

```js
export default function createIntegration() {
  return {
    name: '@matthewp/meu-adaptador',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@matthewp/meu-adaptador',
          serverEntrypoint: '@matthewp/meu-adaptador/server.js'
        });
      },
    },
  };
}
```

O objeto passado para `setAdapter` é definido como:

```ts
interface AstroAdapter {
	name: string;
	serverEntrypoint?: string;
	exports?: string[];
}
```

As propriedades são:

* __name__: Um nome único para seu adaptador, usado em logs.
* __serverEntrypoint__: O ponto de entrada para renderização no lado do servidor.
* __exports__: Um array de exportações nomeadas quando utilizado em conjunto com `createExports` (explicado abaixo).

### Ponto de Entrada do Servidor

A API de adaptadores do Astro tenta trabalhar com qualquer tipo de hospedagem e dá uma forma flexível de se adequar com as APIs da hospedagem.

#### Exportações

Algumas hospedagens serverless esperam que você exporte uma função, como `handler`:

```js
export function handler(evento, contexto) {
  // ...
}
```

Com a API de adaptadores você alcança isso implementando `createExports` em seu `serverEntrypoint`:

```js
import { App } from 'astro/app';

export function createExports(manifesto) {
  const app = new App(manifesto);

  const handler = (evento, contexto) => {
    // ...
  };

  return { handler };
}
```

E então em sua integração, quando você chamar `setAdapter`, providencie o nome em `exports`:

```diff
export default function createIntegration() {
  return {
    name: '@matthewp/meu-adaptador',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@matthewp/meu-adaptador',
          serverEntrypoint: '@matthewp/meu-adaptador/server.js',
+         exports: ['handler'],
        });
      },
    },
  };
}
```

#### Iniciar

Algumas hospedagens esperam que você **inicie** o servidor por si mesmo, por exemplo, observando uma porta. Para esses tipos de hospedagens, a API de adaptadores permite que você exporte uma função `start` que será chamado quando o script de construção é executado.

```js
import { App } from 'astro/app';

export function start(manifesto) {
  const app = new App(manifesto);

  addEventListener('fetch', evento => {
    // ...
  });
}
```

#### `astro/app`

Este módulo é utilizado para renderizar páginas que foram pré-construídas através de `astro build`. Astro utiliza os objetos padrões [Request](https://developer.mozilla.org/pt-BR/docs/Web/API/Request) e [Response](https://developer.mozilla.org/pt-BR/docs/Web/API/Response). Hospedagens que têm uma API diferente para requisições/respostas devem ser convertidos para estes tipos em seus adaptadores.

```js
import { App } from 'astro/app';
import http from 'http';

export function start(manifesto) {
  const app = new App(manifesto);

  addEventListener('fetch', evento => {
    evento.respondWith(
      app.render(evento.request)
    );
  });
}
```

Os métodos a seguir são fornecidos:

##### `app.render(requisicao)`

Este método chama a página Astro que corresponde a requisição, a renderiza e retorna uma Promise a um objeto [Response](https://developer.mozilla.org/pt-BR/docs/Web/API/Response). Isso também funciona para rotas de API, que não renderizam páginas.

```js
const resposta = await app.render(requisicao);
```

##### `app.match(requisicao)`

Este método é utilizado para determinar se uma requisição é correspondida pelas regras de roteamento da aplicação Astro.

```js
if(app.match(requisicao)) {
  const resposta = await app.render(requisicao);
}
```

Você geralmente pode  chamar `app.render(requisicao)` sem utilizar `.match` pois Astro lida com 404s se você providenciar um arquivo `404.astro`. Utilize `app.match(requisicao)` se você quiser lidar com 404s de forma diferente.

## Permitindo instalação via `astro add`

[O comando `astro add`](/pt-br/reference/cli-reference/#astro-add) permite que usuários facilmente adicionem integrações e adaptadores em seus projetos. Se você quiser que _seu_ adaptador seja instalável com essa ferramenta, **adicione `astro-adapter` no campo `keywords` do seu `package.json`**:

```json
{
  "name": "exemplo",
  "keywords": ["astro-adapter"],
}
```

Assim que você [publicar seu adaptador no npm](https://docs.npmjs.com/cli/v8/commands/npm-publish), executar `astro add exemplo` irá instalar seu pacote com quaisquer dependências de pares especificadas em seu `package.json`. Nós também iremos instruir usuários a atualizarem a configuração de seus projetos manualmente.

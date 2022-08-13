---
layout: ~/layouts/MainLayout.astro
title: Configuración de Astro
i18nReady: true
---

Personalice cómo funciona Astro agregando un archivo `astro.config.mjs` en tu proyecto. Este es un archivo común en todos los proyectos de Astro; todos los ejemplos oficiales, sean plantillas o temas, cuentan con uno de forma predeterminada.

📚 Lee la [referencia de configuración](/es/reference/configuration-reference/) de Astro para obtener una descripción general y completa de todas las opciones de configuración.

## Archivo de configuración de Astro

Un archivo de configuración de Astro válido exporta la configuración usando la exportación `default`, además recomendamos usar `defineConfig` para definir la configuración de una manera más fácil.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  // sus opciones de configuración van aquí...
  // https://docs.astro.build/es/reference/configuration-reference/
})
```

Se recomienda usar `defineConfig()` para sugerencias de tipos automáticas en su IDE, pero también es opcional. Un archivo de configuración absolutamente mínimo y válido se vería así:

```js
// Ejemplo: Archivo de configuración mínimo y vacío
export default {}
```

## Tipos de archivo de configuración compatibles

Astro es compatible con varios formatos para el archivo de configuración de JavaScript como: `astro.config.js`, `astro.config.mjs`, `astro.config.cjs` y `astro.config.ts`.

La carga del archivo de configuración de TypeScript se maneja usando [`tsm`](https://github.com/lukeed/tsm) el cual respetará las opciones de tsconfig de su proyecto.

## Resolución del archivo de configuración

Astro intentará resolver automáticamente el archivo de configuración llamado `astro.config.mjs` dentro de la raíz del proyecto. Si no se encuentra ningún archivo de configuración en la raíz de su proyecto, se utilizarán las opciones predeterminadas de Astro.

```bash
# Ejemplo: Lee la configuración desde ./astro.config.mjs
astro build
```

Puedes configurar explícitamente un archivo de configuración usando el indicador CLI `--config`. Este indicador CLI siempre se resuelve en relación a la carpeta de trabajo actual desde donde se ejecutó el comando CLI `astro`.

```bash
# Ejemplo: Lee la configuración de este archivo
astro build --config my-config-file.js
```

## Configurar Intellisense

Astro recomienda usar `defineConfig()` en tu archivo de configuración. `defineConfig()` proporciona IntelliSense automático para tu IDE. Los editores como VSCode pueden leer las definiciones de tipo TypeScript de Astro y proporcionar sugerencias de tipo jsdoc automáticas, incluso si tu archivo de configuración no está escrito en TypeScript.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  // sus opciones de configuración van aquí...
  // https://docs.astro.build/es/reference/configuration-reference/
})
```

También puedes proporcionar definiciones de tipo manualmente a VSCode, utilizando la notación JSDoc:

```js
// astro.config.mjs
 export default /** @type {import('astro').AstroUserConfig} */ ({
  // sus opciones de configuración van aquí...
  // https://docs.astro.build/es/reference/configuration-reference/
}
```

## Referenciando archivos relativos

Si proporcionas una ruta relativa a `root` o el indicador de CLI `--root`, Astro lo resolverá desde la carpeta de trabajo actual donde ejecutó el comando CLI `astro`.

```js
export default defineConfig({
    // Se resuelve a la carpeta "./foo" con relación a la carpeta de trabajo actual
    root: 'foo'
})
```

Astro resolverá todos los archivos y carpetas relativos a la carpeta raíz del proyecto especificada en su archivo de configuración.

```js
export default defineConfig({
    // Se resuelve a la carpeta "./foo" con relación a la carpeta de trabajo actual
    root: 'foo',
    // Se resuelve a la carpeta "./foo/public" con relación a la carpeta de trabajo actual
    publicDir: 'public',
})
```

Para hacer referencia a un archivo o carpeta relativo al archivo de configuración, use `import.meta.url` (a menos que esté escribiendo un archivo common.js `astro.config.cjs`).

```js
export default defineConfig({
    // Se resuelve a la carpeta "./foo" con relación a este archivo de configuración
    root: new URL("./foo", import.meta.url),
    // Se resuelve a la carpeta "./public" con relación a este archivo de configuración
    publicDir: new URL("./public", import.meta.url),
})
```

## Personalización de nombres de archivos compilados

Para el código que procesa Astro, como archivos JavaScript o CSS importados, puedes personalizar los nombres de los archivos compilados usando [`entryFileNames`](https://rollupjs.org/guide/en/#outputentryfilenames), [`chunkFileNames`](https:/ /rollupjs.org/guide/en/#outputchunkfilenames) y [`assetFileNames`](https://rollupjs.org/guide/en/#outputassetfilenames) usando la configuración `vite.build.rollupOptions` en tu archivo `astro.config.*`.

```js
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        entryFileNames: 'entry.[hash].js',
        chunkFileNames: 'chunks/chunk.[hash].js',
        assetFileNames: 'assets/asset.[hash][extname]',
      },
    },
  },
})
```

Esto puede ser útil si tienes scripts con nombres que podrían verse afectados por los bloqueadores de anuncios (por ejemplo, `ads.js` o `google-tag-manager.js`).

## Referencia de configuración

📚 Lee la [referencia de configuración](/es/reference/configuration-reference/) de Astro para obtener una descripción general y completa de todas las opciones de configuración.

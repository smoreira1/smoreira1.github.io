---
layout: ~/layouts/MainLayout.astro
title: CLI Reference
i18nReady: true
---

## Commands

### `astro dev`

Runs  Astro's `dev` server. It starts an HTTP server which responds to requests for routes or pages that are specified within `src/pages` directory (unless overridden by your `pages` option set in the project [configuration](/en/reference/configuration-reference/)).

**Flags**

#### `--port`

Specifies which port to run on. Defaults to `3000`.

#### `--host [optional host address]`

Sets which network IP addresses the dev server should listen on (i.e. non-localhost IPs).
- `--host` - listen on all addresses, including LAN and public addresses
- `--host [custom-address]` - expose on a network IP address at `[custom-address]`

### `astro build`

Builds your site for production.

### `astro preview`

Starts a local static file server to serve your built `dist/` directory. Useful for previewing your static build locally, before deploying it.

This command is meant for local testing only, and is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Astro Website](/en/guides/deploy/).

### `astro check`

Runs diagnostics (such as type-checking within `.astro` files) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.

This command is intended to be used in CI workflows.

:::note
This command only checks types within `.astro` files.  
:::

📚 Read more about [TypeScript support in Astro](/en/guides/typescript/).

### `astro add`

Adds an integration to your configuration.


### `astro docs`

Launches the Astro Docs website directly from the terminal.

### `astro telemetry`

Sets telemetry configuration for the current user. Telemetry is anonymous data that provides insights into which features are most often used.

Telemetry can be disabled with this CLI command:

```shell
astro telemetry disable
```

Telemetry can later be re-enabled with:

```shell
astro telemetry enable
```

The `clear` command resets the telemetry data:

```shell
astro telemetry clear
```

:::tip[Want to disable telemetry in CI environments?]
Make sure you add the `astro telemetry disable` command to your CI scripts.
:::

## Global Flags

### `--config path`

Specifies the path to the config file. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

```shell
astro --config config/astro.config.mjs dev
```

### `--root path`

Specifies the path to the project root. If not specified the current working directory is assumed to be the root.

The root is used for finding the Astro configuration file.

```shell
astro --root myRootFolder/myProjectFolder dev
```

### `--reload`

Clears the cache (dependencies are built within Astro apps).

### `--verbose`

Enables verbose logging, which is helpful when debugging an issue.

### `--silent`

Enables silent logging, which is helpful when you don't want to see Astro logs.

### `--version`

Prints the Astro version number and exits.

### `--drafts`

Includes Markdown draft pages in the build.

### `--help`

Prints the help message and exits.

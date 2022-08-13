# 🌐 <abbr title="internationalization">i18n</abbr> Guide

Thanks for your interest in helping us translate [docs.astro.build](https://docs.astro.build/)! This can be a great way to get involved with open source development without having to code.

## Getting involved

### How can I help translate one of the supported languages?
Translations all live in this GitHub repository. You can add and update them by creating a pull request. Read on to find out more!

### How can I find out what needs translating?
See our automated [Translation Status Overview issue](https://github.com/withastro/docs/issues/438) for a quick list of which pages are missing or need updating.


> **Warning**
> Please do not translate any pages without first checking their status in our [Overview Issue](https://github.com/withastro/docs/issues/438)! 
 
Not every page is marked as "ready to translate." So, even if you find a page that is not yet translated on the Docs site, you must confirm that it is on the list of available pages to translate. If the `.md` files does not contain `i18nReady: true` in its YAML frontmatter, do not translate the document.

You can read more about how pages are marked "ready for (initial) translating" and "needs updating" in [CONTRIBUTING.md](https://github.com/withastro/docs/blob/main/CONTRIBUTING.md).

### How can I participate in the conversation and decisions?
Discussion around translation currently takes place in [the Astro Discord](https://astro.build/chat). Everyone is welcome to participate! If you are interested in getting involved, please reach out to us in the `#docs-i18n` channel.

> Can’t access Discord? Please [open a new issue](https://github.com/withastro/docs/issues/new/choose) here on GitHub to ask any questions you may have.

## Languages for translation

Currently we are aiming to translate the Astro documentation into the following languages:

- Brazilian Portuguese
- Chinese (Simplified)
- English
- French
- German
- Japanese
- Spanish

### Why can Astro only support a few languages?

Supporting a language means that Astro takes responsibility for maintaining that language going forward. It’s not just a one-time translation, and it is not just a few pages. It is continuous and ongoing updates for both content and site design, maintaining complete versions of the docs in every supported language.

### How do you choose which languages to support?
1. Where our traffic comes from, and the user base we need to support
2. Availability of community members who can commit time to maintaining the translations

### What about unsupported languages?
The official docs will only contain supported languages for now, but we will be looking to add more officially supported languages as we grow.  If you would like to host translated docs yourself in another language, please let us know! We are happy to help you set this up and coordinate with future changes to the docs.

## Translation Structure

Generally speaking there are two kinds of content that we need to translate to internationalise the docs.

1. **Documentation pages** — explain how specific parts of Astro work
2. **UI text** — used to structure and label the user interface of many different pages

Each of these content types lives in a different place.

### 1. Documentation pages

Each documentation page lives in the [`src/pages`](../pages) directory of this <abbr title="repository">repo</abbr>. There you’ll find directories for all of the languages currently translated. Each page is a Markdown file to support rich text formatting. For example, the English language “Getting Started” page is at `src/pages/en/getting-started.md` and the same page in French is at `src/pages/fr/getting-started.md`.

### 2. UI text

UI text generally consists of relatively short bits of text used to label or structure components of the documentation UI. For example, our auto-generated table of contents has a heading that in English reads “On this page”. For other languages we need to translate this.

UI text lives in `src/i18n` with a folder for each language similar to how pages work. Unlike pages, these translations look more like a dictionary, mapping standard keys to translated strings. Each language should provide the following files:

- `nav.ts` — translates the labels for the navigation menu
- `ui.ts` — translates miscellaneous bits of text found around the docs
- `docsearch.ts` — translates the search component

See [`src/i18n/de`](de) for examples of these three files.

### How do I find the thing I want to translate?

If you spot something on [docs.astro.build](https://docs.astro.build/) that you want to translate or fix, here’s how to figure out where the content lives in this repo.

1. Is the text in the navigation menu (left sidebar on desktop, hamburger menu on mobile)?

    ➤ Go to `src/i18n/{language}/nav.ts`

2. Is the text in the search box or modal?

    ➤ Go to `src/i18n/{language}/docsearch.ts`

3. Is the text reused on several pages (e.g. right sidebar, article navigation, etc.)

    ➤ Go to `src/i18n/{language}/ui.ts`

4. Is the text specific to one page (page title, main content, etc.)?

    ➤ Go to `src/pages/{language}/{page-slug}.md`

## Contributing to translations

Please see [CONTRIBUTING.md](https://github.com/withastro/docs/blob/main/CONTRIBUTING.md) for information about contributing via a fork, our Style Guide, and more!
---

## Adding a new language

> 🛑 **Please don’t add a new language without first consulting with the docs team in [the `#docs-i18n` channel on Discord](https://astro.build/chat).**

### Prerequisites 

To get started adding a language, you’ll need:

1. **Its BCP 47 tag**

    Examples: `en` / `pt-BR` / `ar`
    
    This will be used for the HTML `lang` attribute and as the base for URLs for this language, e.g. `/{tag}/getting-started`. These tags can encode script-type and regions as well as language, but most often we will only need the language part unless we want to distinguish regional variants (as in the `pt-BR` example above).

    #### Resources
    
    - [Choosing a Language Tag](https://www.w3.org/International/questions/qa-choosing-language-tags) (in-depth guide)
    - [Subtag lookup web app](https://r12a.github.io/app-subtags/)
    - [IANA subtag registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)

2. **Its name as written in the language**

    Examples: `English` / `Português do Brasil` / `العربية`

    This will be used to label this language in the site’s language switcher and potentially elsewhere. The best way to get this is probably to ask the person leading translation work for this language.

### Scaffold files for a new language

To scaffold the basic files for a new language, use the `add-language` script from your terminal:

```bash
pnpm run add-language
```

The CLI will prompt you for a tag and name for the new language as described above. Follow the instructions and the wizard will create a basic set of files to get started translating that language.

Update the placeholder content in the newly created files, commit them, and away you go!

/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
  { text: "Welcome", header: true, type: "learn", key: "startHere" },
  { text: "About", slug: "getting-started", key: "getting-started" },
  { text: "Resume", slug: "install/auto", key: "install" },
  { text: "Signicant Works", slug: "editor-setup", key: "editor-setup" },
  { text: "Technology Stack", slug: "migrate", key: "migrate" },
  { text: "Technology History", slug: "migrate", key: "migrate" },
  { text: "Design Patterns", slug: "migrate", key: "migrate" },
  { text: "Resources", header: true, type: "learn", key: "basics" },
  { text: "Youtube", slug: "guides/deploy", key: "guides/deploy" },
  { text: "Twitter", slug: "guides/deploy", key: "guides/deploy" },
  {
    text: "Icon Assets",
    slug: "core-concepts/project-structure",
    key: "core-concepts/project-structure",
  },

  { text: "Projects", header: true, type: "learn", key: "features" },
  {
    text: "Starlight",
    slug: "guides/configuring-astro",
    key: "guides/configuring-astro",
  },
  { text: "Reference", header: true, type: "api", key: "reference" },
  {
    text: "Configuration",
    slug: "reference/configuration-reference",
    key: "reference/configuration-reference",
  },
  {
    text: "CLI",
    slug: "reference/cli-reference",
    key: "reference/cli-reference",
  },
  {
    text: "Runtime API",
    slug: "reference/api-reference",
    key: "reference/api-reference",
  },
  {
    text: "Integrations API",
    slug: "reference/integrations-reference",
    key: "reference/integrations-reference",
  },
  {
    text: "Adapter API",
    slug: "reference/adapter-reference",
    key: "reference/adapter-reference",
  },
  {
    text: "Template Directives",
    slug: "reference/directives-reference",
    key: "reference/directives-reference",
  },
  {
    text: "NPM Package Format",
    slug: "guides/publish-to-npm",
    key: "guides/publish-to-npm",
  },
  { text: "Tips", header: true, type: "learn", key: "coreConcepts" },
  { text: "Angular", slug: "concepts/why-astro", key: "concepts/why-astro" },
  { text: "TypeScript", slug: "concepts/why-astro", key: "concepts/why-astro" },
  { text: "CSS", slug: "concepts/why-astro", key: "concepts/why-astro" },
  { text: "HTML", slug: "concepts/why-astro", key: "concepts/why-astro" },
  { text: "GIT", slug: "concepts/why-astro", key: "concepts/why-astro" },
] as const;

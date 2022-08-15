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
  { text: "About", slug: "about", key: "about" },
  { text: "Resume", slug: "resume", key: "resume" },
  { text: "Signicant Works", slug: "significant-works", key: "significant-works" },
  { text: "Technology Stack", slug: "technology-stack", key: "technology-stack" },
  { text: "Technology History", slug: "technology-history", key: "technology-history" },
  // { text: "Design Patterns", slug: "design-patterns", key: "design-patterns" },
  // { text: "Resources", header: true, type: "learn", key: "basics" },
  // { text: "Youtube", slug: "resources/youtube", key: "resources/youtube" },
  // { text: "Twitter", slug: "resources/twitter", key: "resources/twitter" },
  // {
  //   text: "Icon Assets",
  //   slug: "core-concepts/project-structure",
  //   key: "core-concepts/project-structure",
  // },

  { text: "Projects", header: true, type: "learn", key: "features" },
  {
    text: "Starlight",
    slug: "projects/starlight",
    key: "starlight",
  },
  // { text: "Tips", header: true, type: "learn", key: "coreConcepts" },
  // { text: "Angular", slug: "concepts/why-astro", key: "concepts/why-astro" },
  // { text: "TypeScript", slug: "concepts/why-astro", key: "concepts/why-astro" },
  // { text: "CSS", slug: "concepts/why-astro", key: "concepts/why-astro" },
  // { text: "HTML", slug: "concepts/why-astro", key: "concepts/why-astro" },
  // { text: "GIT", slug: "concepts/why-astro", key: "concepts/why-astro" },
] as const;

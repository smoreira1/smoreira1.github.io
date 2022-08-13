export const SITE = {
  title: "Stephen D. Moreira",
  description: "Software Engineering",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
  English: "en",
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
  en: [
    { text: "", header: true },
    { text: "About Me", header: true },
    { text: "Introduction", link: "about-me/introduction" },
    { text: "Résumé", link: "about-me/resume" },
    { text: "Significant Works", link: "about-me/significant-works" },
    { text: "Tech Stack", link: "about-me/tech-stack" },
    { text: "Design Patterns", link: "about-me/design-patterns" },
    { text: "Tips", header: true },
    { text: "TypeScript", link: "tips/typescript" },
    { text: "CSS", link: "tips/css" },
    { text: "RxJS", link: "tips/rxjs" },
    { text: "Projects", header: true },
    { text: "Project Starlight", link: "projects/starlight" },
  ],
};

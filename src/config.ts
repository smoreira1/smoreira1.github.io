export const SITE = {
  title: 'Stephen D. Moreira',
  description: 'Software Engineering',
  defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
    alt:
      'astro logo on a starry expanse of space,' +
      ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
  English: 'en',
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
    { text: '', header: true },
    { text: 'About Me', header: true },
    { text: 'Introduction', link: 'about-me/introduction' },
    { text: 'Résumé', link: 'about-me/resume' },
    { text: 'Socials', link: 'about-me/socials' },
    { text: 'The Toolbag', link: 'about-me/the-toolbag' },
    { text: 'Design Patterns', link: 'about-me/design-patterns' },
    { text: 'Project Starlight', link: 'about-me/project-starlight' },
    { text: 'TypeScript', header: true },
    { text: 'Overview', link: 'typescript/overview' },
    { text: 'Top 10 Tips', link: 'typescript/top-10' },
    // { text: 'CSS', header: true },
    // { text: 'Overview', link: 'css/overview' },
    // { text: 'Top 10 Tips', link: 'css/top-10' },
    // { text: 'Angular', header: true },
    // { text: 'Overview', link: 'angular/overview' },
    // { text: 'Top 10 Tips', link: 'angular/top-10' },
    // { text: 'RxJS', header: true },
    // { text: 'Overview', link: 'rxjs/overview' },
    // { text: 'Top 10 Tips', link: 'rxjs/top-10' },
    // { text: 'NestJS', header: true },
    // { text: 'Overview', link: 'nestjs/overview' },
    // { text: 'Top 10 Tips', link: 'nestjs/top-10' },
    // { text: 'Firebase', header: true },
    // { text: 'Overview', link: 'firebase/overview' },
    // { text: 'Top 10 Tips', link: 'firebase/top-10' },
  ],
};

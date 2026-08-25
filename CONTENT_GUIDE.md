# Portfolio Content and Code Guide

This guide shows where the editable portfolio content, profile image, navigation, theme, and motion settings live. The data is kept outside the section components whenever it is shared or likely to change.

## Profile image

The currently selected image is:

```text
public/cat.jpg
```

Its public URL is stored in [`src/data/profile.js`](src/data/profile.js):

```js
export const profile = {
  imageUrl: '/cat.jpg',
}
```

The Hero reads that value in [`src/components/sections/Hero.jsx`](src/components/sections/Hero.jsx):

```jsx
<img
  alt={`${profile.name} profile`}
  src={profile.imageUrl}
/>
```

To restore the portrait that already exists at `public/profile.jpg`, change only this value:

```js
imageUrl: '/profile.jpg',
```

To use `profile.png` later, place it at `public/profile.png` and use:

```js
imageUrl: '/profile.png',
```

Files inside `public` are referenced from `/`; do not include `public` in the browser URL.

## Centralized headings and hero text

All section titles and descriptions are in [`src/data/content.js`](src/data/content.js):

```js
export const heroContent = {
  eyebrow: 'building web and mobile experiences',
  description: '/* Web and mobile developer focused on responsive interfaces, reliable APIs, and useful digital products. */',
}

export const sectionContent = {
  about: {
    index: '01',
    eyebrow: 'About',
    title: 'Turning concepts into real-world applications',
  },
  education: {
    index: '02',
    eyebrow: 'Education',
    title: 'My academic journey',
    description: 'A focused path from the humanities and social sciences into web, mobile, and information technology.',
  },
  skills: {
    index: '03',
    eyebrow: 'Skills',
    title: 'Tools I build with',
    description: 'A practical toolkit for responsive websites, cross-platform mobile apps, backend APIs, databases, and collaborative development.',
  },
  certificates: {
    index: '04',
    eyebrow: 'Certificates',
    title: 'Certifications & achievements',
    description: 'Credentials that strengthen my foundation in development, cloud services, data, and security. Click any card to view the full certificate.',
  },
  projects: {
    index: '05',
    eyebrow: 'Projects',
    title: 'Web & mobile builds',
    description: 'Client-facing systems for business, ticketing, and real-time operational tracking, plus academic projects currently being documented.',
  },
  contact: {
    index: '06',
    eyebrow: 'Contact',
    title: "Let's build something useful",
    description: 'Open to web and mobile development opportunities, internships, and collaborations. Choose a channel below to get in touch.',
  },
}
```

`SectionHeading` automatically wraps each `title` in code-style angle brackets. This value:

```js
title: 'Turning concepts into real-world applications'
```

is displayed as:

```text
<Turning concepts into real-world applications />
```

## Profile details and links

Identity, education, image, contact information, and external links are centralized in [`src/data/profile.js`](src/data/profile.js):

```js
export const profile = {
  name: 'Leo B. Gannad',
  fullName: 'Leo Bucasas Gannad',
  role: 'Web & Mobile Developer',
  education: '4th Year BS Information Technology',
  location: 'Tuguegarao City, Philippines',
  imageUrl: '/cat.jpg',
  email: 'leogannad18@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/leo-gannad-a66a48410',
  githubUrl: 'https://github.com/codedev-tech',
  resumeUrl: '/Leo-Gannad-Resume.pdf',
}
```

`gmailComposeUrl` is generated from `profile.email` in the same file. The Gmail contact card and footer link use it to open Gmail Compose directly instead of relying on a locally configured `mailto:` handler.

## Education timeline

Education entries are stored in [`src/data/education.js`](src/data/education.js), separate from the timeline layout:

```js
export const educationHistory = [
  {
    period: '2022–2023',
    level: 'Senior High School',
    program: 'Humanities and Social Sciences (HUMSS)',
    school: 'Santo Tomas National High School',
    status: 'completed',
  },
  {
    period: '2023–Present',
    level: 'College',
    program: 'BS Information Technology',
    school: 'Isabela State University – Cabagan Campus',
    status: 'current',
  },
]
```

Use `Present` while currently studying. Replace it with the graduation year after completing the degree.

## Separated code map

| Editable item or behavior | Source file | Export/component |
| --- | --- | --- |
| Hero eyebrow and static description | `src/data/content.js` | `heroContent` |
| Section numbers, headings, descriptions | `src/data/content.js` | `sectionContent` |
| Name, role, education, profile image, and links | `src/data/profile.js` | `profile` |
| Education timeline entries | `src/data/education.js` | `educationHistory` |
| Skill groups, including Express.js | `src/data/skills.js` | `skillGroups` |
| Certificate records and filter categories | `src/data/certificates.js` | `certificates`, `certificateCategories` |
| Client and academic project records | `src/data/projects.js` | `clientProjects`, `academicProjects` |
| Header navigation links and scroll offset | `src/config/navigation.js` | `NAV_LINKS`, `HEADER_OFFSET` |
| Reveal and smooth-scroll timing | `src/config/motion.js` | `MOTION` |
| Light/dark state and local storage | `src/hooks/useTheme.js` | `useTheme` |
| Smooth section navigation | `src/hooks/useSectionNavigation.js` | `useSectionNavigation` |
| Current-section detection | `src/hooks/useActiveSection.js` | `useActiveSection` |
| Scroll-direction header visibility | `src/hooks/useHeaderVisibility.js` | `useHeaderVisibility` |
| Mobile menu open/close animation | `src/hooks/useMobileMenuMotion.js` | `useMobileMenuMotion` |
| Hero entrance, parallax, and button motion | `src/hooks/useHeroMotion.js` | Hero motion hooks |
| Shared scroll/resize frame scheduler | `src/utils/viewportScheduler.js` | `subscribeToViewportUpdates` |
| Reusable scroll reveal | `src/components/Reveal.jsx` | `Reveal` |
| Reusable interactive cards | `src/components/MagicCard.jsx` | `MagicCard` |
| Reusable editor window bar | `src/components/ui/CodeWindowBar.jsx` | `CodeWindowBar` |
| Reusable numbered section title | `src/components/sections/SectionHeading.jsx` | `SectionHeading` |
| Dark/light color tokens and mappings | `src/index.css` | CSS variables and theme selectors |
| Animated grid colors | `src/components/layout/SiteBackground.jsx` | `SiteBackground` |
| Header, active nav, and theme command | `src/components/layout/Header.jsx` | `Header` |
| Top-page scroll progress indicator | `src/components/layout/ScrollProgress.jsx` | `ScrollProgress` |

## Content still local to a section

These items are intentionally kept beside their markup because they are used by only one section:

| Content | Source file |
| --- | --- |
| About paragraphs and statistics | `src/components/sections/About.jsx` |
| Contact channel display labels and icons | `src/components/sections/Contact.jsx` |

## Theme files

- `src/hooks/useTheme.js` controls switching, saved preference, and system preference.
- `src/index.css` contains shared dark/light tokens, surfaces, text mappings, focus styles, selection colors, and scrollbars.
- `src/components/layout/SiteBackground.jsx` changes the animated background grid colors for each theme.
- `src/components/layout/Header.jsx` displays the `theme.light()` or `theme.dark()` command.

## Navigation and scroll motion

The top bar intentionally keeps only the primary links: About, Skills, Projects, and Contact. Education and Certificates remain full sections in the page flow but are omitted from the header to reduce clutter.

`src/components/Reveal.jsx` uses reversible viewport animation by default. Content reveals when it enters from either scroll direction, then resets only after it has fully left the viewport so it can animate again when revisited.

Reveal directions remain active even when the operating system disables general UI animations, so the portfolio retains its intended left, right, and vertical slide effects.

## Performance behavior

- `src/utils/viewportScheduler.js` gives reveals, the header, and hero parallax one shared scroll/resize listener and one animation-frame batch.
- `src/components/layout/ScrollProgress.jsx` uses that same scheduler and updates only a GPU-friendly horizontal scale transform.
- `src/components/ShapeGrid.jsx` renders at a capped frame rate and pauses expensive canvas drawing during active scrolling, hidden tabs, and open dialogs.
- `src/components/MagicCard.jsx` batches pointer updates into animation frames and reuses the card bounds while hovered.
- Certificate cards load small files from `public/certificates/thumbnails`; lightboxes use the web-sized files in `public/certificates/display`. Original uploads remain in `public/certificates`.
- Mobile cards disable backdrop filtering to reduce GPU compositing work while preserving their surface colors.

## Validation

After changing content or code, run:

```bash
npm run lint
npm run build
```

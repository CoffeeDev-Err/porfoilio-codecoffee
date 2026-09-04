# Leo Gannad — Developer Portfolio

A responsive personal portfolio for Leo Gannad, a web and mobile developer based in the Philippines. The site presents selected projects, technical skills, education, certifications, and contact information in an animated single-page experience.

## Features

- Responsive single-page portfolio layout
- Hero, about, education, skills, projects, certificates, and contact sections
- Project detail modal and certificate lightbox
- Light and dark themes
- Active-section navigation and scroll progress
- GSAP-powered entrance and interaction animations
- Centralized, typed content and profile data
- Resume, email, LinkedIn, and GitHub links

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- GSAP
- ESLint

## Local development

```bash
git clone https://github.com/CoffeeDev-Err/porfolio-codecoffee.git
cd porfolio-codecoffee
npm install
npm run dev
```

Vite prints the local development URL when the server starts.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |

## Content management

Most portfolio content is separated from the UI components:

```text
src/data/profile.ts       # Name, role, image, and contact links
src/data/projects.ts      # Client and academic projects
src/data/skills.ts        # Technologies and skill groups
src/data/education.ts     # Education timeline
src/data/certificates.ts  # Certificate entries
src/data/content.ts       # Shared headings and section copy
```

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for detailed instructions on updating profile content, navigation, themes, and motion settings.

## Production build

```bash
npm run typecheck
npm run lint
npm run build
```

The generated static site is written to `dist/` and can be deployed to any static hosting provider.


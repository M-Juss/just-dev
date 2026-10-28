# just-dev

Mark Justin Sayson's digital portfolio, built with Next.js. The planned design takes inspiration from GitHub's clean profile layout, adapted for portfolio content.

## Stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- ESLint
- npm

## Appearance

- Space Mono (400 and 700) for headings; Roboto Mono (variable) for body text and controls.
- Fonts are optimized and self-hosted through `next/font/google`.
- GitHub's official Primer Light default and Dark default color tokens are imported in `src/app/globals.css`.
- Dark is the initial theme. The header toggle switches between Light and Dark, and saves the choice locally.
- `ThemeProvider` lives in `src/components/theme-provider.tsx`; `ThemeSwitcher` can be reused elsewhere.
- Use the semantic Tailwind utilities (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `font-heading`, and `font-body`) for new components so they follow the active theme.

The header contains menu, `<JustDev/>` wordmark, search, contact, and theme toggle. Only its theme toggle is interactive; the remaining header controls are placeholders. Search collapses to an icon on smaller screens.

## Profile layout

- Centered content container: 83.33% of the viewport, capped at 1216px, with equal outer margins. Mobile uses 16px margins on each side.
- Desktop uses proportional 1:3 profile/content columns with a 32px gap. The portrait follows the sidebar width, from a 220px minimum to a 296px maximum. The layout stacks on mobile.
- The rounded portrait switches between the supplied dark and light photos using the active color theme. Optimized WebP assets live in `public/images/`.
- The heart starts as an uncolored outline. Tap or keyboard activation likes it with a red fill, spring animation, ripple, and small burst; activate again to unlike it. It respects reduced-motion preferences and does not record a public like count.
- Profile details live in `src/data/profile.ts`: email, telephone, and Facebook, GitHub, and LinkedIn links. Each social link uses a single icon/name/northeast-arrow row.
- Education follows the social links, with Tertiary and Secondary groups, emphasized program names, and muted school and date details. Entries are maintained in the same profile data file.

The remaining content column is reserved for the next portfolio sections.

## Local development

Use Node.js 24 LTS and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and production

```bash
npm run lint
npm run build
npm start
```

Run `npm run build` before `npm start`. The starter uses `next/font/google`, so the first production build needs internet access to download its fonts.

## Project structure

- `src/app/page.tsx` — home page
- `src/app/layout.tsx` — root layout and page metadata
- `src/app/globals.css` — global styles
- `public/` — static assets

Imports beginning with `@/` resolve to `src/`.

## GitHub and deployment

The project is initialized with local Git. Create a GitHub repository and connect it as the remote when ready. Commit `package-lock.json` to keep dependency versions reproducible. Dependencies, build output, local environment files, and Vercel configuration are excluded by `.gitignore`.

Vercel is the intended hosting platform. Deployment, portfolio design, and content-specific SEO are planned for later steps.

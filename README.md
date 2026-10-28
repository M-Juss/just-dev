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
- Dark is the initial theme. The appearance switcher also supports Light and System, and saves the choice locally.
- `ThemeProvider` lives in `src/components/theme-provider.tsx`; `ThemeSwitcher` can be reused elsewhere.
- Use the semantic Tailwind utilities (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `font-heading`, and `font-body`) for new components so they follow the active theme.

The home page currently contains an appearance preview while the portfolio layout is being built.

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

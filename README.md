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

## Dashboard

- The right panel begins with today's date, a live 12-hour clock, and Manila weather. Date and time explicitly use `Asia/Manila`, regardless of the visitor's device timezone.
- Weather comes from Open-Meteo through `/api/weather`, including the current condition and today's temperature. The server caches results for 10 minutes; the card refreshes periodically and at Manila's date change. Source attribution appears below the dashboard, outside the cards.
- `/api/github?range=last-year` returns the real public contribution calendar for `M-Juss`. The adapter reads GitHub's public calendar HTML, not the authenticated GraphQL API, so no token is required. Only parsed dates/counts/intensity levels are sent to the browser; upstream HTML is never rendered. GitHub markup changes may require updating the adapter.
- Contribution results are cached server-side for one hour, with retry and unavailable states rather than generated activity. Hovering a square shows its daily contribution count.
- The technology tiles use locally served SVG logos from Devicon v2.17.0, with its license in `public/icons/DEVICON-LICENSE.txt`. React Native shares the React logo; NoSQL uses a generic database symbol because it names a category rather than a product.
- Main dashboard files: `src/components/profile-dashboard.tsx`, `today-overview.tsx`, `github-activity.tsx`, and `tech-stack.tsx`. Technologies live in `src/data/tech-stack.ts`.

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
npm test
npm run build
npm start
```

Run `npm run build` before `npm start`. The starter uses `next/font/google`, so the first production build needs internet access to download its fonts.

`npm test` uses Node.js 24's built-in test runner to verify Manila date rollover, weather-code descriptions, contribution parsing, and calendar alignment.

## Project structure

- `src/app/page.tsx` — home page
- `src/app/layout.tsx` — root layout and page metadata
- `src/app/globals.css` — global styles
- `public/` — static assets

Imports beginning with `@/` resolve to `src/`.

## GitHub and deployment

The project is initialized with local Git. Create a GitHub repository and connect it as the remote when ready. Commit `package-lock.json` to keep dependency versions reproducible. Dependencies, build output, local environment files, and Vercel configuration are excluded by `.gitignore`.

Vercel is the intended hosting platform. Deployment, portfolio design, and content-specific SEO are planned for later steps.

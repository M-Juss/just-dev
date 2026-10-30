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

The header contains a section-navigation drawer, `<JustDev/>` wordmark, line search, a contact dialog, and the theme toggle. Search collapses to an icon on smaller screens.

## Profile layout

- Centered content container: 83.33% of the viewport, capped at 1216px, with equal outer margins. Mobile uses 16px margins on each side.
- Desktop uses proportional 1:3 profile/content columns with a 32px gap. The portrait follows the sidebar width, from a 220px minimum to a 296px maximum. The layout stacks on mobile.
- The rounded portrait switches between the supplied dark and light photos using the active color theme. Optimized WebP assets live in `public/images/`.
- The heart starts as an uncolored outline. Tap or keyboard activation likes it with a red fill, spring animation, ripple, and small burst; activate again to unlike it. The choice is saved in browser local storage (`just-dev:profile-liked`), survives refreshes, and syncs across tabs on the same origin. Restoring a saved like does not replay the animation. It respects reduced-motion preferences. No like count is displayed.
- Profile details live in `src/data/profile.ts`: email, telephone, and Facebook, GitHub, and LinkedIn links. Each social link uses a single icon/name/northeast-arrow row.
- Education follows the social links, with Tertiary and Secondary groups, emphasized program names, and muted school and date details. Entries are maintained in the same profile data file.

## Dashboard

- The right panel begins with today's date, a live 12-hour clock, and Manila weather. Date and time explicitly use `Asia/Manila`, regardless of the visitor's device timezone.
- Weather comes from Open-Meteo through `/api/weather`, including the current condition and today's temperature. The server caches results for 10 minutes; the card refreshes periodically and at Manila's date change. Source attribution appears below the dashboard, outside the cards.
- `/api/github?range=last-year` returns the real public contribution calendar for `M-Juss`. The adapter reads GitHub's public calendar HTML, not the authenticated GraphQL API, so no token is required. Only parsed dates/counts/intensity levels are sent to the browser; upstream HTML is never rendered. GitHub markup changes may require updating the adapter.
- Contribution results are cached server-side for one hour, with retry and unavailable states rather than generated activity. Hovering a square shows its daily contribution count.
- The technology tiles use locally served SVG logos from Devicon v2.17.0, with its license in `public/icons/DEVICON-LICENSE.txt`. React Native shares the React logo; MongoDB uses its green leaf logo.
- Main dashboard files: `src/components/profile-dashboard.tsx`, `today-overview.tsx`, `github-activity.tsx`, and `tech-stack.tsx`. Technologies live in `src/data/tech-stack.ts`.

## Local development

Use Node.js 24 LTS and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Local profile likes

The heart updates immediately and saves its preference in browser local storage, so it survives refreshes. Tabs on the same origin share this local preference. Returning to a saved like does not replay the click animation. If storage is blocked, the toggle still works for the current visit. No like count is displayed.

Likes use only client-side state and browser storage. No likes API, database, visitor IDs, polling, or live subscriptions are required.

## Contact form and Gmail SMTP

The envelope button opens a contact dialog with required Name, Email, Subject, and Message fields. `/api/contact` validates submissions and sends plain-text mail through Nodemailer using `smtp.gmail.com:465` with TLS. The visitor's address is used as Reply-To; the sender and recipient are controlled on the server.

Send stays disabled until all four required fields pass the shared client/server validator, and remains disabled while sending or cooling down. Name and subject accept plain text with no angle brackets or control characters; email uses a bounded address format and rejects header injection. Message accepts plain text, including literal code, with length/control-character validation. User input is never inserted through `innerHTML` or `dangerouslySetInnerHTML`, and email has only a `text/plain` MIME part. This keeps HTML/script-like message content inert instead of relying on a script blacklist. Errors are also rendered through React's escaped text output.

After SMTP accepts a message, the dialog displays a five-minute countdown and disables further sending. The deadline is stored locally, synchronizes between tabs, and survives refreshing or reopening the dialog. An HMAC-signed HttpOnly SameSite cookie lets the server enforce/recover the remaining time across server restarts; it uses the server's SMTP app password as its signing key. Failed SMTP sends release their in-flight reservation and do not start the success cooldown. The server also blocks simultaneous sends and repeat sends from the same address/email in each warm instance. These in-memory address/email checks are not distributed across Vercel instances; a shared limiter is needed to also cover requests that discard cookies across instances. Clearing the local countdown alone does not bypass a valid server cookie.

1. Enable 2-Step Verification on the sending Google account and generate an [app password](https://support.google.com/accounts/answer/185833).
2. Copy `.env.example` to `.env.local` in the project root and fill in:

```dotenv
GMAIL_SMTP_USER=your-sending-account@gmail.com
GMAIL_SMTP_APP_PASSWORD=your-google-app-password
CONTACT_EMAIL_TO=m.justinsayson@gmail.com
```

3. Restart the dev server after changing these values. For Vercel, add the same names under the project's Environment Variables and redeploy.

Keep the app password in `.env.local` or Vercel's server environment, never in chat, Git, or a `NEXT_PUBLIC_` variable. `.env.local` remains ignored; `.env.example` contains placeholders only. Without credentials, the form returns an unavailable message and keeps the visitor's draft. The direct email link remains usable.

The endpoint checks the browser origin, limits body/field sizes, ignores honeypot submissions, and permits five attempts per address per 15 minutes in each warm server instance. This in-memory limit does not persist across Vercel instances or cold starts; use a shared limiter or deployment firewall rules if stronger production throttling is needed. No automated test sends a real email; the transport test uses Nodemailer's local JSON transport.

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

The repository is connected to `M-Juss/just-dev`. Commit and push the latest files, including `package-lock.json`, before importing it into Vercel. Dependencies, build output, local environment files, and the local `.vercel` directory are excluded by `.gitignore`.

Node.js 24 is selected in `package.json` and `.nvmrc`. The app includes baseline security headers in `next.config.ts`. Follow [the deployment guide](docs/vercel-deployment.md) to configure Gmail variables and the contact firewall rule, then verify the deployed site. Firewall protection and app-password rotation require account-side setup; they are not activated by a local build.

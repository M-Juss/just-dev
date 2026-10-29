# Vercel deployment

## Project and runtime

Import `M-Juss/just-dev` into Vercel after committing and pushing the latest files. Select the Next.js framework preset, repository root directory, and the default `npm run build` command. Leave the output directory at the framework default.

`package.json` pins Node.js to `24.x`, which Vercel uses for builds and functions. `.nvmrc` also selects Node.js 24 locally. This portfolio needs Vercel's Next.js deployment, including its contact, weather, and GitHub functions; a static HTML export cannot run those endpoints. No database or separate server is required.

## Gmail credentials

The previously exposed app password should be revoked and replaced through [Google App Passwords](https://myaccount.google.com/apppasswords). Complete this yourself in your Google account. Keep the new value out of chat, `.env.example`, and Git.

Set these in the Vercel project's Environment Variables for Production:

| Name | Value |
| --- | --- |
| `GMAIL_SMTP_USER` | Gmail account that generated the app password |
| `GMAIL_SMTP_APP_PASSWORD` | Newly generated app password |
| `CONTACT_EMAIL_TO` | `m.justinsayson@gmail.com` |

Redeploy after adding or changing variables. Local `.env.local` values are not automatically copied to Vercel. Add credentials to Preview only if that environment should send real emails.

## Contact firewall rule

This configuration must be applied to the deployed project's Vercel Firewall; adding the instructions here does not activate it. The local checkout is not currently linked to a Vercel project.

Open the project, then **Firewall → Configure → New Rule**, and use:

| Setting | Value |
| --- | --- |
| Name | Contact form submissions |
| Conditions (both) | Request path equals `/api/contact`; request method equals `POST` |
| Action | Rate Limit |
| Strategy | Fixed Window |
| Time window | 60 seconds |
| Request limit | 5 |
| Counting key | IP address |
| Enforcement | Default HTTP 429 |

Save the rule, review the changes, and publish them. Vercel may show a rate-limiting pricing/terms prompt; review it in your account before accepting. The values above are the starting policy for this portfolio. It leaves the page, assets, weather, GitHub activity, and contact cooldown reads outside the rule. Monitor the Firewall view for legitimate users sharing an IP and adjust if necessary.

This edge rule supplements the existing input checks, honeypot, signed five-minute browser cooldown, and per-instance attempt limit. It reduces repeated submissions before function execution; it does not guarantee protection against distributed bots. Vercel's rate-limit counters are regional.

Official references: [WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), and [SMTP on Vercel](https://vercel.com/kb/guide/serverless-functions-and-smtp).

## Headers and verification

`next.config.ts` applies content-type protection, framing restrictions, a referrer policy, camera/microphone/location restrictions, and a baseline Content Security Policy to all paths. The CSP restricts framing, base URLs, objects, and form targets; it does not restrict script sources or replace safe output handling. The default `X-Powered-By` header is disabled. Vercel handles HTTPS.

After deployment, verify the home page, theme switch, search, project galleries, date/time, and API cards on desktop and mobile. Send one real test message to confirm inbox receipt and the five-minute cooldown, and check logs for errors. Confirm the firewall rule is published and the expected response headers are present. A successful SMTP login by itself does not verify inbox delivery.

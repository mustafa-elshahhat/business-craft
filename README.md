# Business Craft — website

Marketing website for **Business Craft**, a digital solutions studio building websites, e-commerce stores, business systems and mobile apps. English only.

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4.

## Run it

```sh
npm install
npm run dev        # http://localhost:3000
npm run check      # ESLint + TypeScript (route types generated first)
npm run build      # production build
npm run start      # serve the production build
```

Requires Node.js 20.9 or newer.

## Configuration

All business values come from environment variables, documented in [`.env.example`](.env.example) and read in [`lib/site.ts`](lib/site.ts). Every variable is optional and an unset value is never rendered.

| Variable | Effect |
|---|---|
| `SITE_URL` | Production origin. Enables canonical URLs, absolute Open Graph URLs, structured data, the sitemap and `robots: allow`. Without it the site is kept out of search. |
| `CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_WHATSAPP` | Direct contact channels (contact page, closing sections, footer). |
| `CONTACT_WEBHOOK_URL` | Server-only HTTPS endpoint that receives enquiries as a JSON POST. Without it the form is shown as not connected. |
| `SOCIAL_*_URL` | Footer social links. |

Pages are prerendered, so these values are read at build time. Redeploy after changing them.

### Enquiry form

`app/contact/actions.ts` validates every field on the server, drops obvious spam (a hidden honeypot field and a minimum fill time), and POSTs this JSON to `CONTACT_WEBHOOK_URL`:

```json
{ "name": "", "company": "", "email": "", "phone": "", "service": "", "message": "", "source": "business-craft-website", "submittedAt": "ISO date" }
```

Success is shown only after the endpoint answers with a 2xx status. Any form service or automation tool that accepts a JSON webhook (and forwards it to email or a CRM) works.

## Deployment

Built for Vercel (or any Node host running `next start`). No special build settings: build command `npm run build`, output managed by Next.js. Set the environment variables above for the Production environment, then deploy. Leave `SITE_URL` unset on preview deployments so they are not indexed.

Static media in `public/media/work/` (muted MP4/WebM clips) and the locked brand assets in `public/brand/` are served as-is; project screenshots in `assets/projects/` are optimised by `next/image`.

## Project structure

```
app/                 Routes: /, /services, /services/[slug], /work, /work/[slug], /about, /contact,
                     plus sitemap, robots, manifest, Open Graph image and 404
components/layout/   Header (theme-aware), desktop dropdowns, mobile menu, footer
components/home/     Homepage sections and their interactive parts
components/sections/ Shared page sections: hero, process track, closing CTA, device pair, breadcrumbs, JSON-LD
components/ui/       Buttons, container, headings, spec sheet
components/contact/  Enquiry form (client) — the action lives in app/contact/actions.ts
content/             Services, projects, case studies, company copy, enquiry options
lib/                 Site configuration, metadata helper, contact delivery config
assets/projects/     Production project screenshots (real captures of the live sites)
assets/captures/     Capture notes (CAPTURES.md); raw masters are not committed
public/brand/        Locked logo and favicon system
```

Server Components by default; client components only where interaction needs them (navigation, the live-work window, the Soulmate story, scroll tracking, videos, the form).

## Content rules

Publish only verified facts. Project facts and their evidence are recorded in [`docs/CONTENT_AND_PROJECTS.md`](docs/CONTENT_AND_PROJECTS.md) and `assets/captures/*/CAPTURES.md`. No invented metrics, testimonials, clients, dates or technology stacks.

## Documentation

- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — the shipped design system
- [`docs/PAGE_BLUEPRINTS.md`](docs/PAGE_BLUEPRINTS.md) — page structure as built
- [`docs/CONTENT_AND_PROJECTS.md`](docs/CONTENT_AND_PROJECTS.md) — projects, verified facts, publishing rules
- [`docs/BRAND_ASSETS.md`](docs/BRAND_ASSETS.md) — locked logo system
- [`docs/BUSINESS_CRAFT_MASTER_SPEC.md`](docs/BUSINESS_CRAFT_MASTER_SPEC.md) — brand and positioning
- `docs/AGENT_MASTER_PROMPT.md`, `docs/REFERENCES.md` — original brief and concept reference index (historical; the concept images are archived outside the repo)
- `references/logo/approved/` — immutable approved logo masters

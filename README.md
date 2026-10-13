# Business Craft — Agent Implementation Pack

This folder is the handoff package for implementing the real **Business Craft** website from the approved visual direction.

## Source-of-truth order

When anything conflicts, use this order:

1. `docs/BUSINESS_CRAFT_MASTER_SPEC.md` — product/brand truth.
2. `docs/DESIGN_SYSTEM.md` — visual and UI rules.
3. `docs/PAGE_BLUEPRINTS.md` — page structure and behavior.
4. `docs/CONTENT_AND_PROJECTS.md` — known real content and publishing rules.
5. `references/03-approved-brand-board.png` — approved visual identity reference.
6. Page mockups in `references/04...07` — layout/composition references, not literal content truth.
7. `references/01...02` — historical direction-selection material only.

## Critical rule

**Do not blindly copy claims, numbers, testimonials, dates, prices, contact details, or project results from the generated mockups.** Some visible values are conceptual placeholders. The implemented website must only publish facts that are verified in the repo, supplied by the owner, or explicitly listed as approved in the docs.

## Approved direction

- Brand: **Business Craft**
- Direction: **Minimal / Premium / Editorial**
- Language: **English only**
- Services: **Websites / E-commerce / Systems / Mobile Apps**
- Primary navy: `#0B1320`
- Secondary charcoal: `#1F2937`
- Accent blue: `#3B82F6`
- Gray: `#94A3B8`
- Light: `#F8FAFC`
- Typeface: **Inter**
- Logo direction: geometric **B** monogram + Business Craft wordmark

## Recommended implementation order

1. Foundation and tokens
2. Header + footer
3. Homepage
4. Services overview
5. Work / Case Studies
6. Project detail template
7. About
8. Contact / Get a Quote
9. Service detail templates: Websites, E-commerce, Systems, Mobile Apps
10. Responsive/mobile QA
11. Final shared design system cleanup

## Reference files

See `docs/REFERENCES.md` for the purpose of every image.

## Website development

The site is a Next.js (App Router) + TypeScript + Tailwind CSS v4 app in this repository.

```sh
npm install
npm run dev        # http://localhost:3000
npm run check      # ESLint + TypeScript (route types generated first)
npm run build      # production build
```

- Requires Node.js 20.9 or newer.
- Pending business values (production domain, contact details, social links) are configured through environment variables. See `.env.example` and `lib/site.ts`; unset values are never rendered.
- Search indexing (robots, sitemap) stays disabled until `SITE_URL` is set.
- Logo and favicon assets in `public/brand/` are final and locked (`docs/BRAND_ASSETS.md`).
- Project content lives in `content/`. Publish only verified facts (`docs/CONTENT_AND_PROJECTS.md`).

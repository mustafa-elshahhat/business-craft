# Portfolio findings (supporting source)

Source: https://mustafa-elshahhat.vercel.app/ (inspected 2026-10-13). Supporting source only: every claim below is a portfolio claim and needs owner confirmation before Business Craft publishes it. Not committed.

## Files

- `portfolio-home-desktop.png` (1440x900 @2x), `portfolio-home-desktop-full.png`, `portfolio-home-mobile.png` (390x844 @3x), `portfolio-home-projects-expanded.png`
- `portfolio-project-<slug>.png` (full page, architecture sections expanded): dr-mirror, soulmate-store, saad-logistics-website, dermiva, booknest, whatsapp-service, moonwatch, lap-service-pos, autoparts-pos
- `portfolio-asset-<slug>-<n>.webp`: 30 original images from `https://mustafa-elshahhat.vercel.app/images/projects/<name>.webp` (developer screenshots, not live-site captures)
  - autoparts-pos 1–4: expenses, invoices, sales, suppliers (2560x1528, Arabic WPF UI)
  - lap-service-pos 1–3: reports, sales, users (2560x1528, Arabic WPF UI)
  - moonwatch 1–3: catalog, cover, room (~2530x1470, landscape)
  - booknest 1–4
  - dr-mirror 1–5: admin-dashboard, cart, cover, product-detail, products
  - soulmate-store 1–5: admin-dashboard, builder, cart, cover, products
  - dermiva 1–3
  - saad-logistics-website 1–2: homepage, services
  - whatsapp-service 1 (shows masked phone numbers and June 2026 timestamps: privacy review before any reuse)

## Projects (verbatim card text)

| Project | Card | Stack claimed | Link |
|---|---|---|---|
| Dr Mirror | Medical apparel store · Web · Live | React, TypeScript / ASP.NET Core, C# / EF Core, SQL Server; role-based web admin dashboard | drmirrorscrubs.store (404 on 2026-10-13) |
| Soulmate Accessories Store | Accessories and gift-box store · Web · Live | Angular 21 / ASP.NET Core (.NET 8) / EF Core, SQL Server; WhatsApp updates; Languages: English | soulmate-accessories-store.vercel.app |
| Saad Logistics Website | Logistics and customs clearance · Web · Live | React, TypeScript, Tailwind CSS, i18next, React Router, Vite, EmailJS; one serverless news-feed endpoint | saadlogistic.com |
| Dermiva | Skincare storefront · Web · Live | Next.js, React 19, TypeScript, next-intl; "Frontend-only build: service layers read mock data" | dermiva-eg.vercel.app/en |
| BookNest E-Library | Digital library · Web · Live | "Static front-end exercise … no backend" | e-library-flame-omega.vercel.app |
| WhatsApp Service Template | Messaging microservice · Service · Built | Node.js, Express, MongoDB, Baileys | — |
| MoonWatch | IPTV watch-party app · App · Built | Flutter/Dart (BLoC, media_kit), ASP.NET Core (.NET 10), SignalR | — |
| Lap Service POS | Repair-workshop point of sale · Desktop · Built | C# WPF, .NET 10, SQLite | — |
| AutoParts POS | Auto-parts retail point of sale · Desktop · Built | C# WPF, .NET 10, SQLite | — |

No years, client names, metrics or repository links. The site states "5 sites live in production"; footer "© 2026".

## Conflicts with Business Craft docs

1. Dr Mirror URL: Business Craft uses dr-mirror.vercel.app (200); portfolio links drmirrorscrubs.store (404).
2. Dr Mirror category: `docs/CONTENT_AND_PROJECTS.md` lists it under Websites; `content/projects.ts` and the portfolio treat it as a store.
3. Soulmate name: "Soulmate Gift Store" vs "Soulmate Accessories Store".
4. Saad: "Saad Logistic" / "Saad Logistic / SLC" vs "Saad Logistics Website"; no back office per portfolio; no SLC entry (the `slc-logistics` entry in `projects.ts` is unsupported here).
5. Dermiva is front-end only with mock data: copy must not imply a working checkout/backend.
6. "E-Library Web App" is listed under Systems; the portfolio describes BookNest as a static front-end exercise.
7. Spelling: "Auto Parts POS" vs "AutoParts POS".
8. Portfolio lists "English" for both POS apps, but its screenshots show Arabic UIs.
9. ZTS Fashion and Bakery Bread Counting are not on the portfolio.
10. WhatsApp Service Template is not in the Business Craft docs.

## Answers

- Mobile app evidence: not conclusive. MoonWatch is a Flutter "App" with status "Built", no store/APK link, and only landscape desktop/tablet screenshots. Its cover shows unverified claims ("4K", "<50ms Sync Delay", "1000+ Channels") that must not be reused as metrics.
- Systems screenshots: yes for AutoParts POS (4) and Lap Service POS (3), real Arabic WPF screens that show client logos, so publishing needs client consent. Dr Mirror and Soulmate admin dashboard screenshots exist. Nothing for Bakery counting; E-Library is a static site.
- Technologies/years for the web projects: no years anywhere; stacks as quoted above (ZTS absent). All need owner confirmation before publication.

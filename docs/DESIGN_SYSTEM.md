# Business Craft — Design System

This documents the shipped design ("Live Work"). Tokens live in `app/globals.css` (`@theme`); components in `components/`. When this file and the code disagree, the code is the source of truth and this file should be updated.

## 1. Principles

1. **The work is the visual identity.** Real captures of live projects carry most of the visual weight. No illustrations, stock photography, device mock-ups, fake browser chrome or invented UI.
2. **Precision over decoration.** Hierarchy comes from type, spacing, hairlines and one accent colour. No gradients, blobs, glass, glows or ornaments.
3. **Evidence beside claims.** Every capability shown next to the live project that proves it; where screens cannot be published, a typographic panel says so honestly.
4. **Calm chapters.** Pages alternate navy and light chapters with a fixed, theme-aware header.
5. **Motion explains state.** Motion marks entrance, selection and progress, never decoration.

Reference blend: Linear (precision, motion discipline), Attio (product storytelling), Mercury (clear information architecture, trust), Ramotion (portfolio hierarchy). Never copied.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `navy` | `#0B1320` | Dark chapters, text on light |
| `charcoal` | `#1F2937` | Media frame fill on dark |
| `accent` | `#3B82F6` | State only: active bars, progress, markers, focus ring |
| `action` | `#2563EB` | Primary buttons and active progress (white text ≥ 4.5:1) |
| `muted` | `#64748B` | Secondary text on light |
| `subtle` | `#94A3B8` | Disabled controls, placeholders |
| `mist` | `#8B95A7` | Secondary text on navy (≥ 4.5:1 on navy) |
| `light` | `#F8FAFC` | Light chapters |
| `white` | `#FFFFFF` | Alternate light chapters, form fields |
| `line` / `line-strong` | navy at 10% / 16% | Hairlines on light |
| `line-dark` / `line-dark-strong` | `#F8FAFC` at 10% / 16% | Hairlines on navy |

The logo's own blues (`#1D7FFD`, `#0669FC`, `#0261F8`) exist only inside the locked logo files and are never used as UI colours. The default Tailwind palette is removed, so only these tokens exist.

## 3. Typography

Inter only (`next/font`, self-hosted, `display: swap`).

| Role | Size | Weight / tracking | Notes |
|---|---|---|---|
| H1 `text-h1` | 40px → 72px | 560, −0.025em, line-height 1 | Two-tone: statement in white/navy, elaboration in `mist`/`muted` |
| H2 `text-h2` | 30px → 48px | 540, −0.022em | |
| H3 `text-h3` | 24px → 32px | 540, −0.018em | |
| Lead `text-lead` | 18px → 24px | 400, line-height 1.4 | |
| Body `text-body` | 16px | 400, line-height 1.6 | |
| Label `text-label` | 12px uppercase | 500, +0.08em | Structural labels only, sparingly |

No display type above 72px, no 700+ weights, no decorative numbers.

## 4. Layout and spacing

- Container: `components/ui/container.tsx` — max 1376px including gutters; gutters 20 / 24 / 32 / 48px.
- Grid: 12 columns from `lg` (1024px) with a 40px gap; compositions are asymmetric (e.g. 5/7, 4/8, 7/5 with offsets).
- Chapter padding: 64px mobile, 112px tablet, 144–160px desktop.
- Breakpoints (Tailwind defaults): `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Hero headline and lead sit side by side only from `xl`.
- Line length: body copy ≤ ~34rem.

## 5. Surfaces, borders, radii

- Chapters: `bg-navy` (with `data-header="dark"`) or `bg-light` / `bg-white` (`data-header="light"`). No section container wraps a whole section.
- Hairlines: 1px `border-line*`; ruled lists and 2-up grids with vertical dividers replace cards.
- Radii: 12px media frames (`media-frame`, `media-frame-dark`), 8px buttons and fields, 10–14px phone captures. Nothing above 16px.
- Shadow: media frames only — a 1px ring plus two very soft layers.

## 6. Components

| Component | Where | Notes |
|---|---|---|
| Header | `components/layout/header.tsx` | Fixed, 64px, translucent navy or light depending on the chapter underneath (`HeaderTheme`), 250ms crossfade |
| Desktop dropdowns | `desktop-nav.tsx` | One shared panel for Services and Work; resizes 220ms and slides content between menus |
| Mobile menu | `mobile-menu.tsx` | Full screen below the header, accordions, pinned CTA, page inert + scroll lock |
| Buttons | `components/ui/button.tsx` | `ButtonLink` primary (action blue) and hairline secondary; `TextLink` with underline and arrow |
| Page hero | `components/sections/page-hero.tsx` | Breadcrumb, two-tone H1, lead, actions or facts, optional media |
| Device pair | `device-pair.tsx` | Real desktop capture with the same site's phone capture overlapping |
| Spec sheet | `components/ui/spec-sheet.tsx` | Typographic evidence panel for services without publishable screens |
| Process track | `process-track.tsx` | 1px track that fills on scroll (horizontal ≥ lg, vertical below) |
| Closing CTA | `closing-cta.tsx` | Ends every page: two-tone headline, one action, email if configured |
| Live-work window | `components/home/live-work.tsx` | Homepage hero: cycles real captures every 6s with tabs and progress |
| Soulmate story | `soulmate-story.tsx` | Four real builder states with segmented progress |
| Work video | `work-video.tsx` | Muted clip over its poster; loads and plays only when ≥60% visible |

## 7. Motion

Tokens (`app/globals.css`): `--ease-out: cubic-bezier(.165,.84,.44,1)`, `--ease-io: cubic-bezier(.455,.03,.515,.955)`, `--ease-in: cubic-bezier(.32,0,.67,0)`.

| Interaction | Timing |
|---|---|
| Hover (colour, underline, brightness 1.04, arrow 3px) | 100ms in / 250ms out |
| Menus and overlays (opacity + scale .98→1) | 180ms; panel resize 220ms |
| Media swap (crossfade, 4–8px) | 250ms out (ease-in) / 450ms in (ease-out) |
| Section reveal (headings, leads, media; 12px rise, media 2px blur) | 560ms, 80ms stagger, once |
| Hero entrance (lines rise 20px with 8px blur, 90ms stagger) | 900ms |
| Auto-advance (hero window, Soulmate story) | 6s per state; pauses on hover, focus, hidden tab or off-screen |
| Process track | Scroll-driven CSS (`animation-timeline: view()`), no pinning or scroll capture |

Reduced motion: no entrances, reveals, auto-advance, autoplay video or scroll-linked effects; content is immediately visible and every control still works. Without JavaScript, all content is visible (reveal states apply only once `html[data-motion]` is set).

## 8. Imagery

- Real captures only (`assets/projects/`), recorded in `assets/captures/*/CAPTURES.md`. Desktop sources 2400px wide, phone sources 780px; served by `next/image` as WebP at the needed size.
- Crops may focus on detail (product page, cart, builder step) but are never retouched. Floating third-party chat launchers may be hidden before capture.
- Right-to-left Arabic screens are shown only for projects where English, Arabic and RTL are verified.
- Clips: muted MP4 + WebM ≤ 1.3MB in `public/media/work/`, with a poster; never autoplay under reduced motion.

## 9. Accessibility

- Landmarks, one H1 per page, ordered headings, breadcrumbs with `aria-current`.
- Visible focus ring (2px accent, 3px offset) on everything focusable.
- Menus: `aria-expanded`, Escape closes and restores focus, outside click closes, arrow keys move within panels.
- Tabs (hero window, Soulmate story): `role="tab"`, roving tabindex, arrow keys.
- Touch targets ≥ 44px; contrast ≥ 4.5:1 for text.
- Forms: visible labels, inline errors linked with `aria-describedby`, focus moves to the first error or the result.

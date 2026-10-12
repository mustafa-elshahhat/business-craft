# Business Craft — Design System

## 1. Design principles

1. **Clarity before decoration** — hierarchy must be obvious in under 5 seconds.
2. **Premium through restraint** — whitespace, typography, imagery, and rhythm create quality; not visual effects.
3. **Real work is the hero** — use actual product/project visuals whenever possible.
4. **Consistent contrast** — dark sections are intentional anchors, not the whole website.
5. **Reusable components** — avoid one-off styling per section.

## 2. Color tokens

Recommended CSS variables:

```css
:root {
  --bc-navy: #0B1320;
  --bc-charcoal: #1F2937;
  --bc-blue: #3B82F6;
  --bc-gray: #94A3B8;
  --bc-light: #F8FAFC;
  --bc-white: #FFFFFF;

  --bc-text: #0B1320;
  --bc-text-muted: #64748B;
  --bc-border: rgba(11, 19, 32, 0.10);
  --bc-border-dark: rgba(255, 255, 255, 0.12);
}
```

Do not create a rainbow of extra brand colors. Product screenshots may contain their own project-specific colors; the Business Craft chrome stays navy/white/blue.

## 3. Typography

Font: `Inter`

Suggested responsive scale:

- Display / Hero: `clamp(3rem, 5vw, 4.5rem)` / 700
- H2: `clamp(2.25rem, 3.5vw, 3.25rem)` / 700
- H3: `1.5rem–2rem` / 600–700
- Body large: `1.125rem` / 400–500
- Body: `1rem` / 400
- Small: `0.8125rem–0.875rem`
- Eyebrow: `0.75rem–0.8125rem`, uppercase, increased letter spacing

Body copy max width: roughly 60–72 characters where practical.

## 4. Layout

Desktop content container:

- max width: `1280px–1320px`
- horizontal padding: `32px–48px`

Tablet:

- horizontal padding: `24px–32px`

Mobile:

- horizontal padding: `18px–20px`

Section vertical rhythm:

- desktop: `96px–128px`
- tablet: `72px–96px`
- mobile: `56px–72px`

Use a consistent grid; 12-column on desktop is preferred for complex sections.

## 5. Surfaces

Light section:

- background: `#F8FAFC` or `#FFFFFF`
- text: `#0B1320`

Dark section:

- background: `#0B1320`
- text: white
- muted text: approximately `rgba(255,255,255,.68)`

Avoid alternating dark/light every tiny section. Group content into larger visual chapters.

## 6. Cards

Recommended:

- radius: `12px–16px`
- 1px subtle border
- minimal shadow, if any
- meaningful padding: `24px–32px`

Cards should not all float with heavy shadows. Prefer structure and borders.

## 7. Buttons

Primary:

- blue background `#3B82F6`
- white text
- height approximately `46px–50px`
- radius `10px–12px`
- subtle hover lift or brightness shift

Secondary on dark:

- transparent/dark surface
- white border at low opacity
- white text

Secondary on light:

- white/light surface
- navy border
- navy text

Use arrow icons sparingly and consistently.

## 8. Iconography

Use a simple outline icon family (Lucide is suitable).

Rules:

- consistent stroke weight
- mostly 18–24px
- blue accents for service/feature icons
- avoid mixing filled cartoon icons with outline icons

## 9. Imagery and mockups

Preferred:

- actual screenshots of Business Craft projects
- laptop/phone/tablet compositions
- dashboard/product screens
- simple environmental product shots only when they support the section

Avoid:

- unrelated stock-office teams
- obvious AI faces
- generic handshake imagery
- futuristic CGI as a substitute for work samples

Project mockups should preserve the actual project UI. Do not redesign a client project merely to make the portfolio card prettier.

## 10. Motion

Motion must remain restrained:

- 250–500ms transitions
- opacity + 8–16px translate for reveal
- small hover elevation for interactive cards
- simple image parallax only if it does not hurt performance
- support `prefers-reduced-motion`

Do not use scroll-jacking, long intro animations, or constant floating elements.

## 11. Responsive behavior

Hero:

- desktop: text + product visual side by side
- mobile: text first, visual second
- do not shrink desktop typography blindly; use responsive clamps

Navigation:

- desktop links visible
- mobile compact menu/drawer
- persistent main CTA may become a menu item on small screens

Project grids:

- 2–3 columns desktop depending on card size
- 2 columns tablet
- 1 column mobile

Service cards:

- 4 columns desktop if readable
- 2 columns tablet
- 1 column mobile

## 12. Accessibility

Required:

- WCAG AA contrast
- semantic headings
- keyboard navigation
- visible focus states
- accessible button/link names
- meaningful image alt text
- form labels, not placeholders-only
- errors announced clearly
- touch targets around 44px minimum

## 13. Design QA checklist

Before shipping each page:

- Does it still look like `references/03-approved-brand-board.png`?
- Is blue used as an accent rather than flooding the page?
- Are real product visuals more prominent than decoration?
- Is there enough whitespace?
- Are claims factual?
- Are mobile layouts intentionally designed?
- Are hover/focus/active states complete?
- Is there any section that looks like a generic SaaS template? If yes, simplify/rework it.

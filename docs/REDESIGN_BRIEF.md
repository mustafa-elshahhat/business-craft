# Business Craft — Redesign Brief

**Status:** proposed direction, for owner approval before any code is written.
**Scope:** the full presentation layer: art direction, page architecture, design system, motion and responsive behaviour.
**Not in scope (kept as they are):** the locked logo system, verified project facts and captures, the content-integrity rules, the enquiry pipeline, SEO and metadata, accessibility behaviour, and the Next.js and content architecture.

Working name for the direction: **"Paper & Ink"**.

---

## 1. Design verdict

### The short version

The current site is **well engineered and honestly written, and it looks like everyone else.** It is a navy SaaS template: navy hero, Inter at weight 540, blue button, hairlines, and a grey second half on every headline. A visitor could swap the logo for any of a thousand agency or startup sites and not notice. The engineering is premium and the art direction is generic. That gap is the problem to fix.

### What is actually wrong

1. **The first screen sells ZTS, not Business Craft.** Above the fold, the strongest visual is another brand's beige fashion photo, serif headline and model. The studio's identity is handed over to a client. The same ZTS hero then appears again two scrolls later as the first "Selected Work" item, and a third time at the top of `/work`. Repeating it makes a five-project portfolio look like a one-project portfolio.
2. **The headline is a list, not a statement.** "Websites, E-commerce, Systems & Mobile Apps That Grow Your Business" is a category index with a stock ending. It is accurate and has no voice, and at 72px it fills three lines without being memorable.
3. **The two-tone headline is a tic.** A white or navy statement with a grey elaboration is used on nearly every heading (hero, services, story, process, closing, work, every page hero). Used once it would be a device. Used everywhere it is wallpaper.
4. **Client captures fight the brand.** Warm beige stores, a gold-and-black Arabic logistics site and green scrubs, all dropped raw onto navy or cool off-white at different sizes and crops. There is no presentation system, so the page takes on the colour of whichever client is on screen.
5. **The services section advertises absence.** Business Systems and Mobile Apps are shown as large navy "spec sheet" slabs: dark boxes whose job is to say "nothing to show here". They are honest, but visually they are the heaviest objects in the section, so the weakest proof gets the most visual weight. Meanwhile the sticky service index leaves a third of the page width empty for the whole section.
6. **The Selected Work collage looks unfinished.** It uses staggered, asymmetric tiles at four different sizes, with Dr Mirror floating at the bottom left beside half a screen of nothing. Asymmetry only reads as intentional when there is enough content to make the pattern legible. With five projects it reads as a gap.
7. **"More Than Just Development" is filler.** "We don't just build websites or apps" is the most common sentence on agency websites. Four generic principles in a 2×2 grid, next to a big empty column, add scroll length without adding credibility.
8. **The page is long and evenly loud.** Hero, services, work, story, why, process, CTA: seven chapters of similar weight and similar layout (heading top-left, link top-right, content below). Nothing peaks.

### Keep / improve / remove / redesign

| Keep (non-negotiable or genuinely good) | Improve | Remove | Completely redesign |
|---|---|---|---|
| Locked logo system and favicon | Navy and off-white palette: same colours, new behaviour (light-dominant, navy as ink) | The two-tone headline device | Hero |
| Verified-facts-only content rules | Inter: same family, new use (optical display cut, real scale contrast) | Hero auto-cycling screenshot carousel and its tabs | Work presentation |
| Real captures; no stock, no fake devices, no invented UI | The Soulmate builder story (best section; promote it to the flagship) | "Live projects" text line in the hero | Services section |
| Single conversion action ("Get a Free Consultation") | Process (merge with principles and make it concrete) | "More Than Just Development" section | Header behaviour and navigation |
| Accessibility work: focus, keyboard, reduced motion, no-JS | Closing CTA (merge with the footer as one sign-off) | Navy spec-sheet slabs for Systems and Mobile Apps | Mobile menu |
| Enquiry form pipeline and validation | Case-study template (same structure, new skin) | Sticky scroll-spy service index | Imagery presentation system |
| Content model in `content/` | Contact page (channels first, form second) | Services and Work dropdown menus | Section rhythm and spacing |
| Media loading discipline (lazy video, `next/image`) | | Theme-switching header | Mobile homepage structure |
| | | Scroll-linked "light travelling along the border" effect | |
| | | Blur-in text entrances | |

---

## 2. Product and brand interpretation

### What Business Craft is, commercially

A young, capable studio based in Egypt and selling to small and medium businesses, with ambitions in the GCC. It has five live projects, four of them e-commerce, **every one of them bilingual**, and two private point-of-sale systems. It cannot win on volume (no logo wall, no metrics, no testimonials). It **can** win on three things that are all true:

1. **The work is real and live.** Every project can be opened and clicked today.
2. **It builds properly in English and Arabic.** It ships genuine right-to-left layouts, not mirrored afterthoughts. For GCC and Egyptian buyers this is a hard requirement that most international-looking studios cannot demonstrate, and that most local studios do badly.
3. **It goes beyond templates.** The Soulmate box builder proves custom logic inside a store, which bridges "e-commerce" and "systems" in one example.

The redesign must make these three things unmissable. Everything else is secondary.

### What it should feel like

- **A studio, not a vendor.** Considered, edited, confident enough to leave space empty.
- **Established, not big.** Calm authority from typography and consistency, never from fake scale.
- **Practical.** A business owner should feel "these people understand selling and operations", not "these people like design awards".
- **Precise.** Things line up and repeat. Every image sits in the same system, which is how a small portfolio looks curated instead of thin.

### What kind of company it should visually resemble

A small, senior product studio that publishes its work like a print catalogue: light, typographic, with images presented as uniform specimens. Think of the visual temperament of a good architecture practice's website or a well-run Swiss design office, applied to commerce software. It should **not** resemble a SaaS product, a crypto/AI startup, a freelancer's Dribbble portfolio or a big-agency showreel.

### The first five seconds

The visitor should get, in this order:

1. **"This is a serious studio."** Large, confident type on a calm light page, and a recognisable B.
2. **"They build websites, stores and systems."** The four services are named in plain words directly under the headline.
3. **"And they have real, live work."** A row of five real phone screens from five different live businesses is visible on first load.

That is the whole job of the first screen: identity, offer, evidence. One action is available: **Get a Free Consultation**.

### What we must avoid

- Looking like a template or a SaaS product (the current risk).
- Letting any single client's art direction become our art direction.
- Implying scale we do not have: counters, logo walls, "trusted by", fake testimonials.
- Over-designing: a portfolio-site spectacle would scare off the actual buyer, a shop owner who wants a store that works.
- Visually apologising for missing proof (big empty panels that say "nothing here").

---

## 3. Creative direction: "Paper & Ink"

**One sentence:** a light, editorial, typography-led studio site where navy is the ink, the off-white is the paper, real product screens are presented as uniform specimens, and electric blue appears in one place only: the action.

| Dimension | Direction |
|---|---|
| **Visual character** | Editorial and architectural. Big type, strict grid, generous margins, hairline structure. Work shown as consistently framed specimens on neutral plates, like objects photographed for a catalogue. |
| **Mood** | Calm, assured, exact. Quiet confidence. The page should feel finished and deliberate, never busy. |
| **Typography philosophy** | Type is the brand's primary visual asset. Use extreme scale contrast (display up to ~150px against 16px body) instead of colour contrast. One family (Inter), with the optical **Display** cut for headlines. Weight does the work: 600 for display, 500 for headings, 400 for text. No grey half-headlines. Short headlines that can be set big. |
| **Layout philosophy** | Swiss-grid discipline: 12 columns, a hard left edge, and content that aligns to columns rather than floating. Asymmetry comes from column spans (for example 7/5, 4/8), never from scattered tiles. One idea per section. Each section has one dominant element. |
| **Colour behaviour** | Light-dominant. Pages are white and off-white; navy is the ink (text, rules, logo) and appears as a full ground in only **two** typographic moments per page (services and the closing sign-off). Blue `#2563EB` is reserved for the primary action and focus. No blue dots, no blue decorative markers, no blue headings. Client imagery always sits on a neutral **plate**, never directly on navy. |
| **Whitespace** | Generous and structural. Whitespace separates ideas, not decorations. Margins are large at the edges of sections, and content inside a section is tight and grouped. Empty columns are only allowed when they are part of the grid rhythm, never as leftovers. |
| **Imagery / artwork** | Real captures only. The signature format is the **phone specimen**: real mobile captures at identical height, aligned on a baseline, rounded like a screen, with no device chrome. Desktop captures appear cropped and inset on a plate, bleeding off the plate's bottom edge. Crops focus on meaningful moments (product page, builder step, cart, RTL layout), not full homepages. No illustrations, 3D, stock photography, AI imagery or abstract artwork. The B monogram's geometry (its stem, bars and chevron) may be used once, large and cropped, as a typographic object in the closing section. Nowhere else. |
| **UI density** | Low on the homepage (persuasion), medium on service and case-study pages (information), and higher on the contact form (task). Lists are typographic: ruled rows, not cards. |
| **Borders / radius** | Hairlines (1px, ink at 10–14%) are the main structural device. Radius is small and functional: 6px buttons and inputs, 4px plates, 6px desktop screens, 18px phone screens (because phones are round-cornered, that radius is truthful). Nothing pill-shaped except tags, and there are almost no tags. |
| **Shadows / depth** | Effectively none. Depth comes from tone: a screen sits on a plate that is one step darker than the page. There is one elevation token, used only for overlays (mobile menu, focus overlays). |
| **Motion philosophy** | Motion confirms, it doesn't perform. Short and mechanical, it never delays reading. No blur, no bounce, no scroll-jacking, no parallax stacks, no auto-advancing carousels. See §10. |

---

## 4. Design references

These are for quality and principle only. Nothing should be cloned.

| Reference | What we borrow | What we explicitly do not borrow |
|---|---|---|
| **Pentagram (pentagram.com)** | Work presented with total consistency. The studio's frame is neutral so each project can be itself without taking over the site. Typographic restraint. | Its scale of portfolio and its image-wall density. We have five projects, so we show them larger and fewer. |
| **Work & Co (case studies)** | Product screens as the hero of a case study, especially rows of real phone screens. Commerce work explained through flows (browse → product → cart), not adjectives. | Big-brand storytelling and video-heavy pages. |
| **Stripe Press / Stripe docs** | An editorial type scale, precision of alignment, and calm confidence on light grounds. Small typographic metadata done beautifully. | Gradients and animated illustrations from stripe.com marketing pages. |
| **Mercury** | Trust through calm. A financial-grade sense that "these people are careful", achieved with light grounds, careful copy and few colours. | The product-UI mockups. |
| **Josef Müller-Brockmann / Swiss International Style** | Grid as the source of order; asymmetric but strictly aligned compositions; type as image. | Poster-style experiments that hurt readability. |
| **Braun / Dieter Rams catalogues** | Objects photographed identically on neutral ground. This is the principle behind our phone specimens and plates: uniform presentation turns a small set into a collection. | Nostalgic retro styling. |
| **Linear (already cited in the current docs)** | Motion discipline only: fast, purposeful, state-confirming. | Its dark gradient aesthetic, which is exactly the look we are leaving. |

---

## 5. Page experience: the homepage, top to bottom

New architecture: **six sections, down from seven, and noticeably shorter.**

```
01  Hero ─ identity, offer, evidence          (white)
02  Selected work ─ flagship + four projects  (white, stone plates)
03  English ⇄ Arabic ─ signature proof        (stone ground)
04  What we build ─ the four services          (navy)
05  How a project runs ─ process + principles (white)
06  Sign-off ─ closing CTA + footer as one     (navy)
```

Rhythm: light, light, tinted, **dark**, light, **dark**. Two navy moments, both typographic, both captureless, so client imagery never sits on navy.

### 01 — Hero

See §6 for the full specification.
**Purpose:** identity, offer and evidence in one view. **Next:** the phone strip at the bottom of the hero peeks into the fold and hands over directly to Selected Work.

### 02 — Selected work

**Purpose:** prove capability with depth (one flagship) and breadth (four more), in one section.

**Hierarchy:**
1. Section opener: label `Selected work` and H2 "Live, in use, in two languages." On the right, a one-line description plus the link "All work →".
2. **Flagship: Soulmate Gift Store, "Build a gift box".** This is the existing four-step builder story, promoted and reskinned. It is the single most persuasive thing the studio has, because it shows custom logic, not just a theme.
3. **Grid of four:** ZTS Fashion, Dermiva Skincare, Dr Mirror, Saad Logistic.

**Composition (desktop):**
- Flagship spans the full width. Left 4 columns: project name (H3), one sentence, then the four steps as a ruled list. The active step has an ink rule on its left, and the inactive steps are muted. Right 8 columns: one large stone plate showing that step's desktop capture, inset 6% from top, left and right, bleeding off the bottom edge.
  - The text column is `position: sticky` while the four step captures change as you scroll past each step. There is no pinning of the page and no scroll capture; this is plain sticky positioning. Clicking a step also selects it. **No auto-advance.**
  - Under the plate: `E-commerce · English and Arabic · soulmate-accessories-store.vercel.app ↗` and "Read the case study →".
- The grid of four is a strict 2×2 on 6+6 columns with identical tiles. Each tile has:
  - A stone plate at 4:3 holding the desktop capture, inset and bottom-bleeding. On large screens, a phone capture of the same site overlaps the plate's right edge by 12%, which is the only overlap motif in the system and is used identically on every tile.
  - Below it: name (H3, 24–28px), then the meta line `E-commerce · English / Arabic` in the label style, then one sentence. The whole tile links to the case study, and a separate small `Live site ↗` link sits on the meta line.
- **Never show the same capture twice on the homepage.** ZTS uses its product page here, not its homepage hero. Assign crops deliberately: ZTS → product, Dermiva → buy box, Dr Mirror → product with variants, Saad Logistic → English homepage.

**Visual treatment:** white ground, stone plates (`#EEF0F3`), ink type. No shadows. The plates are the only "containers".

**Desktop behaviour:** the flagship uses sticky steps; tile hover is described in §10.

**Mobile behaviour:** see §9. The flagship becomes a horizontal, swipeable sequence of the four **mobile** builder captures (all four exist), each with its step caption. Tiles stack into a single column and use **mobile captures** instead of desktop ones.

### 03 — English ⇄ Arabic (signature section)

**Purpose:** turn the studio's most differentiating real capability into its most memorable moment. This is the section people should remember.

**Hierarchy:**
1. H2 (display size): "Built in English. Built again in Arabic."
2. Supporting line: "Every store we've shipped runs in both languages, with genuine right-to-left layouts: navigation, product pages, carts and checkout, not a mirrored afterthought."
3. The comparison itself.
4. A small project switcher: ZTS · Dermiva · Soulmate · Dr Mirror. These are the only four projects verified for bilingual/RTL claims. **Saad Logistic is excluded** per `CONTENT_AND_PROJECTS.md`.

**Composition (desktop):** a full-bleed stone ground. Two identical plates side by side (6+6), English on the left and Arabic on the right, top-aligned, each labelled above in the label style (`ENGLISH · LTR` / `العربية · RTL`). This is the only place Arabic text appears in the site chrome, and it is permitted because it is a label of the proof, not a language switch. The switcher sits below as plain text tabs with an ink underline on the active one. Switching crossfades both plates together (250ms).
- Pairs available today: `zts-fashion-home` / `-home-ar`, `dermiva-skincare-home` / `-home-ar`, `soulmate-gift-store-home` / `-home-ar`, `dr-mirror-home-en` / `dr-mirror-home`.

**Relationship:** it follows the work (you have just seen the projects, and now you see the depth of one dimension of them) and leads into services (now you know how they build; here is what they build).

**Desktop behaviour:** static pair and a click-to-switch control. No drag-wipe slider, which is a gimmick and awkward with mirrored layouts.

**Mobile behaviour:** a single plate showing **mobile** captures (`-home-mobile` / `-home-ar-mobile` exist for ZTS, Dermiva and Soulmate; Dr Mirror needs one capture, see §12), plus a segmented `EN | ع` toggle above the plate. The project switcher becomes a horizontal scroll row of text tabs.

### 04 — What we build (services)

**Purpose:** a clear, scannable offer that routes visitors to the right service page. It sells the services without pretending every service has equal proof.

**Hierarchy:**
1. H2: "What we build."
2. Four ruled rows, in commercial order: E-commerce, Websites, Business Systems, Mobile Apps. **E-commerce goes first** because it is where the proof is and probably where the revenue is.

**Composition (desktop):** a navy ground, so it is purely typographic. Each row is a full-width link on a 12-column grid:
- col 1: index `01` (tabular, muted)
- cols 2–5: service name at H3 display size (32–40px)
- cols 6–9: one-sentence outcome, then the "includes" list on a second line in a smaller muted style (for example "Catalogue · Variants · Cart & checkout · Arabic storefronts")
- cols 10–12: proof, right-aligned. Project names as text (for example "ZTS · Dermiva · Soulmate · Dr Mirror"), then the arrow.
- For Business Systems, the proof is "Auto Parts POS · Lap Service POS", with a small note: "Private systems: screens not published". It is stated plainly in one line, not as a slab.
- For Mobile Apps, the proof slot says "Scoped per project". It is honest, and quiet.

Rows are separated by hairlines (`paper` at 12%). Hover: the row ground lifts to navy+4%, the arrow moves 4px, and the service name stays put.

**Relationship:** this is the first navy moment, a deliberate tonal break after two light, image-rich sections. It is the "here's the menu" beat.

**Mobile behaviour:** rows stack as name, then sentence, then proof line, then arrow. The "includes" line is hidden on mobile because the service pages carry it. Each row is a ≥ 64px-tall tap target.

### 05 — How a project runs

**Purpose:** reduce perceived risk for a first-time buyer. This merges the old Process and "Why" sections and replaces the generic principles with concrete commitments.

**Hierarchy:**
1. H2: "How a project runs."
2. Four steps in four columns, each with: number, name, what happens (one sentence), and **what you receive** (one line, ink-weighted). For example:
   - **Discover:** "We learn how your business sells and operates." You receive: *a written brief of what we'll build.*
   - **Plan:** "Scope, timeline and price agreed before work starts." You receive: *a fixed scope and schedule.*
   - **Build:** "Design and development, with progress you can see." You receive: *working previews as it takes shape.*
   - **Launch:** "Tested, deployed and handed over." You receive: *a live product, ready for real customers.*
   - ⚠ The "you receive" lines are **commitments the owner must confirm** before publishing (§12).
3. A single closing line under the steps, replacing the old four principles: "One team from brief to launch. Direct updates throughout. English and Arabic as standard."

**Composition:** white ground and a 4×3-column grid. One hairline runs across the top of all four columns, and the step number sits on the line. The existing scroll-filled progress track is retired in favour of a static rule, because the fill effect suggested motion where none was meaningful.

**Mobile behaviour:** a vertical list with a left-aligned number column. No track animation.

### 06 — Sign-off (closing CTA and footer as one unit)

**Purpose:** convert, and end the page with weight.

**Composition:** one continuous navy block.
- Top: a display headline at section-opener size: "Tell us what you're building." Below it, one sentence: "A free consultation: we'll look at what you need and tell you honestly how we'd approach it." Then the actions: primary **Get a Free Consultation** (blue). Secondary channels are shown as text, but only when configured: WhatsApp first (commercially, the default channel in Egypt and the GCC), then email.
- Right side (desktop only): the **B monogram's geometry, very large and cropped by the section edge**, in `monogram white` at 6% opacity. This is the one brand-mark graphic on the site. The exact asset is used, never redrawn or recoloured beyond opacity. ⚠ Opacity on the locked asset needs owner sign-off; if refused, omit it.
- A hairline, then the footer: compact logo (dark variant), descriptor, columns (Work, Services, Studio, Contact), configured social links, ©.

**Mobile behaviour:** the headline is set at 40–44px, the CTA is full width, channels stack below as 52px rows, and the monogram graphic is omitted.

### Other pages (same system, briefly)

- **/work:** typographic page hero (H1 "Work.", one line). Below it, the five projects in the **same tile system** as the homepage grid, but larger (full-width tiles alternating 7/5 and 5/7 compositions), each with facts and both links. Then a ruled "Private systems" row naming the two POS projects. No filters: five projects do not need them.
- **/work/[slug] (case study):** full-bleed stone plate hero with desktop + phone capture → a facts row (Service · Languages · Live site) on a ruled 3-column strip → "The business" / "What we built" (2 columns) → **the key flow**, a horizontal sequence of 3–4 captures with numbered captions (product → options → cart, or the builder steps) → English ⇄ Arabic pair (reuse the homepage component) → next project as a large full-width link. Results are omitted until there are verified figures.
- **/services:** H1 and the same ruled four-row list as the homepage, at a larger scale and with the "includes" lists visible → "Not sure where to start?" mapping needs to services (keep the existing content) → How a project runs → sign-off.
- **/services/[slug]:** typographic hero with one proof plate → "Who it's for" and "What it solves" as two ruled lists → "What we build" as a deliverables grid of text only → proof tiles (same tile component) → FAQ, **only when the owner supplies answers** → other services → sign-off.
- **/about:** short. Statement → how we work (the same component) → standards (the existing six, as a ruled list) → sign-off. No team section until there is real material.
- **/contact:** two columns. Left: what happens next (three numbered lines) and direct channels as large tappable rows. Right: the form. The "service" field becomes a set of selectable chips (single-select radio group, styled), which is faster than a select menu and makes the four services visible one more time.

---

## 6. Hero direction

### Concept

**"Name, offer, evidence."** It is a typographic statement, a plain-language offer, and a row of five real phone screens from five live businesses, all on one calm light page. No carousel, no single client dominating, no device mock-ups.

### Composition (desktop, 1440 × 900 reference)

```
┌──────────────────────────────────────────────────────────────┐
│ [B Business Craft]          Work  Services  About  Contact  [Get a Free Consultation] │  64px header
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Built for                                                   │  display XL
│  real business.                                              │  (cols 1–10)
│                                                              │
│  E-commerce · Websites · Business systems · Mobile apps      │  offer line (lead, links)
│                                                              │
│  [Get a Free Consultation →]   See the work ↓    │ We design and build digital products │
│                                                  │ for businesses in English and Arabic.│ cols 9–12
│ ─────────────────────────────────────────────────────────────│ hairline
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                                │
│ │ZTS│ │DRM│ │SM │ │DrM│ │SAD│   ← five phone specimens,      │
│ │   │ │   │ │   │ │   │ │   │     same height, peeking       │
└─┴───┴─┴───┴─┴───┴─┴───┴─┴───┴────────────── fold ────────────┘
   ZTS Fashion · Store   Dermiva · Store   …   (captions under each)
```

### Headline treatment

- **Recommended H1:** **"Built for real business."** It is short enough to set at display-XL size, it is the brand descriptor ("Digital Solutions for Real Business") turned into a claim, and it is not a superlative.
- It is set in Inter Display 600, tracking −0.045em, line-height 0.9, ink colour, in a single tone. It breaks after "for" on desktop and is balanced on mobile.
- The services are **not** in the H1. They live in the offer line directly beneath, so the headline can be big and the offer can be explicit. The offer line (lead size, 22–28px, ink at 70%) lists the four services as links to their pages, separated by middots.
- *Fallback if the owner wants to keep the spec's message:* "Websites, stores and systems that grow your business." Set it one size smaller. It should not be the four-item list.
- ⚠ The H1 change departs from the "Preferred homepage message" in the master spec and needs owner approval (§12).

### Supporting copy

One sentence in the right column, body-large (18px), ink at 70%, max 30ch: *"We design and build digital products for businesses, in English and Arabic."* The old "sell more, work smarter and grow faster" triad is a cliché and is cut.

### CTA hierarchy

1. **Primary:** `Get a Free Consultation`. It is the blue solid button, 52px tall, with a right arrow. It is the only blue element in the viewport.
2. **Secondary:** `See the work ↓`, a text link with an underline that scrolls to Selected Work. No outlined second button.
3. The header CTA duplicates the primary. On the homepage it is hidden while the hero CTA is visible and slides in once the hero CTA scrolls out. This avoids two identical blue buttons in one view.

### Background and art direction

Plain white (`#FFFFFF`). There are no gradients, grain, glow, grid patterns or shapes. The only art in the hero is the work. A single hairline separates the text block from the specimen strip.

### Imagery: the phone specimen strip

- There are five real mobile captures, one per live project: `zts-fashion-home-mobile`, `dermiva-skincare-home-mobile`, `soulmate-builder-box-mobile` (the builder, not the homepage, which shows custom functionality), `dr-mirror-home-mobile` (Arabic, which quietly shows RTL), and `saad-logistic-home-mobile`.
- They are shown at identical height and aligned top, each with an 18px radius and a 1px ink-8% ring, with **no device frame**. They sit directly on white with no plate (phones are the plate).
- Each has a caption below: name in body-small ink, and category in the label style (`Store`, `Website`).
- Each phone links to its case study, so clicking evidence takes you to more evidence.
- On large desktop all five are fully visible at about 520px tall, and the strip's top portion is above the fold. On a laptop the strip is wider than the viewport, so the fifth phone peeks.

### Motion

- On load: the headline lines fade and rise 12px, 450ms, 60ms apart, once. **No blur.** The offer line and CTAs follow at +120ms. The phones fade and rise 16px, staggered 50ms, starting at +200ms. The total entrance finishes within about 900ms, and the LCP image is painted at full opacity from the first frame (the animation is on a wrapper transform only).
- On scroll (desktop only, scroll-driven CSS): the specimen strip translates horizontally up to −6% as the hero scrolls out. It is subtle, reveals the peeking phone on narrower screens, and is fully disabled under reduced motion.
- No auto-cycling. Nothing moves once the entrance has finished unless the user scrolls.

### Viewport usage

The hero is **not** forced to 100vh. Content defines the height. At 1440×900 the headline, offer and CTA plus the top ~40% of the phones are visible, so the fold cuts the evidence deliberately and invites the scroll. At 1920×1080 and above, the full phones are visible with a whitespace margin below.

### Tablet (768–1023)

- The headline is 88–104px, two lines. The offer line wraps to two lines.
- The supporting sentence drops below the CTAs (single column).
- The strip becomes a horizontal scroll-snap row showing 3.5 phones (the half phone signals scrolling). No scroll-linked translate.

### Mobile (< 768)

- Header (56px) → H1 at 52–60px across three lines ("Built for / real / business."). It is huge on purpose: on a phone the type is the hero.
- The offer line becomes a 2×2 grid of service links, each a 44px-tall ruled cell. This is a structural change: on mobile the services are navigation, not a sentence.
- The primary CTA is full width at 52px, with the "See the work" text link below it.
- Specimen strip: a horizontal scroll-snap carousel with each phone at 62vw and the next one peeking, captions below, and swipe only (no arrows, no dots).
- The supporting sentence is cut on mobile, because the offer grid already says it.

---

## 7. Header and navigation

### Desktop

- **Height:** 64px, condensing to 56px once scrolled more than 8px (200ms).
- **Content:** compact logo (light variant) on the left. Text links on the right: **Work · Services · About · Contact**, then the CTA. Work comes first because proof precedes the offer.
- **No dropdowns.** Four services and five projects do not need menus. A dropdown adds a hover/focus state machine, an extra click and visual noise. The pages are the menu.
- **Link style:** 15px Inter 500, ink at 75%. Hover moves to ink 100% with a 1px underline that grows from left (150ms). The current page shows a permanent 1px underline plus `aria-current`.
- **CTA:** a blue solid button at a compact 40px height. On the homepage it is hidden until the hero CTA leaves the viewport; on every other page it is always visible.

### Sticky / fixed behaviour

- Fixed. It **hides on scroll down** (translateY −100%, 220ms ease-in) after 120px and **reveals on any upward scroll** (200ms ease-out). It always shows when focus enters it and when the mobile menu is open.
- Background: always solid white at 100% (no glass, no blur). A hairline bottom border appears once scrolled.
- **No theme switching.** The header is always light, including over navy sections, where it reads as a crisp paper strip. This removes the current `HeaderTheme` observer and the crossfade.

### Mobile

- 56px. Compact logo plus a "Menu" text button. A labelled text button is clearer than a hamburger icon and is an intentional studio detail; a 44×44 hit area and `aria-expanded` are kept.
- **Mobile menu:** a full-screen **navy** sheet, using the dark logo variant.
  - Links at 40px Inter Display 600, left-aligned and stacked: Work, Services, About, Contact.
  - Under Services, the four service names are listed directly at 18px (no accordion). There are only four.
  - Pinned bottom area: the full-width primary CTA, then WhatsApp and email rows if configured.
  - "Close" text button in the same position as "Menu".
- **Transition:** the sheet fades in (180ms) while the links rise 8px with a 30ms stagger. Closing is a 140ms fade with no stagger. Focus is trapped inside, Escape closes it, the page behind is inert, scroll is locked, and focus returns to the "Menu" button.

### Mobile action bar (new)

After the hero CTA scrolls out, a slim bottom bar (56px plus safe area, white, hairline top) appears with **Get a Free Consultation** and, if configured, a WhatsApp icon button. It hides when the sign-off section is in view and while the keyboard is open on /contact. On a phone the conversion action is the most valuable thing on screen; currently it disappears after the first viewport.

---

## 8. Design system

Values are concrete enough to implement. Final CSS tuning happens in the build.

### 8.1 Colour tokens

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1320` | Text, rules, navy grounds (brand Primary Navy) |
| `ink-2` | ink at 72% | Secondary text on light |
| `ink-3` | `#64748B` | Tertiary text and metadata on light (≥ 4.5:1 on white) |
| `paper` | `#FFFFFF` | Default page ground |
| `paper-2` | `#F8FAFC` | Alternate light ground (brand Light) |
| `stone` | `#EEF0F3` | Plates and the bilingual section ground (new neutral) |
| `rule` | ink at 10% | Hairlines on light |
| `rule-strong` | ink at 18% | Input borders and emphasised rules |
| `on-ink` | `#F8FAFC` | Text on navy |
| `on-ink-2` | `#9AA4B5` | Secondary text on navy (check ≥ 4.5:1) |
| `rule-ink` | `#F8FAFC` at 12% | Hairlines on navy |
| `action` | `#2563EB` | Primary button, focus ring, text-link hover underline. **Nothing else.** |
| `action-hover` | `#1D4ED8` | Primary button hover |
| `error` / `success` | `#B42318` / `#067647` | Form states only |

`#3B82F6` (brand Accent) is retired from UI use, because `#2563EB` covers the action role at AA contrast. Logo blues stay inside the logo files.

### 8.2 Typography

Family: **Inter** (variable, self-hosted), using the **Inter Display** optical size for anything at 32px and above. Use tabular numerals for indexes and step numbers. Body uses `ss01`/`cv11` as now.

| Style | Size (mobile → large desktop) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| Display XL | 52 → 152px | 600 | 0.9 | −0.045em | Homepage H1 only |
| Display | 40 → 96px | 600 | 0.95 | −0.04em | Page H1s, section openers, sign-off |
| H2 | 32 → 56px | 600 | 1.0 | −0.03em | Section headings |
| H3 | 22 → 32px | 500 | 1.15 | −0.015em | Project names, service names, step names |
| Lead | 19 → 26px | 400 | 1.35 | −0.01em | Offer line and intros |
| Body L | 18px | 400 | 1.55 | 0 | Hero support and case-study prose |
| Body | 16px | 400 | 1.6 | 0 | Default |
| Small | 14px | 400 | 1.5 | 0 | Captions and footer |
| Label | 12px, uppercase | 500 | 1.2 | +0.06em | Metadata only (category, language). Max one per block. |

Rules:
- One tone per headline. Emphasis comes from size and weight, never from greying half the sentence.
- Headlines are written short (≤ 6 words for Display, ≤ 8 for H2).
- Measure: body ≤ 64ch, lead ≤ 40ch.
- No weights above 600. No italics except within quoted client copy.

### 8.3 Grid and containers

| Breakpoint | Columns | Gutter (outer margin) | Column gap | Max content width |
|---|---|---|---|---|
| Mobile < 768 | 4 | 20px | 16px | — |
| Tablet 768–1023 | 8 | 32px | 24px | — |
| Desktop 1024–1439 | 12 | 48px | 24px | — |
| Large ≥ 1440 | 12 | 64px | 32px | 1440px (content 1312px); grounds always bleed full width |

Bleed rules: section grounds always run full-bleed. The hero strip and the bilingual section may break the right margin (bleed to the viewport edge). Text never bleeds.

### 8.4 Spacing

A 4px base with this scale: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200**.

| Token | Mobile | Tablet | Desktop | Large |
|---|---|---|---|---|
| Section padding (block) | 64 | 96 | 128 | 160 |
| Section opener → content | 32 | 48 | 64 | 64 |
| Between related blocks | 24 | 32 | 48 | 48 |
| Inside a group | 8–16 | 8–16 | 12–16 | 12–16 |

Rule: space between groups is always at least 2× the space inside a group. That is where the current site goes flat.

### 8.5 Buttons and links

| Component | Spec |
|---|---|
| **Primary button** | `action` ground, white text, Inter 500 16px, 52px tall (40px compact in the header), 22px horizontal padding, 6px radius, trailing arrow. Hover: `action-hover`, arrow moves +3px. Active: translateY 1px. Focus: 2px `action` ring at 3px offset. Loading: label is kept, a spinner replaces the arrow, the button is `aria-busy`. Disabled: ink at 8% ground, ink-3 text. |
| **Text link** | Ink 500, 1px underline at 30% that goes to 100% on hover (150ms). External links get ↗. |
| **Inverse primary (on navy)** | Same blue button. Blue on navy passes; keep it identical for recognition. |
| **No secondary outlined button.** | The secondary action is always a text link. |

### 8.6 "Cards": there are none

The system has three containers and no cards:
1. **Plate:** a stone ground with 4px radius holding a capture (inset 6%, bottom-bleed for desktop captures). No border, no shadow.
2. **Ruled row:** a full-width row between hairlines, used for services, standards, steps, contact channels and footer lists.
3. **Phone specimen:** a capture with 18px radius and a 1px ink-8% ring, at a fixed height per context.

Card shells, rounded tiles with icons, hover-lift shadows and glass panels are all forbidden.

### 8.7 Borders and radius

| Element | Radius |
|---|---|
| Plates | 4px |
| Desktop captures | 6px (top corners only when bottom-bleeding) |
| Phone captures | 18px |
| Buttons, inputs, chips | 6px |
| Everything else | 0 |

Hairlines are 1px only. There are no 2px borders except the focus ring.

### 8.8 Icons

Lucide, 1.5px stroke, used only for **arrow-right, arrow-down, arrow-up-right (external), check, alert, WhatsApp/email/phone glyphs in contact rows, and the spinner**. The menu toggle is a text button ("Menu" / "Close"), not an icon. No service icons and no decorative icons. Icons are sized to cap height (16–20px).

### 8.9 Imagery rules

1. Real captures only, from `assets/projects/`, with captures documented in `assets/captures/*/CAPTURES.md`.
2. **Device-true:** on viewports < 768px, show mobile captures wherever a mobile capture exists. Desktop captures on a phone are illegible.
3. **Never repeat** a capture within a page.
4. Crops show a meaningful moment (product, option, cart, builder step, RTL layout), not just the homepage.
5. Captures always sit on a plate or as a phone specimen. They are never placed raw on navy and never full-bleed.
6. No retouching. Third-party chat launchers may be hidden before capture (existing rule).
7. Video clips (ZTS, Dermiva) are used only on case-study pages, inside a plate, muted, playing when ≥ 60% visible. They are not used on the homepage.

### 8.10 Surfaces

| Surface | Ground | Text | Rules | Allowed content |
|---|---|---|---|---|
| Paper | `paper` / `paper-2` | `ink` | `rule` | Everything |
| Stone | `stone` | `ink` | `rule` | Bilingual section, case-study heroes |
| Ink | `ink` | `on-ink` | `rule-ink` | Typography, buttons, the logo and monogram. **No captures.** |

### 8.11 States

Every interactive element defines: default, hover (pointer devices only, via `@media (hover:hover)`), focus-visible, active, disabled, and (forms) error, success and loading. The focus ring is the same everywhere: 2px `action`, 3px offset, and on navy the ring switches to `on-ink`.

Form specifics: labels are always visible above the field. Fields are 52px tall, 1px `rule-strong` border, 6px radius, and 16px text (prevents iOS zoom). Error: `error` border, message below linked by `aria-describedby`, focus moves to the first error. Success replaces the form with a confirmation block that has a heading and next steps.

---

## 9. Responsive strategy

The guiding rule: **each breakpoint gets the composition that suits it.** Mobile is designed as its own layout, not shrunk.

| | Large desktop ≥ 1440 | Desktop / laptop 1024–1439 | Tablet 768–1023 | Mobile < 768 |
|---|---|---|---|---|
| **Hero composition** | Two-zone: headline across 10 cols, support sentence in cols 9–12, five full phones visible | Same; strip overflows and the fifth phone peeks; scroll-linked drift | Single column; support below the CTAs; strip scrolls horizontally (3.5 visible) | Type-only top (3-line H1), 2×2 service grid, full-width CTA, swipe strip (1.4 visible) |
| **Headline size** | 152px | 120–136px | 88–104px | 52–60px |
| **Navigation** | Inline links + CTA | Same | Inline links (no About), CTA | "Menu" text button → navy sheet; bottom action bar after the hero |
| **Selected work: flagship** | Sticky 4-col steps + 8-col plate | Same | Steps above the plate as horizontal tabs; plate full width | Swipe sequence of 4 mobile builder captures with step captions |
| **Selected work: grid** | 2×2 with phone overlap | 2×2 with phone overlap | 2×2, no phone overlap | 1 column, mobile captures (portrait plates) |
| **Bilingual** | Side-by-side desktop pair | Same | Side-by-side, smaller | Single plate with mobile captures and an EN/ع toggle |
| **Services** | 4-zone ruled rows | Same, "includes" wraps | Name + sentence + proof (no includes) | Stacked rows, ≥ 64px targets |
| **Process** | 4 columns | 4 columns | 2×2 | Vertical numbered list |
| **Sign-off** | Display headline + monogram graphic | Same | No monogram | 40px headline, full-width CTA, channel rows |
| **Interactions** | Hover states, sticky steps, scroll drift | Same | Touch first, no hover dependencies | Swipe, toggles, sticky action bar; no hover-only info anywhere |

Additional rules:
- No content is hidden behind hover at any size.
- Horizontal scrollers use native scroll-snap, never JS carousels. They are keyboard-reachable (each item focusable), and the visible peek is the affordance (no dots).
- Touch targets ≥ 44px; primary actions on mobile are 52px.
- Test at 360, 390, 768, 1024, 1280, 1440 and 1920.

---

## 10. Motion direction

**Principle:** motion confirms an action or reveals a state change. If removing an animation loses no information, it shouldn't exist, apart from the single hero entrance.

| Where | Behaviour | Timing |
|---|---|---|
| **Hero entrance** | Lines fade and rise 12px (no blur), offer and CTA follow, phones stagger in | 450ms, `ease-out`, 60ms line stagger, 50ms phone stagger, all done by about 900ms |
| **Section entrances** | **Headings only** fade and rise 8px when 20% visible, once. Images and plates do **not** animate in; they are simply there. | 400ms `ease-out` |
| **Scroll** | Hero strip drifts horizontally up to −6% (desktop, scroll-driven CSS). Flagship steps use sticky positioning, with the capture crossfading as each step crosses the middle of the viewport. No pinning, no scroll-jacking, no smooth-scroll libraries, no parallax elsewhere. | Crossfade 250ms out / 350ms in |
| **Work tile hover** | Capture rises 6px inside its plate (the plate is fixed), the arrow moves 3px, the name underline appears | 200ms in / 300ms out |
| **Service row hover** | Row ground tint, arrow moves 4px | 150ms |
| **Links** | Underline grows from left | 150ms |
| **Buttons** | Colour shift, arrow +3px, 1px press | 120ms |
| **Header** | Hide on scroll down, reveal on scroll up, condense 64 → 56 | 200–220ms |
| **Mobile menu** | Sheet fade, links rise 8px with 30ms stagger; closing has no stagger | 180ms in / 140ms out |
| **Bilingual switch** | Both plates crossfade together | 250ms |
| **Navigation between pages** | Cross-document View Transitions: root crossfade only (supported browsers), plus a shared-element morph from a work tile's capture to the case-study hero capture | 200ms; morph 300ms |
| **Micro** | Form field focus border colour (100ms); chip selection (100ms); submit spinner; copy-email confirmation tick | — |

**Reduced motion:** no entrances, no drift, no view-transition morphs (instant), and crossfades become instant swaps. All content and controls work identically. **No JavaScript:** all content is visible and the sticky steps show all four steps stacked.

**Easing tokens** (keep the current ones): `ease-out cubic-bezier(.165,.84,.44,1)`, `ease-in cubic-bezier(.32,0,.67,0)`.

---

## 11. Anti-patterns: never on this site

**Layout and composition**
- The SaaS hero formula: navy ground, headline left, product screenshot right, blue button, logo strip.
- Dropping client screenshots raw onto navy or onto a page without a plate.
- Asymmetric "collage" grids with leftover gaps, or tiles at more than two sizes in one grid.
- Sticky side indexes or rails that leave a third of the page empty.
- Large dark panels whose content is "nothing to show yet".
- Sections whose only job is to say "we're different" ("More Than Just Development").
- Repeating the same capture twice on a page.

**Typography**
- Two-tone grey/ink headlines as a default device.
- Gradient text, outlined text, or text masked over video.
- Uppercase labels stacked above every heading (the current eyebrow habit). Labels are only for metadata.
- Headlines longer than eight words at display size.

**Colour, surface and depth**
- Gradients, mesh backgrounds, glows, noise or grain overlays.
- Glassmorphism and backdrop blur, including on the header.
- Blue used decoratively (dots, markers, underlines, icons, headings).
- Drop shadows on content. There is one elevation token, for overlays only.
- Radii above 18px; pill buttons.

**Imagery**
- Device mock-ups (laptops on concrete, phones floating at angles). The approved brand board did this; we are deliberately not doing it.
- Stock photos, AI-generated images, 3D blobs and abstract shapes.
- Service icons in rounded squares.
- Fake browser chrome.

**Content and proof**
- Counters and metrics ("50+ projects", "98% satisfaction"), logo walls and "trusted by" lines.
- Unapproved testimonials or star ratings.
- Showing responsive websites as mobile-app proof.
- Showing POS screens with client branding.
- Bilingual/RTL claims for Saad Logistic or any unverified project.

**Motion**
- Blur-in text, letter-by-letter reveals, split-text animations.
- Auto-advancing carousels or tabbed showcases.
- Marquees and infinite logo/project tickers.
- Scroll-jacking, pinned horizontal-scroll sections, smooth-scroll libraries.
- Cursor followers, magnetic buttons, tilt-on-hover, image zoom-on-hover.
- Glowing borders and light sweeps (including the current scroll-linked border light).
- Page-load preloaders and intro animations.

---

## 12. Final recommendation

> **If this were my product, this is exactly the direction I would approve.**

**Paper & Ink: a light, editorial, typography-led studio site.**

Business Craft stops looking like a navy SaaS template and starts looking like a careful product studio. The page is white, the brand navy becomes the ink, and type does the branding: Inter Display at real scale, one tone per headline. Electric blue appears in exactly one role, the action. Every piece of client work is shown in one uniform presentation system (stone plates and phone specimens), so five projects read as a curated collection rather than a thin one. No client's art direction takes over the page.

The homepage is rebuilt around the three things that are true and rare:

1. **Live work:** a hero that shows five real phone screens from five live businesses, under the statement "Built for real business." and a plain list of the four services.
2. **Custom capability:** the Soulmate box builder becomes the flagship case, with four honest stores alongside it in a strict 2×2.
3. **Genuine English ⇄ Arabic builds:** a signature section that shows the same store in both directions, side by side. Nobody else in this segment can show this as cleanly, and it is exactly what GCC buyers need to see.

The services become a decisive typographic menu with proof stated in words, so missing proof no longer becomes heavy dark panels. The process becomes four concrete commitments. The page ends with one navy sign-off that merges the CTA and the footer. Navigation loses its dropdowns, the header hides on scroll, and mobile gets its own composition plus a persistent consultation bar.

What doesn't change is the integrity of the current build: verified facts only, real captures, accessibility, performance, the content model and the form pipeline. This is a presentation-layer redesign. Most of `components/` is rewritten; `content/`, `lib/`, the routes and the enquiry action stay.

### Decisions the owner must make before build

1. **Light-dominant direction.** This departs from the brand board's "deep navy hero areas". It is my strongest recommendation, and it is the one that most needs sign-off.
2. **Homepage H1:** "Built for real business." replaces the spec's "Websites, E-commerce, Systems & Mobile Apps That Grow Your Business". The fallback is in §6.
3. **"You receive" lines in the process.** Confirm each is a real commitment (written brief, fixed scope and schedule, working previews).
4. **WhatsApp:** confirm a business WhatsApp number will be configured, because the mobile action bar and sign-off are designed to lead with it.
5. **Monogram graphic** in the sign-off at 6% opacity: confirm this use of the locked asset, or drop it.
6. **One new capture:** an English mobile capture of Dr Mirror (`dr-mirror-home-en-mobile`) to complete the bilingual mobile pairs.

### Build order (once approved)

1. Tokens and type (`globals.css`), container and grid, plate / phone-specimen / ruled-row primitives.
2. Header, mobile menu, mobile action bar, sign-off and footer.
3. Homepage sections in order 01–06.
4. Work tile → /work → case-study template (with the view-transition morph).
5. Services overview and detail, About, Contact.
6. Retire unused components (live-work window, service index, spec sheet, story-section skin, header theme observer, border-light CSS), then update `DESIGN_SYSTEM.md` and `PAGE_BLUEPRINTS.md` to match what shipped.

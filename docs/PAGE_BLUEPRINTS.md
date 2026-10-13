# Business Craft — Page Structure (as built)

Every page opens with a navy hero and ends with the shared closing CTA and footer. Light and navy chapters alternate between them. Copy, projects and services come from `content/`.

## Global

- **Header:** logo · Services ▾ · Work ▾ · About · Contact · Get a Free Consultation. Fixed and theme-aware.
- **Services menu:** the four services with one-line outcomes, How We Work (`/services#process`), Get a Free Consultation.
- **Work menu:** ZTS Fashion, Dermiva Skincare, Soulmate Gift Store (real thumbnails), All Work.
- **Footer:** logo and descriptor; Services, Work, Company, Contact columns; configured contact and social links only; dynamic year.

## `/` Homepage (benchmark)

1. Hero: two-tone headline, consultation CTA, live-work window cycling ZTS / Dermiva / Soulmate, live-project proof line
2. Services as chapters with a sticky scroll-spy index; real proof for Websites and E-commerce, spec sheets for Systems and Mobile Apps
3. Selected Work: ZTS feature with clip, then Dermiva, a Soulmate close-up and Dr Mirror
4. Soulmate case story: four real builder states
5. Why Business Craft: statement and four principles
6. Process: Discover, Plan, Build, Launch on a scroll-filled track
7. Closing CTA

## `/services`

Hero → "Where to start" (needs mapped to services) → one chapter per service, alternating sides, with real proof or a typographic panel → How we work (`#process`) → closing CTA.

## `/services/[slug]` — websites, e-commerce, business-systems, mobile-apps

Old slugs `/services/ecommerce` and `/services/systems` redirect permanently.

1. Hero with headline, intro and CTA (real media for Websites and E-commerce)
2. Who it's for + what it solves (Mobile Apps: how we approach it)
3. What we build (navy), with a link to How we work
4. Proof:
   - **E-commerce:** capability → live store table, then the four stores
   - **Websites:** Saad Logistic
   - **Business Systems:** spec sheet naming Auto Parts POS and Lap Service POS (no screens, which carry client branding)
   - **Mobile Apps:** honest approach panel, no case study
5. Other services, then closing CTA

## `/work`

Hero → five case-study chapters at varying scales (ZTS, Dermiva, Soulmate, Dr Mirror, Saad Logistic), each with category, languages, context, case-study link and live-site link → Business systems spec sheet (names only) → closing CTA.

## `/work/[slug]` — case studies

Pages exist only for projects with verified case studies (`content/case-studies.ts`); other slugs return 404.

1. Hero: project name, summary, verified facts (service, languages, live site), desktop + phone capture
2. Context and "What the live site includes"
3. Key interaction: a desktop + phone pair, or the interactive builder for Soulmate
4. More from the live site: clip (ZTS, Dermiva) and gallery
5. English and Arabic: the other language, desktop and phone
6. Next project, then closing CTA

No results section: no verified metrics exist. Add one only with owner-approved figures.

## `/about`

Hero → one team across four disciplines (service list) → "Judge us by the work" (three projects) → principles → standards (navy), with a link to How we work → closing CTA. No founder biography, team photos or headcount.

## `/contact`

Hero → what happens next + direct channels (only those configured) → enquiry form:

- Fields: name, company (optional), email, phone/WhatsApp (optional), service, project description.
- Delivery goes to `CONTACT_WEBHOOK_URL`. Without it the form is visibly marked as not connected.

## Not found

404 with a short message and links to the main pages.

# Business Craft — Master Prompt for Coding Agent

Copy the prompt below into the coding agent together with this entire folder.

```text
You are implementing the production Business Craft marketing website.

First, inspect the existing repository before changing anything. Preserve useful existing architecture and dependencies unless there is a clear reason to change them.

READ THESE FILES BEFORE CODING, IN THIS ORDER:
1. README.md
2. docs/BUSINESS_CRAFT_MASTER_SPEC.md
3. docs/DESIGN_SYSTEM.md
4. docs/PAGE_BLUEPRINTS.md
5. docs/CONTENT_AND_PROJECTS.md
6. docs/REFERENCES.md

Then inspect every image in references/.

SOURCE OF TRUTH:
- Written specs are authoritative for facts/content rules.
- references/03-approved-brand-board.png is the main visual identity reference.
- Page mockups are visual/composition references only.
- Do not copy unverified stats, testimonials, years, contact information, metrics, or results from generated mockups.

BRAND:
Business Craft
Digital Solutions for Real Business
Services: Websites, E-commerce, Systems, Mobile Apps
Language: English only.

APPROVED VISUAL DIRECTION:
Minimal / Premium / Editorial.
Primary #0B1320
Secondary #1F2937
Accent #3B82F6
Gray #94A3B8
Light #F8FAFC
Typeface: Inter
Logo direction: geometric B monogram + Business Craft wordmark.

The website should feel like a serious premium digital partner for real businesses. It must not look like a generic SaaS template, an AI-generated landing page, or a neon/futuristic startup.

VISUAL RULES:
- Dark navy hero sections, clean light content sections.
- Large confident typography with generous whitespace.
- Blue is an accent, not a page-filling gradient.
- Use subtle borders and restrained shadows.
- Use realistic project/product visuals.
- No random stock-team photography or fake AI people.
- No heavy glassmorphism.
- No scroll-jacking.
- Keep motion subtle and support prefers-reduced-motion.

PREFERRED HERO COPY:
Eyebrow: DIGITAL SOLUTIONS FOR REAL BUSINESS
H1: Websites, E-commerce, Systems & Mobile Apps That Grow Your Business
Body: We design and build digital products that help businesses sell more, work smarter and grow faster.
Primary CTA: Get a Free Consultation
Secondary CTA: See Our Work

ROUTES:
/
/services
/services/websites
/services/ecommerce
/services/systems
/services/mobile-apps
/work
/work/[slug]
/about
/contact

IMPLEMENTATION ORDER:
1. Audit repository.
2. Establish tokens, typography, layout primitives, shared components.
3. Header and footer.
4. Homepage.
5. Services overview.
6. Work page.
7. Project detail template and real project data.
8. About.
9. Contact.
10. Four service-detail pages using a reusable template.
11. Responsive/mobile pass.
12. Accessibility, SEO and performance QA.
13. Final visual QA against references.

IF STARTING FROM A FRESH NEXT.JS PROJECT, preferred baseline:
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Inter via next/font
- Lucide icons
- Framer Motion only where motion materially improves the experience
- next/image for optimized images

If the existing repository already has a suitable stack, use it rather than rewriting the project simply to match this suggestion.

ARCHITECTURE:
- Keep project/service content data-driven.
- Build reusable ProjectCard, ServiceCard, CTASection, SectionHeader, FAQ, Header, Footer, and project-detail blocks.
- Avoid duplicating four service pages as unrelated markup; use shared patterns with service-specific content.
- Keep contact/social/company configuration centralized.

PROJECT CONTENT:
Known public project links include ZTS Fashion, Dr Mirror, Soulmate Gift Store, Dermiva Skincare, and Saad Logistic. Additional known projects are listed in docs/CONTENT_AND_PROJECTS.md.
Validate descriptions against the real project/repo before publication.

TRUTH RULE:
Never invent client counts, revenue/sales growth, satisfaction percentages, testimonials, technology choices, dates, or business results. If data is unavailable, omit the metric and design the section to work without it.

RESPONSIVE:
Design intentionally for desktop, tablet and mobile. Do not simply stack every desktop block. Preserve hierarchy, keep CTAs accessible, and make project imagery readable.

QUALITY:
- Semantic HTML.
- WCAG AA contrast.
- Keyboard/focus states.
- Proper form labels/errors.
- Metadata/OG/sitemap/robots.
- Dynamic current year in footer.
- Good Core Web Vitals.
- No console errors.
- No layout overflow at 360px, 768px, 1024px, 1440px and wider desktop widths.

Do not stop after creating a rough layout. Finish each page to production-quality visual detail, run lint/typecheck/build if the repo provides them, and report exactly what was changed, what remains placeholder, and what content still requires owner confirmation.
```

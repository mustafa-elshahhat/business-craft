# Project agent skills

The agent skills for the Business Craft website. They are kept in the repository so that every Claude Code session, local or cloud, loads the same pinned versions.

The approved brand always wins. The documents in `docs/` and the images in `references/` are the source of truth. No skill here may redesign or reinterpret the Business Craft identity.

## Vendored skills

| Skill (directory) | Upstream | Pinned commit | Version | License | Local changes |
|---|---|---|---|---|---|
| `impeccable/` | https://github.com/pbakaus/impeccable (path `.claude/skills/impeccable`) | `245ad82def45831dc56a21b683c7a1ff530b06cc` (2026-10-12) | skill 4.5.2, engine 0.1.14 (not vendored) | Apache-2.0 (`LICENSE`, `NOTICE.md`) | Yes, see below |
| `vercel-react-best-practices/` | https://github.com/vercel-labs/agent-skills (path `skills/react-best-practices`) | `063bee94c3f4df8453406c830b0a7df0f2860278` (2026-08-28) | 1.0.0 | MIT (declared in `SKILL.md` and the upstream README) | None |
| `vercel-composition-patterns/` | https://github.com/vercel-labs/agent-skills (path `skills/composition-patterns`) | `063bee94c3f4df8453406c830b0a7df0f2860278` (2026-08-28) | 1.0.0 | MIT (declared in `SKILL.md` and the upstream README) | None |
| `web-design-guidelines/` | https://github.com/vercel-labs/agent-skills (path `skills/web-design-guidelines`), with rules from https://github.com/vercel-labs/web-interface-guidelines (`command.md`) | skill `063bee94c3f4df8453406c830b0a7df0f2860278`, rules `434b7f91364665f2f733b310ec54809bf8f37937` (2026-10-05) | 1.0.0 | MIT (`LICENSE`, from web-interface-guidelines) | Yes, see below |

### Local changes

**`impeccable/`**
- Only `SKILL.md` and `reference/` are vendored. The upstream `scripts/` directory is **deliberately left out**. It contains:
  - a shell launcher (`scripts/impeccable`) that, when no engine is present locally, downloads a prebuilt platform binary from `github.com/pbakaus/impeccable/releases` (tag `engine-v0.1.14`), checks it against a `.sha256` file and runs it;
  - live-browser JavaScript that is injected into the running page and talks to a localhost server;
  - data files that only the engine uses.

  Without `scripts/`, the skill follows its own documented **"Launcher unavailable"** path.
- `SKILL.md` frontmatter: `description` and `argument-hint` are narrowed to the five allowed commands, so the skill does not auto-trigger on build or redesign work.
- `SKILL.md` body: a **Business Craft project restrictions** block is inserted directly after the frontmatter. It covers:
  - the allowed commands: `critique`, `audit`, `polish`, `quieter`, `distill`;
  - the approved brand as a pinned brief;
  - no engine binary, `npx impeccable`, hooks or live server;
  - no `PRODUCT.md`, `DESIGN.md` or `.impeccable/` files.
- `reference/bolder.md` and `reference/overdrive.md` are removed. Those commands are forbidden on this project.

**`web-design-guidelines/`**
- Upstream, `SKILL.md` fetches the guidelines from the `main` branch of `vercel-labs/web-interface-guidelines` at every review, which means unpinned instructions arrive at runtime.
- The rules are now vendored as `guidelines.md`, pinned at the commit above. `SKILL.md` is patched to read that file and never fetch.
- `SKILL.md` also states that the brand wins over any conflicting guideline.

`vercel-react-best-practices/` and `vercel-composition-patterns/` are unmodified upstream copies, documentation only. Their `README.md`, `metadata.json` and `AGENTS.md` describe upstream build tooling that this project does not use.

## Skills provided by the environment (not vendored)

| Skill | Source | Use |
|---|---|---|
| `design:accessibility-review` | Enabled claude.ai `design` plugin | WCAG 2.1 AA audit (required) |
| `code-review` | Built into Claude Code | Final review |
| `security-review` | Built into Claude Code | Final review (contact form, configuration) |
| `run` | Built into Claude Code | Launching the site and taking screenshots |

Visual QA uses **Playwright with the pre-installed Chromium**, not a skill.

## Intentionally not installed

`frontend-ui-ux-pro`, `frontend-visual-qa`, `frontend-a11y`, `frontend-motion-pro`, `vercel-react-view-transitions`, `frontend-typography-rtl`.

## Usage workflow

1. **Foundation and components:** `vercel-react-best-practices`. Use `vercel-composition-patterns` only at shared-template boundaries: the service-detail template, project-detail blocks and card variants.
2. **After each page:**
   - Playwright screenshots at 360, 768, 1024 and 1440px, compared with the matching reference image.
   - `impeccable` critique, then polish, quieter or distill.
   - `web-design-guidelines` on the changed files.
3. **Before release:**
   - `design:accessibility-review` and automated axe checks.
   - Lighthouse / Core Web Vitals.
   - `code-review` and `security-review`.
   - A final visual comparison against `references/03-approved-brand-board.png`.

Impeccable findings that would change the brand are reported to the owner as proposals and are never applied.

## Updating a skill

1. Clone the upstream repository at the new commit and review the diff, especially any new scripts or network access.
2. Copy only the files listed above.
3. Re-apply the local patches.
4. Update the commit hashes in this file.
5. Commit the update on its own.

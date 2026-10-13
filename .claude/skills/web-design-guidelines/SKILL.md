---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the pinned guidelines in guidelines.md (see below)
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the pinned guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

**Business Craft local patch:** use the pinned copy in this skill directory, [guidelines.md](guidelines.md), instead of fetching remotely. It is `command.md` from https://github.com/vercel-labs/web-interface-guidelines at commit `434b7f91364665f2f733b310ec54809bf8f37937` (see `.claude/skills/README.md`). Do not fetch the `main` branch at review time; to update, re-vendor the file at a new pinned commit.

Where a guideline conflicts with the approved Business Craft brand (`docs/` and `references/`), the brand wins; report the conflict instead of changing the design.

## Usage

When a user provides a file or pattern argument:
1. Read the pinned guidelines in guidelines.md
2. Read the specified files
3. Apply all rules from the pinned guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

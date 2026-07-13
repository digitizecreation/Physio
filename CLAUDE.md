# Claude.md

> Permanent instruction manual for AI coding agents working on this project.
> Read this file first before making any changes.

---

## Project Overview

**Dr. Samrudhhi A. Mane — Physiotherapist Website**

A premium, fully responsive, animated single-page marketing website for a physiotherapy practice in Kopar Khairane & Ghansoli, Navi Mumbai. The site showcases specializations, patient reviews, a treatment process timeline, an interactive body diagram, a chatbot, and an appointment booking form.

**Live business details (verified from Google Places):**
- Phone: +91 97673 98194
- Address: Physiotherapy Center, Satyam Hospital, Vashi Kopar Khairane Rd, Sector 14, Kopar Khairane, Navi Mumbai, Maharashtra 400709
- Rating: 4.9★ (155+ Google reviews)
- Hours: Open 24×7, 7 days a week
- Google Places CID: 2265102277036777400

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript 5** (strict mode, `noImplicitAny: true`) |
| UI | **React 19** |
| Styling | **Tailwind CSS 4** (CSS-based config via `@theme inline` in `globals.css` — NO `tailwind.config.ts`) |
| Components | **shadcn/ui** (New York style) + **Lucide icons** |
| Animation | **Framer Motion** (`motion`, `useInView`, `useReducedMotion`) |
| Carousel | **Embla Carousel React** v8 |
| Theme | **next-themes** (light/dark, class-based) |
| Fonts | **Plus Jakarta Sans** (headings) + **Inter** (body) via `next/font/google` |
| Package manager | **Bun** |

---

## Commands

```bash
bun run dev        # Start dev server on port 3000 (auto-runs in sandbox — do NOT run manually)
bun run lint       # ESLint check — run after every change
bun run build      # Production build (do NOT run in sandbox)
npx tsc --noEmit   # Type check (use to verify no TS errors in src/)
```

**Do NOT run `bun run dev`** — it's already running automatically in the background.

**Do NOT run `bun run build`** — use `bun run lint` and `npx tsc --noEmit` for verification instead.

---

## Project Structure

```
/home/z/my-project/
├── Caddyfile                    # Gateway config — hostname-based for TLS (drsamrudhhimane.in → 3000)
├── Claude.md                    # THIS FILE — permanent instruction manual for AI agents
├── next.config.ts               # Security headers (CSP, HSTS, etc.), reactStrictMode, images.remotePatterns
├── eslint.config.mjs            # Flat config — pragmatic rules re-enabled (no-unused-vars, exhaustive-deps, etc.)
├── tsconfig.json                # strict: true, noImplicitAny: true
├── package.json                 # Dependencies (many unused — see "Known Debt" below)
├── prisma/schema.prisma         # Dormant — no DB is used by the site
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout: fonts, metadata, JSON-LD (@graph: Physician + FAQPage)
│   │   ├── page.tsx             # Main page — single route, composes all sections
│   │   └── globals.css          # Theme tokens (OKLCH), brand palette, custom utilities, keyframe animations
│   │
│   ├── components/
│   │   ├── site/                # All custom section components (see "Section Components" below)
│   │   ├── theme-provider.tsx   # next-themes wrapper
│   │   └── ui/                  # shadcn/ui primitives (only ~6 are actually used)
│   │
│   ├── lib/
│   │   ├── site/data.ts         # ALL business data, reviews, FAQs, nav links — single source of truth
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   │
├── .claude/
│   └── agents/                  # Custom subagents — see "Subagents" below
│       ├── code-reviewer.md     # Read-only reviewer for diffs, bugs, code quality
│       └── security-reviewer.md # Read-only auditor for XSS, CSP, secrets, PII
│
├── public/
│   ├── icon.svg                 # Favicon
│   ├── og-image.png             # 1200×630 social share image (generated via scripts/generate-og-image.py)
│   └── robots.txt
│
└── scripts/
    ├── generate-og-image.py     # Python/Pillow script to regenerate og-image.png
    ├── update-claude-md.ts      # AI-powered script that auto-updates Claude.md after each commit
    ├── post-commit               # Git post-commit hook (runs lint + tsc + update-claude-md.ts)
    └── install-hooks.sh         # One-command installer for the git hook
```

---

## Section Components (`src/components/site/`)

The page is composed of these sections in order (defined in `page.tsx`):

| # | Component | File | Notes |
|---|---|---|---|
| — | `LoadingScreen` | `loading-screen.tsx` | 300ms delay, skips entirely for `prefers-reduced-motion` |
| — | `TopBar` | `top-bar.tsx` | Thin premium bar above navbar: phone, Google rating, hours, Book CTA. Solid royal bg. Hidden on mobile (`sm:block`), hidden on scroll |
| — | `Navbar` | `navbar.tsx` | Sticky, glassmorphic, hide-on-scroll with `inert` when hidden. Mobile drawer with focus trap |
| 1 | `Hero` | `hero.tsx` | Interactive hover text, animated gradient, SVG doctor illustration |
| 2 | `About` | `about.tsx` | SVG portrait + story + 4 pillars |
| 3 | `Specializations` | `specializations.tsx` | **Dark navy bg** (`#0f172a`), 8-col compact grid, colorful icons |
| 4 | `WhyChoose` | `why-choose.tsx` | Embla carousel, 9 premium cards, autoplay with pause + reduced-motion support |
| 5 | `TreatmentProcess` | `process.tsx` | 7-step animated timeline |
| 6 | `Reviews` | `reviews.tsx` | Embla carousel, 5 real Google reviews, autoplay with pause + reduced-motion support |
| 7 | `HomeVisit` | `home-visit.tsx` | Benefits + SVG house illustration |
| 8 | `Statistics` | `statistics.tsx` | Animated counters, Google "G" + yellow stars |
| 9 | `BodyDiagram` | `body-diagram.tsx` | Interactive SVG body — click parts to see treatments. Hotspot focus is restored on panel close (see Known Debt #5 → fixed) |
| 10 | `MiniTools` | `mini-tools.tsx` | BMI calculator + pain self-assessment |
| 11 | `Gallery` | `gallery.tsx` | Magazine-style featured + grid layout, lightbox |
| 12 | `Faq` | `faq.tsx` | Accordion, 7 FAQs |
| 13 | `Appointment` | `appointment.tsx` | Controlled form, consent checkbox, Privacy dialog, honest notice |
| 14 | `Contact` | `contact.tsx` | Google Maps embed (sandboxed), contact cards |
| 15 | `Footer` | `footer.tsx` | Quick links, Privacy/Terms dialogs (DPDP Act 2023 compliant) |
| — | `FloatingActions` | `floating-actions.tsx` | Scroll progress, back-to-top, WhatsApp/Call (desktop only; mobile uses sticky CTA) |
| — | `ChatBot` | `chatbot.tsx` | FAQ-powered chatbot with quick replies, PII disclaimer, `aria-live` messages |

**Utility components:**
- `reveal.tsx` — `Reveal`, `StaggerGroup`, `StaggerItem`, `SectionHeading`, `SectionWrap` (all respect `useReducedMotion`)
- `motion.tsx` — `Counter`, `Magnetic` (both respect `useReducedMotion`)
- `icon.tsx` — `Icon` component mapping string keys to Lucide icons
- `google-brand.tsx` — `GoogleG`, `GoogleStar`, `GoogleStars` (official Google colors: #4285F4, #34A853, #FBBC05, #EA4335). `GoogleStar` accepts a `style` prop.

---

## Subagents (`.claude/agents/`)

Two read-only custom subagents live in this directory. Each is a Markdown file with YAML frontmatter (name, description, model, tools) and a system-prompt body. They are **strictly read-only** — they never edit, commit, install, or build.

| Agent | Purpose | Tools | Scope conventions |
|---|---|---|---|
| `code-reviewer` | Reviews diffs and source for bugs, type-safety holes, React/Next.js 16 idiom violations, performance, simplification, reuse, and accessibility | `Read, Grep, Glob, Bash` | Default: staged + unstaged changes vs HEAD. Override with `--scope <path>`, `--scope main..HEAD`, `--scope HEAD~3`, or `--scope <file>` |
| `security-reviewer` | Audits `src/`, `next.config.ts`, `Caddyfile`, `package.json`, and env files for XSS, CSP gaps, header gaps, iframe sandbox, link rel, form validation, PII handling, secrets, dependency CVEs, SSRF | `Read, Grep, Glob, Bash` | Default: full `src/` + the three config files. Override with `--scope <path>` or `--scope <range>` |

**Both agents are pre-loaded with the project rules in this file** — they know about Google branding, `inert` patterns, Embla casts, `cn()` usage, the no-`unsafe-eval` rule, the dev-mode `eval()` Known Debt, the Caddyfile SSRF history, and the DPDP Act 2023 / PII boundaries. They cross-check against these before reporting, so they will not re-flag the items in "Known Debt" as new findings.

**Output contract** (both agents): ranked findings (`🔴 blocker` / `🟠 high` / `🟡 medium` / `🟢 nit` for code; `🔴 critical` / `🟠 high` / `🟡 medium` / `🔵 info` for security) with `file:line`, what, why, and a suggested fix. Each finding must include a credible exploit scenario (security) or reproduction (code). They also produce a "Looks good ✅" / "Controls verified ✅" section enumerating what was checked but not flagged.

**Invocation:** The subagent files are the agents' system prompts. If the harness discovers them, the `Agent` tool will accept `subagent_type: "code-reviewer"` and `subagent_type: "security-reviewer"`. If discovery is not active in the current Claude Code version, run them by dispatching a `general-purpose` agent with the file's contents as its brief.

**Discovery caveat (Windows / non-sandbox dev):** On this Windows machine the harness did not auto-discover the agents mid-session. They were verified by dispatching via `general-purpose` with the system-prompt body inlined. After a session restart, the built-in agent picker may show them. Either way, the files themselves are the source of truth.

---

## Key Conventions

### Data
- **All business data lives in `src/lib/site/data.ts`** — phone, address, reviews, FAQs, nav links, specializations. Edit this file to update content site-wide.
- Reviews are **real Google reviews** with profile photo URIs from `lh3.googleusercontent.com`.

### Styling
- **Brand palette** is defined as CSS custom properties in `globals.css` under `:root` and `.dark`:
  - `--royal` (royal blue), `--teal`, `--healing` (healing green), `--deep-navy`, `--surface`
- **Custom utility classes** in `globals.css` `@layer utilities`: `glass`, `glass-card`, `gradient-royal-teal`, `gradient-healing`, `gradient-text`, `gradient-text-soft`, `bg-mesh`, `shadow-premium`, `shadow-glow-royal`, `shadow-glow-teal`, `shadow-glow-healing`, `text-interactive`, `text-interactive-teal`, `text-interactive-healing`, `gradient-text-hover`, `underline-grow`
- **Custom animations**: `animate-blob`, `animate-breathe`, `animate-gradient-shift`, `animate-pulse-dot`, `animate-pulse-ring`, `animate-shimmer`, `animate-spin-slow`, `animate-marquee`
- **Tailwind v4** — no JS config file. All config is in `globals.css` via `@theme inline`. Do NOT create a `tailwind.config.ts`.

### Components
- **Always use `"use client"`** at the top of any component that uses React hooks, state, or Framer Motion.
- **Use `cn()`** from `@/lib/utils` for conditional class merging.
- **Use `<a>` for in-page hash anchors** (`href="#about"`), NOT `next/link` `Link`.
- **Use `next/link` `Link`** only for actual route navigation (this site has one route, so it's rarely needed).
- **Accessibility is mandatory**: every modal/drawer/lightbox must have `role="dialog"`, `aria-modal="true"`, focus trap, ESC handler, and focus restore on close. See `navbar.tsx`, `gallery.tsx`, `footer.tsx`, `appointment.tsx`, `chatbot.tsx` for patterns.
- **`inert` attribute**: when a container is hidden via `transform` (e.g. navbar on scroll), add `inert` and `aria-hidden` to prevent keyboard focus on off-screen elements. See `navbar.tsx` line 80.
- **Respect `prefers-reduced-motion`**: use `useReducedMotion()` from Framer Motion in ANY animation component — including carousels (`reviews.tsx`, `why-choose.tsx`), counters, reveals, and the loading screen.
- **`aria-live` for dynamic content**: chatbot messages container has `aria-live="polite"` so screen readers announce new messages.

### Google Branding
- **Always use** `GoogleG` and `GoogleStar` from `src/components/site/google-brand.tsx` for Google logos and stars.
- **Never use green Lucide stars** for ratings — use `GoogleStar` (yellow `#FBBC05`).
- The `GoogleStar` component accepts a `style` prop for staggered animations.

### Carousels (Embla)
- The `embla.on("select", handler)` return type is incorrectly typed in v8 — cast it: `as unknown as (() => void) | undefined`
- Always implement autoplay with pause on hover/focus AND pause on tab visibility change (`visibilitychange` listener).
- Always guard autoplay with `useReducedMotion()` — disabled entirely for reduced-motion users.

---

## Security

### What's in place
- **CSP** in `next.config.ts` `headers()`: `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` (no `unsafe-eval`)
- **Security headers**: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS with preload
- **Caddyfile** uses hostname-based site block (`drsamrudhhimane.in`) for TLS termination — HSTS is effective in production
- **JSON-LD is HTML-escaped** in `layout.tsx` (escapes `<`, `>`, U+2028, U+2029 before `dangerouslySetInnerHTML`)
- **No `eval`, `Function`, string-arg `setTimeout`, `innerHTML`, or `document.write`** anywhere in `src/`
- **No XSS sinks** — chatbot user input rendered via JSX children (React-escaped), all `href` sinks derive from hardcoded `BUSINESS` constants
- **All `target="_blank"` links** carry `rel="noopener noreferrer"`
- **Reviewer avatar images** use `referrerPolicy="no-referrer"` to prevent referrer leakage
- **Google Maps iframe** is sandboxed (`sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"` — no `allow-same-origin`)
- **Appointment form** has consent checkbox, `maxLength` on all fields, `pattern` validation on phone, honest "booking request" notice
- **Privacy Policy dialog** with DPDP Act 2023 content, accessible from footer AND appointment consent link
- **Chatbot** has PII/PHI disclaimer ("don't share personal or medical details here")

### What NOT to do
- ❌ Do NOT re-enable `typescript.ignoreBuildErrors` — it's `false` for a reason
- ❌ Do NOT add `'unsafe-eval'` to the CSP `script-src`
- ❌ Do NOT use `dangerouslySetInnerHTML` without HTML-escaping
- ❌ Do NOT remove the security headers from `next.config.ts`
- ❌ Do NOT re-add the `XTransformPort` block to `Caddyfile` (it was an SSRF vulnerability)
- ❌ Do NOT use `allow-same-origin` in the Maps iframe sandbox

---

## Known Debt

1. **Unused dependencies** in `package.json`: `next-auth`, `prisma`, `@prisma/client`, `@mdxeditor/editor`, `@dnd-kit/*`, `react-syntax-highlighter`, `recharts`, `react-resizable-panels`, `cmdk`, `react-day-picker`, `date-fns`, `uuid`, `zustand`, `@tanstack/react-query`, `@tanstack/react-table`, `react-hook-form`, `@hookform/resolvers`, `zod`, `next-intl`, `vaul`, `input-otp`, `sonner`, `@reactuses/core`, `sharp`. Run `depcheck` and prune when convenient.
2. **Unused shadcn/ui components** in `src/components/ui/`: only `button`, `input`, `label`, `textarea`, `accordion`, `dialog` (indirectly) are actually used by site components. The rest are safe to delete.
3. **Dormant Prisma**: `prisma/schema.prisma` exists but no code imports `@/lib/db`. The `db.ts` file was deleted. Schema is boilerplate `User`/`Post` models — safe to delete if no DB is planned.
4. **Appointment form** simulates submission with `setTimeout`. To wire a real backend, the controlled form state (`form.name`, `form.phone`, `form.notes`, `selectedSlot`, `selectedCondition`, `date`, `homeVisit`) is ready to send to a Route Handler. An honest "booking request" notice is displayed.
5. ~~**BodyDiagram** lacks focus management~~ — **fixed 2026-07-13**: hotspot `triggerRef` map added, focus restored on panel close via `requestAnimationFrame` (see `body-diagram.tsx:86-101, 152`).
6. **Footer LegalDialog** doesn't restore focus to the trigger button on close (minor a11y gap).
7. **CSP `'unsafe-inline'`** in `script-src` — would need per-request nonces via Next.js middleware to tighten further.
8. **Dev-mode `eval()` console warning** — Next.js 16 + React 19 RSC probe (`checkEvalAvailabilityOnceDev`) is blocked by the strict CSP. The probe only exists to reconstruct nice stack traces in the dev error overlay; the page itself runs fine (HTTP 200, full content rendered). **Do not fix this by adding `'unsafe-eval'`** — the proper fix is item #7 (per-request nonces). Production builds do not emit this warning.

---

## Build & Lint

- **`bun run lint`** must pass with zero errors before any change is considered done.
- **`npx tsc --noEmit`** must show zero errors in `src/` (errors in `examples/` and `skills/` are expected and can be ignored — those directories are not part of the app).
- **`next.config.ts`** must NOT have an `eslint` key (it was removed from Next.js 16's `NextConfig` type and will cause a TS error).
- **`reactStrictMode: true`** — effects double-invoke in dev, which is intentional for catching bugs.
- **`scripts/` directory** is ignored by ESLint (contains the auto-update script which uses `console.log` intentionally).

---

## Git Hooks (Auto-Update System)

A git `post-commit` hook automatically updates this file after every commit:
1. Runs `bun run lint` + `npx tsc --noEmit` (code quality check)
2. Runs `scripts/update-claude-md.ts` which uses the z-ai SDK to analyze the commit diff
3. Appends a changelog entry to the "Changelog" section below
4. Amends the commit to include the Claude.md update

**To skip the hook**: `SKIP_CLAUDE_MD_UPDATE=1 git commit -m "..."`
**To reinstall**: `bash scripts/install-hooks.sh`
**To dry-run**: `bun run scripts/update-claude-md.ts --dry-run`

---

## Sandbox Environment Notes

- The dev server auto-runs on port 3000. Do NOT start it manually.
- The only user-visible route is `/` (`src/app/page.tsx`). Do NOT create other routes.
- Use **relative paths only** for API requests (`fetch('/api/...')`), never absolute URLs with ports.
- For WebSocket, use `io("/?XTransformPort={Port}")` format if ever needed (see `examples/websocket/`).
- Files in `/home/z/my-project/download/` are user-facing deliverables.
- Generation scripts go in `/home/z/my-project/scripts/` and should be persisted (not run inline).

---

## Browser Verification

After making changes, verify with **Agent Browser**:
1. `agent-browser open http://localhost:3000/`
2. Check `agent-browser errors` and `agent-browser console` — both must be clean
3. Test the golden path: navbar links, theme toggle, chatbot open/close, carousel controls, gallery lightbox, appointment form, body diagram clicks, FAQ accordion
4. Verify responsive: test at 1440×900 (desktop), 768×1024 (tablet), and 390×844 (mobile)
5. Test accessibility: verify `inert` is set on header when scrolled, `aria-live` on chatbot messages, focus traps in all dialogs
6. Confirm the sticky footer sticks to the bottom on short pages and is pushed down on long pages

---

## Changelog (Recent)
- **2026-07-13**: untrack secrets, add .gitattributes, prep for GitHub push
- **2026-07-13**: remove post-commit hook test comments
- **2026-07-13**: add second test comment to verify hook fires repeatedly
- **2026-07-13**: add test comment to exercise post-commit hook
- **2025-07-12**: Fixed 11 issues from Tasks 7+8 review (TopBar contrast, inert on scroll, carousel reduced-motion, chatbot aria-live, loading screen flash, Caddyfile TLS, appointment honest notice)
- **2025-07-12**: Added premium top bar component with contact info and social proof
- **2025-07-12**: Added git hooks and scripts for automatic Claude.md updates
- **2025-07-12**: Redesigned Gallery to premium magazine-style layout with featured card + compact grid
- **2025-07-12**: Redesigned Specializations to dark-navy 8-column grid matching reference image
- **2025-07-12**: Redesigned WhyChoose to Embla carousel with premium cards
- **2025-07-12**: Removed Conditions section entirely
- **2025-07-12**: Added ChatBot with FAQ integration and PII disclaimer
- **2025-07-12**: Added Google branding (GoogleG + GoogleStar) consistently across all sections
- **2025-07-12**: Fixed 19 issues from code+security review (TS errors, mobile layout, controlled form, Privacy dialog, CSP tightening, etc.)
- **2025-07-12**: Added interactive hero text (hover color change), site-wide animations, `useReducedMotion` support

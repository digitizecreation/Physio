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
├── Caddyfile                    # Gateway config (port 81 → 3000). SSRF-prone XTransformPort block REMOVED.
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
│   └── lib/
│       ├── site/data.ts         # ALL business data, reviews, FAQs, nav links — single source of truth
│       └── utils.ts             # cn() helper (clsx + tailwind-merge)
│
├── public/
│   ├── icon.svg                 # Favicon
│   ├── og-image.png             # 1200×630 social share image (generated via scripts/generate-og-image.py)
│   └── robots.txt
│
└── scripts/
    └── generate-og-image.py     # Python/Pillow script to regenerate og-image.png
```

---

## Section Components (`src/components/site/`)

The page is composed of these sections in order (defined in `page.tsx`):

| # | Component | File | Notes |
|---|---|---|---|
| 1 | `LoadingScreen` | `loading-screen.tsx` | 300ms delay, respects `prefers-reduced-motion` |
| 2 | `Navbar` | `navbar.tsx` | Sticky, glassmorphic, hide-on-scroll, mobile drawer with focus trap |
| 3 | `Hero` | `hero.tsx` | Interactive hover text, animated gradient, SVG doctor illustration |
| 4 | `About` | `about.tsx` | SVG portrait + story + 4 pillars |
| 5 | `Specializations` | `specializations.tsx` | **Dark navy bg** (`#0f172a`), 8-col compact grid, colorful icons |
| 6 | `WhyChoose` | `why-choose.tsx` | Embla carousel, 9 premium cards, autoplay with pause |
| 7 | `TreatmentProcess` | `process.tsx` | 7-step animated timeline |
| 8 | `Reviews` | `reviews.tsx` | Embla carousel, 5 real Google reviews with profile photos |
| 9 | `HomeVisit` | `home-visit.tsx` | Benefits + SVG house illustration |
| 10 | `Statistics` | `statistics.tsx` | Animated counters, Google "G" + yellow stars |
| 11 | `BodyDiagram` | `body-diagram.tsx` | Interactive SVG body — click parts to see treatments |
| 12 | `MiniTools` | `mini-tools.tsx` | BMI calculator + pain self-assessment |
| 13 | `Gallery` | `gallery.tsx` | Magazine-style featured + grid layout, lightbox |
| 14 | `Faq` | `faq.tsx` | Accordion, 7 FAQs |
| 15 | `Appointment` | `appointment.tsx` | Controlled form, consent checkbox, Privacy dialog |
| 16 | `Contact` | `contact.tsx` | Google Maps embed (sandboxed), contact cards |
| 17 | `Footer` | `footer.tsx` | Quick links, Privacy/Terms dialogs (DPDP Act 2023 compliant) |
| 18 | `FloatingActions` | `floating-actions.tsx` | Scroll progress, back-to-top, WhatsApp/Call (desktop only on mobile) |
| 19 | `ChatBot` | `chatbot.tsx` | FAQ-powered chatbot with quick replies, PII disclaimer |

**Utility components:**
- `reveal.tsx` — `Reveal`, `StaggerGroup`, `StaggerItem`, `SectionHeading`, `SectionWrap` (all respect `useReducedMotion`)
- `motion.tsx` — `Counter`, `Magnetic` (both respect `useReducedMotion`)
- `icon.tsx` — `Icon` component mapping string keys to Lucide icons
- `google-brand.tsx` — `GoogleG`, `GoogleStar`, `GoogleStars` (official Google colors: #4285F4, #34A853, #FBBC05, #EA4335)

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
- **Respect `prefers-reduced-motion`**: use `useReducedMotion()` from Framer Motion in any animation component. See `reveal.tsx`, `motion.tsx`, `loading-screen.tsx`.

### Google Branding
- **Always use** `GoogleG` and `GoogleStar` from `src/components/site/google-brand.tsx` for Google logos and stars.
- **Never use green Lucide stars** for ratings — use `GoogleStar` (yellow `#FBBC05`).
- The `GoogleStar` component accepts a `style` prop for staggered animations.

### Carousels (Embla)
- The `embla.on("select", handler)` return type is incorrectly typed in v8 — cast it: `as unknown as (() => void) | undefined`
- Always implement autoplay with pause on hover/focus AND pause on tab visibility change (`visibilitychange` listener).

---

## Security

### What's in place
- **CSP** in `next.config.ts` `headers()`: `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` (no `unsafe-eval`)
- **Security headers**: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS with preload
- **JSON-LD is HTML-escaped** in `layout.tsx` (escapes `<`, `>`, U+2028, U+2029 before `dangerouslySetInnerHTML`)
- **No `eval`, `Function`, string-arg `setTimeout`, `innerHTML`, or `document.write`** anywhere in `src/`
- **All `target="_blank"` links** carry `rel="noopener noreferrer"`
- **Reviewer avatar images** use `referrerPolicy="no-referrer"` to prevent referrer leakage
- **Google Maps iframe** is sandboxed (`sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"` — no `allow-same-origin`)
- **Appointment form** has consent checkbox, `maxLength` on all fields, `pattern` validation on phone
- **Privacy Policy dialog** with DPDP Act 2023 content, accessible from footer AND appointment consent link

### What NOT to do
- ❌ Do NOT re-enable `typescript.ignoreBuildErrors` — it's `false` for a reason
- ❌ Do NOT add `'unsafe-eval'` to the CSP `script-src`
- ❌ Do NOT use `dangerouslySetInnerHTML` without HTML-escaping
- ❌ Do NOT remove the security headers from `next.config.ts`
- ❌ Do NOT re-add the `XTransformPort` block to `Caddyfile` (it was an SSRF vulnerability)

---

## Known Debt

1. **Unused dependencies** in `package.json`: `next-auth`, `prisma`, `@prisma/client`, `@mdxeditor/editor`, `@dnd-kit/*`, `react-syntax-highlighter`, `recharts`, `react-resizable-panels`, `cmdk`, `react-day-picker`, `date-fns`, `uuid`, `zustand`, `@tanstack/react-query`, `@tanstack/react-table`, `react-hook-form`, `@hookform/resolvers`, `zod`, `next-intl`, `vaul`, `input-otp`, `sonner`, `@reactuses/core`, `sharp`. Run `depcheck` and prune when convenient.
2. **Unused shadcn/ui components** in `src/components/ui/`: only `button`, `input`, `label`, `textarea`, `accordion`, `dialog` (indirectly) are actually used by site components. The rest are safe to delete.
3. **Dormant Prisma**: `prisma/schema.prisma` exists but no code imports `@/lib/db`. The `db.ts` file was deleted. Schema is boilerplate `User`/`Post` models — safe to delete if no DB is planned.
4. **Appointment form** simulates submission with `setTimeout`. To wire a real backend, the controlled form state (`form.name`, `form.phone`, `form.notes`, `selectedSlot`, `selectedCondition`, `date`, `homeVisit`) is ready to send to a Route Handler.
5. **Footer LegalDialog** doesn't restore focus to the trigger button on close (minor a11y gap).

---

## Build & Lint

- **`bun run lint`** must pass with zero errors before any change is considered done.
- **`npx tsc --noEmit`** must show zero errors in `src/` (errors in `examples/` and `skills/` are expected and can be ignored — those directories are not part of the app).
- **`next.config.ts`** must NOT have an `eslint` key (it was removed from Next.js 16's `NextConfig` type and will cause a TS error).
- **`reactStrictMode: true`** — effects double-invoke in dev, which is intentional for catching bugs.

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
4. Verify responsive: test at 1440×900 (desktop) and 390×844 (mobile)
5. Confirm the sticky footer sticks to the bottom on short pages and is pushed down on long pages

---

## Changelog (Recent)
- **2025-07-12**: Test edit to verify post-commit hook works

- **2025-07-12**: Redesigned Gallery to premium magazine-style layout with featured card + compact grid
- **2025-07-12**: Redesigned Specializations to dark-navy 8-column grid matching reference image
- **2025-07-12**: Redesigned WhyChoose to Embla carousel with premium cards
- **2025-07-12**: Removed Conditions section entirely
- **2025-07-12**: Added ChatBot with FAQ integration and PII disclaimer
- **2025-07-12**: Added Google branding (GoogleG + GoogleStar) consistently across all sections
- **2025-07-12**: Fixed 19 issues from code+security review (TS errors, mobile layout, controlled form, Privacy dialog, CSP tightening, etc.)
- **2025-07-12**: Added interactive hero text (hover color change), site-wide animations, `useReducedMotion` support

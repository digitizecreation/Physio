# Worklog

---
Task ID: 1
Agent: Code Reviewer
Task: Comprehensive code review of src/ for bugs, quality, React/Next.js best practices, performance, accessibility

Work Log:
- Read worklog.md (noted absence — created this file)
- Read and analysed 25+ source files under src/ (app: page.tsx, layout.tsx, globals.css, api/route.ts; lib: site/data.ts, utils.ts, db.ts; hooks: use-toast.ts, use-mobile.ts; theme-provider.tsx; all 19 site components; ui: button.tsx, input.tsx, accordion.tsx, toaster.tsx; plus tailwind.config.ts, postcss.config.mjs, next.config.ts, package.json, public/)
- Categorised findings by severity and types A–F (bugs, React/Next, perf, a11y, quality, styling)

Stage Summary:
- Critical issues: 0
- Major issues: 6
- Minor issues: 11
- Suggestions: 7
- Overall code quality assessment: A polished, well-structured marketing site with strong visual design and consistent patterns. The biggest gaps are missing OG image asset, no real form submission backend, a few accessibility gaps in modals/drawers (focus management), and a Tailwind v3/v4 config mismatch that makes tailwind.config.ts largely inert. Type-safety is also weakened by `ignoreBuildErrors: true`.
- Top 3 priorities to fix:
  1. Add `/public/og-image.png` (referenced by metadata, Twitter card, and JSON-LD Physician `image` — currently 404s).
  2. Add focus management + ESC handling to Navbar mobile drawer and Gallery lightbox; add `role="dialog"`/`aria-modal` to the lightbox.
  3. Remove `typescript.ignoreBuildErrors: true` from next.config.ts and resolve any surfaced type errors; remove dead `tailwind.config.ts` v3 theming or migrate via `@config`.

---
Task ID: 4
Agent: Security Reviewer
Task: Fresh re-run of security audit of src/ — verify previous findings, catch new issues

Work Log:
- Read worklog.md (noted only Task 1 logged; no Task 2 security entry present — proceeded with full fresh audit)
- Read and analysed 25+ source files under src/ (app: layout.tsx, page.tsx, api/route.ts, globals.css; lib: site/data.ts, utils.ts, db.ts; hooks; theme-provider; all 19 site components; ui chart/toaster) plus next.config.ts, package.json, prisma/schema.prisma, public/robots.txt, and Caddyfile (out-of-scope but flagged)
- Grepped src/ for: dangerouslySetInnerHTML, eval/new Function, setTimeout/setInterval(string), document.write, innerHTML, javascript:/data:text/html URIs, process.env.*, console.*, all `href={...}` sinks, all `target="_blank"` rel attributes
- Traced untrusted data flows: JSON-LD injection (layout.tsx) — developer-controlled literals; review photoUri/profileUri (data.ts) — hardcoded Google URLs; maps iframe src (contact.tsx) — hardcoded; appointment form fields — uncontrolled, simulated submit only, never sent anywhere; BMI/pain tool inputs — parseFloat with NaN/positive guards
- Confirmed no auth, no DB usage (db.ts and chart.tsx are dormant — not imported anywhere), no API surface beyond a trivial hello-world stub

Stage Summary:
- New vulnerabilities found: 12 (SEC-01 through SEC-12) — see full report
- Previously flagged still open: 0 (no prior security audit was actually logged; Task 2 appears not to have run)
- Previously flagged now fixed: N/A
- Overall security posture: Strong on the happy path — no XSS sinks reachable from user input, no injection, all external links hardened with rel="noopener noreferrer", referrer policy on avatar images, no secrets. The realistic gaps are infrastructure/config: (1) no security headers in next.config.ts, (2) the Caddyfile exposes an SSRF proxy via the XTransformPort query parameter, (3) DPDP Act 2023 compliance is missing for the appointment form PII, and (4) `typescript.ignoreBuildErrors: true` masks type-safety that could hide security issues.
- Top 3 priorities to fix:
  1. Remove or restrict the Caddyfile `XTransformPort` reverse-proxy block (SEC-01) — it lets any visitor proxy the server to arbitrary localhost ports (SSRF / internal port scanning).
  2. Add a `headers()` block in next.config.ts with at least Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and frame-ancestors (SEC-02).
  3. Publish a real Privacy Policy, link the footer "Privacy Policy" / "Terms" to it, and add a consent checkbox + data-use notice to the appointment form to comply with India's DPDP Act 2023 (SEC-03).

---
Task ID: 3
Agent: Code Reviewer
Task: Fresh re-run of comprehensive code review of src/ — verify previous findings, catch new issues

Work Log:
- Read worklog.md (noted Task 1 code-review + Task 4 security entries; prompt referenced "Task 2" but security run is logged as Task 4 — numbering quirk, proceeded regardless)
- Read and analysed 43 source/config files under src/ + project root (app: page.tsx, layout.tsx, globals.css, api/route.ts; lib: site/data.ts, utils.ts, db.ts; hooks: use-toast.ts, use-mobile.ts; theme-provider.tsx; all 19 site components; ui: toaster, button, accordion, input, textarea, label; next.config.ts, tailwind.config.ts, postcss.config.mjs, eslint.config.mjs, tsconfig.json, package.json; verified /public contents)
- Cross-referenced current state against Task 1 and Task 4 findings
- Grepped to verify dead-code claims: confirmed `toast()`/`useToast` never called outside toaster.tsx; `useIsMobile` only used by unused sidebar.tsx; `TiltCard`/`fadeUpItem`/`FaqPlusIcon`/`STATS`/`TRUST_BAR` never imported; `db.ts` imported nowhere; no `next/image` usage; no `useReducedMotion` anywhere; `conditions.tsx` never reads `c.body`
- Confirmed /public contains only logo.svg, icon.svg, robots.txt — og-image.png still missing

Stage Summary:
- New issues found: 19 (CR-01, CR-03 through CR-21)
- Previously flagged still open: 6 (OG image 404; navbar drawer a11y; ignoreBuildErrors; dead tailwind.config.ts; form submission still simulated; gallery lightbox missing role/aria-modal/focus-trap)
- Previously flagged now fixed: 1 partial (Gallery lightbox now has ESC handler + arrow-key nav + body scroll lock — gallery.tsx:30-41; role/aria-modal/focus-trap still missing)
- Overall code quality assessment: Visually polished and well-architected, but the codebase has accumulated meaningful dead weight (entire toast + Prisma + sidebar subsystems unused), ESLint is effectively silenced, type-safety is bypassed at build time, and several a11y gaps from Task 1 remain. No correctness-breaking bugs found; the highest-leverage fixes are config/hygiene rather than logic.
- Top 3 priorities to fix:
  1. Re-enable meaningful ESLint rules and remove `typescript.ignoreBuildErrors: true` so type/lint errors actually surface at build time (eslint.config.mjs, next.config.ts).
  2. Add `/public/og-image.png` (still 404 — referenced by metadata.openGraph, metadata.twitter, and JSON-LD Physician `image`).
  3. Complete modal/drawer a11y: add ESC + scroll-lock + focus-trap + `role="dialog"`/`aria-modal` to the Navbar mobile drawer (navbar.tsx:114-184) and `role="dialog"`/`aria-modal` + focus-trap to the Gallery lightbox (gallery.tsx:96-153).

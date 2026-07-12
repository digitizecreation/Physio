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

---
Task ID: 6
Agent: Security Reviewer
Task: Fresh re-run of security audit — verify previous fixes, catch new issues from chatbot/Google-branding/animation changes

Work Log:
- Read worklog.md (noted Task 1 code-review, Task 4 security, Task 3 code-review entries)
- Read and analysed 19 source files under src/ (app: layout.tsx, page.tsx, globals.css; lib: site/data.ts, utils.ts; all 19 site components including NEW chatbot.tsx + google-brand.tsx; ui chart.tsx) plus next.config.ts, package.json, public/robots.txt, Caddyfile, eslint.config.mjs
- Grepped src/ for: dangerouslySetInnerHTML (only layout.tsx JSON-LD + dormant chart.tsx); eval/new Function/string-setTimeout/innerHTML/document.write (none); process.env (none); console.* (none); javascript:/data:text/html (none); all href={...} sinks (all derived from hardcoded BUSINESS constants or NAV_LINKS — no user input); all target="_blank" rel attributes (all have rel="noopener noreferrer")
- Traced untrusted data flows: (1) chatbot free-text input → keyword-matched against hardcoded KEYWORD_MAP → bot response from hardcoded BUSINESS/FAQS literals; user text rendered via JSX children {message.text} (React-escaped, whitespace-pre-line) — no XSS sink; (2) appointment form fields — uncontrolled, simulated submit only, never sent; (3) BMI/pain tool inputs — parseFloat with NaN/positive guards; (4) JSON-LD injection — fully developer-controlled literals with <, >, U+2028, U+2029 escape replacements; (5) review photoUri/profileUri — hardcoded Google URLs; (6) maps iframe src — hardcoded BUSINESS.mapsEmbed
- Verified previously-flagged issues against current state: SEC-01 (Caddyfile SSRF) FIXED; SEC-02 (missing security headers) FIXED; SEC-03 (DPDP compliance) PARTIALLY FIXED (footer Privacy Policy + Terms dialogs exist with explicit DPDP Act 2023 reference, but appointment.tsx consent link still uses e.preventDefault() — broken)
- Verified Task 1/Task 3 fixes: og-image.png now exists; typescript.ignoreBuildErrors=false; eslint.ignoreDuringBuilds=false; ESLint config re-enabled with pragmatic rule set
- Reviewed NEW chatbot.tsx in depth: maxLength=300 input cap, no eval, no string setTimeout, no dangerouslySetInnerHTML, window.location.href/window.open only ever receive hardcoded BUSINESS.* URLs (no user-controlled URI sink), keyword matching via String.includes on lowercased input (no regex DoS), messages held only in React state (no persistence, no PII retention)

Stage Summary:
- New vulnerabilities found: 3 (SEC-01 medium: 'unsafe-eval' in CSP; SEC-04 low: chatbot no PII/PHI disclaimer; SEC-06 low: maps iframe sandbox weakened by allow-scripts+allow-same-origin combo)
- Previously flagged still open: 3 (SEC-02 low: 'unsafe-inline' in CSP script-src without nonces; SEC-03 low: appointment consent Privacy Policy link broken; SEC-05 informational: large unused dependency surface — next-auth, prisma, @mdxeditor/editor, @dnd-kit/*, z-ai-web-dev-sdk, react-syntax-highlighter, recharts, etc.)
- Previously flagged now fixed: 4 (Caddyfile SSRF proxy removed; security headers added to next.config.ts; typescript.ignoreBuildErrors=false; og-image.png added)
- Overall security posture: Strong. No XSS sinks reachable from user input — the NEW chatbot's free-text input is safely rendered through React JSX escaping, never via dangerouslySetInnerHTML, and its keyword-matching engine only consults hardcoded data. All href/src sinks derive from hardcoded business data. Security headers, HSTS, CSP, frame-ancestors, and Permissions-Policy are in place. Remaining items are defense-in-depth refinements (tighten CSP 'unsafe-eval'/'unsafe-inline' to nonces), one dead Privacy Policy link in the appointment consent, and supply-chain hygiene (remove unused deps).
- Top 3 priorities to fix:
  1. Remove `'unsafe-eval'` from the CSP `script-src` directive in next.config.ts:25 — Next.js 16 production builds do not require it; retaining it weakens defense-in-depth against any future XSS.
  2. Wire the appointment consent "Privacy Policy" link (appointment.tsx:331) to actually open the footer's PrivacyDialog — currently `e.preventDefault()` makes it a no-op, so users cannot read the policy they're consenting to (DPDP Act 2023 notice gap).
  3. Add a one-line "Please don't share personal/medical details here — call or WhatsApp instead" disclaimer to the chatbot input footer (chatbot.tsx:439-442) so users are nudged away from typing PHI into a non-persistent client-only tool.

---
Task ID: 5
Agent: Code Reviewer
Task: Fresh re-run of comprehensive code review — verify previous fixes, catch new issues from chatbot/Google-branding/animation changes

Work Log:
- Read worklog.md (Tasks 1, 3, 4, 6 already logged — most recent was Task 6 Security Reviewer covering chatbot/Google-branding)
- Read and analysed 25 source/config files under src/ + project root (app: page.tsx, layout.tsx, globals.css; lib: site/data.ts, utils.ts; all 19 site components including NEW chatbot.tsx + google-brand.tsx; ui: button, accordion, input, label, textarea; theme-provider; next.config.ts, eslint.config.mjs, tsconfig.json, package.json)
- Cross-referenced current state against Task 1, Task 3 and Task 6 findings
- Ran `npx tsc --noEmit` against the project to verify type-safety (since `typescript.ignoreBuildErrors=false` is now set in next.config.ts — any TS error is now a build-breaking issue)
- Ran `npx eslint src/` — passes clean (exit 0); all issues surfaced are TypeScript-level, not lint-level
- Verified previously-flagged items against current state:
  • OG image 404 → FIXED (public/og-image.png now exists, 1200×630)
  • typescript.ignoreBuildErrors → FIXED (now false)
  • eslint.ignoreDuringBuilds → still present in next.config.ts:9-11 BUT the `eslint` key itself does not exist in Next.js 16's NextConfig type → NEW type error
  • dead tailwind.config.ts → FIXED (file removed)
  • Navbar mobile drawer a11y → FIXED (ESC, scroll-lock, focus-trap, role=dialog, aria-modal, focus restore — navbar.tsx:35-70, 156-228)
  • Gallery lightbox a11y → FIXED (ESC, arrow keys, scroll-lock, focus-trap, role=dialog, aria-modal, focus restore — gallery.tsx:31-62, 128-141)
  • Form submission still simulated → STILL OPEN (appointment.tsx:46-55 still uses setTimeout, comment "wire to real backend when ready")
- Grepped to verify: no `Math.random()`/`Date.now()` in render path (only inside chatbot event handlers — no hydration risk); no `dangerouslySetInnerHTML` outside layout.tsx JSON-LD; all `target="_blank"` carry `rel="noopener noreferrer"`; no `next/image` usage (intentional — external avatars via <img> with referrerPolicy="no-referrer")

Stage Summary:
- New issues found: 18 (CR-01 through CR-18) — see full report
- Previously flagged still open: 1 (form submission still simulated in appointment.tsx)
- Previously flagged now fixed: 5 (OG image, ignoreBuildErrors, dead tailwind.config.ts, navbar drawer a11y, gallery lightbox a11y)
- Overall code quality assessment: Visually polished and now much healthier — Task 1/3's biggest gaps (a11y, type-safety, OG asset, dead config) are all fixed. However, the recent chatbot + Google-branding + animation work introduced 4 build-breaking TypeScript errors (which `npx tsc --noEmit` confirms) that will fail `next build` now that ignoreBuildErrors=false. The new chatbot is well-built (no XSS, decent a11y with focus-trap/ESC/scroll-lock) but has a deceptive "1" notification badge and unnecessarily locks body scroll. There is also a real mobile layout collision between the right-side floating action cluster, the chatbot launcher, and the new sticky mobile CTA bar. None of the new issues are correctness-breaking at runtime — the TS errors are all "shape" mismatches that the runtime would tolerate — but they block production builds.
- Top 3 priorities to fix:
  1. Resolve the 4 build-breaking TypeScript errors so `next build` succeeds: (a) chatbot.tsx getBotResponse return type → change to `Omit<Message,"id">`; (b) hero.tsx:63 GoogleStar needs to accept `style` (or wrap in span); (c) reviews.tsx:30 + conditions.tsx:29 cast embla.on() return to `() => void` (or use embla.off); (d) next.config.ts:9-11 remove the `eslint` block (removed from NextConfig in Next.js 16 — FlatConfig in eslint.config.mjs is now authoritative).
  2. Fix the mobile layout collision (floating-actions.tsx vs sticky CTA bar at bottom): hide the right-side Call/WhatsApp floating cluster on mobile when the sticky CTA is visible (or vice-versa), and lift the chatbot launcher above the CTA bar.
  3. Wire the appointment consent "Privacy Policy" link (appointment.tsx:331) to actually open the footer's PrivacyDialog — currently `e.preventDefault()` makes it a dead link, so users cannot read the policy they are consenting to (DPDP Act 2023 notice gap; also flagged by Task 6 SEC-03).

---
Task ID: 8
Agent: Security Reviewer
Task: Fresh re-run — verify previous fixes, catch new issues from TopBar addition

Work Log:
- Read worklog.md (noted Tasks 1, 3, 4, 5, 6 — most recent security entry is Task 6 covering chatbot/Google-branding)
- Read and analysed 16 source/config files: app (layout.tsx, page.tsx), lib/site/data.ts, all in-scope site components (top-bar.tsx ⭐NEW, chatbot.tsx, google-brand.tsx, reviews.tsx, appointment.tsx, contact.tsx, footer.tsx, navbar.tsx, mini-tools.tsx, floating-actions.tsx, gallery.tsx, loading-screen.tsx, body-diagram.tsx), next.config.ts, Caddyfile, package.json, .gitignore, .env
- Grepped src/ for: dangerouslySetInnerHTML (only layout.tsx JSON-LD + dormant chart.tsx — chart.tsx not imported anywhere, confirmed), eval/new Function/string-arg setTimeout/innerHTML/document.write (none), process.env (none in src/), console.* (none), javascript:/data:text/html URIs (none), all href={...} sinks (all derived from hardcoded BUSINESS constants, NAV_LINKS, quickLinks, or treatmentLinks — zero user input reaches any URL sink), all target="_blank" rel attributes (every one carries rel="noopener noreferrer"), window.location/window.open calls (only in chatbot.tsx — all use hardcoded BUSINESS.* URLs with "noopener noreferrer")
- Traced untrusted data flows: (1) chatbot free-text input → maxLength=300 → keyword-matched via String.includes on lowercased input against hardcoded KEYWORD_MAP → response from hardcoded BUSINESS/FAQS literals; user text rendered via JSX {message.text} with whitespace-pre-line (React-escaped) — no XSS sink; PII/PHI disclaimer now present (chatbot.tsx:407-409). (2) appointment form fields — captured in React state, simulated submit only, never transmitted; consent link now opens PrivacyDialog (appointment.tsx:335,377). (3) BMI inputs — parseFloat with NaN/positive guards (mini-tools.tsx:42-45). (4) pain assessment — boolean toggles against hardcoded PAIN_QUESTIONS, no free text. (5) JSON-LD — fully developer-controlled literals with <, >, U+2028, U+2029 escape replacements (layout.tsx:297-301). (6) review photoUri/profileUri — hardcoded Google URLs, rendered with referrerPolicy="no-referrer". (7) maps iframe src — hardcoded BUSINESS.mapsEmbed, sandboxed (no allow-same-origin).
- Verified NEW TopBar in depth: every href derived from BUSINESS.phoneHref (tel:) or "#appointment" anchor; GoogleG/GoogleStar inline SVGs have no user input; `hidden` prop is a plain boolean used only in motion animate target; no dangerouslySetInnerHTML, no eval, no string-arg setTimeout, no user-controlled URI sink, no target="_blank". TopBar is security-clean.
- Verified previously-flagged issues against current state:
  • Task 6 SEC-01 (CSP 'unsafe-eval') → FIXED (next.config.ts:22 — script-src is now 'self' 'unsafe-inline' only)
  • Task 6 SEC-02 (CSP 'unsafe-inline' in script-src, no nonces) → STILL OPEN (low)
  • Task 6 SEC-03 (appointment consent Privacy Policy link broken) → FIXED (appointment.tsx:335 now setShowPrivacy(true); dialog rendered at line 377)
  • Task 6 SEC-04 (chatbot no PII/PHI disclaimer) → FIXED (chatbot.tsx:407-409)
  • Task 6 SEC-05 (large unused dependency surface) → STILL OPEN (informational)
  • Task 6 SEC-06 (maps iframe allow-scripts + allow-same-origin combo) → FIXED (contact.tsx:129 — allow-same-origin removed; now `allow-scripts allow-popups allow-popups-to-escape-sandbox`)
  • Task 4 SEC-01 (Caddyfile SSRF proxy) → STILL FIXED (only plain reverse_proxy remains)
  • Task 4 SEC-02 (missing security headers) → STILL FIXED (CSP, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS all present in next.config.ts:14-38)
  • Task 4 SEC-03 (DPDP compliance) → NOW FULLY FIXED (Privacy Policy + Terms dialogs in footer; appointment consent dialog opens inline Privacy Policy referencing DPDP Act 2023)
- Confirmed no API surface at all (src/app/api/ does not exist), no auth, no DB usage, no process.env reads, no console logging, no eval/Function constructors anywhere in src/

Stage Summary:
- New vulnerabilities found: 1 (SEC-01 low: Caddyfile binds to :81 plain HTTP, no TLS termination — HSTS header is moot if served over HTTP)
- Still open: 3 (SEC-02 low: CSP 'unsafe-inline' in script-src without nonces — carried over from Task 6 SEC-02; SEC-03 informational: large unused dependency surface — carried over from Task 6 SEC-05; SEC-04 low: appointment form silently discards consented PII — false-consent under DPDP Act 2023)
- Now fixed: 5 (CSP 'unsafe-eval' removed; appointment consent Privacy Policy link wired; chatbot PII/PHI disclaimer added; maps iframe allow-same-origin removed; DPDP compliance fully landed)
- Overall posture: Strong. The NEW TopBar introduces zero security issues — every href and SVG derives from hardcoded BUSINESS constants, with no XSS sink, no user input flow, and no URI injection. All previous security fixes from Task 4/6 are intact and the CSP has been further tightened (no more 'unsafe-eval'). No XSS or injection sinks reachable from user input across the entire codebase. Remaining items are defense-in-depth refinements (CSP nonces, TLS at the edge, dependency hygiene) and one privacy/consent gap (appointment form simulated submit).
- Top 3 priorities to fix:
  1. Terminate TLS at Caddy (Caddyfile binds to :81 plain HTTP) — either change site block to the production hostname so Caddy auto-issues Let's Encrypt certs, or front it with a TLS-terminating load balancer. As written, the HSTS header set in next.config.ts:32-34 is ignored by browsers (HSTS only applies over HTTPS), and any PII typed into the appointment form would traverse the network in plaintext.
  2. Switch CSP `script-src` from `'unsafe-inline'` to nonce-based inline-script allow-listing (next.config.ts:22) — Next.js 16 supports per-request nonces via `next.config.ts` + middleware. This closes the last XSS defense-in-depth gap if any future input ever reaches an inline-script sink.
  3. Either wire the appointment form to a real backend (API route / WhatsApp Business API / email service) that persists the consented PII, or surface a clear "demo form — please call to book" notice. As-is, users consent to data collection that never happens — a DPDP Act 2023 false-consent gap. Also remove the unused heavy deps (next-auth, prisma, @mdxeditor/editor, @dnd-kit/*, z-ai-web-dev-sdk, react-syntax-highlighter, recharts, etc.) to shrink the supply-chain attack surface.

---
Task ID: 7
Agent: Code Reviewer
Task: Fresh re-run — verify previous fixes, catch new issues from TopBar addition

Work Log:
- Read worklog.md (noted Tasks 1, 3, 4, 5, 6, 8 — most recent code-review was Task 5; Task 8 Security Reviewer ran in parallel and confirmed all previous security fixes intact)
- Read and analysed 24 source/config files under src/ + project root: app (layout.tsx, page.tsx, globals.css), lib (site/data.ts, utils.ts), all 19 site components including NEW top-bar.tsx ⭐, plus next.config.ts, eslint.config.mjs, tsconfig.json, public/ assets
- Cross-referenced current state against Task 1, Task 3, Task 5, and Task 6/8 findings
- Ran `npx tsc --noEmit` — confirmed ZERO type errors in src/ (all 8 TS errors are in out-of-scope examples/scripts/skills directories which are gitignored from the build)
- Ran `npx eslint src/` — passes clean (exit 0)
- Computed WCAG contrast ratios for the NEW TopBar gradient (white text on royal vs teal) using sRGB luminance math to verify a suspected contrast failure
- Verified previously-flagged items against current state:
  • OG image 404 → STILL FIXED (public/og-image.png exists, 42 KB)
  • typescript.ignoreBuildErrors → STILL FIXED (next.config.ts:7 = false)
  • dead tailwind.config.ts → STILL FIXED (removed; Tailwind v4 via @theme inline in globals.css)
  • Navbar mobile drawer a11y → STILL FIXED (ESC, scroll-lock, focus-trap, role=dialog, aria-modal, focus restore — navbar.tsx:36-71, 171-173)
  • Gallery lightbox a11y → STILL FIXED (ESC, arrow keys, scroll-lock, focus-trap, role=dialog, aria-modal, focus restore — gallery.tsx:31-61, 210-211)
  • 4 build-breaking TS errors from Task 5 → ALL STILL FIXED (chatbot getBotResponse returns Omit<Message,"id">; GoogleStar accepts style; embla.on() cast in reviews.tsx:28 + why-choose.tsx:40; eslint block removed from next.config.ts)
  • Appointment consent Privacy Policy link → STILL FIXED (appointment.tsx:335 opens PrivacyDialog, rendered at :377)
  • Chatbot PHI disclaimer → STILL FIXED (chatbot.tsx:407-409)
  • CSP 'unsafe-eval' → STILL FIXED (next.config.ts:22 — script-src is 'self' 'unsafe-inline' only)
  • Mobile layout collision (floating-actions vs sticky CTA vs chatbot) → STILL FIXED (right cluster hidden sm:flex; sticky CTA sm:hidden; chatbot launcher bottom-20 sm:bottom-6; chatbot panel bottom-40 sm:bottom-24)
  • Form submission still simulated → STILL OPEN (appointment.tsx:52-56 — setTimeout, comment "wire to real backend when ready")
- Confirmed dead-code cleanup from Task 3 is intact: src/hooks/ directory removed (no use-toast.ts / use-mobile.ts); src/lib/db.ts removed; src/components/ui/chart.tsx + sidebar.tsx + toaster.tsx not imported anywhere

Stage Summary:
- New issues found: 7 (CR-01 through CR-07) — see full report
- Still open: 3 (appointment form simulated submit; carousel autoplay ignores prefers-reduced-motion; duplicate PrivacyContent in appointment + footer)
- Now fixed: 11 (all previous high-priority items remain fixed — verified)
- Overall code quality assessment: The codebase is in its healthiest state yet. The NEW TopBar is well-structured, security-clean (per Task 8), and visually polished — but introduces two real accessibility regressions: (1) its interactive links remain in the keyboard tab order when the header hides on scroll (focus-trap-on-scroll), and (2) white text on the teal half of its gradient fails WCAG AA contrast (2.49:1 for solid white, 1.89:1 for text-white/70). Both are fixable in <15 lines. The TopBar also has a redundant double-transform animation (parent -160 + own -50) that is harmless but noisy. All previous critical/major fixes from Tasks 1/3/5/6 remain intact. The codebase passes `tsc --noEmit` and `eslint src/` clean. The only carry-over is the still-simulated appointment form, which is a product decision rather than a code defect.
- Top 3 priorities to fix:
  1. Fix TopBar WCAG AA contrast failure (top-bar.tsx:20, 43-59): white/80 and white/70 text over the teal end of the `from-royal via-royal to-teal` gradient yields 1.89–2.49:1 contrast (AA needs 4.5:1). Either darken the teal stop, switch the gradient to royal→royal (solid), or move all text to the left/royal half.
  2. Fix keyboard focus-trap-on-scroll (navbar.tsx:75-82 + top-bar.tsx:14): when `hidden=true`, the entire `<motion.header>` (including TopBar's phone + Book Appointment links, the navbar logo, nav links, theme toggle, and Call Now button) is translated off-screen via `transform: translateY(-160px)` but remains focusable — Tab will land on invisible links and the browser will scroll-jump to show them. Add `inert` (or `aria-hidden` + `tabIndex={-1}`) to the header when `hidden=true`.
  3. Make the Reviews and WhyChoose carousel autoplay respect `prefers-reduced-motion` (reviews.tsx:46-56, why-choose.tsx:58-67): a user with reduced-motion preference still sees the carousel auto-advancing every 5 s. Guard `startAutoplay()` with `const prefersReduced = useReducedMotion(); if (prefersReduced) return;`.

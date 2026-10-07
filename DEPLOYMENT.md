# Deploying to Hostinger Shared Hosting (Static Export)

This site is a **static Next.js export**. The production build generates a
plain `out/` folder of HTML/CSS/JS files — no Node.js server, no database,
no Prisma, no runtime dependencies. It can be hosted on any standard shared
hosting (Hostinger, Namecheap, cPanel, etc.).

---

## 1. Build the site

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run build
```

This runs `next build` with `output: "export"` (see `next.config.ts`) and
generates the complete website in **`out/`**.

> Optional — preview the static build locally before uploading:
> `npm start` (serves `out/` at http://localhost:3000).

## 2. Upload to Hostinger

1. Log in to **hPanel** → your domain → **File Manager**.
2. Open the **`public_html`** directory.
3. If there are old files in `public_html`, delete them first (or move them
   to a backup folder).
4. Upload the **contents of `out/`** — not the `out` folder itself — so that
   `index.html` sits directly inside `public_html`.
   - Easiest path: locally zip the **contents** of `out/`, upload the zip
     into `public_html`, right-click → **Extract**.
   - Enable **"Show hidden files"** in File Manager settings to verify the
     **`.htaccess`** file was uploaded (it carries the security headers,
     HTTPS redirect and caching rules). If it is missing, upload it
     manually from `out/.htaccess`.

## 3. Enable SSL / HTTPS

1. hPanel → **Security** → **SSL** — install the free Let's Encrypt
   certificate (usually auto-issued within a few hours of pointing the
   domain).
2. The included `.htaccess` already forces HTTPS. Optionally also enable
   hPanel's **"Force HTTPS"** toggle.

## 4. Verify

- Visit `https://your-domain/` — the site should load.
- Browser dev tools → Network → confirm assets return `200`.
- Check the map embed, WhatsApp button, click-to-call and the chatbot.
- https://www.ssllabs.com/ssltest/ to verify TLS (HSTS header included).

---

## What changed vs. the old server deployment

| Before (standalone server)             | Now (static export)                    |
| -------------------------------------- | -------------------------------------- |
| `output: "standalone"` in next.config  | `output: "export"`                     |
| Node/Bun server via `.next/standalone` | Plain files in `out/`                  |
| Security headers from `next.config.ts` | Security headers from `out/.htaccess`  |
| Prisma + SQLite scaffolding (unused)   | Removed — site needs no database       |
| Caddyfile reverse proxy                | Removed — not needed                   |

The appointment form is intentionally client-side (simulated submit with a
"call to book" fallback) and works unchanged on static hosting.

## Redeploying after content changes

Edit the source → `npm run build` → delete old files in `public_html` →
upload the new contents of `out/`. Because Next.js fingerprints assets
under `/_next/static/`, browsers pick up changes immediately (HTML is
served with `no-cache`).

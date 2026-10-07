import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting (Hostinger): `next build` emits out/.
  // Upload the CONTENTS of out/ to public_html — no Node.js server required.
  output: "export",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Static export cannot use the Next.js Image Optimization API (it requires a
  // Node.js server). No component currently uses next/image; `unoptimized`
  // keeps any future next/image usage working as plain <img> in the static build.
  images: {
    unoptimized: true,
  },
  // NOTE: Security headers (CSP, X-Frame-Options, HSTS, etc.) were previously
  // set here via headers(). A static export is served as plain files, so those
  // headers must be applied by the web server instead — they now live in
  // public/.htaccess (copied into out/ at build time) for Apache/LiteSpeed
  // shared hosting. Keep .htaccess in sync if you change security policy.
};

export default nextConfig;

"use client";

import { useEffect, useRef } from "react";

/**
 * Calendly inline booking widget — the official embed
 * (assets.calendly.com/assets/external/widget.js) wrapped for React.
 *
 * Calendly owns availability and the entire booking flow: the scheduler
 * runs in an iframe inside the page, visitors never leave the site, and
 * this site (a static export) stores and processes nothing.
 */

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

// Event: "30 Minute Meeting — Digitize Creation" (30 min, clinic location).
// Query params are Calendly's documented embed options:
//  - hide_event_type_details=1  calendar-only layout that fits the existing
//    two-column appointment card; the 30-min duration is shown in the card
//    heading instead of Calendly's side panel
//  - hide_gdpr_banner=1         no cookie banner inside the embed
//  - background/text/primary    brand tokens from globals.css (light theme)
const CALENDLY_EVENT_URL =
  "https://calendly.com/digitizecreation-0xsi/30min" +
  "?hide_gdpr_banner=1&hide_event_type_details=1" +
  "&background_color=FFFFFF&text_color=09192A&primary_color=0049A1";

type CalendlyApi = {
  initInlineWidget?: (options: {
    url: string;
    parentElement: HTMLElement;
    inlineStyles?: boolean;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

// Module-level singleton — the script is injected exactly once per page,
// even if this component mounts/unmounts again (React StrictMode, etc.).
let calendlyScript: Promise<CalendlyApi | null> | null = null;

function loadCalendlyScript(): Promise<CalendlyApi | null> {
  if (typeof document === "undefined") return Promise.resolve(null);
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (!calendlyScript) {
    calendlyScript = new Promise((resolve) => {
      const settle = () => resolve(window.Calendly ?? null);
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${CALENDLY_SCRIPT_SRC}"]`,
      );
      if (existing) {
        // Tag already present (component remounted). window.Calendly is
        // assigned while the script executes, so if it is missing the
        // "load" event has not fired yet and will settle this promise.
        if (window.Calendly) settle();
        else {
          existing.addEventListener("load", settle, { once: true });
          existing.addEventListener("error", settle, { once: true });
        }
        return;
      }
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", settle, { once: true });
      script.addEventListener("error", settle, { once: true });
      document.body.appendChild(script);
    });
  }
  return calendlyScript;
}

/**
 * Official Calendly inline embed as a React component.
 *
 * Renders the documented markup — <div class="calendly-inline-widget"
 * data-url="…"> — which widget.js picks up when it loads and fills with
 * the booking iframe (processed divs are marked with data-processed).
 */
export function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;

    void loadCalendlyScript().then((calendly) => {
      if (disposed || !container.isConnected) return;
      // On first mount widget.js has already auto-initialized the div (it
      // sets data-processed before the script's load event resolves this
      // promise). A div that missed that scan — the component remounted
      // after the script was already loaded — is initialized here, once.
      if (container.getAttribute("data-processed")) return;
      calendly?.initInlineWidget?.({
        url: CALENDLY_EVENT_URL,
        parentElement: container,
        inlineStyles: true,
      });
    });

    return () => {
      disposed = true;
      // Drop the injected iframe so a remount starts clean.
      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full"
      data-url={CALENDLY_EVENT_URL}
      // Calendly's fixed-height embed (as in their official snippet): the
      // iframe is 100% of this height and scrolls internally on taller
      // steps (time list, details form) — standard Calendly behaviour.
      // Note: data-resize (auto height) is intentionally NOT used — the
      // current widget.js posts a bogus "2px" page_height for this event.
      style={{ height: "660px" }}
    />
  );
}

/** GA4 — set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel (G-XXXXXXXXXX) */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const GA_CONVERSION_EVENTS = {
  /** User reached AccuTrade form (#offer on /sell) */
  viewOfferForm: "view_offer_form",
  /** Primary CTA toward offer flow */
  ctaGetOffer: "cta_get_offer",
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

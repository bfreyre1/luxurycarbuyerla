/** GA4 — set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel (G-XXXXXXXXXX) */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const GA_CONVERSION_EVENTS = {
  /** User reached AccuTrade form (#offer on /sell) */
  viewOfferForm: "view_offer_form",
  /** Primary CTA toward offer flow */
  ctaGetOffer: "cta_get_offer",
  /** AccuTrade finished the offer. This is the lead. */
  leadSubmitted: "lead_submitted",
} as const;

/** Set this to the Google Ads send_to value (AW-123/label) when the conversion exists. */
export const GOOGLE_ADS_LEAD_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO?.trim() ?? "";

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

/** Fires only after NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO is set. */
export function trackGoogleAdsLead() {
  if (!GOOGLE_ADS_LEAD_SEND_TO || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: GOOGLE_ADS_LEAD_SEND_TO });
}

/**
 * LCB Meta dataset. This is the Luxury Car Buyer pixel in JF Bhl's Business,
 * connected only to ad account 651607808592839.
 * It is not JF Bhl's store pixel.
 */
export const META_PIXEL_ID = "1820985055722887";

export const META_EVENTS = {
  pageView: "PageView",
  viewContent: "ViewContent",
  lead: "Lead",
} as const;

export type MetaStandardEvent = (typeof META_EVENTS)[keyof typeof META_EVENTS];

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function metaPixelIdIsSafe(id: string) {
  return /^\d{15,17}$/.test(id);
}

export function metaTrackCall(
  event: MetaStandardEvent,
  params?: Record<string, string>,
): ["track", MetaStandardEvent] | ["track", MetaStandardEvent, Record<string, string>] {
  if (params && Object.keys(params).length > 0) return ["track", event, params];
  return ["track", event];
}

function sendWhenReady(call: ReturnType<typeof metaTrackCall>) {
  if (typeof window === "undefined") return;
  const attempt = () => {
    if (typeof window.fbq !== "function") return false;
    window.fbq(...call);
    return true;
  };
  if (attempt()) return;
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (attempt() || tries >= 20) window.clearInterval(timer);
  }, 100);
}

export function trackMeta(event: MetaStandardEvent, params?: Record<string, string>) {
  if (!metaPixelIdIsSafe(META_PIXEL_ID)) return;
  sendWhenReady(metaTrackCall(event, params));
}

/** Current path plus query and hash, so /sell is not reported as the homepage. */
export function metaPagePath(pathname: string, search = "", hash = "") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const query = search ? `?${search.replace(/^\?/, "")}` : "";
  const fragment = hash ? `#${hash.replace(/^#/, "")}` : "";
  return `${path}${query}${fragment}`;
}

/**
 * Meta's library sends one PageView, then drops later PageView calls.
 * Next.js navigates with the history method it saved before that library
 * loads, so the library never sees the move to /sell and keeps the homepage URL.
 * These two flags let our route tracker send a real PageView for each page.
 */
export function metaPixelInitScript(pixelId: string) {
  return `fbq.disablePushState = true;fbq.allowDuplicatePageViews = true;fbq('init', '${pixelId}');`;
}

export function trackMetaPageView(pagePath: string) {
  const params: Record<string, string> = { page_path: pagePath };
  if (typeof window !== "undefined" && window.location.origin) {
    params.page_location = `${window.location.origin}${pagePath}`;
  }
  trackMeta(META_EVENTS.pageView, params);
}

/** Offer form (#offer) is on screen. Matches GA4 view_offer_form. */
export function trackMetaViewContent() {
  trackMeta(META_EVENTS.viewContent, {
    content_name: "offer_form",
    content_category: "sell",
  });
}

/** A Get offer click. Matches GA4 cta_get_offer. The AccuTrade submit is inside their frame. */
export function trackMetaLead(placement: string) {
  trackMeta(META_EVENTS.lead, {
    content_name: "get_offer",
    content_category: placement,
  });
}

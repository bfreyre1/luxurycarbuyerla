/** Ad click ids kept for the visit and handed to the AccuTrade frame. */

export const AD_SOURCE_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type AdSourceKey = (typeof AD_SOURCE_KEYS)[number];
export type AdSource = Partial<Record<AdSourceKey, string>>;

export const AD_SOURCE_STORAGE_KEY = "lcb-ad-source";

const SAFE_VALUE = /^[\w .+:@~/-]{1,120}$/;

export function cleanAdValue(raw: string | null): string {
  if (!raw) return "";
  const value = raw.trim();
  if (!SAFE_VALUE.test(value)) return "";
  return value;
}

export function readAdSourceFromSearch(search: string): AdSource {
  const params = new URLSearchParams(search.replace(/^\?/, ""));
  const source: AdSource = {};
  for (const key of AD_SOURCE_KEYS) {
    const value = cleanAdValue(params.get(key));
    if (value) source[key] = value;
  }
  return source;
}

export function mergeAdSource(saved: AdSource, fresh: AdSource): AdSource {
  const next: AdSource = { ...saved };
  for (const key of AD_SOURCE_KEYS) {
    const value = fresh[key];
    if (value) next[key] = value;
  }
  return next;
}

/**
 * Query keys the cash-offer frame reads.
 * gclid and fbclid are copied onto the offer extras.
 * utm_source, utm_medium, and utm_campaign are read by the frame.
 * utm_content is not a frame key, so it rides in pt1.
 * pt2–pt6 repeat the visit on the pass-through fields that land in the ADF.
 */
export function iframeAdParams(source: AdSource): Record<string, string> {
  const params: Record<string, string> = {};
  if (source.utm_source) {
    params.utm_source = source.utm_source;
    params.pt2 = source.utm_source;
  }
  if (source.utm_medium) {
    params.utm_medium = source.utm_medium;
    params.pt3 = source.utm_medium;
  }
  if (source.utm_campaign) {
    params.utm_campaign = source.utm_campaign;
    params.campaign = source.utm_campaign;
    params.pt4 = source.utm_campaign;
  }
  if (source.utm_content) params.pt1 = source.utm_content;
  if (source.gclid) {
    params.gclid = source.gclid;
    params.pt5 = source.gclid;
  }
  if (source.fbclid) {
    params.fbclid = source.fbclid;
    params.pt6 = source.fbclid;
  }
  return params;
}

type SourceStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function captureAdSource(search: string, store: SourceStore): AdSource {
  const fresh = readAdSourceFromSearch(search);
  let saved: AdSource = {};
  try {
    const raw = store.getItem(AD_SOURCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdSource;
      if (parsed && typeof parsed === "object") saved = parsed;
    }
  } catch {
    saved = {};
  }
  const merged = mergeAdSource(saved, fresh);
  if (Object.keys(fresh).length > 0) {
    store.setItem(AD_SOURCE_STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
}

export function loadVisitAdSource(): AdSource {
  if (typeof window === "undefined") return {};
  return captureAdSource(window.location.search, window.sessionStorage);
}

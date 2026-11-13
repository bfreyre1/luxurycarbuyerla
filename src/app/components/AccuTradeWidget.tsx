"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ACCUTRADE_BASE_URL,
  ACCUTRADE_CONTAINER_ID,
  ACCUTRADE_DEALER_ID,
  ACCUTRADE_PLATE_ENTRY,
} from "../lib/accutrade";
import { offerCode, readAccuTradeOutbound } from "../lib/accutradeMessage";
import { iframeAdParams, loadVisitAdSource, type AdSource } from "../lib/adSource";
import { GA_CONVERSION_EVENTS, trackEvent, trackGoogleAdsLead } from "../lib/analytics";
import { trackMetaOfferLead } from "../lib/metaPixel";

function buildIframeSrc(host: string, source: AdSource) {
  const params = new URLSearchParams({
    dlr: ACCUTRADE_DEALER_ID,
    lt: "dealer",
    dt: "iframe",
    plateEntry: ACCUTRADE_PLATE_ENTRY ? "true" : "false",
    ...iframeAdParams(source),
  });
  if (host) params.set("hd", host);
  return `${ACCUTRADE_BASE_URL}?${params.toString()}`;
}

function subscribe() {
  return () => {};
}

function getHostSnapshot() {
  return window.location.hostname;
}

function getServerHostSnapshot() {
  return "";
}

function getAdSnapshot() {
  return JSON.stringify(loadVisitAdSource());
}

function getServerAdSnapshot() {
  return "{}";
}

export default function AccuTradeWidget() {
  const host = useSyncExternalStore(subscribe, getHostSnapshot, getServerHostSnapshot);
  const adSnapshot = useSyncExternalStore(subscribe, getAdSnapshot, getServerAdSnapshot);
  const [height, setHeight] = useState(800);
  const firedOffers = useRef(new Set<string>());

  const source = useMemo(() => {
    try {
      return JSON.parse(adSnapshot) as AdSource;
    } catch {
      return {};
    }
  }, [adSnapshot]);

  const iframeSrc = useMemo(
    () => (host ? buildIframeSrc(host, source) : ""),
    [host, source],
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("accu-trade.com")) return;
      const outbound = readAccuTradeOutbound(event.data);
      if (!outbound) return;
      if (outbound.newHeight) {
        setHeight(Math.max(480, Number(outbound.newHeight)));
      }
      if (!outbound.estimateComplete) return;
      const code = offerCode(outbound) || "complete";
      if (firedOffers.current.has(code)) return;
      firedOffers.current.add(code);
      const params: Record<string, string> = { page: "/sell" };
      if (code !== "complete") params.offer = code;
      for (const [key, value] of Object.entries(iframeAdParams(source))) {
        if (key.startsWith("pt")) continue;
        params[key] = value;
      }
      trackEvent(GA_CONVERSION_EVENTS.leadSubmitted, params);
      trackMetaOfferLead();
      trackGoogleAdsLead();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [source]);

  return (
    <div id={ACCUTRADE_CONTAINER_ID} className="relative w-full">
      {!iframeSrc ? (
        <div className="flex min-h-[480px] items-center justify-center rounded-xl border border-white/10 bg-white">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <p className="text-sm text-zinc-500">Loading instant offer form…</p>
          </div>
        </div>
      ) : (
        <iframe
          id="atEmbeddedFrame"
          title="Get a preliminary cash offer for your luxury vehicle"
          src={iframeSrc}
          width="100%"
          height={height}
          scrolling="auto"
          className="block w-full rounded-xl border border-white/10 bg-white"
          style={{ minHeight: 480 }}
          allow="clipboard-write"
        />
      )}
    </div>
  );
}

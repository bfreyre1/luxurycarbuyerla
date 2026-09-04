"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ACCUTRADE_BASE_URL,
  ACCUTRADE_DEALER_ID,
  ACCUTRADE_PLATE_ENTRY,
} from "../lib/accutrade";

function buildIframeSrc(host: string) {
  const params = new URLSearchParams({
    dlr: ACCUTRADE_DEALER_ID,
    lt: "dealer",
    dt: "iframe",
    plateEntry: ACCUTRADE_PLATE_ENTRY ? "True" : "False",
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

export default function AccuTradeWidget() {
  const host = useSyncExternalStore(subscribe, getHostSnapshot, getServerHostSnapshot);
  const [height, setHeight] = useState(800);

  const iframeSrc = useMemo(
    () => (host ? buildIframeSrc(host) : ""),
    [host]
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("accu-trade.com")) return;
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.atOutbound?.newHeight) {
          setHeight(Math.max(480, Number(data.atOutbound.newHeight)));
        }
      } catch {
        /* ignore non-JSON messages */
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="relative w-full">
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

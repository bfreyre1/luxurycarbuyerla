"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACCUTRADE_BASE_URL,
  ACCUTRADE_CONTAINER_ID,
  ACCUTRADE_DEALER_ID,
} from "../lib/accutrade";

declare global {
  interface Window {
    AccuTradeObject?: {
      dlr: string;
      url: string;
      target?: string;
    };
  }
}

function loadAccuTradeScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    window.AccuTradeObject = {
      dlr: ACCUTRADE_DEALER_ID,
      url: ACCUTRADE_BASE_URL,
      target: ACCUTRADE_CONTAINER_ID,
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="cashoffer.accu-trade.com/embed/embed.js"]'
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `${ACCUTRADE_BASE_URL}embed/embed.js?v=${Date.now()}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("AccuTrade embed.js failed to load"));

    const firstScript = document.scripts[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  });
}

/** embed.js only inits via MutationObserver — re-attach so it sees the container */
function triggerEmbedInit(container: HTMLElement) {
  const parent = container.parentElement;
  if (!parent) return;
  const placeholder = document.createComment("at-init");
  parent.replaceChild(placeholder, container);
  parent.replaceChild(container, placeholder);
}

function injectIframeFallback(container: HTMLElement) {
  if (container.querySelector("#atEmbeddedFrame")) return;
  const src = `${ACCUTRADE_BASE_URL}?dlr=${ACCUTRADE_DEALER_ID}&lt=dealer&dt=iframe`;
  container.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.id = "atEmbeddedFrame";
  iframe.title = "Get an instant offer for your used car";
  iframe.setAttribute("frameborder", "none");
  iframe.setAttribute("data-hj-allow-iframe", "");
  iframe.width = "100%";
  iframe.scrolling = "auto";
  iframe.style.cssText =
    "margin-left:auto;margin-right:auto;display:block;height:800px;width:100%;border:0;";
  iframe.src = src;
  container.appendChild(iframe);
}

export default function AccuTradeWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    (async () => {
      try {
        await loadAccuTradeScript();
        if (cancelled) return;

        triggerEmbedInit(container);

        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;

        if (!container.querySelector("#atEmbeddedFrame")) {
          triggerEmbedInit(container);
          await new Promise((r) => setTimeout(r, 500));
        }

        if (!container.querySelector("#atEmbeddedFrame")) {
          injectIframeFallback(container);
        }

        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) {
          injectIframeFallback(container);
          setStatus(container.querySelector("#atEmbeddedFrame") ? "ready" : "error");
        }
      }
    })();

    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("accu-trade.com")) return;
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.atOutbound?.newHeight && containerRef.current) {
          const iframe = containerRef.current.querySelector<HTMLIFrameElement>(
            "#atEmbeddedFrame"
          );
          if (iframe) iframe.style.height = `${data.atOutbound.newHeight}px`;
        }
        if (data?.atOutbound?.initComplete) setStatus("ready");
      } catch {
        /* ignore non-JSON messages */
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="relative w-full">
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex min-h-[480px] items-center justify-center rounded-xl bg-surface-elevated">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <p className="text-sm text-zinc-400">Loading instant offer form…</p>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">
          Offer form failed to load. Refresh the page or call us directly.
        </div>
      )}
      <div
        ref={containerRef}
        id={ACCUTRADE_CONTAINER_ID}
        data-display-type="iframe"
        data-lt="dealer"
        className="min-h-[520px] w-full overflow-hidden rounded-xl border border-white/10 bg-white"
      />
    </div>
  );
}

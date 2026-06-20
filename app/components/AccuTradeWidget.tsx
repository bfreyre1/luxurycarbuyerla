"use client";

import { useEffect, useRef } from "react";
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
    };
  }
}

export default function AccuTradeWidget() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || typeof window === "undefined") return;

    window.AccuTradeObject = {
      dlr: ACCUTRADE_DEALER_ID,
      url: ACCUTRADE_BASE_URL,
    };

    const existing = document.querySelector(
      'script[src*="cashoffer.accu-trade.com/embed/embed.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = `${ACCUTRADE_BASE_URL}embed/embed.js?v=${Date.now()}`;
      script.async = true;
      document.body.appendChild(script);
    }

    injected.current = true;
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div
        id={ACCUTRADE_CONTAINER_ID}
        className="min-h-[560px] w-full bg-white"
      />
    </div>
  );
}

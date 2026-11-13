/** The cash-offer frame posts atOutbound when the offer is finished. */

export type AccuTradeOutbound = {
  newHeight?: number;
  estimateComplete?: boolean;
  initComplete?: boolean;
  details?: {
    offer?: string;
  };
};

export function readAccuTradeOutbound(data: unknown): AccuTradeOutbound | null {
  try {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    if (!parsed || typeof parsed !== "object") return null;
    const outbound = (parsed as { atOutbound?: unknown }).atOutbound;
    if (!outbound || typeof outbound !== "object") return null;
    return outbound as AccuTradeOutbound;
  } catch {
    return null;
  }
}

export function offerCode(outbound: AccuTradeOutbound): string {
  const code = outbound.details?.offer;
  return typeof code === "string" && code.trim() ? code.trim() : "";
}

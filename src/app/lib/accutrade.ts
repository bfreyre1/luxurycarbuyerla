/** AccuTrade instant offer — see modules/luxurycarbuyerla/STATE.md on RunPod canon */
export const ACCUTRADE_DEALER_ID = "620720de4009781cb8d64d390fc46ddcbbaaa4f2";
export const ACCUTRADE_BASE_URL = "https://cashoffer.accu-trade.com/";
export const ACCUTRADE_CONTAINER_ID = "atFrameContainer";

export type AccuTradeObjectConfig = {
  dlr: string;
  url: string;
  target?: string;
};

declare global {
  interface Window {
    AccuTradeObject?: AccuTradeObjectConfig;
  }
}

export {};

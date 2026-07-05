/** AccuTrade instant offer — see modules/luxurycarbuyerla/STATE.md on RunPod canon */
export const ACCUTRADE_DEALER_ID = "620720de4009781cb8d64d390fc46ddcbbaaa4f2";
export const ACCUTRADE_BASE_URL = "https://cashoffer.accu-trade.com/";
export const ACCUTRADE_PERSEUS_API_URL = "https://perseus-api-production.accu-trade.com";
export const ACCUTRADE_CONTAINER_ID = "atFrameContainer";
/** Hide license-plate entry — default flow to VIN / YMM (AccuTrade Perseus iframe param) */
export const ACCUTRADE_PLATE_ENTRY = false;

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

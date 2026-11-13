import assert from "node:assert/strict";
import test from "node:test";
import { offerCode, readAccuTradeOutbound } from "./accutradeMessage.ts";

test("a finished offer is the estimateComplete message", () => {
  const outbound = readAccuTradeOutbound(
    JSON.stringify({
      atOutbound: { estimateComplete: true, details: { offer: "AT-100" }, newHeight: 900 },
    }),
  );
  assert.equal(outbound?.estimateComplete, true);
  assert.equal(offerCode(outbound!), "AT-100");
});

test("a height message is not a lead", () => {
  const outbound = readAccuTradeOutbound({ atOutbound: { newHeight: 640 } });
  assert.equal(outbound?.estimateComplete, undefined);
  assert.equal(offerCode(outbound!), "");
});

test("a bad frame message is ignored", () => {
  assert.equal(readAccuTradeOutbound("not-json"), null);
  assert.equal(readAccuTradeOutbound(null), null);
});

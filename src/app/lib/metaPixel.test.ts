import assert from "node:assert/strict";
import test from "node:test";
import { META_PIXEL_ID, metaPixelIdIsSafe, metaTrackCall } from "./metaPixel.ts";

test("pixel id is the LCB dataset and only digits", () => {
  assert.equal(META_PIXEL_ID, "1820985055722887");
  assert.equal(metaPixelIdIsSafe(META_PIXEL_ID), true);
  assert.equal(metaPixelIdIsSafe("1820985055722887;alert(1)"), false);
  assert.equal(metaPixelIdIsSafe(""), false);
});

test("standard events keep Meta's event names", () => {
  assert.deepEqual(metaTrackCall("PageView"), ["track", "PageView"]);
  assert.deepEqual(
    metaTrackCall("ViewContent", { content_name: "offer_form", content_category: "sell" }),
    ["track", "ViewContent", { content_name: "offer_form", content_category: "sell" }],
  );
  assert.deepEqual(
    metaTrackCall("Lead", { content_name: "get_offer", content_category: "sell_hero" }),
    ["track", "Lead", { content_name: "get_offer", content_category: "sell_hero" }],
  );
});

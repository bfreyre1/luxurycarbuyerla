import assert from "node:assert/strict";
import test from "node:test";
import { captureAdSource, iframeAdParams, readAdSourceFromSearch } from "./adSource.ts";

test("a landing query keeps the visit fields the frame can read", () => {
  const source = readAdSourceFromSearch(
    "?utm_source=google&utm_medium=cpc&utm_campaign=porsche&utm_content=vin-ad&gclid=abc123&fbclid=fb999&junk=<script>",
  );
  assert.deepEqual(source, {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "porsche",
    utm_content: "vin-ad",
    gclid: "abc123",
    fbclid: "fb999",
  });
  assert.deepEqual(iframeAdParams(source), {
    utm_source: "google",
    pt2: "google",
    utm_medium: "cpc",
    pt3: "cpc",
    utm_campaign: "porsche",
    campaign: "porsche",
    pt4: "porsche",
    pt1: "vin-ad",
    gclid: "abc123",
    pt5: "abc123",
    fbclid: "fb999",
    pt6: "fb999",
  });
});

test("a later page without ads keeps the first visit", () => {
  const memory = new Map<string, string>();
  const store = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
  };
  captureAdSource("?gclid=click-1&utm_source=google", store);
  const kept = captureAdSource("", store);
  assert.equal(kept.gclid, "click-1");
  assert.equal(kept.utm_source, "google");
  assert.equal(memory.size, 1);
});

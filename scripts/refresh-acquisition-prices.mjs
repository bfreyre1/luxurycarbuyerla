#!/usr/bin/env node
/**
 * Refresh acquisition grid prices from AccuTrade Perseus API.
 *
 * Requires: ACCUTRADE_API_KEY (Token from AccuTrade / Jim Falk rep)
 * Optional: ACCUTRADE_DEALER_UUID, ACCUTRADE_API_BASE, ACQUISITION_ROUND_TO
 *
 * Usage:
 *   node scripts/refresh-acquisition-prices.mjs           # dry-run (default)
 *   node scripts/refresh-acquisition-prices.mjs --write     # write JSON + patch catalog fallbacks
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const API_BASE =
  process.env.ACCUTRADE_API_BASE ?? "https://perseus-api-production.accu-trade.com";
const API_KEY = process.env.ACCUTRADE_API_KEY ?? "";
const DEALER_UUID =
  process.env.ACCUTRADE_DEALER_UUID ?? "620720de4009781cb8d64d390fc46ddcbbaaa4f2";
const ROUND_TO = Number(process.env.ACQUISITION_ROUND_TO ?? "500");
const WRITE = process.argv.includes("--write");
const VERBOSE = process.argv.includes("--verbose");

const config = JSON.parse(
  readFileSync(join(__dirname, "acquisition-pricing.config.json"), "utf8"),
);
const OUT_PATH = join(ROOT, "src/app/lib/acquisitionPrices.generated.json");

function log(...args) {
  console.log("[acquisition-prices]", ...args);
}

function authHeaders() {
  if (!API_KEY) {
    throw new Error(
      "ACCUTRADE_API_KEY is required. Request Perseus API token from Jim Falk / AccuTrade rep.",
    );
  }
  return {
    Accept: "application/json",
    Authorization: `Token ${API_KEY}`,
  };
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders() });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`GET ${path} → ${res.status}: ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body;
}

async function apiPost(path, payload) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`POST ${path} → ${res.status}: ${JSON.stringify(body).slice(0, 400)}`);
  }
  return body;
}

function encodePathSegment(value) {
  return encodeURIComponent(value);
}

function pickStyle(styles, vehicle) {
  const includes = (vehicle.styleIncludes ?? []).map((s) => s.toLowerCase());
  const excludes = (vehicle.styleExcludes ?? []).map((s) => s.toLowerCase());

  const candidates = styles.filter((row) => {
    const label = `${row.style ?? ""} ${row.trim ?? ""}`.toLowerCase();
    if (row.specialized) return false;
    if (excludes.some((ex) => label.includes(ex))) return false;
    if (includes.length === 0) return true;
    return includes.some((inc) => label.includes(inc));
  });

  if (candidates.length === 0) {
    const available = styles.map((s) => s.style).join(", ");
    throw new Error(
      `No style match for ${vehicle.id} (${vehicle.make} ${vehicle.model}). Available: ${available}`,
    );
  }

  return candidates[0];
}

function buildVacs(options) {
  if (!Array.isArray(options)) return [];
  return options.map((opt) => ({
    description: opt.description,
    addded: opt.addded,
    ref_id: opt.ref_id,
    selected: Boolean(opt.selected),
  }));
}

function parseMoney(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function parseRangeLower(range) {
  if (range == null) return null;
  if (Array.isArray(range) && range.length > 0) return parseMoney(range[0]);
  const str = String(range);
  const parts = str.split(/\s*[-–—]\s*/);
  return parseMoney(parts[0] ?? str);
}

function roundDisplayPrice(amount) {
  if (!ROUND_TO || ROUND_TO <= 1) return Math.round(amount);
  return Math.floor(amount / ROUND_TO) * ROUND_TO;
}

function extractDisplayPrice(pricing) {
  const fromRange = parseRangeLower(pricing.range);
  const fromValue = parseMoney(pricing.value);
  const raw = fromRange ?? fromValue;
  if (raw == null) {
    throw new Error(`No price in response: ${JSON.stringify(pricing)}`);
  }
  return roundDisplayPrice(raw);
}

async function priceVehicle(vehicle, postalCode, condition) {
  const { pricingYear, make, model, pricingMileage, id } = vehicle;
  if (!pricingMileage || pricingMileage <= 0) {
    throw new Error(`${id}: pricingMileage is required for AccuTrade valuation`);
  }

  const stylesPath = `/api/vehicle/styles/${pricingYear}/${encodePathSegment(make)}/${encodePathSegment(model)}/`;
  const styles = await apiGet(stylesPath);
  if (!Array.isArray(styles) || styles.length === 0) {
    throw new Error(`No styles returned for ${make} ${model} ${pricingYear}`);
  }

  const style = pickStyle(styles, vehicle);
  const gid = style.gid;
  if (VERBOSE) log(id, "→ style", style.style, "gid", gid);

  const vehicleData = await apiGet(`/api/vehicle/data/v2/${gid}/?gid=${gid}&region=${postalCode}`);

  const payload = {
    uuid: DEALER_UUID,
    vehicle_source: vehicleData.source ?? style.source ?? 1,
    vehicle_source_id: String(vehicleData.gid ?? gid),
    vehicle_year: Number(vehicleData.year ?? pricingYear),
    vehicle_make: vehicleData.make ?? make,
    vehicle_model: vehicleData.model ?? model,
    vehicle_style: vehicleData.style ?? style.style,
    vehicle_mileage: pricingMileage,
    approximate_condition: condition,
    pricing_type: "ranged",
    pricing_boost_to_market: true,
    lead_source: "lcb_acquisition_refresh",
    is_testing: true,
    consumer: { postal_code: postalCode },
    vacs: buildVacs(vehicleData.options),
  };

  const pricing = await apiPost("/api/offer/pricing/calculate/", payload);
  const displayPrice = extractDisplayPrice(pricing);

  return {
    id,
    displayPrice,
    style: payload.vehicle_style,
    gid,
    raw: pricing,
  };
}

async function main() {
  log(WRITE ? "WRITE mode" : "DRY-RUN (pass --write to save)");

  if (!API_KEY) {
    log("No ACCUTRADE_API_KEY — writing fallback-only snapshot from config");
    const fallback = {
      updatedAt: new Date().toISOString(),
      source: "fallback",
      note: "Set ACCUTRADE_API_KEY and re-run to pull live AccuTrade pricing.",
      prices: Object.fromEntries(
        config.vehicles.map((v) => [
          v.id,
          {
            price: v.fallbackPrice,
            pricingYear: v.pricingYear,
            pricingMileage: v.pricingMileage,
            style: null,
            gid: null,
          },
        ]),
      ),
    };
    if (WRITE) {
      writeFileSync(OUT_PATH, `${JSON.stringify(fallback, null, 2)}\n`);
      log("Wrote fallback", OUT_PATH);
    } else {
      log(JSON.stringify(fallback, null, 2));
    }
    process.exit(0);
  }

  const postalCode = config.postalCode ?? "90212";
  const condition = config.condition ?? "excellent";
  const prices = {};
  const errors = [];

  for (const vehicle of config.vehicles) {
    try {
      const result = await priceVehicle(vehicle, postalCode, condition);
      prices[vehicle.id] = {
        price: result.displayPrice,
        pricingYear: vehicle.pricingYear,
        pricingMileage: vehicle.pricingMileage,
        style: result.style,
        gid: result.gid,
        apiValue: result.raw.value ?? null,
        apiRange: result.raw.range ?? null,
      };
      log(
        `✓ ${vehicle.id}: $${result.displayPrice.toLocaleString()} (${result.style})`,
      );
    } catch (err) {
      errors.push({ id: vehicle.id, error: err.message });
      prices[vehicle.id] = {
        price: vehicle.fallbackPrice,
        pricingYear: vehicle.pricingYear,
        pricingMileage: vehicle.pricingMileage,
        style: null,
        gid: null,
        error: err.message,
        fallback: true,
      };
      log(`✗ ${vehicle.id}: ${err.message} — using fallback $${vehicle.fallbackPrice}`);
    }
  }

  const output = {
    updatedAt: new Date().toISOString(),
    source: "accutrade-perseus",
    postalCode,
    condition,
    prices,
    errors: errors.length ? errors : undefined,
  };

  if (WRITE) {
    writeFileSync(OUT_PATH, `${JSON.stringify(output, null, 2)}\n`);
    log("Wrote", OUT_PATH);
  } else {
    log("\nPreview:\n", JSON.stringify(output, null, 2));
    log("\nRe-run with --write to save.");
  }

  if (errors.length) process.exit(1);
}

main().catch((err) => {
  console.error("[acquisition-prices] Fatal:", err.message);
  process.exit(1);
});

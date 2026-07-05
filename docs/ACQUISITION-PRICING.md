# LCB acquisition grid — automated pricing (AccuTrade Perseus)

Last updated: 2026-07-05

Grid prices are **not** fetched at page load. A weekly script pulls AccuTrade valuations and writes a committed JSON snapshot the site imports at build time.

## Why AccuTrade

- Same valuation engine as the `/sell#offer` widget (Jim Falk dealer UUID)
- Perseus API supports YMM + mileage + condition without creating consumer leads when `is_testing: true`
- No public Manheim MMR API without separate Cox approval

## Setup (one time)

1. Ask Jim Falk / AccuTrade rep for **Perseus API token** for dealer `620720de4009781cb8d64d390fc46ddcbbaaa4f2`
2. On RunPod (or local):

```bash
cd ~/.openclaw/workspace/luxurycarbuyerla.com
cp .env.example .env.local   # or export in shell — never commit .env
# Add ACCUTRADE_API_KEY=...
```

## Refresh prices

```bash
# Preview (no file write)
npm run refresh:acquisition-prices

# Save snapshot → commit → push → Vercel
npm run refresh:acquisition-prices -- --write
git add src/app/lib/acquisitionPrices.generated.json
git commit -m "Refresh acquisition grid prices from AccuTrade"
git push
```

Output: `src/app/lib/acquisitionPrices.generated.json`

## Config

| File | Purpose |
|------|---------|
| `scripts/acquisition-pricing.config.json` | YMM, trim matching, sample mileage per card |
| `scripts/refresh-acquisition-prices.mjs` | Perseus client |
| `src/app/lib/acquisitionCatalog.ts` | Display copy, year/mileage caps, images |
| `src/app/lib/acquisitionPrices.generated.json` | Generated prices (committed) |

### Trim matching

Each vehicle uses `styleIncludes` / `styleExcludes` against AccuTrade `/api/vehicle/styles/{year}/{make}/{model}/`. Adjust if API returns unexpected trims.

### Display price logic

1. POST `/api/offer/pricing/calculate/` with excellent condition, Beverly Hills ZIP `90212`, `pricing_boost_to_market: true`
2. Use **lower bound of ranged price** (or single `value`)
3. Round down to nearest **$500** (`ACQUISITION_ROUND_TO`)

Public badge stays **“Recent market from”** — not “AccuTrade” or “MMR”.

## Weekly RunPod cron (Alfred)

```bash
# ~/.openclaw/cron or openclaw job — Mondays 6am PT
cd ~/.openclaw/workspace/luxurycarbuyerla.com
git pull
set -a && source .env.local && set +a
npm run refresh:acquisition-prices -- --write
git add src/app/lib/acquisitionPrices.generated.json
git diff --staged --quiet || git commit -m "chore: refresh acquisition prices [accutrade]"
git push
```

## Alfred prompt (Discord `#luxury-car-buyer-la`)

```
@Alfred LCB — weekly acquisition price refresh

Prereq: ACCUTRADE_API_KEY in ~/.openclaw/workspace/luxurycarbuyerla.com/.env.local

Run:
cd ~/.openclaw/workspace/luxurycarbuyerla.com && git pull
npm run refresh:acquisition-prices -- --write
git add src/app/lib/acquisitionPrices.generated.json
git diff --staged --quiet || git commit -m "chore: refresh acquisition prices [accutrade]"
git push

Verify: luxurycarbuyerla.vercel.app — 6 cards, prices + year/mileage
Reply **LCB — prices refreshed** with updatedAt + any fallback errors
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `401` / invalid token | Re-request Perseus API key from AccuTrade |
| No style match | Edit `styleIncludes` in config JSON |
| Price seems low | AccuTrade returns acquisition-side values; desk can add manual floor in catalog `defaultPrice` or adjust rounding |
| API down | Script keeps `fallbackPrice` per vehicle and exits non-zero |

## Images

Still separate — Grok workflow in `docs/ACQUISITION-ASSETS.md`. Pricing automation does not pull photos.

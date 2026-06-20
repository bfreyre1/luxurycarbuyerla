# LCB Design & Build Workflow

**Project:** Luxury Car Buyer LA (`luxurycarbuyerla.com`)  
**Purpose:** Who does what — Alfred vs Cursor — so design, code, and deploy stay in sync.

---

## Golden rule

| Role | Alfred (RunPod / Discord) | Cursor (Windows / GitHub) |
|------|---------------------------|---------------------------|
| **Design direction** | ✅ Owns | Implements from spec |
| **Copy & headlines** | ✅ Proposes & approves in canon | Implements in code |
| **React / Next.js code** | ❌ Do not dump full files in Discord | ✅ Owns |
| **GitHub** | Pull, verify, canon updates | ✅ Push all site changes |
| **Production** | Verify builds on RunPod if needed | Vercel auto-deploy from `main` |
| **Source of truth (code)** | `github.com/bfreyre1/luxurycarbuyerla` | Same |
| **Source of truth (canon)** | `~/.openclaw/workspace/modules/luxurycarbuyerla/` | Read-only reference |

**Never:** Two agents editing the same files without Git.  
**Never:** Ask Alfred to paste entire `page.tsx` / multi-file refactors in `#luxury-car-buyer-la` (causes hangs ~56k+ tokens).

---

## Standard loop

```
1. Brandon + Alfred  →  Design brief (sections, copy, references, screenshots)
2. Alfred            →  Update canon (STATE, WORKFLOW, VERSIONS, this doc)
3. Brandon + Cursor  →  Implement in GitHub → push main
4. Vercel            →  Auto-deploy (~1–2 min)
5. Alfred            →  Verify URL, update VERSIONS, Discord summary (short)
```

---

## Alfred OWNS (design & ops)

### Creative direction
- Page structure and section order (e.g. hero → trust strip → acquisitions → widget → FAQ)
- Headline / subhead variants for PPC ad groups
- Tone: Beverly Hills luxury + Alfred urgency where appropriate
- Competitive refs (Car Trackers flow, what to steal vs avoid)
- Approve or reject Cursor deliverables against canon

### Copy (draft in canon or Discord — not in repo dumps)
- Hero H1/H2 options
- Trust strip bullets
- Acquisition card titles and descriptions
- FAQ questions and answers
- SEO meta title/description recommendations

### Data specs (not live API unless wired later)
- Which vehicles go in **“We are actively buying”** grid
- **Recent market / sale prices** — desk updates weekly; spec goes to canon, Cursor updates `src/app/lib/acquisitionTargets.ts`
- Jim Falk legal/brand approvals

### Canon files (RunPod)
| File | Alfred updates |
|------|----------------|
| `STATE.md` | Current site status, URLs, integrations |
| `BRAND.md` | Jim Falk naming, phone, affiliation language |
| `WORKFLOW.md` | Deploy steps, this workflow summary |
| `DESIGN.md` | Approved layout, section list, pending tweaks |
| `VERSIONS.md` | Date + one-line changelog after each deploy |
| `REFERENCE.md` | AccuTrade, Car Trackers, competitor notes |

### Deploy verify (after Cursor push)
```bash
cd ~/.openclaw/workspace/luxurycarbuyerla.com
git pull
npm run build
# Optional: npm run dev for RunPod preview — production is Vercel
```
Report: build pass/fail, live URLs checked, CRM lead test if requested.

### Discord (#luxury-car-buyer-la)
- Short status updates
- Design briefs as bullets or attached spec
- **Do not** output full component source unless explicitly asked for a single small snippet

---

## Cursor OWNS (implementation)

### Codebase
- All files under `src/app/`, `public/`, `next.config.ts`
- Components, pages, legal pages, AccuTrade widget
- `src/app/lib/brand.ts` — dealer name, phone, URLs
- `src/app/lib/acquisitionTargets.ts` — vehicle cards + market prices
- `src/app/lib/accutrade.ts` — dealer ID, embed config

### Hosting
- **Production:** Vercel — `https://luxurycarbuyerla.vercel.app`
- **PPC landing:** `/sell` (primary ad URL when domain live: `luxurycarbuyerla.com/sell`)
- **Do not** use `cp -r app src/app` — repo uses `src/app/` only

### Design implementation
- Implements Alfred-approved specs + Brandon screenshots
- Matches theme: charcoal + champagne gold, Cormorant + Inter
- Jim Falk affiliation block, phone, Privacy/Terms
- AccuTrade iframe = **only** lead capture path (no duplicate forms)

### When Brandon says “implement my tweaks”
- Cursor reads canon + Discord notes + screenshots
- Single focused PR/commit per feature
- Push `main` → Vercel deploys

---

## Approved `/sell` layout (PPC)

Current target architecture — update `DESIGN.md` on RunPod when this changes:

1. **Header** — LCB logo, Jim Falk subline, Get offer → `#offer`, phone  
2. **Hero** — People + car image (pending asset), ad-matched H1, CTA → `#offer`  
3. **Trust bullets** — ~60 sec, FaceTime validation, Jim Falk, no obligation  
4. **Jim Falk affiliation** — Lexus logo, dealer link, phone  
5. **Acquisition grid** — 6 cards, **recent market from $XXX**, “I have one of these →” → `#offer`  
6. **`#offer`** — AccuTrade widget (vehicle + contact + CRM)  
7. **What happens next** — 3 steps  
8. **FAQ** — pending  
9. **Footer** — Privacy · Terms · phone  

**CTA rule:** All “Get offer” buttons scroll to `#offer` — one conversion path.

---

## Brand (locked)

| Item | Value |
|------|--------|
| Business program | Luxury Car Buyer LA |
| Dealer affiliation | **Jim Falk Lexus of Beverly Hills** (not “Jin”) |
| Phone | 310-274-5200 |
| Dealer URL | https://www.jimfalkbeverlyhillslexus.com/ |
| Address | 9230 Wilshire Blvd, Beverly Hills, CA 90212 |
| Offer language | **Preliminary** offer — final after private validation |
| Price badges | “Recent market from” / “Recent sale from” — **not** guaranteed offers |

---

## Integrations (locked)

- **AccuTrade** — instant offer widget, leads → dealer CRM  
- **No duplicate** name/email/phone form on site  
- **Legal:** `/privacy`, `/terms` linked on `/sell` and footer  

---

## PPC readiness checklist

| Item | Owner | Status |
|------|-------|--------|
| `/sell` + AccuTrade | Cursor | Done |
| Jim Falk branding | Cursor | Done |
| Acquisition grid + prices | Cursor + Alfred data | Done (prices editable) |
| Privacy + Terms | Cursor | Done |
| Hero with people | Brandon asset → Cursor | Pending |
| FAQ section | Alfred copy → Cursor | Pending |
| GA4 + conversion tag | Cursor | Pending |
| `luxurycarbuyerla.com` on Vercel | IT + Cursor | Pending |
| Legal review (Jim Falk) | Brandon / dealer | Pending |
| Test leads → CRM | Alfred verify | Pending |

---

## Alfred prompt template (copy to Discord)

```
LCB design brief for Cursor:

Page: /sell
Goal: PPC landing — one path to AccuTrade #offer

Sections (in order):
1. [hero copy]
2. [trust strip]
3. [acquisition cards — list models + recent market prices]
4. widget unchanged
5. [FAQ if any]

Tone: [luxury / urgent / both]
References: [screenshots or URLs]

Do NOT implement in code — update modules/luxurycarbuyerla/DESIGN.md only.
Brandon will paste this into Cursor for build.
```

---

## Cursor prompt template (copy to Cursor)

```
Implement LCB /sell updates from Alfred canon:

- Read docs/DESIGN-WORKFLOW.md
- Alfred brief: [paste brief]
- Update acquisitionTargets.ts prices: [paste]
- Hero image: [path or URL if provided]
- Push to main for Vercel deploy
```

---

## mydonkeybrain.com vs luxurycarbuyerla.com

| Domain | Use |
|--------|-----|
| `luxurycarbuyerla.vercel.app` | Staging / test until LCB domain live |
| `luxurycarbuyerla.com` | Production PPC + public brand (when IT ready) |
| `mydonkeybrain.com` | Private AI network — **not** LCB PPC |

---

## Version log

| Date | Change |
|------|--------|
| 2026-06-20 | Initial DESIGN-WORKFLOW — Alfred/Cursor split documented |
| 2026-06-20 | Acquisition grid + Jim Falk Phase 0–1 on Vercel |

*Alfred: append rows to VERSIONS.md on RunPod after each verified deploy.*

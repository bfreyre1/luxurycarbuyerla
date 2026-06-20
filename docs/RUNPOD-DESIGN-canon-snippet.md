# LCB DESIGN — RunPod canon snippet

Copy this file to: `~/.openclaw/workspace/modules/luxurycarbuyerla/DESIGN.md`

Full detail lives in GitHub: `luxurycarbuyerla/docs/DESIGN-WORKFLOW.md`

---

## Alfred vs Cursor (one paragraph)

**Alfred** owns design direction, copy drafts, acquisition price specs, canon updates, deploy verify, and short Discord summaries. **Cursor** owns all Next.js code on GitHub; Vercel auto-deploys from `main`. Alfred must **not** dump full page source in Discord. Brandon bridges: Alfred brief → Cursor build → Alfred verify.

---

## Approved `/sell` section order

Header (Get offer + phone) → Hero → Trust bullets → Jim Falk block → **Acquisition grid** (recent market $) → **#offer AccuTrade** → 3 steps → FAQ (TBD) → Footer (Privacy · Terms)

All CTAs scroll to `#offer`.

---

## Brand locks

- **Jim Falk Lexus of Beverly Hills** (never Jin)
- Phone: **310-274-5200**
- Preliminary offers only — not “paid today” guarantees
- Price badges: “Recent market from $X” — not binding offers

---

## Alfred after every Cursor push

```bash
cd ~/.openclaw/workspace/luxurycarbuyerla.com && git pull && npm run build
```

Check: `https://luxurycarbuyerla.vercel.app/sell` — widget + grid + Jim Falk visible.

Update: `VERSIONS.md` one line. Discord: 3-bullet summary max.

---

## Pending (Brandon notes)

- [ ] Hero image with people (asset TBD)
- [ ] FAQ copy from Alfred
- [ ] Acquisition prices — weekly desk update → spec here → Cursor edits `acquisitionTargets.ts`
- [ ] GA4 + luxurycarbuyerla.com domain
- [ ] Jim Falk legal sign-off on Privacy/Terms

---
parent: "[[Heritage_Points]]"
format: Prototype Brief
generated: 2026-05-26
---
# CLAUDE.md — Heritage Points Prototype

This file is auto-read by Claude Code. It captures architecture decisions, known quirks, and pending work so you can pick up exactly where we left off.

---

## What this is

A single-file (`index.html`) interactive map prototype for **Heritage Points** — a community-rooted mapping tool for Kazimierz, Kraków. University project, BA-level team, presentable within a week to "newcomers" (first-time visitors to the neighbourhood).

- **Live prototype folder:** `/Users/ekehbk/obsidian-llm-vault/outputs/heritage-points-prototype/`
- **GitHub repo:** `https://github.com/habaqk/heritage-bandaid
- **Vault MCD:** `/Users/ekehbk/obsidian-llm-vault/ideas/active/Heritage_Points/Heritage_Points.md`
- **Dev server config:** `/Users/ekehbk/Documents/Sync Vault 1/.claude/launch.json` (uses `npx serve` on port 3000 — Python 3.9 from CommandLineTools has a PermissionError with `--directory`)

---

## Stack

| Concern | Solution                                            |
| ------- | --------------------------------------------------- |
| Map     | Leaflet.js 1.9.4 (CDN), CartoDB Dark Matter tiles   |
| Data    | Google Sheets (gviz API, `fetch()`)                 |
| Photos  | Picsum.photos placeholders — seeded by place ID     |
| Storage | `localStorage` for user-submitted pins and comments |
| Build   | None — single HTML file, no dependencies to install |

---

## Data source

**Google Sheet ID:** `16xwBD4yg7EM7GmXUzrYjBgPAu68SCbF7x6YoeIEZCgE`

Sheet must be set to "Anyone with the link can view."

**Layout (transposed):**
- Row 1: field name labels (`id` in col A, place IDs `s1`–`s23` in cols B→X)
- Rows 2+: one field per row (col A = field name, cols B+ = values per place)

**Fields:** `id`, `name`, `hookLine`, `shortText`, `fullText`, `category`, `photoFolder` (empty — awaiting Drive links), `lat`, `lng`, `contributor`

**How loading works:**
```
fetch(gviz URL with &headers=1)
  → strip JS wrapper (/*O_o*/\ngoogle.visualization.Query.setResponse(...))
  → JSON.parse()
  → parseGvizData()
```

`&headers=1` is critical — without it, gviz auto-detects all text rows as column headers and collapses them into labels, leaving only the numeric rows (lat, lng) as data.

The gviz endpoint returns CORS-friendly headers so plain `fetch()` works. No JSONP needed (despite what you might assume — gviz ignores the `callback=` param and always wraps with `google.visualization.Query.setResponse`).

---

## Architecture decisions

**Pin click handling:**
SVG elements inside Leaflet `DivIcon`s absorb click events. Fixed with `pointer-events="none"` on both SVG elements. Also uses `L.DomEvent.stopPropagation(e)` to prevent the map `click` (which closes the sheet) from firing after a marker click.

**Selected pin state:**
No flash animation. The clicked pin stays enlarged and brighter while the sheet is open. Implemented via a `pin-selected` CSS class toggled on the marker's `_icon` element. CSS uses `transform-origin: 50% 100%` so the pin scales from its tip, not its centre.

**No seed data fallback:**
The bootstrap loads from the sheet only. If the sheet returns 0 pins, a toast error is shown. `HP_SEED` was deliberately removed.

**Standard POIs (grey pins):**
Hardcoded in `STD_POIS` array — Schindler's Factory, Wawel, Starbucks, McDonald's, etc. These represent what traditional mapping platforms surface. Toggle between Community/Standard views with the top-right button.

---

## Known pending work

- [ ] **Photos:** `photoFolder` column in the sheet is empty. When Drive folder links are added, `photoStripHTML()` already has a "View photos in Drive" link wired up. Real photo display would need a Drive embed or a different approach (Drive doesn't serve images directly via folder link).
- [ ] **Contributor field:** Currently empty in the sheet for all places. Could be populated later.
- [ ] **GitHub Pages:** Repo is at `github.com/habaqk/heritage-points-prototype`. Enable Pages via Settings → Pages → Source: `main` / root to get a live URL at `habaqk.github.io/heritage-points-prototype`.

---

## Local dev

```bash
# Start dev server (use preview_start in Claude Code, or manually):
npx serve /Users/ekehbk/obsidian-llm-vault/outputs/heritage-points-prototype -p 3000 --no-clipboard
# Then open: http://localhost:3000
```

The launch config at `/Users/ekehbk/Documents/Sync Vault 1/.claude/launch.json` points to the `heritage-points-prototype` configuration which does the above.

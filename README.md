---
parent: "[[Heritage_Points]]"
format: Prototype Brief
generated: 2026-05-26
---
# Heritage Points — Prototype

An interactive map prototype for **Heritage Points**, a community-rooted tool for capturing the places in Kazimierz, Kraków that traditional mapping platforms don't surface. Built as a university project.

> *A place is significant because a community says it is.*

---

## What it does

- Shows 23 community-nominated places in Kazimierz as coloured pins on a dark map
- **Optics** — three lenses over the same data: *All places*, *Life & Culture*, *Going Out*. Non-matching pins recede; matching pins stay prominent
- Tap any pin to open a detail sheet: photo strip, hook line, category, description, and comments
- Toggle between **Community** (HP places) and **Standard** (what tourist apps show) to make the contrast visible
- Anyone can add a new place using the **+** button
- Comments are stored locally in the browser

---

## Optics

Optics are the platform's navigational layer — interchangeable lenses over the same underlying place data. They don't change the Heritage Points themselves; they change what becomes visible and what recedes.

| Optic | Categories | Colour |
|---|---|---|
| **All places** | Everything | Teal + Terracotta |
| **Life & Culture** | Event spaces, galleries, informal spots, museums | Teal `#6bbf9e` |
| **Going Out** | Bars, shops | Terracotta `#e87c50` |

Select an optic using the pills at the bottom-left of the map. Adding new optics means adding a new entry to the `OPTICS` constant in `index.html` and grouping categories accordingly.

---

## Running it locally

No build step. No dependencies to install.

```bash
npx serve . -p 3000
# Open http://localhost:3000
```

Or just open `index.html` directly in a browser (note: the Google Sheets fetch may be blocked by some browsers when opened as a local file — use a local server to be safe).

---

## Data

All place data lives in a Google Sheet:

**Sheet ID:** `16xwBD4yg7EM7GmXUzrYjBgPAu68SCbF7x6YoeIEZCgE`

The sheet must be set to **"Anyone with the link can view"** for the prototype to load data.

### Sheet layout

The sheet is transposed — each **column** is one place, each **row** is one field:

| Row | Col A (label) | Col B | Col C | … |
|-----|--------------|-------|-------|---|
| 1   | `id`         | `s1`  | `s2`  | … |
| 2   | `name`       | Theater "BARAKAH" | Hevre | … |
| 3   | `hookLine`   | Small stage, real stakes. | … | … |
| 4   | `shortText`  | … | … | … |
| 5   | `fullText`   | … | … | … |
| 6   | `category`   | event space | … | … |
| 7   | `photoFolder`| *(Drive link, optional)* | … | … |
| 8   | `lat`        | 50.0492 | … | … |
| 9   | `lng`        | 19.9462 | … | … |
| 10  | `contributor`| … | … | … |

To add a new place, add a new column. To edit a place, edit its column values.

### Categories

`event space` · `bar & culture` · `gallery & arts` · `shop` · `informal space` · `museum`

---

## Adding photos

The `photoFolder` row accepts a Google Drive folder link. When populated, a "View photos in Drive" link appears in the detail sheet. Real embedded photos are a future improvement.

---

## Tech

| | |
|---|---|
| Map | [Leaflet.js](https://leafletjs.com/) 1.9.4 |
| Tiles | CartoDB Dark Matter |
| Data | Google Sheets via gviz API |
| Photos | [Picsum](https://picsum.photos/) placeholders |
| Storage | `localStorage` (user pins + comments) |

Single HTML file. No framework. No build step.

---

## Project context

Built for a presentation in the course *European Societies in Times of Accelerated Change* at KU Leuven. Five-person team (arts, CS, social sciences).

The core argument: most digital maps encode a **functionalist epistemology** — a place is real insofar as it generates engagement data. Heritage Points tries to build from a **constructivist epistemology**: a place is significant because a community says it is.

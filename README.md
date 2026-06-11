<p align="center">
  <img src="logo.svg" alt="FormulaM" width="520">
</p>

<p align="center">
  <strong>FormulaM JS</strong><br>
  Front-end-only molecular formula enumeration from observed mass-spectrometry <code>m/z</code> values.
</p>

---

## What this repository is

This is the static JavaScript version of FormulaM. It is designed to run fully in the browser and can be hosted directly by GitHub Pages.

There is no Streamlit server, Python backend, build service, database, or API call required during normal use. The browser loads `data/masses.json`, then runs the formula-search algorithm locally with JavaScript modules.

## Core behavior

FormulaM JS keeps the same simplified formula-search behavior as the current Python/Streamlit FormulaM project:

```text
candidate_mz = candidate_formula_mass / abs(charge)
```

The input mass is always observed `m/z`. Charge is required and explicit. The sign of the charge is used only for labels such as `+`, `-`, `2+`, and `2-`.

No adduct presets are applied. There is no `[M+H]+` shortcut and no public `calculate_mz` helper.

## Main features

- Static HTML/CSS/JavaScript app.
- Runs on GitHub Pages.
- Observed `m/z` search.
- Explicit positive or negative charge.
- ppm, Da, or combined tolerance.
- Isotope-aware formula search rows.
- Repeated element rows with different isotopes, such as `12C` and `13C`.
- CSV export.
- Unified mass-data file at `data/masses.json`.

## Repository layout

```text
index.html                  Web app entry point
logo.svg                    Page logo
favicon.svg                 Browser favicon
.nojekyll                   Disable Jekyll processing on GitHub Pages
package.json                Local scripts

src/
  ui.js                     DOM/UI logic
  search.js                 Formula enumeration algorithm
  massData.js               Mass-data loading/indexing
  formula.js                Formula labels, isotope labels, charge labels
  decimal.js                BigInt decimal/rational helpers
  styles.css                Page styling

data/
  masses.json               Unified isotope/element mass table

scripts/
  check-masses.mjs          Mass-data validation script

tests/
  smoke-test.mjs            Basic search regression test

.github/workflows/
  pages.yml                 Optional GitHub Pages deployment workflow
```

## Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

You can also run:

```bash
npm run serve
```

The app must be served over HTTP because browser module imports and `fetch()` are not reliable from `file://` URLs.

## Test locally

```bash
npm test
npm run validate:data
```

The smoke test checks:

- glucose-like search at `+1`
- glucose-like search at `+2`
- mixed isotope search with `13C`

## Deploy with GitHub Pages

### Option A: deploy from branch root

1. Create a new GitHub repository, for example `FormulaM-js`.
2. Commit all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Set source to **Deploy from a branch**.
5. Select the branch, usually `main`.
6. Select root `/` as the folder.
7. Save.

GitHub Pages will serve `index.html`.

### Option B: deploy with GitHub Actions

This repository also includes:

```text
.github/workflows/pages.yml
```

To use it:

1. Go to **Settings → Pages**.
2. Set source to **GitHub Actions**.
3. Push to `main`.
4. The workflow uploads the repository as a static Pages artifact.

## Updating mass data

The browser app reads:

```text
data/masses.json
```

This bundle includes a standalone mass table generated from RDKit periodic-table isotope data. If strict continuity with the Python FormulaM repository is needed, replace `data/masses.json` with the current Python-project mass file:

```text
ms_formula_finder/data/masses.json
```

Keep the same schema:

```json
{
  "_meta": {},
  "aliases": {},
  "default_isotope_by_symbol": {},
  "isotopes": {}
}
```

## Search API inside JavaScript

The browser UI calls `findFormulas` from `src/search.js`:

```js
import { buildMassIndex } from "./src/massData.js";
import { findFormulas } from "./src/search.js";

const massIndex = buildMassIndex(massPayload);

const hits = findFormulas({
  mz: "180.06338810418",
  charge: "+1",
  tolerancePpm: "5",
  toleranceDa: null,
  maxResults: 100,
  elements: {
    C: [0, 12],
    H: [0, 30],
    O: [0, 12]
  },
  massIndex
});
```

Mixed isotope search:

```js
const hits = findFormulas({
  mz: "181.066742940",
  charge: "+1",
  toleranceDa: "0.000001",
  tolerancePpm: null,
  elements: {
    C: [5, 5],
    "13C": [1, 1],
    H: [12, 12],
    O: [6, 6]
  },
  massIndex
});
```

## Scientific disclaimer

FormulaM JS enumerates candidate formulas from exact-mass constraints. A returned formula is not a confirmed molecular identity or structure. Confirm candidates with isotope-pattern agreement, MS/MS fragmentation, retention time, ionization behavior, sample context, and chemical plausibility.

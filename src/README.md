# Static FormulaM source modules

- `massData.js` loads the current FormulaM `masses.json` structure.
- `search.js` ports the Python `find_formulas` behavior to browser JavaScript.
- `formula.js` ports isotope label normalization, formula display, and charge labels.
- `decimal.js` keeps mass calculations in integer-scaled `BigInt` arithmetic.
- `ui.js` wires the browser controls to `findFormulas` and handles CSV export.

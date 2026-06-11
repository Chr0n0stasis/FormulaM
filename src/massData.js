import { normalizeSpeciesLabel } from "./formula.js";

export const MASS_DATA_CANDIDATES = [
  "./data/masses.json",
  "./masses.json",
  "./ms_formula_finder/data/masses.json",
];

export async function loadMassPayload(urls = MASS_DATA_CANDIDATES) {
  const errors = [];
  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const payload = await response.json();
      return { payload, url };
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }
  throw new Error(`Could not load masses.json. Tried: ${errors.join("; ")}`);
}

export function buildMassIndex(payload) {
  if (!payload || typeof payload !== "object") throw new Error("mass payload must be an object");
  const isotopes = payload.isotopes || {};
  const defaultIsotopeBySymbol = payload.default_isotope_by_symbol || {};
  const aliases = payload.aliases || {};

  const masses = {};
  for (const [label, record] of Object.entries(isotopes)) {
    masses[normalizeSpeciesLabel(label)] = String(record.exact_mass);
  }
  for (const [symbol, isotopeLabel] of Object.entries(defaultIsotopeBySymbol)) {
    const canonical = normalizeSpeciesLabel(isotopeLabel);
    if (!isotopes[canonical]) continue;
    masses[symbol] = String(isotopes[canonical].exact_mass);
  }
  for (const [alias, record] of Object.entries(aliases)) {
    const target = normalizeSpeciesLabel(record.target);
    if (!isotopes[target]) continue;
    masses[alias] = String(isotopes[target].exact_mass);
  }

  const isotopeOptions = {};
  for (const symbol of Object.keys(defaultIsotopeBySymbol)) isotopeOptions[symbol] = [];
  for (const [label, record] of Object.entries(isotopes)) {
    const symbol = String(record.symbol);
    if (!(symbol in isotopeOptions)) continue;
    const canonical = normalizeSpeciesLabel(label);
    const isDefault = canonical === defaultIsotopeBySymbol[symbol];
    if (record.abundance !== null && record.abundance !== undefined || isDefault) {
      isotopeOptions[symbol].push(canonical);
    }
  }
  for (const [symbol, labels] of Object.entries(isotopeOptions)) {
    labels.sort((a, b) => Number(isotopes[a]?.mass_number || 0) - Number(isotopes[b]?.mass_number || 0));
  }

  return {
    meta: payload._meta || {},
    isotopes,
    defaultIsotopeBySymbol,
    aliases,
    masses,
    isotopeOptions,
    elementSymbols: Object.keys(defaultIsotopeBySymbol),
  };
}

export function defaultIsotopeLabel(massIndex, symbol) {
  const label = massIndex.defaultIsotopeBySymbol[symbol];
  if (!label) throw new Error(`unknown element symbol ${symbol}`);
  return label;
}

export function formatIsotopeOption(massIndex, label) {
  const canonical = normalizeSpeciesLabel(label);
  const record = massIndex.isotopes[canonical];
  if (!record) return canonical;
  return massIndex.defaultIsotopeBySymbol[record.symbol] === canonical ? `${canonical} (default)` : canonical;
}

export function elementCapacity(massIndex, symbol) {
  return (massIndex.isotopeOptions[symbol] || []).length;
}

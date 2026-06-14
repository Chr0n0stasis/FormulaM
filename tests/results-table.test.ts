import { describe, expect, it } from "vitest";
import { render } from "svelte/server";
import ResultsTable from "../src/components/ResultsTable.svelte";
import type { FormulaHit, PeakAssignment } from "../src/core/types";

const sampleHit: FormulaHit = {
  formula: "C6H12O6",
  composition: { C: 6, H: 12, O: 6 },
  mass: "180.063388098",
  mz: "180.062839518",
  error_da: "0.000000000",
  error_ppm: "0.000000",
  charge: 1,
  charge_state: "+",
  ion_formula: "[C6H12O6]+",
};

const sampleAssignment: PeakAssignment = {
  peakId: "peak-1",
  mz: 180.062839518,
  intensity: 100,
  relativeIntensity: 100,
  formula: "DifferentNeutralFormula",
  ionFormula: sampleHit.ion_formula,
  predictedMz: 180.062839518,
  errorDa: 0,
  errorPpm: 0,
  source: "formula-search",
};

describe("ResultsTable", () => {
  it("shows only the merged formula column for candidate hits", () => {
    const { body } = render(ResultsTable, { props: { results: [sampleHit] } });

    expect(body.match(/<th class="table-head">Formula<\/th>/g)).toHaveLength(1);
    expect(body).not.toContain(">ion_formula<");
    expect(body).not.toContain(">charge<");
    expect(body).toContain(`<td class="table-cell">${sampleHit.ion_formula}</td>`);
    expect(body).not.toContain(`<td class="table-cell">${sampleHit.formula}</td>`);
    expect(body).not.toContain(">Assign<");
  });

  it("renders sorting controls for the numeric result columns", () => {
    const { body } = render(ResultsTable, { props: { results: [sampleHit] } });

    expect(body).toContain(">Neutral mass<");
    expect(body).toContain(">Predicted m/z<");
    expect(body).toContain(">Error (Da)<");
    expect(body).toContain(">Error (ppm)<");
    expect(body).toContain('aria-label="Sort by neutral mass"');
    expect(body).toContain('aria-label="Sort by predicted m/z"');
    expect(body).toContain('aria-label="Sort by error in daltons"');
    expect(body).toContain('aria-label="Sort by error in ppm"');
    expect(body.match(/aria-sort="none"/g)).toHaveLength(4);
    expect(body.match(/i-typcn-arrow-unsorted/g)).toHaveLength(4);
  });

  it("renders compact toggle buttons and highlights the assigned row", () => {
    const { body } = render(ResultsTable, {
      props: {
        results: [sampleHit],
        selectedPeakLabel: "145.000000",
        activeAssignment: sampleAssignment,
        onToggleAssignment: () => undefined,
      },
    });

    expect(body).toContain('aria-label="Toggle assignment"');
    expect(body).toContain('class="results-row-active"');
    expect(body).toContain('class="results-assign-button-active"');
    expect(body).toContain('aria-pressed="true"');
    expect(body).toContain('i-mdi-minus');
    expect(body).toContain('Remove [C6H12O6]+ from the selected peak');
  });

  it("updates the empty-state colspan to match the visible columns", () => {
    const withoutAssign = render(ResultsTable, { props: { results: [] } }).body;
    const withAssign = render(ResultsTable, { props: { results: [], onToggleAssignment: () => undefined } }).body;

    expect(withoutAssign).toContain('colspan="5"');
    expect(withAssign).toContain('colspan="6"');
  });
});

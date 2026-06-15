import { describe, expect, it } from "vitest";
import { render } from "svelte/server";
import SearchInputs from "../src/components/SearchInputs.svelte";
import { createDefaultSearchForm } from "../src/core/searchForm";

describe("SearchInputs", () => {
  it("replaces tolerance mode with independent ppm and Da toggles", () => {
    const form = createDefaultSearchForm();
    const { body } = render(SearchInputs, {
      props: {
        form,
        onChange: () => undefined,
      },
    });

    expect(body).not.toContain("Tolerance mode");
    expect(body).not.toContain("Enabled");
    expect(body.match(/type="checkbox"/g)).toHaveLength(2);
    expect(body).toContain('value="0.01"');
    expect(body).not.toMatch(/<input[^>]*id="tolerancePpm"[^>]*disabled/);
    expect(body).toMatch(/<input[^>]*id="toleranceDa"[^>]*disabled/);
  });

  it("disables both tolerance inputs when their toggles are off", () => {
    const form = {
      ...createDefaultSearchForm(),
      tolerancePpmEnabled: false,
      toleranceDaEnabled: false,
    };
    const { body } = render(SearchInputs, {
      props: {
        form,
        onChange: () => undefined,
      },
    });

    expect(body).toMatch(/<input[^>]*id="tolerancePpm"[^>]*disabled/);
    expect(body).toMatch(/<input[^>]*id="toleranceDa"[^>]*disabled/);
  });
});

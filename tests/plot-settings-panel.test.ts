import { describe, expect, it } from "vitest";
import { render } from "svelte/server";
import PlotSettingsPanel from "../src/components/PlotSettingsPanel.svelte";
import { DEFAULT_PLOT_SETTINGS } from "../src/core/plotTicks";

describe("PlotSettingsPanel", () => {
  it("keeps field titles outside the interactive controls", () => {
    const { body } = render(PlotSettingsPanel, {
      props: {
        settings: {
          ...DEFAULT_PLOT_SETTINGS,
          xMin: 100,
          xMax: 200,
        },
        onChange: () => undefined,
      },
    });

    expect(body).not.toContain("<label");
    expect(body).toContain('aria-label="xMin"');
    expect(body).toContain('aria-label="xMax"');
    expect(body).toContain('aria-label="Y scale"');
    expect(body).toContain('aria-label="Fixed yMax"');
    expect(body).toContain('aria-label="Peak color"');
    expect(body).toContain('aria-label="Selected peak color"');
    expect(body).toContain('aria-label="Assigned peak color"');
    expect(body).toContain('aria-label="Line width"');
    expect(body).toContain('aria-label="Major tick spacing"');
    expect(body).toContain('aria-label="Threshold percent"');
    expect(body).toContain('aria-label="Label content"');
    expect(body).toContain('aria-label="Label target"');
  });
});

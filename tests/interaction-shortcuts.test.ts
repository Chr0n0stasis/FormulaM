import { describe, expect, it } from "vitest";
import config from "../uno.config";

const shortcuts = config.shortcuts as Record<string, string>;

describe("Uno interaction shortcuts", () => {
  it("limits button focus and active affordances to enabled controls", () => {
    expect(shortcuts["primary-action"]).toContain("enabled:active:border-accent");
    expect(shortcuts["primary-action"]).toContain("enabled:focus-visible:shadow-control-glow");
    expect(shortcuts["secondary-action"]).toContain("enabled:focus:border-accent");
    expect(shortcuts["secondary-action"]).toContain("enabled:active:shadow-control-glow");
    expect(shortcuts["icon-action"]).toContain("enabled:active:border-accent");
    expect(shortcuts["danger-icon-action"]).toContain("enabled:focus:border-accent");
  });

  it("keeps link controls visually consistent with buttons", () => {
    expect(shortcuts["round-link-control"]).toContain("hover:[filter:var(--interactive-hover-filter)]");
    expect(shortcuts["round-link-control"]).toContain("active:border-accent");
    expect(shortcuts["round-link-control"]).toContain("active:shadow-control-glow");
  });

  it("keeps theme-aware brand coloring in reusable shortcuts", () => {
    expect(shortcuts["hero-logo"]).toContain("object-contain");
    expect(shortcuts["topbar-brand-mark"]).toContain("transition-[filter]");
    expect(shortcuts["brand-logo-light"]).toContain("filter-none");
    expect(shortcuts["brand-logo-dark"]).toContain("invert");
    expect(shortcuts["brand-logo-dark"]).toContain("hue-rotate-180");
  });
});

import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  base: "/FormulaM/",
  plugins: [UnoCSS(), svelte()],
  worker: {
    format: "es",
  },
});

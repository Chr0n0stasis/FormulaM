<script lang="ts">
  import type { AppStatus } from "../core/types";

  export let message = "";
  export let status: AppStatus = "idle";

  $: toneClass = status === "error" ? "text-danger" : status === "success" ? "text-success" : status === "running" || status === "loading" ? "text-info" : "text-muted";
</script>

{#if message}
  <section class={`my-3.5 rounded-2 border border-solid border-border bg-surface-2 px-3.5 py-3 ${toneClass}`} aria-live="polite">
    {message}
  </section>
{/if}

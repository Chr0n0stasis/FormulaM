<script lang="ts">
  import type { SearchFormState } from "../core/types";

  export let form: SearchFormState;
  export let disabled = false;
  export let onChange: (patch: Partial<SearchFormState>) => void;

  let ppmHelpDialog: HTMLDialogElement;

  function openPpmHelp(): void {
    ppmHelpDialog?.showModal();
  }
</script>

<section class="ui-card" aria-label="Search inputs">
  <h2 class="mt-0">Search inputs</h2>
  <div class="grid grid-cols-3 gap-4 lt-md:grid-cols-1">
    <label class="block">
      <span class="field-title">Observed m/z</span>
      <input
        class="field-control"
        type="text"
        inputmode="decimal"
        value={form.mz}
        disabled={disabled}
        on:input={(event) => onChange({ mz: (event.currentTarget as HTMLInputElement).value })}
      />
    </label>
    <label class="block">
      <span class="field-title">Explicit charge</span>
      <input
        class="field-control"
        type="text"
        value={form.charge}
        aria-describedby="chargeHelp"
        disabled={disabled}
        on:input={(event) => onChange({ charge: (event.currentTarget as HTMLInputElement).value })}
      />
      <small id="chargeHelp" class="field-hint">Examples: +1, 1+, +2, 2+, -1, 2-</small>
    </label>
    <div class="lt-md:hidden" aria-hidden="true"></div>
    <div class="block">
      <div class="mb-1.5">
        <div class="field-title m-0 flex items-center gap-1.25">
          <label for="tolerancePpm">Tolerance ppm</label>
          <button class="help-button" type="button" aria-label="Tolerance ppm help" on:click={openPpmHelp}>?</button>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <input
          id="tolerancePpm"
          class="field-control min-w-0 flex-1"
          type="text"
          inputmode="decimal"
          value={form.tolerancePpm}
          disabled={disabled || !form.tolerancePpmEnabled}
          on:input={(event) => onChange({ tolerancePpm: (event.currentTarget as HTMLInputElement).value })}
        />
        <label class:toggle-control-disabled={disabled} class="toggle-control shrink-0">
          <input
            class="toggle-input peer"
            type="checkbox"
            aria-label="Enable ppm tolerance"
            checked={form.tolerancePpmEnabled}
            disabled={disabled}
            on:change={(event) => onChange({ tolerancePpmEnabled: (event.currentTarget as HTMLInputElement).checked })}
          />
          <span class="toggle-track" aria-hidden="true"></span>
        </label>
      </div>
    </div>
    <div class="block">
      <div class="mb-1.5">
        <span class="field-title m-0">Tolerance Da</span>
      </div>
      <div class="flex items-center gap-3">
        <input
          id="toleranceDa"
          class="field-control min-w-0 flex-1"
          type="text"
          inputmode="decimal"
          value={form.toleranceDa}
          disabled={disabled || !form.toleranceDaEnabled}
          on:input={(event) => onChange({ toleranceDa: (event.currentTarget as HTMLInputElement).value })}
        />
        <label class:toggle-control-disabled={disabled} class="toggle-control shrink-0">
          <input
            class="toggle-input peer"
            type="checkbox"
            aria-label="Enable Da tolerance"
            checked={form.toleranceDaEnabled}
            disabled={disabled}
            on:change={(event) => onChange({ toleranceDaEnabled: (event.currentTarget as HTMLInputElement).checked })}
          />
          <span class="toggle-track" aria-hidden="true"></span>
        </label>
      </div>
    </div>
    <label class="block">
      <span class="field-title">Max results</span>
      <input
        class="field-control"
        type="number"
        min="1"
        max="5000"
        step="10"
        value={form.maxResults}
        disabled={disabled}
        on:input={(event) => onChange({ maxResults: Number((event.currentTarget as HTMLInputElement).value) })}
      />
    </label>
  </div>
  <dialog class="max-w-[520px] rounded-2 border border-solid border-border bg-surface p-4 text-text shadow-app" bind:this={ppmHelpDialog}>
    <form method="dialog" class="m-0">
      <h3 class="mt-0">Tolerance ppm</h3>
      <p><code class="inline-code">ppm error = (predicted_mz - observed_mz) / observed_mz * 1,000,000</code></p>
      <p>A formula is accepted if the absolute ppm error is within the selected tolerance.</p>
      <button class="secondary-action">Close</button>
    </form>
  </dialog>
</section>

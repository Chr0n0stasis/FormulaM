<script lang="ts">
  import type { FormulaHit } from "../core/types";

  export let results: FormulaHit[] = [];
</script>

<section class="ui-card">
  <h2 class="mt-0">Candidate formulas</h2>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse whitespace-nowrap tabular-nums">
      <thead>
        <tr>
          <th class="table-head">formula</th>
          <th class="table-head">ion_formula</th>
          <th class="table-head">charge</th>
          <th class="table-head">neutral_mass</th>
          <th class="table-head">predicted_mz</th>
          <th class="table-head">error_da</th>
          <th class="table-head">error_ppm</th>
        </tr>
      </thead>
      <tbody>
        {#each results as hit}
          <tr class="odd:bg-row">
            <td class="table-cell">{hit.formula}</td>
            <td class="table-cell">{hit.ion_formula}</td>
            <td class="table-cell">{hit.charge_state}</td>
            <td class="table-cell">{hit.mass}</td>
            <td class="table-cell">{hit.mz}</td>
            <td class="table-cell">{hit.error_da}</td>
            <td class="table-cell">{hit.error_ppm}</td>
          </tr>
        {:else}
          <tr>
            <td colspan="7" class="table-cell px-2 py-4.5 text-center text-muted">No candidate formulas matched the current search.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

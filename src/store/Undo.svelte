<script>
  import { undo } from "../store";
  import { fade } from "svelte/transition";
</script>

{#if $undo}
  <button
    transition:fade
    on:click={() => {
      $undo.action();
      $undo = null;
    }}>{$undo.text}</button>
{/if}

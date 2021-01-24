<script>
  import { announce } from "../store";
</script>

{#if $announce}
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          on:click|self={() => {
            $announce = null;
          }}
          class="absolute inset-0 bg-gray-500 opacity-75"
        />
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {#if $announce.component}
          <svelte:component
            this={$announce.component}
            on:select={$announce.onSelect}
          />
        {:else if $announce.text}
          {$announce.text}
        {/if}
      </div>
    </div>
  </div>
{/if}

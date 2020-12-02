<script>
  import Ship from "./ship/Ship.svelte";
  import { createEventDispatcher } from "svelte";
  export let selected = false;
  export let isRemovable = true;
  export let crewmate;
  const { shipType, theme } = crewmate;
  const dispatch = createEventDispatcher();

  const handleRemove = () => {
    // TODO: update so you can throw them overboard to kick out
    dispatch("remove");
  };
</script>

<span
  class="relative transition-all inline-flex items-center justify-center h-16 w-16 rounded-full"
  class:bg-yellow-500={selected}>
  {#if isRemovable}
    <span
      on:click={handleRemove}
      class="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-400 cursor-pointer" />
  {/if}
  <Ship {shipType} {theme} />
</span>

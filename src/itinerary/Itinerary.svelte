<script>
  import { voyage } from "./../store/index.js";
  import Map from "./Map.svelte";
  import { Collection } from "sveltefire";

  let excursionName = "Excursion Name";
  const addExcursion = () => {
    $voyage.collection("excursions").doc().set({ name: excursionName });
  };
</script>

<input bind:value={excursionName} />
<button on:click={addExcursion}>Create Excursion</button>

<Collection path={$voyage.collection("excursions")} let:data={excursions}>
  <Map {excursions} />
</Collection>

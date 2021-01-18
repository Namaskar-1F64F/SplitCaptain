<script>
  import { voyage } from "./../store/index.js";
  import Map from "./Map.svelte";
  import { Collection } from "sveltefire";

  export const addExcursion = () => {
    $voyage.collection("excursions").doc().set({ name: "test" });
  };
</script>

<Collection path={$voyage.collection("excursions")} let:data={excursions}>
  <Map {excursions} />
</Collection>
<button on:click={addExcursion}>New Excursion</button>

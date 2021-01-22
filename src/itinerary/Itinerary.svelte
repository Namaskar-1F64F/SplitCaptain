<script>
  import { voyage } from "./../store/index.js";
  import Map from "./Map.svelte";
  import { Collection } from "sveltefire";
  import { push, link } from "svelte-spa-router";

  let excursionName = "";
  // Create a new excursion and push the boat off
  const addExcursion = () => {
    const newDoc = $voyage.collection("excursions").doc();
    newDoc.set({ name: excursionName }).then(() => {
      push(`/voyages/${$voyage.id}/excursions/${newDoc.id}`);
    });
  };
</script>

<a use:link href={`/voyages/${$voyage.id}`}>Back to bridge</a>
<div />
<input bind:value={excursionName} placeholder="Excursion Name" />
<button on:click={addExcursion}>Create Excursion</button>

<Collection path={$voyage.collection("excursions")} let:data={excursions}>
  <Map {excursions} />
</Collection>

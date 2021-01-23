<script>
  import { firebase } from "firebase/app";
  import Map from "./Map.svelte";
  import { Collection } from "sveltefire";
  import { push, link } from "svelte-spa-router";

  export let voyageId;
  let excursionName = "";
  // Create a new excursion and push the boat off
  const addExcursion = () => {
    const newDoc = firebase.collection(`voyages/${voyageId}/excursions`).doc();
    newDoc.set({ name: excursionName }).then(() => {
      push(`/voyages/${voyageId}/excursions/${newDoc.id}`);
    });
  };
</script>

<a use:link href={`/voyages/${voyageId}`}>Back to bridge</a>
<div />
<input bind:value={excursionName} placeholder="Excursion Name" />
<button on:click={addExcursion}>Create Excursion</button>

<Collection path={`/voyages/${voyageId}/excursions`} let:data={excursions}>
  <Map {excursions} {voyageId} />
</Collection>

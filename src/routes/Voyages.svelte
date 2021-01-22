<script>
  import { Collection, User } from "sveltefire";
  import { db } from "../firebase";
  import { link } from "svelte-spa-router";

  const addVoyage = () => {
    db.collection("voyages").doc().set({ name: voyageName });
  };
  let voyageName = "";
</script>

<a use:link href={`/`}>Back to harbor</a>

<User let:user={mariner}>
  <div
    class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col align-center"
  >
    <Collection path={db.collection("voyages")} let:data={voyages}>
      <ul>
        {#each voyages as voyage}
          <li>
            <a href={`/voyages/${voyage.id}`} use:link>{voyage.name}</a>
          </li>
        {/each}
      </ul>

      <div class="flex">
        <input placeholder="Voyage Name" bind:value={voyageName} />
        <button on:click={addVoyage}>Create Voyage</button>
      </div>
    </Collection>
  </div>
</User>

<script>
  import { Collection, User } from "sveltefire";
  import ShareUrl from "../ShareUrl.svelte";
  import AvatarSelect from "../AvatarSelect.svelte";
  import { db } from "../firebase";
  import { voyage } from "../store";
  import { link } from "svelte-spa-router";

  export let params = {};
  $voyage = db.doc(`/voyages/${params.voyageId}`);

  export const addExcursion = () => {
    $voyage.collection("excursions").doc().set({ name: "test" });
  };
</script>

<User let:user={mariner}>
  <div class="container">
    <span class="text-4xl">Invite Your Crew</span>
    <ShareUrl />
    <span class="text-4xl">Welcome Your Crew</span>
    <AvatarSelect id={mariner.id} />
    <Collection path={$voyage.collection("excursions")} let:data={excursions}>
      <button on:click={addExcursion}>New Excursion</button>
      <ul>
        {#each excursions as excursion}
          <li />
          <li>
            <a
              href={`/voyages/${$voyage.id}/excursions/${excursion.id}`}
              use:link>{excursion.id}</a
            >
          </li>
        {/each}
      </ul>
    </Collection>
  </div>
</User>

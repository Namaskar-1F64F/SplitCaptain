<script>
  import { Collection } from "sveltefire";

  import { db } from "../firebase";
  import { voyage } from "../store";
  export let params = {};
  $voyage = db.doc(`/voyages/${params.voyageId}`);
</script>

<div class="container">
  <Collection path={$voyage.collection("excursions")} let:data={excursions}>
    <!-- this only loops through documents that have properties. Documents that contain other collections
    are not showing up here. WHY? we need a way to get the IDs for the excursions so people can click
    on them and we can push them to the route -->
    {#each excursions as excursion}
      {excursion.paid}
    {/each}
  </Collection>
</div>

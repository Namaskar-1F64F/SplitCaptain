<script>
  import { link } from "svelte-spa-router";
  import { db } from "../firebase";
  import ShareUrl from "../ShareUrl.svelte";
  import { voyage } from "../store";
  export let params = {};

  $voyage = db.collection("voyages").doc(params.voyageId);
</script>

<a use:link href={`/voyages`}>Back to voyages</a>

<div class="text-4xl">Bridge</div>
<a use:link href={`/voyages/${$voyage.id}/management`}>Manage</a>
<a use:link href={`/voyages/${$voyage.id}/itinerary`}>Itinerary</a>

<script>
  import { link } from "svelte-spa-router";
  export let params = {};
</script>

<a use:link href={`/voyages`}>Back to voyages</a>

<div class="text-4xl">Bridge</div>
<a use:link href={`/voyages/${params.voyageId}/management`}>Manage</a>
<a use:link href={`/voyages/${params.voyageId}/itinerary`}>Itinerary</a>

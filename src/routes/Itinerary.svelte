<script>
  import Itinerary from "../itinerary/Itinerary.svelte";
  export let params = {};
</script>

<Itinerary voyageId={params.voyageId} />



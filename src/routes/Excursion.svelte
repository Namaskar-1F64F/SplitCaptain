<script>
  import Excursion from "../excursion/Excursion.svelte";

  export let params = {};
</script>

<div class="container">
  <Excursion voyageId={params.voyageId} excursionId={params.excursionId} />
</div>

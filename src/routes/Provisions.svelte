<script>
  import Excursion from "../excursion/Excursion.svelte";
  import { db } from "../firebase";
  import { excursion, voyage } from "../store";
  export let params = {};
  $voyage = db.collection("voyages").doc(params.voyageId);
  $excursion = db.doc(
    `/voyages/${params.voyageId}/excursions/${params.excursionId}`
  );
</script>

<div class="container">
  <Excursion />
</div>

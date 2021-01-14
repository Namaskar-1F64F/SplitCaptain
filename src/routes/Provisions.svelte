<script>
  import Excursion from "../excursion/Excursion.svelte";
  import { db } from "../firebase";
  import { excursion, voyage } from "../store";
  export let params = {};
  $voyage = db.collection("voyages").doc("n3jonjH3ldmsK7S4vANf");
  $excursion = db.doc(
    `/voyages/${params.voyageId}/excursions/${params.excursionId}`
  );
</script>

<div class="container">
  <Excursion />
</div>

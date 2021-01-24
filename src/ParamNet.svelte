<script>
  import { db } from "./firebase";
  import { voyage, excursion } from "./store";
  export let params = {};

  $voyage = db.collection("voyages").doc(params.voyageId);
console.log(params.voyageId);
console.log($voyage.id);
  if (params.excursionId) {
    $excursion = db.doc(
      `/voyages/${$voyage.id}/excursions/${params.excursionId}`
    );
  }
</script>

<slot />

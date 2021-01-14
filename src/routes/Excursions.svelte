<script>
  import { db } from "../firebase";
  import { voyage } from "../store";
  export let params = {};
  $voyage = db.collection("voyages").doc(params.voyageId);
</script>

<div class="container">
  Show all excusions for {$voyage.id}
</div>

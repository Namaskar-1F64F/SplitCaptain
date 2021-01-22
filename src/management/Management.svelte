<script>
  import { link } from "svelte-spa-router";
  import AvatarSelect from "../AvatarSelect.svelte";
  import { db } from "../firebase";

  import ShareUrl from "../ShareUrl.svelte";
  import { voyage } from "../store";

  export let params = {};

  $voyage = db.collection("voyages").doc(params.voyageId);
</script>

<a use:link href={`/voyages/${$voyage.id}`}>Back to bridge</a>

<div class="text-4xl">Management</div>
<ShareUrl />
<AvatarSelect />

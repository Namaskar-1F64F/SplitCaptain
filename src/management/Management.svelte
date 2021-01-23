<script>
  import { link } from "svelte-spa-router";
  import AvatarSelect from "../AvatarSelect.svelte";

  import ShareUrl from "../ShareUrl.svelte";
  export let params = {};
</script>

<a use:link href={`/voyages/${params.voyageId}`}>Back to bridge</a>

<div class="text-4xl">Management</div>
<ShareUrl voyageId={params.voyageId} />
<AvatarSelect voyageId={params.voyageId} />

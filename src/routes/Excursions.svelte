<script>
  import { User } from "sveltefire";
  import ShareUrl from "../ShareUrl.svelte";
  import AvatarSelect from "../AvatarSelect.svelte";
  import { db } from "../firebase";
  import { voyage } from "../store";
  import Excursions from "../itinerary/Itinerary.svelte";

  export let params = {};
  $voyage = db.doc(`/voyages/${params.voyageId}`);
</script>

<User let:user={mariner}>
  <div class="container">
    <span class="text-4xl">Invite Your Crew</span>
    <ShareUrl />
    <span class="text-4xl">Welcome Your Crew</span>
    <AvatarSelect id={mariner.id} />
    <Excursions />
  </div>
</User>

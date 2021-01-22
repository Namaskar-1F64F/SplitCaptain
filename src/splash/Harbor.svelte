<script>
  import Profile from "../profile/Profile.svelte";
  import { User, Doc } from "sveltefire";
  import { link } from "svelte-spa-router";
</script>

<User let:user={mariner}>
  <Doc path={`/mariners/${mariner.uid}`} let:data let:ref>
    Ahoy, {data.name}
  </Doc>
  <div
    class="text-center container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col align-center"
  >
    <div class="p-10 content-center w-full">
      <Profile id={mariner.uid} />
    </div>
  </div>
  <h1>Friends</h1>
  <h1><a use:link href="/voyages">Voyages</a></h1>
  <h1>Analytics</h1>
</User>

<script>
  import ShareUrl from "../ShareUrl.svelte";
  import AvatarSelect from "../AvatarSelect.svelte";
  import Profile from "../profile/Profile.svelte";
  import { User } from "sveltefire";
</script>

<User let:user={mariner}>
  <div
    class="text-center container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col align-center"
  >
    <span class="text-4xl">Name Your Ship</span>
    <div class="p-10 content-center w-full">
      <Profile uid={mariner.uid} />
    </div>
    <span class="text-4xl">Invite Your Crew</span>
    <ShareUrl />
    <span class="text-4xl">Welcome Your Crew</span>
    <AvatarSelect uid={mariner.uid} />
  </div>
</User>

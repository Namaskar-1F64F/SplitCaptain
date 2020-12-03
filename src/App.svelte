<script>
  import { FirebaseApp, User } from "sveltefire";
  import { firebase } from "./firebase";
  import ShareUrl from "./ShareUrl.svelte";
  import AvatarSelect from "./AvatarSelect.svelte";
  import Profile from "./profile/Profile.svelte";
  import Provisions from "./provision/Provisions.svelte";
  import Undo from "./store/Undo.svelte";
  import Announcement from "./store/Announcement.svelte";
</script>

<svelte:head>
  <style>
    @import url("https://use.typekit.net/zkf6wmv.css");
    .body {
      background-color: #24aae1;
      font-family: "chippewa-falls";
    }
  </style>
</svelte:head>

<svelte:body />
<FirebaseApp {firebase}>
  <User let:user={mariner}>
    <div class="body">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-4xl">Crew</span>
        <AvatarSelect uid={mariner.uid} />
        <span class="text-4xl">Provisions</span>
        <Provisions />
        <span class="text-4xl">Name Tag</span>
        <Profile uid={mariner.uid} />
        <span class="text-4xl">Ticket</span>
        <ShareUrl />
      </div>
      <Undo />
      <Announcement />
    </div>
  </User>
</FirebaseApp>

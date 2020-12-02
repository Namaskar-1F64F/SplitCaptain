<script>
  import { FirebaseApp } from "sveltefire";
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
    * {
      font-family: "chippewa-falls";
    }
  </style>
</svelte:head>
<FirebaseApp {firebase}>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <AvatarSelect />
    <ShareUrl />
    <div>
      <Provisions />
    </div>
    <Profile />
  </div>
  <Undo />
  <Announcement />
</FirebaseApp>

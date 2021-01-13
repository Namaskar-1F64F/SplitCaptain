<script>
  import { FirebaseApp, User } from "sveltefire";
  import { firebase } from "./firebase";
  import ShareUrl from "./ShareUrl.svelte";
  import AvatarSelect from "./AvatarSelect.svelte";
  import Profile from "./profile/Profile.svelte";
  import Provisions from "./provision/Provisions.svelte";
  import Excursion from "./excursion/Excursion.svelte";

  import Undo from "./store/Undo.svelte";
  import Announcement from "./store/Announcement.svelte";
  import Badge from "./Badge.svelte";
</script>

<style>
  :global([contenteditable][placeholder]:empty::before) {
    content: attr(placeholder);
    color: gray;
  }
</style>

<svelte:head>
  <style>
    @font-face {
      font-family: "Chippewa Falls";
      src: url("/fonts/Chippewa-Falls-Regular.woff2") format("woff2"),
        url("/fonts/Chippewa-Falls-Regular.woff") format("woff");
    }
    .body {
      background-color: #24aae1;
      font-family: "Chippewa Falls";
    }
  </style>
</svelte:head>
<svelte:body />
<FirebaseApp {firebase}>
  <User let:user={mariner}>
    <div class="body">
      <div
        class="text-center container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col align-center">
        <div class='container'> <Excursion/> 

      </div>
       

        <span class="text-4xl">Name Your Ship</span>
        <div class="p-10 content-center w-full">
          <Profile uid={mariner.uid} />
        </div>
        <span class="text-4xl">Invite Your Crew</span>
        <ShareUrl />
        <span class="text-4xl">Welcome Your Crew</span>
        <AvatarSelect uid={mariner.uid} />
        
      </div>
      <Undo />
      <Announcement />
      <Badge />
    </div>
  </User>
</FirebaseApp>

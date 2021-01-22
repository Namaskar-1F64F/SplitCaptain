<script>
  import { FirebaseApp, User } from "sveltefire";
  import { firebase } from "./firebase";

  import Undo from "./store/Undo.svelte";
  import Announcement from "./store/Announcement.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<svelte:head
  ><style>
    @font-face {
      font-family: "Chippewa Falls";
      src: url("/fonts/Chippewa-Falls-Regular.woff2") format("woff2"),
        url("/fonts/Chippewa-Falls-Regular.woff") format("woff");
    }
    body {
      min-height: 100vh;
      min-width: 100vw;
      background-color: #24aae1;
      font-family: "Chippewa Falls";
    }
  </style></svelte:head
>
<svelte:body />
<FirebaseApp {firebase}>
  <div class="body">
    <Router {routes} />
  </div>
  <Undo />
  <Announcement />
</FirebaseApp>

<style>
  :global([contenteditable][placeholder]:empty::before) {
    content: attr(placeholder);
    color: gray;
  }
</style>

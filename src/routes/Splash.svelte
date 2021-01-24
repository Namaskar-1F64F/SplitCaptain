<script>
  import { link } from "svelte-spa-router";
  import { User } from "sveltefire";
  import Harbor from "../splash/Harbor.svelte";
</script>

<User let:user={mariner}>
  <Harbor />
  <div slot="signed-out">
    <div class="flex mt-16 flex-col align-middle text-center">
      <p class="text-4xl text-white mb-4">Split Captain</p>

      <div class="flex items-center justify-center">
        <img class="h-16" src="./icon-144x144.png" alt="Split Captain" />
      </div>
      <div
        class="text-white text-xl ml-auto text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <p class="my-4">
          Start creating long-running ledgers between you and your crew. Set off
          on voyages inviting different groups of crewmates. When you add an
          excursion, easily split the bill, and track expenses based on what
          each crew member owes. Keep the tabs between your crew open, or settle
          debt at any time.
        </p>
        <a
          use:link
          href={"/login"}
          class="text-blue-900 hover:text-blue-700 transition-all text-4xl"
          >Welcome Aboard, Captain</a
        >
        <p class="m-4">⚓️</p>
      </div>
    </div>
  </div>
</User>

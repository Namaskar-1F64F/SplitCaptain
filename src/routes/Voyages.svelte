<script>
  import Profile from "../profile/Profile.svelte";
  import { Collection, User } from "sveltefire";
  import { db } from "../firebase";
  import {link} from 'svelte-spa-router'
</script>

<User let:user={mariner}>
  <div
    class="text-center container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col align-center"
  >
    <span class="text-4xl">Name Your Ship</span>
    <div class="p-10 content-center w-full">
      <Profile uid={mariner.uid} />
    </div>
    <Collection path={db.collection("voyages")} let:data={voyages}>
      <ul>
        {#each voyages as voyage}
          <li>
            <a href={`/voyages/${voyage.id}`} use:link>{voyage.id}</a>
          </li>
        {/each}
      </ul>
    </Collection>
  </div>
</User>

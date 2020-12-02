<script>
  import { voyage, selected, undo } from "./store";
  import { Collection, User } from "sveltefire";
  import Avatar from "./Avatar.svelte";
  const handleRemove = (crewmate, ref) => {
    crewmate.ref.delete();
    $undo = {
      action: () => ref.add(crewmate),
      text: `Hoist ${crewmate?.name} back aboard?`,
    };
  };
</script>

<style>
  input {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
  }
  label {
    cursor: pointer;
  }
</style>

<User let:user>
  <Collection path={`/voyage/${$voyage.id}/crewmate`} let:data let:ref>
    {#each data as crewmate}
      <label>
        <Avatar
          isRemovable={user.uid != crewmate.uid}
          {crewmate}
          selected={crewmate == $selected}
          on:remove={() => handleRemove(crewmate, ref)} />
        <input type="radio" value={crewmate} bind:group={$selected} />
      </label>
    {/each}
  </Collection>
</User>

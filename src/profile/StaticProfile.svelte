<script>
  import Ship from "../ship/Ship.svelte";
  import StaticTag from "./StaticTag.svelte";
  export let crewmate;
  export let selected;
  const { name, theme, shipType } = crewmate;
</script>


<div class="w-32" class:selected>
  <StaticTag {selected} text={name}>
    <Ship {theme} {shipType} />
  </StaticTag>
</div>

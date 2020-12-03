<script>
  import Ship from "../ship/Ship.svelte";
  import StaticTag from "./StaticTag.svelte";
  export let crewmate;
  const { name, theme, shipType } = crewmate;
</script>

<div class="w-32">
  <StaticTag text={name}>
    <Ship {theme} {shipType} />
  </StaticTag>
</div>

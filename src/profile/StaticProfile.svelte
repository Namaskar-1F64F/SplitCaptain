<script>
  import Ship from "../ship/Ship.svelte";
  import StaticTag from "./StaticTag.svelte";
  import { Doc } from "sveltefire";
  export let crewmate;
  export let selected = false;
  const { id, name } = crewmate;
</script>

<div class="w-32" class:selected>
  <StaticTag {selected} text={name}>
    <Doc path={`/mariners/${id}`} let:data let:ref>
      <Ship slot="fallback" theme={undefined} shipType={undefined}/>
      <Ship theme={data.theme} shipType={data.shipType} />
    </Doc>
  </StaticTag>
</div>

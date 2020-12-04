<script>
  import { Doc } from "sveltefire";
  import { voyage } from "./store";
</script>

<Doc path={$voyage} let:data let:ref>
  {#each ['tip', 'tax', 'fees'] as name (name)}
    <label for={name}>{name}</label>
    <input
      id={name}
      value={data?.[name]}
      on:change={({ target: { value } }) => {
        ref.update({ [name]: value });
      }} />
  {/each}
</Doc>

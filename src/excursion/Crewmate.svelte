<script>
  export let name;
  export let checked;
</script>

<div class="inline-block">
  <label for="description" class="block text-sm font-medium text-gray-700"
    >{name}</label
  >
  <div class="mt-1">
    <input {checked} on:change type="checkbox" name="checkbox" id={`${name}`} />
  </div>
</div>

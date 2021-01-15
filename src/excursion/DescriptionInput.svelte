<script>
  export let value;
  export let title;
  export let ref;
  export let field;
  export let id;
</script>

<div>
  <label for="description" class="block text-sm font-medium text-gray-700"
    >{title}</label
  >
  <div class="mt-1">
    <input
      value={value || ""}
      on:change={({ target: { value } }) => {
        ref.update({ [field]: value });
      }}
      type="text"
      name="description"
      id={`description-${id}`}
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder="What was the item?"
    />
  </div>
</div>

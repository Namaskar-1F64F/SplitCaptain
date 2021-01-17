<script>
  export let value = "",
    placeholder = "What was the item?",
    title,
    ref,
    field,
    id;
</script>

<div>
  <label for={field} class="block text-sm font-medium text-gray-700"
    >{title}</label
  >
  <div class="mt-1">
    <input
      {value}
      on:change={({ target: { value } }) => {
        ref.update({ [field]: value });
      }}
      type="text"
      name={field}
      id={`${field}-${id}`}
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      {placeholder}
    />
  </div>
</div>

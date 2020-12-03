<script>
  export let ref;
  let description, price;
  const handleSubmit = () => {
    ref.add({ description, price });
  };
</script>

<div class="bg-gray-400 rounded-xl p-5 w-64 flex flex-col">
  <label for="description">Description<input
      id="description"
      type="text"
      bind:value={description} /></label>
  <label for="price">Price
    <div /><input type="text" id="price" bind:value={price} />
  </label>
  <button
    on:click={handleSubmit}
    class="border-gray-400 rounded-lg border-solid border-2 w-32">Bring Aboard</button>
</div>

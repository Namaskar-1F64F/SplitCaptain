<script>
  export let ref;
  let description, price;
  const handleSubmit = () => {
    ref.add({ description, price });
  };
</script>

<label for="description">Description:<input
    id="description"
    bind:value={description} /></label>
<label for="price">Price:<input
    type="number"
    id="price"
    bind:value={price} /></label>
<button on:click={handleSubmit}>Submit</button>

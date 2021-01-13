<script>
  import { excursion } from "../store";
  import { Collection } from "sveltefire";
  const addToArray = (provisionRef) => {
    provisionRef.add({});
  };

  const deleteFromArray = (provisionRef, id) => {
    provisionRef
      .doc(id)
      .delete()
      .then((r) => console.log(r));
  };
</script>

<div>
  <Collection
    path={$excursion.collection('provisions')}
    let:data={excursionsData}
    let:ref>
    <form on:submit|preventDefault={() => addToArray(ref)}>
      <ul class="divide-y divide-gray-200">
        {#each excursionsData as item}
          <li class="px-4 py-4 sm:px-6">
            <div>
              <label
                for="price"
                class="block text-sm font-medium text-gray-700">Price</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm"> $ </span>
                </div>
                <input
                  value={item.price || ''}
                  on:change={({ target: { value } }) => {
                    ref.doc(item.id).update({ price: value });
                  }}
                  type="text"
                  name="price"
                  id={`price-${item.id}`}
                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00" />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label for="currency" class="sr-only">Currency</label>
                  <select
                    value={item.currency}
                    on:blur={({ target: { value } }) => {
                      ref.doc(item.id).update({ currency: value });
                    }}
                    id={`currency-${item.id}`}
                    name="currency"
                    class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option>USD</option>
                    <option>MX</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                  <input
                    value={item.description || ''}
                    on:change={({ target: { value } }) => {
                      ref.doc(item.id).update({ description: value });
                    }}
                    type="text"
                    name="description"
                    id={`description-${item.id}`}
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Yarg " />
                </div>
              </div>
            </div>

            <div class="inline-block">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700">Kyle</label>
              <div class="mt-1">
                <input
                  bind:value={item.price}
                  type="checkbox"
                  name="checkbox"
                  id={`person-${item.id}`} />
              </div>
            </div>
            <div
              class=" bg-red-600"
              on:click={() => deleteFromArray(ref, item.id)}>
              Delete Provision
            </div>
          </li>
        {/each}
      </ul>
      <button type="submit" />
    </form>
    <div class=" bg-green-400" on:click={() => addToArray(ref)}>
      Add provision
    </div>
  </Collection>
</div>

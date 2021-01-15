<script>
  import { excursion, voyage } from "../store";
  import Crewmate from "./Crewmate.svelte";
  import { Collection } from "sveltefire";
  import DescriptionInput from "./DescriptionInput.svelte";
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
    path={$voyage.collection("crewmates")}
    let:data={crewmates}
    let:ref={crewmatesRef}
  >
    <Collection
      path={$excursion.collection("provisions")}
      let:data={provisions}
      let:ref={excursionRef}
    >
      {`Total bill: ${provisions.reduce(
        (a, b) => parseInt(a.price) + parseInt(b.price, 0)
      )}`}
      <form on:submit|preventDefault={() => addToArray(excursionRef)}>
        Who Paid ?
        {#each crewmates as { name, id } (id)}
          <Crewmate {name} />
        {/each}
        <ul class="divide-y divide-gray-200">
          {#each provisions as { price, id, currency, description } (id)}
            <li class="px-4 py-4 sm:px-6">
              <div>
                <label
                  for="price"
                  class="block text-sm font-medium text-gray-700">Price</label
                >
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 sm:text-sm"> $ </span>
                  </div>
                  <input
                    value={price || ""}
                    on:change={({ target: { value } }) => {
                      excursionRef.doc(id).update({ price: value });
                    }}
                    type="text"
                    name="price"
                    id={`price-${id}`}
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <label for="currency" class="sr-only">Currency</label>
                    <select
                      value={currency}
                      on:blur={({ target: { value } }) => {
                        excursionRef.doc(id).update({ currency: value });
                      }}
                      id={`currency-${id}`}
                      name="currency"
                      class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                      <option>USD</option>
                      <option>MX</option>
                    </select>
                  </div>
                </div>

                <DescriptionInput
                  title="Description"
                  field="description"
                  value={description}
                  ref={excursionRef.doc(id)}
                />

                {#each crewmates as crewmate}
                  <Crewmate name={crewmate.name} />
                {/each}
                <button
                  class=" bg-red-600"
                  on:click={() => deleteFromArray(excursionRef, id)}>
                  Delete Provision
                </button>
              </div>
            </li>
          {/each}
        </ul>
        <button type="submit" />
      </form>
      <button class=" bg-green-600" on:click={() => addToArray(excursionRef)}>
        Add provision
      </button>
    </Collection>
  </Collection>
</div>

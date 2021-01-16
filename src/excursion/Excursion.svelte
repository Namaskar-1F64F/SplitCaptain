<script>
  import { excursion, voyage } from "../store";
  import Crewmate from "./Crewmate.svelte";
  import { Collection, Doc } from "sveltefire";
  import TextInput from "./TextInput.svelte";
  const addToArray = (ref) => {
    ref.add({});
  };

  const deleteFromArray = (ref) => {
    ref.delete();
  };

  const reduceProvisions = (provisions) =>
    provisions.reduce((a, b) => parseInt(a.price) + parseInt(b.price), {
      price: 0,
    });

  const updateCrewmatePaid = (ref, checked) => ref.set({ checked });
</script>

<Collection path={$voyage.collection("crewmates")} let:data={crewmates}>
  <Collection
    path={$excursion.collection("provisions")}
    let:data={provisions}
    let:ref={provisionsRef}
  >
    {`Total bill: ${reduceProvisions(provisions)}`}
    <Doc path={$excursion} let:data={excursion} let:ref={excursionRef}>
      <TextInput
        title="Excursion Name"
        field="name"
        value={excursion.name}
        ref={excursionRef}
      />
      Who Paid ?

      <Collection
        path={excursionRef.collection("paid")}
        let:data={paid}
        let:ref={paidRef}
      >
        {#each crewmates as { name, id } (id)}
          <Crewmate
            on:change={(value) =>
              updateCrewmatePaid(paidRef.doc(id), value.target.checked)}
            checked={paid.find((p) => p.id === id)?.checked}
            {name}
          />
        {/each}
      </Collection>
    </Doc>

    <ul class="divide-y divide-gray-200">
      {#each provisions as { price, id, currency, description } (id)}
        <li class="px-4 py-4 sm:px-6">
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700"
              >Price</label
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
                  provisionsRef.doc(id).update({ price: value });
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
                    provisionsRef.doc(id).update({ currency: value });
                  }}
                  id={`currency-${id}`}
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                  <option>USD</option>
                  <option>MX</option>
                </select>
              </div>
            </div>

            <TextInput
              title="Trip"
              field="description"
              value={description}
              ref={provisionsRef.doc(id)}
            />
            <Collection
              path={provisionsRef.doc(id).collection("paid")}
              let:data={paidData}
              let:ref={paidRef}
            >
              {#each crewmates as crewmate (crewmate)}
                <Crewmate
                  checked={paidData.find((p) => p.id === crewmate.id)?.checked}
                  name={crewmate.name}
                  on:change={(value) =>
                    updateCrewmatePaid(
                      paidRef.doc(crewmate.id),
                      value.target.checked
                    )}
                />
              {/each}
            </Collection>
            <button
              class=" bg-red-600"
              on:click={() => deleteFromArray(provisionsRef.doc(id))}>
              Delete Provision
            </button>
          </div>
        </li>
      {/each}
    </ul>
    <button type="submit" />
    <button class=" bg-green-600" on:click={() => addToArray(provisionsRef)}>
      Add provision
    </button>
  </Collection>
</Collection>

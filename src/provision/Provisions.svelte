<script>
  import { firebase } from "../firebase.js";
  import { voyage, selected, undo } from "../store";
  import { Doc, Collection } from "sveltefire";
  import Provision from "./Provision.svelte";
  const handleSelect = ({ id }, provisionRef, remove) => {
    if (!$selected) return;
    provisionRef.doc(id).update({
      crewmate: remove
        ? firebase.firestore.FieldValue.arrayRemove($selected.id)
        : firebase.firestore.FieldValue.arrayUnion($selected.id),
    });
  };

  const handleAdd = (provision, provisionRef) => {
    const { price, description } = provision;
    provisionRef.add({
      price,
      description,
    });
    provision = null;
  };

  const handleEdit = (provision, provisionRef, {id}) => {
    const { price, description } = provision;
    provisionRef.doc(id).update({
      price,
      description,
    });
    provision = null;
  };

  const handleRemove = ({ id, description, price }, provisionRef) => {
    const docRef = provisionRef.doc(id);
    docRef.get().then((doc) => {
      $undo = {
        action: () => provisionRef.add(doc.data()),
        text: `Fetch back the $${price} ${description} provision?`,
      };
      docRef.delete();
    });
  };

  const sumProvisions = (provisions) =>
    provisions.reduce(
      (accumulator, { price }) => parseFloat(accumulator) + parseFloat(price),
      0
    );

  const sumPeople = (provisions) => {
    return provisions.reduce((acc, { price, crewmate }) => {
      if (crewmate) {
        crewmate.forEach((name) => {
          if (!acc[name]) acc[name] = 0;
          acc[name] += parseInt(price) / crewmate.length;
        });
      }
      return acc;
    }, {});
  };
  $: emptyProvision = {};
</script>

<Doc path={$voyage} let:data={voyageData}>
  <Collection
    path={`/voyages/${$voyage.id}/provisions`}
    let:data={provisionsData}
    let:ref>
    <div
      class="grid grid-cols-1 gap-64 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
      {#each provisionsData as provision (provision)}
        <Provision
          {provision}
          on:edit={({ detail }) => handleEdit(detail, ref, provision.ref)}
          on:select={({ detail: { remove } }) => handleSelect(provision, ref, remove)}
          on:remove={() => handleRemove(provision, ref)} />
      {/each}

      <Provision
        on:add={({ detail }) => handleAdd(detail, ref)}
        on:select={({ detail: { remove } }) => handleSelect(emptyProvision, ref, remove)}
        on:remove={() => handleRemove(emptyProvision, ref)} />
    </div>
  </Collection>
</Doc>

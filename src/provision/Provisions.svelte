<!--<script>
  import { firebase } from "../firebase.js";
  import { voyage, selected, undo } from "../store";
  import { Doc, Collection } from "sveltefire";
  import Provision from "./Provision.svelte";
  import ProvisionInput from "./ProvisionInput.svelte";
  import Fees from "../Fees.svelte";

  const handleSelect = ({ id }, provisionRef, remove) => {
    if (!$selected?.name) return;
    provisionRef.doc(id).update({
      crewmate: remove
        ? firebase.firestore.FieldValue.arrayRemove($selected.name)
        : firebase.firestore.FieldValue.arrayUnion($selected.name),
    });
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
</script><Doc path={$voyage} let:data={voyageData}>
  <Collection
    path={`/voyage/${$voyage.id}/provision`}
    let:data={provisionsData}
    let:ref>
    <div class="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
      {#each provisionsData as provision (provision)}
        <Provision
          {provision}
          on:select={({ detail: { remove } }) => handleSelect(provision, ref, remove)}
          on:remove={() => handleRemove(provision, ref)} />
      {/each}
    </div>
    <div>
      <ProvisionInput {ref} />
    </div>
    <div>
      People
      {#each Object.entries(sumPeople(provisionsData)) as [name, total]}
        <div>{name}: ${total}</div>
      {/each}
    </div>
    <div>
      Total ${sumProvisions(provisionsData) + parseInt(voyageData.tip) + parseInt(voyageData.tax) + parseInt(voyageData.fees)}
    </div>
  </Collection>
</Doc> -->

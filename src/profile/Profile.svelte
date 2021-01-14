<script>
  import ShipSelect from "../ship/ShipSelect.svelte";
  import { voyage, announce } from "../store";
  import { Doc } from "sveltefire";
  import Tag from "./Tag.svelte";
  import Ship from "../ship/Ship.svelte";
  import Venmo from "./Venmo.svelte";

  export let uid;
  let focused;
</script>

<style>
  .name {
    background-color: #fecc96;
    width: 85%;
    position: absolute;
    left: 6%;
    text-align: center;
    top: 63%;
  }
  .providers {
    position: absolute;
    bottom: 3%;
    height: 21%;
    width: 67%;
    left: 26%;
  }
  .provider {
    background-color: #fecc96;
    width: 90%;
    text-align: left;
    outline: none;
  }
  .venmo {
    color: #3d95ce;
    font-size: 20px;
    line-height: 23px;
  }
  .logo {
    margin-top: -20px;
    pointer-events: none;
  }
  .focused {
    transform: translateY(18px) translateX(4px);
  }
</style>

<div class="top-0 right-0 flex">
  <Doc path={`/mariners/${uid}`} let:data let:ref>
    <div class="relative w-36">
      <Tag>
        <Ship
          on:click={() => {
            $announce = { component: ShipSelect, onSelect: ({ detail: { shipType, theme } }) => {
                ref.update({ theme, shipType });
                $voyage
                  .collection('crewmates')
                  .doc(uid)
                  .update({ shipType, theme });
              } };
          }}
          theme={data.theme}
          shipType={data.shipType} />
      </Tag>
      <input
        autocorrect="off"
        autocomplete="off"
        class="name outline-none"
        value={data?.name}
        on:change={({ target: { value } }) => {
          $voyage.collection('crewmates').doc(uid).update({ name: value });
          ref.update({ name: value });
        }} />
      <div class="providers">
        <div>
          <span class="absolute venmo -left-4">@</span>
          <input
            on:focus={() => {
              focused = true;
            }}
            on:blur={({ target: { value } }) => {
              if (!value) {
                focused = false;
              }
            }}
            autocorrect="off"
            autocomplete="off"
            class="provider appearance-none text-sm"
            placeholder={data?.venmo}
            on:change={({ target: { value } }) => {
              $voyage.collection('crewmates').doc(uid).update({ venmo: value });
              ref.update({ venmo: value });
            }} />
        </div>
        <div
          class:focused={focused || data?.venmo}
          class="logo transition-all w-full">
          <Venmo />
        </div>
      </div>
    </div>
  </Doc>
</div>

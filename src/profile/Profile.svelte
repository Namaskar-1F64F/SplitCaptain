<script>
  import ShipSelect from "../Ship/ShipSelect.svelte";
  import { voyage, announce } from "../store";
  import { User, Doc } from "sveltefire";
  import Tag from "./Tag.svelte";
  import Ship from "../Ship/Ship.svelte";
  import Venmo from "./Venmo.svelte";

  let focused;
</script>

<style>
  .name {
    background-color: #fecc96;
    width: 87%;
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
  .focused {
    transform: translateY(-5px);
  }
</style>

<User let:user>
  <div class="flex">
    <Doc path={`/mariner/${user.uid}`} let:data let:ref>
      <div class="relative h-64">
        <Tag>
          <Ship
            on:click={() => {
              $announce = { component: ShipSelect, onSelect: ({ detail: { shipType, theme } }) => {
                  ref.update({ shipType, theme });
                  $voyage
                    .collection('crewmate')
                    .doc(user.uid)
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
          value={data.name}
          on:change={({ target: { value } }) => {
            $voyage
              .collection('crewmate')
              .doc(user.uid)
              .update({ name: value });
            ref.update({ name: value });
          }} />
        <div class="providers">
          <div>
            <span class="absolute venmo -left-4">@</span>
            <input
              on:focus={() => {
                focused = true;
              }}
              on:blur={() => {
                focused = false;
              }}
              autocorrect="off"
              autocomplete="off"
              class="provider appearance-none text-sm"
              placeholder={data?.venmo}
              on:change={({ target: { value } }) => {
                $voyage
                  .collection('crewmate')
                  .doc(user.uid)
                  .update({ venmo: value });
                ref.update({ venmo: value });
              }} />
          </div>
          <div class:focused class="transition-all w-full">
            <Venmo />
          </div>
        </div>
      </div>
    </Doc>
  </div>
</User>

<script>
  import { shipPaletteThemes, shipTypes } from "./ships.js";
  import { createEventDispatcher } from "svelte";
  import Ship from "./Ship.svelte";
  import { announce } from "../store";

  const dispatch = createEventDispatcher();

  let selectedShipType = null;
  const handleSelect = ({ selectedShipType: shipType, theme }) => {
    dispatch("select", { shipType, theme });
    $announce = null;
    shipType = null;
  };
</script>

{#if !selectedShipType}
  <div class="flex">
    <ul
      class="space-y-12 sm:grid grid-cols-3 sm:gap-12 sm:space-y-0 lg:gap-x-8">
      {#each shipTypes as shipType (shipType)}
        <li class={shipType === 'Cruiser' ? 'order-first' : ''}>
          <div class="flex flex-col items-center space-x-4 lg:space-x-6">
            <Ship
              on:click={() => {
                selectedShipType = shipType;
              }}
              {shipType} />
            <div class="font-medium text-lg leading-6 space-y-1">
              <h3>{shipType}</h3>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <div class="flex flex-col">
    <ul
      class="space-y-12 sm:grid grid-cols-3 sm:gap-12 sm:space-y-0 lg:gap-x-8">
      {#each shipPaletteThemes as theme (theme)}
        <li class={theme === 'Passion' ? 'order-first' : ''}>
          <div class="flex-col flex items-center space-x-4 lg:space-x-6">
            <Ship
              on:click={() => handleSelect({ selectedShipType, theme })}
              shipType={selectedShipType}
              {theme} />
            <div class="font-medium text-lg leading-6 space-y-1">
              <h3>{theme}</h3>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/if}

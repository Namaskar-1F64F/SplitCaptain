<script>
  import { shipPaletteMap, shipTypes, shipMap } from "./ships.js";

  export let theme = "Passion";
  export let shipType = "Selfie";

  $: colors = shipPaletteMap[theme] || shipPaletteMap.Passion;

  $: Boat = shipMap[shipType] || shipMap["Selfie"];
</script>

<svelte:component this={Boat} on:click {colors} />

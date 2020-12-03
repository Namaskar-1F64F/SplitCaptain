<script>
  import { stringify } from "querystring";

  import Windy from "./Windy.svelte";
  import Cruiser from "./Cruiser.svelte";
  import Selfie from "./Selfie.svelte";
  import Whale from "./Whale.svelte";
  import Carrier from "./Carrier.svelte";
  import { shipPaletteMap, shipTypes, shipMap } from "./ships.js";

  export let theme = "Passion";
  export let shipType = "Selfie";

  $: colors = shipPaletteMap[theme] || shipPaletteMap.Passion;

  $: Boat = shipMap[shipType];
</script>

<svelte:component this={Boat} on:click {colors} />

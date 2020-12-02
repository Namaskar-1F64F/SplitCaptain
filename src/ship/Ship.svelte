<script>
  import { shipPaletteMap, shipMap } from "./ships.js";

  export let theme = null;
  export let shipType = "Selfie";

  let colors = shipPaletteMap.Passion;
  if (shipType && typeof shipType == "string") {
    // there's the first part which is the ship type. I'm hoping for a sailboat!!
    if (shipMap[shipType]) {
      // all aboard, we found our ship, now lets get our theme
      if (shipPaletteMap[theme]) {
        // awesome, got THE THEME, let's get the deckhands painting this thing immediately
        colors = shipPaletteMap[theme];
      }
    }
  }

  const Boat = shipMap[shipType];
</script>

<Boat on:click {colors} />

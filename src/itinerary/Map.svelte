<script>
  import panzoom from "panzoom";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import rough from "roughjs/bundled/rough.esm.js";
  import { SVG } from "@svgdotjs/svg.js";
  import seedrandom from "seedrandom";
  import {
    createIsland,
    createPath,
    createPort,
    createStart,
    getPossibleCoordinates,
  } from "./map.js";
  export let excursions, voyageId;
  const seed = voyageId.hashCode();
  const random = seedrandom(seed);

  onMount(() => {
    // This is our main container, using svg.js. To get the node, use
    const map = SVG().addTo("#map").size(1000, 1000);
    const rc = rough.svg(map.node, {
      // keep a consistent seed from the voyage ID
      options: { seed },
    });

    // enable panning and zooming of the svg
    panzoom(map.node, {
      bounds: true,
      boundsPadding: 0.1,
    });

    // create islands, currently hardcoded but hopefully eventually will be dynamic @SvenWritesCode
    let islands = [
      createIsland(250, 250, 250, rc),
      createIsland(600, 500, 200, rc),
      createIsland(550, 200, 80, rc),
    ];

    islands.forEach((island) => {
      map.add(island);
    });

    // for all the islands, figure out where we can put the excursions on the coastline, randomly
    let coordinates = getPossibleCoordinates(islands, random);
    excursions.forEach(({ name, id }, i) => {
      const previousIsland = coordinates[i - 1];
      const currentIsland = coordinates[i];
      if (currentIsland) {
        if (previousIsland && currentIsland) {
          const { x: x1, y: y1 } = previousIsland;
          const { x: x2, y: y2 } = currentIsland;
          map.add(createPath(x1, y1, x2, y2, rc));
        }
        // This is stupid, will refactor when start changes to star
        let marker;
        let callback = () => push(`/voyages/${voyageId}/excursions/${id}`);
        if (i === 0) {
          marker = createStart(currentIsland, callback, rc);
        } else {
          marker = createPort(currentIsland, callback, rc);
        }
        map.add(marker);
        map
          .text(name)
          .center(currentIsland.x, currentIsland.y + 20)
          .front();
      }
    });
  });
</script>

<div id="map" />

<style>
  #map {
    height: 600px;
    width: 100vw;
    outline: none;
  }
</style>

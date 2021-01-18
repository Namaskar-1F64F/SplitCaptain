<script>
  import { voyage } from "./../store/index.js";
  import panzoom from "panzoom";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import rough from "roughjs/bundled/rough.esm.js";
  import { SVG } from "@svgdotjs/svg.js";
  export let excursions;
  const seed = { seed: 1337 };

  export let svg;
  let r = (d, x) => (!x ? 1e10 : (0.125 * d * d) / x + x / 2);
  let s = 40;

  onMount(() => {
    const rc = rough.svg(svg);
    let lastMarker = 0;
    let island = rc.circle(250, 250, 250, {
      ...seed,
      roughness: 10,
      fill: "tan",
      fillStyle: "solid",
      stroke: "none",
    });

    svg.appendChild(island);
    var draw = SVG().addTo(svg);

    function getPortMapCoordinates() {
      const coordiates = [];
      excursions.forEach(({ id }) => {
        const path = island.childNodes[0];
        const length = path.getTotalLength();
        const step = 100;
        if (lastMarker + 100 < length) {
          lastMarker += step;
          coordiates.push(path.getPointAtLength(lastMarker));
        }
      });
      return coordiates;
    }

    function drawPort({ x, y }, id) {
      let marker = rc.circle(x, y, 20, {
        ...seed,
        stroke: "red",
        fill: "red",
        fillStyle: "solid",
        style: "cursor: pointer",
      });
      marker.style = "cursor: pointer";
      marker.addEventListener("click", () =>
        push(`/voyages/${$voyage.id}/excursions/${id}`)
      );
      svg.appendChild(marker);
      draw
        .text(id)
        .center(x, y + 20)
        .back();
    }

    function drawPath(x1, y1, x2, y2) {
      let dx = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      const path = ["M", x1, y1, "A", r(dx, s), r(dx, s), 0, 0, 1, x2, y2].join(
        " "
      );
      svg.appendChild(
        rc.path(path, {
          ...seed,
          strokeLineDash: [10, 10],
          strokeWidth: 5,
        })
      );
    }

    panzoom(svg, {
      bounds: true,
      boundsPadding: 0.1,
    });
    let coordinates = getPortMapCoordinates();
    coordinates.forEach(({ x: x2, y: y2 }, i, arr) => {
      if (i === 0) return;
      let { x: x1, y: y1 } = arr[i - 1];
      drawPath(x1, y1, x2, y2);
    });
    excursions.forEach(({ id }, i) => {
      if (coordinates[i]) {
        drawPort(coordinates[i], id);
      }
    });
  });
</script>

<svg id="svg" bind:this={svg} />

<style>
  svg {
    height: 600px;
    width: 100vw;
  }
</style>

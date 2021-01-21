function r(d, x) {
  return !x ? 1e10 : (0.125 * d * d) / x + x / 2;
}
const s = 40;

export function getPossibleCoordinates(paths, random) {
  return paths.reduce((possibleCoordinates, path) => {
    const coastline = path.childNodes[0];

    const totalLength = coastline.getTotalLength();
    const coordinates = [];
    let nextStop = 0;
    while (nextStop < totalLength) {
      nextStop += random() * 250;
      coordinates.push(coastline.getPointAtLength(nextStop));
    }
    return [...possibleCoordinates, ...coordinates];
  }, []);
}

export function createStart({ x, y }, onClick, rc) {
  let marker = rc.rectangle(x-20, y-20, 40, 40, {
    stroke: "red",
    fill: "red",
    fillStyle: "solid",
    style: "cursor: pointer",
  });
  marker.style = "cursor: pointer";
  marker.addEventListener("click", onClick);
  return marker;
}

export function createPort({ x, y }, onClick, rc) {
  let marker = rc.circle(x, y, 20, {
    stroke: "red",
    fill: "red",
    fillStyle: "solid",
    style: "cursor: pointer",
  });
  marker.style = "cursor: pointer";
  marker.addEventListener("click", onClick);
  return marker;
}

export function createPath(x1, y1, x2, y2, rc) {
  let dx = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  const path = ["M", x1, y1, "A", r(dx, s), r(dx, s), 0, 0, 1, x2, y2].join(
    " "
  );
  return rc.path(path, {
    strokeLineDash: [10, 10],
    strokeWidth: 5,
  });
}

export function createIsland(x, y, r, rc) {
  return rc.circle(x, y, r, {
    roughness: 14,
    fill: "tan",
    fillStyle: "solid",
    stroke: "none",
  });
}

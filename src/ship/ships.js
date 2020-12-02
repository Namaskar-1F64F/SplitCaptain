import Windy from "./Windy.svelte";
import Cruiser from "./Cruiser.svelte";
import Selfie from "./Selfie.svelte";
import Whale from "./Whale.svelte";
import Carrier from "./Carrier.svelte";

export const shipPaletteMap = {
  Passion: ["#fed534", "#e99200"],
  Bravery: ["#492103", "#401c01"],
  Compassion: ["#94471B", "#803c14"],
  Confidence: ["#C39060", "#b37f4f"],
  Intelligence: ["#E0AE90", "#d19f80"],
  Honesty: ["#FFD7C2", "#dbb5a0"],
};

export const shipPaletteThemes = Object.keys(shipPaletteMap);

export const shipTypes = ["Carrier", "Whale", "Cruiser", "Windy", "Selfie"];

// Create a mapping of boat name string to svelte component. this could be exported and imported, but
// This guarantees something.. maybe security
export const shipMap = {
  Windy,
  Cruiser,
  Selfie,
  Whale,
  Carrier,
};

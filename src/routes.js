import Voyages from "./routes/Voyages.svelte";
import Excursions from "./routes/Excursions.svelte";
import Provisions from "./routes/Provisions.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  // Exact path
  "/": Voyages,

  // Using named parameters, with last being optional
  "/voyages/:voyageId": Excursions,

  "/voyages/:voyageId/excursions/:excursionId": Provisions,
  
  "*": NotFound,
};

export default routes;

import Voyages from "./routes/Voyages.svelte";
import Splash from "./routes/Splash.svelte";
import Excursion from "./routes/Excursion.svelte";
import NotFound from "./routes/NotFound.svelte";
import Login from "./splash/Login.svelte";
import Bridge from "./routes/Bridge.svelte";
import Itinerary from "./routes/Itinerary.svelte";
import Management from "./management/Management.svelte";

const routes = {
  "/": Splash,
  "/login": Login,
  "/voyages": Voyages,
  // Using named parameters, with last being optional
  "/voyages/:voyageId": Bridge,
  "/voyages/:voyageId/itinerary": Itinerary,
  "/voyages/:voyageId/management": Management,
  "/voyages/:voyageId/excursions/:excursionId": Excursion,

  "*": NotFound,
};

export default routes;

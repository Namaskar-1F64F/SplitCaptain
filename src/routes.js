import Voyages from "./routes/Voyages.svelte";
import Splash from "./routes/Splash.svelte";
import Excursions from "./routes/Excursions.svelte";
import Provisions from "./routes/Provisions.svelte";
import NotFound from "./routes/NotFound.svelte";
import Login from "./splash/Login.svelte";

const routes = {
  "/": Splash,
  "/login": Login,
  "/voyages": Voyages,
  // Using named parameters, with last being optional
  "/voyages/:voyageId": Excursions,

  "/voyages/:voyageId/excursions/:excursionId": Provisions,

  "*": NotFound,
};

export default routes;

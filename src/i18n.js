import { init, register } from "svelte-i18n";

register("en", () => import("./translations/en.json"));
register("es", () => import("./translations/es.json"));


init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
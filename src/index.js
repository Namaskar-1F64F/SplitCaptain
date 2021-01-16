import { init, getLocaleFromNavigator } from "svelte-i18n";
import App from "./App.svelte";
import "./Tailwind.svelte";
import "./i18n";

const fallbackLocale = "en-US";
const navigatorLocale = getLocaleFromNavigator();

if ("serviceWorker" in navigator) {
  // navigator.serviceWorker.register("/service-worker.js");
}

init({
  fallbackLocale,
  initialLocale: ["en-US"].includes(navigatorLocale)
    ? navigatorLocale
    : fallbackLocale,
});

const app = new App({
  target: document.body
});

export default app;

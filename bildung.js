import { entryModuleMarkup } from "./components/EntryModule/entry-module.js";

document.getElementById("entry-module-root").innerHTML = entryModuleMarkup();

// Audience carousel prev/next (#audience-prev/#audience-next) are left
// inert: all 4 audience segments fit the grid already, and we only have
// these 4 photos - no evidence more exist off-screen to page through. See
// README.

import { offers } from "./data/offers.js";
import { createFilterPanel } from "./components/FilterPanel/filter-panel.js";
import {
  filterAndSortOffers,
  selectionFromSearchParams,
  selectionToSearchParams,
} from "./components/FilterPanel/filter-logic.js";
import { offerCardMarkup } from "./components/OfferCard/offer-card.js";

const gridEl = document.getElementById("offer-grid");
const countEl = document.getElementById("results-count");
const panelRoot = document.getElementById("filter-panel");

function renderResults(selection) {
  const results = filterAndSortOffers(offers, selection);
  const query = selectionToSearchParams(selection).toString();

  gridEl.innerHTML = results.length
    ? results.map((offer) => offerCardMarkup(offer, query)).join("")
    : '<p class="offer-grid__empty">Keine Angebote gefunden.</p>';

  countEl.textContent = `${results.length} ${results.length === 1 ? "Angebot" : "Angebote"}`;

  const newUrl = `${location.pathname}${query ? `?${query}` : ""}`;
  history.replaceState(null, "", newUrl);
}

const initialSelection = selectionFromSearchParams(new URLSearchParams(location.search));

createFilterPanel({
  root: panelRoot,
  offers,
  initialSelection,
  onChange: (selection) => renderResults(selection),
});

renderResults(initialSelection);

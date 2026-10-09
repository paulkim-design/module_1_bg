import { offers } from "./data/offers.js";
import { renderOfferDetail } from "./components/OfferDetail/offer-detail.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");
const offer = offers.find((o) => o.id === id) ?? null;

// Back link keeps whatever catalogue filter was active when the teacher
// clicked through (offer-card.js carries the catalogue's current filter
// params alongside ?id= for exactly this reason) - just drop id itself.
params.delete("id");
const filterQuery = params.toString();
const backHref = `angebote.html${filterQuery ? `?${filterQuery}` : ""}`;

// Back-link label (instruction: "Weitere Angebote für Klasse <n>" with an
// active grade filter, "Alle Angebote für Schulen" without one). Only
// handles the single-grade case explicitly asked for; any other filter
// combination (no filter, several grades at once, or only format/sprache/
// dauer selected) falls back to the generic label, since nothing else was
// specified for those. Kita gets the same singular treatment as a grade.
const klasseValues = (params.get("klasse") ?? "").split(",").filter(Boolean);
let backLabel = "Alle Angebote für Schulen";
if (klasseValues.length === 1) {
  backLabel =
    klasseValues[0] === "kita"
      ? "Weitere Angebote für Kita-Gruppen"
      : `Weitere Angebote für Klasse ${klasseValues[0]}`;
}

renderOfferDetail(document.getElementById("offer-detail-root"), offer, backHref, backLabel);

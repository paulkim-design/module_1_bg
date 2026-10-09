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

renderOfferDetail(document.getElementById("offer-detail-root"), offer, backHref);

// Rebuilt to match input/catalogue-target.png (4-column grid, 16:9 photo,
// bold title/"Klasse x-y", one-sentence draft outcome, Dauer/Kosten/Sprache/
// Buchung lines). Per the brief, outcomes aren't written per offer - every
// card uses the same bracketed placeholder sentence, including the one
// offer with real outcome text on its own detail page (that richer content
// only fits the detail page's "Was Ihre Klasse mitnimmt" list, not a
// one-sentence card). See README.

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

// Identical copy to components/OfferDetail/offer-detail.js's
// OUTCOME_PLACEHOLDER - kept as a literal in both rather than a shared
// module for one string used by two small, independent components.
const OUTCOME_PLACEHOLDER =
  "[Entwurf: Ein Satz von Education dazu, was Schüler*innen aus dem Angebot mitnehmen, rund 100 Zeichen.]";

function languageLine(offer) {
  if (offer.languageDisplay) return { text: offer.languageDisplay, draft: false };
  const mapped = offer.language.value === "en" ? "Englisch" : "Deutsch";
  return { text: mapped, draft: offer.language.assumed };
}

// filterQuery (e.g. "klasse=5&format=fuehrung") carries the catalogue's
// current filter state along into offer.html, so its own "back to
// catalogue" link can restore it rather than resetting to "all offers".
export function offerCardMarkup(offer, filterQuery = "") {
  const imageSrc = offer.image?.src ?? null;
  const imageAlt = offer.image?.alt ?? "";
  const image = imageSrc
    ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" loading="lazy">`
    : `<div class="offer-card__image-placeholder" role="img" aria-label="Foto 16:9 (optional)"><span>Foto 16:9 (optional)</span></div>`;
  const href = `offer.html?id=${encodeURIComponent(offer.id)}${filterQuery ? `&${filterQuery}` : ""}`;

  const dauer = offer.duration ?? "[Dauer]";
  const kosten = offer.cost ?? "[Kosten]";
  const sprache = languageLine(offer);

  return `
    <a class="offer-card" href="${href}">
      <div class="offer-card__image-frame">${image}</div>
      <p class="offer-card__eyebrow">${escapeHtml(offer.format)}</p>
      <h3 class="offer-card__title">${escapeHtml(offer.title)}</h3>
      <p class="offer-card__grade">${escapeHtml(offer.gradeBand.raw ?? "[Platzhalter]")}</p>
      <p class="offer-card__outcome" data-draft="true">${escapeHtml(OUTCOME_PLACEHOLDER)}</p>
      <p class="offer-card__meta">${escapeHtml(dauer)} · ${escapeHtml(kosten)}</p>
      <p class="offer-card__meta"${sprache.draft ? ' data-draft="true"' : ""}>${escapeHtml(sprache.text)}</p>
      <p class="offer-card__meta">Buchung über ${escapeHtml(offer.registration ?? "Museumsdienst Berlin")}</p>
    </a>
  `;
}

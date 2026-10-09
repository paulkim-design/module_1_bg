function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

// filterQuery (e.g. "klasse=5&format=fuehrung") carries the catalogue's
// current filter state along into offer.html, so its own "back to
// catalogue" link can restore it rather than resetting to "all offers".
export function offerCardMarkup(offer, filterQuery = "") {
  const imageSrc = offer.image?.src ?? null;
  const imageAlt = offer.image?.alt ?? "";
  const image = imageSrc
    ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" loading="lazy">`
    : `<div class="offer-card__image-placeholder" role="img" aria-label="[Platzhalter]"></div>`;
  const href = `offer.html?id=${encodeURIComponent(offer.id)}${filterQuery ? `&${filterQuery}` : ""}`;

  return `
    <a class="offer-card" href="${href}">
      <div class="offer-card__image-frame">${image}</div>
      <p class="offer-card__eyebrow">${escapeHtml(offer.format)}</p>
      <h3 class="offer-card__title">${escapeHtml(offer.title)}</h3>
      <p class="offer-card__description">${escapeHtml(offer.description)}</p>
    </a>
  `;
}

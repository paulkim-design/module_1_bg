function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

const MUSEUMSDIENST_EMAIL = "museumsdienst@kulturprojekte.berlin";
const MUSEUM_ADDRESS = "Berlinische Galerie, Alte Jakobstraße 124 – 128, 10969 Berlin";

// "Was Ihre Klasse mitnimmt" has no source anywhere (new section, per the
// brief) - 3 literal placeholders rather than invented outcome text, with
// the exact visible marker the brief specifies.
const OUTCOME_PLACEHOLDERS = ["[Platzhalter]", "[Platzhalter]", "[Platzhalter]"];

function factValue(value) {
  return value ?? "[Platzhalter]";
}

function renderNotFound(root, backHref) {
  root.innerHTML = `
    <div class="offer-detail no-print">
      <p>Dieses Angebot wurde nicht gefunden.</p>
      <a class="link" href="${escapeHtml(backHref)}">Zur Übersicht</a>
    </div>
  `;
}

export function renderOfferDetail(root, offer, backHref) {
  if (!offer) {
    renderNotFound(root, backHref);
    return;
  }

  const image = offer.image ?? {};
  const imageMarkup = image.src
    ? `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt ?? "")}">`
    : `<div class="offer-detail__image-placeholder" role="img" aria-label="[Platzhalter]"></div>`;

  root.innerHTML = `
    <article class="offer-detail no-print">
      <a class="offer-detail__back link" href="${escapeHtml(backHref)}">← Zur Übersicht</a>

      <header class="offer-detail__head">
        <h1>${escapeHtml(offer.title)}</h1>
        <p class="offer-detail__dek">${escapeHtml(offer.description)}</p>
      </header>

      <figure class="offer-detail__figure">
        ${imageMarkup}
        ${image.credit ? `<figcaption>${escapeHtml(image.credit)}</figcaption>` : ""}
      </figure>

      <div class="offer-detail__facts">
        <p><span data-draft="true">Klassenstufe:</span> ${escapeHtml(factValue(offer.gradeBand.raw))}</p>
        <p>Dauer: ${escapeHtml(factValue(offer.duration))}</p>
        <p>Kosten: ${escapeHtml(factValue(offer.cost))}</p>
      </div>

      <p class="offer-detail__registration">
        Anmeldung und nähere Informationen:
        <a class="link" href="mailto:${MUSEUMSDIENST_EMAIL}" target="_blank" rel="noopener">${escapeHtml(offer.registration ?? "Museumsdienst Berlin")}</a>
      </p>

      <section class="offer-detail__outcomes">
        <h2 data-draft="true">Was Ihre Klasse mitnimmt</h2>
        <p class="offer-detail__draft-label" data-draft="true">Entwurf: Text kommt vom Bildungsteam</p>
        <ul data-draft="true">
          ${OUTCOME_PLACEHOLDERS.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>

      <section class="offer-detail__group-visit">
        <h2 data-draft="true">Gruppenbesuch</h2>
        <p data-draft="true">
          Der Eintritt ist für Schulklassen und Begleitpersonen kostenfrei.
          Pro Zeitfenster sind maximal 35 Personen möglich.
        </p>
        <a class="link" data-draft="true" href="#">Besuch › Tickets</a>
      </section>

      <section class="offer-detail__principal">
        <h2>Für die Schulleitung</h2>
        <div class="offer-detail__principal-actions">
          <button type="button" class="button" id="print-button">Als PDF drucken</button>
          <button type="button" class="button" id="copy-link-button">Link kopieren</button>
        </div>
        <p class="offer-detail__status" id="copy-link-status" role="status" aria-live="polite"></p>
      </section>
    </article>

    <section class="offer-detail__print-summary" aria-hidden="true">
      <h1>${escapeHtml(offer.title)}</h1>
      <p>${escapeHtml(offer.description)}</p>
      <dl>
        <dt>Klassenstufe</dt>
        <dd>${escapeHtml(factValue(offer.gradeBand.raw))}</dd>
        <dt>Dauer</dt>
        <dd>${escapeHtml(factValue(offer.duration))}</dd>
        <dt>Kosten</dt>
        <dd>${escapeHtml(factValue(offer.cost))}</dd>
      </dl>
      <h2>Was Ihre Klasse mitnimmt<span>(Entwurf: Text kommt vom Bildungsteam)</span></h2>
      <ul>${OUTCOME_PLACEHOLDERS.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>Anmeldung</h2>
      <p>${escapeHtml(offer.registration ?? "Museumsdienst Berlin")} · ${MUSEUMSDIENST_EMAIL}</p>
      <p>${escapeHtml(MUSEUM_ADDRESS)}</p>
    </section>
  `;

  root.querySelector("#print-button").addEventListener("click", () => window.print());

  const copyButton = root.querySelector("#copy-link-button");
  const copyStatus = root.querySelector("#copy-link-status");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyStatus.textContent = "Link kopiert.";
    } catch {
      copyStatus.textContent = "Kopieren war nicht möglich. Bitte die Adresse manuell kopieren.";
    }
  });
}

// Rebuilt to match the Figma offer-page mockup (node 10-406). Structure,
// section order and chrome copy (headings, field labels, button labels)
// come from that mockup, now treated as a design source the same way
// input/detail.png was for Stage 3. Per the brief, only three kinds of
// mockup content stay flagged data-draft: outcome text, contact-person
// roles, and contact details - plus whatever Stage 3 already required
// draft (Eintritt/Gruppengröße/Anpassung have no source anywhere, same as
// before). Real data/offers.js values are never draft, even where they
// happen to be null and show as "[Platzhalter]" - that's the established
// placeholder convention, not new copy. See README.

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

const MUSEUM_ADDRESS = "Berlinische Galerie, Alte Jakobstraße 124 – 128, 10969 Berlin";

// Every offer uses this same bracketed sentence for "Was Ihre Klasse
// mitnimmt" - not written per offer, per the brief. Identical copy is used
// on the catalogue card (components/OfferCard/offer-card.js) for the same
// reason; kept as a literal in both rather than a shared module for one
// string used by two small, independent components.
const OUTCOME_PLACEHOLDER =
  "[Entwurf: Ein Satz von Education dazu, was Schüler*innen aus dem Angebot mitnehmen, rund 100 Zeichen.]";

const ICONS = {
  arrowBack: '<path d="M20 12H4M10 18L4 12L10 6" stroke-width="2.5" stroke-linecap="square" stroke="currentColor"/>',
  external: '<path d="M20 10V4H14M20 4L11 13M18 13V20H4V6H11" stroke-width="2.5" stroke-linecap="square" stroke="currentColor"/>',
  print: '<path d="M7 9V4H17V9M7 17H4V10H20V17H17M7 17V20H17V17M7 17V14H17V17" stroke-width="2.5" stroke-linecap="square" stroke="currentColor"/>',
  link: '<path d="M10 14L14 10M8.5 17.5L6.5 19.5C5.70435 20.2956 4.62522 20.7426 3.5 20.7426C2.37478 20.7426 1.29565 20.2956 0.5 19.5C-0.295649 18.7044 -0.742641 17.6252 -0.742641 16.5C-0.742641 15.3748 -0.295649 14.2956 0.5 13.5L4.5 9.5C4.89379 9.10572 5.36144 8.79293 5.8762 8.57952C6.39097 8.36611 6.94275 8.25626 7.5 8.25626C8.05725 8.25626 8.60903 8.36611 9.1238 8.57952C9.63856 8.79293 10.1062 9.10572 10.5 9.5M15.5 6.5L17.5 4.5C18.2956 3.70435 19.3748 3.25736 20.5 3.25736C21.6252 3.25736 22.7044 3.70435 23.5 4.5C24.2956 5.29565 24.7426 6.37478 24.7426 7.5C24.7426 8.62522 24.2956 9.70435 23.5 10.5L19.5 14.5C19.1062 14.8943 18.6386 15.2071 18.1238 15.4205C17.609 15.6339 17.0572 15.7437 16.5 15.7437C15.9428 15.7437 15.391 15.6339 14.8762 15.4205C14.3614 15.2071 13.8938 14.8943 13.5 14.5" stroke-width="2.5" stroke-linecap="square" stroke="currentColor"/>',
  mail: '<path d="M21 6V5H3V6M21 6V19H3V6M21 6L12 13L3 6" stroke-width="2.5" stroke-linecap="square" stroke="currentColor"/>',
};

function icon(name) {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden="true">${ICONS[name]}</svg>`;
}

function factValue(value) {
  return value ?? "[Platzhalter]";
}

function subjectLine(offer) {
  const kind = offer.gradeBand.kita ? "für Kita-Gruppen" : "für Schulklassen";
  const grade = !offer.gradeBand.kita && offer.gradeBand.raw ? ` · ${offer.gradeBand.raw}` : "";
  return `${offer.format} ${kind}${grade}`;
}

function languageValue(offer) {
  if (offer.languageDisplay) return { text: offer.languageDisplay, draft: false };
  const mapped = offer.language.value === "en" ? "Englisch" : "Deutsch";
  return { text: mapped, draft: offer.language.assumed };
}

function durationCostValue(offer) {
  if (!offer.duration || !offer.cost) return "[Platzhalter]";
  return `${offer.duration} · ${offer.cost}`;
}

function outcomesRow(offer) {
  if (offer.outcomes) {
    return `<ul>${offer.outcomes.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }
  return `<p>${escapeHtml(OUTCOME_PLACEHOLDER)}</p>`;
}

function descriptionSection(offer) {
  if (offer.longDescription) {
    const { heading, paragraphs, draft } = offer.longDescription;
    const draftAttr = draft ? ' data-draft="true"' : "";
    const headingMarkup = heading ? `<h2${draftAttr}>${escapeHtml(heading)}</h2>` : "";
    return `
      ${headingMarkup}
      <div${draftAttr}>
        ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
      </div>
    `;
  }
  return `<p>${escapeHtml(offer.description)}</p>`;
}

function renderNotFound(root, backHref) {
  root.innerHTML = `
    <div class="offer-detail no-print">
      <p>Dieses Angebot wurde nicht gefunden.</p>
      <a class="link" href="${escapeHtml(backHref)}">Zur Übersicht</a>
    </div>
  `;
}

export function renderOfferDetail(root, offer, backHref, backLabel) {
  if (!offer) {
    renderNotFound(root, backHref);
    return;
  }

  const image = offer.image ?? {};
  const imageMarkup = image.src
    ? `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt ?? "")}">`
    : `<div class="offer-detail__image-placeholder" role="img" aria-label="[Platzhalter]"></div>`;

  const creditLabel = offer.exhibition ? `Beispiel aus der ${offer.exhibition}` : "Beispielbild";
  const sprache = languageValue(offer);

  root.innerHTML = `
    <article class="offer-detail no-print">
      <a class="offer-detail__back link" href="${escapeHtml(backHref)}">
        ${icon("arrowBack")} ${escapeHtml(backLabel)}
      </a>

      <header class="offer-detail__head">
        <p class="offer-detail__eyebrow">${escapeHtml(offer.format)}</p>
        <h1>${escapeHtml(offer.title)}</h1>
        <p class="offer-detail__subheading" data-draft="true">${escapeHtml(subjectLine(offer))}</p>
      </header>

      <figure class="offer-detail__figure">
        ${imageMarkup}
        <figcaption>
          <p class="offer-detail__credit-label" data-draft="true">${escapeHtml(creditLabel)}</p>
          <p>${escapeHtml(factValue(image.credit))}</p>
        </figcaption>
      </figure>

      <div class="offer-detail__body">
        <section class="offer-detail__description">
          ${descriptionSection(offer)}
        </section>

        <section class="offer-detail__glance">
          <div class="offer-detail__glance-head">
            <h2>Auf einen Blick</h2>
            <p>Alle Angaben für Ihre Planung und Schulleitung.</p>
          </div>

          <dl class="offer-detail__facts">
            <div class="offer-detail__facts-row" data-draft="true">
              <dt>Was Ihre Klasse mitnimmt</dt>
              <dd>${outcomesRow(offer)}</dd>
            </div>
            <div class="offer-detail__facts-row">
              <dt>Klasse</dt>
              <dd>${escapeHtml(factValue(offer.gradeBand.raw))}</dd>
            </div>
            <div class="offer-detail__facts-row">
              <dt>Dauer und Kosten</dt>
              <dd>${escapeHtml(durationCostValue(offer))}</dd>
            </div>
            <div class="offer-detail__facts-row">
              <dt>Sprache</dt>
              <dd${sprache.draft ? ' data-draft="true"' : ""}>${escapeHtml(sprache.text)}</dd>
            </div>
            <div class="offer-detail__facts-row">
              <dt>Ort</dt>
              <dd>${escapeHtml(factValue(offer.exhibition))}</dd>
            </div>
            <div class="offer-detail__facts-row" data-draft="true">
              <dt>Eintritt</dt>
              <dd>Frei für Schulklassen und Begleitpersonen</dd>
            </div>
            <div class="offer-detail__facts-row" data-draft="true">
              <dt>Gruppengröße</dt>
              <dd>Bis 35 Personen</dd>
            </div>
            <div class="offer-detail__facts-row">
              <dt>Buchung</dt>
              <dd>${escapeHtml(offer.registration ?? "Museumsdienst Berlin")} <span data-draft="true">telefonisch oder per E-Mail. Kein Zeitfenster nötig.</span></dd>
            </div>
            <div class="offer-detail__facts-row" data-draft="true">
              <dt>Anpassung</dt>
              <dd>Inhalte nach Absprache mit dem Museumsdienst abstimmbar</dd>
            </div>
          </dl>

          <div class="offer-detail__actions">
            <a class="button offer-detail__booking" data-draft="true" href="#">
              Beim Museumsdienst buchen ${icon("external")}
            </a>
            <div class="offer-detail__actions-secondary">
              <button type="button" class="offer-detail__action" id="print-button">${icon("print")} Drucken</button>
              <button type="button" class="offer-detail__action" id="copy-link-button">${icon("link")} Link kopieren</button>
              <a class="offer-detail__action" id="mail-action" href="#">${icon("mail")} Per E-Mail senden</a>
            </div>
            <p class="offer-detail__status" id="copy-link-status" role="status" aria-live="polite"></p>
          </div>
        </section>
      </div>

      <section class="offer-detail__contact">
        <h2>Kontakt</h2>
        <div class="offer-detail__contact-grid" data-draft="true">
          <article class="offer-detail__contact-card">
            <p class="offer-detail__eyebrow">Buchung und Termin</p>
            <p class="offer-detail__contact-name">Museumsdienst Berlin</p>
            <p>Beratung zu Terminen, Sprachen und Anpassungen.</p>
            <a class="link" href="tel:+4930247499888">+49 (0)30 247 49 888</a>
            <a class="link" href="mailto:museumsinformation@kulturprojekte.berlin">museumsinformation@kulturprojekte.berlin</a>
          </article>
          <article class="offer-detail__contact-card">
            <p class="offer-detail__eyebrow">Fragen zum Angebot</p>
            <p class="offer-detail__contact-name">Bildung &amp; Vermittlung</p>
            <p>Inhaltliche Fragen zur Führung und zum Besuch mit Ihrer Klasse.</p>
            <a class="link" href="mailto:bildung@berlinischegalerie.de">bildung@berlinischegalerie.de</a>
          </article>
        </div>
      </section>
    </article>

    <section class="offer-detail__print-summary" aria-hidden="true">
      <h1>${escapeHtml(offer.title)}</h1>
      <p>${escapeHtml(subjectLine(offer))}</p>
      <dl>
        <dt>Klasse</dt>
        <dd>${escapeHtml(factValue(offer.gradeBand.raw))}</dd>
        <dt>Dauer und Kosten</dt>
        <dd>${escapeHtml(durationCostValue(offer))}</dd>
        <dt>Sprache</dt>
        <dd>${escapeHtml(sprache.text)}</dd>
        <dt>Ort</dt>
        <dd>${escapeHtml(factValue(offer.exhibition))}</dd>
        <dt>Eintritt</dt>
        <dd>Frei für Schulklassen und Begleitpersonen</dd>
        <dt>Gruppengröße</dt>
        <dd>Bis 35 Personen</dd>
      </dl>
      <h2>Was Ihre Klasse mitnimmt<span>(Entwurf)</span></h2>
      ${outcomesRow(offer)}
      <h2>Kontakt</h2>
      <p>Buchung und Termin: Museumsdienst Berlin, +49 (0)30 247 49 888, museumsinformation@kulturprojekte.berlin</p>
      <p>Fragen zum Angebot: Bildung &amp; Vermittlung, bildung@berlinischegalerie.de</p>
      <p>${escapeHtml(MUSEUM_ADDRESS)}</p>
    </section>
  `;

  root.querySelector("#print-button").addEventListener("click", () => window.print());

  const mailAction = root.querySelector("#mail-action");
  const subject = encodeURIComponent(offer.title);
  const body = encodeURIComponent(location.href);
  mailAction.href = `mailto:?subject=${subject}&body=${body}`;

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

// Grade link values match filter-logic.js's own klasse facet values exactly
// ('kita', '1'..'13'), so ?klasse=<value> on angebote.html is read by the
// same selectionFromSearchParams() the catalogue's own filter panel uses -
// no separate parsing logic needed.
const GRADE_VALUES = ["kita", ...Array.from({ length: 13 }, (_, i) => String(i + 1))];

function gradeLabel(value) {
  return value === "kita" ? "Kita" : `Klasse ${value}`;
}

export function entryModuleMarkup() {
  const links = GRADE_VALUES.map(
    (value) =>
      `<li><a class="link" data-draft="true" href="angebote.html?klasse=${value}">${gradeLabel(value)}</a></li>`
  ).join("");

  return `
    <section class="entry-module" aria-labelledby="entry-module-heading">
      <h2 class="section-heading" id="entry-module-heading" data-draft="true">Für Schulklassen</h2>
      <p class="entry-module__intro" data-draft="true">
        Direkt zur passenden Klassenstufe springen und alle buchbaren Angebote dafür sehen:
      </p>
      <ul class="entry-module__grades">
        ${links}
      </ul>
    </section>
  `;
}

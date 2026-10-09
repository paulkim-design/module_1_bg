import {
  applyToggle,
  cloneSelection,
  getFacetOptions,
  isOptionDisabled,
  FACET_LABELS,
} from "./filter-logic.js";

const FACET_LEGENDS = {
  // draft: true -> not sourced copy (filter.png has no Klassenstufe/Sprache/
  // Dauer legend of its own), gets the [data-draft] marker from base.css.
  klasse: { label: FACET_LABELS.klasse, draft: true },
  format: { label: FACET_LABELS.format, draft: false },
  sprache: { label: FACET_LABELS.sprache, draft: true },
  dauer: { label: FACET_LABELS.dauer, draft: true },
};

// One column per facet, in this fixed order (input/catalogue-target.png's
// own facets are different ones - this project's are "decided" per the
// brief, just laid out the same way: one bold-labelled column each).
const FACET_ORDER = ["klasse", "format", "sprache", "dauer"];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

// New copy (filter.png has no equivalent message) - gets the [data-draft]
// marker wherever it's rendered. See README: a teacher must always be able
// to uncheck their own selection, so an uncheck that would otherwise empty
// the results clears the conflicting facet(s) instead of refusing it, and
// this is how that gets explained.
function buildNoticeText(clearedFacets) {
  if (clearedFacets.length === 0) return null;
  const labels = clearedFacets.map((key) => `„${FACET_LABELS[key]}“`);
  const joined =
    labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(", ")} und ${labels[labels.length - 1]}`;
  const article = labels.length === 1 ? "Der Filter" : "Die Filter";
  const verb = labels.length === 1 ? "wurde" : "wurden";
  return `${article} ${joined} ${verb} zurückgesetzt, weil sonst keine Angebote mehr passen würden.`;
}

function renderFieldset(facetKey, options, offers, selection) {
  const { label, draft } = FACET_LEGENDS[facetKey];
  const items = options
    .map(({ value, label: optionLabel }) => {
      const checked = selection[facetKey].has(value);
      // Only ever disables a currently-*unchecked* option (see
      // filter-logic.js) - a checked box is always safe to uncheck.
      const disabled = isOptionDisabled(offers, selection, facetKey, value);
      return `
        <label class="checkbox">
          <input
            class="checkbox__input"
            type="checkbox"
            data-facet="${facetKey}"
            value="${escapeHtml(value)}"
            ${checked ? "checked" : ""}
            ${disabled ? 'aria-disabled="true"' : ""}
          >
          <span class="checkbox__label">${escapeHtml(optionLabel)}</span>
        </label>
      `;
    })
    .join("");

  return `
    <fieldset class="filter-panel__fieldset">
      <legend${draft ? ' data-draft="true"' : ""}>${escapeHtml(label)}</legend>
      ${items}
    </fieldset>
  `;
}

export function createFilterPanel({ root, offers, initialSelection, onChange }) {
  let selection = cloneSelection(initialSelection);
  let notice = null;
  const facetOptions = getFacetOptions(offers);
  // Open by default, per the brief - unlike Stage 2, where it started closed.
  let isOpen = true;

  function render() {
    root.innerHTML = `
      <div class="filter-panel__header">
        <button
          type="button"
          class="filter-panel__toggle"
          aria-expanded="${isOpen}"
          aria-controls="filter-panel-columns"
        >
          Filter${isOpen ? ' <span aria-hidden="true">×</span>' : ""}
        </button>
      </div>
      ${
        notice
          ? `<p class="filter-panel__notice" role="status" data-draft="true">${escapeHtml(notice)}</p>`
          : ""
      }
      <div class="filter-panel__columns" id="filter-panel-columns" ${isOpen ? "" : "hidden"}>
        ${FACET_ORDER.map(
          (facetKey) => `
            <div class="filter-panel__column">
              ${renderFieldset(facetKey, facetOptions[facetKey], offers, selection)}
            </div>
          `
        ).join("")}
      </div>
    `;

    root.querySelector(".filter-panel__toggle").addEventListener("click", () => {
      isOpen = !isOpen;
      render();
    });

    root.querySelectorAll(".checkbox__input").forEach((input) => {
      input.addEventListener("click", (event) => {
        if (input.getAttribute("aria-disabled") === "true") {
          event.preventDefault();
        }
      });
      input.addEventListener("change", (event) => {
        if (input.getAttribute("aria-disabled") === "true") {
          event.preventDefault();
          input.checked = selection[input.dataset.facet].has(input.value);
          return;
        }
        const result = applyToggle(offers, selection, input.dataset.facet, input.value);
        selection = result.selection;
        notice = buildNoticeText(result.clearedFacets);
        render();
        onChange(cloneSelection(selection));
      });
    });
  }

  render();

  return { getSelection: () => cloneSelection(selection) };
}

// Pure data logic for the catalogue filter: no DOM here, so it can be unit
// tested or reused by both the filter panel and the results count on their
// own. See filter-panel.js for the rendering/wiring half.

export const FACET_KEYS = ["klasse", "format", "sprache", "dauer"];

const FORMAT_SLUGS = { Führung: "fuehrung", Workshop: "workshop" };
const FORMAT_LABELS = Object.fromEntries(
  Object.entries(FORMAT_SLUGS).map(([label, slug]) => [slug, label])
);

const SPRACHE_LABELS = { de: "Deutsch", en: "Englisch" };

export const FACET_LABELS = {
  klasse: "Klassenstufe",
  format: "Format",
  sprache: "Sprache",
  dauer: "Dauer",
};

// Priority for which facet to auto-clear first when an uncheck would
// otherwise empty the results (see applyToggle). Grade level is the thing
// a teacher is least likely to want sacrificed, so it's cleared last;
// duration/language are the finer, more expendable refinements.
const CLEAR_PRIORITY = ["dauer", "sprache", "format", "klasse"];

export function createEmptySelection() {
  return { klasse: new Set(), format: new Set(), sprache: new Set(), dauer: new Set() };
}

export function cloneSelection(selection) {
  return {
    klasse: new Set(selection.klasse),
    format: new Set(selection.format),
    sprache: new Set(selection.sprache),
    dauer: new Set(selection.dauer),
  };
}

// Klassenstufe: fixed 1-13 plus Kita, per the brief, independent of what's
// actually in the data (an option can be real and still have 0 current
// matches - see isOptionDisabled).
export function getFacetOptions(offers) {
  const klasse = [
    { value: "kita", label: "Kita" },
    ...Array.from({ length: 13 }, (_, i) => ({
      value: String(i + 1),
      label: `Klasse ${i + 1}`,
    })),
  ];

  const format = Array.from(new Set(offers.map((o) => o.format)))
    .map((label) => ({ value: FORMAT_SLUGS[label] ?? label.toLowerCase(), label }))
    .sort((a, b) => a.label.localeCompare(b.label, "de"));

  // "en" is kept even though no offer currently carries it - filter.png's
  // own mock shows this exact option greyed out, so a permanently-disabled
  // Englisch checkbox is the faithful result, not a bug. See README.
  const sprache = ["de", "en"].map((value) => ({ value, label: SPRACHE_LABELS[value] }));

  const dauer = Array.from(
    new Set(offers.flatMap((o) => o.durationMinutes ?? []))
  )
    .sort((a, b) => a - b)
    .map((minutes) => ({ value: String(minutes), label: `${minutes} Minuten` }));

  return { klasse, format, sprache, dauer };
}

export function matchesFacetValue(offer, facetKey, value) {
  switch (facetKey) {
    case "klasse": {
      if (value === "kita") return offer.gradeBand.kita === true;
      const grade = Number(value);
      return (
        offer.gradeBand.min != null &&
        offer.gradeBand.max != null &&
        grade >= offer.gradeBand.min &&
        grade <= offer.gradeBand.max
      );
    }
    case "format":
      return offer.format === (FORMAT_LABELS[value] ?? value);
    case "sprache":
      return offer.language.value === value;
    case "dauer":
      return Array.isArray(offer.durationMinutes) && offer.durationMinutes.includes(Number(value));
    default:
      return true;
  }
}

export function offerMatchesSelection(offer, selection) {
  return FACET_KEYS.every((facetKey) => {
    const values = selection[facetKey];
    if (!values || values.size === 0) return true;
    return Array.from(values).some((value) => matchesFacetValue(offer, facetKey, value));
  });
}

// Would *checking* this currently-unchecked option drive the result set to
// zero? If so, filter-panel.js disables it rather than hiding it. This is
// one-directional on purpose: filter.png's checkboxes are a genuine
// multi-select (square boxes throughout, an enabled-but-unchecked option
// sitting next to a checked one in the same facet, never a radio circle),
// and every checked example in it renders perfectly normally, never greyed.
// A teacher must always be able to uncheck their own selection - see
// applyToggle for what happens on the rare uncheck that would otherwise
// empty the results, instead of blocking it.
export function isOptionDisabled(offers, selection, facetKey, value) {
  if (selection[facetKey].has(value)) return false;
  const trial = cloneSelection(selection);
  trial[facetKey].add(value);
  return !offers.some((offer) => offerMatchesSelection(offer, trial));
}

// Applies a user-initiated checkbox toggle and returns the new selection,
// guaranteeing at least one offer still matches. Checking is already
// guaranteed safe by the UI only ever allowing non-disabled options to be
// checked. Unchecking is always allowed - but within a facet, options are
// OR'd together, so removing one can strand another facet's AND constraint
// with zero matches (e.g. Format={Führung,Workshop} + Dauer=90 has exactly
// 1 match, the one Führung with a known 90-minute duration; unchecking
// Führung there would zero it out). When that happens, rather than
// refusing the uncheck, the *other* facet(s) responsible are cleared -
// trying each alone first (in CLEAR_PRIORITY order) for the smallest fix,
// falling back to clearing more than one - and reported back so the caller
// can tell the teacher what happened.
export function applyToggle(offers, selection, facetKey, value) {
  const next = cloneSelection(selection);
  const wasChecked = next[facetKey].has(value);

  if (wasChecked) {
    next[facetKey].delete(value);
  } else {
    next[facetKey].add(value);
  }

  if (offers.some((offer) => offerMatchesSelection(offer, next))) {
    return { selection: next, clearedFacets: [] };
  }

  // Only reachable via an uncheck (checking is pre-filtered by
  // isOptionDisabled) - find the smallest set of facets to clear. The
  // edited facet is a candidate too, deliberately not excluded: within a
  // facet, remaining OR'd values can themselves be dead (e.g. Sprache left
  // at just {Englisch} after unchecking Deutsch, when Englisch - like
  // Kita, or any option that's disabled for *checking* - matches nothing
  // on its own; it could only have gotten checked in the first place
  // alongside a value that did match). Clearing that same facet is then
  // the right fix, not some unrelated one.
  const candidates = CLEAR_PRIORITY.filter((key) => next[key].size > 0);

  for (const key of candidates) {
    const trial = cloneSelection(next);
    trial[key].clear();
    if (offers.some((offer) => offerMatchesSelection(offer, trial))) {
      return { selection: trial, clearedFacets: [key] };
    }
  }

  const cleared = [];
  for (const key of candidates) {
    next[key].clear();
    cleared.push(key);
    if (offers.some((offer) => offerMatchesSelection(offer, next))) break;
  }
  return { selection: next, clearedFacets: cleared };
}

export function filterAndSortOffers(offers, selection) {
  return offers
    .filter((offer) => offerMatchesSelection(offer, selection))
    .sort((a, b) => {
      const aMin = a.gradeBand.min ?? Infinity;
      const bMin = b.gradeBand.min ?? Infinity;
      if (aMin !== bMin) return aMin - bMin;
      return a.title.localeCompare(b.title, "de");
    });
}

export function selectionFromSearchParams(searchParams) {
  const selection = createEmptySelection();
  for (const key of FACET_KEYS) {
    const raw = searchParams.get(key);
    if (!raw) continue;
    for (const value of raw.split(",").filter(Boolean)) {
      selection[key].add(value);
    }
  }
  return selection;
}

export function selectionToSearchParams(selection) {
  const params = new URLSearchParams();
  for (const key of FACET_KEYS) {
    if (selection[key].size > 0) {
      params.set(key, Array.from(selection[key]).join(","));
    }
  }
  return params;
}

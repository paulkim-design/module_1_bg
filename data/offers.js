// Source: input/overview.png — 10 cards in the "Buchbare Angebote" grid
// (Schulklassen) plus 2 more cards in the later "Klein, aber oho …" section
// (Kita-Gruppen), 12 offers total. Missed the Kita section in the first pass
// over this screenshot; caught before Stage 2 wiring since the brief asked
// for a "Kita" filter value that would otherwise have had zero real matches.
//
// Cost and duration are shown on the Angebot detail page, not on the overview
// card, so they are only known for offers we also have real detail-page facts
// for: "ueberblicksfuehrung-josef-kaiser" (input/detail.png) and
// "ueberblicksfuehrung-aufbruch-in-die-moderne" (its live offer page, given
// directly, not from a screenshot in input/ — see its own comment below).
// Every other offer's cost/duration is null per Claude.md ("never invent
// offers or facts").
//
// gradeBand.raw preserves the exact copy from the screenshot (spacing around
// the en dash is inconsistent in the source itself, e.g. "7–13" vs "7 – 13").
// gradeBand.min/max is a parsed version for filter/URL logic (?klasse=5): a
// single grade N matches when min <= N <= max. gradeBand.kita is true only
// for the 2 offers explicitly worded "für Kita-Gruppen" — it is never
// inferred for a Schulklassen offer, even one with no stated grade band.
//
// durationMinutes is parsed from a known duration string ("60 oder 90
// Minuten" -> [60, 90]) for the Dauer filter; null where duration itself is
// null, meaning "unknown", not "any".
//
// outcomes ("Was Ihre Klasse mitnimmt" on offer.html): per the brief, this
// is not written per offer — every offer uses the same bracketed draft
// placeholder (see components/OfferCard and components/OfferDetail), kept
// out of this file entirely since it isn't offer-specific data. The one
// exception is "ueberblicksfuehrung-dauerausstellung", which got real draft
// outcome text from the Figma offer-page mockup (node 10-406) — stored here
// since it IS offer-specific, still data-draft on screen (Bildungsteam copy,
// unconfirmed).
//
// longDescription (the "Berlin sehen. Kunst verstehen."-style body copy on
// offer.html): same situation — no source for 11 of the 12 offers, so no
// field at all for those; only the Dauerausstellung mockup supplied real
// draft prose, stored here.
//
// Fields marked assumed: true were not visible in the screenshots and are
// draft inferences, not sourced copy or data.

export const offers = [
  {
    id: "ueberblicksfuehrung-josef-kaiser",
    format: "Führung",
    title: "Überblicksführung",
    description:
      'zur Ausstellung „Josef Kaiser. Bauen für die DDR“ für Schulklassen (Klasse 7–13)',
    exhibition: "Josef Kaiser. Bauen für die DDR",
    gradeBand: { raw: "Klasse 7–13", min: 7, max: 13, kita: false },
    duration: "60 oder 90 Minuten",
    durationMinutes: [60, 90],
    cost: "50 Euro/60 Minuten oder 75 Euro/90 Minuten",
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/ueberblicksfuehrung-josef-kaiser.jpg",
      alt: "Café Moskau Pavillon, Berlin",
      credit: "Schnepp Renou, Café Moskau Pavillon, 2026, © Schnepp Renou",
      assumed: false,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    // Real, sourced body copy for this offer's description section
    // (offer.html) - visible in input/detail.png below the figure, but
    // missed when offer-detail.js was rebuilt for Stage 5 (it only carried
    // over the short card-style `description` above, not this longer
    // prose). Given directly, not re-transcribed from the screenshot crop,
    // so dates/exhibition title are trusted as given. Not data-draft: this
    // is the same kind of real, sourced copy as the rest of this offer's
    // facts, not new/unconfirmed content.
    longDescription: {
      heading: null,
      paragraphs: [
        'Die Überblicksführung gibt einen Einblick in die Ausstellung „Josef Kaiser. Bauen für die DDR“ (28.8. bis 1.2.27) in der Berlinischen Galerie.',
        "Josef Kaiser (1910–1991) zählt zu den prägenden Architekten der DDR. Zwischen 1950 und 1984 war er federführend an zahlreichen, überwiegend repräsentativen Staatsbauten beteiligt. Internationale Beachtung fanden seine modernen Entwürfe an der Berliner Karl-Marx-Allee, die als Ausdruck des kulturellen Selbstverständnisses der DDR galten. Viele seiner Bauten, darunter das ikonische Kino International, stehen heute unter Denkmalschutz. Die Ausstellung zeigt erstmals Leben und Werk anhand von Zeichnungen, Collagen, Fotografien, Filmen sowie Modellen und beleuchtet politische und ästhetische Spannungsfelder. Zeitgenössische Positionen eröffnen neue Perspektiven auf sein Erbe als Teil deutsch-deutscher Baugeschichte.",
      ],
      draft: false,
      source: "detail.png (given directly, 2026-10-09)",
    },
    _dataSource: "overview.png + detail.png",
  },
  {
    id: "themenfuehrung-neue-sachlichkeit",
    format: "Führung",
    title: "Themenführung: Neue Sachlichkeit",
    description: 'Führung in der Dauerausstellung „Kunst in Berlin 1880 – 1980“',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: null, min: null, max: null, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/themenfuehrung-neue-sachlichkeit.jpg",
      alt: "Gemäldeporträt eines Mannes im Anzug mit Nelke",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "ueberblicksfuehrung-dauerausstellung",
    format: "Führung",
    title: "Überblicksführung: Dauerausstellung",
    description:
      'Führung in der Dauerausstellung „Kunst in Berlin 1880 – 1980“ für Schulklassen (Klasse 1–13)',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Klasse 1–13", min: 1, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/ueberblicksfuehrung-dauerausstellung.jpg",
      alt: "Abstraktes Gemälde in Blau- und Schwarztönen",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    // Real draft copy from the Figma offer-page mockup (node 10-406), which
    // modelled this exact offer. The mockup's grade band ("Klasse 6–13") and
    // duration/cost conflicted with the real data above and were NOT taken
    // over (see README) — only this outcome text and the prose below were,
    // since both are new Bildungsteam-style copy with no other source.
    outcomes: {
      items: [
        "Kunstwerke aufmerksam betrachten und eigene Beobachtungen formulieren",
        "Berliner Geschichte anhand von Kunst aus 100 Jahren einordnen",
        "Unterschiedliche Perspektiven diskutieren und begründen",
      ],
      source: "Figma-Mockup (node 10-406)",
    },
    longDescription: {
      heading: "Berlin sehen. Kunst verstehen.",
      paragraphs: [
        "Die Überblicksführung führt Ihre Klasse durch 100 Jahre Kunst und Geschichte in Berlin. Gemeinsam betrachten die Schüler*innen ausgewählte Werke aus Malerei, Grafik, Fotografie und Architektur.",
        "Fragen und Beobachtungen der Gruppe stehen im Mittelpunkt. Die Führung verbindet die Werke mit dem Alltag der Schüler*innen und schafft Raum für unterschiedliche Sichtweisen.",
      ],
      draft: true,
      source: "Figma-Mockup (node 10-406)",
    },
    _dataSource: "overview.png",
  },
  {
    id: "projekttag-sei-forsch",
    format: "Workshop",
    title: 'Projekttag: „Sei forsch!“',
    description:
      'Projekttag zu der Ausstellung „Lovis Corinth. Dann kam Berlin!“ (Klasse 3 – 13) ab 9.10.',
    exhibition: "Lovis Corinth. Dann kam Berlin!",
    gradeBand: { raw: "Klasse 3 – 13", min: 3, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: { raw: "ab 9.10.", iso: "2026-10-09", yearAssumed: true },
    image: {
      present: true,
      src: "assets/offers/projekttag-sei-forsch.jpg",
      alt: "Gemäldeporträt eines Mädchens mit weißem Kopftuch",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "kunststile-kompakt-neue-sachlichkeit",
    format: "Führung",
    title: "Kunststile kompakt: Neue Sachlichkeit",
    description: "Führung für Schulklassen (Klasse 7 – 13)",
    exhibition: null,
    gradeBand: { raw: "Klasse 7 – 13", min: 7, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/kunststile-kompakt-neue-sachlichkeit.jpg",
      alt: "Stillleben mit Orangen auf einem Teller",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "projekttag-ein-unendliches-spielfeld",
    format: "Workshop",
    title: 'Projekttag: „Ein unendliches Spielfeld“',
    description:
      'Projekttag zur Dauerausstellung „Kunst in Berlin 1880 – 1980“ (Klasse 1 – 3)',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Klasse 1 – 3", min: 1, max: 3, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/projekttag-ein-unendliches-spielfeld.jpg",
      alt: "Farbenfrohes kubistisch-futuristisches Gemälde mit Schriftfragmenten",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "workshop-monsterjagd-schulklassen",
    format: "Workshop",
    title: "Monsterjagd",
    description:
      'Projekttag zur Dauerausstellung „Kunst in Berlin 1880 – 1980“ für Schulklassen (Klasse 1 – 6)',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Klasse 1 – 6", min: 1, max: 6, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/workshop-monsterjagd.jpg",
      alt: "Bastelfigur aus Konservendosen, wie ein kleiner Roboter",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "workshop-surprise-me",
    format: "Workshop",
    title: "Surprise me",
    description:
      'Projekttag zur Dauerausstellung „Kunst in Berlin 1880 – 1980“ für Schulklassen (Klasse 3 – 13)',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Klasse 3 – 13", min: 3, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/workshop-surprise-me.jpg",
      alt: "Kinderhände beim Zeichnen mit Stiften auf Papier",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "ueberblicksfuehrung-lovis-corinth",
    format: "Führung",
    title: "Überblicksführung: Lovis Corinth",
    description: "Führung für Schulklassen (Klasse 7–13) ab 9.10.",
    exhibition: "Lovis Corinth. Dann kam Berlin!",
    gradeBand: { raw: "Klasse 7–13", min: 7, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: { raw: "ab 9.10.", iso: "2026-10-09", yearAssumed: true },
    image: {
      present: true,
      src: "assets/offers/ueberblicksfuehrung-lovis-corinth.jpg",
      alt: "Selbstporträt von Lovis Corinth mit Schnurrbart und Palette",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "ueberblicksfuehrung-aufbruch-in-die-moderne",
    format: "Führung",
    title: "Überblicksführung: Aufbruch in die Moderne",
    description: "Führung für Schulklassen (Klasse 6–13)",
    exhibition: null,
    gradeBand: { raw: "Klasse 6–13", min: 6, max: 13, kita: false },
    // Not from an input/ screenshot: given directly as real values from this
    // offer's own live page (the catalogue-target.png mockup's "60/90 Min.,
    // 50/75 €, Deutsch/Englisch/Französisch" filler text, shown on the wrong
    // example card there, actually came from here). durationMinutes keeps
    // the existing [60, 90] convention for the Dauer filter.
    duration: "60 oder 90 Minuten",
    durationMinutes: [60, 90],
    cost: "50 Euro/60 Minuten oder 75 Euro/90 Minuten",
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/ueberblicksfuehrung-aufbruch-in-die-moderne.jpg",
      alt: "Farbenfrohes expressionistisches Gemälde einer Straßenszene mit Straßenbahnen",
      credit: null,
      assumed: true,
    },
    // language.value/the Sprache filter facet stay untouched (still "de"
    // only, matching the existing de/en-only facet) - this offer's actual
    // 3-language support is display-only, surfaced through the separate
    // languageDisplay field below rather than changing what the filter can
    // match, since extending that would mean inventing a "Französisch"
    // filter option nothing else in the data model supports. See README.
    language: { value: "de", assumed: true },
    languageDisplay: "Deutsch, Englisch, Französisch",
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png; duration/cost/languageDisplay from this offer's live page (given directly, 2026-10-09)",
  },
  {
    id: "workshop-drachensachen-kita",
    format: "Workshop",
    title: "Drachensachen",
    description:
      'Projekttag zur Dauerausstellung „Kunst in Berlin 1880 – 1980“ für Kita-Gruppen',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Kita-Gruppen", min: null, max: null, kita: true },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/workshop-drachensachen-kita.jpg",
      alt: "Kind spielt mit Schattenfiguren an einem Tageslichtprojektor",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
  {
    id: "workshop-monsterjagd-kita",
    format: "Workshop",
    title: "Monsterjagd",
    description:
      'Projekttag zur Dauerausstellung „Kunst in Berlin 1880 – 1980“ für Kita-Gruppen',
    exhibition: "Kunst in Berlin 1880 – 1980",
    gradeBand: { raw: "Kita-Gruppen", min: null, max: null, kita: true },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/workshop-monsterjagd-kita.jpg",
      alt: "Kita-Kinder basteln gemeinsam an einem Tisch",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    languageDisplay: null,
    registration: "Museumsdienst Berlin",
    outcomes: null,
    longDescription: null,
    _dataSource: "overview.png",
  },
];

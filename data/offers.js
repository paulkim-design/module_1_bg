// Source: input/overview.png — 10 cards in the "Buchbare Angebote" grid
// (Schulklassen) plus 2 more cards in the later "Klein, aber oho …" section
// (Kita-Gruppen), 12 offers total. Missed the Kita section in the first pass
// over this screenshot; caught before Stage 2 wiring since the brief asked
// for a "Kita" filter value that would otherwise have had zero real matches.
//
// Cost and duration are shown on the Angebot detail page, not on the overview
// card, so they are only known for the one offer we also have a detail
// screenshot for (input/detail.png, "ueberblicksfuehrung-josef-kaiser").
// Every other offer's cost/duration is null per Claude.md ("never invent
// offers or facts"), to be filled once that offer's own detail page exists.
//
// gradeBand.raw preserves the exact copy from the screenshot (spacing around
// the en dash is inconsistent in the source itself, e.g. "7–13" vs "7 – 13").
// gradeBand.min/max is a parsed version for filter/URL logic (?klasse=5): a
// single grade N matches when min <= N <= max. gradeBand.kita is true only
// for the 2 offers explicitly worded "für Kita-Gruppen" — it is never
// inferred for a Schulklassen offer, even one with no stated grade band.
//
// durationMinutes is parsed from the one known duration string ("60 oder 90
// Minuten" -> [60, 90]) for the Dauer filter; null where duration itself is
// null, meaning "unknown", not "any".
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
    _dataSource: "overview.png",
  },
  {
    id: "ueberblicksfuehrung-aufbruch-in-die-moderne",
    format: "Führung",
    title: "Überblicksführung: Aufbruch in die Moderne",
    description: "Führung für Schulklassen (Klasse 6–13)",
    exhibition: null,
    gradeBand: { raw: "Klasse 6–13", min: 6, max: 13, kita: false },
    duration: null,
    durationMinutes: null,
    cost: null,
    availableFrom: null,
    image: {
      present: true,
      src: "assets/offers/ueberblicksfuehrung-aufbruch-in-die-moderne.jpg",
      alt: "Farbenfrohes expressionistisches Gemälde einer Straßenszene mit Straßenbahnen",
      credit: null,
      assumed: true,
    },
    language: { value: "de", assumed: true },
    registration: "Museumsdienst Berlin",
    _dataSource: "overview.png",
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
    registration: "Museumsdienst Berlin",
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
    registration: "Museumsdienst Berlin",
    _dataSource: "overview.png",
  },
];

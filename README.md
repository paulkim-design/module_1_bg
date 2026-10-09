# Berlinische Galerie: school offers prototype

See `Claude.md` for brief, flow and rules.

## Status

**Stage 1**: `data/offers.js`, `tokens.css`.

**Stage 2**: page shell (`components/SiteHeader`, `components/SiteFooter`)
and the catalogue screen (`angebote.html` + `angebote.js`), with a working
filter (`components/FilterPanel`), offer cards (`components/OfferCard`), and
URL state.

**Stage 3**: the offer detail screen (`offer.html` + `offer.js` +
`components/OfferDetail`), reading `?id=`, plus `components/Link` (the one
design-system component that had zero gaps — Button and Checkbox didn't get
that lucky).

**Stage 4**: `bildung.html` + `bildung.js` rebuilds the whole Bildung page
from `input/bildung.png` (not just an excerpt, unlike Stage 2/3's narrower
scope), with the new `EntryModule` ("Für Schulklassen", grade links), plus
`AudienceCard`, `NewsletterBanner`, `FeatureCard`, `EventListItem` for the
page's existing sections. `index.html` links all three screens, and the
full flow (bildung → filtered catalogue → offer → back to the same filtered
catalogue) is verified end to end. See "Entry module placement" below for
where it went and why.

**Correction while starting Stage 2**: re-checking `overview.png` for the
Klassenstufe/Kita facet turned up 2 offer cards in its later "Klein, aber
oho …" section (`workshop-drachensachen-kita`, `workshop-monsterjagd-kita`)
that Stage 1 missed by only reading the "Buchbare Angebote" grid. `offers.js`
now has all 12. Also renamed the Schulklassen `workshop-monsterjagd` offer to
`workshop-monsterjagd-schulklassen` to disambiguate it from the Kita one that
shares its title but not its image, grade band, or audience.

**Correction after Stage 2's first pass**: the first version of the filter
made a checked box that couldn't safely be unchecked render as "locked on"
(greyed out, still checked). That's new behaviour `filter.png` never shows -
every checked box in it (Führung, Josef Kaiser) renders perfectly normally -
and it broke "a teacher can always uncheck their own selection." Re-checked
`filter.png` directly for single- vs multi-select: every option is a square
checkbox, never a radio circle, and an enabled-but-unchecked option
("Kurator*innenführungen") sits right next to a checked one in the same
facet - that's multi-select. Fixed to match: unchecking is now always
allowed and only ever disables other, still-unchecked options; on the rare
uncheck that would otherwise empty the results, the conflicting facet is
cleared automatically and a short note says so. Detail under Catalogue +
filter below.

## Gaps

Found while extracting `tokens.css` and `data/offers.js`. Per `Claude.md`,
nothing below was invented — where the source was silent or inconsistent,
the closest existing token was used and flagged here instead.

### Design system (`input/design-system.html`)

- **No primary button.** The scrape only measured four Button variants —
  Secondary, Tertiary, Tertiary 2, Tertiary 3 — none labelled Primary. The
  `color-action` / `color-on-action` role pair (`#FFFFFF` / `#000000`) that
  would back a primary button is literally unusable as a fill: the
  Accessibility table measures it at 1:1 contrast on the white page
  background ("Fail"). Every CTA in this prototype (filter apply, offer
  registration link, etc.) needs a button style that isn't in the source yet.
- **`color-negative` (`#FF6347`, "Errors") fails AA as text**, 2.9:1 on white.
  If we need error/warning text, it should sit on a filled chip/background,
  not stand alone in this colour, until the agency confirms otherwise.
- **No semantic name for the red used in Tertiary buttons and the site's red
  banners (`#E30613`, red-500).** Tokenised here as `--color-accent` — a
  reasonable guess, not a confirmed design-system role.
- **Only 1 of 2 corner radii is in the measured Shape table** (`57.6px`).
  The Usage rules prose separately states "Cards use 50% corners" — tokenised
  as `--radius-full: 50%`, but it never went through the same measurement as
  the rest of the system.
- **`icomoon` is an icon font, not a second typeface.** It's measured as the
  font for `type-headline-small` (24px, Regular), which is almost certainly
  the scraper catching an icon glyph instead of heading text. `tokens.css`
  falls back to the body typeface (HN) at the same size/weight pending a
  real sample of that heading on the live site.
- **Spacing has no consistent grid** — 31 raw values from 2px to 175px, kept
  as given (`--space-1` … `--space-31`).
- **Motion count mismatch**: the source labels this "7 transitions" / "7
  declarations" but only lists 6 `<code>` values. Tokenised the 2 distinct
  durations found (`0.15s`, `0.175s`) and the 1 easing (`ease-out`); the
  7th declaration is simply missing from the source.
- **No documented styles at all** for: card/teaser container, chip/tag/badge,
  checkbox, fieldset/legend, filter panel chrome, icon-only button (the
  detail page's circular "back to top" button), or focus/hover/disabled
  states beyond what's noted per button/link variant. These will need to be
  designed with restraint from the primitives we do have (colour, type,
  radius) rather than invented wholesale — flagging now so Stage 2/3 doesn't
  silently paper over it.

### Offer data (`input/overview.png`, `input/detail.png`)

- **Cost and duration are only known for 1 of 10 offers**
  (`ueberblicksfuehrung-josef-kaiser`, cross-checked against
  `input/detail.png`, its matching offer page). The overview cards never
  show cost/duration — that's offer-page-only content per the brief's flow —
  so the other 9 are `null` until their own detail pages are captured.
- **One card has no grade band at all**: "Themenführung: Neue Sachlichkeit"
  says only "Führung in der Dauerausstellung …", no `(Klasse …)` suffix.
  Left `null` rather than assumed.
- **Grade-range dash spacing is inconsistent in the source itself** — some
  cards read "Klasse 7–13" (no spaces), others "Klasse 7 – 13" (spaced). Kept
  verbatim per card rather than normalised, since `Claude.md` asks to keep
  existing copy as-is; worth double-checking against the live page at full
  resolution before this copy is locked, since it was transcribed from a
  screenshot.
- **Language is assumed, not shown.** Nothing on the overview cards states a
  language; every offer is marked `language: { value: "de", assumed: true }`
  on the reasonable assumption that the default catalogue is German (the
  `input/filter.png` facet list has a separate, unchecked "Angebote in
  englischer Sprache" option, implying German is the un-flagged default).
- **"ab 9.10." availability dates assume the year 2026.** Two offers
  (`projekttag-sei-forsch`, `ueberblicksfuehrung-lovis-corinth`) show
  "ab 9.10." with no year. `design-system.html`'s own capture metadata puts
  the scrape at "8 Oct 2026", one day before, which is the only reason 2026
  is a safe inference here — flagged (`yearAssumed: true`) rather than
  stated as fact.
- **Image alt text is drafted, not sourced**, for 11 of 12 offers (marked
  `image.assumed: true`) — screenshots don't carry alt text, so these are
  our best-guess descriptions of what's visible, to be reviewed once real
  images are in place. Images themselves (`assets/offers/*.jpg`) are now
  cropped straight from `overview.png` (column/row bounds found by scanning
  pixel brightness rather than eyeballed, then spot-checked visually).
- **Two offers share the title "Monsterjagd"** (one Schulklassen, one Kita) —
  real, not a dedup bug: different image, different audience line, presumably
  the same workshop concept pitched twice. Kept as two offers; see the
  correction note above.

### Catalogue + filter (Stage 2)

- **No primary button in the source (gap above) blocked the Filter toggle
  and the "back to top" button.** Both reuse the Button/Secondary styling
  (`components/Button/button.css`) as a generic actionable button rather than
  inventing a new style. Treat this as provisional, same as the token itself.
- **Checkbox and fieldset/legend have zero precedent in design-system.html**
  (it only measured Button/Link/Navigation). `components/Checkbox` approximates
  `input/filter.png`'s look (square, solid-black when checked) using only
  tokens we already have; the muted/disabled state uses opacity on
  `--color-text` rather than a new grey, since no muted-text colour is in the
  source either.
- **The filter panel's own chrome (width, border, overlay-vs-inline) has no
  screenshot precedent** — `filter.png` shows only the fieldset content, not
  how the panel sits on the page. Built as a plain bordered sidebar that
  pushes the grid over when open, rather than inventing a modal/drawer with
  shadows and backdrops the source never showed.
- **Unchecking is always allowed; only unchecked options are ever greyed
  out.** `filter.png` confirms this is genuine multi-select (square
  checkboxes throughout, an enabled-but-unchecked option sitting next to a
  checked one in the same facet, never a radio circle), and every checked
  example in it renders perfectly normally — so a checked box is never
  disabled, full stop (`isOptionDisabled` in `filter-logic.js` returns
  `false` immediately for anything already checked).
- **When an uncheck would otherwise empty the results, the conflicting
  facet is cleared instead of refusing the uncheck**, with a short note
  (`components/FilterPanel/filter-panel.js`'s `buildNoticeText`, new copy,
  `data-draft`) explaining what happened. E.g. with Format = {Führung,
  Workshop} and Dauer = 90 (the one offer with a known 90-minute duration is
  a Führung), unchecking Führung leaves Format={Workshop} + Dauer=90 with
  zero matches — so Dauer gets cleared automatically and the teacher sees
  "Der Filter „Dauer" wurde zurückgesetzt, weil sonst keine Angebote mehr
  passen würden." `applyToggle` picks the smallest fix: it tries clearing
  each *other* non-empty facet alone first, in a fixed priority
  (`dauer, sprache, format, klasse` — grade level is least likely to be
  what a teacher wants sacrificed, so it's tried last), only falling back to
  clearing more than one. The facet being edited is itself a candidate too:
  unchecking "Deutsch" while "Englisch" was also checked leaves Sprache at
  just {Englisch}, which matches nothing on its own (same reason Englisch is
  disabled for checking in the first place) — clearing Sprache itself is
  then correctly the fix, not some unrelated facet. Verified with a
  50,000-run randomised test (steps that only ever check non-disabled
  options or uncheck anything, 3M+ toggles total): never once blocked an
  uncheck, never once landed on zero results.
- **Kita and Englisch are real, data-backed facet values that will often show
  disabled.** Kita has exactly 2 offers (both freshly added, see correction
  above) and Englisch has 0 — `filter.png`'s own mock already shows an
  "Angebote in englischer Sprache" checkbox greyed out, so a permanently (or
  near-permanently) disabled Englisch option is the faithful result of our
  data, not a bug to paper over.
- **Dauer only has 2 real values (60 / 90 Minuten)**, both from the single
  offer that has a known duration. Every other offer's `durationMinutes` is
  `null`, so checking either Dauer box currently narrows the catalogue to
  that one offer (or fewer) — again, accurate to what we actually know, not
  a bug.
- **Header/footer icons (Leichte Sprache, DGS, Kontrast, social links) are
  rendered by an icon font we don't have the glyphs for** (see the `icomoon`
  gap above) — shown as plain text links instead of invented icon shapes.
- **Scope cut**: `angebote.html` reproduces the hero (H1 + lede), the filter,
  and the offer grid, but not the rest of `overview.png`'s marketing content
  (the hero photo, in-page jump nav, "Schule des Sehens" intro, Lehrer*innen-
  empfang, the Kita-Newsletter sections, "Was siehst Du?", or the Kontakt
  block). Stage 2's brief was the catalogue and its filter, not a full page
  rebuild — flagging so this isn't mistaken for an oversight.

### Offer detail page (Stage 3)

- **No format eyebrow on this page.** The catalogue card shows "Führung" /
  "Workshop" above the title; re-checked `detail.png` specifically for this
  before building the template, and its H1 has no such label above it —
  just the heading, then the dek line straight away. Not reproduced here.
- **The grade fact line doesn't literally match `detail.png`'s wording,
  on purpose.** The one detail page we have phrases it as a sentence, "Für
  Schüler*innen ab 7. Klasse" — dropping the upper bound entirely, because
  that offer's band happens to run to Klasse 13 (the highest grade), so
  "ab 7." reads as open-ended. That phrasing would misstate a band that
  doesn't reach 13 (e.g. Monsterjagd, Klasse 1–6, would wrongly read as
  "ab 1." with no sense of a ceiling). Used a plain "Klassenstufe: {range}"
  label instead, uniformly across all 12 offers, trading one offer's exact
  copy for a template that can't misrepresent the other 11. The label itself
  is new copy (`data-draft`); the range value is the same sourced
  `gradeBand.raw` already used on the card.
- **No real URL for either external link.** "Museumsdienst Berlin" links to
  `mailto:museumsdienst@kulturprojekte.berlin` — real, sourced from the
  Kontakt block further down `overview.png` (not invented, just not used
  until now) — rather than a bare `#`, since we do have a genuine contact
  route even without a booking-system URL. "Besuch › Tickets" has no
  equivalent sourced contact, so it's `href="#"`, matching the placeholder
  pattern already used for every other not-yet-real link in the header/footer.
  Both still carry `target="_blank" rel="noopener"` per the brief.
- **"Was Ihre Klasse mitnimmt" and "Gruppenbesuch" are entirely new content**
  (no screenshot has either) — marked `data-draft` throughout, with the
  outcomes section additionally carrying the exact visible label the brief
  specified ("Entwurf: Text kommt vom Bildungsteam"). The 3 outcome bullets
  are literal `[Platzhalter]`, not invented placeholder sentences.
- **"Für die Schulleitung" and the back-link are *not* marked draft**, unlike
  the two sections above — deliberately. The brief specifies their exact
  copy ("Als PDF drucken", "Link kopieren") as functional requirements, not
  content awaiting a team's sign-off, and only explicitly asked for the
  outcomes/group-visit sections to be marked. Treated as settled UI chrome,
  consistent with how Stage 2 left its own functional labels (the Filter
  button, "Nach oben") unmarked while still flagging informational labels
  like fieldset legends as draft.
- **The print stylesheet renders a separate, purpose-built summary block**
  rather than hiding/showing pieces of the on-screen layout — simpler and
  more reliable for "produces a one-page summary" than fighting the screen
  layout into a print shape. Verified with a real `--print-to-pdf` render:
  one page, all seven required fields (title, grade, duration, cost,
  outcomes, booking route, address), header/footer/nav/buttons/image
  correctly absent.
- **The back-link's filter round-trip required a small Stage 2 change**:
  `OfferCard` now takes the catalogue's current filter query string and
  appends it to each card's `href` (`offer.html?id=X&klasse=5`), so
  `offer.html` can read everything *except* `id` back out and rebuild
  `angebote.html?klasse=5` for "Zur Übersicht". Verified end to end (set a
  filter, click a card, confirm the back-link href) rather than assumed.

### Entry module placement (Stage 4)

`Claude.md`'s flow names an "Entry module 'Für Schulklassen' with grade
links" as screen 1. `bildung.png` doesn't show this module either — same gap
flagged after Stage 3 — but it does show exactly one audience-specific
section: "Angebote vor Ort", a 4-card carousel (Schulen und Kitas / Familien
und Kinder / Jugendliche und Erwachsene / Menschen mit Behinderungen). That's
the "audience section for schools" the brief's placement rule points to, so
`EntryModule` sits directly after that carousel - a teacher sees it right
after the first (and only) mention of their audience, before any of the
page's other content (Nächste Termine, Outreach, Atelier Bunter Jakob,
207 m²), not scrolled past it.

Reuse, per the brief's requirement: the heading uses the same
`.section-heading` style as every other section on this rebuilt page
(`bildung.css`, underlined, same size), so it reads as one more section
among equals rather than an inserted widget. Each grade link reuses
`components/Link` - the one design-system component with a real measured
source - instead of inventing a chip/tag/pill style the system never
documented. New styling this needed, and nothing else: `.entry-module__grades`,
a flex-wrap row for 14 links, with gaps from existing spacing tokens.

The grade values (`kita`, `1`–`13`) match `filter-logic.js`'s own facet
values exactly, so `angebote.html?klasse=5` is read by the exact same
`selectionFromSearchParams()` the catalogue's filter panel already uses -
confirmed by checking the catalogue's result count and card hrefs after
following the link, not just by reading the code.

All of this module's copy is `data-draft`: the heading "Für Schulklassen" is
`Claude.md`'s own name for the module, not sourced from a screenshot either,
and the intro line is new. Marked per the brief's explicit instruction, same
treatment as everything else not traced from a screenshot.

### Rebuilding bildung.html (Stage 4)

- **A real Chromium rendering bug, found while verifying the audience
  carousel, not assumed away.** The first `AudienceCard` build re-cropped
  the 4 photos to exclude their baked-in labels and rebuilt the label as a
  real text layer (CSS gradient + absolutely positioned text) over the
  photo - more correct structurally, but it reliably painted a faint ghost
  duplicate of the label text just past the card's bottom edge in this
  environment's headless Chrome. Isolated it to a 4-line minimal
  reproduction (a plain photo + `overflow:hidden` + absolutely positioned
  text, no other CSS involved) that reproduced identically in old and new
  headless modes and in `--print-to-pdf`; confirmed via the PDF's extracted
  text layer and a `* { outline }` sweep that the text itself was never
  duplicated in the DOM, only the paint - meaning the underlying markup was
  correct and this was the renderer, not the component. Rather than ship
  something unverifiable, `AudienceCard` keeps the label baked into the
  image (full crop, as the screenshot has it) with real `alt` text instead,
  which sidesteps the whole class of bug. Documented in
  `components/AudienceCard/audience-card.css` in case this surfaces again.
- **The circular red "Newsletter" badge is page-specific, not shared
  chrome.** Checked the same header region on `overview.png` and
  `detail.png` - absent on both - so it's additive CSS scoped to
  `bildung.html` (`bildung.css`'s `.newsletter-badge`) rather than a change
  to `components/SiteHeader`, which Stage 2/3 pages still load unchanged.
  Its circular-path label text is approximated as plain centred text.
- **The small round "zoom" icon on several photos** (Outreach, Atelier,
  207 m²) is reproduced visually (a `.zoom-affordance` CSS affordance) with
  no lightbox wired up - out of scope for a look-and-feel prototype.
- **The audience carousel's prev/next arrows are inert.** All 4 audience
  segments already fit the grid, and nothing in `bildung.png` suggests more
  exist off-screen to page through - wiring a scroll action would be
  motion without a destination.
- **"207 m²" is a separate, smaller eyebrow line above the "Raum für Aktion
  und Kooperation" heading, not one heading wrapping onto two lines** -
  re-checked the screenshot closely after the first pass rendered them at
  the same size and overlapping: the two lines have their own independent
  underlines at different sizes in the source.
- A handful of photos this stage needed (3 Outreach, 2 Atelier, 3 in the
  207 m² section, 2 in the hero/intro row) were cropped the same
  pixel-brightness-detection way as Stages 1–3's offer images, each
  spot-checked visually after cropping.

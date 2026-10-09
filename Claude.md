# Berlinische Galerie: school offers prototype (proof of concept)

## Context

The Berlinische Galerie (Berlin museum of modern art, photography and architecture)
offers bookable tours and workshops for school classes. They exist only on the German
site, five clicks deep, in a catalogue not ordered by grade, and no offer says what
pupils get out of it. The user is a teacher who checks quickly whether an offer fits
their class and needs enough to get the visit approved by their headteacher. If that
takes more than a few minutes, they pick an easier venue.

This prototype is a proof of concept for look and feel, desktop only (min. 1280px),
German. It extends the existing site built by the agency 3pc on TYPO3 and must look
like part of that site, not a new design. Later the code will be rebuilt in Figma
through the Figma MCP, so structure matters as much as appearance.

## Inputs

- [./input/overview.png]: current catalogue page "Angebote für Schulen und Kitas"
- [./input/filter.png]: current Programme filter panel
- [./input/detail.png]: current offer page (Angebot)
- [./input/design-system.html]: the ONLY source for colours, type, spacing, radii and
  component styles. Never invent values. If something is missing, use the closest
  existing token and add it to "Gaps" in README.md.

## Flow

1. Entry module "Für Schulklassen" with grade links → 2. Catalogue with working
   filter → 3. Offer page with outcomes, group visit info and forwarding actions.

## Technical setup

- Plain HTML, CSS, JS. No framework, no build step.
- tokens.css: every design-system value as a CSS variable with semantic names
  (--color-text-primary, --space-4, --font-size-heading-2 ...). No hard-coded values
  in component CSS.
- One component per section: components/<Name>/<name>.css (+ .js if needed).
  Component names as they would be named in Figma. BEM class names that match.
- Offer data lives in data/offers.js.
- State lives in URL parameters (?klasse=5, ?id=...).

## Rules

- Do not redraw or alter the logo. Crop it from a screenshot if possible, otherwise
  use a box labelled "Logo".
- All copy is draft. Keep existing copy from the screenshots; mark new copy with a
  data-draft attribute and a subtle visual marker.
- Never invent offers or facts. Unknown values: null, displayed as "[Platzhalter]".
- German with proper umlauts (ä, ö, ü, ß), never ae/oe/ue. No em dashes anywhere.
- Accessibility baseline: semantic HTML, fieldset and legend per facet, disabled
  options keyboard-safe, visible focus states.
- Work only on the current stage. Don't build ahead.

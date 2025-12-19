# studiio brochure site

A multi-page, zero-dependency brochure for studiio (studi.io). Built with pure HTML, modern CSS, and vanilla JS only—open `index.html` directly or serve with Python.

## Run locally
- **Option A:** double-click `index.html`.
- **Option B:** `python -m http.server 8080` then visit `http://localhost:8080`.

## Accessibility & motion
- Semantic landmarks, skip link, focus-visible styles, and legible contrast throughout.
- `prefers-reduced-motion` simplifies animations automatically; a debug toggle in the code lets you force reduced motion by clicking the developer control when present.
- Keyboard-friendly navigation and placards; forms have client-side validation.

## Design system
- Typography: Bodoni Moda (display), Inter (UI), IBM Plex Mono (labels).
- Colors via CSS variables: ink `#0b0b0e`, paper `#fcfbf8`, accents (acid green, electric blue, hot coral) with per-universe overrides.
- Components live in `css/components.css`; animations in `css/animations.css`; tokens in `css/tokens.css`.

## Delightful moments
1. Museum placards: cards reveal placard captions on hover/focus.
2. Signature seal: hover/scroll activates the “CANON” seal.
3. Ink-bloom: headers use subtle radial blooms behind text.
4. Archive mode: click the logo 5x to densify grids and show catalog vibes.
5. Opulence mode: type `RUNWAY` to trigger a foil-forward palette; use the bubble to exit.
6. Universe motion signatures: WORM uses elastic softness; TARNS uses crisp wipes via CSS timing.
7. Typographic edition numbers: section IDs like `PLAQ/003` mark placards.
8. Scroll reveal choreography: IntersectionObserver staggers `.reveal` elements.
9. Poster wall parallax: universes overview posters tilt to cursor (disabled with reduced motion).
10. Easter egg microcopy: some labels swap to “Add to myth” on hover.
11. Footer wink: hover reveals a hidden monospace whisper.
12. Accessible confetti: contact form fires lightweight paper scraps when submitted.

## Files
- Pages: `index.html`, `universes/`, `authenticity/`, `how-it-works/`, `collaborate/`, `pricing/`, `about/`, `contact/`.
- Assets: custom SVGs in `assets/svg/` (sigils, stamp, textures, icons, OG image).
- Scripts: `js/main.js`, `js/reveal.js`, `js/easter-eggs.js`, `js/form.js`.

All assets are original and vector-based; no external dependencies beyond Google Fonts.

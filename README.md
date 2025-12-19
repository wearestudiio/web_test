# studiio pop-art brochure (static)

This is a zero-dependency, multi-page brochure experience for **studiio (studi.io)** built with pure HTML, modern CSS, and vanilla JS.

## Run it
- **Option A:** open `index.html` directly in your browser.
- **Option B:** serve locally: `python -m http.server 8080` then visit `http://localhost:8080/`.

## Accessibility & motion
- Semantic landmarks, skip link, and visible focus states.
- Responsive layouts from mobile to desktop.
- Respects `prefers-reduced-motion`; reveals and parallax pause automatically. A small debug toggle is present in the footer for testing.

## Design tokens
- Typography: Inter (UI), Bodoni Moda (editorial headings), IBM Plex Mono (labels).
- Colors: paper `#fcfbf8`, ink `#0b0b0e`, accents (`#66ff7f`, `#4c7fff`, `#ff5a8a`) plus per-universe overrides.
- Spacing/Radius/Shadow scales live in `css/tokens.css`.

## Delightful moments
1. Museum placard hover captions on cards and posters.
2. Signature seal hover pulse in authenticity sections.
3. Ink-bloom gradients behind certain headings.
4. Archive mode: click the logo 5× to densify grids + show catalog numbers.
5. Opulence mode: type `RUNWAY` to add foil glow accents; toggle off by repeating.
6. Universe motion signatures: WORM uses elastic easing; TARNS uses crisp wipes.
7. Edition numbers: tiny monospace IDs beside section titles.
8. Scroll reveal choreography via IntersectionObserver (`js/reveal.js`).
9. Poster wall parallax on the Universes page (pauses with reduced motion).
10. Microcopy swap on hover/focus ("Add to canon" → "Add to myth").
11. Footer wink: hover to reveal a hidden line in monospace.
12. Accessible confetti on contact submit (disabled when motion is reduced).

## Notes
All assets are original SVGs located in `assets/svg/`. No external build tools or package managers are required.

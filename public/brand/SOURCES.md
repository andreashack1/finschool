# Fini — Finly brand mascot

Asset: `fini.svg`.
Original vector illustration drawn for this project, not an external stock image.

Character brief: a young friendly lion, calm and confident, blue quarter zip with a quiet F, ivory shirt collar, cream trousers, navy casual shoes, a plain watch and an open explanatory gesture. No physical money or investing symbols.

The requested reference image was not available in the conversation or repository. Two attempts with the built-in image generation tool returned moderation errors and produced no image. The existing native vector mascot component was instead adapted to this original vector asset. No CLI image-generation fallback was used.

The historical coins and banknote decorations have been removed from the landing page.

## Product character system

The native SVG has been refined with a lighter sky blue quarter zip. `scripts/create-fini-variants.cjs` deterministically creates the 18 product assets: head, bust and full body for normal, thinking, correct, wrong, excited and serious expressions. Raised eyebrows, a chin gesture, a quiet fist bump and a celebratory pose distinguish the states. These are original vector edits, with no stock or generated bitmap assets.

Home uses the bust; tips and inline lesson feedback use the head; the salary milestone uses the full character. Golden fur, caramel mane, the distinctive swept tuft and the small embroidered F stay consistent.

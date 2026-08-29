# Mahlin Skincare — Nuxt 3 export

Runnable Nuxt 3 code recreating the 9-page HTML prototype, seeded with the same test data (real product catalogue, prices via the `money()`/`fa()` Persian-numeral helpers, routine, blog posts, FAQ, cart defaults).

## Run it

```
npm install
npm run dev
```

Opens at http://localhost:3000. No backend — cart state is client-side (Nuxt `useState`), checkout/contact forms don't submit anywhere yet.

## What's here

- `data/products.js` — PRODUCTS, CATS, ROUTINE, BLOG, FAQ, reviews, cart defaults, discount/shipping constants — copied verbatim from the DC prototype.
- `utils/format.js` — `fa()` / `money()` Persian-numeral formatters.
- `composables/useCart.js` — cart state (add/remove/qty, subtotal, discount, shipping, grand total).
- `components/` — AppHeader, AppFooter, ProductCard, CategoryIcon (ported 1:1 from the prototype's SVG icon set).
- `pages/` — index (Home), shop/index, product/[id], cart, checkout, journal/index, journal/[slug], about, contact.
- `public/assets`, `public/logo` — the real product photography and lockup files from the prototype.

## Fidelity notes — read before treating this as final

This was built from the prototype's source (colors, fonts, copy, product data extracted directly), not a screenshot. But it is a **structural, not pixel-perfect** port:

- Layout uses Tailwind utilities approximating the prototype's spacing/typography — not a 1:1 CSS transcription of every inline style.
- **About and Contact page copy is NOT ported** — the original prototype's founder bio, brand story, and contact details weren't extracted into this pass. Copy the exact text from `Mahlin Skincare.dc.html`'s About/Contact sections before shipping.
- The routine section's animated SVG arc (moon-phase illustration) was simplified out; only the step list/data survives.
- Reduced-motion handling, scroll-reveal animations, and the mobile filter drawer from the original aren't reimplemented.
- Regulatory-compliance copy (no therapeutic claims) was preserved as-is from the source data — don't re-introduce claims language when filling in About/Contact.

Treat this as a solid functional starting point — verify every page against the live DC prototype and adjust spacing/type/animation to match before handoff to production.

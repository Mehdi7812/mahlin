# Mahlin Skincare

A Nuxt 3 storefront project for the Mahlin skincare brand, built as a front-end prototype based on the original static design and product dataset.

## Stack

- Nuxt 3 / Nuxt 4-compatible setup
- Tailwind CSS
- Pinia
- @nuxtjs/i18n
- @nuxt/icon

## Quick start

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4040
```

If you want the app available on a network interface, use:

```bash
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npm run build
```

Optional static export:

```bash
npm run generate
```

## Project notes

- This project is a front-end storefront; there is no real backend connection.
- Cart behavior is handled client-side and local to the app.
- Checkout and contact forms do not submit to a live API yet.
- Product data, pricing, blog entries, FAQ content, and brand assets are seeded from the prototype dataset.

## Main folders

- `app/` — Vue pages, components, layouts, styles, and app-level assets
- `app/components/` — reusable UI and storefront components
- `app/pages/` — route pages such as home, shop, product, cart, checkout, journal, account, and legal pages
- `app/composables/` — shared logic such as cart state and API helpers
- `app/data/` — static marketplace data and product catalog content
- `app/utils/` — formatting utilities and validation helpers
- `i18n/` — locale files for Persian / English / Arabic
- `public/` — static assets, brand images, and media files

## Important fidelity notes

This is a functional port of the prototype rather than a pixel-perfect reconstruction. Some design details were simplified or intentionally left out during conversion.

- Layout and spacing are approximated with Tailwind utilities, not a 1:1 CSS port.
- About and Contact copy may require final content review against the original prototype before production handoff.
- Some motion and interaction details from the original mockup were simplified.
- The current implementation is intended as a solid frontend foundation, not a final production-complete storefront.

## Repository status

This repository is meant to be used as a runnable prototype and development base for Mahlin skincare storefront work.

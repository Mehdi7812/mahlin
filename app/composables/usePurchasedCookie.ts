// app/composables/usePurchasedCookie.ts
// ─── کوکی «خرید موفق» ──────────────────────────────────────
// بعد از اولین پرداخت موفق (صفحه Receipt) ست می‌شود و تا ۱ سال می‌ماند.
// تا وقتی این کوکی هست، کارت تخفیف خوش‌آمدگویی (PromoCard) دیگر نمایش داده نمی‌شود.

export const PURCHASED_COOKIE_NAME = 'mahlin-purchased'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function usePurchasedCookie() {
  return useCookie<string | null>(PURCHASED_COOKIE_NAME, {
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
    sameSite: 'lax',
    default: () => null,
  })
}

/**
 * مالیات ارزش افزوده کالاهای taxable.
 * هر جا قیمت یک محصول نمایش داده می‌شود، باید از withTax() عبور کند.
 */

export const TAX_RATE = 0.1;

/** فیلد taxable از API ممکن است 1، '1' یا true باشد. */
export function isTaxable(flag: unknown): boolean {
  return Number(flag) === 1;
}

/**
 * اگر taxable باشد قیمت را با ۱۰٪ مالیات برمی‌گرداند (گرد شده)،
 * وگرنه همان قیمت. مقدارهای نامعتبر / صفر دست‌نخورده برمی‌گردند.
 */
export function withTax<T = number | string | null | undefined>(price: T, taxable: unknown): T | number {
  const n = Number(price);
  if (price === null || price === undefined || price === ('' as any) || !Number.isFinite(n) || n <= 0) return price;
  return isTaxable(taxable) ? Math.round(n * (1 + TAX_RATE)) : n;
}

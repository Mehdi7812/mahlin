/**
 * All user-facing numbers, prices and dates go through this module.
 * Never render a raw number in a template.
 *
 * Intl with the fa-IR locale already produces Persian digits and the
 * correct ٬ thousands separator, so no extra dependency is needed.
 */

const FA = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const fa = (n: number | string): string =>
  String(n).replace(/[0-9]/g, (d) => FA[+d]);

export const money = (n: number | null | undefined): string => {
  if (n === null || n === undefined || isNaN(n)) return fa('0');
  return fa(n.toLocaleString('en-US')).replace(/,/g, '٬');
};

const numberFormatter = new Intl.NumberFormat('fa-IR');

const jalaliFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const jalaliShortFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** ۱۲۳۴ → «۱٬۲۳۴» */
export function faNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return '۰';
  return numberFormatter.format(value);
}

/** Converts any Latin digits inside a string to Persian digits. */
export function faDigits(value: string): string {
  return value.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!);
}

/** ۲۹۵۰۰۰ → «۲۹۵٬۰۰۰ تومان» */
export function faPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return '۰ تومان';
  return `${numberFormatter.format(value)} تومان`;
}

/** Price without the currency word, for tight layouts. */
export function faPriceBare(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return '۰';
  return numberFormatter.format(value);
}

/** «۱۴ مرداد ۱۴۰۴» */
export function faDate(input: string | Date | null | undefined): string {
  if (!input) return '';
  return jalaliFormatter.format(new Date(input));
}

/** «۱۴۰۴/۰۵/۱۴» */
export function faDateShort(input: string | Date | null | undefined): string {
  if (!input) return '';
  return jalaliShortFormatter.format(new Date(input));
}

/** «۲۵۰ گرم» / «۱ کیلوگرم» */
export function faWeight(grams: number | null | undefined): string {
  if (grams === null || grams === undefined || isNaN(grams)) return '—';
  return grams >= 1000
    ? `${numberFormatter.format(grams / 1000)} کیلوگرم`
    : `${numberFormatter.format(grams)} گرم`;
}

/** Countdown for the OTP screen: 119 → «۰۱:۵۹» */
export function faCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return faDigits(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
}

/** Per-100g unit price shown on the PDP. */
export function faUnitPrice(
  price: number | null | undefined,
  grams: number | null | undefined
): string {
  if (!price || !grams) return '';
  const per100 = Math.round((price / grams) * 100);
  return `هر ۱۰۰ گرم ${numberFormatter.format(per100)} تومان`;
}

/** Persian digits typed by the user → Latin, for form submission. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}
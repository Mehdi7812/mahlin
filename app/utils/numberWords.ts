/**
 * عدد صحیح → حروف فارسی؛ برای «مبلغ به حروف» روی فاکتور.
 * ۱۰۰۶۵۰۰۰ → «ده میلیون و شصت و پنج هزار»
 */
const ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const TEENS = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
const TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
const HUNDREDS = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
const SCALES = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

function belowThousand(n: number): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) parts.push(HUNDREDS[h]!);
  if (r) {
    if (r < 10) parts.push(ONES[r]!);
    else if (r < 20) parts.push(TEENS[r - 10]!);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      parts.push(o ? `${TENS[t]} و ${ONES[o]}` : TENS[t]!);
    }
  }
  return parts.join(' و ');
}

export function numberToPersianWords(value: number | string | null | undefined): string {
  let n = Math.floor(Math.abs(Number(value)));
  if (!Number.isFinite(n)) return '';
  if (n === 0) return 'صفر';

  const groups: string[] = [];
  let i = 0;
  while (n > 0) {
    const g = n % 1000;
    if (g) {
      // «۱۰۰۰» → «هزار» (نه «یک هزار»)
      const words = i === 1 && g === 1 ? '' : belowThousand(g);
      groups.unshift((words + (SCALES[i] ? ` ${SCALES[i]}` : '')).trim());
    }
    n = Math.floor(n / 1000);
    i++;
  }
  return groups.join(' و ');
}

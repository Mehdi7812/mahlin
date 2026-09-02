// app/utils/categoryColor.js

// هش ساده و ثابت از روی رشته (djb2)
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash |= 0
  }
  return Math.abs(hash)
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const DEFAULT_PALETTE = {
  bgColor:          '#FAF7F3',
  borderColor:      'rgba(162,132,102,0.15)',
  borderHoverColor: 'rgba(162,132,102,0.35)',
  shadowColor:      '0 16px 32px -10px rgba(162,132,102,0.20)',
  blobColor:        'rgba(162,132,102,0.14)',
  stripeStart:      '#A28466',
  stripeEnd:        '#F2EBE3',
  iconBg:           'rgba(162,132,102,0.10)',
  ringColor:        'rgba(162,132,102,0.20)',
  accent:           '#A28466',
}

/**
 * از روی هر متنی (اسم دسته‌بندی محصول یا بلاگ) یه پالت رنگی کامل
 * و هماهنگ با استایل پروژه می‌سازه. برای یک ورودی مشخص همیشه
 * همون خروجی رو برمی‌گردونه (deterministic).
 *
 * @param {string} rawText - مثلا cat.title_fa یا blog.category_text_fa
 */
export function generateCategoryColor(rawText) {
  if (!rawText) return DEFAULT_PALETTE

  const seed = String(rawText).trim().toLowerCase()
  const hash = hashString(seed)

  const hue = hash % 360
  const saturation = 35 + (hash % 20) // ۳۵ تا ۵۵ -> هماهنگ با پالت پاستلی پروژه

  const accent      = hslToHex(hue, saturation, 55)
  const stripeStart = hslToHex(hue, saturation, 68)
  const stripeEnd   = hslToHex(hue, Math.max(saturation - 15, 10), 94)
  const bgColor     = hslToHex(hue, Math.max(saturation - 20, 8), 97)

  return {
    bgColor,
    borderColor:      hexToRgba(accent, 0.18),
    borderHoverColor: hexToRgba(accent, 0.45),
    shadowColor:      `0 16px 32px -10px ${hexToRgba(accent, 0.24)}`,
    blobColor:        hexToRgba(accent, 0.16),
    stripeStart,
    stripeEnd,
    iconBg:           hexToRgba(accent, 0.12),
    ringColor:        hexToRgba(accent, 0.22),
    accent,
  }
}
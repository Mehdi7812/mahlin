// app/composables/useStarBurst.js
// ─────────────────────────────────────────────────────────────
// انیمیشن‌های «لحظه‌ای» با ستاره‌های لوگوی ماهلین:
//   toCart():  ستاره‌ها از دکمه‌ی خرید می‌پرن و به آیکون سبد می‌رسن
//   sparkle(): انفجار کوچک ستاره یا قلب دور یک نقطه (مثلاً علاقه‌مندی)
// بدون وابستگی؛ با Web Animations API و یک لایه‌ی fixed موقت.
// ─────────────────────────────────────────────────────────────

const STAR_PATH =
  'M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z';
const HEART_PATH =
  'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z';

const SVG_NS = 'http://www.w3.org/2000/svg';

// آخرین نقطه‌ای که کاربر لمس/کلیک کرده (سافاری روی کلیک به دکمه فوکوس نمی‌ده)
let lastPointer = null;
let listening = false;
function trackPointer() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener(
    'pointerdown',
    (e) => { lastPointer = { x: e.clientX, y: e.clientY, t: Date.now() }; },
    { capture: true, passive: true },
  );
}

function reducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function centerOf(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function resolveOrigin(originEl) {
  // مختصات از قبل گرفته‌شده (خروجی captureOrigin)
  if (originEl && typeof originEl.x === 'number' && typeof originEl.y === 'number' && !originEl.getBoundingClientRect) {
    return originEl;
  }
  if (originEl && originEl !== document.body && originEl.getBoundingClientRect) {
    const r = originEl.getBoundingClientRect();
    if (r.width) return centerOf(originEl);
  }
  if (lastPointer && Date.now() - lastPointer.t < 1500) return lastPointer;
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

// آیکون سبد خریدی که الان واقعاً روی صفحه دیده می‌شه
function findCartIcon() {
  const list = document.querySelectorAll('a[href="/cart"][aria-label]');
  for (const el of list) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) return el;
  }
  return null;
}

function makeLayer() {
  const layer = document.createElement('div');
  Object.assign(layer.style, {
    position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '9999', overflow: 'hidden',
  });
  document.body.appendChild(layer);
  return layer;
}

function makeShape(path, size, { fill = '#FFF8EE', stroke = '#B8894F', glow = 'rgba(224,183,88,.55)' } = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '-2 -2 28 28');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  Object.assign(svg.style, {
    position: 'absolute', left: '0', top: '0', overflow: 'visible',
    filter: `drop-shadow(0 0 4px ${glow})`, willChange: 'transform, opacity',
  });
  const p = document.createElementNS(SVG_NS, 'path');
  p.setAttribute('d', path);
  p.setAttribute('fill', fill);
  p.setAttribute('stroke', stroke);
  p.setAttribute('stroke-width', '1.6');
  p.setAttribute('stroke-linejoin', 'round');
  p.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.appendChild(p);
  return svg;
}

const rand = (a, b) => a + Math.random() * (b - a);

function bump(el) {
  el?.animate(
    [
      { transform: 'scale(1) rotate(0)' },
      { transform: 'scale(1.28) rotate(-10deg)', offset: 0.35 },
      { transform: 'scale(.92) rotate(6deg)',   offset: 0.7 },
      { transform: 'scale(1) rotate(0)' },
    ],
    { duration: 520, easing: 'cubic-bezier(.3,1.4,.5,1)' },
  );
}


// لرزش کوتاه سبد با هر ستاره‌ای که می‌رسه؛ انیمیشن قبلی کنسل می‌شه تا روی هم انباشته نشن
const shakeAnims = new WeakMap();
function shake(el, strength = 1) {
  if (!el) return;
  shakeAnims.get(el)?.cancel();
  const r = 9 * strength;
  const sc = 1 + 0.16 * strength;
  const dir = Math.random() > 0.5 ? 1 : -1;
  el.style.transformOrigin = 'center';
  const a = el.animate(
    [
      { transform: 'translateX(0) rotate(0) scale(1)' },
      { transform: `translateX(${dir * 2}px) rotate(${-r * dir}deg) scale(${sc})`, offset: 0.25 },
      { transform: `translateX(${-dir * 2}px) rotate(${r * 0.7 * dir}deg) scale(${1 + 0.08 * strength})`, offset: 0.55 },
      { transform: `rotate(${-r * 0.3 * dir}deg) scale(1.03)`, offset: 0.8 },
      { transform: 'translateX(0) rotate(0) scale(1)' },
    ],
    { duration: 320, easing: 'cubic-bezier(.3,1.2,.5,1)' },
  );
  shakeAnims.set(el, a);
}

// نقطه‌ی روی منحنی بزیه‌ی درجه ۲
const bez = (p0, p1, p2, t) => (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

export function useStarBurst() {
  if (typeof window !== 'undefined') trackPointer();

  /** انفجار کوچک ستاره/قلب دور یک المان */
  function sparkle(originEl, {
    shape = 'star', count = 8, spread = 44, size = [8, 16], color,
  } = {}) {
    if (typeof window === 'undefined' || reducedMotion()) return;
    const from  = resolveOrigin(originEl);
    const layer = makeLayer();
    const path  = shape === 'heart' ? HEART_PATH : STAR_PATH;
    const style = shape === 'heart'
      ? { fill: color || '#F3B4B0', stroke: '#DE8E89', glow: 'rgba(243,180,176,.7)' }
      : {};
    let pending = count;

    for (let i = 0; i < count; i++) {
      const s   = rand(size[0], size[1]);
      const el  = makeShape(path, s, style);
      layer.appendChild(el);
      const h   = s / 2;
      const ang = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
      const d   = rand(spread * 0.6, spread);
      const ex  = from.x + Math.cos(ang) * d;
      const ey  = from.y + Math.sin(ang) * d - (shape === 'heart' ? 14 : 0);

      const a = el.animate(
        [
          { transform: `translate(${from.x - h}px, ${from.y - h}px) scale(.2)`, opacity: 0 },
          { transform: `translate(${ex - h}px, ${ey - h}px) scale(1)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${ex - h}px, ${ey - h - 10}px) scale(.4)`, opacity: 0 },
        ],
        { duration: rand(620, 820), easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' },
      );
      a.onfinish = () => { el.remove(); if (--pending === 0) layer.remove(); };
    }
  }

  /** ستاره‌ها از مبدأ (دکمه) روی یک قوس نرم به آیکون سبد پرواز می‌کنن و با هر رسیدن، سبد می‌لرزه */
  function toCart(originEl, { count = 12 } = {}) {
    if (typeof window === 'undefined') return;
    const cart = findCartIcon();
    if (reducedMotion()) { bump(cart); return; }

    const from  = resolveOrigin(originEl);
    const to    = cart ? centerOf(cart) : { x: 32, y: 32 };
    const layer = makeLayer();
    const STEPS = 16;                       // تعداد نمونه‌های منحنی برای حرکت نرم
    let pending = count;
    let arrived = 0;

    // پخش اولیه: مثل یک فواره‌ی کوچک بالای دکمه
    for (let i = 0; i < count; i++) {
      const size = rand(10, 22);
      const star = makeShape(STAR_PATH, size);
      star.style.opacity = '0';             // تا قبل از شروع انیمیشن دیده نشه
      layer.appendChild(star);

      const h    = size / 2;
      const ang  = -Math.PI / 2 + rand(-1.5, 1.5);   // بیشتر رو به بالا
      const dist = rand(30, 100);
      const bx   = from.x + Math.cos(ang) * dist;
      const by   = from.y + Math.sin(ang) * dist;

      // نقطه‌ی کنترل قوس: بالاتر از خط مستقیم، با کمی انحراف تصادفی
      const cx = (bx + to.x) / 2 + rand(-80, 80);
      const cy = Math.min(by, to.y) - rand(50, 130);

      const spin = rand(-260, 260);
      const peak = rand(0.9, 1.25);

      const frames = [
        // شروع: کوچیک و نامرئی در مبدأ
        { transform: `translate(${from.x - h}px, ${from.y - h}px) scale(.1) rotate(0deg)`, opacity: 0, offset: 0 },
        // فواره: ستاره بزرگ می‌شه و به نقطه‌ی پخش می‌رسه
        { transform: `translate(${bx - h}px, ${by - h}px) scale(${peak}) rotate(${spin * 0.25}deg)`, opacity: 1, offset: 0.2 },
      ];
      // پرواز: نمونه‌برداری از قوس بزیه تا سبد
      for (let k = 1; k <= STEPS; k++) {
        const t = k / STEPS;
        const x = bez(bx, cx, to.x, t);
        const y = bez(by, cy, to.y, t);
        const sc = peak * (1 - t * 0.78) + 0.12;     // کوچیک‌شدن تدریجی تا رسیدن
        frames.push({
          transform: `translate(${x - h}px, ${y - h}px) scale(${sc}) rotate(${spin * (0.25 + 0.75 * t)}deg)`,
          opacity: t > 0.9 ? 1 - (t - 0.9) * 6 : 1,
          offset: 0.2 + 0.8 * t,
        });
      }

      const anim = star.animate(frames, {
        duration: rand(900, 1150),
        delay: i * 70,
        // شروع آروم، شتاب‌گرفتن به سمت سبد
        easing: 'cubic-bezier(.4,0,.6,1)',
        fill: 'both',                       // در زمان delay هم فریم اول (نامرئی) اعمال بشه
      });

      anim.onfinish = () => {
        star.remove();
        arrived++;
        // لرزش سبد با هر ستاره؛ ستاره‌های آخر قوی‌تر
        shake(cart, 0.7 + 0.6 * (arrived / count));
        // هر چند ستاره یک جرقه‌ی کوچیک روی سبد
        if (cart && arrived % 3 === 0) sparkle(cart, { count: 4, spread: 22, size: [5, 9] });

        if (--pending === 0) {
          layer.remove();
          bump(cart);
          if (cart) sparkle(cart, { count: 10, spread: 30, size: [6, 12] });
        }
      };
    }
  }

  /**
   * مبدأ رو همین الان ثبت می‌کنه (قبل از await).
   * وقتی درخواست سرور طول بکشه، هم فوکوس دکمه از دست می‌ره هم آخرین لمس کهنه می‌شه.
   */
  function captureOrigin(el) {
    if (typeof window === 'undefined') return null;
    return resolveOrigin(el);
  }

  return { toCart, sparkle, captureOrigin };
}
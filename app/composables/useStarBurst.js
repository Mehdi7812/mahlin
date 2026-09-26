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

  /** ستاره‌ها از مبدأ (دکمه) به آیکون سبد پرواز می‌کنن */
  function toCart(originEl, { count = 8 } = {}) {
    if (typeof window === 'undefined') return;
    const cart = findCartIcon();
    if (reducedMotion()) { bump(cart); return; }

    const from  = resolveOrigin(originEl);
    const to    = cart ? centerOf(cart) : { x: 32, y: 32 };
    const layer = makeLayer();
    let pending = count;

    for (let i = 0; i < count; i++) {
      const size = rand(10, 22);
      const star = makeShape(STAR_PATH, size);
      layer.appendChild(star);

      const h    = size / 2;
      const ang  = rand(0, Math.PI * 2);
      const dist = rand(28, 70);
      const bx   = from.x + Math.cos(ang) * dist;          // پخش اولیه دور دکمه
      const by   = from.y + Math.sin(ang) * dist;
      const mx   = (bx + to.x) / 2 + rand(-60, 60);        // نقطه‌ی میانی قوس
      const my   = Math.min(by, to.y) - rand(40, 120);
      const spin = rand(-220, 220);

      const anim = star.animate(
        [
          { transform: `translate(${from.x - h}px, ${from.y - h}px) scale(.2) rotate(0deg)`, opacity: 0 },
          { transform: `translate(${bx - h}px, ${by - h}px) scale(1.1) rotate(${spin * 0.3}deg)`, opacity: 1, offset: 0.22 },
          { transform: `translate(${mx - h}px, ${my - h}px) scale(.9) rotate(${spin * 0.7}deg)`, opacity: 1, offset: 0.62 },
          { transform: `translate(${to.x - h}px, ${to.y - h}px) scale(.25) rotate(${spin}deg)`, opacity: 0.2 },
        ],
        {
          duration: rand(820, 1100) + i * 40,
          delay: i * 35,
          easing: 'cubic-bezier(.45,0,.25,1)',
          fill: 'forwards',
        },
      );

      anim.onfinish = () => {
        star.remove();
        if (--pending === 0) {
          layer.remove();
          bump(cart);
          if (cart) sparkle(cart, { count: 6, spread: 26, size: [6, 11] });
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

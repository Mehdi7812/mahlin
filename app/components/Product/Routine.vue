<template>
  <section
    v-if="stepIndex !== -1"
    ref="root"
    class="routine"
    :class="{ 'is-in': visible }"
    :style="{ '--acc': accent, '--progress': progressPct }"
    aria-labelledby="routine-title"
  >
    <!-- عنوان -->
    <div class="flex items-center justify-between gap-3 mb-5">
      <h2 id="routine-title" class="routine-title">
        <svg class="w-4 h-4 shrink-0" viewBox="-2 -2 28 28" aria-hidden="true">
          <path :d="STAR" fill="#FFF8EE" stroke="#B8894F" stroke-width="1.6" vector-effect="non-scaling-stroke" />
        </svg>
        این محصول کجای روتین پوستته؟
      </h2>
      <span class="step-count">مرحله‌ی {{ fa(stepIndex + 1) }} از {{ fa(STEPS.length) }}</span>
    </div>

    <!-- مسیر مراحل -->
    <ol class="track" role="list">
      <li class="track-line" aria-hidden="true"><span class="track-fill" /></li>

      <li
        v-for="(s, i) in STEPS"
        :key="s.key"
        class="node"
        :class="{
          'is-done':    i < stepIndex,
          'is-current': i === stepIndex,
          'is-next':    i > stepIndex,
        }"
        :style="{ '--d': i * 90 + 'ms' }"
      >
        <component
          :is="i === stepIndex ? 'span' : NuxtLinkComp"
          v-bind="i === stepIndex ? {} : { to: { path: '/shop', query: { cat_id: s.cat } } }"
          class="node-btn"
          :aria-current="i === stepIndex ? 'step' : undefined"
          :aria-label="i === stepIndex ? `${s.short}، همین محصول` : `مشاهده‌ی ${s.short}‌ها`"
        >
          <span class="node-dot">
            <svg class="node-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-for="(d, k) in s.icon" :key="k" :d="d" />
            </svg>
          </span>

          <!-- ستاره‌ی چرخان بالای مرحله‌ی فعلی -->
          <svg v-if="i === stepIndex" class="node-star" viewBox="-2 -2 28 28" aria-hidden="true">
            <path :d="STAR" fill="#FFF8EE" stroke="#B8894F" stroke-width="1.6" vector-effect="non-scaling-stroke" />
          </svg>

          <span class="node-label">{{ s.short }}</span>
        </component>
      </li>
    </ol>

    <!-- نکته‌ی مرحله‌ی فعلی -->
    <div class="tip">
      <div class="flex flex-wrap items-center gap-2 mb-1.5">
        <span class="tip-title">{{ current.title }}</span>
        <span class="time-chip">
          <svg v-if="current.time !== 'night'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-if="current.time !== 'day'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
          </svg>
          {{ TIME_LABEL[current.time] }}
        </span>
      </div>
      <p class="tip-text">{{ current.tip }}</p>

      <!-- قبل و بعد -->
      <div v-if="prev || next" class="flex flex-wrap gap-2 mt-3.5">
        <NuxtLink v-if="prev" :to="{ path: '/shop', query: { cat_id: prev.cat } }" class="nb-link">
          <span class="text-ink/45">قبلش:</span> {{ prev.short }}
        </NuxtLink>
        <NuxtLink v-if="next" :to="{ path: '/shop', query: { cat_id: next.cat } }" class="nb-link group">
          <span class="text-ink/45">بعدش:</span> {{ next.short }}
          <svg class="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, resolveComponent } from 'vue';
import { fa } from '~/utils/format';

const props = defineProps({
  item:         { type: Object, required: true },
  categoryTree: { type: Array,  default: () => [] },
  catInfo:      { type: Object, default: () => ({}) },
});

const NuxtLinkComp = resolveComponent('NuxtLink');

const STAR = 'M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z';

const TIME_LABEL = { both: 'صبح و شب', day: 'فقط صبح', night: 'بیشتر شب‌ها' };

// ─── مراحل روتین ───────────────────────────────────────────
// cat = شناسه‌ی دسته برای لینک؛ keys = کلمه‌هایی که با اسم دسته/محصول تطبیق داده می‌شن
// ترتیب «match» مهمه: اول دقیق‌ترها بررسی می‌شن
const STEPS = [
  {
    key: 'cleanse', short: 'شوینده', title: 'پاک‌سازی', cat: 5, time: 'both', match: 2,
    keys: ['شوینده', 'پاک‌کننده', 'پاک کننده', 'شستشو', 'فوم', 'میسلار', 'ژل شست'],
    tip: 'پوست تمیز بقیه‌ی مراحل رو خیلی بهتر جذب می‌کنه. با آب ولرم بشور و با ضربه‌های آروم خشک کن، نه با کشیدن حوله.',
    icon: ['M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3z', 'M10 13.5a2 2 0 0 0 2 2'],
  },
  {
    key: 'tone', short: 'تونر', title: 'تونر و لایه‌برداری', cat: 8, time: 'both', match: 3,
    keys: ['تونر', 'لایه‌بردار', 'لایه بردار', 'اسکراب', 'پیلینگ'],
    tip: 'بعد از شستشو پوست رو متعادل و آماده می‌کنه. لایه‌بردارها رو فقط ۲ تا ۳ بار در هفته و شب‌ها استفاده کن.',
    icon: ['M9 8h6v12a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8z', 'M10.5 8V5h3v3', 'M13.5 5h2', 'M17 4l1.5-1M17.5 6h2M17 8l1.5 1'],
  },
  {
    key: 'treat', short: 'سرم', title: 'درمان و سرم', cat: 6, time: 'night', match: 5,
    keys: ['سرم', 'ضدلک', 'ضد لک', 'روشن‌کننده', 'روشن کننده', 'جوانساز', 'جوان‌ساز', 'لیفتینگ', 'دورچشم', 'دور چشم', 'آمپول', 'رتینول', 'ویتامین'],
    tip: 'فعال‌ترین مرحله‌ی روتین. چند قطره روی پوست بزن، یکی دو دقیقه صبر کن جذب بشه و بعد برو سراغ مرحله‌ی بعد.',
    icon: ['M10 10h4v9a2 2 0 0 1-4 0v-9z', 'M9 10h6', 'M11 10V7h2v3', 'M10.5 7h3V4.5a1.5 1.5 0 0 0-3 0V7z'],
  },
  {
    key: 'moist', short: 'مرطوب‌کننده', title: 'آبرسانی و ترمیم', cat: 3, time: 'both', match: 4,
    keys: ['مرطوب', 'آبرسان', 'ترمیم', 'هیدرات', 'کرم آب'],
    tip: 'رطوبت رو توی پوست قفل می‌کنه. حتی پوست چرب هم بهش نیاز داره؛ فقط بافت سبک‌تر و ژلی انتخاب کن.',
    icon: ['M5 12h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z', 'M4 9h16v3H4z', 'M9 15.5h6'],
  },
  {
    key: 'protect', short: 'ضدآفتاب', title: 'محافظت از آفتاب', cat: 1, time: 'day', match: 1,
    keys: ['ضدآفتاب', 'ضد آفتاب', 'آفتاب', 'spf'],
    tip: 'آخرین مرحله‌ی روتین صبح. پونزده دقیقه قبل از بیرون رفتن بزن و هر دو سه ساعت یک بار تمدیدش کن، حتی روزهای ابری.',
    icon: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4'],
  },
];

// ─── تشخیص مرحله از روی دسته و اسم محصول ───────────────────
const stepIndex = computed(() => {
  const hay = [
    props.item?.cat,
    ...props.categoryTree.map((c) => c.text),
    props.item?.name,
  ].filter(Boolean).join(' ').toLowerCase();
  if (!hay) return -1;

  const ordered = [...STEPS].sort((a, b) => a.match - b.match);
  const hit = ordered.find((s) => s.keys.some((k) => hay.includes(k.toLowerCase())));
  return hit ? STEPS.indexOf(hit) : -1;
});

const current = computed(() => STEPS[stepIndex.value] || STEPS[0]);
const prev    = computed(() => STEPS[stepIndex.value - 1] || null);
const next    = computed(() => STEPS[stepIndex.value + 1] || null);

const accent      = computed(() => props.catInfo?.accent || '#A28466');
const progressPct = computed(() => (stepIndex.value / (STEPS.length - 1)) || 0);

// ─── شروع انیمیشن وقتی بخش دیده شد ────────────────────────
const root    = ref(null);
const visible = ref(false);
let io = null;

onMounted(() => {
  if (!root.value) return;
  if (!('IntersectionObserver' in window)) { visible.value = true; return; }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { visible.value = true; io.disconnect(); }
  }, { threshold: 0.35 });
  io.observe(root.value);
});
onBeforeUnmount(() => io?.disconnect());
</script>

<style scoped>
.routine {
  position: relative;
  padding: 18px 16px 16px;
  border-radius: 24px;
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,.9), rgba(255,255,255,.55) 60%),
    theme('colors.cardLight');
  box-shadow:
    inset 0 0 0 1px theme('colors.ink / 6%'),
    0 14px 30px -24px rgba(110,82,58,.4);
}
@media (min-width: 640px) { .routine { padding: 22px 22px 20px; } }

.routine-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: theme('colors.ink');
}
@media (min-width: 640px) { .routine-title { font-size: 15px; } }

.step-count {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--acc);
  background: color-mix(in srgb, var(--acc) 10%, transparent);
  border-radius: 999px;
  padding: 4px 10px;
}

/* ─── مسیر ───────────────────────────────────────────────── */
.track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: 14px 0 0;
}

/* خط بین مراکز دایره‌ها (از وسط ستون اول تا وسط ستون آخر) */
.track-line {
  position: absolute;
  top: calc(14px + 22px);
  inset-inline: 10%;
  height: 2px;
  border-radius: 999px;
  background: repeating-linear-gradient(to left, theme('colors.ink / 14%') 0 6px, transparent 6px 11px);
}
.track-fill {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(to left, color-mix(in srgb, var(--acc) 45%, #fff), var(--acc));
  transition: width 1.1s cubic-bezier(.65,0,.35,1) .25s;
}
.is-in .track-fill { width: calc(var(--progress) * 100%); }

.node { position: relative; display: flex; justify-content: center; }

.node-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  border-radius: 14px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  transform: translateY(10px) scale(.9);
  transition: opacity .5s ease var(--d), transform .6s cubic-bezier(.3,1.4,.5,1) var(--d);
}
.is-in .node-btn { opacity: 1; transform: none; }

.node-dot {
  position: relative;
  z-index: 1;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: theme('colors.ink / 40%');
  background: theme('colors.cardLight');
  box-shadow: inset 0 0 0 1.5px theme('colors.ink / 10%');
  transition: transform .35s cubic-bezier(.3,1.4,.5,1), box-shadow .3s, color .3s, background-color .3s;
}
.node-icon { width: 20px; height: 20px; }

.node-label {
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.4;
  color: theme('colors.ink / 45%');
  transition: color .3s;
}
@media (min-width: 640px) { .node-label { font-size: 12px; } }

/* مراحل قبلی: رنگ ملایم دسته */
.is-done .node-dot {
  color: var(--acc);
  background: color-mix(in srgb, var(--acc) 10%, #fff);
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--acc) 35%, transparent);
}
.is-done .node-label { color: theme('colors.ink / 60%'); }

/* مرحله‌ی فعلی */
.is-current .node-dot {
  width: 52px;
  height: 52px;
  margin-block: -4px; /* هم‌مرکز با بقیه و برچسب هم‌تراز */
  color: #fff;
  background: linear-gradient(145deg, color-mix(in srgb, var(--acc) 70%, #fff), var(--acc));
  box-shadow: 0 10px 22px -10px var(--acc), inset 0 0 0 2px rgba(255,255,255,.5);
}
.is-current .node-icon { width: 23px; height: 23px; }
.is-current .node-label { color: theme('colors.ink'); font-weight: 800; }

/* موج دور مرحله‌ی فعلی */
.is-current .node-dot::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--acc) 45%, transparent);
  opacity: 0;
}
.is-in .is-current .node-dot::after { animation: ripple 2.4s ease-out 1.4s infinite; }
@keyframes ripple {
  0%   { transform: scale(.85); opacity: .9; }
  100% { transform: scale(1.35); opacity: 0; }
}

.node-star {
  position: absolute;
  z-index: 2;
  top: -14px;
  inset-inline-end: calc(50% - 32px);
  width: 18px;
  height: 18px;
  overflow: visible;
  filter: drop-shadow(0 1px 2px rgba(184,137,79,.35));
  opacity: 0;
  transform: scale(0) rotate(-90deg);
  transition: opacity .4s ease 1.3s, transform .6s cubic-bezier(.3,1.6,.5,1) 1.3s;
}
.is-in .node-star {
  opacity: 1;
  transform: none;
  animation: starSpin 6s linear 2s infinite;
}
@keyframes starSpin {
  0%   { rotate: 0deg;   scale: 1; }
  50%  { rotate: 180deg; scale: .8; }
  100% { rotate: 360deg; scale: 1; }
}

@media (hover: hover) {
  a.node-btn:hover .node-dot { transform: translateY(-3px); color: var(--acc); box-shadow: inset 0 0 0 1.5px var(--acc); }
  a.node-btn:hover .node-label { color: var(--acc); }
}
a.node-btn:focus-visible .node-dot { box-shadow: 0 0 0 3px #fff, 0 0 0 5px var(--acc); }
a.node-btn:active .node-dot { transform: scale(.92); }

/* ─── نکته ───────────────────────────────────────────────── */
.tip {
  margin-top: 18px;
  padding: 14px 14px 14px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--acc) 6%, #fff);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--acc) 16%, transparent);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .6s ease 1.1s, transform .6s cubic-bezier(.2,.8,.2,1) 1.1s;
}
.is-in .tip { opacity: 1; transform: none; }

.tip-title { font-size: 13px; font-weight: 800; color: theme('colors.ink'); }
.time-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 700;
  color: theme('colors.ink / 60%');
  background: #fff;
  box-shadow: inset 0 0 0 1px theme('colors.ink / 8%');
  border-radius: 999px;
  padding: 3px 9px;
}
.tip-text { font-size: 12.5px; line-height: 2; color: theme('colors.ink / 70%'); }

.nb-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: theme('colors.ink');
  background: #fff;
  box-shadow: inset 0 0 0 1px theme('colors.ink / 8%');
  border-radius: 999px;
  padding: 6px 12px;
  transition: box-shadow .25s, color .25s;
}
.nb-link:hover { color: var(--acc); box-shadow: inset 0 0 0 1px var(--acc); }
.nb-link:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .node-btn, .tip, .node-star, .track-fill { transition: none !important; }
  .node-btn, .tip { opacity: 1 !important; transform: none !important; }
  .node-star { opacity: 1 !important; transform: none !important; animation: none !important; }
  .track-fill { width: calc(var(--progress) * 100%) !important; }
  .is-current .node-dot::after { animation: none !important; }
}
</style>

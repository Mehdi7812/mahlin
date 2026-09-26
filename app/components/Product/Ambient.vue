<template>
  <!-- هاله‌ی مرواریدی و ستاره‌های لوگو دور گالری -->
  <div class="ambient" aria-hidden="true">
    <span class="halo" />
    <svg
      v-for="(s, i) in STARS"
      :key="i"
      class="amb-star"
      :class="{ 'hide-sm': s.hideSm }"
      viewBox="-2 -2 28 28"
      :style="{
        top: s.top, insetInlineStart: s.start,
        width: s.size + 'px', height: s.size + 'px',
        '--dur': s.dur + 's', '--delay': s.delay + 's', '--rot': s.rot + 'deg',
      }"
    >
      <path
        d="M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z"
        fill="#FFF9F0"
        stroke="#C29A5E"
        stroke-width="1.4"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<script setup>
// موقعیت‌ها نسبت به قاب گالری؛ منفی یعنی کمی بیرون از قاب
const STARS = [
  { top: '-3%',  start: '8%',   size: 26, dur: 7,   delay: 0,    rot: 25 },
  { top: '6%',   start: '-4%',  size: 14, dur: 5.5, delay: -2,   rot: -30, hideSm: true },
  { top: '48%',  start: '-5%',  size: 18, dur: 6.5, delay: -4,   rot: 40 },
  { top: '92%',  start: '14%',  size: 12, dur: 5,   delay: -1,   rot: -20 },
  { top: '84%',  start: '96%',  size: 22, dur: 8,   delay: -3,   rot: 30 },
  { top: '30%',  start: '100%', size: 13, dur: 6,   delay: -5,   rot: -40, hideSm: true },
];
</script>

<style scoped>
.ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* نور مرواریدی پشت گالری؛ بی‌رنگ تا با رنگ محصول رقابت نکنه */
.halo {
  position: absolute;
  inset: -12% -14%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255,255,255,.95), rgba(255,250,242,.55) 55%, rgba(255,250,242,0));
  animation: breathe 7s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { opacity: .75; transform: scale(.97); }
  50%      { opacity: 1;   transform: scale(1.03); }
}

.amb-star {
  position: absolute;
  overflow: visible;
  filter: drop-shadow(0 2px 4px rgba(194,154,94,.3));
  animation:
    drift var(--dur) ease-in-out var(--delay) infinite alternate,
    glow  calc(var(--dur) * .6) ease-in-out var(--delay) infinite;
}
@keyframes drift {
  from { transform: translateY(0)     rotate(0deg); }
  to   { transform: translateY(-12px) rotate(var(--rot)); }
}
@keyframes glow {
  0%, 100% { opacity: 1;  scale: 1; }
  50%      { opacity: .45; scale: .78; }
}

@media (max-width: 767px) {
  .hide-sm { display: none; }
  .halo { inset: -6% -8%; }
}

@media (prefers-reduced-motion: reduce) {
  .halo, .amb-star { animation: none !important; }
}
</style>

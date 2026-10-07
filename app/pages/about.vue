<template>
  <main class="relative isolate min-h-screen overflow-hidden bg-[#FBF9F5]">
    <!-- درخشش‌های پس‌زمینه -->
    <div
      class="pointer-events-none absolute -end-[220px] top-[12%] h-[340px] w-[340px] animate-[glow-float_14s_ease-in-out_infinite_alternate] rounded-full bg-blush/25 opacity-45 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -start-[220px] bottom-[8%] h-[340px] w-[340px] animate-[glow-float_14s_ease-in-out_infinite_alternate] rounded-full bg-sky/20 opacity-45 blur-[100px] [animation-delay:-5s]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <AboutHero />
      <AboutWhyMahlin />
      <AboutSkinFirst />
      <AboutCommitment />
      <AboutLicense />
      <AboutConsultation />
    </div>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'درباره ما | ماهلین اسکین‌کر',
  description:
    'مجموعه دکتر ماهلین؛ مراقبت از پوست، آگاهانه‌تر از همیشه، همراه با محصولات معتبر و مشاوره تخصصی پوست.',
})
</script>

<!--
  تمام keyframeهای صفحه اینجا به‌صورت global تعریف شده‌اند تا کامپوننت‌های فرزند
  بتوانند با کلاس‌های arbitrary تیلویند مثل animate-[orbit-spin_30s_linear_infinite]
  به آن‌ها دسترسی داشته باشند. چون این keyframeها فقط در همین صفحه استفاده می‌شوند،
  تداخلی با بقیه‌ی سایت پیش نمی‌آید.
-->
<style>
html {
  scroll-behavior: smooth;
}

@keyframes glow-float {
  from { transform: translate3d(0, 0, 0) scale(0.95); }
  to   { transform: translate3d(18px, -20px, 0) scale(1.08); }
}

@keyframes dot-pulse {
  0%        { transform: scale(0.8); opacity: 0.8; }
  75%, 100% { transform: scale(1.8); opacity: 0; }
}

@keyframes word-in {
  from { opacity: 0; transform: translateY(60%) rotate(2deg); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0) rotate(0deg);   filter: blur(0); }
}

@keyframes word-in-plain {
  from { opacity: 0; transform: translateY(60%) rotate(2deg); }
  to   { opacity: 1; transform: translateY(0) rotate(0deg); }
}

@keyframes gradient-shift {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}

@keyframes draw-underline {
  to { stroke-dashoffset: 0; }
}

@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes moon-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-9px); }
}

@keyframes moon-glow {
  0%, 100% { opacity: 0.5; transform: scale(0.95); }
  50%      { opacity: 1;   transform: scale(1.08); }
}

@keyframes sparkle {
  0%, 100% { opacity: 0.5; transform: scale(0.85) rotate(0deg); }
  50%      { opacity: 1;   transform: scale(1.15) rotate(18deg); }
}

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-7px); }
}

@keyframes badge-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-8px) rotate(-1deg); }
}

@keyframes scroll-wheel {
  0%   { opacity: 1; transform: translate(-50%, 0); }
  70%  { opacity: 0; transform: translate(-50%, 10px); }
  100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  main *,
  main *::before,
  main *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
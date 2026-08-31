<template>
  <section class="border-y border-ink/5 bg-card/40">
    <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="(item, i) in items"
        :key="item.title"
        class="flex items-center gap-3 justify-center md:justify-start animate-fade-in-up"
        :style="{ animationDelay: i * 0.08 + 's' }"
      >
        <span :class="['w-10 h-10 rounded-full grid place-items-center flex-shrink-0', item.bg, item.text]">
          <span v-html="item.icon" class="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5"></span>
        </span>
        <div class="leading-tight text-center md:text-start">
          <p class="text-xs font-bold text-ink">{{ item.title }}</p>
          <p class="text-[10px] text-ink/45">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    title: 'اصالت ۱۰۰٪',
    desc: 'گارانتی سلامت کالا',
    bg: 'bg-blush/20',
    text: 'text-blush',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" stroke-linejoin="round"/></svg>'
  },
  {
    title: 'ارسال سریع',
    desc: 'به سراسر کشور',
    bg: 'bg-sky/20',
    text: 'text-sky',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke-linejoin="round"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>'
  },
  {
    title: 'مشاوره تخصصی',
    desc: 'با متخصص پوست',
    bg: 'bg-sage/20',
    text: 'text-sage',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke-linecap="round"/></svg>'
  },
  {
    title: 'ضمانت بازگشت',
    desc: 'تا ۷ روز',
    bg: 'bg-lilac/20',
    text: 'text-lilac',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v6h6M20 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15a8 8 0 0014 3M19 9A8 8 0 005 6" stroke-linecap="round"/></svg>'
  }
];
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
// app/plugins/reveal.client.js
// ─────────────────────────────────────────────────────────────
// v-reveal: المان وقتی وارد صفحه شد، نرم از پایین ظاهر می‌شه (فقط یک بار).
//   <div v-reveal>          بدون تاخیر
//   <div v-reveal="120">    با ۱۲۰ میلی‌ثانیه تاخیر (برای ورود پلکانی)
// با «کاهش حرکت» سیستم‌عامل کاملاً غیرفعال می‌شه.
// ─────────────────────────────────────────────────────────────
export default defineNuxtPlugin((nuxtApp) => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(.2,.8,.2,1)';

  const observer = reduce ? null : new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      el.style.opacity = '1';
      el.style.transform = 'none';
      observer.unobserve(el);
      // بعد از اتمام، استایل‌ها پاک می‌شن تا با sticky و hover تداخل نداشته باشن
      setTimeout(() => {
        el.style.removeProperty('transition');
        el.style.removeProperty('transform');
        el.style.removeProperty('will-change');
      }, 900 + (Number(el.dataset.revealDelay) || 0));
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      if (!observer) return;
      const delay = Number(binding.value) || 0;
      el.dataset.revealDelay = String(delay);
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.willChange = 'opacity, transform';
      el.style.transition = `opacity .7s ${EASE} ${delay}ms, transform .7s ${EASE} ${delay}ms`;
      observer.observe(el);
    },
    unmounted(el) {
      observer?.unobserve(el);
    },
  });
});

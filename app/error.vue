<template>
  <div class="min-h-screen bg-cream flex items-center justify-center px-4 overflow-hidden relative">

    <!-- ── blobs پس‌زمینه ── -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-10%] start-[-5%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 animate-blob-1"
        style="background: radial-gradient(circle, rgba(224,183,88,0.18), transparent 70%)" />
      <div class="absolute bottom-[-10%] end-[-5%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-35 animate-blob-2"
        style="background: radial-gradient(circle, rgba(143,193,217,0.18), transparent 70%)" />
      <div class="absolute top-[40%] end-[20%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-25 animate-blob-3"
        style="background: radial-gradient(circle, rgba(185,166,222,0.16), transparent 70%)" />
    </div>

    <!-- ── محتوای اصلی ── -->
    <div class="relative z-10 text-center max-w-lg mx-auto">

      <!-- عدد ۴۰۴ با انیمیشن -->
      <div class="relative mb-8 select-none">

        <!-- سایه متنی پشت -->
        <div
          class="absolute inset-0 flex items-center justify-center text-[180px] sm:text-[220px] font-display font-bold leading-none pointer-events-none"
          style="color: rgba(162,132,102,0.06); transform: translateY(8px) scale(1.04)"
          aria-hidden="true"
        >
          404
        </div>

        <!-- عدد اصلی -->
        <div class="relative flex items-center justify-center gap-2 sm:gap-4">

          <!-- ۴ چپ -->
          <span
            class="text-[100px] sm:text-[130px] font-display font-bold leading-none animate-float-slow"
            style="color: #C29A45; text-shadow: 0 8px 32px rgba(194,154,69,0.20)"
          >
            4
          </span>

          <!-- دایره میانی -->
          <div class="relative animate-spin-slow">
            <div
              class="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-[3px] flex items-center justify-center"
              style="border-color: rgba(194,154,69,0.25); background: rgba(194,154,69,0.06)"
            >
              <!-- حلقه داخلی -->
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[2px]"
                style="border-color: rgba(194,154,69,0.15); background: rgba(194,154,69,0.08)"
              />
              <!-- نقطه مرکزی -->
              <div
                class="absolute w-3 h-3 rounded-full shadow-lg"
                style="background: #C29A45; box-shadow: 0 0 12px rgba(194,154,69,0.5)"
              />
            </div>
            <!-- نقطه‌های دوار -->
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full"
              style="background: #C29A45; box-shadow: 0 0 8px rgba(194,154,69,0.6)"
            />
            <div
              class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 rounded-full"
              style="background: rgba(194,154,69,0.5)"
            />
          </div>

          <!-- ۴ راست -->
          <span
            class="text-[100px] sm:text-[130px] font-display font-bold leading-none animate-float-slow-reverse"
            style="color: #C29A45; text-shadow: 0 8px 32px rgba(194,154,69,0.20)"
          >
            4
          </span>
        </div>

        <!-- نوار گرادیان زیر عدد -->
        <div
          class="mt-2 mx-auto h-[2px] w-32 rounded-full animate-pulse-soft"
          style="background: linear-gradient(to left, transparent, #C29A45, transparent)"
        />
      </div>

      <!-- متن توضیح -->
      <div class="space-y-3 mb-10 animate-fade-up" style="animation-delay: 0.2s">
        <h1 class="text-xl sm:text-2xl font-bold text-ink">
          صفحه‌ای که دنبالش می‌گردید وجود ندارد
        </h1>
        <p class="text-sm text-ink/50 leading-relaxed max-w-sm mx-auto">
          شاید آدرس اشتباه تایپ شده یا این صفحه حذف شده باشد.
          نگران نباشید، می‌توانید از اینجا ادامه دهید.
        </p>
      </div>

      <!-- دکمه‌های اکشن -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style="animation-delay: 0.35s">

        <!-- دکمه اصلی: بازگشت به خانه -->
        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
          style="background: linear-gradient(135deg, #C29A45, #A17F35); box-shadow: 0 8px 24px -6px rgba(194,154,69,0.40)"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(194,154,69,0.55)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = '0 8px 24px -6px rgba(194,154,69,0.40)'"
        >
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M3 12L12 3l9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>بازگشت به صفحه اصلی</span>
        </NuxtLink>

        <!-- دکمه فروشگاه -->
        <NuxtLink
          to="/shop"
          class="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold border transition-all duration-300 hover:-translate-y-0.5"
          style="border-color: rgba(162,132,102,0.15); color: #A28466; background: rgba(162,132,102,0.05)"
          @mouseenter="e => { e.currentTarget.style.borderColor = 'rgba(194,154,69,0.35)'; e.currentTarget.style.background = 'rgba(194,154,69,0.08)' }"
          @mouseleave="e => { e.currentTarget.style.borderColor = 'rgba(162,132,102,0.15)'; e.currentTarget.style.background = 'rgba(162,132,102,0.05)' }"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0" stroke-linecap="round"/>
          </svg>
          <span>مشاهده فروشگاه</span>
        </NuxtLink>

      </div>

      <!-- لینک‌های سریع -->
      <div class="mt-10 pt-8 border-t border-ink/[0.05] animate-fade-up" style="animation-delay: 0.5s">
        <p class="text-[11px] text-ink/30 mb-4 uppercase tracking-widest font-bold">یا مستقیم به اینجا بروید</p>
        <div class="flex items-center justify-center gap-6 flex-wrap">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-1.5 text-xs text-ink/40 hover:text-ink/70 transition-colors duration-200"
          >
            <span
              class="w-1 h-1 rounded-full"
              style="background-color: rgba(194,154,69,0.5)"
            />
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- ── ذرات شناور گوشه‌ها ── -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div v-for="p in particles" :key="p.id"
        class="absolute rounded-full animate-particle"
        :style="{
          width:  p.size + 'px',
          height: p.size + 'px',
          top:    p.top  + '%',
          left:   p.left + '%',
          background: p.color,
          animationDuration:  p.duration + 's',
          animationDelay:     p.delay    + 's',
          opacity: p.opacity,
        }"
      />
    </div>

  </div>
</template>

<script setup>
// ─── لینک‌های سریع ───────────────────────────────────────
const quickLinks = [
  { label: 'صفحه اصلی',   to: '/'        },
  { label: 'فروشگاه',     to: '/shop'    },
  { label: 'مجله ماهلین', to: '/journal' },
  { label: 'تماس با ما',  to: '/contact' },
];

// ─── ذرات تصادفی (ثابت برای SSR) ────────────────────────
const particles = [
  { id: 1,  size: 6,  top: 12, left: 8,  color: 'rgba(224,183,88,0.35)',  duration: 8,  delay: 0,   opacity: 0.6 },
  { id: 2,  size: 4,  top: 25, left: 88, color: 'rgba(143,193,217,0.40)', duration: 10, delay: 1.5, opacity: 0.5 },
  { id: 3,  size: 8,  top: 70, left: 5,  color: 'rgba(185,166,222,0.35)', duration: 12, delay: 0.5, opacity: 0.4 },
  { id: 4,  size: 5,  top: 80, left: 90, color: 'rgba(224,183,88,0.30)',  duration: 9,  delay: 2,   opacity: 0.5 },
  { id: 5,  size: 3,  top: 45, left: 3,  color: 'rgba(156,191,160,0.40)', duration: 11, delay: 1,   opacity: 0.6 },
  { id: 6,  size: 7,  top: 15, left: 75, color: 'rgba(243,180,176,0.35)', duration: 7,  delay: 0.8, opacity: 0.4 },
  { id: 7,  size: 4,  top: 60, left: 92, color: 'rgba(224,183,88,0.25)',  duration: 13, delay: 3,   opacity: 0.5 },
  { id: 8,  size: 5,  top: 88, left: 40, color: 'rgba(143,193,217,0.30)', duration: 9,  delay: 1.2, opacity: 0.4 },
  { id: 9,  size: 3,  top: 35, left: 95, color: 'rgba(185,166,222,0.40)', duration: 10, delay: 2.5, opacity: 0.6 },
  { id: 10, size: 6,  top: 5,  left: 50, color: 'rgba(156,191,160,0.30)', duration: 8,  delay: 0.3, opacity: 0.4 },
];

// ─── SEO ─────────────────────────────────────────────────
useSeoMeta({
  title: 'صفحه یافت نشد (۴۰۴) | ماهلین',
  description: 'صفحه مورد نظر شما وجود ندارد.',
  robots: 'noindex',
});
</script>

<style scoped>
/* ── float برای عددها ── */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-10px); }
}
@keyframes floatSlowReverse {
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(8px); }
}

/* ── چرخش آرام دایره ── */
@keyframes spinSlow {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}

/* ── pulse ملایم ── */
@keyframes pulseSoft {
  0%, 100% { opacity: 0.6; transform: scaleX(1);    }
  50%       { opacity: 1;   transform: scaleX(1.15); }
}

/* ── blobs پس‌زمینه ── */
@keyframes blob1 {
  0%, 100% { transform: translate(0, 0)    scale(1);    }
  33%       { transform: translate(30px, -20px) scale(1.08); }
  66%       { transform: translate(-20px, 15px) scale(0.94); }
}
@keyframes blob2 {
  0%, 100% { transform: translate(0, 0)    scale(1);    }
  40%       { transform: translate(-25px, 20px) scale(1.06); }
  70%       { transform: translate(15px, -15px) scale(0.96); }
}
@keyframes blob3 {
  0%, 100% { transform: translate(0, 0)   scale(1);    }
  50%       { transform: translate(20px, 25px) scale(1.10); }
}

/* ── ورود محتوا ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
}

/* ── ذرات شناور ── */
@keyframes particle {
  0%, 100% { transform: translateY(0) scale(1);     opacity: inherit; }
  50%       { transform: translateY(-20px) scale(1.2); opacity: 0.2;    }
}

.animate-float-slow         { animation: floatSlow        4s ease-in-out infinite; }
.animate-float-slow-reverse { animation: floatSlowReverse 4s ease-in-out infinite; }
.animate-spin-slow          { animation: spinSlow         12s linear      infinite; }
.animate-pulse-soft         { animation: pulseSoft        3s ease-in-out  infinite; }
.animate-blob-1             { animation: blob1            10s ease-in-out infinite; }
.animate-blob-2             { animation: blob2            13s ease-in-out infinite; }
.animate-blob-3             { animation: blob3            9s  ease-in-out infinite; }
.animate-particle           { animation: particle         8s  ease-in-out infinite; }

.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.7s ease-out forwards;
}
</style>
<template>
  <section class="relative overflow-hidden">
    <!-- بلاب‌های رنگی پس‌زمینه -->
    <div class="absolute -top-24 -start-24 w-72 h-72 rounded-full bg-blush/30 blur-[100px] pointer-events-none"></div>
    <div class="absolute -bottom-32 -end-16 w-96 h-96 rounded-full bg-sky/25 blur-[120px] pointer-events-none"></div>
    <div class="absolute top-1/3 end-1/4 w-40 h-40 rounded-full bg-lilac/25 blur-[80px] pointer-events-none hidden md:block"></div>
    <div class="absolute bottom-10 start-1/3 w-32 h-32 rounded-full bg-peach/20 blur-[70px] pointer-events-none hidden md:block"></div>

    <div class="max-w-[1280px] mx-auto px-4 md:px-6 pt-16 pb-16 flex flex-wrap gap-12 items-center relative">
      <div class="flex-1 min-w-[300px]">
        <div class="flex items-center gap-3 mb-6 animate-fade-in-up" style="animation-delay:0.05s">
          <span class="w-11 h-px bg-gold"></span>
          <span class="text-xs text-accent">مراقبت پوست علمی</span>
          <span class="w-11 h-px bg-gold"></span>
        </div>

        <h1 class="font-display text-[clamp(32px,4.8vw,58px)] leading-[1.5] text-ink [text-wrap:pretty] animate-fade-in-up" style="animation-delay:0.15s">
          پوست، در
          <span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-gold via-peach to-blush">
            آرامش
            <svg class="absolute -bottom-1 start-0 w-full text-gold/40" height="8" viewBox="0 0 200 8" fill="none">
              <path d="M2 6C40 2 160 2 198 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
          خودش
        </h1>

        <p class="mt-6 max-w-[44ch] text-inkSoft animate-fade-in-up" style="animation-delay:0.25s">
          محصولات ماهلین با معیار دکتر پوست انتخاب می‌شوند؛ بدون توضیحات اغراق‌شده، فقط ترکیبات و کاربرد درست.
        </p>

        <div class="flex flex-wrap items-center gap-6 mt-10 animate-fade-in-up" style="animation-delay:0.35s">
          <!-- Primary CTA -->
          <NuxtLink
            to="/shop"
            class="cta-btn group relative inline-flex items-center gap-3 overflow-hidden rounded-sm
                  px-8 py-4 border border-gold/50 bg-gold/[0.03]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:border-gold
                  active:translate-y-0 active:duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2"
          >
            <!-- حلقه‌ی درخشش نبض‌دار (idle) -->
            <span class="cta-pulse" aria-hidden="true"></span>

            <!-- پرشدگی طلایی با زاویه -->
            <span class="cta-fill" aria-hidden="true"></span>

            <!-- درخشش عبوری (shine) -->
            <span class="cta-shine" aria-hidden="true"></span>

            <span
              class="relative z-10 text-sm font-semibold text-accent transition-colors duration-300 group-hover:text-white"
            >
              مشاهده محصولات
            </span>

            <span class="relative z-10 grid place-items-center w-4 h-4 overflow-hidden">
              <svg
                class="cta-arrow cta-arrow-main w-4 h-4 text-accent !rotate-180"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg
                class="cta-arrow cta-arrow-ghost w-4 h-4 text-white !rotate-180"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </NuxtLink>

          <!-- Secondary link -->
          <NuxtLink
            to="/about"
            class="about-btn group relative inline-flex items-center gap-2.5 py-2 text-sm text-ink/50
                  transition-colors duration-300 hover:text-gold
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 rounded-sm"
          >
            <!-- دات نبض‌دار -->
            <span class="about-dot-wrap relative grid place-items-center w-2.5 h-2.5 flex-shrink-0">
              <span class="about-dot-ping" aria-hidden="true"></span>
              <span class="about-dot" aria-hidden="true"></span>
            </span>

            <span class="relative">
              بیشتر درباره ماهلین

              <!-- Base underline -->
              <span class="absolute -bottom-1 inset-x-0 h-px bg-gold/15" aria-hidden="true"></span>

              <!-- Animated underline (grows from right in RTL) -->
              <span
                class="about-underline absolute -bottom-1 right-0 h-px bg-gradient-to-l from-gold via-peach to-gold w-0"
                aria-hidden="true"
              ></span>
            </span>

            <span class="relative grid place-items-center w-4 h-4 overflow-hidden flex-shrink-0">
              <svg
                class="about-arrow w-3.5 h-3.5 rotate-180"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>

      <div class="flex-1 min-w-[280px] max-w-[420px] mx-auto relative animate-fade-in-up" style="animation-delay:0.2s">
        <div class="absolute -inset-4 rounded-[32px] border border-gold/20 pointer-events-none"></div>
        <div class="absolute -inset-8 rounded-[40px] border border-blush/20 pointer-events-none hidden md:block"></div>

        <div class="aspect-square overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(197,160,89,0.18)] relative">
          <video
            ref="heroVideo"
            src="/video/brand.webm"
            muted
            playsinline
            class="w-full h-full object-cover"
          ></video>
        </div>

        <!-- بج شناور اول -->
        <div class="absolute -bottom-5 -start-5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-2xl px-4 py-3 flex items-center gap-3 animate-float">
          <span class="w-9 h-9 rounded-full bg-sage/20 grid place-items-center text-sage">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div class="leading-tight">
            <p class="text-[11px] font-bold text-ink">تایید شده</p>
            <p class="text-[10px] text-ink/50">توسط متخصص پوست</p>
          </div>
        </div>

        <!-- بج شناور دوم -->
        <div class="absolute -top-4 -end-4 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] rounded-full px-3.5 py-2.5 flex items-center gap-2 animate-float" style="animation-delay:1.2s">
          <span class="w-6 h-6 rounded-full bg-lilac/25 grid place-items-center text-lilac flex-shrink-0">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.1L12 16.3 5.7 20.7 8 13.6 2 9.2h7.6z"/></svg>
          </span>
          <p class="text-[10px] font-bold text-ink">جنس اورجینال</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const heroVideo = ref(null)
let observer = null

onMounted(() => {
  if (!heroVideo.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = heroVideo.value
        if (!video) return

        if (entry.isIntersecting) {
          // هر بار که وارد ویوپورت میشه از اول پخش بشه
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.4 } // وقتی حداقل ۴۰٪ ویدیو دیده بشه
  )

  observer.observe(heroVideo.value)
})

onBeforeUnmount(() => {
  if (observer && heroVideo.value) {
    observer.unobserve(heroVideo.value)
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.75s ease-out forwards;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-float {
  animation: float 3.5s ease-in-out infinite;
}

/* ── حلقه‌ی نبض‌دار دور دکمه در حالت idle ─────────────────── */
.cta-pulse {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid rgba(162, 132, 102, 0.5);
  opacity: 0;
  animation: ctaPulse 2.8s ease-out infinite;
  pointer-events: none;
}
@keyframes ctaPulse {
  0%   { transform: scale(1);    opacity: 0.5; }
  70%  { transform: scale(1.08); opacity: 0; }
  100% { transform: scale(1.08); opacity: 0; }
}
.cta-btn:hover .cta-pulse { animation-play-state: paused; opacity: 0; }

/* ── پرشدگی طلایی با زاویه‌ی مورب ───────────────────────── */
.cta-fill {
  position: absolute;
  inset: -2px;
  background: linear-gradient(120deg, #C5A059 0%, #A28466 55%, #8B6F4E 100%);
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
  transition: clip-path 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  pointer-events: none;
}
.cta-btn:hover .cta-fill {
  clip-path: polygon(0 100%, 100% 100%, 100% 0%, 0% 0%);
}

/* ── درخشش عبوری (shine sweep) ──────────────────────────── */
.cta-shine {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.cta-shine::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 45%;
  background: linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%);
  transform: translateX(-220%) skewX(-20deg);
  transition: transform 0.05s;
}
.cta-btn:hover .cta-shine::before {
  transform: translateX(320%) skewX(-20deg);
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
}

/* ── شادو دینامیک (بزرگ‌تر و نرم‌تر از قبل) ─────────────── */
.cta-btn {
  box-shadow: 0 4px 14px -6px rgba(197, 160, 89, 0.15);
  transition: box-shadow 0.4s ease, transform 0.3s ease, border-color 0.3s ease;
}
.cta-btn:hover {
  box-shadow: 0 16px 40px -10px rgba(197, 160, 89, 0.4), 0 4px 12px -4px rgba(197, 160, 89, 0.25);
}
.cta-btn:active {
  box-shadow: 0 6px 16px -8px rgba(197, 160, 89, 0.3);
}

/* ── انیمیشن دوگانه‌ی فلش (اصلی خارج می‌شه، شبح وارد می‌شه) ── */
.cta-arrow {
  position: absolute;
  inset: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
}
.cta-arrow-main {
  opacity: 1;
  transform: translateX(0);
}
.cta-arrow-ghost {
  opacity: 0;
  transform: translateX(120%);
}
.cta-btn:hover .cta-arrow-main {
  opacity: 0;
  transform: translateX(-120%);
}
.cta-btn:hover .cta-arrow-ghost {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.08s;
}

/* ══════════════════════════════════════════════════════════
   انیمیشن دکمه‌ی «بیشتر درباره ماهلین»
   ══════════════════════════════════════════════════════════ */

/* دات ثابت */
.about-dot {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.35;
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.about-btn:hover .about-dot {
  opacity: 1;
  background: #C5A059;
  transform: scale(1.5);
  box-shadow: 0 0 10px rgba(197, 160, 89, 0.55);
}

/* حلقه‌ی پینگ دور دات (idle) */
.about-dot-ping {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(197, 160, 89, 0.5);
  opacity: 0;
  animation: aboutPing 2.6s ease-out infinite;
}
@keyframes aboutPing {
  0%   { transform: scale(1);   opacity: 0.6; }
  75%  { transform: scale(3.2); opacity: 0; }
  100% { transform: scale(3.2); opacity: 0; }
}
.about-btn:hover .about-dot-ping { animation-play-state: paused; opacity: 0; }

/* آندرلاین متحرک */
.about-underline {
  transition: width 0.45s cubic-bezier(0.65, 0, 0.35, 1);
}
.about-btn:hover .about-underline {
  width: 100%;
}

/* فلش لغزنده به سمت جهت متن (RTL) */
.about-arrow {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  opacity: 0.6;
}
.about-btn:hover .about-arrow {
  transform: rotate(0);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .cta-pulse,
  .cta-shine::before,
  .cta-arrow,
  .about-dot-ping,
  .about-dot,
  .about-underline,
  .about-arrow {
    animation: none !important;
    transition: none !important;
  }
}
</style>
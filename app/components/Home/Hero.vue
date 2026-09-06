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
            class="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm
                  px-8 py-4 border border-gold/50 bg-gold/[0.03]
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:border-gold
                  hover:shadow-[0_12px_32px_rgba(197,160,89,0.18)]
                  active:translate-y-0
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2"
          >
            <!-- Gold fill -->
            <span
              class="absolute inset-0 translate-y-full bg-gold transition-transform duration-300 ease-out group-hover:translate-y-0"
              aria-hidden="true"
            ></span>

            <span
              class="relative z-10 text-sm font-semibold text-accent transition-colors duration-300 group-hover:text-white"
            >
              مشاهده محصولات
            </span>

            <svg
              class="relative z-10 w-4 h-4 text-accent transition-all duration-300
                    group-hover:text-white group-hover:-translate-x-1 rotate-180"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>

          <!-- Secondary link -->
          <NuxtLink
            to="/about"
            class="group relative inline-flex items-center py-2 text-sm text-ink/50
                  transition-colors duration-300 hover:text-gold
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 rounded-sm"
          >
            <span class="relative">
              بیشتر درباره ماهلین

              <!-- Base underline -->
              <span class="absolute -bottom-1 inset-x-0 h-px bg-gold/15" aria-hidden="true"></span>

              <!-- Animated underline (grows from right in RTL) -->
              <span
                class="absolute -bottom-1 right-0 h-px bg-gold w-0 transition-all duration-300 ease-out group-hover:w-full"
                aria-hidden="true"
              ></span>
            </span>
          </NuxtLink>
        </div>
      </div>

      <div class="flex-1 min-w-[280px] max-w-[420px] mx-auto relative animate-fade-in-up" style="animation-delay:0.2s">
        <div class="absolute -inset-4 rounded-[32px] border border-gold/20 pointer-events-none"></div>
        <div class="absolute -inset-8 rounded-[40px] border border-blush/20 pointer-events-none hidden md:block"></div>

        <div class="aspect-square overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(197,160,89,0.18)] relative">
          <video
            src="/video/brand.webm"
            autoplay
            loop
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
</style>
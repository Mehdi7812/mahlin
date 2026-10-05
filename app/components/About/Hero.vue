<template>
  <section
    class="relative mx-auto mb-24 grid max-w-[1160px] grid-cols-1 items-center gap-10 md:mb-28 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-20"
    aria-label="معرفی ماهلین"
  >
    <!-- ═══════════ متن ═══════════ -->
    <div class="min-w-0 text-center md:text-start">
      <!-- بج -->
      <div
        v-reveal
        class="mb-5 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.07] px-3.5 py-2 text-xs font-bold text-accent"
      >
        <span class="relative flex h-[7px] w-[7px]">
          <span
            class="absolute -inset-1 animate-[dot-pulse_2.2s_ease-out_infinite] rounded-full border border-accent/50"
            aria-hidden="true"
          />
          <span class="relative h-full w-full rounded-full bg-accent" aria-hidden="true" />
        </span>
        <span>درباره ماهلین</span>
        <span class="h-3 w-px bg-accent/30" aria-hidden="true" />
        <span class="font-semibold text-accent/65">مراقبت علمی پوست</span>
      </div>

      <!-- عنوان با انیمیشن کلمه‌به‌کلمه -->
      <h1
        class="m-0 text-[clamp(2.2rem,5.4vw,4.2rem)] font-extrabold leading-[1.35] tracking-tight text-ink"
        aria-label="مراقبت از پوست، آگاهانه‌تر از همیشه"
      >
        <span class="block" aria-hidden="true">
          <span class="inline-block animate-[word-in_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:120ms]">مراقبت</span>
          <span class="inline-block animate-[word-in_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:195ms]">از</span>
          <span class="inline-block animate-[word-in_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:270ms]">پوست،</span>
        </span>

        <span
            class="mx-auto block w-fit animate-[gradient-shift_7s_ease-in-out_infinite_alternate] bg-gradient-to-l from-[#9F7851] via-[#D5AD68] to-[#D88883] bg-clip-text bg-[length:200%_auto] text-transparent md:mx-0"
            aria-hidden="true"
        >
            <!-- کلمه‌های بیرونی با گرادیان一样 -->
            <span class="inline-block animate-[word-in-plain_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:345ms] bg-gradient-to-l from-[#9F7851] via-[#D5AD68] to-[#D88883] bg-clip-text bg-[length:200%_auto] text-transparent">
                آگاهانه‌تر
            </span>
            <span class="inline-block animate-[word-in-plain_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:420ms] bg-gradient-to-l from-[#9F7851] via-[#D5AD68] to-[#D88883] bg-clip-text bg-[length:200%_auto] text-transparent">
                از
            </span>

            <!-- کلمه‌ی همیشه با زیرخط -->
            <span class="relative inline-block animate-[word-in-plain_650ms_cubic-bezier(0.2,0.8,0.25,1)_both] [animation-delay:495ms]">
                <!-- متن باید خودش رنگ داشته باشد چون زیرخط جدا است -->
                <span class="inline-block text-transparent bg-gradient-to-l from-[#9F7851] via-[#D5AD68] to-[#D88883] bg-clip-text bg-[length:200%_auto]">
                همیشه
                </span>
                <svg
                class="absolute -bottom-1 start-0 h-[0.22em] w-full text-[#D5AD68]/85"
                viewBox="0 0 220 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                >
                <path
                    class="animate-[draw-underline_900ms_cubic-bezier(0.4,0,0.2,1)_both] [animation-delay:825ms] [stroke-dasharray:220] [stroke-dashoffset:220]"
                    d="M4 10C50 3 170 3 216 9"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="round"
                />
                </svg>
            </span>
        </span>
      </h1>

      <!-- توضیحات -->
      <div v-reveal="520" class="mx-auto mt-6 max-w-[590px] space-y-3.5 text-start text-[15px] leading-8 text-ink/65 md:mx-0">
        <p class="m-0 text-base font-medium text-ink/80">
          مجموعه <strong class="font-bold text-ink">دکتر ماهلین</strong> با هدف ایجاد تجربه‌ای
          <mark class="rounded-md bg-gold/25 px-1 py-0.5 text-[#8A6A43] [box-decoration-break:clone]">مطمئن و آگاهانه</mark>
          در مسیر مراقبت از پوست شکل گرفته است.
        </p>
        <p class="m-0">
          در ماهلین تلاش می‌کنیم مجموعه‌ای از محصولات مراقبت پوستی باکیفیت و معتبر را در اختیار شما قرار دهیم؛ محصولاتی که انتخاب آن‌ها بر پایه
          <mark class="rounded-md bg-gold/25 px-1 py-0.5 text-[#8A6A43] [box-decoration-break:clone]">شناخت ترکیبات، نیازهای پوستی و کاربرد واقعی</mark>
          آن‌ها انجام می‌شود.
        </p>
        <p class="m-0">
          برای ما مراقبت از پوست فقط خرید یک محصول نیست؛ شناخت نوع پوست، تشخیص دغدغه‌های اصلی و انتخاب محصولی متناسب با نیاز آن، بخش مهمی از این مسیر است. به همین دلیل، در کنار ارائه محصولات،
          <strong class="font-bold text-ink">مشاوره تخصصی پوست</strong>
          را نیز در ماهلین جدی می‌گیریم.
        </p>
      </div>

      <!-- دکمه‌ها -->
      <div v-reveal="620" class="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
        <NuxtLink
          to="/shop"
          class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-gradient-to-l from-ink to-[#2E2A26] px-6 py-3.5 text-sm font-bold text-cream shadow-[0_10px_24px_-14px_rgba(63,58,53,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_16px_32px_-14px_rgba(162,132,102,0.65)]"
        >
          <span
            class="absolute inset-0 -translate-x-[160%] bg-gradient-to-l from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[160%]"
            aria-hidden="true"
          />
          <span class="relative z-10">مشاهده محصولات</span>
          <Icon name="tabler:arrow-left" class="relative z-10 text-lg transition-transform duration-300 group-hover:-translate-x-1" />
        </NuxtLink>

        <a
          href="#why-mahlin"
          class="group inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-2 pe-2.5 ps-5 text-sm font-bold text-ink/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
        >
          <span>چرا ماهلین؟</span>
          <span class="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-accent transition-transform duration-300">
            <Icon name="tabler:chevron-down" class="text-sm" />
          </span>
        </a>
      </div>

      <!-- آمار با شمارنده -->
      <div
        v-reveal="700"
        class="mx-auto mt-8 flex w-fit flex-wrap items-stretch justify-center gap-x-5 gap-y-4 rounded-2xl border border-ink/[0.07] bg-white/65 px-5 py-4 shadow-[0_10px_28px_-24px_rgba(63,58,53,0.4)] backdrop-blur-md md:mx-0"
      >
        <div v-for="(stat, i) in heroStats" :key="stat.label" class="relative grid min-w-[74px] gap-1 items-center justify-center">
          <strong class="m-0 font-latin text-[22px] font-extrabold leading-none text-ink text-center" dir="ltr">
            {{ stat.display }}<span class="text-base text-gold">{{ stat.suffix }}</span>
          </strong>
          <span class="text-[11px] font-semibold text-ink/50">{{ stat.label }}</span>
          <span
            v-if="i < heroStats.length - 1"
            class="absolute -end-2.5 top-1/2 hidden h-7 w-px -translate-y-1/2 bg-ink/10 sm:block"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- شعار -->
      <p v-reveal="780" class="mx-auto mt-6 flex max-w-[560px] items-start gap-3 text-start text-xs leading-relaxed text-ink/55 md:mx-0">
        <span class="mt-0.5 h-10 w-0.5 shrink-0 rounded-full bg-gradient-to-b from-gold to-gold/10" aria-hidden="true" />
        <span>
          ماهلین؛ همراه همیشگی شما برای داشتن پوستی سالم‌تر، متعادل‌تر و زیباتر —
          <strong class="font-bold text-[#9C784E]">با ماهلین باشید تا مثل ماه بدرخشید.</strong>
        </span>
      </p>
    </div>

    <!-- ═══════════ کارت سه‌بعدی ═══════════ -->
    <div
      v-reveal="250"
      class="group relative mx-auto w-full max-w-[440px] [perspective:1100px]"
      role="img"
      aria-label="رویکرد ماهلین: شناخت پوست، انتخاب محصول و همراهی تخصصی"
      @pointerenter="onArtEnter"
      @pointermove="onArtMove"
      @pointerleave="onArtLeave"
    >
      <div
        ref="artCard"
        class="tilt-card relative grid min-h-[370px] place-items-center overflow-hidden rounded-[2.4rem] border border-white/80 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.55),transparent_34%),linear-gradient(145deg,#F7EFE5,#fff_56%,#EBE8E1)] shadow-[0_32px_70px_-38px_rgba(95,70,48,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] sm:min-h-[440px]"
      >
        <!-- نور دنبال‌کننده‌ی موس -->
        <span
          class="cursor-spot absolute inset-0 z-[5] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span class="absolute start-6 top-6 font-latin text-[10px] font-bold tracking-[0.2em] text-ink/40">
          MAHLIN · SKINCARE
        </span>

        <!-- مدار خارجی + قمر -->
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-4/5 animate-[orbit-spin_30s_linear_infinite] rounded-full border border-accent/20"
          aria-hidden="true"
        >
          <span class="absolute -top-[5px] left-1/2 h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#FFF,#C5A059)] shadow-[0_0_12px_rgba(197,160,89,0.8)]" />
        </div>

        <!-- مدار داخلی -->
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[58%] animate-[orbit-spin_22s_linear_infinite_reverse] rounded-full border border-dashed border-accent/25"
          aria-hidden="true"
        />

        <!-- ماه با لوگوی ماهلین به اندازه‌ی کامل ماه -->
        <div
            class="relative h-[124px] w-[124px] rounded-full sm:h-[148px] sm:w-[148px]"
            aria-hidden="true"
        >
            <!-- هاله‌ی نور طلایی پشت ماه -->
            <span
                class="pointer-events-none absolute -inset-[22px] z-0 animate-[moon-glow_4s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(213,173,107,0.35),transparent_65%)]"
            />

            <!-- حلقه‌ی طلایی نرم دور لوگو -->
            <span
                class="pointer-events-none absolute -inset-[6px] z-[1] rounded-full bg-[conic-gradient(from_140deg,#E6C98F,#C69D63,#A37F5F,#E6C98F)] opacity-70 blur-[2px]"
            />

            <!-- لوگو به اندازه‌ی کامل ماه -->
            <img
                src="/logo/logo.png"
                alt="Mahlin"
                draggable="false"
                class="relative z-10 h-full w-full rounded-full bg-[#F7EFE5] object-contain p-2 shadow-[inset_-12px_-14px_30px_rgba(110,80,50,0.18),0_22px_50px_-18px_rgba(143,106,63,0.65)]"
            />
        </div>

        <!-- جرقه‌ها -->
        <span class="absolute end-[20%] top-[23%] animate-[sparkle_3.2s_ease-in-out_infinite] text-2xl text-[#AE895E]" aria-hidden="true">✦</span>
        <span class="absolute bottom-[30%] start-[19%] animate-[sparkle_3.2s_ease-in-out_infinite] text-3xl text-[#AE895E] [animation-delay:0.8s]" aria-hidden="true">✧</span>
        <span class="absolute start-[15%] top-[39%] animate-[sparkle_3.2s_ease-in-out_infinite] text-sm text-[#AE895E] [animation-delay:1.5s]" aria-hidden="true">✦</span>

        <!-- برچسب‌های شیشه‌ای -->
        <div class="absolute end-[5%] top-[27%] z-[6] inline-flex animate-[float-y_4.5s_ease-in-out_infinite] items-center gap-2 rounded-full border border-white/85 bg-white/80 py-2 pe-3.5 ps-2 text-xs font-bold text-ink/70 shadow-[0_10px_26px_-16px_rgba(63,58,53,0.55)] backdrop-blur-md">
          <span class="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#6BA5C4]/15 text-[#5B93B4]">
            <Icon name="tabler:microscope" class="text-sm" />
          </span>
          <span>شناخت پوست</span>
        </div>

        <div class="absolute bottom-[27%] start-[4%] z-[6] inline-flex animate-[float-y_5.2s_ease-in-out_infinite_reverse] items-center gap-2 rounded-full border border-white/85 bg-white/80 py-2 pe-3.5 ps-2 text-xs font-bold text-ink/70 shadow-[0_10px_26px_-16px_rgba(63,58,53,0.55)] backdrop-blur-md">
          <span class="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#7BA582]/[0.18] text-[#638F6B]">
            <Icon name="tabler:heart-handshake" class="text-sm" />
          </span>
          <span>همراهی تخصصی</span>
        </div>

        <!-- کپشن پایین کارت -->
        <div class="absolute inset-x-5 bottom-5 z-[6] flex items-center gap-3 border-t border-ink/10 pt-4">
          <span class="font-latin text-[22px] font-extrabold text-accent">01</span>
          <div class="min-w-0">
            <p class="m-0 text-[13px] font-bold text-ink">اول پوست را می‌شناسیم</p>
            <span class="mt-0.5 block text-[11px] text-ink/50">بعد انتخاب می‌کنیم</span>
          </div>
          <Icon name="tabler:arrow-left" class="ms-auto shrink-0 text-base text-accent/60" />
        </div>
      </div>

      <!-- بج‌های بیرونی -->
      <span class="absolute -start-5 top-[16%] z-[8] hidden animate-[badge-float_5s_ease-in-out_infinite] items-center gap-2 rounded-2xl border border-white/85 bg-white/90 px-3.5 py-2.5 text-xs font-bold text-[#51483E] shadow-[0_14px_32px_-18px_rgba(63,58,53,0.55)] backdrop-blur-md sm:inline-flex">
        <Icon name="tabler:rosette-discount-check" class="text-base text-[#6B956D]" />
        اصالت تضمینی
      </span>

      <span class="absolute -end-4 bottom-[19%] z-[8] hidden animate-[badge-float_5.6s_ease-in-out_infinite_reverse] items-center gap-2 rounded-2xl border border-white/85 bg-white/90 px-3.5 py-2.5 text-xs font-bold text-[#51483E] shadow-[0_14px_32px_-18px_rgba(63,58,53,0.55)] backdrop-blur-md sm:inline-flex">
        <span class="h-[7px] w-[7px] rounded-full bg-gold ring-[3px] ring-gold/20" aria-hidden="true" />
        انتخاب متناسب با پوست شما
      </span>
    </div>

    <!-- نشانگر اسکرول -->
    <!-- <a
      href="#why-mahlin"
      class="absolute -bottom-12 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-bold text-ink/40 transition-colors duration-300 hover:text-accent md:flex"
    >
      <span class="relative h-8 w-5 rounded-full border-2 border-current" aria-hidden="true">
        <span class="absolute left-1/2 top-[5px] h-1.5 w-[3px] -translate-x-1/2 animate-[scroll-wheel_1.8s_ease-in-out_infinite] rounded-full bg-current" />
      </span>
      <span>اسکرول کنید</span>
    </a> -->
  </section>
</template>

<script setup>
/* ── شمارنده‌ی آمار ─────────────────────────────────────── */
const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const toFa = (value) => String(value).replace(/\d/g, (d) => FA_DIGITS[d])

const heroStats = ref([
  { target: 30, suffix: '+', label: 'محصول تخصصی', display: '۰' },
  { target: 98, suffix: '٪', label: 'رضایت مشتریان', display: '۰' },
  { target: 4.9, suffix: '', label: 'امتیاز از ۵', display: '۰', decimals: 1 },
])

function settleCounters() {
  heroStats.value.forEach((stat) => {
    stat.display = toFa(stat.decimals ? stat.target.toFixed(1) : stat.target)
  })
}

function animateCounters() {
  if (typeof window === 'undefined') return

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    settleCounters()
    return
  }

  const duration = 1400
  const start = performance.now()

  const frame = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic

    heroStats.value.forEach((stat) => {
      const value = stat.target * eased
      stat.display = toFa(stat.decimals ? value.toFixed(stat.decimals) : Math.round(value))
    })

    if (t < 1) requestAnimationFrame(frame)
    else settleCounters()
  }

  setTimeout(() => requestAnimationFrame(frame), 650)
}

/* ── چرخش سه‌بعدی کارت با موس ───────────────────────────── */
const artCard = ref(null)
let artRect = null

function onArtEnter(event) {
  artRect = event.currentTarget.getBoundingClientRect()
}

function onArtMove(event) {
  const card = artCard.value
  if (!card || !artRect) return

  const px = (event.clientX - artRect.left) / artRect.width
  const py = (event.clientY - artRect.top) / artRect.height

  card.style.setProperty('--tilt-x', `${(py - 0.5) * -9}deg`)
  card.style.setProperty('--tilt-y', `${(px - 0.5) * 9}deg`)
  card.style.setProperty('--gx', `${px * 100}%`)
  card.style.setProperty('--gy', `${py * 100}%`)
}

function onArtLeave() {
  const card = artCard.value
  if (!card) return
  artRect = null
  card.style.setProperty('--tilt-x', '0deg')
  card.style.setProperty('--tilt-y', '0deg')
  card.style.setProperty('--gx', '50%')
  card.style.setProperty('--gy', '50%')
}

onMounted(animateCounters)
</script>

<style scoped>
/* فقط دو قانون که با تیلویند نمی‌شود: ترنسفورم پویا و گرادیان وابسته به موقعیت موس */
.tilt-card {
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 0.18s ease-out;
  will-change: transform;
}

.cursor-spot {
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.55), transparent 42%);
}
</style>
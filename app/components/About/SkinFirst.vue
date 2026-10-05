<template>
  <section
    v-reveal
    class="relative mb-24 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[clamp(1.7rem,4vw,2.75rem)] border border-accent/15 bg-[radial-gradient(circle_at_0%_100%,rgba(222,142,137,0.11),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(197,160,89,0.13),transparent_32%),linear-gradient(135deg,#F8F4EE,#FDFBF8_55%,#F7F1EB)] p-6 shadow-[0_28px_70px_-54px_rgba(95,70,48,0.55)] sm:p-10 md:mb-32 md:grid-cols-[1.1fr_0.9fr] md:gap-12 lg:p-14"
  >
    <!-- درخشش داخلی -->
    <span class="pointer-events-none absolute -top-36 end-[35%] h-[300px] w-[300px] rounded-full bg-gold/10 blur-[90px]" aria-hidden="true" />

    <!-- ═══ متن ═══ -->
    <div class="relative z-[1]">
      <span class="mb-2.5 inline-block rounded-full border border-accent/20 bg-white/60 px-3 py-1.5 text-xs font-extrabold text-accent">
        رویکرد اساسی ما
      </span>

      <h2 class="mb-4 mt-1 text-[clamp(1.7rem,3.2vw,2.65rem)] font-extrabold leading-snug text-ink">
        پوست، قبل از محصول
      </h2>

      <div class="space-y-3 text-sm leading-8 text-ink/70 sm:text-[15px]">
        <p class="m-0">ما معتقدیم هیچ محصولی برای همه پوست‌ها بهترین نیست.</p>
        <p class="m-0">
          انتخاب درست باید از شناخت پوست شروع شود؛ از نوع پوست و وضعیت سد دفاعی گرفته تا دغدغه‌هایی مثل جوش، لک، دهیدراتگی، حساسیت و علائم پیری.
        </p>
        <p class="m-0">
          به همین دلیل در ماهلین تلاش می‌کنیم به جای پیشنهادهای کلی و ترندهای زودگذر، شما را به سمت انتخاب آگاهانه‌تر و روتین متناسب با پوستتان هدایت کنیم.
        </p>
      </div>

      <!-- نقل‌قول -->
      <blockquote class="relative mt-5 rounded-ss-md rounded-se-2xl rounded-ee-2xl rounded-es-md border-s-[3px] border-gold bg-white/70 px-4 py-4 shadow-[0_12px_28px_-25px_rgba(63,58,53,0.5)] sm:px-5">
        <Icon name="tabler:quote" class="mb-1 block text-xl text-accent/50" aria-hidden="true" />
        <p class="m-0 text-[15px] font-extrabold leading-8 text-ink">
          «در ماهلین، اول پوست را می‌شناسیم؛ بعد محصول را انتخاب می‌کنیم.»
        </p>
      </blockquote>
    </div>

    <!-- ═══ پنل دغدغه‌ها ═══ -->
    <div class="relative z-[1] rounded-3xl border border-white/80 bg-white/65 p-5 shadow-[0_18px_45px_-35px_rgba(63,58,53,0.35)] backdrop-blur-xl sm:p-7">
      <div class="mb-4 flex items-center gap-3">
        <span class="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-accent/10 text-xl text-accent">
          <Icon name="tabler:scan" />
        </span>
        <div>
          <h3 class="m-0 text-sm font-extrabold text-ink">هر پوست، داستان خودش را دارد</h3>
          <p class="m-0 mt-1 text-[11px] text-ink/50">چند مورد از چیزهایی که در انتخاب بررسی می‌کنیم</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="concern in concerns"
          :key="concern"
          class="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white/80 px-3 py-2 text-xs font-semibold text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white hover:text-accent"
        >
          <Icon name="tabler:check" class="text-[13px] text-sage" />
          {{ concern }}
        </span>
      </div>

      <div class="mt-4 flex items-start gap-2 border-t border-ink/[0.07] pt-4 text-ink/50">
        <Icon name="tabler:info-circle" class="mt-0.5 shrink-0 text-sm text-accent" />
        <p class="m-0 text-[11px] leading-6">
          پیشنهادها بر اساس نیاز پوست شما شکل می‌گیرند، نه صرفاً بر اساس ترندهای روز.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const concerns = [
  'نوع پوست',
  'وضعیت سد دفاعی',
  'جوش و آکنه',
  'لک و تیرگی',
  'دهیدراتگی',
  'حساسیت و قرمزی',
  'علائم پیری',
  'منافذ باز',
]
</script>
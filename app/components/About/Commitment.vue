<template>
  <section
    v-reveal
    class="mx-auto mb-24 grid max-w-[1050px] grid-cols-1 items-center gap-6 rounded-3xl border border-ink/[0.07] bg-white/70 p-6 text-center shadow-[0_18px_50px_-42px_rgba(63,58,53,0.45)] sm:grid-cols-[auto_1fr] sm:text-start md:mb-32 md:gap-10 md:p-10 lg:grid-cols-[auto_1fr_auto]"
  >
    <!-- آیکون -->
    <div class="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-sage/20 bg-sage/10 text-[#638F6B] sm:mx-0">
      <Icon name="tabler:shield-check" class="text-[27px]" />
    </div>

    <!-- متن -->
    <div>
      <span class="mb-2 block text-xs font-extrabold text-accent">پایه‌ی رابطه‌ی ما</span>
      <h2 class="m-0 mb-2.5 text-[clamp(1.45rem,2.5vw,1.9rem)] font-extrabold text-ink">تعهد ماهلین</h2>

      <p class="m-0 text-sm leading-8 text-ink/65">
        ما در مجموعه ماهلین تلاش می‌کنیم اطلاعات محصولات را
        <strong class="font-bold text-ink">شفاف، کاربردی و قابل فهم</strong>
        ارائه کنیم و در انتخاب محصولات، نیاز واقعی پوست را در اولویت قرار دهیم.
      </p>

      <p class="mt-2 text-[13px] leading-7 text-ink/55">
        هدف ما ساختن یک رابطه بلندمدت با شماست؛ رابطه‌ای که پایه آن اعتماد، کیفیت و انتخاب آگاهانه باشد.
      </p>
    </div>

    <!-- نقاط کلیدی -->
    <div class="flex flex-wrap justify-center gap-x-5 gap-y-2.5 sm:col-span-2 sm:justify-start sm:border-t sm:border-ink/[0.07] sm:pt-4 lg:col-span-1 lg:flex-col lg:gap-2.5 lg:border-0 lg:pt-0">
      <span
        v-for="point in points"
        :key="point"
        class="inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold text-ink/60"
      >
        <Icon name="tabler:check" class="text-sm text-[#6E9B75]" />
        {{ point }}
      </span>
    </div>
  </section>
</template>

<script setup>
const points = ['اطلاعات شفاف', 'انتخاب متناسب', 'همراهی مداوم']
</script>
<template>
  <section
    v-reveal
    class="relative isolate overflow-hidden rounded-[clamp(1.8rem,4vw,2.8rem)] border border-white/10 bg-[radial-gradient(circle_at_50%_-10%,rgba(197,160,89,0.2),transparent_40%),linear-gradient(135deg,#25211E,#3F3A35_55%,#292522)] px-6 py-12 text-cream shadow-[0_28px_70px_-38px_rgba(45,40,36,0.65)] sm:px-12 md:py-16 lg:px-16 lg:py-[4.5rem]"
  >
    <!-- قاب داخلی ظریف -->
    <span class="pointer-events-none absolute inset-3 rounded-[clamp(1.4rem,3.5vw,2.4rem)] border border-white/[0.07]" aria-hidden="true" />

    <!-- درخشش‌های تزئینی -->
    <div
      class="pointer-events-none absolute -start-[70px] -top-[180px] h-[300px] w-[300px] animate-[glow-float_11s_ease-in-out_infinite_alternate] rounded-full bg-gold/25 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-[210px] -end-[140px] h-[300px] w-[300px] animate-[glow-float_11s_ease-in-out_infinite_alternate] rounded-full bg-blush/20 blur-[100px] [animation-delay:-4s]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[720px] space-y-5 text-center">
      <!-- بج -->
      <span class="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-2 text-xs font-extrabold text-[#E2C28B]">
        <span class="relative flex h-[7px] w-[7px]">
          <span class="absolute -inset-1 animate-[dot-pulse_2.2s_ease-out_infinite] rounded-full border border-[#D3AD6B]/60" aria-hidden="true" />
          <span class="relative h-full w-full rounded-full bg-[#D3AD6B]" aria-hidden="true" />
        </span>
        مشاوره تخصصی پوست
      </span>

      <h2 class="m-0 text-[clamp(1.65rem,4vw,2.7rem)] font-extrabold leading-[1.5] text-[#FFFAF2]">
        تو هم نمی‌دونی چه محصولی برای پوستت مناسب است؟
      </h2>

      <p class="m-0 text-base leading-8 text-cream/80">
        نوع پوست و دغدغه پوستی تو، اولین قدم برای انتخاب درست است.
      </p>

      <p class="mx-auto max-w-[580px] rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-[13px] leading-7 text-cream/65">
        برای دریافت مشاوره تخصصی، از طریق شماره زیر در
        <strong class="font-bold text-cream">واتساپ، تلگرام یا بله</strong>
        پیام بگذار تا زمان مشاوره برایت ثبت شود.
      </p>

      <!-- شماره تماس -->
      <a
        href="tel:+989922655520"
        dir="ltr"
        class="group inline-flex items-center gap-3 rounded-2xl border border-[#D3AD6B]/35 bg-white/[0.075] px-5 py-3.5 font-latin text-xl font-extrabold text-[#FFFAF2] shadow-[0_12px_30px_-22px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3AD6B]/75 hover:bg-white/10 hover:shadow-[0_18px_35px_-22px_rgba(0,0,0,0.8)] sm:px-7 sm:text-2xl"
      >
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-[#D3AD6B]/15 text-base text-[#E2C28B]">
          <Icon name="tabler:phone" />
        </span>
        <span>0992-265-5520</span>
        <!-- <Icon
          name="tabler:arrow-up-left"
          class="text-base text-cream/45 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E2C28B]"
        /> -->
      </a>

      <!-- پیام‌رسان‌ها -->
      <div class="flex flex-wrap items-center justify-center gap-2.5 pt-1" aria-label="راه‌های ارتباطی برای مشاوره">
        <a
          v-for="channel in channels"
          :key="channel.name"
          :href="channel.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-2.5 text-xs font-bold text-cream/80 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          :class="[channel.iconColor, channel.hoverClasses]"
        >
          <Icon :name="channel.icon" class="text-base" />
          <span>{{ channel.name }}</span>
          <!-- <Icon name="tabler:external-link" class="text-xs text-cream/35" /> -->
        </a>
      </div>

      <p class="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-cream/40">
        <Icon name="tabler:clock" class="text-sm text-[#D3AD6B]" />
        برای هماهنگی زمان مشاوره، پیام بگذارید.
      </p>
    </div>
  </section>
</template>

<script setup>
const channels = [
  {
    name: 'واتساپ',
    href: 'https://wa.me/989922655520',
    icon: 'tabler:brand-whatsapp',
    iconColor: 'text-[#35C879]',
    hoverClasses: 'hover:border-[#35C879]/50 hover:bg-[#35C879]/10',
  },
  {
    name: 'تلگرام',
    href: 'https://t.me/dr_mahlinn',
    icon: 'tabler:brand-telegram',
    iconColor: 'text-[#39A9E8]',
    hoverClasses: 'hover:border-[#39A9E8]/50 hover:bg-[#39A9E8]/10',
  },
  {
    name: 'بله',
    href: 'https://ble.ir/09922655520',
    icon: 'tabler:message-circle',
    iconColor: 'text-[#4CEBB4]',
    hoverClasses: 'hover:border-[#4CEBB4]/50 hover:bg-[#4CEBB4]/10',
  },
]
</script>
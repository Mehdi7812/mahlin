<template>
  <section id="why-mahlin" class="mb-24 scroll-mt-24 md:mb-32">
    <!-- هدر سکشن -->
    <div v-reveal class="mx-auto mb-10 max-w-[620px] text-center md:mb-14">
      <span class="mb-2.5 block text-xs font-extrabold tracking-wide text-accent">اصالت، تخصص و همراهی</span>
      <h2 class="m-0 text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-snug text-ink">چرا ماهلین؟</h2>
      <p class="mx-auto mt-2.5 max-w-md text-sm leading-7 text-ink/50">
        از انتخاب محصول تا ساخت روتین، در مسیر مراقبت از پوست کنار شما هستیم.
      </p>
    </div>

    <!-- کارت‌ها -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="(item, index) in items"
        :key="item.title"
        v-reveal="index * 80"
        class="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/[0.07] bg-white/80 p-6 shadow-[0_10px_30px_-25px_rgba(63,58,53,0.36)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-2 sm:min-h-[270px] sm:p-7"
        :class="[item.hoverBorder, item.hoverShadow]"
      >
        <!-- دایره‌ی تزئینی گوشه -->
        <span
          class="absolute -end-14 -top-14 h-32 w-32 rounded-full blur-[2px] transition-transform duration-500 group-hover:scale-[1.35]"
          :class="item.decor"
          aria-hidden="true"
        />

        <div class="relative mb-5 flex items-start justify-between">
          <span
            class="grid h-[50px] w-[50px] place-items-center rounded-2xl border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-[1.08]"
            :class="[item.iconBox, item.iconHoverShadow]"
          >
            <Icon :name="item.icon" class="text-[23px]" />
          </span>
          <span class="font-latin text-xs font-extrabold" :class="item.number">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
        </div>

        <h3 class="relative mb-2.5 text-base font-extrabold text-ink">{{ item.title }}</h3>
        <p class="relative m-0 text-[13px] leading-7 text-ink/60">{{ item.desc }}</p>

        <span class="relative mt-auto block pt-5" aria-hidden="true">
          <span
            class="block h-0.5 w-8 rounded-full opacity-45 transition-[width,opacity] duration-300 group-hover:w-16 group-hover:opacity-100"
            :class="item.bar"
          />
        </span>
      </article>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    title: 'اصالت محصولات',
    desc: 'محصولات با تمرکز بر اصالت و اعتبار، از مجموعه کالای اورجینال تهیه و ارائه می‌شوند.',
    icon: 'tabler:rosette-discount-check',
    iconBox: 'border-[#A28466]/10 bg-[#A28466]/10 text-[#A28466]',
    iconHoverShadow: 'group-hover:shadow-[0_8px_18px_-10px_#A28466]',
    number: 'text-[#A28466]/40',
    decor: 'bg-[#A28466]/15',
    hoverBorder: 'hover:border-[#A28466]/40',
    hoverShadow: 'hover:shadow-[0_22px_42px_-28px_rgba(162,132,102,0.55)]',
    bar: 'bg-[#A28466]',
  },
  {
    title: 'انتخاب تخصصی',
    desc: 'تمرکز ما بر محصولات مراقبت پوستی و انتخاب بر اساس نیاز واقعی پوست است.',
    icon: 'tabler:flask-2',
    iconBox: 'border-[#6BA5C4]/10 bg-[#6BA5C4]/10 text-[#6BA5C4]',
    iconHoverShadow: 'group-hover:shadow-[0_8px_18px_-10px_#6BA5C4]',
    number: 'text-[#6BA5C4]/40',
    decor: 'bg-[#6BA5C4]/15',
    hoverBorder: 'hover:border-[#6BA5C4]/40',
    hoverShadow: 'hover:shadow-[0_22px_42px_-28px_rgba(107,165,196,0.55)]',
    bar: 'bg-[#6BA5C4]',
  },
  {
    title: 'مشاوره تخصصی',
    desc: 'قبل از انتخاب محصول، می‌توانید برای شناخت بهتر نیاز پوستتان از مشاوره استفاده کنید.',
    icon: 'tabler:messages',
    iconBox: 'border-[#7BA582]/10 bg-[#7BA582]/10 text-[#7BA582]',
    iconHoverShadow: 'group-hover:shadow-[0_8px_18px_-10px_#7BA582]',
    number: 'text-[#7BA582]/40',
    decor: 'bg-[#7BA582]/15',
    hoverBorder: 'hover:border-[#7BA582]/40',
    hoverShadow: 'hover:shadow-[0_22px_42px_-28px_rgba(123,165,130,0.55)]',
    bar: 'bg-[#7BA582]',
  },
  {
    title: 'همراهی تا انتخاب درست',
    desc: 'هدف ما فقط فروش محصول نیست؛ کمک به انتخاب آگاهانه‌تر و ساخت روتینی مناسب است. در مسیر مراقبت نیز پشتیبانی ماهلین همراه شما خواهد بود.',
    icon: 'tabler:heart-handshake',
    iconBox: 'border-[#DE8E89]/10 bg-[#DE8E89]/10 text-[#DE8E89]',
    iconHoverShadow: 'group-hover:shadow-[0_8px_18px_-10px_#DE8E89]',
    number: 'text-[#DE8E89]/40',
    decor: 'bg-[#DE8E89]/15',
    hoverBorder: 'hover:border-[#DE8E89]/40',
    hoverShadow: 'hover:shadow-[0_22px_42px_-28px_rgba(222,142,137,0.55)]',
    bar: 'bg-[#DE8E89]',
  },
]
</script>
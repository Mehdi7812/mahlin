<template>
  <div class="bg-cream min-h-screen">

    <!-- ── نوار پیشرفت مطالعه ── -->
    <div class="fixed top-0 inset-x-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        class="h-full bg-gradient-to-l from-gold via-blush to-gold transition-[width] duration-150 ease-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <!-- ══════════ هدر ══════════ -->
    <header class="relative bg-ink text-cream overflow-hidden">
      <div
        class="absolute inset-0 opacity-[0.04] pointer-events-none"
        style="background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 18px 18px;"
      ></div>
      <div class="absolute -top-32 -end-24 w-96 h-96 bg-gold/[0.15] blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute -bottom-32 -start-20 w-80 h-80 bg-blush/[0.12] blur-[110px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">

        <!-- بردکرامب -->
        <nav class="flex items-center gap-2 text-xs text-cream/40 mb-6 fade-up" aria-label="مسیر">
          <NuxtLink to="/" class="hover:text-gold transition-colors duration-200">خانه</NuxtLink>
          <svg class="w-3 h-3 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-cream/70">قوانین و مقررات</span>
        </nav>

        <div class="max-w-3xl">
          <!-- <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-[11px] font-bold mb-5 fade-up fade-up-1">
            <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            سند حقوقی رسمی
          </span> -->

          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.35] mb-5 fade-up fade-up-2">
            قوانین و <span class="text-gold">مقررات</span> استفاده
          </h1>

          <p class="text-sm sm:text-base text-cream/55 leading-8 max-w-[62ch] fade-up fade-up-3">
            عضویت در وب‌سایت ماهلین و خرید از این فروشگاه به معنای مطالعه و پذیرش کامل شرایط زیر است.
            لطفاً پیش از عضویت یا ثبت سفارش، این سند را با دقت مطالعه فرمایید.
          </p>

          <!-- متادیتا -->
          <div class="flex flex-wrap items-center gap-3 mt-8 fade-up fade-up-4">
            <!-- <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/>
              </svg>
              آخرین بروزرسانی: <b class="text-cream/85">۱۵ خرداد ۱۴۰۴</b>
            </div> -->
            <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/>
              </svg>
              زمان مطالعه: <b class="text-cream/85">حدود ۵ دقیقه</b>
            </div>
            <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" stroke-linejoin="round"/>
              </svg>
              نسخه <b class="text-cream/85">۱.۰</b>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ══════════ بدنه ══════════ -->
    <main class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">

        <!-- ── فهرست مطالب ── -->
        <aside class="lg:col-span-4 xl:col-span-3">
          <div class="lg:sticky lg:top-24">

            <!-- موبایل: آکاردئون -->
            <button
              type="button"
              class="lg:hidden w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-white border border-ink/10 shadow-sm mb-4"
              @click="tocOpen = !tocOpen"
            >
              <span class="flex items-center gap-2.5 text-sm font-bold text-ink">
                <svg class="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/>
                </svg>
                فهرست مطالب
              </span>
              <svg
                class="w-4 h-4 text-ink/40 transition-transform duration-300"
                :class="tocOpen && 'rotate-180'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              >
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <nav
              class="toc-panel bg-white border border-ink/[0.08] rounded-3xl p-4 sm:p-5 shadow-[0_4px_24px_-12px_rgba(28,25,23,0.15)]"
              :class="{ 'hidden lg:block': !tocOpen }"
              aria-label="فهرست مطالب"
            >
              <h2 class="hidden lg:flex items-center gap-2.5 text-sm font-bold text-ink mb-4 pb-3.5 border-b border-ink/[0.07]">
                <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
                فهرست مطالب
              </h2>

              <ol class="space-y-0.5 max-h-none lg:max-h-[58vh] lg:overflow-y-auto toc-scroll pe-1">
                <li v-for="(s, i) in sections" :key="s.id">
                  <a
                    :href="`#${s.id}`"
                    class="toc-link"
                    :class="{ 'toc-link-active': activeId === s.id }"
                    @click.prevent="goTo(s.id)"
                  >
                    <span class="toc-num">{{ toFa(i + 1) }}</span>
                    <span class="flex-1 leading-6">{{ s.title }}</span>
                  </a>
                </li>
              </ol>

              <!-- اکشن‌ها -->
              <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-ink/[0.07]">
                <button type="button" class="toc-action" @click="printPage">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="6" y="14" width="12" height="8" rx="1"/>
                  </svg>
                  چاپ
                </button>
                <button type="button" class="toc-action" @click="copyLink">
                  <svg v-if="!copied" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else class="w-3.5 h-3.5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ copied ? 'کپی شد' : 'کپی لینک' }}
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <!-- ── محتوا ── -->
        <div class="lg:col-span-8 xl:col-span-9">

          <!-- هشدار مهم -->
          <div class="reveal flex gap-4 p-5 sm:p-6 rounded-3xl bg-blush/[0.07] border border-blush/20 mb-8">
            <span class="shrink-0 w-10 h-10 grid place-items-center rounded-2xl bg-blush/15 text-blush">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 9v4M12 17h.01" stroke-linecap="round"/>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-linejoin="round"/>
              </svg>
            </span>
            <div>
              <h3 class="text-sm font-bold text-ink mb-1.5">پیش از هر چیز بخوانید</h3>
              <p class="text-sm text-ink/60 leading-7">
                عضویت در سایت ماهلین یا خرید از آن، <b class="text-ink/80">به منزله مطالعه و قبول شرایط خرید، عضویت و قوانین و مقررات مربوطه</b> است.
                پیش از ثبت سفارش، لطفاً تمام بندهای این سند را با دقت بخوانید.
              </p>
            </div>
          </div>

          <!-- بخش‌ها -->
          <article class="space-y-5">
            <section
              v-for="(s, i) in sections"
              :id="s.id"
              :key="s.id"
              :ref="el => setSectionRef(el, i)"
              class="reveal scroll-mt-24 bg-white border border-ink/[0.08] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_2px_20px_-14px_rgba(28,25,23,0.2)] hover:border-ink/[0.14] transition-colors duration-300"
            >
              <!-- سربرگ -->
              <header class="flex items-start gap-4 mb-5">
                <span class="sec-num" :style="{ '--ac': s.color }">{{ toFa(i + 1) }}</span>
                <div class="flex-1 min-w-0 pt-0.5">
                  <h2 class="font-display text-lg sm:text-xl text-ink leading-8">{{ s.title }}</h2>
                  <span class="block w-10 h-0.5 rounded-full mt-2.5" :style="{ backgroundColor: s.color }"></span>
                </div>
                <a
                  :href="`#${s.id}`"
                  class="anchor-btn"
                  :aria-label="`لینک مستقیم به ${s.title}`"
                  @click.prevent="goTo(s.id, true)"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </header>

              <!-- بلوک‌های محتوا -->
              <div class="space-y-4">
                <template v-for="(b, bi) in s.blocks" :key="bi">
                  <p v-if="b.t === 'p'" class="text-sm text-ink/65 leading-8" v-html="b.v"></p>

                  <ul v-else-if="b.t === 'ul'" class="space-y-2.5">
                    <li v-for="(item, ii) in b.v" :key="ii" class="flex gap-3 text-sm text-ink/65 leading-7">
                      <span class="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" :style="{ backgroundColor: s.color }"></span>
                      <span v-html="item"></span>
                    </li>
                  </ul>

                  <ol v-else-if="b.t === 'ol'" class="space-y-2.5">
                    <li v-for="(item, ii) in b.v" :key="ii" class="flex gap-3 text-sm text-ink/65 leading-7">
                      <span class="ol-badge" :style="{ '--ac': s.color }">{{ toFa(ii + 1) }}</span>
                      <span class="pt-0.5" v-html="item"></span>
                    </li>
                  </ol>

                  <div v-else-if="b.t === 'note'" class="flex gap-3 p-4 rounded-2xl bg-ink/[0.03] border border-ink/[0.07]">
                    <svg class="w-4 h-4 shrink-0 mt-0.5" :style="{ color: s.color }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/>
                    </svg>
                    <p class="text-[13px] text-ink/60 leading-7" v-html="b.v"></p>
                  </div>
                </template>
              </div>
            </section>
          </article>

          <!-- ── پذیرش + تماس ── -->
          <div class="reveal mt-8 relative overflow-hidden rounded-3xl bg-ink text-cream p-6 sm:p-9">
            <div class="absolute -top-20 -end-16 w-64 h-64 bg-gold/15 blur-[90px] rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-20 -start-16 w-56 h-56 bg-blush/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div class="relative">
              <!-- <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/[0.07] border border-cream/10 text-[11px] text-cream/70 mb-4">
                <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                پایان سند
              </span> -->

              <h3 class="font-display text-xl sm:text-2xl mb-3">پرسشی درباره‌ی این قوانین دارید؟</h3>
              <p class="text-sm text-cream/55 leading-8 max-w-[70ch] mb-6">
                اگر بخشی از این قوانین برایتان مبهم است، می‌توانید از طریق ایمیل
                <a href="mailto:mahlinn404@gmail.com" class="text-gold font-bold hover:underline underline-offset-4">mahlinn404@gmail.com</a>
                با ما در میان بگذارید.
                از اینکه به قوانین احترام می‌گذارید بسیار خرسندیم.
              </p>

              <div class="flex flex-wrap gap-3">
                <NuxtLink to="/contact" class="btn-gold">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  ارتباط با ما
                </NuxtLink>

                <NuxtLink to="/faq" class="btn-ghost">سوالات متداول</NuxtLink>
                <NuxtLink to="/privacy" class="btn-ghost">حریم خصوصی</NuxtLink>
              </div>
            </div>
          </div>

          <!-- <p class="text-center text-xs text-ink/35 mt-8 leading-7">
            این سند در تاریخ <b class="text-ink/55">۱۵ خرداد ۱۴۰۴</b> بازبینی شده و تا اعلام نسخه‌ی جدید معتبر است.
          </p> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

useHead({
  title: 'قوانین و مقررات | ماهلین',
  meta: [
    { name: 'description', content: 'شرایط و ضوابط استفاده از وب‌سایت، خدمات فروش، حمل و تحویل، خدمات پس از فروش و قوانین ثبت نظرات فروشگاه ماهلین.' },
    { property: 'og:title', content: 'قوانین و مقررات | ماهلین' },
  ],
})

/* ── داده‌ی بخش‌ها ─────────────────────────────── */
const C = {
  gold:  '#A28466',
  sky:   '#8FC1D9',
  sage:  '#9CBFA0',
  blush: '#DE8E89',
  lilac: '#B3A6C9',
}

const sections = [
  {
    id: 'usage', title: 'الف – شرایط و ضوابط استفاده از وب‌سایت', color: C.gold,
    blocks: [
      { t: 'p', v: 'کلیه کاربرانی که قصد عضویت و خرید از وب‌سایت ماهلین را دارند، باید مفاد این توافق‌نامه را کامل مطالعه کنند و سپس اقدام به عضویت یا خرید نمایند.' },
      { t: 'note', v: 'عضویت در سایت ماهلین یا خرید از آن، به منزله مطالعه و قبول شرایط خرید و عضویت و قوانین و مقررات مربوطه است.' },
      { t: 'ul', v: [
        'خرید کالا از سایت ماهلین بر مبنای قوانین و آیین‌نامه‌های موجود در تجارت الکترونیک و با رعایت کامل قوانین جمهوری اسلامی ایران انجام می‌شود.',
        'خدمات و محتویات این سایت برای استفاده شخصی و غیرتجاری مشتریان عرضه شده است. مالکیت معنوی اطلاعات موجود در آن متعلق به این فروشگاه است و هرگونه سوءاستفاده از این اطلاعات پیگرد قانونی دارد. استفاده غیرتجاری از محتویات سایت با ذکر منبع بلامانع است.',
        'اطلاعات مشخصات کالاهای ارائه‌شده به‌صورت خلاصه و کلی است و این فروشگاه به‌طور مداوم نسبت به بررسی و به‌روزرسانی اطلاعات و محتویات اقدام خواهد کرد.',
        'کاربران هنگام سفارش کالا ملزم هستند اطلاعات صحیح و کامل را در سایت درج کنند. کاستی یا نادرستی اطلاعات مانع تکمیل درست و به‌موقع سفارش خواهد شد.',
        'فروشگاه ماهلین هیچ‌گونه مسئولیتی در قبال کارکرد سایت ندارد که ممکن است ناشی از عوامل خارج از حوزه مدیریت این سایت باشد (همانند نقص اینترنت، مسائل مخابراتی، تجهیزات سخت‌افزاری و…).',
        'تمام ابزارهایی که در فروشگاه ماهلین با هدف ارتباط با مشتریان به کار گرفته می‌شود، فقط برای همین منظور طراحی شده‌اند. کاربران متعهد هستند از این ابزارها صرفاً برای ارسال و دریافت اطلاعاتی استفاده کنند که مناسب و مرتبط با بحث سفارش کالا باشد.',
        'سایر سایت‌ها و لینک‌هایی که برای ارائه اطلاعات بیشتر و کامل‌تر در فروشگاه قرار داده شده‌اند، مستقل بوده و فروشگاه ماهلین مسئولیتی در قبال محتویات آن‌ها ندارد.',
        'ارتباط فروشگاه ماهلین با کاربران از طریق ایمیل <a href="mailto:mahlinn404@gmail.com" class="text-gold font-bold hover:underline underline-offset-4">mahlinn404@gmail.com</a> برقرار می‌شود و صرفاً با استفاده از اطلاعاتی انجام می‌گیرد که کاربران در سایت درج کرده‌اند (همانند نشانی، تلفن و…).',
        'فروشگاه ماهلین به هیچ‌وجه اطلاعات منحصربه‌فرد کاربران را به اشخاص و طرف‌های غیر واگذار نخواهد کرد و با استفاده از آخرین فناوری‌ها متعهد است تا حد امکان از حریم شخصی کاربران دفاع کند.',
      ]},
    ],
  },
  {
    id: 'sales', title: 'ب – شرایط و ضوابط خدمات فروش کالا', color: C.lilac,
    blocks: [
      { t: 'p', v: 'از نظر حقوقی، در معاملات فروشگاه ماهلین، سایت <b class="text-ink/80">drmahlin.com</b> به‌عنوان <b class="text-ink/80">فروشنده</b> و کاربر سفارش‌دهنده به‌عنوان <b class="text-ink/80">خریدار</b> تلقی می‌شوند.' },
      { t: 'ul', v: [
        'فروش کالا بر مبنای نوع و مقداری صورت می‌گیرد که خریدار آن را در فروشگاه ماهلین درج نموده است.',
        'فروشنده هنگام تأیید سفارش کالا، مشخصات و زمان ارسال کالا را تعیین کرده و به اطلاع خریدار می‌رساند.',
        'ارزش کالا یا کالاهای سفارش‌داده‌شده طبق فهرست قیمت سایت محاسبه می‌شود و شامل کلیه مالیات‌ها و عوارض فروش است. تنها مبلغی که در برخی موارد به ارزش کالا اضافه می‌شود، هزینه ارسال و بیمه کالاست.',
        'مکان و زمان تحویل کالا توسط خریدار در فروشگاه درج می‌شود و فروشنده متعهد است با رعایت سیاست‌های معین ارسال، سفارش را در آن مکان و زمان تحویل دهد. در صورت عدم حضور سفارش‌دهنده در مکان و زمان تعیین‌شده، فروشنده سیاست‌های خاص مربوطه را اعمال خواهد کرد.',
        'در صورتی که فروشنده به دلایلی خارج از اراده‌ی او نتواند کالا را در موعد مقرر تحویل دهد و طرفین درباره‌ی موعد جدید به توافق نرسند، هر یک از طرفین حق دارد بدون هیچ‌گونه هزینه‌ای سفارش را فسخ نماید.',
        'خریدار با تحویل کالای ارسال‌شده و امضای برگه‌ی دریافت کالا، رضایت خود را از نوع، تعداد و سلامت کالا ابراز می‌نماید.',
        'خریدار موظف است در حالت پرداخت در محل، مبلغ قابل پرداخت را هنگام تحویل کالا بپردازد. در صورت عدم پرداخت وجه در موعد تعیین‌شده توسط خریدار، فروشنده حق دارد از تحویل کالا خودداری و سفارش را فسخ نماید.',
      ]},
    ],
  },
  {
    id: 'shipping', title: 'پ – شرایط حمل و تحویل کالا', color: C.sky,
    blocks: [
      { t: 'note', v: 'حمل کلیه سفارش‌ها توسط <b class="text-ink/80">پست جمهوری اسلامی ایران</b> صورت می‌پذیرد. فروشگاه ماهلین هیچ کنترلی بر زمان و فرآیند حمل توسط پست ندارد.' },
    ],
  },
  {
    id: 'after-sales', title: 'ت – شرایط و ضوابط خدمات پس از فروش کالا', color: C.sage,
    blocks: [
      { t: 'p', v: 'در صورت انصراف از دریافت کالا پس از تسویه حساب، با کسر <b class="text-ink/80">۱۰ درصد مالیات</b>، لغو سفارش صورت می‌گیرد و مبلغ بین <b class="text-ink/80">۲۴ تا ۷۲ ساعت کاری</b> واریز می‌شود.' },
    ],
  },
  {
    id: 'comments', title: 'ث – شرایط ثبت نظرات کاربران در وب‌سایت', color: C.blush,
    blocks: [
      { t: 'ul', v: [
        'نظرات پس از درج توسط کاربر و پس از تأیید مدیریت در سایت نمایش داده می‌شوند.',
        'ثبت نظرات غیراخلاقی و توهین‌آمیز می‌تواند منجر به تعلیق فعالیت کاربر متخلف در سایت شود.',
        'از درج نظرات تبلیغاتی یا فروش محصولات شخصی و ارائه اطلاعات تماس خود در فضای عمومی سایت خودداری نمایید.',
      ]},
    ],
  },
]

/* ── وضعیت ─────────────────────────────────────── */
const activeId = ref(sections[0].id)
const tocOpen  = ref(false)
const copied   = ref(false)
const progress = ref(0)

const sectionEls = []
function setSectionRef(el, i) { if (el) sectionEls[i] = el }

/* اعداد فارسی */
const toFa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

/* اسکرول نرم */
function goTo(id, copyToo = false) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
  tocOpen.value = false
  if (copyToo) writeClipboard(location.origin + location.pathname + '#' + id)
}

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch { /* ignore */ }
}
const copyLink = () => writeClipboard(location.href.split('#')[0])
const printPage = () => window.print()

/* نوار پیشرفت */
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0
}

let spyObs = null
let revealObs = null

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  /* اسکرول‌اسپای */
  spyObs = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
  )
  sectionEls.forEach(el => el && spyObs.observe(el))

  /* انیمیشن ورود */
  revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target) }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

  /* پرش به هش اولیه */
  if (location.hash) setTimeout(() => goTo(location.hash.slice(1)), 300)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  spyObs?.disconnect()
  revealObs?.disconnect()
})
</script>

<style scoped>
/* ── چیپ متادیتا ─────────────────────────────── */
.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  color: rgba(242, 235, 227, 0.5);
  background: rgba(242, 235, 227, 0.04);
  border: 1px solid rgba(242, 235, 227, 0.08);
}

/* ── ورود هدر ────────────────────────────────── */
.fade-up { animation: fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
.fade-up-1 { animation-delay: 0.08s; }
.fade-up-2 { animation-delay: 0.16s; }
.fade-up-3 { animation-delay: 0.24s; }
.fade-up-4 { animation-delay: 0.32s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── ورود بخش‌ها ─────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-in { opacity: 1; transform: translateY(0); }

/* ── فهرست مطالب ─────────────────────────────── */
.toc-link {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.55rem 0.7rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  color: rgba(28, 25, 23, 0.55);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.toc-link:hover {
  background: rgba(28, 25, 23, 0.035);
  color: rgba(28, 25, 23, 0.85);
}
.toc-link-active {
  background: rgba(162, 132, 102, 0.1);
  color: #A28466;
  font-weight: 700;
}
.toc-link-active::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 55%;
  border-radius: 9999px;
  background: #A28466;
}
.toc-num {
  flex-shrink: 0;
  width: 1.35rem;
  height: 1.35rem;
  display: grid;
  place-items: center;
  border-radius: 0.45rem;
  font-size: 0.625rem;
  font-weight: 700;
  background: rgba(28, 25, 23, 0.05);
  color: rgba(28, 25, 23, 0.4);
  transition: background 0.25s, color 0.25s;
}
.toc-link-active .toc-num {
  background: rgba(162, 132, 102, 0.18);
  color: #A28466;
}

.toc-scroll::-webkit-scrollbar { width: 4px; }
.toc-scroll::-webkit-scrollbar-thumb {
  background: rgba(28, 25, 23, 0.15);
  border-radius: 9999px;
}
.toc-scroll { scrollbar-width: thin; }

.toc-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.55rem;
  border-radius: 0.7rem;
  font-size: 0.6875rem;
  font-weight: 700;
  color: rgba(28, 25, 23, 0.55);
  background: rgba(28, 25, 23, 0.035);
  border: 1px solid rgba(28, 25, 23, 0.07);
  transition: all 0.25s ease;
}
.toc-action:hover {
  color: #A28466;
  border-color: rgba(162, 132, 102, 0.3);
  background: rgba(162, 132, 102, 0.08);
}

/* ── شماره بخش ───────────────────────────────── */
.sec-num {
  --ac: #A28466;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 0.9rem;
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--ac);
  background: color-mix(in srgb, var(--ac) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--ac) 25%, transparent);
}

.ol-badge {
  --ac: #A28466;
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 800;
  color: var(--ac);
  background: color-mix(in srgb, var(--ac) 14%, transparent);
}

/* ── دکمه لنگر ───────────────────────────────── */
.anchor-btn {
  flex-shrink: 0;
  width: 1.9rem;
  height: 1.9rem;
  display: grid;
  place-items: center;
  border-radius: 0.6rem;
  color: rgba(28, 25, 23, 0.25);
  opacity: 0;
  transition: all 0.25s ease;
}
section:hover .anchor-btn { opacity: 1; }
.anchor-btn:hover {
  color: #A28466;
  background: rgba(162, 132, 102, 0.1);
}
@media (hover: none) { .anchor-btn { opacity: 1; } }

/* ── دکمه‌ها ─────────────────────────────────── */
.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.35rem;
  border-radius: 0.85rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #fff;
  background: #A28466;
  box-shadow: 0 8px 22px -10px rgba(162, 132, 102, 0.8);
  transition: all 0.25s ease;
}
.btn-gold:hover { background: #8f7359; transform: translateY(-2px); }
.btn-gold:active { transform: scale(0.97); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.25rem;
  border-radius: 0.85rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgba(242, 235, 227, 0.7);
  background: rgba(242, 235, 227, 0.05);
  border: 1px solid rgba(242, 235, 227, 0.12);
  transition: all 0.25s ease;
}
.btn-ghost:hover {
  color: #F2EBE3;
  background: rgba(242, 235, 227, 0.1);
  border-color: rgba(242, 235, 227, 0.25);
  transform: translateY(-2px);
}

/* ── چاپ ─────────────────────────────────────── */
@media print {
  aside, .btn-gold, .btn-ghost, .anchor-btn { display: none !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
  section { break-inside: avoid; border: 1px solid #ddd !important; box-shadow: none !important; }
}

@media (prefers-reduced-motion: reduce) {
  .fade-up, .reveal { animation: none !important; opacity: 1 !important; transform: none !important; transition: none !important; }
}
</style>
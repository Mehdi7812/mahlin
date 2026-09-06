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
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-[11px] font-bold mb-5 fade-up fade-up-1">
            <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            سند حقوقی رسمی
          </span>

          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.35] mb-5 fade-up fade-up-2">
            قوانین و <span class="text-gold">مقررات</span> استفاده
          </h1>

          <p class="text-sm sm:text-base text-cream/55 leading-8 max-w-[62ch] fade-up fade-up-3">
            استفاده از وب‌سایت و خرید از فروشگاه ماهلین اسکین‌کر به معنای مطالعه و پذیرش کامل
            شرایط زیر است. لطفاً پیش از ثبت سفارش، این سند را با دقت مطالعه بفرمایید.
          </p>

          <!-- متادیتا -->
          <div class="flex flex-wrap items-center gap-3 mt-8 fade-up fade-up-4">
            <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/>
              </svg>
              آخرین بروزرسانی: <b class="text-cream/85">۱۵ خرداد ۱۴۰۴</b>
            </div>
            <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/>
              </svg>
              زمان مطالعه: <b class="text-cream/85">حدود ۸ دقیقه</b>
            </div>
            <div class="meta-chip">
              <svg class="w-3.5 h-3.5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" stroke-linejoin="round"/>
              </svg>
              نسخه <b class="text-cream/85">۲.۱</b>
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
                محصولات ماهلین فرآورده‌های آرایشی–بهداشتی هستند و <b class="text-ink/80">جایگزین درمان پزشکی نیستند</b>.
                در صورت داشتن بیماری پوستی، بارداری یا حساسیت شناخته‌شده، پیش از مصرف با پزشک متخصص مشورت کنید.
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
              <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/[0.07] border border-cream/10 text-[11px] text-cream/70 mb-4">
                <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                پایان سند
              </span>

              <h3 class="font-display text-xl sm:text-2xl mb-3">پرسشی درباره‌ی این قوانین دارید؟</h3>
              <p class="text-sm text-cream/55 leading-8 max-w-[58ch] mb-6">
                تیم پشتیبانی ماهلین هر روز از ساعت ۹ تا ۱۸ پاسخگوی شماست. اگر بخشی از این سند برایتان مبهم بود،
                پیش از ثبت سفارش با ما در میان بگذارید.
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

          <p class="text-center text-xs text-ink/35 mt-8 leading-7">
            این سند در تاریخ <b class="text-ink/55">۱۵ خرداد ۱۴۰۴</b> بازبینی شده و تا اعلام نسخه‌ی جدید معتبر است.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

useHead({
  title: 'قوانین و مقررات | ماهلین اسکین‌کر',
  meta: [
    { name: 'description', content: 'شرایط استفاده از وب‌سایت، ثبت سفارش، ارسال، بازگشت کالا و سایر قوانین فروشگاه ماهلین اسکین‌کر.' },
    { property: 'og:title', content: 'قوانین و مقررات | ماهلین اسکین‌کر' },
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
    id: 'acceptance', title: 'پذیرش قوانین', color: C.gold,
    blocks: [
      { t: 'p', v: 'با ورود به وب‌سایت ماهلین اسکین‌کر، ایجاد حساب کاربری یا ثبت سفارش، شما تأیید می‌کنید که این سند را مطالعه کرده، مفاد آن را درک نموده و با تمام بندهای آن موافقت دارید.' },
      { t: 'p', v: 'چنانچه با هر بخشی از این قوانین موافق نیستید، لطفاً از استفاده از خدمات وب‌سایت خودداری فرمایید.' },
      { t: 'note', v: 'استفاده از سرویس توسط افراد زیر ۱۸ سال، تنها با نظارت والدین یا سرپرست قانونی مجاز است.' },
    ],
  },
  {
    id: 'definitions', title: 'تعاریف و اصطلاحات', color: C.lilac,
    blocks: [
      { t: 'ul', v: [
        '<b class="text-ink/80">فروشنده / ما:</b> شرکت ماهلین اسکین‌کر، مالک و اداره‌کننده‌ی این وب‌سایت.',
        '<b class="text-ink/80">کاربر / شما:</b> هر شخص حقیقی یا حقوقی که از خدمات وب‌سایت استفاده می‌کند.',
        '<b class="text-ink/80">سفارش:</b> درخواست خرید ثبت‌شده توسط کاربر که شماره‌ی پیگیری دریافت کرده است.',
        '<b class="text-ink/80">محصول:</b> کلیه‌ی فرآورده‌های آرایشی و بهداشتی عرضه‌شده در فروشگاه.',
      ]},
    ],
  },
  {
    id: 'account', title: 'حساب کاربری', color: C.sky,
    blocks: [
      { t: 'p', v: 'برای ثبت سفارش، ایجاد حساب کاربری با شماره موبایل معتبر الزامی است. اطلاعات وارد شده باید صحیح، کامل و به‌روز باشد.' },
      { t: 'ul', v: [
        'مسئولیت حفظ محرمانگی رمز عبور و کد تأیید پیامکی بر عهده‌ی کاربر است.',
        'هر فعالیتی که از طریق حساب شما انجام شود، متوجه شخص شماست.',
        'ایجاد چند حساب کاربری برای سوءاستفاده از تخفیف‌ها ممنوع بوده و منجر به مسدودسازی می‌شود.',
        'ماهلین حق دارد حساب‌هایی با اطلاعات جعلی یا رفتار مشکوک را بدون اطلاع قبلی تعلیق کند.',
      ]},
    ],
  },
  {
    id: 'orders', title: 'ثبت سفارش و انعقاد قرارداد', color: C.gold,
    blocks: [
      { t: 'p', v: 'ثبت سفارش توسط کاربر به منزله‌ی پیشنهاد خرید است. قرارداد زمانی منعقد می‌شود که سفارش توسط ماهلین <b class="text-ink/80">تأیید و پرداخت آن نهایی</b> شود.' },
      { t: 'ol', v: [
        'انتخاب محصول و افزودن به سبد خرید.',
        'تکمیل اطلاعات گیرنده و انتخاب روش ارسال.',
        'پرداخت از طریق درگاه بانکی معتبر.',
        'دریافت پیامک تأیید همراه با کد رهگیری سفارش.',
      ]},
      { t: 'note', v: 'در صورت اتمام موجودی یا خطای فنی در قیمت‌گذاری، ماهلین حق لغو سفارش و بازگرداندن کامل وجه را برای خود محفوظ می‌دارد.' },
    ],
  },
  {
    id: 'pricing', title: 'قیمت‌ها و پرداخت', color: C.sage,
    blocks: [
      { t: 'ul', v: [
        'تمامی قیمت‌ها به <b class="text-ink/80">ریال / تومان</b> و شامل مالیات بر ارزش افزوده است.',
        'قیمت‌ها ممکن است بدون اطلاع قبلی تغییر کنند؛ ملاک، قیمت لحظه‌ی نهایی‌سازی پرداخت است.',
        'پرداخت صرفاً از طریق درگاه‌های بانکی مورد تأیید شاپرک انجام می‌شود.',
        'ماهلین هیچ‌گاه اطلاعات کارت بانکی شما را ذخیره یا دریافت نمی‌کند.',
      ]},
      { t: 'note', v: 'در صورت کسر وجه بدون ثبت سفارش، مبلغ ظرف حداکثر ۷۲ ساعت کاری توسط بانک به حساب شما بازمی‌گردد.' },
    ],
  },
  {
    id: 'shipping', title: 'ارسال و تحویل', color: C.sky,
    blocks: [
      { t: 'p', v: 'سفارش‌ها پس از تأیید پرداخت، ظرف <b class="text-ink/80">۲۴ تا ۷۲ ساعت کاری</b> بسته‌بندی و تحویل شرکت حمل می‌شوند.' },
      { t: 'ul', v: [
        'زمان تحویل در تهران ۱ تا ۲ روز کاری و در شهرستان‌ها ۲ تا ۵ روز کاری است.',
        'مسئولیت صحت آدرس و شماره تماس گیرنده بر عهده‌ی کاربر است.',
        'کاربر موظف است هنگام تحویل، سلامت ظاهری بسته را بررسی کند.',
        'تأخیرهای ناشی از عملکرد شرکت پست یا شرایط جوی خارج از تعهد ماهلین است.',
      ]},
    ],
  },
  {
    id: 'returns', title: 'بازگشت کالا و استرداد وجه', color: C.blush,
    blocks: [
      { t: 'p', v: 'مطابق قانون تجارت الکترونیک، شما تا <b class="text-ink/80">۷ روز</b> پس از دریافت کالا حق انصراف از خرید دارید.' },
      { t: 'p', v: '<b class="text-ink/80">شرایط پذیرش مرجوعی:</b>' },
      { t: 'ul', v: [
        'محصول باز نشده و پلمب سلامت آن سالم باشد.',
        'بسته‌بندی اصلی، فاکتور و اقلام همراه کامل باشد.',
        'درخواست از طریق پنل کاربری یا پشتیبانی ثبت شده باشد.',
      ]},
      { t: 'p', v: '<b class="text-ink/80">موارد غیرقابل مرجوع:</b> محصولات باز شده یا مصرف‌شده، اقلام تخفیف‌خورده‌ی حراج نهایی، و محصولات سفارشی‌سازی‌شده.' },
      { t: 'note', v: 'در صورت ارسال کالای معیوب یا اشتباه، هزینه‌ی رفت و برگشت کامل بر عهده‌ی ماهلین است و وجه ظرف ۵ روز کاری بازگردانده می‌شود.' },
    ],
  },
  {
    id: 'authenticity', title: 'اصالت کالا و ضمانت', color: C.sage,
    blocks: [
      { t: 'p', v: 'تمامی محصولات ماهلین دارای پروانه‌ی بهداشتی و کد رهگیری اصالت هستند و مستقیماً از خط تولید یا نمایندگی رسمی تأمین می‌شوند.' },
      { t: 'ul', v: [
        'حداقل اعتبار تاریخ انقضای محصولات ارسالی، ۱۲ ماه است.',
        'در صورت اثبات عدم اصالت، وجه پرداختی به‌صورت کامل مسترد می‌شود.',
        'شرایط نگهداری صحیح (دور از نور مستقیم و دمای بالا) بر عهده‌ی خریدار است.',
      ]},
    ],
  },
  {
    id: 'medical', title: 'سلب مسئولیت پزشکی', color: C.blush,
    blocks: [
      { t: 'p', v: 'محتوای منتشرشده در وب‌سایت، وبلاگ و شبکه‌های اجتماعی ماهلین صرفاً جنبه‌ی <b class="text-ink/80">اطلاع‌رسانی و آموزشی</b> دارد و به هیچ عنوان توصیه‌ی پزشکی، تشخیص یا نسخه‌ی درمانی محسوب نمی‌شود.' },
      { t: 'ul', v: [
        'پیش از استفاده از هر محصول جدید، تست حساسیت (Patch Test) روی ناحیه‌ی کوچکی از پوست انجام دهید.',
        'در صورت بروز قرمزی، سوزش یا التهاب، مصرف را قطع و به پزشک مراجعه کنید.',
        'افراد باردار، شیرده یا دارای بیماری پوستی خاص باید حتماً با متخصص مشورت کنند.',
        'نتایج مصرف محصولات بسته به نوع پوست هر فرد متفاوت است و تضمینی برای نتیجه‌ی یکسان وجود ندارد.',
      ]},
    ],
  },
  {
    id: 'ip', title: 'مالکیت فکری', color: C.lilac,
    blocks: [
      { t: 'p', v: 'کلیه‌ی حقوق مربوط به نام تجاری، لوگو، طراحی رابط کاربری، تصاویر، متون و ویدیوهای این وب‌سایت متعلق به ماهلین اسکین‌کر است.' },
      { t: 'ul', v: [
        'هرگونه کپی‌برداری، بازنشر یا استفاده‌ی تجاری بدون اجازه‌ی کتبی ممنوع است.',
        'استفاده از محتوا با ذکر منبع و لینک مستقیم، صرفاً برای مقاصد غیرتجاری مجاز است.',
        'استخراج خودکار داده (Scraping / Crawling) بدون مجوز، تخلف محسوب می‌شود.',
      ]},
    ],
  },
  {
    id: 'ugc', title: 'دیدگاه‌ها و محتوای کاربران', color: C.sky,
    blocks: [
      { t: 'p', v: 'ثبت نظر برای محصولات پس از خرید امکان‌پذیر است. با ارسال دیدگاه، اجازه‌ی انتشار آن را به ماهلین می‌دهید.' },
      { t: 'ul', v: [
        'محتوای توهین‌آمیز، تبلیغاتی یا خلاف قوانین جمهوری اسلامی حذف می‌شود.',
        'ادعاهای درمانی اثبات‌نشده در نظرات، منتشر نخواهند شد.',
        'ماهلین حق ویرایش جزئی (اصلاح نگارشی) بدون تغییر مفهوم را دارد.',
      ]},
    ],
  },
  {
    id: 'promotions', title: 'تخفیف‌ها و کمپین‌ها', color: C.gold,
    blocks: [
      { t: 'ul', v: [
        'هر کد تخفیف دارای تاریخ انقضا، سقف مبلغ و شرایط اختصاصی خود است.',
        'در هر سفارش تنها یک کد تخفیف قابل اعمال است، مگر خلاف آن اعلام شود.',
        'کدهای تخفیف قابل تبدیل به وجه نقد نیستند.',
        'در صورت مرجوعی سفارش، کد تخفیف مصرف‌شده بازگردانده نمی‌شود.',
      ]},
    ],
  },
  {
    id: 'privacy-link', title: 'حریم خصوصی و داده‌ها', color: C.sage,
    blocks: [
      { t: 'p', v: 'نحوه‌ی جمع‌آوری، ذخیره و پردازش اطلاعات شخصی شما به‌طور کامل در سند <a href="/privacy" class="text-gold font-bold hover:underline underline-offset-4">سیاست حریم خصوصی</a> توضیح داده شده است.' },
      { t: 'p', v: 'ماهلین اطلاعات کاربران را به هیچ شخص ثالثی نمی‌فروشد و صرفاً در چارچوب ارائه‌ی خدمات (مانند شرکت حمل) به اشتراک می‌گذارد.' },
    ],
  },
  {
    id: 'liability', title: 'محدودیت مسئولیت', color: C.lilac,
    blocks: [
      { t: 'p', v: 'ماهلین تلاش می‌کند اطلاعات محصولات دقیق و به‌روز باشد، اما مسئولیتی در قبال موارد زیر نمی‌پذیرد:' },
      { t: 'ul', v: [
        'خسارات ناشی از مصرف نادرست محصول یا عدم رعایت دستور مصرف.',
        'اختلال موقت سرویس ناشی از قطعی اینترنت، حملات سایبری یا نگهداری سرور.',
        'تفاوت جزئی رنگ محصول در تصاویر با نمونه‌ی واقعی به دلیل تنظیمات نمایشگر.',
      ]},
      { t: 'note', v: 'در هر حال، حداکثر مسئولیت مالی ماهلین محدود به مبلغ پرداخت‌شده برای همان سفارش خواهد بود.' },
    ],
  },
  {
    id: 'force-majeure', title: 'فورس ماژور', color: C.blush,
    blocks: [
      { t: 'p', v: 'در صورت بروز حوادث خارج از اراده مانند بلایای طبیعی، اعتصاب، محدودیت‌های دولتی یا قطعی گسترده‌ی زیرساخت، تعهدات ماهلین تا رفع مانع به حالت تعلیق درمی‌آید و این امر نقض قرارداد تلقی نمی‌شود.' },
    ],
  },
  {
    id: 'changes', title: 'تغییر در قوانین', color: C.sky,
    blocks: [
      { t: 'p', v: 'ماهلین حق بازنگری در این سند را برای خود محفوظ می‌دارد. نسخه‌ی به‌روز همواره در همین صفحه با تاریخ جدید منتشر می‌شود.' },
      { t: 'p', v: 'ادامه‌ی استفاده از خدمات پس از انتشار نسخه‌ی جدید، به منزله‌ی پذیرش تغییرات است. تغییرات اساسی از طریق ایمیل یا پیامک به کاربران اطلاع داده می‌شود.' },
    ],
  },
  {
    id: 'law', title: 'قانون حاکم و حل اختلاف', color: C.gold,
    blocks: [
      { t: 'p', v: 'این قوانین تابع قوانین جمهوری اسلامی ایران، به‌ویژه قانون تجارت الکترونیکی و قانون حمایت از حقوق مصرف‌کنندگان است.' },
      { t: 'p', v: 'طرفین تلاش می‌کنند اختلافات را از طریق مذاکره و پشتیبانی حل کنند. در غیر این صورت، مرجع رسیدگی، دادگاه‌های صالح تهران یا مرکز داوری اتحادیه کسب‌وکارهای مجازی خواهد بود.' },
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
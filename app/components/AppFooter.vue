<template>
  <footer class="relative bg-ink text-cream overflow-hidden">

    <!-- بافت نقطه‌ای ظریف -->
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none"
      style="background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 18px 18px;"
    />
    <!-- درخشش‌های تزئینی -->
    <div class="absolute -top-24 -end-24 w-80 h-80 bg-blush/[0.16] blur-[110px] rounded-full pointer-events-none" />
    <div class="absolute -bottom-24 -start-16 w-72 h-72 bg-gold/[0.14] blur-[100px] rounded-full pointer-events-none" />

    <!-- بلاب‌های پس‌زمینه -->
    <div class="absolute top-0 start-1/4 w-96 h-96 bg-gold/[0.07] blur-[140px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 end-1/4 w-80 h-80 bg-blush/[0.05] blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-lilac/[0.03] blur-[160px] rounded-full pointer-events-none"></div>

    <!-- نوار طلایی بالای فوتر -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8">

      <!-- گرید اصلی -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">

        <!-- ── درباره برند ── -->
        <div class="sm:col-span-2 lg:col-span-4 footer-col">
          <!-- لوگو -->
          <NuxtLink to="/" class="footer-logo inline-flex items-center gap-3.5 mb-5">
            <span class="footer-logo-mark">
              <span class="footer-logo-glow" aria-hidden="true"></span>
              <span class="footer-logo-ring" aria-hidden="true"><span></span></span>
              <span class="footer-logo-tile">
                <img class="w-full h-full object-cover" src="/logo/logo.png" alt="" />
              </span>
            </span>
            <span class="footer-logo-text font-display text-xl sm:text-2xl">
              ماهلین اسکین‌کر
            </span>
          </NuxtLink>

          <p class="text-sm text-cream/55 max-w-[34ch] leading-7">
            مراقبت پوست علمی، با معیار پزشکی. محصولاتی که با پشتوانه‌ی تحقیقات درماتولوژیک تولید شده‌اند.
          </p>

          <!-- شبکه‌های اجتماعی -->
          <div class="socials-row mt-6">
            <a
              v-for="(social, i) in socials"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="social-btn"
              :style="{ '--sc': social.rgb, '--d': (0.15 + i * 0.09) + 's' }"
            >
              <!-- موج حلقه‌ای هنگام هاور -->
              <span class="social-ring" aria-hidden="true"></span>
              <!-- درخشش عبوری -->
              <span class="social-shine" aria-hidden="true"><span class="social-shine-bar"></span></span>
              <!-- آیکون -->
              <svg
                class="social-icon"
                :viewBox="social.viewBox || '0 0 24 24'"
                fill="currentColor"
                aria-hidden="true"
              >
                <path :d="social.path" :fill-rule="social.fillRule || 'nonzero'" />
              </svg>
              <!-- تولتیپ نام -->
              <span class="social-tooltip" aria-hidden="true">{{ social.name }}</span>
            </a>

            <!-- خط تکمیلی کنار آیکون‌ها -->
            <span class="socials-line" aria-hidden="true"></span>
          </div>
        </div>

        <!-- ── دسته‌بندی ── -->
        <div class="lg:col-span-2 footer-col footer-col-delay-1">
          <h3 class="footer-heading">
            <span class="footer-dot bg-gold"></span>
            دسته‌بندی
          </h3>

          <!-- اسکلتون لودینگ -->
          <ul v-if="categoriesLoading" class="space-y-3">
            <li v-for="n in 5" :key="n" class="h-3 w-20 bg-cream/[0.07] rounded-full animate-pulse"></li>
          </ul>

          <!-- لیست دسته‌بندی‌ها -->
          <ul v-else-if="categories.length" class="space-y-2.5">
            <li v-for="c in categories" :key="c.id">
              <NuxtLink
                :to="{ path: '/shop', query: { cat_id: c.id } }"
                class="footer-link group whitespace-nowrap"
              >
                <span class="footer-link-bar bg-gold"></span>
                {{ c.title_fa }}
              </NuxtLink>
            </li>
          </ul>

          <!-- خطا/عدم وجود دسته‌بندی -->
          <p v-else class="text-xs text-cream/35">دسته‌بندی‌ای یافت نشد.</p>
        </div>

        <!-- ── شرکت ── -->
        <div class="lg:col-span-2 footer-col footer-col-delay-2">
          <h3 class="footer-heading">
            <span class="footer-dot bg-sky"></span>
            شرکت
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link group">
                <span class="footer-link-bar bg-sky"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ── خبرنامه + تماس ── -->
        <div class="sm:col-span-2 lg:col-span-4 footer-col footer-col-delay-3">
          <h3 class="footer-heading">
            <span class="footer-dot bg-blush"></span>
            خبرنامه
          </h3>
          <p class="text-sm text-cream/50 mb-4 leading-6">
            آخرین یادداشت‌های پوستی و کدهای تخفیف را دریافت کنید.
          </p>

          <form @submit.prevent="subscribe" class="space-y-2">
            <div class="flex relative">
              <svg class="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/25 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                v-model="email"
                type="email"
                required dir="ltr"
                placeholder="ایمیل شما"
                class="flex-1 min-w-0 bg-cream/[0.06] border border-cream/10 rounded-e-xl pe-10 ps-3 py-3 text-sm placeholder:text-cream/30 text-cream focus:outline-none focus:border-gold/50 focus:bg-cream/[0.09] transition-all duration-200"
              />
              <button
                type="submit"
                class="bg-gold text-white px-5 py-3 text-sm font-bold rounded-e-xl hover:bg-gold/85 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                عضویت
              </button>
            </div>

            <Transition name="msg-fade">
              <div
                v-if="status === 'success'"
                class="flex items-center gap-2 text-xs text-sage bg-sage/10 border border-sage/20 rounded-xl px-3 py-2"
              >
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                با موفقیت ثبت شدید. ممنون از همراهی شما!
              </div>
              <div
                v-else-if="status === 'error'"
                class="flex items-center gap-2 text-xs text-blush bg-blush/10 border border-blush/20 rounded-xl px-3 py-2"
              >
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/>
                </svg>
                لطفاً یک ایمیل معتبر وارد کنید.
              </div>
            </Transition>
          </form>

          <!-- اطلاعات تماس -->
          <div class="mt-6 space-y-3">
            <a
              href="tel:+989922655520"
              class="contact-item group"
            >
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-sm text-cream/55 group-hover:text-cream transition-colors duration-200">0992-265-5520</span>
            </a>

            <a
              href="mailto:mahlinn404@gmail.com"
              class="contact-item group"
            >
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-sm text-cream/55 group-hover:text-cream transition-colors duration-200">mahlinn404@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      <!-- ── نمادهای اعتماد ── -->
      <div class="mt-12 pt-8 border-t border-cream/[0.08]">
        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          <div
            v-for="trust in trustBadges"
            :key="trust.label"
            class="trust-badge flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-cream/[0.04] border border-cream/[0.07] hover:border-cream/15 transition-all duration-300"
          >
            <Icon :name="trust.icon" class="text-xl text-gold" />
            <div>
              <p class="text-xs font-bold text-cream/80">{{ trust.label }}</p>
              <p class="text-[10px] text-cream/40">{{ trust.sub }}</p>
            </div>
          </div>
        </div>

        <!-- کپی‌رایت -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-cream/35 text-center sm:text-start">
            © ۱۴۰۵ ماهلین اسکین‌کر — همه حقوق محفوظ است.
          </span>
          <div class="flex items-center gap-4 text-xs">
            <NuxtLink to="/privacy" class="text-cream/40 hover:text-cream/80 transition-colors duration-200">
              حریم خصوصی
            </NuxtLink>
            <span class="w-px h-3 bg-cream/15 block"></span>
            <NuxtLink to="/terms" class="text-cream/40 hover:text-cream/80 transition-colors duration-200">
              قوانین و مقررات
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- دکمه scroll to top -->
    <Transition name="scroll-top">
      <button
        v-if="showScrollTop"
        type="button"
        aria-label="بازگشت به بالا"
        class="fixed bottom-6 end-6 z-30 w-11 h-11 rounded-full bg-gold text-white grid place-items-center shadow-[0_8px_24px_rgba(162,132,102,0.45)] hover:shadow-[0_12px_32px_rgba(162,132,102,0.55)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300"
        @click="scrollToTop"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue-sonner'

const email = ref('')
const status = ref(null)
const showScrollTop = ref(false)

// ─── دسته‌بندی‌ها (از API) ─────────────────────────────
const categories        = ref([])
const categoriesLoading = ref(true)

async function fetchCategories() {
  categoriesLoading.value = true
  try {
    const res = await useGarnetApiFetch('products/categoryIndex')
    categories.value = (res.ProductCategories || [])
      .filter(c => c.status === 1 && c.parent_id === null)
      .sort((a, b) => b.order - a.order)
      .slice(0, 6) // در فوتر جای محدودی هست، حداکثر ۶ دسته نمایش می‌دیم
  } catch (e) {
    console.warn('[Footer] خطا در دریافت دسته‌بندی‌ها:', e)
    categories.value = []
  } finally {
    categoriesLoading.value = false
  }
}

const companyLinks = [
  { to: '/about',   label: 'درباره ما' },
  { to: '/journal', label: 'وبلاگ' },
  { to: '/contact', label: 'ارتباط با ما' },
  { to: '/faq',     label: 'سوالات متداول' },
  { to: '/terms',   label: 'قوانین و مقررات' },
]

const trustBadges = [
  { icon: 'tabler:shield-check', label: 'پرداخت امن', sub: 'درگاه معتبر بانکی' },
  { icon: 'tabler:truck-delivery', label: 'ارسال سریع', sub: 'تحویل ۲۴ تا ۷۲ ساعته' },
  { icon: 'tabler:refresh-dot', label: 'ضمانت بازگشت', sub: 'تا ۷ روز پس از خرید' },
  { icon: 'tabler:flask', label: 'آزمایش‌شده', sub: 'تایید شده توسط متخصصان' },
]

// viewBox و fillRule اختیاری‌اند (پیش‌فرض: 0 0 24 24 و nonzero)
const socials = [
  {
    name: 'اینستاگرام',
    href: 'https://instagram.com/Dr.mahlinn',
    rgb: '222, 142, 137',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z',
  },
  {
    name: 'تلگرام',
    href: 'https://t.me/dr_mahlinn',
    rgb: '143, 193, 217',
    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  {
    name: 'واتساپ',
    href: 'https://wa.me/989922655520',
    rgb: '156, 191, 160',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z',
  },
  {
    name: 'بله',
    href: 'https://ble.ir/09922655520',
    rgb: '76, 235, 180',
    viewBox: '12 12 1000 1000',
    fillRule: 'evenodd', // تیک داخل آیکون به‌صورت برش توخالی دیده می‌شود
    path: 'M1010.36,547.36c-.73,17.77-2.6,36-6.85,53.41-1.54,16.48-6.36,32.54-10.76,48.52-5.14,19.5-12.48,38.33-19.9,57.17-6.77,15.66-14.35,30.91-22.26,46.08C942.92,766,934.93,779.2,926.29,792q-14.32,21-30.5,40.45c-11.18,13.13-22.68,26.09-35.15,37.92a503.68,503.68,0,0,1-51.3,43.55,453.44,453.44,0,0,1-48.44,31.56C742.06,956.74,722.16,966,702,974.6a548,548,0,0,1-65.89,21.86c-19.49,4.32-39,9.21-58.88,10.76-37,5.71-74.86,5.79-112.13,2.2-33.6-2.61-66.87-9.78-99.25-19.32l-.08-.58C210.19,944.18,82.32,816.07,34.94,661.2c-10.36-33.35-17.62-67.93-20.31-102.83-3.83-33.85-2-68-2.2-102q-.37-40.74-.08-81.64-.26-41.83,0-83.83c-.17-24-.08-47.95-.08-71.93s-.17-48.19.16-72.25c-.33-23.82-.08-47.63-.16-71.44-1.64-17.94,4.24-36.7,17.86-48.85C44.48,13.44,65.68,8.55,84,14.91c11.09,3.75,20.71,10.6,30.58,16.72,36,23.4,70.54,48.85,104.71,74.78a86.74,86.74,0,0,0,10.68-6.77A426.86,426.86,0,0,1,272.58,73.3a483.59,483.59,0,0,1,45.75-22.1c16.39-6.85,33.19-12.8,50.15-18.1,18.1-5,36.29-10.11,55-12.72a392.65,392.65,0,0,1,61.82-7.26,451.46,451.46,0,0,1,76.41,1.71A413.36,413.36,0,0,1,619,24c128.53,27,244.08,108.3,314.46,219a493,493,0,0,1,66.47,159.76c4.73,20.95,8.48,42.32,9.7,63.77A411.89,411.89,0,0,1,1010.36,547.36Z M705.69,273.2a107.59,107.59,0,0,1,62.37,1.3c25.62,9.82,46.29,29.94,57.5,54.9,8.34,22.86,9.31,48.42.91,71.44-6.06,16.2-16.76,30.09-29.4,41.74q-16.7,16.49-33.21,33.14c-11.79,11.79-23.64,23.5-35.33,35.35-11.3,11.28-22.62,22.49-33.85,33.81-12.32,12.34-24.68,24.61-36.95,37-14,14-28.06,27.94-42,42-13.24,13.29-26.55,26.49-39.8,39.78s-26.77,26.71-40.1,40.11c-12.27,11.85-23.51,24.94-37.35,35.06a106.69,106.69,0,0,1-57.95,16C417,753.28,393.79,744,376.87,727.33q-78.53-78.44-157-156.94c-12.82-12.66-21.38-29.07-26-46.38-4.75-23.86-1.94-49.51,10.31-70.75,9.37-16.54,23.79-29.65,40.19-39a107.52,107.52,0,0,1,57.86-9.73c21.38,3.21,42,13,56.91,28.76Q401.7,476,444.37,518.5c8.63-8.18,16.9-16.73,25.19-25.27q18-17.31,35.24-35.35c11.36-10.68,22.33-21.82,33.07-33.12,7.74-6.88,14.75-14.51,22.07-21.8,12-11.68,23.75-23.59,35.49-35.51,11.21-10.83,22.11-21.95,33.07-33,11.79-11.5,23.28-23.28,35-34.87a105.75,105.75,0,0,1,42.21-26.37Z',
  },
]

function subscribe() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    status.value = 'error'
    return
  }

  status.value = null
  setTimeout(() => {
    toast.success("ایمیل شما ثبت شد")
    email.value = ''
  }, 2000);
  // status.value = 'success'
  // setTimeout(() => { status.value = null }, 4000)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function handleScroll() {
  showScrollTop.value = window.scrollY > 400
}

onMounted(() => {
  fetchCategories()
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ── ورود ستون‌ها ─────────────────────────────────────── */
.footer-col {
  animation: colReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.footer-col-delay-1 { animation-delay: 0.1s; }
.footer-col-delay-2 { animation-delay: 0.2s; }
.footer-col-delay-3 { animation-delay: 0.3s; }

@keyframes colReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── هدینگ ستون‌ها ───────────────────────────────────── */
.footer-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgba(242, 235, 227, 0.9);
  margin-bottom: 1.1rem;
}
.footer-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  flex-shrink: 0;
}

/* ── لینک‌های ستون ───────────────────────────────────── */
.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: rgba(242, 235, 227, 0.5);
  transition: color 0.25s ease, gap 0.25s ease;
}
.footer-link:hover {
  color: rgba(242, 235, 227, 0.9);
  gap: 0.5rem;
}
.footer-link-bar {
  display: block;
  width: 0;
  height: 1px;
  border-radius: 9999px;
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  flex-shrink: 0;
}
.footer-link:hover .footer-link-bar {
  width: 10px;
}

/* ── آیتم تماس ───────────────────────────────────────── */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.contact-icon {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border-radius: 0.625rem;
  background: rgba(242, 235, 227, 0.05);
  border: 1px solid rgba(242, 235, 227, 0.08);
  color: rgba(242, 235, 227, 0.35);
  flex-shrink: 0;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.group:hover .contact-icon {
  background: rgba(162, 132, 102, 0.15);
  border-color: rgba(162, 132, 102, 0.3);
  color: #A28466;
}

/* ── شبکه‌های اجتماعی ────────────────────────────────── */
.socials-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.socials-line {
  flex: 1;
  height: 1px;
  margin-inline-start: 0.5rem;
  background: linear-gradient(to left, rgba(242, 235, 227, 0.12), transparent);
}

.social-btn {
  --sc: 242, 235, 227;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: inline-grid;
  place-items: center;
  border-radius: 0.75rem;
  color: rgba(242, 235, 227, 0.45);
  background-color: rgba(242, 235, 227, 0.04);
  border: 1px solid rgba(242, 235, 227, 0.09);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.45s ease;
  animation: socialReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0s);
}

@keyframes socialReveal {
  from { opacity: 0; transform: translateY(14px) scale(0.6); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* هاور / فوکوس */
.social-btn:hover,
.social-btn:focus-visible {
  color: rgb(var(--sc));
  background-color: rgba(var(--sc), 0.12);
  border-color: rgba(var(--sc), 0.5);
  transform: translateY(-4px);
  box-shadow:
    0 10px 22px -8px rgba(var(--sc), 0.55),
    0 0 20px -4px rgba(var(--sc), 0.35);
  outline: none;
}

.social-btn:focus-visible {
  box-shadow:
    0 0 0 3px rgba(var(--sc), 0.28),
    0 10px 22px -8px rgba(var(--sc), 0.55);
}

.social-btn:active {
  transform: translateY(-1px) scale(0.92);
  transition-duration: 0.12s;
}

/* موج حلقه‌ای (فقط یک‌بار در هر هاور) */
.social-ring {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid rgba(var(--sc), 0.6);
  opacity: 0;
  pointer-events: none;
}
.social-btn:hover .social-ring {
  animation: socialRing 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes socialRing {
  0%   { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0;   transform: scale(1.55); }
}

/* درخشش عبوری */
.social-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.social-shine-bar {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 32%, rgba(255, 255, 255, 0.18) 50%, transparent 68%);
  transform: translateX(170%);
}
.social-btn:hover .social-shine-bar {
  transform: translateX(-170%);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

/* آیکون */
.social-icon {
  position: relative;
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.social-btn:hover .social-icon,
.social-btn:focus-visible .social-icon {
  transform: scale(1.18);
}

/* تولتیپ نام برند */
.social-tooltip {
  position: absolute;
  bottom: calc(100% + 0.625rem);
  left: 50%;
  z-index: 20;
  transform: translate(-50%, 6px) scale(0.85);
  transform-origin: bottom center;
  padding: 0.3rem 0.7rem;
  font-size: 0.6875rem;
  font-weight: 700;
  white-space: nowrap;
  color: rgb(var(--sc));
  background: rgba(16, 14, 12, 0.92);
  border: 1px solid rgba(var(--sc), 0.4);
  border-radius: 0.55rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.social-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(var(--sc), 0.4);
}
.social-btn:hover .social-tooltip,
.social-btn:focus-visible .social-tooltip {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

/* بدون تولتیپ در دستگاه لمسی */
@media (hover: none) {
  .social-tooltip { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .social-btn, .social-btn * {
    animation: none !important;
    transition-duration: 0.01s !important;
  }
}

/* ── نماد اعتماد ─────────────────────────────────────── */
.trust-badge {
  animation: trustReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.trust-badge:nth-child(1) { animation-delay: 0.05s; }
.trust-badge:nth-child(2) { animation-delay: 0.12s; }
.trust-badge:nth-child(3) { animation-delay: 0.19s; }
.trust-badge:nth-child(4) { animation-delay: 0.26s; }

@keyframes trustReveal {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── پیام خبرنامه ────────────────────────────────────── */
.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.msg-fade-enter-from,
.msg-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

/* ── دکمه scroll-to-top ──────────────────────────────── */
.scroll-top-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scroll-top-leave-active {
  transition: all 0.25s ease;
}
.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.8);
}

/* ── لوگوی فوتر ─────────────────────────────────────── */
.footer-logo-mark {
  position: relative;
  width: 2.875rem;
  height: 2.875rem;
  flex-shrink: 0;
  isolation: isolate;
}

/* درخشش طلایی پشت قاب */
.footer-logo-glow {
  position: absolute;
  inset: -45%;
  z-index: -1;
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgba(162, 132, 102, 0.55), rgba(242, 168, 104, 0.15) 60%, transparent);
  filter: blur(10px);
  animation: logoGlow 4.5s ease-in-out infinite;
}
@keyframes logoGlow {
  0%, 100% { opacity: 0.5; transform: scale(0.85); }
  50%      { opacity: 1;   transform: scale(1.1); }
}

/* حلقه‌ی نور چرخان دور قاب */
.footer-logo-ring {
  position: absolute;
  inset: 0;
  border-radius: 0.8rem;
  overflow: hidden;
}
.footer-logo-ring > span {
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    transparent 0 55%,
    rgba(162, 132, 102, 0.9),   /* gold */
    rgba(251, 228, 205, 1),     /* peachLight */
    rgba(242, 168, 104, 0.8),   /* peach */
    transparent 92%
  );
  animation: logoRing 5s linear infinite;
}
@keyframes logoRing {
  to { transform: rotate(360deg); }
}

/* خود قاب لوگو — روی حلقه می‌نشیند و فقط لبه‌ی ۱٫۵ پیکسلی نور دیده می‌شود */
.footer-logo-tile {
  position: absolute;
  inset: 1.5px;
  border-radius: calc(0.8rem - 1.5px);
  overflow: hidden;
  background: #3F3A35;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* نوشته با برق نور عبوری */
/* نوشته با برق نور عبوری */
.footer-logo-text {
  background: linear-gradient(
    100deg,
    #F2EBE3 0%,
    #F2EBE3 35%,
    #A28466 42%,   /* gold */
    #F2A868 46%,   /* peach */
    #FFF8F0 50%,   /* نقطه‌ی اوج نور */
    #FBE4CD 54%,   /* peachLight */
    #A28466 58%,   /* gold */
    #F2EBE3 65%,
    #F2EBE3 100%
  );
  background-size: 300% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 0 rgba(242, 168, 104, 0));
  animation: logoShimmer 4.5s cubic-bezier(0.45, 0, 0.25, 1) infinite;
  transition: filter 0.5s ease;
}
@keyframes logoShimmer {
  0%, 45%   { background-position: 100% 0; }
  80%, 100% { background-position: 0% 0; }
}

/* هاور */
/* هاور */
.footer-logo:hover .footer-logo-tile { transform: scale(0.94); }
.footer-logo:hover .footer-logo-text {
  animation-duration: 2.2s;
  filter: drop-shadow(0 0 10px rgba(242, 168, 104, 0.45));
}

.footer-logo:focus-visible {
  outline: 2px solid rgba(162, 132, 102, 0.6);
  outline-offset: 6px;
  border-radius: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .footer-logo-glow,
  .footer-logo-ring > span,
  .footer-logo-text { animation: none; }
  .footer-logo-glow { opacity: 0.7; }
}
</style>
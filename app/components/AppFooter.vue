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
          <NuxtLink to="/" class="inline-flex items-center gap-3 group mb-5">
            <div class="w-11 h-11 rounded-xl overflow-hidden border border-cream/10 group-hover:border-gold/40 transition-colors duration-300">
              <img class="w-full h-full object-cover" src="/logo/logo.png" alt="ماهلین" />
            </div>
            <span class="font-display text-xl sm:text-2xl text-cream group-hover:text-gold transition-colors duration-300">
              ماهلین اسکین‌کر
            </span>
          </NuxtLink>

          <p class="text-sm text-cream/55 max-w-[34ch] leading-7">
            مراقبت پوست علمی، با معیار پزشکی. محصولاتی که با پشتوانه‌ی تحقیقات درماتولوژیک تولید شده‌اند.
          </p>

          <!-- امتیاز -->
          <!-- <div class="flex items-center gap-2.5 mt-5 p-3 rounded-2xl bg-cream/[0.04] border border-cream/[0.07] w-fit">
            <div class="flex gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-gold fill-gold" viewBox="0 0 24 24">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
              </svg>
            </div>
            <span class="text-xs text-cream/50 font-medium">۴.۹ از ۵</span>
            <span class="text-cream/20">·</span>
            <span class="text-xs text-cream/40">۲۰۰۰+ نظر</span>
          </div> -->

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
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path :d="social.path" />
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
          <ul class="space-y-2.5">
            <li v-for="c in CATS" :key="c">
              <NuxtLink
                :to="{ path: '/shop', query: { cat: c } }"
                class="footer-link group"
              >
                <span class="footer-link-bar bg-gold"></span>
                {{ c }}
              </NuxtLink>
            </li>
          </ul>
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
                required
                placeholder="ایمیل شما..."
                class="flex-1 min-w-0 bg-cream/[0.06] border border-cream/10 rounded-s-xl ps-10 pe-3 py-3 text-sm placeholder:text-cream/30 text-cream focus:outline-none focus:border-gold/50 focus:bg-cream/[0.09] transition-all duration-200"
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
              href="tel:+982100000000"
              class="contact-item group"
              dir="ltr"
            >
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-sm text-cream/55 group-hover:text-cream transition-colors duration-200">۰۲۱-۰۰۰۰۰۰۰۰</span>
            </a>

            <a
              href="mailto:info@mahlin.com"
              class="contact-item group"
              dir="ltr"
            >
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-sm text-cream/55 group-hover:text-cream transition-colors duration-200">info@mahlin.com</span>
            </a>

            <div class="contact-item">
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-linejoin="round"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span class="text-sm text-cream/55">تهران، خیابان ولیعصر</span>
            </div>
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
            <span class="text-xl">{{ trust.icon }}</span>
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
            <span class="w-px h-3 bg-cream/15 block"></span>
            <NuxtLink to="/sitemap" class="text-cream/40 hover:text-cream/80 transition-colors duration-200">
              نقشه سایت
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
import { CATS } from '~/data/products'

const email = ref('')
const status = ref(null)
const showScrollTop = ref(false)

const companyLinks = [
  { to: '/about',   label: 'درباره ما' },
  { to: '/journal', label: 'وبلاگ' },
  { to: '/contact', label: 'ارتباط با ما' },
  { to: '/faq',     label: 'سوالات متداول' },
  { to: '/terms',   label: 'قوانین و مقررات' },
]

const trustBadges = [
  { icon: '🔒', label: 'پرداخت امن', sub: 'درگاه معتبر بانکی' },
  { icon: '📦', label: 'ارسال سریع', sub: 'تحویل ۲۴ تا ۷۲ ساعته' },
  { icon: '↩️', label: 'ضمانت بازگشت', sub: 'تا ۷ روز پس از خرید' },
  { icon: '🧪', label: 'آزمایش‌شده', sub: 'تایید شده توسط متخصصان' },
]

const socials = [
  {
    name: 'اینستاگرام',
    href: 'https://instagram.com/mahlin',
    rgb: '222, 142, 137', // blush
    path: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.248.638.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.638.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.638-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.567.684-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.059 1.37-.059 4.04s.01 2.986.059 4.04c.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.684.567 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.059 4.04.059s2.987-.01 4.04-.059c.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.567-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.054.059-1.37.059-4.04s-.01-2.987-.059-4.04c-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.05-1.37-.059-4.04-.059zm0 4.596a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zm0 1.802a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm5.723-1.997a1.31 1.31 0 1 1-2.618 0 1.31 1.31 0 0 1 2.618 0z',
  },
  {
    name: 'تلگرام',
    href: 'https://t.me/mahlin',
    rgb: '143, 193, 217', // sky
    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  {
    name: 'واتساپ',
    href: 'https://wa.me/989120000000',
    rgb: '156, 191, 160', // sage
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z',
  },
]

function subscribe() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    status.value = 'error'
    return
  }
  status.value = 'success'
  email.value = ''
  setTimeout(() => { status.value = null }, 4000)
}

function onSocialEnter(e, color) {
  const el = e.currentTarget
  el.style.backgroundColor = color + '22'
  el.style.borderColor = color + '60'
  el.style.color = color
  el.style.transform = 'translateY(-3px) scale(1.1)'
}
function onSocialLeave(e) {
  const el = e.currentTarget
  el.style.backgroundColor = ''
  el.style.borderColor = ''
  el.style.color = ''
  el.style.transform = ''
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function handleScroll() {
  showScrollTop.value = window.scrollY > 400
}
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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
  letter-spacing: 0.01em;
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

/* ── شبکه اجتماعی ────────────────────────────────────── */
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
</style>
<template>
  <footer class="relative bg-ink text-cream overflow-hidden">
    <!-- بلاب‌های رنگی ظریف پس‌زمینه -->
    <div class="absolute top-0 start-1/4 w-72 h-72 bg-gold/[0.06] blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 end-1/4 w-64 h-64 bg-blush/[0.05] blur-[110px] rounded-full pointer-events-none"></div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      
      <!-- گرید اصلی -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-10">

        <!-- درباره برند -->
        <div class="sm:col-span-2 md:col-span-4 lg:col-span-4">
          <div class="flex items-center gap-2">
            <NuxtLink to="/" class="w-12">
              <img class="w-12 h-full" src="/logo/logo.png" alt="" />
            </NuxtLink>
            <span class="font-display text-xl sm:text-2xl text-cream">ماهلین اسکین‌کر</span>
          </div>
          <p class="mt-3 sm:mt-4 text-sm text-cream/60 max-w-full sm:max-w-[36ch] lg:max-w-[32ch] leading-relaxed">
            مراقبت پوست علمی، با معیار پزشکی. محصولاتی که با پشتوانه‌ی تحقیقات درماتولوژیک تولید شده‌اند.
          </p>

          <!-- امتیاز اعتماد -->
          <div class="flex items-center gap-2 mt-4">
            <div class="flex items-center gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-gold fill-gold" viewBox="0 0 24 24">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
              </svg>
            </div>
            <span class="text-xs text-cream/50">۴.۹ از ۵ (بیش از ۲۰۰۰ نظر)</span>
          </div>

          <!-- شبکه‌های اجتماعی -->
          <div class="flex items-center gap-2.5 mt-5 sm:mt-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-9 h-9 shrink-0 flex items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:-translate-y-1"
              :style="{ '--hover-bg': social.color }"
              @mouseenter="e => onSocialEnter(e, social.color)"
              @mouseleave="onSocialLeave"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" v-html="social.path"></svg>
            </a>
          </div>
        </div>

        <!-- دسته‌بندی -->
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-gold"></span>
            دسته‌بندی
          </h3>
          <ul class="flex flex-col gap-2 sm:gap-2.5 text-sm">
            <li v-for="c in CATS" :key="c">
              <NuxtLink
                :to="{ path: '/shop', query: { cat: c } }"
                class="text-cream/60 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1.5 group"
              >
                <span class="w-0 group-hover:w-2 h-px bg-gold transition-all duration-300"></span>
                {{ c }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- شرکت -->
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-sky"></span>
            شرکت
          </h3>
          <ul class="flex flex-col gap-2 sm:gap-2.5 text-sm">
            <li>
              <NuxtLink to="/about" class="text-cream/60 hover:text-sky transition-colors duration-200 inline-flex items-center gap-1.5 group">
                <span class="w-0 group-hover:w-2 h-px bg-sky transition-all duration-300"></span>
                درباره ما
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/journal" class="text-cream/60 hover:text-sky transition-colors duration-200 inline-flex items-center gap-1.5 group">
                <span class="w-0 group-hover:w-2 h-px bg-sky transition-all duration-300"></span>
                وبلاگ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-cream/60 hover:text-sky transition-colors duration-200 inline-flex items-center gap-1.5 group">
                <span class="w-0 group-hover:w-2 h-px bg-sky transition-all duration-300"></span>
                ارتباط با ما
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-cream/60 hover:text-sky transition-colors duration-200 inline-flex items-center gap-1.5 group">
                <span class="w-0 group-hover:w-2 h-px bg-sky transition-all duration-300"></span>
                سوالات متداول
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-cream/60 hover:text-sky transition-colors duration-200 inline-flex items-center gap-1.5 group">
                <span class="w-0 group-hover:w-2 h-px bg-sky transition-all duration-300"></span>
                قوانین و مقررات
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- خبرنامه -->
        <div class="sm:col-span-2 md:col-span-4 lg:col-span-4">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-blush"></span>
            خبرنامه
          </h3>
          <p class="text-sm text-cream/60 mb-4 max-w-[40ch]">آخرین یادداشت‌های پوستی و کدهای تخفیف را دریافت کنید.</p>

          <form @submit.prevent="subscribe" class="flex flex-col gap-2 max-w-full sm:max-w-[360px] lg:max-w-full">
            <div class="flex relative">
              <svg class="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                v-model="email"
                type="email"
                required
                placeholder="ایمیل شما"
                class="flex-1 min-w-0 bg-cream/5 border border-cream/15 rounded-s-md ps-9 pe-3 py-2.5 text-sm placeholder:text-cream/40 text-cream focus:outline-none focus:border-gold/60 transition-colors duration-200"
              />
              <button
                type="submit"
                class="bg-gold text-white px-4 sm:px-5 py-2.5 text-sm font-bold rounded-e-md hover:bg-gold/90 active:bg-gold/80 transition-colors duration-200 whitespace-nowrap"
              >
                عضویت
              </button>
            </div>
            <Transition name="fade">
              <p v-if="status === 'success'" class="text-xs text-sage flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                با موفقیت ثبت شد
              </p>
              <p v-else-if="status === 'error'" class="text-xs text-blush">
                لطفاً ایمیل معتبر وارد کنید.
              </p>
            </Transition>
          </form>

          <div class="mt-5 sm:mt-6 flex flex-col gap-2.5 text-sm">
            <a href="tel:+982100000000" class="text-cream/60 hover:text-cream transition-colors duration-200 w-fit flex items-center gap-2" dir="ltr">
              <svg class="w-3.5 h-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ۰۲۱-۰۰۰۰۰۰۰۰
            </a>
            <a href="mailto:info@mahlin.com" class="text-cream/60 hover:text-cream transition-colors duration-200 w-fit flex items-center gap-2" dir="ltr">
              <svg class="w-3.5 h-3.5 text-cream/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              info@mahlin.com
            </a>
            <span class="text-cream/60 flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-cream/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              تهران، خیابان ولیعصر
            </span>
          </div>
        </div>
      </div>

      <!-- خط جداکننده و کپی‌رایت -->
      <div class="mt-10 sm:mt-12 lg:mt-14 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
        <span class="text-[12px] sm:text-[13px] text-cream/50 text-center sm:text-start order-2 sm:order-1">
          © ۱۴۰۵ ماهلین اسکین‌کر — همه حقوق محفوظ است.
        </span>
        <div class="flex items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] order-1 sm:order-2">
          <NuxtLink to="/privacy" class="text-cream/50 hover:text-cream transition-colors duration-200">حریم خصوصی</NuxtLink>
          <span class="text-cream/20">|</span>
          <NuxtLink to="/terms" class="text-cream/50 hover:text-cream transition-colors duration-200">قوانین و مقررات</NuxtLink>
        </div>
      </div>
    </div>

    <!-- دکمه بازگشت به بالا -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        type="button"
        aria-label="بازگشت به بالا"
        class="fixed bottom-6 end-6 z-30 w-11 h-11 rounded-full bg-gold text-white grid place-items-center shadow-lg hover:bg-gold/90 hover:-translate-y-1 transition-all duration-300"
        @click="scrollToTop"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { CATS } from '~/data/products';

const email = ref('');
const status = ref(null);
const showScrollTop = ref(false);

function subscribe() {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

  if (!isValid) {
    status.value = 'error';
    return;
  }

  // TODO: اتصال به API واقعی خبرنامه
  status.value = 'success';
  email.value = '';

  setTimeout(() => {
    status.value = null;
  }, 3000);
}

function onSocialEnter(e, color) {
  e.currentTarget.style.backgroundColor = color;
  e.currentTarget.style.borderColor = color;
  e.currentTarget.style.color = '#fff';
}
function onSocialLeave(e) {
  e.currentTarget.style.backgroundColor = 'transparent';
  e.currentTarget.style.borderColor = 'rgba(242,235,227,0.15)';
  e.currentTarget.style.color = '';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 400;
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const socials = [
  {
    name: 'اینستاگرام',
    href: 'https://instagram.com',
    color: '#DE8E89',
    path: '<path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.248.638.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.638.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.638-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.567.684-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.059 1.37-.059 4.04s.01 2.986.059 4.04c.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.684.567 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.059 4.04.059s2.987-.01 4.04-.059c.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.567-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.054.059-1.37.059-4.04s-.01-2.987-.059-4.04c-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.05-1.37-.059-4.04-.059zm0 4.596a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zm0 1.802a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm5.723-1.997a1.31 1.31 0 1 1-2.618 0 1.31 1.31 0 0 1 2.618 0z"/>'
  },
  {
    name: 'تلگرام',
    href: 'https://t.me',
    color: '#8FC1D9',
    path: '<path d="M21.05 2.927a1.5 1.5 0 0 0-1.532-.234L2.6 9.44c-1.15.44-1.14 1.207-.21 1.502l4.35 1.357 1.67 5.098c.2.556.36.774.735.774.29 0 .418-.132.577-.29l1.72-1.667 4.38 3.235c.804.443 1.386.213 1.588-.746l2.88-13.564c.28-1.18-.44-1.72-1.24-1.212zM8.6 12.6l9.28-5.78c.44-.263.842-.12.51.17l-8 7.24-.31 3.4-1.48-5.03z"/>'
  },
  {
    name: 'واتساپ',
    href: 'https://wa.me',
    color: '#9CBFA0',
    path: '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.19-.31a8.2 8.2 0 0 1-1.26-4.34c0-4.53 3.69-8.22 8.25-8.22a8.2 8.2 0 0 1 5.82 2.41 8.15 8.15 0 0 1 2.41 5.81c0 4.54-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.65.8-.79.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.9 2.42 1.02 2.58.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z"/>'
  }
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
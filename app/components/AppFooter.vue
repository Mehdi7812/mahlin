<template>
  <footer class="bg-ink text-cream mt-16 sm:mt-20 lg:mt-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 xl:py-20">
      
      <!-- گرید اصلی: موبایل=۱ ستون | sm=۲ ستون | md=۴ ستون | lg=۱۲ ستون -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-10">

        <!-- درباره برند -->
        <div class="sm:col-span-2 md:col-span-4 lg:col-span-4">
          <span class="font-display text-xl sm:text-2xl text-cream">ماهلین اسکین‌کر</span>
          <p class="mt-3 sm:mt-4 text-sm text-cream/60 max-w-full sm:max-w-[36ch] lg:max-w-[32ch] leading-relaxed">
            مراقبت پوست علمی، با معیار پزشکی. محصولاتی که با پشتوانه‌ی تحقیقات درماتولوژیک تولید شده‌اند.
          </p>

          <!-- شبکه‌های اجتماعی -->
          <div class="flex items-center gap-2 mt-5 sm:mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام"
              class="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-cream/15 text-cream/70 hover:bg-cream hover:text-ink hover:border-cream transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.248.638.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.638.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.638-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.567.684-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.059 1.37-.059 4.04s.01 2.986.059 4.04c.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.684.567 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.059 4.04.059s2.987-.01 4.04-.059c.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.567-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.054.059-1.37.059-4.04s-.01-2.987-.059-4.04c-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.05-1.37-.059-4.04-.059zm0 4.596a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zm0 1.802a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm5.723-1.997a1.31 1.31 0 1 1-2.618 0 1.31 1.31 0 0 1 2.618 0z"/>
              </svg>
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام"
              class="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-cream/15 text-cream/70 hover:bg-cream hover:text-ink hover:border-cream transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.05 2.927a1.5 1.5 0 0 0-1.532-.234L2.6 9.44c-1.15.44-1.14 1.207-.21 1.502l4.35 1.357 1.67 5.098c.2.556.36.774.735.774.29 0 .418-.132.577-.29l1.72-1.667 4.38 3.235c.804.443 1.386.213 1.588-.746l2.88-13.564c.28-1.18-.44-1.72-1.24-1.212zM8.6 12.6l9.28-5.78c.44-.263.842-.12.51.17l-8 7.24-.31 3.4-1.48-5.03z"/>
              </svg>
            </a>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساپ"
              class="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-cream/15 text-cream/70 hover:bg-cream hover:text-ink hover:border-cream transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.19-.31a8.2 8.2 0 0 1-1.26-4.34c0-4.53 3.69-8.22 8.25-8.22a8.2 8.2 0 0 1 5.82 2.41 8.15 8.15 0 0 1 2.41 5.81c0 4.54-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.65.8-.79.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.9 2.42 1.02 2.58.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- دسته‌بندی -->
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream">دسته‌بندی</h3>
          <ul class="flex flex-col gap-2 sm:gap-2.5 text-sm">
            <li v-for="c in CATS" :key="c">
              <NuxtLink
                :to="{ path: '/shop', query: { cat: c } }"
                class="text-cream/60 hover:text-cream transition-colors duration-200"
              >
                {{ c }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- شرکت -->
        <div class="md:col-span-2 lg:col-span-2">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream">شرکت</h3>
          <ul class="flex flex-col gap-2 sm:gap-2.5 text-sm">
            <li>
              <NuxtLink to="/about" class="text-cream/60 hover:text-cream transition-colors duration-200">درباره ما</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/journal" class="text-cream/60 hover:text-cream transition-colors duration-200">وبلاگ</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-cream/60 hover:text-cream transition-colors duration-200">ارتباط با ما</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-cream/60 hover:text-cream transition-colors duration-200">سوالات متداول</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-cream/60 hover:text-cream transition-colors duration-200">قوانین و مقررات</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- خبرنامه -->
        <div class="sm:col-span-2 md:col-span-4 lg:col-span-4">
          <h3 class="text-sm font-bold mb-3 sm:mb-4 text-cream">خبرنامه</h3>
          <p class="text-sm text-cream/60 mb-4 max-w-[40ch]">آخرین یادداشت‌های پوستی را دریافت کنید.</p>

          <form @submit.prevent="subscribe" class="flex flex-col gap-2 max-w-full sm:max-w-[360px] lg:max-w-full">
            <div class="flex">
              <input
                v-model="email"
                type="email"
                required
                placeholder="ایمیل شما"
                class="flex-1 min-w-0 bg-cream/5 border border-cream/15 rounded-s-md px-3 py-2 text-sm placeholder:text-cream/40 text-cream focus:outline-none focus:border-cream/50 transition-colors duration-200"
              />
              <button
                type="submit"
                class="bg-cream text-ink px-3 sm:px-4 py-2 text-sm font-bold rounded-e-md hover:bg-cream/90 active:bg-cream/80 transition-colors duration-200 whitespace-nowrap"
              >
                عضویت
              </button>
            </div>
            <p v-if="status === 'success'" class="text-xs text-emerald-400">
              با موفقیت ثبت شد ✓
            </p>
            <p v-if="status === 'error'" class="text-xs text-red-400">
              لطفاً ایمیل معتبر وارد کنید.
            </p>
          </form>

          <div class="mt-5 sm:mt-6 flex flex-col gap-2 text-sm">
            <a href="tel:+982100000000" class="text-cream/60 hover:text-cream transition-colors duration-200 w-fit" dir="ltr">۰۲۱-۰۰۰۰۰۰۰۰</a>
            <a href="mailto:info@mahlin.com" class="text-cream/60 hover:text-cream transition-colors duration-200 w-fit" dir="ltr">info@mahlin.com</a>
            <span class="text-cream/60">تهران، خیابان ولیعصر</span>
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
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { CATS } from '~/data/products';

const email = ref('');
const status = ref(null);

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
</script>
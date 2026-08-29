<template>
  <!-- هدر اصلی -->
  <header class="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/10">
    <div class="max-w-[1280px] mx-auto px-4 md:px-6 h-[72px] md:h-[82px] grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 relative">
      
      <!-- لوگو (سمت چپ - در موبایل هنگام سرچ کاملاً محو می‌شود تا تداخل بصری ایجاد نشود) -->
      <NuxtLink 
        to="/" 
        class="flex items-center gap-3 text-ink justify-self-start shrink-0 transition-opacity duration-300 transform-gpu"
        :class="searchOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100 pointer-events-auto'"
      >
        <img
          src="/logo/mahlin-lockup.png"
          srcset="/logo/mahlin-lockup.png 1x, /logo/mahlin-lockup@2x.png 2x"
          alt="ماهلین اسکین‌کر"
          class="h-7 sm:h-8 md:h-11 w-auto"
        />
      </NuxtLink>

      <!-- ستون وسط: فقط منوی اصلی دسکتاپ را نگه می‌دارد -->
      <div class="hidden md:flex w-full h-full items-center justify-center overflow-hidden antialiased">
        <!-- منوی اصلی (پایدار در DOM) -->
        <div
          class="transition-[opacity,transform] duration-300 ease-out transform-gpu will-change-[opacity,transform]"
          :class="searchOpen ? 'opacity-0 translate-y-1 pointer-events-none' : 'opacity-100 translate-y-0'"
        >
          <nav aria-label="ناوبری اصلی" class="flex items-center gap-6 lg:gap-8 text-[15px]">
            <NuxtLink to="/shop" class="relative text-ink py-1.5 transition-colors hover:text-gold" active-class="text-gold">
              فروشگاه
              <span class="absolute -bottom-[1px] start-0 end-0 h-[1.5px] bg-gold scale-x-0 origin-center transition-transform duration-200 [.router-link-active_&]:scale-x-100 hover:scale-x-100" />
            </NuxtLink>
            <NuxtLink to="/journal" class="relative text-ink py-1.5 transition-colors hover:text-gold" active-class="text-gold">
              وبلاگ
              <span class="absolute -bottom-[1px] start-0 end-0 h-[1.5px] bg-gold scale-x-0 origin-center transition-transform duration-200 [.router-link-active_&]:scale-x-100 hover:scale-x-100" />
            </NuxtLink>
            <NuxtLink to="/about" class="relative text-ink py-1.5 transition-colors hover:text-gold" active-class="text-gold">
              درباره ما
              <span class="absolute -bottom-[1px] start-0 end-0 h-[1.5px] bg-gold scale-x-0 origin-center transition-transform duration-200 [.router-link-active_&]:scale-x-100 hover:scale-x-100" />
            </NuxtLink>
            <NuxtLink to="/contact" class="relative text-ink py-1.5 transition-colors hover:text-gold" active-class="text-gold">
              ارتباط با ما
              <span class="absolute -bottom-[1px] start-0 end-0 h-[1.5px] bg-gold scale-x-0 origin-center transition-transform duration-200 [.router-link-active_&]:scale-x-100 hover:scale-x-100" />
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- نوار جستجوی هوشمند (موبایل: پوشش‌دهنده ۱۰۰٪ مات کل هدر / دسکتاپ: باز شدن عریض و متمرکز در وسط) -->
      <div
        class="absolute inset-y-0 w-full left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 flex items-center justify-center transition-[opacity,transform] duration-300 ease-out transform-gpu will-change-[opacity,transform] z-20 bg-cream md:bg-transparent px-4 md:px-0"
        :class="searchOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'"
      >
        <!-- pe-14 در موبایل فضای دکمه ضربدر را به صورت مطلق رزرو می‌کند -->
        <form
          class="flex items-center gap-2.5 w-full max-w-[720px] transform-gpu pe-14 md:pe-0"
          style="backface-visibility: hidden;"
          @submit.prevent="onSearch"
        >
          <div class="relative flex-1 min-w-0">
            <svg
              class="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink/40"
              width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20 L16 16" stroke-linecap="round" />
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="search"
              placeholder="جستجوی محصول..."
              class="w-full bg-ink/5 rounded-full ps-11 pe-4 py-2.5 sm:py-3 text-sm sm:text-base text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-gold transform-gpu"
              @keydown.esc.prevent="closeSearch"
            />
          </div>
          <button
            type="submit"
            class="hidden sm:inline-flex bg-ink text-cream px-6 py-3 rounded-full text-sm font-bold hover:bg-ink/90 transition-colors whitespace-nowrap"
          >
            جستجو
          </button>
        </form>
      </div>

      <!-- آیکون‌ها (ستون سمت راست - با z-30 جهت دسترسی دائمی به دکمه ضربدر بستن) -->
      <div class="relative flex items-center justify-end shrink-0 min-h-[40px] z-30">
        
        <!-- دکمه بستن جستجو (به صورت لایه مطلق دقیقا در لبه قرار می‌گیرد) -->
        <button
          type="button"
          aria-label="بستن جستجو"
          class="absolute end-0 w-9 h-9 sm:w-10 sm:h-10 grid place-items-center rounded-full text-ink hover:bg-ink/5 transition-[opacity,transform] duration-300 ease-out transform-gpu will-change-[opacity,transform]"
          :class="searchOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'"
          @click="closeSearch"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
            <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round" />
          </svg>
        </button>

        <!-- بقیه آیکون‌ها (حالا در دسکتاپ هم با سرچ باز محو می‌شوند تا با ضربدر تداخل نداشته باشند) -->
        <div 
          class="flex items-center gap-0.5 sm:gap-1 transition-opacity duration-300 ease-out transform-gpu will-change-[opacity]"
          :class="searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'"
        >
          <!-- دکمه باز کردن جستجو -->
          <button
            type="button"
            aria-label="جستجو"
            class="w-9 h-9 sm:w-10 sm:h-10 grid place-items-center rounded-full text-ink hover:bg-ink/5 transition-colors"
            @click="openSearch"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20 L16 16" stroke-linecap="round" />
            </svg>
          </button>

          <!-- حساب کاربری -->
          <NuxtLink
            to="/account"
            aria-label="حساب کاربری"
            class="hidden sm:grid w-9 h-9 sm:w-10 sm:h-10 place-items-center rounded-full text-ink hover:bg-ink/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round" />
            </svg>
          </NuxtLink>

          <!-- سبد خرید -->
          <NuxtLink
            to="/cart"
            aria-label="سبد خرید"
            class="relative w-9 h-9 sm:w-10 sm:h-10 grid place-items-center rounded-full text-ink hover:bg-ink/5 transition-colors"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
              <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
            </svg>
            <span
              v-if="count > 0"
              class="absolute top-0.5 end-0.5 min-w-[17px] h-[17px] rounded-full bg-gold text-card text-[10px] grid place-items-center px-1"
            >
              {{ fa(count) }}
            </span>
          </NuxtLink>

          <!-- منوی موبایل -->
          <button
            type="button"
            :aria-label="open ? 'بستن منو' : 'باز کردن منو'"
            class="md:hidden w-9 h-9 sm:w-10 sm:h-10 grid place-items-center rounded-full hover:bg-ink/5 transition-colors"
            @click="open = !open"
          >
            <svg v-if="!open" width="22" height="22" viewBox="0 0 24 24" stroke="#3F3A35" stroke-width="1.4" fill="none">
              <path d="M4 8 H20 M4 13 H20 M4 18 H14" stroke-linecap="round" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" stroke="#3F3A35" stroke-width="1.4" fill="none">
              <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Overlay تیره بهینه -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="searchOpen" class="fixed inset-0 z-40 bg-ink/15" @click="closeSearch" />
    </Transition>
  </Teleport>

  <!-- منوی موبایل -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-40 bg-ink/40 md:hidden" @click="open = false" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out transform-gpu"
      enter-from-class="translate-x-full rtl:-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in transform-gpu"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full rtl:-translate-x-full"
    >
      <nav
        v-if="open"
        aria-label="منوی موبایل"
        class="fixed top-0 bottom-0 end-0 z-50 w-[80%] max-w-[320px] bg-cream shadow-2xl md:hidden flex flex-col overflow-y-auto"
      >
        <div class="flex items-center justify-between px-5 h-[72px] border-b border-ink/10">
          <span class="font-display text-lg text-ink">منو</span>
          <button
            type="button"
            aria-label="بستن منو"
            class="w-9 h-9 grid place-items-center rounded-full hover:bg-ink/5 transition-colors"
            @click="open = false"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="#3F3A35" stroke-width="1.4" fill="none">
              <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col px-5 py-2">
          <NuxtLink to="/shop" class="text-base font-semibold py-4 border-b border-ink/10 text-ink" active-class="text-gold" @click="open = false">فروشگاه</NuxtLink>
          <NuxtLink to="/journal" class="text-base font-semibold py-4 border-b border-ink/10 text-ink" active-class="text-gold" @click="open = false">وبلاگ</NuxtLink>
          <NuxtLink to="/about" class="text-base font-semibold py-4 border-b border-ink/10 text-ink" active-class="text-gold" @click="open = false">درباره ما</NuxtLink>
          <NuxtLink to="/contact" class="text-base font-semibold py-4 border-b border-ink/10 text-ink" active-class="text-gold" @click="open = false">ارتباط با ما</NuxtLink>
          <NuxtLink to="/account" class="text-base font-semibold py-4 border-b border-ink/10 text-ink" active-class="text-gold" @click="open = false">حساب کاربری</NuxtLink>
        </div>

        <div class="mt-auto px-5 py-5 border-t border-ink/10">
          <NuxtLink
            to="/cart"
            class="flex items-center justify-between bg-ink text-cream rounded-lg px-4 py-3.5 font-bold text-sm"
            @click="open = false"
          >
            <span class="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
                <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
              </svg>
              سبد خرید
            </span>
            <span v-if="count > 0" class="bg-gold text-card text-xs rounded-full min-w-[20px] h-5 grid place-items-center px-1.5">
              {{ fa(count) }}
            </span>
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { fa } from '~/utils/format';

const { count } = useCart();
const open = ref(false);
const searchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const route = useRoute();
const router = useRouter();

function openSearch() {
  open.value = false;
  searchOpen.value = true;
}

function closeSearch() {
  searchOpen.value = false;
  searchQuery.value = '';
}

watch(searchOpen, (val) => {
  if (import.meta.client) {
    if (val) {
      setTimeout(() => {
        searchInput.value?.focus({ preventScroll: true });
      }, 310);
    }
  }
});

watch(open, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : '';
  }
  if (val) closeSearch();
});

watch(() => route.fullPath, () => {
  open.value = false;
  closeSearch();
});

function handleEscape(e) {
  if (e.key === 'Escape') {
    open.value = false;
    closeSearch();
  }
}

if (import.meta.client) {
  window.addEventListener('keydown', handleEscape);
}

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
  }
});

function onSearch() {
  if (!searchQuery.value.trim()) return;
  router.push({ path: '/shop', query: { q: searchQuery.value.trim() } });
  closeSearch();
}
</script>
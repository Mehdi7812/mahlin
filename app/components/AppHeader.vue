<template>
  <!-- هدر اصلی -->
  <header class="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/10">
    <div class="max-w-[1280px] mx-auto px-4 md:px-6 h-[72px] md:h-[82px] grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 relative">
      
      <!-- لوگو -->
      <NuxtLink
        to="/"
        class="logo-link relative isolate flex items-center gap-3 text-ink justify-self-start shrink-0 transition-opacity duration-300 transform-gpu"
        :class="searchOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100 pointer-events-auto'"
      >
        <!-- درخشش نرم پشت لوگو -->
        <span class="logo-glow" aria-hidden="true"></span>

        <!-- ستاره‌های چشمک‌زن -->
        <span class="logo-sparkles" aria-hidden="true">
          <svg v-for="n in 4" :key="n" class="sparkle" :class="`sparkle-${n}`" viewBox="0 0 24 24">
            <path d="M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z" />
          </svg>
        </span>

        <!-- لوگو + برق نور روی آن -->
        <span class="logo-img relative inline-block">
          <img
            src="/logo/mahlin-lockup.png"
            srcset="/logo/mahlin-lockup.png 1x, /logo/mahlin-lockup@2x.png 2x"
            alt="ماهلین اسکین‌کر"
            class="block h-9 md:h-11 w-auto"
          />
          <span class="logo-shine" aria-hidden="true"></span>
        </span>
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
            <NuxtLink to="/Blog" class="relative text-ink py-1.5 transition-colors hover:text-gold" active-class="text-gold">
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
          role="search"
          class="flex items-center gap-2.5 w-full max-w-[720px] transform-gpu pe-14 md:pe-0"
          @submit.prevent="submitFullSearch"
          style="backface-visibility: hidden;"
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
        </form>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1.5 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-1.5 scale-95"
        >
          <div
            v-if="showSearchDropdown"
            class="absolute inset-x-0 top-full mt-2 bg-cream border border-ink/[0.08] rounded-[22px] shadow-[0_20px_45px_rgba(0,0,0,0.10)] z-50 overflow-hidden transform-gpu"
          >
            <div v-if="searchLoading" class="p-4 space-y-3">
              <div v-for="n in 3" :key="n" class="flex items-center gap-3 animate-pulse">
                <div class="w-12 h-12 rounded-xl bg-ink/[0.06] shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-3 w-3/4 bg-ink/[0.06] rounded-full"></div>
                  <div class="h-2.5 w-1/3 bg-ink/[0.06] rounded-full"></div>
                </div>
              </div>
            </div>

            <div v-else-if="searchResults.length" class="max-h-[420px] overflow-y-auto">
              <button
                v-for="r in searchResults"
                :key="r.id"
                type="button"
                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-ink/[0.02] transition-colors text-right border-b border-ink/[0.04] last:border-b-0"
                @click="goToSearchResult(r)"
              >
                <img
                  :src="r.cover_image || '/assets/founder-portrait.png'"
                  :alt="r.title_fa"
                  class="w-12 h-12 rounded-xl object-cover shrink-0 bg-ink/[0.04]"
                  @error="(e) => { e.target.src = '/assets/founder-portrait.png'; e.target.onerror = null }"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-xs sm:text-sm font-bold text-ink truncate">{{ r.title_fa }}</p>
                  <p v-if="r.category_title_fa" class="mt-0.5 flex items-center gap-1 truncate text-[10px] text-ink/45">
                    <Icon name="tabler:category-2" class="shrink-0 text-[11px]" />
                    {{ r.category_title_fa }}
                  </p>
                  <p v-if="r.summary_fa" class="mt-1 line-clamp-1 text-[10px] leading-4 text-ink/50">
                    {{ r.summary_fa }}
                  </p>
                </div>
                <div class="text-left shrink-0">
                  <div v-if="r.discount > 0 && r.price != null" class="text-[10px] text-ink/35 line-through font-latin">
                    {{ money(withTax(r.price, r.taxable)) }}
                  </div>
                  <div v-if="r.final_price != null || r.price != null" class="text-xs font-bold font-latin text-gold">
                    {{ money(withTax(r.final_price ?? r.price, r.taxable)) }} <span class="text-[9px] text-ink/40 font-sans">تومان</span>
                  </div>
                  <div v-else class="text-[10px] font-bold text-accent">مشاهده جزئیات</div>
                </div>
              </button>

              <button
                v-if="searchPage < searchTotalPages"
                type="button"
                class="flex w-full items-center justify-center gap-1.5 border-t border-ink/[0.06] px-4 py-3 text-xs font-bold text-accent transition-colors hover:bg-ink/[0.02] disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="searchLoadingMore"
                @click="loadMoreSearchResults"
              >
                <Icon v-if="searchLoadingMore" name="tabler:loader-2" class="animate-spin text-[14px]" />
                {{ searchLoadingMore ? 'در حال دریافت...' : 'مشاهده بیشتر' }}
              </button>
            </div>

            <div v-else class="flex flex-col items-center justify-center text-center py-8 px-4">
              <svg class="w-8 h-8 text-ink/20 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4.3-4.3" stroke-linecap="round"/>
              </svg>
              <p class="text-xs text-ink/45">نتیجه‌ای برای «{{ searchQuery.trim() }}» یافت نشد</p>
            </div>
          </div>
        </Transition>
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
              v-if="customizer.cartCount > 0"
              class="absolute top-0.5 end-0.5 min-w-[17px] h-[17px] rounded-full bg-gold text-card text-[10px] grid place-items-center px-1"
            >
              {{ fa(customizer.cartCount) }}
            </span>
          </NuxtLink>

          <!-- حساب کاربری -->
          <span
            v-if="authLoading"
            class="hidden sm:block w-[88px] h-9 rounded-full bg-ink/[0.06] animate-pulse me-1"
            aria-hidden="true"
          ></span>

          <NuxtLink
            v-else-if="isLoggedIn"
            to="/account"
            :aria-label="`حساب کاربری ${displayName}`"
            class="hidden sm:flex items-center gap-2 h-10 ps-1 pe-3.5 me-1 rounded-full border border-ink/10 text-ink hover:bg-ink/5 hover:border-ink/15 transition-colors"
          >
            <img
              v-if="userPhoto"
              :src="userPhoto"
              alt=""
              class="w-7 h-7 rounded-full object-cover bg-ink/5"
            />
            <span
              v-else
              class="w-7 h-7 rounded-full grid place-items-center bg-gold/15 text-gold text-xs font-bold"
              aria-hidden="true"
            ><svg v-if="!userInitial" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round" /></svg><template v-else>{{ userInitial }}</template></span>
            <span class="text-xs font-semibold max-w-[110px] truncate">{{ displayName }}</span>
          </NuxtLink>

          <NuxtLink
            v-else
            to="/login"
            class="hidden sm:flex items-center gap-1.5 h-10 px-4 me-1 rounded-full border border-ink/15 text-xs font-semibold text-ink hover:bg-ink hover:text-cream hover:border-ink transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round" />
            </svg>
            ورود
          </NuxtLink>

          <!-- منوی موبایل (دکمه‌ی همبرگر مورفینگ) -->
          <button
            type="button"
            :aria-label="open ? 'بستن منو' : 'باز کردن منو'"
            class="relative md:hidden w-6 h-6 sm:w-10 sm:h-10 grid place-items-center rounded-full hover:bg-ink/5 transition-colors"
            @click="open = !open"
          >
            <span class="relative block h-[13px] w-[19px]">
              <span class="burger-line" :class="open ? 'burger-line--top-open' : 'burger-line--top'" />
              <span class="burger-line" :class="open ? 'burger-line--mid-open' : 'burger-line--mid'" />
              <span class="burger-line" :class="open ? 'burger-line--bottom-open' : 'burger-line--bottom'" />
            </span>
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
      <div v-if="open" class="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] md:hidden" @click="open = false" />
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
        class="fixed top-0 bottom-0 end-0 z-50 flex w-[85%] max-w-[340px] flex-col overflow-hidden bg-cream shadow-2xl md:hidden"
      >
        <!-- هدر دراور با گرادیان طلایی و گوی‌های نورانی -->
        <div class="relative shrink-0 overflow-hidden border-b border-ink/10 bg-gradient-to-br from-gold/[0.08] via-cream to-cream">
          <span class="pointer-events-none absolute -top-12 -end-12 size-40 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
          <span class="pointer-events-none absolute -bottom-16 -start-16 size-36 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

          <div class="relative flex h-[72px] items-center justify-between px-5">
            <span class="flex items-center gap-2.5 font-display text-lg text-ink">
              <span class="grid size-9 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/20">
                <Icon name="tabler:sparkles" class="text-base" />
              </span>
              منو
            </span>
            <button
              type="button"
              aria-label="بستن منو"
              class="group grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 active:scale-90"
              @click="open = false"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" class="transition-transform duration-300 group-hover:rotate-90">
                <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- بدنه‌ی قابل اسکرول -->
        <div class="flex-1 overflow-y-auto no-scrollbar">
          <!-- کارت کاربر -->
          <div class="px-5 pt-5">
            <NuxtLink
              v-if="isLoggedIn"
              to="/account"
              class="menu-reveal group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-3.5 transition-colors hover:border-gold/40"
              style="--i: 0"
              @click="open = false"
            >
              <span class="pointer-events-none absolute -end-6 -top-6 size-16 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <span class="relative shrink-0">
                <img v-if="userPhoto" :src="userPhoto" alt="" class="size-12 rounded-full object-cover ring-2 ring-gold/25" />
                <span v-else class="grid size-12 place-items-center rounded-full bg-gold/15 font-bold text-gold ring-2 ring-gold/25" aria-hidden="true">
                  <svg v-if="!userInitial" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round" /></svg>
                  <template v-else>{{ userInitial }}</template>
                </span>
              </span>
              <span class="relative min-w-0 flex-1">
                <span class="block truncate text-sm font-bold text-ink">{{ displayName }}</span>
                <span class="mt-0.5 flex items-center gap-1 text-xs text-ink/50">
                  مشاهده‌ی حساب کاربری
                  <Icon name="tabler:chevron-left" class="text-[13px] transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                </span>
              </span>
            </NuxtLink>

            <NuxtLink
              v-else-if="!authLoading"
              to="/login"
              class="menu-reveal flex h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/40 bg-gold/5 text-sm font-bold text-ink transition-colors hover:bg-gold/10"
              style="--i: 0"
              @click="open = false"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round" />
              </svg>
              ورود / ثبت‌نام
            </NuxtLink>

            <div v-else class="menu-reveal h-16 animate-pulse rounded-2xl bg-ink/[0.06]" style="--i: 0" aria-hidden="true" />
          </div>

          <!-- دکمه‌ی جستجوی سریع -->
          <div class="menu-reveal px-5 pt-3" style="--i: 1">
            <button
              type="button"
              class="flex h-11 w-full items-center gap-2.5 rounded-2xl border border-ink/10 bg-white/60 px-4 text-sm font-semibold text-ink/60 transition-colors hover:border-gold/40 hover:text-ink"
              @click="openSearch"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M20 20 L16 16" stroke-linecap="round" />
              </svg>
              جستجوی محصول...
            </button>
          </div>

          <!-- لینک‌های ناوبری -->
          <div class="flex flex-col px-5 pt-3 pb-2">
            <NuxtLink
              v-for="(item, i) in navItems"
              :key="item.to"
              :to="item.to"
              class="menu-reveal group relative flex items-center justify-between gap-3 border-b border-ink/10 py-3.5 text-ink last:border-b-0"
              active-class="text-gold"
              :style="{ '--i': i + 2 }"
              @click="open = false"
            >
              <span
                class="absolute inset-y-2.5 start-[-20px] w-[3px] rounded-full bg-gold opacity-0 transition-opacity duration-300 [.router-link-active_&]:opacity-100"
                aria-hidden="true"
              />
              <span class="flex items-center gap-3">
                <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-ink/[0.04] text-ink/55 transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-gold [.router-link-active_&]:bg-gold/10 [.router-link-active_&]:text-gold">
                  <Icon :name="item.icon" class="text-[17px]" />
                </span>
                <span class="text-[15px] font-semibold">{{ item.label }}</span>
              </span>
              <Icon
                name="tabler:chevron-left"
                class="text-ink/25 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-gold rtl:group-hover:translate-x-1 [.router-link-active_&]:text-gold"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- CTA سبد خرید (ثابت پایین) -->
        <div class="menu-reveal shrink-0 border-t border-ink/10 bg-cream/95 px-5 py-5" style="--i: 6">
          <NuxtLink
            to="/cart"
            class="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-ink px-4 py-3.5 text-sm font-bold text-cream shadow-lg shadow-ink/10 transition-transform duration-200 active:scale-[0.98]"
            @click="open = false"
          >
            <span class="menu-cart-shine pointer-events-none absolute inset-0" aria-hidden="true" />
            <span class="relative z-10 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
                <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
              </svg>
              سبد خرید
            </span>
            <span
              v-if="customizer.cartCount > 0"
              class="relative z-10 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-card"
            >
              {{ fa(customizer.cartCount) }}
            </span>
            <span v-else class="relative z-10 text-cream/60">
              <Icon name="tabler:arrow-left" class="text-base rtl:rotate-180" />
            </span>
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { fa, money } from '~/utils/format.ts';
import { withTax } from '~/utils/tax.ts';

const customizer = useCustomizerStore()

const open = ref(false);
const searchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const searchResults = ref([]);
const searchLoading = ref(false);
const searchLoadingMore = ref(false);
const searchPage = ref(1);
const searchTotalPages = ref(1);
const showSearchDropdown = ref(false);
const route = useRoute();
const router = useRouter();
let searchTimer = null;

// آیتم‌های منوی موبایل (برای رندر پویا + ورود پلکانی با انیمیشن‌دیلی)
const navItems = [
  { to: '/shop', label: 'فروشگاه', icon: 'tabler:building-store' },
  { to: '/Blog', label: 'وبلاگ', icon: 'tabler:notebook' },
  { to: '/about', label: 'درباره ما', icon: 'tabler:sparkles' },
  { to: '/contact', label: 'ارتباط با ما', icon: 'tabler:phone' },
];

// ─── کاربر ─────────────────────────────────────────────────
// منبع واحد: store که app.vue بعد از mount با users/userInfo پرش می‌کند
// (توکن هم در localStorage و هم در sessionStorage پشتیبانی می‌شود).
const isLoggedIn = computed(() => customizer.auth);
const authLoading = computed(() => customizer.userInfoLoading && !customizer.auth);

const user = computed(() =>
  customizer.userInfo && !Array.isArray(customizer.userInfo) ? customizer.userInfo : {},
);

const displayName = computed(() => {
  const u = user.value;
  const name = (u.full_name || '').trim() || `${u.first_name || ''} ${u.last_name || ''}`.trim();
  return name || 'حساب من';
});

const userInitial = computed(() => {
  const n = displayName.value === 'حساب من' ? '' : displayName.value;
  return n ? n.charAt(0) : '';
});

const userPhoto = computed(() => user.value.photo || null);

const accountLink = computed(() => (isLoggedIn.value ? '/account' : '/login'));

function openSearch() {
  open.value = false;
  searchOpen.value = true;
}

function closeSearch() {
  searchOpen.value = false;
  searchQuery.value = '';
  searchResults.value = [];
  searchLoading.value = false;
  searchLoadingMore.value = false;
  searchPage.value = 1;
  searchTotalPages.value = 1;
  showSearchDropdown.value = false;
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
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

watch(searchQuery, (val) => {
  clearTimeout(searchTimer);

  const trimmed = val.trim();

  if (!trimmed) {
    searchResults.value = [];
    searchLoading.value = false;
    searchPage.value = 1;
    searchTotalPages.value = 1;
    showSearchDropdown.value = false;
    return;
  }

  showSearchDropdown.value = true;
  searchLoading.value = true;

  searchTimer = setTimeout(async () => {
    try {
      const response = await useGarnetApiFetch('reports/search', {
        amount: 5,
        direction: 'desc',
        order: 'id',
        page: 1,
        searchWord: trimmed,
      });

      if (response?.code === 2000) {
        searchResults.value = response.Result || [];
        searchPage.value = 1;
        const totalCount = Number(response.TotalCount);
        searchTotalPages.value = Number.isFinite(totalCount) && totalCount > 0
          ? Math.ceil(totalCount / 5)
          : (searchResults.value.length === 5 ? 2 : 1);
      } else {
        searchResults.value = [];
        searchTotalPages.value = 1;
      }
    } catch (error) {
      console.error('[AppHeader] خطا در جستجوی سریع:', error);
      searchResults.value = [];
      searchTotalPages.value = 1;
    } finally {
      searchLoading.value = false;
    }
  }, 300);
});

async function loadMoreSearchResults() {
  const trimmed = searchQuery.value.trim();
  if (!trimmed || searchLoadingMore.value || searchPage.value >= searchTotalPages.value) return;

  searchLoadingMore.value = true;
  const nextPage = searchPage.value + 1;

  try {
    const response = await useGarnetApiFetch('reports/search', {
      amount: 5,
      direction: 'desc',
      order: 'id',
      page: nextPage,
      searchWord: trimmed,
    });

    if (response?.code === 2000) {
      const existingIds = new Set(searchResults.value.map((item) => item.id));
      const nextResults = (response.Result || []).filter((item) => !existingIds.has(item.id));
      searchResults.value = [...searchResults.value, ...nextResults];
      searchPage.value = nextPage;
    }
  } catch (error) {
    console.error('[AppHeader] خطا در دریافت ادامه نتایج جستجو:', error);
  } finally {
    searchLoadingMore.value = false;
  }
}

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

function goToSearchResult(item) {
  closeSearch();
  router.push(`/product/${item.id}/${item.slug_fa}`);
}

function submitFullSearch() {
  if (!searchQuery.value.trim()) return;
  closeSearch();
  router.push({ path: '/shop', query: { q: searchQuery.value.trim() } });
}

</script>

<style scoped>
/* ════════ درخشش نرم پشت لوگو ════════ */
.logo-glow {
  position: absolute;
  inset: -35% -12%;
  z-index: -1;
  pointer-events: none;
  border-radius: 9999px;
  background: radial-gradient(
    closest-side,
    rgba(251, 228, 205, 0.95),   /* peachLight */
    rgba(162, 132, 102, 0.16) 65%, /* gold */
    transparent
  );
  filter: blur(14px);
  opacity: 0.6;
  animation: glowSoft 6s ease-in-out infinite;
  transition: opacity 0.5s ease;
}
@keyframes glowSoft {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 0.85; }
}

/* ════════ برق نور روی حروف لوگو ════════ */
.logo-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    110deg,
    transparent 38%,
    rgba(255, 248, 240, 0.85) 48%,
    rgba(251, 228, 205, 0.6) 52%,
    transparent 62%
  );
  background-size: 250% 100%;
  background-position: 130% 0;
  /* نور فقط روی شکل خود لوگو دیده می‌شود */
  -webkit-mask: url('/logo/mahlin-lockup.png') center / contain no-repeat;
          mask: url('/logo/mahlin-lockup.png') center / contain no-repeat;
  animation: logoShine 7s ease-in-out infinite;
}
@keyframes logoShine {
  0%, 70%   { background-position: 130% 0; }
  90%, 100% { background-position: -30% 0; }
}

/* ════════ ستاره‌ها ════════ */
.logo-sparkles {
  position: absolute;
  inset: -20% -10%;
  pointer-events: none;
}
.sparkle {
  position: absolute;
  width: 10px;
  height: 10px;
  fill: #A28466; /* gold */
  filter: drop-shadow(0 0 3px rgba(162, 132, 102, 0.7));
  opacity: 0;
  animation: twinkle 3.2s ease-in-out infinite;
}
.sparkle-1 { top: 4%;     inset-inline-start: 2%;  animation-delay: 0s; }
.sparkle-2 { top: 10%;    inset-inline-end: 6%;    width: 7px; height: 7px; fill: #F2A868; animation-delay: 0.8s; } /* peach */
.sparkle-3 { bottom: 2%;  inset-inline-end: 22%;   width: 8px; height: 8px; fill: #6E523A; animation-delay: 1.6s; } /* accent */
.sparkle-4 { bottom: 12%; inset-inline-start: 28%; width: 6px; height: 6px; fill: #FBE4CD; animation-delay: 2.4s; } /* peachLight */

@keyframes twinkle {
  0%, 100% { opacity: 0;   transform: scale(0) rotate(0deg); }
  15%      { opacity: 1;   transform: scale(1.15) rotate(45deg); }
  30%      { opacity: 0.9; transform: scale(0.85) rotate(90deg); }
  45%      { opacity: 0;   transform: scale(0) rotate(135deg); }
}

/* ════════ هاور لوگو ════════ */
.logo-img { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.logo-link:hover .logo-img  { transform: scale(1.03); }
.logo-link:hover .logo-glow { opacity: 1; animation-play-state: paused; }

/* ════════ ورود پلکانی آیتم‌های منوی موبایل ════════ */
.menu-reveal {
  opacity: 0;
  animation: menuItemIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 70ms + 120ms);
}
@keyframes menuItemIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* درخشش عبوری روی دکمه‌ی سبد خرید داخل منوی موبایل */
.menu-cart-shine {
  background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.18) 50%, transparent 65%);
  transform: translateX(-130%);
  transition: transform 0.9s ease;
}
.group:hover .menu-cart-shine { transform: translateX(130%); }

/* ════════ دکمه‌ی همبرگر مورفینگ (سه خط ↔ ضربدر) ════════ */
.burger-line {
  position: absolute;
  inset-inline: 0;
  height: 1.6px;
  border-radius: 999px;
  background: #3F3A35;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease,
    top 0.3s ease,
    bottom 0.3s ease,
    width 0.3s ease;
}
.burger-line--top    { top: 0; }
.burger-line--mid    { top: 50%; width: 72%; margin-inline-start: auto; transform: translateY(-50%); }
.burger-line--bottom { bottom: 0; width: 50%; margin-inline-start: auto; }

.burger-line--top-open    { top: 50%; transform: translateY(-50%) rotate(45deg); }
.burger-line--mid-open    { top: 50%; width: 100%; opacity: 0; transform: translateY(-50%) scaleX(0); }
.burger-line--bottom-open { bottom: 50%; width: 100%; transform: translateY(50%) rotate(-45deg); }

@media (prefers-reduced-motion: reduce) {
  .logo-glow,
  .logo-shine { animation: none; }
  .sparkle { animation: none; opacity: 0.8; transform: scale(1); }
  .logo-link:hover .logo-img { transform: none; }

  .menu-reveal { animation: none !important; opacity: 1 !important; }
  .menu-cart-shine { transition: none !important; }
  .burger-line { transition: none !important; }
}
</style>
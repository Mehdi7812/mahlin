<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <header class="border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between gap-6">
        <NuxtLink to="/" class="flex items-center gap-3 text-ink">
          <img
            src="/logo/mahlin-lockup.png"
            srcset="/logo/mahlin-lockup.png 1x, /logo/mahlin-lockup@2x.png 2x"
            alt="ماهلین اسکین‌کر"
            class="h-7 md:h-9 w-auto"
          />
        </NuxtLink>
        <div class="flex items-center gap-2 text-xs text-inkSoft">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <span>پرداخت امن</span>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-ink/10 py-6">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4 text-[13px] text-inkSoft">
        <span>© ۱۴۰۵ ماهلین اسکین‌کر — همه حقوق محفوظ است.</span>
        <NuxtLink to="/cart" class="text-accent hover:text-accentHover">بازگشت به سبد خرید</NuxtLink>
      </div>
    </footer>
  </div>
</template>

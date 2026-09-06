<!-- pages/faq.vue -->
<template>
  <div class="min-h-screen bg-cream text-ink">
    <!-- ══════════════════════════════════════
         هدر
         ══════════════════════════════════════ -->
    <header class="relative overflow-hidden bg-ink text-cream">
      <!-- بافت نقطه‌ای -->
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.85)_1px,transparent_1px)] opacity-[0.04] [background-size:18px_18px]"
        aria-hidden="true"
      />

      <!-- درخشش‌ها -->
      <div
        class="pointer-events-none absolute -top-36 -end-28 h-[420px] w-[420px] rounded-full bg-gold/[0.16] blur-[130px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -bottom-40 -start-24 h-96 w-96 rounded-full bg-sage/[0.12] blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute start-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac/[0.05] blur-[150px]"
        aria-hidden="true"
      />

      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8"
      >
        <!-- بردکرامب -->
        <nav
          class="mb-7 flex items-center justify-center gap-2 text-xs text-cream/40"
          aria-label="مسیر صفحه"
        >
          <NuxtLink
            to="/"
            class="transition-colors duration-200 hover:text-gold"
          >
            خانه
          </NuxtLink>

          <svg
            class="h-3 w-3 rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              d="M9 18l6-6-6-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-cream/70">سؤالات متداول</span>
        </nav>

        <div class="mx-auto max-w-3xl text-center">
          <!-- بج -->
          <div
            class="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold text-gold"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60"
              />
              <span class="relative h-2 w-2 rounded-full bg-gold" />
            </span>

            مرکز راهنمای ماهلین
          </div>

          <h1
            class="mt-5 font-display text-3xl font-bold leading-[1.4] sm:text-4xl lg:text-5xl"
          >
            چطور می‌توانیم
            <span class="text-gold">کمکتان کنیم؟</span>
          </h1>

          <p
            class="mx-auto mt-4 max-w-[62ch] text-sm leading-8 text-cream/55 sm:text-base"
          >
            پاسخ پرسش‌های رایج درباره انتخاب محصول، ثبت سفارش، پرداخت،
            ارسال، بازگشت کالا و مراقبت صحیح از پوست را اینجا پیدا کنید.
          </p>

          <!-- جست‌وجو -->
          <div class="relative mx-auto mt-8 max-w-2xl">
            <label for="faq-search" class="sr-only">
              جست‌وجو در سؤالات متداول
            </label>

            <svg
              class="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cream/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path
                d="M21 21l-4.35-4.35"
                stroke-linecap="round"
              />
            </svg>

            <input
              id="faq-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="مثلاً: زمان ارسال، مرجوعی، انتخاب محصول..."
              class="h-14 w-full rounded-2xl border border-cream/10 bg-cream/[0.07] ps-13 pe-12 text-sm text-cream outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-cream/30 hover:bg-cream/[0.09] focus:border-gold/50 focus:bg-cream/[0.1] focus:ring-4 focus:ring-gold/10 sm:h-16 sm:rounded-3xl"
              @input="activeCategory = 'all'"
              @keydown.esc="clearSearch"
            />

            <button
              v-if="searchQuery"
              type="button"
              aria-label="پاک کردن جست‌وجو"
              class="absolute end-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-cream/35 transition-all duration-200 hover:bg-cream/10 hover:text-cream"
              @click="clearSearch"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <!-- جست‌وجوهای محبوب -->
          <div
            class="mt-5 flex flex-wrap items-center justify-center gap-2"
            aria-label="پرسش‌های محبوب"
          >
            <span class="text-[11px] text-cream/35">
              جست‌وجوهای محبوب:
            </span>

            <button
              v-for="item in popularFaqs"
              :key="item.id"
              type="button"
              class="rounded-full border border-cream/10 bg-cream/[0.04] px-3 py-1.5 text-[10px] font-medium text-cream/55 transition-all duration-200 hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
              @click="goToFaq(item.id)"
            >
              {{ item.label }}
            </button>
          </div>

          <!-- آمار -->
          <div
            class="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-cream/40"
          >
            <span class="inline-flex items-center gap-1.5">
              <svg
                class="h-3.5 w-3.5 text-sage"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {{ toPersianNumber(faqs.length) }} پاسخ کاربردی
            </span>

            <span class="h-3 w-px bg-cream/10" />

            <span>
              {{ toPersianNumber(categories.length - 1) }} دسته‌بندی
            </span>

            <span class="h-3 w-px bg-cream/10" />

            <span>پشتیبانی همه‌روزه</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ══════════════════════════════════════
         محتوای اصلی
         ══════════════════════════════════════ -->
    <main
      class="relative z-10 mx-auto -mt-10 max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
    >
      <!-- دسته‌بندی‌ها -->
      <section
        aria-labelledby="faq-categories-title"
        class="rounded-[28px] border border-ink/[0.08] bg-white p-3 shadow-[0_18px_60px_-32px_rgba(28,25,23,0.35)] sm:p-4"
      >
        <h2 id="faq-categories-title" class="sr-only">
          دسته‌بندی سؤالات
        </h2>

        <div
          class="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8"
          role="tablist"
          aria-label="دسته‌بندی سؤالات متداول"
        >
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.id"
            class="group relative flex min-h-[82px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2.5 py-3 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            :class="
              activeCategory === category.id
                ? 'border-gold/25 bg-gold/[0.08] text-gold shadow-sm'
                : 'border-transparent bg-ink/[0.025] text-ink/55 hover:-translate-y-0.5 hover:border-ink/[0.08] hover:bg-ink/[0.04] hover:text-ink'
            "
            @click="setCategory(category.id)"
          >
            <span
              class="grid h-8 w-8 place-items-center rounded-xl transition-colors duration-200"
              :class="
                activeCategory === category.id
                  ? 'bg-gold/15 text-gold'
                  : 'bg-white text-ink/40 shadow-sm group-hover:text-gold'
              "
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  :d="category.icon"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span class="text-[11px] font-bold sm:text-xs">
              {{ category.title }}
            </span>

            <span
              class="absolute end-2 top-2 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] font-bold"
              :class="
                activeCategory === category.id
                  ? 'bg-gold text-white'
                  : 'bg-ink/[0.05] text-ink/35'
              "
            >
              {{ toPersianNumber(getCategoryCount(category.id)) }}
            </span>
          </button>
        </div>
      </section>

      <!-- لیست سؤالات و سایدبار -->
      <div
        class="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12"
      >
        <!-- سؤالات -->
        <section
          id="faq-results"
          class="lg:col-span-8 xl:col-span-9"
          aria-labelledby="faq-results-title"
        >
          <!-- عنوان نتایج -->
          <div
            class="mb-5 flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <div class="mb-2 flex items-center gap-2">
                <span class="h-px w-6 bg-gold/70" />
                <span
                  class="text-[10px] font-bold uppercase tracking-[0.14em] text-gold"
                >
                  راهنمای ماهلین
                </span>
              </div>

              <h2
                id="faq-results-title"
                class="font-display text-xl font-bold text-ink sm:text-2xl"
              >
                {{ contentTitle }}
              </h2>
            </div>

            <p
              class="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[10px] font-bold text-ink/45"
              aria-live="polite"
            >
              {{ toPersianNumber(filteredFaqs.length) }} نتیجه
            </p>
          </div>

          <!-- آکاردئون -->
          <div
            v-if="filteredFaqs.length"
            class="space-y-3"
          >
            <article
              v-for="faq in filteredFaqs"
              :id="faq.id"
              :key="faq.id"
              class="scroll-mt-28 overflow-hidden rounded-2xl border bg-white transition-all duration-300 sm:rounded-3xl"
              :class="
                openFaqId === faq.id
                  ? 'border-gold/30 shadow-[0_14px_40px_-30px_rgba(162,132,102,0.65)]'
                  : 'border-ink/[0.08] hover:border-ink/[0.14] hover:shadow-[0_10px_35px_-32px_rgba(28,25,23,0.45)]'
              "
            >
              <h3>
                <button
                  :id="`${faq.id}-button`"
                  type="button"
                  class="flex w-full items-start gap-3 p-4 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/40 sm:items-center sm:gap-4 sm:p-5"
                  :aria-expanded="openFaqId === faq.id"
                  :aria-controls="`${faq.id}-panel`"
                  @click="toggleFaq(faq.id)"
                >
                  <span
                    class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-200 sm:mt-0 sm:h-10 sm:w-10 sm:rounded-2xl"
                    :class="
                      openFaqId === faq.id
                        ? 'bg-gold text-white'
                        : 'bg-gold/10 text-gold'
                    "
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.09 9a3 3 0 115.83 1c0 2-3 3-3 3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 17h.01"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span class="min-w-0 flex-1">
                    <span
                      class="mb-1.5 inline-flex rounded-md bg-ink/[0.04] px-2 py-0.5 text-[9px] font-bold text-ink/40"
                    >
                      {{ getCategoryTitle(faq.category) }}
                    </span>

                    <span
                      class="block text-[13px] font-bold leading-7 text-ink sm:text-sm"
                    >
                      {{ faq.question }}
                    </span>
                  </span>

                  <span
                    class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-ink/35 transition-all duration-300 sm:mt-0"
                    :class="
                      openFaqId === faq.id
                        ? 'rotate-180 bg-gold/10 text-gold'
                        : 'bg-ink/[0.03]'
                    "
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </h3>

              <!-- پاسخ -->
              <div
                :id="`${faq.id}-panel`"
                role="region"
                :aria-labelledby="`${faq.id}-button`"
                :aria-hidden="openFaqId !== faq.id"
                class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                :class="
                  openFaqId === faq.id
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                "
              >
                <div class="min-h-0 overflow-hidden">
                  <div
                    class="mx-4 border-t border-ink/[0.07] pb-5 pt-4 sm:mx-5 sm:pb-6 sm:ps-14 sm:pt-5"
                  >
                    <p
                      class="text-[13px] leading-8 text-ink/65 sm:text-sm"
                    >
                      {{ faq.answer }}
                    </p>

                    <ul
                      v-if="faq.points?.length"
                      class="mt-3 space-y-2"
                    >
                      <li
                        v-for="point in faq.points"
                        :key="point"
                        class="flex items-start gap-2.5 text-[12px] leading-7 text-ink/60 sm:text-[13px]"
                      >
                        <span
                          class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        />
                        <span>{{ point }}</span>
                      </li>
                    </ul>

                    <!-- اکشن‌های پاسخ -->
                    <div
                      class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.05] pt-4"
                    >
                      <div class="flex items-center gap-2">
                        <template v-if="!feedback[faq.id]">
                          <span class="text-[10px] text-ink/40">
                            این پاسخ مفید بود؟
                          </span>

                          <button
                            type="button"
                            class="inline-flex items-center gap-1 rounded-lg border border-ink/[0.07] px-2.5 py-1.5 text-[10px] font-bold text-ink/45 transition-all hover:border-sage/30 hover:bg-sage/10 hover:text-sage"
                            @click="setFeedback(faq.id, 'yes')"
                          >
                            <svg
                              class="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              aria-hidden="true"
                            >
                              <path
                                d="M7 10v12M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2h0a3.13 3.13 0 013 3.88z"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            بله
                          </button>

                          <button
                            type="button"
                            class="inline-flex items-center gap-1 rounded-lg border border-ink/[0.07] px-2.5 py-1.5 text-[10px] font-bold text-ink/45 transition-all hover:border-blush/30 hover:bg-blush/10 hover:text-blush"
                            @click="setFeedback(faq.id, 'no')"
                          >
                            خیر
                          </button>
                        </template>

                        <span
                          v-else
                          class="inline-flex items-center gap-1.5 text-[10px] font-bold text-sage"
                        >
                          <svg
                            class="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>

                          ممنون از بازخورد شما
                        </span>
                      </div>

                      <button
                        type="button"
                        class="inline-flex items-center gap-1.5 text-[10px] font-bold text-ink/35 transition-colors hover:text-gold"
                        @click="copyFaqLink(faq.id)"
                      >
                        <svg
                          class="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          aria-hidden="true"
                        >
                          <path
                            d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        {{ copiedFaqId === faq.id ? 'کپی شد' : 'کپی لینک پاسخ' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- نتیجه‌ای وجود ندارد -->
          <div
            v-else
            class="rounded-3xl border border-dashed border-ink/15 bg-white px-5 py-14 text-center"
          >
            <span
              class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink/[0.04] text-ink/30"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path
                  d="M21 21l-4.35-4.35M8 11h6"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <h3 class="mt-4 text-sm font-bold text-ink">
              پاسخی با این عبارت پیدا نشد
            </h3>

            <p class="mx-auto mt-2 max-w-md text-xs leading-6 text-ink/50">
              عبارت دیگری را امتحان کنید یا پرسش خود را مستقیماً برای تیم
              پشتیبانی ماهلین ارسال کنید.
            </p>

            <div class="mt-5 flex flex-wrap justify-center gap-2.5">
              <button
                type="button"
                class="rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-cream transition-all hover:bg-gold active:scale-95"
                @click="resetFilters"
              >
                نمایش همه سؤالات
              </button>

              <NuxtLink
                to="/contact"
                class="rounded-xl border border-ink/10 px-4 py-2.5 text-xs font-bold text-ink/60 transition-all hover:border-gold/30 hover:bg-gold/[0.06] hover:text-gold"
              >
                ارتباط با پشتیبانی
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- سایدبار پشتیبانی -->
        <aside class="lg:col-span-4 xl:col-span-3">
          <div class="space-y-4 lg:sticky lg:top-24">
            <!-- کارت پشتیبانی -->
            <div
              class="relative overflow-hidden rounded-3xl bg-ink p-5 text-cream sm:p-6"
            >
              <div
                class="pointer-events-none absolute -top-16 -end-12 h-48 w-48 rounded-full bg-gold/20 blur-[70px]"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute -bottom-20 -start-12 h-44 w-44 rounded-full bg-sage/15 blur-[65px]"
                aria-hidden="true"
              />

              <div class="relative">
                <span
                  class="grid h-11 w-11 place-items-center rounded-2xl border border-cream/10 bg-cream/[0.07] text-gold"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 9h8M8 13h5"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>

                <h2 class="mt-4 font-display text-lg font-bold">
                  پاسخ خود را پیدا نکردید؟
                </h2>

                <p class="mt-2 text-xs leading-7 text-cream/50">
                  تیم پشتیبانی ماهلین آماده است برای انتخاب محصول، پیگیری
                  سفارش یا هر پرسش دیگری همراهتان باشد.
                </p>

                <NuxtLink
                  to="/contact"
                  class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3.5 text-xs font-bold text-white shadow-[0_10px_25px_-14px_rgba(162,132,102,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold/85 active:translate-y-0 active:scale-95"
                >
                  ارسال پیام به پشتیبانی

                  <svg
                    class="h-4 w-4 rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>

                <a
                  href="https://wa.me/989120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-cream/[0.05] px-4 py-3.5 text-xs font-bold text-cream/70 transition-all duration-200 hover:border-sage/30 hover:bg-sage/15 hover:text-sage active:scale-95"
                >
                  <svg
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2z" />
                  </svg>

                  گفت‌وگو در واتساپ
                </a>

                <div
                  class="mt-5 flex items-center gap-2 border-t border-cream/10 pt-4 text-[10px] text-cream/40"
                >
                  <span class="relative flex h-2 w-2">
                    <span
                      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50"
                    />
                    <span class="relative h-2 w-2 rounded-full bg-sage" />
                  </span>

                  پاسخ‌گویی همه‌روزه از ساعت ۹ تا ۱۸
                </div>
              </div>
            </div>

            <!-- شماره تماس -->
            <a
              href="tel:+982100000000"
              dir="ltr"
              class="group flex items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-4 transition-all duration-200 hover:border-gold/30 hover:shadow-sm"
            >
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              <span class="min-w-0">
                <span class="block text-xs font-bold text-ink">
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </span>
                <span class="mt-1 block text-[10px] text-ink/40">
                  تماس با پشتیبانی
                </span>
              </span>
            </a>

            <!-- لینک‌های کاربردی -->
            <div
              class="rounded-3xl border border-ink/[0.08] bg-white p-5"
            >
              <h3 class="flex items-center gap-2 text-xs font-bold text-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-sky" />
                لینک‌های کاربردی
              </h3>

              <div class="mt-4 space-y-1.5">
                <NuxtLink
                  v-for="link in usefulLinks"
                  :key="link.to"
                  :to="link.to"
                  class="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs text-ink/55 transition-colors hover:bg-ink/[0.035] hover:text-ink"
                >
                  <span>{{ link.label }}</span>

                  <svg
                    class="h-3.5 w-3.5 rotate-180 text-ink/25 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <!-- هشدار پزشکی -->
            <div
              class="flex items-start gap-3 rounded-2xl border border-blush/20 bg-blush/[0.06] p-4"
            >
              <svg
                class="mt-0.5 h-4 w-4 shrink-0 text-blush"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke-linecap="round"
                />
              </svg>

              <p class="text-[10px] leading-6 text-ink/50">
                پاسخ‌های مربوط به مراقبت پوست جنبه آموزشی دارند و جایگزین
                تشخیص یا درمان پزشک متخصص نیستند.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- پیام کپی -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 scale-90 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-4 scale-90 opacity-0"
    >
      <div
        v-if="showCopyToast"
        role="status"
        class="fixed bottom-6 start-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-cream/10 bg-ink px-4 py-3 text-xs text-cream shadow-2xl"
      >
        <svg
          class="h-4 w-4 text-sage"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        لینک پاسخ کپی شد.
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue'

useSeoMeta({
  title: 'سؤالات متداول | ماهلین اسکین‌کر',
  description:
    'پاسخ پرسش‌های متداول درباره ثبت سفارش، پرداخت، ارسال، بازگشت کالا، اصالت محصولات و انتخاب محصولات مراقبت پوست در ماهلین اسکین‌کر.',
  ogTitle: 'سؤالات متداول | ماهلین اسکین‌کر',
  ogDescription:
    'پاسخ سؤالات پرتکرار کاربران ماهلین درباره خرید، ارسال، مرجوعی و مراقبت از پوست.',
  ogType: 'website',
})

useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl',
  },
})

/* ══════════════════════════════════════
   دسته‌بندی‌ها
   ══════════════════════════════════════ */
const categories = [
  {
    id: 'all',
    title: 'همه سؤالات',
    icon: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
  },
  {
    id: 'orders',
    title: 'ثبت سفارش',
    icon: 'M6 7h12l1 14H5L6 7zm3 0V5a3 3 0 016 0v2',
  },
  {
    id: 'payment',
    title: 'پرداخت',
    icon: 'M3 6h18v12H3V6zm0 4h18M7 15h3',
  },
  {
    id: 'shipping',
    title: 'ارسال',
    icon: 'M3 5h11v12H3V5zm11 5h4l3 3v4h-7v-7zM7 20a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    id: 'returns',
    title: 'بازگشت کالا',
    icon: 'M3 7v6h6M21 17v-6h-6M5.5 17A8 8 0 0019 14M18.5 7A8 8 0 005 10',
  },
  {
    id: 'products',
    title: 'محصولات',
    icon: 'M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3zm-3 9l2 2 4-4',
  },
  {
    id: 'skincare',
    title: 'مراقبت پوست',
    icon: 'M12 3c3 4 6 6.5 6 10a6 6 0 01-12 0c0-3.5 3-6 6-10zm-3 10c1 1 2 1.5 3 1.5S14 14 15 13',
  },
  {
    id: 'account',
    title: 'حساب و حریم خصوصی',
    icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zm7 9a7 7 0 00-14 0M17 14l2 2 3-3',
  },
]

/* ══════════════════════════════════════
   سؤالات
   ══════════════════════════════════════ */
const faqs = [
  // ثبت سفارش
  {
    id: 'faq-how-to-order',
    category: 'orders',
    question: 'چطور می‌توانم از ماهلین سفارش ثبت کنم؟',
    answer:
      'محصول موردنظر را انتخاب کرده، آن را به سبد خرید اضافه کنید و سپس اطلاعات گیرنده و روش ارسال را وارد نمایید. پس از پرداخت موفق، شماره سفارش و کد پیگیری برای شما نمایش داده و پیامک می‌شود.',
    points: [
      'پیش از پرداخت، تعداد محصولات و نشانی گیرنده را بررسی کنید.',
      'ثبت سفارش نهایی فقط پس از پرداخت موفق انجام می‌شود.',
      'وضعیت سفارش از طریق حساب کاربری قابل مشاهده است.',
    ],
  },
  {
    id: 'faq-guest-order',
    category: 'orders',
    question: 'آیا بدون ساخت حساب کاربری می‌توانم خرید کنم؟',
    answer:
      'برای حفظ سوابق سفارش، پیگیری وضعیت ارسال و افزایش امنیت خرید، ورود با شماره موبایل معتبر ضروری است. فرایند ورود با کد یک‌بارمصرف انجام می‌شود و نیازی به ساخت رمز عبور پیچیده ندارید.',
  },
  {
    id: 'faq-cancel-order',
    category: 'orders',
    question: 'چطور سفارش را تغییر بدهم یا لغو کنم؟',
    answer:
      'تا پیش از ورود سفارش به مرحله بسته‌بندی، می‌توانید برای تغییر نشانی یا لغو سفارش با پشتیبانی تماس بگیرید. پس از تحویل بسته به شرکت حمل، تغییر یا لغو مستقیم امکان‌پذیر نیست.',
    points: [
      'هنگام تماس، شماره سفارش را همراه داشته باشید.',
      'امکان تغییر موجودی یا قیمت محصول جایگزین بررسی خواهد شد.',
      'در صورت لغو تأییدشده، وجه مطابق فرایند استرداد بازگردانده می‌شود.',
    ],
  },
  {
    id: 'faq-discount-code',
    category: 'orders',
    question: 'کد تخفیف را از کجا و چگونه وارد کنم؟',
    answer:
      'در صفحه سبد خرید یا مرحله پرداخت، بخش «کد تخفیف» را باز کرده و کد را بدون فاصله وارد کنید. هر کد دارای تاریخ انقضا، حداقل مبلغ خرید و شرایط اختصاصی است.',
    points: [
      'در هر سفارش معمولاً فقط یک کد قابل استفاده است.',
      'کدهای منقضی‌شده یا مخصوص حساب دیگر اعمال نمی‌شوند.',
      'برخی محصولات حراج نهایی شامل کد تخفیف اضافه نیستند.',
    ],
  },

  // پرداخت
  {
    id: 'faq-payment-methods',
    category: 'payment',
    question: 'چه روش‌هایی برای پرداخت وجود دارد؟',
    answer:
      'پرداخت سفارش از طریق درگاه بانکی امن و مورد تأیید شبکه شاپرک انجام می‌شود. برای پرداخت به کارت بانکی عضو شبکه شتاب، رمز پویا، تاریخ انقضا و CVV2 نیاز دارید.',
  },
  {
    id: 'faq-payment-deducted',
    category: 'payment',
    question: 'وجه از حسابم کم شده اما سفارش ثبت نشده است؛ چه کنم؟',
    answer:
      'اگر پرداخت ناموفق باشد اما مبلغ از حساب کسر شود، معمولاً بانک مبلغ را به‌صورت خودکار ظرف حداکثر ۷۲ ساعت کاری بازمی‌گرداند. اگر پس از این مدت وجه برگشت داده نشد، رسید پرداخت را برای پشتیبانی ارسال کنید.',
    points: [
      'ابتدا بخش سفارش‌های حساب کاربری را بررسی کنید.',
      'شماره پیگیری بانکی و زمان پرداخت را نگه دارید.',
      'برای یک سفارش ناموفق، پرداخت تکراری انجام ندهید مگر وضعیت آن مشخص شده باشد.',
    ],
  },
  {
    id: 'faq-invoice',
    category: 'payment',
    question: 'آیا برای سفارش فاکتور صادر می‌شود؟',
    answer:
      'بله. خلاصه فاکتور در حساب کاربری ثبت می‌شود و اطلاعات سفارش نیز همراه بسته یا به‌صورت دیجیتال در دسترس قرار می‌گیرد. برای دریافت فاکتور رسمی شرکتی، پیش از ثبت سفارش با پشتیبانی هماهنگ کنید.',
  },

  // ارسال
  {
    id: 'faq-shipping-time',
    category: 'shipping',
    question: 'سفارش من چه زمانی ارسال و تحویل می‌شود؟',
    answer:
      'سفارش‌ها معمولاً ظرف ۲۴ تا ۷۲ ساعت کاری آماده و به شرکت حمل تحویل داده می‌شوند. زمان نهایی تحویل با توجه به شهر مقصد و روش ارسال متفاوت است.',
    points: [
      'تهران: معمولاً ۱ تا ۲ روز کاری پس از ارسال.',
      'سایر شهرها: معمولاً ۲ تا ۵ روز کاری پس از ارسال.',
      'در کمپین‌ها، تعطیلات یا شرایط جوی ممکن است تحویل کمی طولانی‌تر شود.',
    ],
  },
  {
    id: 'faq-shipping-cost',
    category: 'shipping',
    question: 'هزینه ارسال چگونه محاسبه می‌شود؟',
    answer:
      'هزینه ارسال بر اساس شهر مقصد، وزن بسته، روش حمل و مبلغ سفارش محاسبه شده و پیش از پرداخت در سبد خرید نمایش داده می‌شود. اگر سفارش مشمول ارسال رایگان باشد، مبلغ ارسال به‌صورت خودکار صفر خواهد شد.',
  },
  {
    id: 'faq-track-order',
    category: 'shipping',
    question: 'چطور سفارش خود را پیگیری کنم؟',
    answer:
      'پس از تحویل بسته به شرکت حمل، کد رهگیری از طریق پیامک یا حساب کاربری در اختیار شما قرار می‌گیرد. با استفاده از این کد می‌توانید وضعیت مرسوله را در سامانه شرکت حمل بررسی کنید.',
  },
  {
    id: 'faq-change-address',
    category: 'shipping',
    question: 'آیا می‌توانم نشانی تحویل را تغییر بدهم؟',
    answer:
      'اگر سفارش هنوز وارد مرحله بسته‌بندی نشده باشد، امکان بررسی و تغییر نشانی از طریق پشتیبانی وجود دارد. پس از تحویل بسته به شرکت حمل، تغییر نشانی تضمین‌شده نیست.',
  },

  // مرجوعی
  {
    id: 'faq-return-policy',
    category: 'returns',
    question: 'شرایط بازگشت یا مرجوع کردن محصول چیست؟',
    answer:
      'به دلیل ماهیت بهداشتی محصولات مراقبت پوست، بازگشت کالا تنها زمانی پذیرفته می‌شود که محصول باز یا استفاده نشده باشد، پلمب سلامت آن سالم بماند و درخواست حداکثر تا ۷ روز پس از تحویل ثبت شود.',
    points: [
      'بسته‌بندی اصلی، فاکتور و اقلام همراه باید کامل باشند.',
      'محصولات بازشده یا مصرف‌شده قابل بازگشت نیستند.',
      'پیش از ارسال کالا، درخواست مرجوعی باید توسط پشتیبانی تأیید شود.',
    ],
  },
  {
    id: 'faq-damaged-product',
    category: 'returns',
    question: 'اگر محصول آسیب‌دیده، معیوب یا اشتباه دریافت کنم چه کنم؟',
    answer:
      'حداکثر تا ۲۴ ساعت پس از تحویل، از بسته، لیبل ارسال و محصول عکس یا ویدئو تهیه کرده و برای پشتیبانی ارسال کنید. پس از بررسی، تعویض محصول یا استرداد وجه بدون هزینه اضافی انجام خواهد شد.',
  },
  {
    id: 'faq-refund-time',
    category: 'returns',
    question: 'بازگشت وجه چقدر زمان می‌برد؟',
    answer:
      'پس از دریافت و تأیید کالای مرجوعی یا تأیید لغو سفارش، مبلغ معمولاً حداکثر ظرف ۵ روز کاری به حساب پرداخت‌کننده بازگردانده می‌شود. زمان نهایی نمایش وجه ممکن است به فرایند بانک بستگی داشته باشد.',
  },

  // محصولات
  {
    id: 'faq-product-authenticity',
    category: 'products',
    question: 'چطور از اصالت محصولات مطمئن شوم؟',
    answer:
      'محصولات ماهلین از مسیرهای تأمین معتبر تهیه می‌شوند و اطلاعات اصالت، بچ‌کد، تاریخ تولید یا شناسه رهگیری آن‌ها پیش از عرضه بررسی می‌شود. بسته‌بندی سالم و اطلاعات درج‌شده روی محصول را هنگام تحویل کنترل کنید.',
  },
  {
    id: 'faq-expiration',
    category: 'products',
    question: 'تاریخ انقضای محصولات چقدر است؟',
    answer:
      'تا حد امکان محصولاتی با زمان مصرف مناسب ارسال می‌شوند. تاریخ دقیق روی بسته‌بندی درج شده است. نماد ظرف بازشده مانند 6M یا 12M نیز مدت مجاز مصرف پس از باز شدن محصول را مشخص می‌کند.',
  },
  {
    id: 'faq-product-storage',
    category: 'products',
    question: 'محصولات مراقبت پوست را چگونه نگهداری کنم؟',
    answer:
      'بیشتر محصولات باید در محیط خشک، خنک و دور از تابش مستقیم خورشید نگهداری شوند. درِ محصول را پس از استفاده کاملاً ببندید و از ورود آب یا تماس مستقیم انگشت با محتویات ظرف جلوگیری کنید.',
    points: [
      'محصول را داخل خودرو، حمام مرطوب یا کنار پنجره قرار ندهید.',
      'فقط محصولاتی را در یخچال بگذارید که روی بسته‌بندی توصیه شده باشد.',
      'در صورت تغییر غیرعادی بو، رنگ یا بافت، مصرف را متوقف کنید.',
    ],
  },
  {
    id: 'faq-restock',
    category: 'products',
    question: 'محصول ناموجود چه زمانی دوباره شارژ می‌شود؟',
    answer:
      'زمان شارژ هر محصول به موجودی تأمین‌کننده بستگی دارد. می‌توانید اعلان موجودی محصول را فعال کنید یا از طریق خبرنامه و شبکه‌های اجتماعی ماهلین از شارژ مجدد مطلع شوید.',
  },

  // مراقبت پوست
  {
    id: 'faq-choose-product',
    category: 'skincare',
    question: 'چطور محصول مناسب نوع پوست خود را انتخاب کنم؟',
    answer:
      'ابتدا نوع پوست، حساسیت و دغدغه اصلی خود را مشخص کنید. سپس محصولات سازگار با همان نیاز را انتخاب نمایید. آنالایزر پوست ماهلین می‌تواند یک پیشنهاد اولیه برای ساخت روتین در اختیار شما قرار دهد.',
    points: [
      'پوست چرب نیز به آبرسان سبک و غیرکومدوژنیک نیاز دارد.',
      'برای پوست خشک، شوینده فاقد سولفات و کرم حاوی سرامید مناسب‌تر است.',
      'در پوست حساس، محصولات بدون عطر و اکتیوهای ملایم در اولویت هستند.',
    ],
  },
  {
    id: 'faq-patch-test',
    category: 'skincare',
    question: 'تست حساسیت یا Patch Test را چگونه انجام بدهم؟',
    answer:
      'مقدار کمی از محصول را روی بخش کوچکی از پوست سالم، مانند پشت گوش یا داخل بازو، استفاده کنید و ۲۴ تا ۴۸ ساعت منتظر بمانید. اگر قرمزی، خارش، تورم یا سوزش شدید ایجاد نشد، مصرف صورت را به‌تدریج شروع کنید.',
  },
  {
    id: 'faq-pregnancy',
    category: 'skincare',
    question: 'آیا محصولات در دوران بارداری یا شیردهی قابل استفاده‌اند؟',
    answer:
      'ایمنی مصرف به ترکیبات محصول و شرایط فردی بستگی دارد. در دوران بارداری یا شیردهی، پیش از مصرف رتینوئیدها، اسیدهای قوی یا هر محصول درمانی حتماً با پزشک متخصص مشورت کنید.',
  },
  {
    id: 'faq-results-time',
    category: 'skincare',
    question: 'چه مدت طول می‌کشد تا نتیجه محصولات را ببینم؟',
    answer:
      'زمان مشاهده نتیجه به نوع محصول، دغدغه پوست و میزان پیوستگی در مصرف بستگی دارد. آبرسان‌ها ممکن است سریع‌تر اثر ظاهری ایجاد کنند، اما بهبود لک، جوش یا خطوط پوستی معمولاً به چند هفته مصرف منظم نیاز دارد.',
    points: [
      'محصول جدید را حداقل چند هفته منظم مصرف کنید، مگر اینکه تحریک ایجاد شود.',
      'به‌طور هم‌زمان چند اکتیو جدید وارد روتین نکنید.',
      'استفاده روزانه از ضدآفتاب برای حفظ نتیجه ضروری است.',
    ],
  },
  {
    id: 'faq-active-combination',
    category: 'skincare',
    question: 'آیا می‌توانم رتینول، ویتامین C و اسیدها را با هم استفاده کنم؟',
    answer:
      'استفاده هم‌زمان از چند اکتیو قوی ممکن است موجب خشکی، التهاب و آسیب سد دفاعی شود. بهتر است محصولات فعال را به‌تدریج و در زمان‌های جدا وارد روتین کنید.',
    points: [
      'ویتامین C معمولاً در روتین صبح و ضدآفتاب پس از آن استفاده می‌شود.',
      'رتینول فقط شب و با دفعات کم شروع می‌شود.',
      'رتینول و لایه‌بردارهای AHA/BHA را در یک شب استفاده نکنید.',
    ],
  },

  // حساب و حریم خصوصی
  {
    id: 'faq-login',
    category: 'account',
    question: 'چرا کد ورود برای من ارسال نمی‌شود؟',
    answer:
      'ابتدا از صحیح بودن شماره موبایل و فعال بودن آنتن دستگاه مطمئن شوید. سپس پوشه پیامک‌های مسدودشده را بررسی کنید و پس از پایان زمان شمارش، درخواست ارسال مجدد بدهید.',
  },
  {
    id: 'faq-edit-profile',
    category: 'account',
    question: 'چطور اطلاعات حساب کاربری خود را ویرایش کنم؟',
    answer:
      'پس از ورود به حساب، از بخش پروفایل می‌توانید نام، ایمیل و نشانی‌های خود را ویرایش کنید. برای تغییر شماره موبایل اصلی ممکن است احراز هویت یا تماس با پشتیبانی لازم باشد.',
  },
  {
    id: 'faq-privacy',
    category: 'account',
    question: 'اطلاعات شخصی و بانکی من چگونه محافظت می‌شود؟',
    answer:
      'اطلاعات تنها برای ارائه خدمات، پردازش سفارش و پشتیبانی استفاده می‌شود. پرداخت مستقیماً در درگاه بانکی انجام می‌شود و ماهلین اطلاعات کامل کارت، رمز یا CVV2 شما را دریافت یا ذخیره نمی‌کند.',
  },
  {
    id: 'faq-delete-account',
    category: 'account',
    question: 'چطور درخواست حذف حساب یا اطلاعاتم را ثبت کنم؟',
    answer:
      'می‌توانید درخواست حذف حساب را از طریق صفحه تماس با ما یا ایمیل حریم خصوصی ثبت کنید. پس از احراز هویت، اطلاعاتی که نگهداری قانونی آن‌ها الزامی نباشد حذف یا ناشناس‌سازی خواهند شد.',
  },
]

/* Schema سؤالات متداول */
useHead({
  script: [
    {
      key: 'faq-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: [faq.answer, ...(faq.points || [])].join(' '),
          },
        })),
      }),
    },
  ],
})

/* ══════════════════════════════════════
   وضعیت
   ══════════════════════════════════════ */
const searchQuery = ref('')
const activeCategory = ref('all')
const openFaqId = ref(faqs[0].id)

const copiedFaqId = ref(null)
const showCopyToast = ref(false)
const feedback = reactive({})

let copyTimer = null
let toastTimer = null

const popularFaqs = [
  {
    id: 'faq-shipping-time',
    label: 'زمان ارسال',
  },
  {
    id: 'faq-return-policy',
    label: 'شرایط مرجوعی',
  },
  {
    id: 'faq-product-authenticity',
    label: 'اصالت محصولات',
  },
  {
    id: 'faq-choose-product',
    label: 'انتخاب محصول',
  },
]

const usefulLinks = [
  {
    to: '/shop',
    label: 'مشاهده محصولات',
  },
  {
    to: '/terms',
    label: 'قوانین و مقررات',
  },
  {
    to: '/privacy',
    label: 'سیاست حریم خصوصی',
  },
  {
    to: '/contact',
    label: 'ارتباط با ما',
  },
]

/* ══════════════════════════════════════
   محاسبات
   ══════════════════════════════════════ */
const categoryMap = Object.fromEntries(
  categories.map((category) => [category.id, category]),
)

const normalizedSearch = computed(() =>
  normalizeText(searchQuery.value),
)

const filteredFaqs = computed(() => {
  const query = normalizedSearch.value

  return faqs.filter((faq) => {
    const matchesCategory =
      activeCategory.value === 'all' ||
      faq.category === activeCategory.value

    if (!matchesCategory) return false
    if (!query) return true

    const searchableText = normalizeText(
      [
        faq.question,
        faq.answer,
        ...(faq.points || []),
        getCategoryTitle(faq.category),
      ].join(' '),
    )

    return searchableText.includes(query)
  })
})

const contentTitle = computed(() => {
  if (searchQuery.value.trim()) {
    return `نتایج جست‌وجو برای «${searchQuery.value.trim()}»`
  }

  if (activeCategory.value === 'all') {
    return 'پرسش‌های پرتکرار'
  }

  return `سؤالات ${getCategoryTitle(activeCategory.value)}`
})

/* ══════════════════════════════════════
   ابزارها
   ══════════════════════════════════════ */
function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ۀ/g, 'ه')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/إ|أ/g, 'ا')
    .replace(/[\u200c\u200f]/g, ' ')
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toPersianNumber(value) {
  return String(value).replace(
    /\d/g,
    (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit],
  )
}

function getCategoryTitle(categoryId) {
  return categoryMap[categoryId]?.title || ''
}

function getCategoryCount(categoryId) {
  if (categoryId === 'all') return faqs.length

  return faqs.filter(
    (faq) => faq.category === categoryId,
  ).length
}

/* ══════════════════════════════════════
   دسته‌بندی و جست‌وجو
   ══════════════════════════════════════ */
function setCategory(categoryId) {
  activeCategory.value = categoryId
  searchQuery.value = ''
  openFaqId.value = null

  nextTick(() => {
    document
      .getElementById('faq-results')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  })
}

function clearSearch() {
  searchQuery.value = ''
}

function resetFilters() {
  searchQuery.value = ''
  activeCategory.value = 'all'
  openFaqId.value = faqs[0].id
}

/* ══════════════════════════════════════
   آکاردئون
   ══════════════════════════════════════ */
function toggleFaq(id) {
  const willOpen = openFaqId.value !== id
  openFaqId.value = willOpen ? id : null

  if (willOpen) {
    window.history.replaceState(null, '', `#${id}`)
  } else if (window.location.hash === `#${id}`) {
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`,
    )
  }
}

function goToFaq(id, behavior = 'smooth') {
  const faq = faqs.find((item) => item.id === id)

  if (!faq) return

  searchQuery.value = ''
  activeCategory.value = 'all'
  openFaqId.value = id

  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior,
      block: 'start',
    })

    window.history.replaceState(null, '', `#${id}`)
  })
}

/* ══════════════════════════════════════
   کپی لینک
   ══════════════════════════════════════ */
async function copyFaqLink(id) {
  const link =
    `${window.location.origin}${window.location.pathname}#${id}`

  try {
    await navigator.clipboard.writeText(link)
  } catch {
    const textarea = document.createElement('textarea')

    textarea.value = link
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'

    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copiedFaqId.value = id
  showCopyToast.value = true

  clearTimeout(copyTimer)
  clearTimeout(toastTimer)

  copyTimer = window.setTimeout(() => {
    copiedFaqId.value = null
  }, 2000)

  toastTimer = window.setTimeout(() => {
    showCopyToast.value = false
  }, 2500)
}

function setFeedback(id, value) {
  feedback[id] = value
}

/* ══════════════════════════════════════
   چرخه حیات
   ══════════════════════════════════════ */
onMounted(() => {
  const hashId = decodeURIComponent(
    window.location.hash.slice(1),
  )

  if (hashId && faqs.some((faq) => faq.id === hashId)) {
    window.setTimeout(() => {
      goToFaq(hashId, 'auto')
    }, 150)
  }
})

onBeforeUnmount(() => {
  clearTimeout(copyTimer)
  clearTimeout(toastTimer)
})
</script>
<template>
  <div class="min-h-screen bg-cream text-ink">
    <!-- نوار پیشرفت مطالعه -->
    <div
      class="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] print:hidden"
      aria-hidden="true"
    >
      <div
        class="h-full bg-gradient-to-l from-gold via-blush to-gold transition-[width] duration-150"
        :style="{ width: `${readingProgress}%` }"
      />
    </div>

    <!-- ══════════ هدر ══════════ -->
    <header class="relative overflow-hidden bg-ink text-cream print:hidden">
      <!-- بافت نقطه‌ای -->
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.04]"
        style="
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.9) 1px,
            transparent 1px
          );
          background-size: 18px 18px;
        "
      />

      <!-- نورهای تزئینی -->
      <div
        class="pointer-events-none absolute -top-32 -end-24 h-96 w-96 rounded-full bg-gold/[0.15] blur-[120px]"
      />
      <div
        class="pointer-events-none absolute -bottom-32 -start-20 h-80 w-80 rounded-full bg-sage/[0.12] blur-[110px]"
      />
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div
        class="relative mx-auto max-w-[1280px] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
      >
        <!-- بردکرامب -->
        <nav
          class="mb-6 flex items-center gap-2 text-xs text-cream/40"
          aria-label="مسیر صفحه"
        >
          <NuxtLink
            to="/"
            class="transition-colors hover:text-gold"
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

          <span class="text-cream/70">حریم خصوصی</span>
        </nav>

        <div class="max-w-3xl">
          <span
            class="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/25 bg-sage/10 px-3.5 py-1.5 text-[11px] font-bold text-sage"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50"
              />
              <span class="relative h-2 w-2 rounded-full bg-sage" />
            </span>

            حفاظت از اطلاعات شما
          </span>

          <h1
            class="mb-5 font-display text-3xl leading-[1.35] sm:text-4xl lg:text-5xl"
          >
            سیاست
            <span class="text-gold">حریم خصوصی</span>
          </h1>

          <p
            class="max-w-[65ch] text-sm leading-8 text-cream/55 sm:text-base"
          >
            در ماهلین اسکین‌کر، حفظ امنیت و محرمانگی اطلاعات شخصی شما
            بخشی جدایی‌ناپذیر از اعتماد میان ما و شماست. در این سند توضیح
            می‌دهیم چه اطلاعاتی دریافت می‌کنیم، چرا به آن‌ها نیاز داریم و
            چگونه از آن‌ها محافظت می‌کنیم.
          </p>

          <!-- اطلاعات سند -->
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <div
              v-for="chip in metaChips"
              :key="chip.label"
              class="inline-flex items-center gap-2 rounded-full border border-cream/[0.08] bg-cream/[0.04] px-3.5 py-2 text-[11px] text-cream/50"
            >
              <svg
                class="h-3.5 w-3.5"
                :class="chip.iconClass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
                v-html="chip.svg"
              />
              {{ chip.label }}:
              <strong class="text-cream/85">{{ chip.value }}</strong>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ══════════ بدنه اصلی ══════════ -->
    <main class="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12">
        <!-- فهرست مطالب -->
        <aside class="lg:col-span-4 print:hidden xl:col-span-3">
          <div class="lg:sticky lg:top-24">
            <!-- دکمه موبایل -->
            <button
              type="button"
              class="mb-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 shadow-sm lg:hidden"
              :aria-expanded="tocOpen"
              aria-controls="privacy-toc"
              @click="tocOpen = !tocOpen"
            >
              <span class="flex items-center gap-2.5 text-sm font-bold">
                <svg
                  class="h-4 w-4 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                    stroke-linecap="round"
                  />
                </svg>

                فهرست مطالب
              </span>

              <svg
                class="h-4 w-4 text-ink/40 transition-transform duration-300"
                :class="{ 'rotate-180': tocOpen }"
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
            </button>

            <nav
              id="privacy-toc"
              class="rounded-3xl border border-ink/[0.08] bg-white p-4 shadow-[0_4px_24px_-12px_rgba(28,25,23,0.15)] sm:p-5"
              :class="{ 'hidden lg:block': !tocOpen }"
              aria-label="فهرست سیاست حریم خصوصی"
            >
              <h2
                class="mb-4 hidden items-center gap-2.5 border-b border-ink/[0.07] pb-3.5 text-sm font-bold lg:flex"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-gold" />
                فهرست مطالب
              </h2>

              <ol
                class="space-y-0.5 pe-1 lg:max-h-[58vh] lg:overflow-y-auto lg:[scrollbar-color:rgba(28,25,23,0.15)_transparent] lg:[scrollbar-width:thin]"
              >
                <li
                  v-for="(section, index) in sections"
                  :key="section.id"
                >
                  <a
                    :href="`#${section.id}`"
                    class="relative flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition-all duration-200"
                    :class="
                      activeSection === section.id
                        ? 'bg-gold/10 font-bold text-gold'
                        : 'text-ink/55 hover:bg-ink/[0.035] hover:text-ink/85'
                    "
                    @click.prevent="scrollToSection(section.id)"
                  >
                    <span
                      v-if="activeSection === section.id"
                      class="absolute start-0 top-1/2 h-1/2 w-[3px] -translate-y-1/2 rounded-full bg-gold"
                    />

                    <span
                      class="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg text-[10px] font-bold"
                      :class="
                        activeSection === section.id
                          ? 'bg-gold/15 text-gold'
                          : 'bg-ink/5 text-ink/40'
                      "
                    >
                      {{ toPersianNumber(index + 1) }}
                    </span>

                    <span class="flex-1 leading-[22px]">
                      {{ section.title }}
                    </span>
                  </a>
                </li>
              </ol>

              <!-- اکشن‌ها -->
              <div
                class="mt-4 grid grid-cols-2 gap-2 border-t border-ink/[0.07] pt-4"
              >
                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/[0.07] bg-ink/[0.035] p-2.5 text-[11px] font-bold text-ink/55 transition-all duration-200 hover:border-gold/30 hover:bg-gold/[0.08] hover:text-gold active:scale-95"
                  @click="printPage"
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
                      d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="6"
                      y="14"
                      width="12"
                      height="8"
                      rx="1"
                    />
                  </svg>

                  چاپ
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/[0.07] bg-ink/[0.035] p-2.5 text-[11px] font-bold text-ink/55 transition-all duration-200 hover:border-gold/30 hover:bg-gold/[0.08] hover:text-gold active:scale-95"
                  @click="copyPageLink"
                >
                  <svg
                    v-if="!copied"
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

                  <svg
                    v-else
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

                  {{ copied ? 'کپی شد' : 'کپی لینک' }}
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <!-- ستون محتوا -->
        <div class="lg:col-span-8 xl:col-span-9">
          <!-- خلاصه تعهد -->
          <section
            data-reveal
            class="mb-8 flex flex-col gap-4 overflow-hidden rounded-3xl border border-sage/25 bg-sage/[0.08] p-5 opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] translate-y-5 sm:flex-row sm:p-6 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none print:translate-y-0 print:opacity-100"
          >
            <div
              class="pointer-events-none absolute -top-16 -end-12 h-40 w-40 rounded-full bg-sage/10 blur-[55px]"
            />

            <span
              class="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage/15 text-sage"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <div class="relative">
              <h2 class="mb-2 text-sm font-bold">
                خلاصه تعهد ماهلین
              </h2>

              <p class="text-sm leading-7 text-ink/60">
                ما اطلاعات شخصی شما را نمی‌فروشیم، اطلاعات بانکی شما را
                ذخیره نمی‌کنیم و فقط داده‌هایی را دریافت می‌کنیم که برای
                ارائه خدمات، پردازش سفارش و بهبود تجربه کاربری ضروری باشند.
              </p>
            </div>
          </section>

          <!-- بخش‌های حریم خصوصی -->
          <article class="space-y-5">
            <section
              v-for="(section, sectionIndex) in sections"
              :id="section.id"
              :key="section.id"
              :ref="el => setSectionElement(el, sectionIndex)"
              data-reveal
              class="group scroll-mt-24 rounded-3xl border border-ink/[0.08] bg-white p-5 opacity-0 shadow-[0_2px_20px_-14px_rgba(28,25,23,0.2)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] translate-y-5 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-28px_rgba(28,25,23,0.35)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none print:translate-y-0 print:break-inside-avoid print:opacity-100 sm:p-7 lg:p-8"
              :class="section.colors.hoverBorder"
            >
              <header class="mb-5 flex items-start gap-4">
                <span
                  class="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] border text-[13px] font-extrabold"
                  :class="[
                    section.colors.text,
                    section.colors.numberBg,
                    section.colors.numberBorder,
                  ]"
                >
                  {{ toPersianNumber(sectionIndex + 1) }}
                </span>

                <div class="min-w-0 flex-1 pt-0.5">
                  <h2
                    class="font-display text-lg leading-8 text-ink sm:text-xl"
                  >
                    {{ section.title }}
                  </h2>

                  <span
                    class="mt-2.5 block h-0.5 w-10 rounded-full"
                    :class="section.colors.dot"
                  />
                </div>

                <button
                  type="button"
                  class="grid h-8 w-8 shrink-0 place-items-center rounded-xl opacity-100 transition-all duration-200 group-hover:opacity-100 hover:bg-ink/5 focus:outline-none focus-visible:opacity-100 active:scale-90 print:hidden sm:opacity-0"
                  :class="section.colors.text"
                  :aria-label="`کپی لینک بخش ${section.title}`"
                  @click="copySectionLink(section.id)"
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
                </button>
              </header>

              <div class="space-y-4">
                <template
                  v-for="(block, blockIndex) in section.blocks"
                  :key="blockIndex"
                >
                  <p
                    v-if="block.type === 'paragraph'"
                    class="text-sm leading-8 text-ink/65"
                  >
                    {{ block.text }}
                  </p>

                  <h3
                    v-else-if="block.type === 'subtitle'"
                    class="pt-1 text-sm font-bold text-ink/85"
                  >
                    {{ block.text }}
                  </h3>

                  <ul
                    v-else-if="block.type === 'list'"
                    class="space-y-2.5"
                  >
                    <li
                      v-for="(item, itemIndex) in block.items"
                      :key="itemIndex"
                      class="flex items-start gap-3 text-sm leading-7 text-ink/65"
                    >
                      <span
                        class="relative mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        :class="section.colors.dot"
                      >
                        <span
                          class="absolute -inset-1 rounded-full opacity-15"
                          :class="section.colors.dot"
                        />
                      </span>

                      <span>{{ item }}</span>
                    </li>
                  </ul>

                  <ol
                    v-else-if="block.type === 'steps'"
                    class="space-y-3"
                  >
                    <li
                      v-for="(item, itemIndex) in block.items"
                      :key="itemIndex"
                      class="flex items-start gap-3 text-sm leading-7 text-ink/65"
                    >
                      <span
                        class="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-extrabold"
                        :class="[
                          section.colors.text,
                          section.colors.numberBg,
                        ]"
                      >
                        {{ toPersianNumber(itemIndex + 1) }}
                      </span>

                      <span>{{ item }}</span>
                    </li>
                  </ol>

                  <div
                    v-else-if="block.type === 'note'"
                    class="flex gap-3 rounded-2xl border p-4"
                    :class="[
                      section.colors.text,
                      section.colors.noteBg,
                      section.colors.noteBorder,
                    ]"
                  >
                    <svg
                      class="mt-1 h-4 w-4 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        d="M12 16v-4M12 8h.01"
                        stroke-linecap="round"
                      />
                    </svg>

                    <p class="text-[13px] leading-7 text-ink/60">
                      {{ block.text }}
                    </p>
                  </div>
                </template>
              </div>
            </section>
          </article>

          <!-- درخواست مرتبط با اطلاعات شخصی -->
          <section
            data-reveal
            class="relative mt-8 overflow-hidden rounded-3xl bg-ink p-6 text-cream opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] translate-y-5 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none print:translate-y-0 print:opacity-100 sm:p-9"
          >
            <div
              class="pointer-events-none absolute -top-20 -end-16 h-64 w-64 rounded-full bg-gold/15 blur-[90px]"
            />
            <div
              class="pointer-events-none absolute -bottom-20 -start-16 h-56 w-56 rounded-full bg-sage/10 blur-[80px]"
            />

            <div class="relative">
              <span
                class="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.07] px-3 py-1.5 text-[11px] text-cream/70"
              >
                <svg
                  class="h-3.5 w-3.5 text-sage"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z"
                    stroke-linejoin="round"
                  />
                </svg>

                کنترل اطلاعات در اختیار شماست
              </span>

              <h2 class="mb-3 font-display text-xl sm:text-2xl">
                درباره اطلاعات شخصی خود درخواستی دارید؟
              </h2>

              <p
                class="mb-6 max-w-[62ch] text-sm leading-8 text-cream/55"
              >
                برای دریافت نسخه اطلاعات، اصلاح مشخصات، حذف حساب کاربری یا
                لغو پیام‌های تبلیغاتی می‌توانید با واحد پشتیبانی ماهلین
                تماس بگیرید. درخواست شما پس از احراز هویت بررسی خواهد شد.
              </p>

              <div class="flex flex-wrap gap-3 print:hidden">
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-[13px] font-bold text-white shadow-[0_8px_22px_-10px_rgba(162,132,102,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold/85 active:translate-y-0 active:scale-95"
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
                      d="M3 6l9 6 9-6M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  ثبت درخواست
                </NuxtLink>

                <a
                  href="mailto:privacy@mahlin.com"
                  dir="ltr"
                  class="inline-flex items-center rounded-xl border border-cream/10 bg-cream/5 px-5 py-3 text-[13px] font-bold text-cream/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-cream/20 hover:bg-cream/10 hover:text-cream active:translate-y-0 active:scale-95"
                >
                  privacy@mahlin.com
                </a>

                <NuxtLink
                  to="/terms"
                  class="inline-flex items-center rounded-xl border border-cream/10 bg-cream/5 px-5 py-3 text-[13px] font-bold text-cream/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-cream/20 hover:bg-cream/10 hover:text-cream active:translate-y-0 active:scale-95"
                >
                  قوانین و مقررات
                </NuxtLink>
              </div>
            </div>
          </section>

          <p
            class="mt-8 text-center text-xs leading-7 text-ink/35 print:hidden"
          >
            این سیاست در تاریخ
            <strong class="text-ink/55">۱۵ خرداد ۱۴۰۴</strong>
            بازبینی شده و تا انتشار نسخه جدید معتبر است.
          </p>
        </div>
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
        v-if="showToast"
        role="status"
        class="fixed bottom-6 start-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-cream/10 bg-ink px-4 py-3 text-xs text-cream shadow-2xl print:hidden"
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

        لینک با موفقیت کپی شد.
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

useSeoMeta({
  title: 'حریم خصوصی | ماهلین اسکین‌کر',
  description:
    'سیاست حریم خصوصی ماهلین اسکین‌کر؛ نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات شخصی کاربران.',
  ogTitle: 'سیاست حریم خصوصی | ماهلین اسکین‌کر',
  ogDescription:
    'با نحوه حفاظت از اطلاعات شخصی و حقوق حریم خصوصی خود در ماهلین اسکین‌کر آشنا شوید.',
  ogType: 'website',
})

useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl',
  },
})

/* ── پالت‌های رنگی ──────────────────────────────── */
const palettes = {
  gold: {
    text: 'text-gold',
    numberBg: 'bg-gold/10',
    numberBorder: 'border-gold/25',
    dot: 'bg-gold',
    noteBg: 'bg-gold/[0.06]',
    noteBorder: 'border-gold/20',
    hoverBorder: 'hover:border-gold/30',
  },
  sky: {
    text: 'text-sky',
    numberBg: 'bg-sky/10',
    numberBorder: 'border-sky/25',
    dot: 'bg-sky',
    noteBg: 'bg-sky/[0.06]',
    noteBorder: 'border-sky/20',
    hoverBorder: 'hover:border-sky/30',
  },
  sage: {
    text: 'text-sage',
    numberBg: 'bg-sage/10',
    numberBorder: 'border-sage/25',
    dot: 'bg-sage',
    noteBg: 'bg-sage/[0.06]',
    noteBorder: 'border-sage/20',
    hoverBorder: 'hover:border-sage/30',
  },
  blush: {
    text: 'text-blush',
    numberBg: 'bg-blush/10',
    numberBorder: 'border-blush/25',
    dot: 'bg-blush',
    noteBg: 'bg-blush/[0.06]',
    noteBorder: 'border-blush/20',
    hoverBorder: 'hover:border-blush/30',
  },
  lilac: {
    text: 'text-lilac',
    numberBg: 'bg-lilac/10',
    numberBorder: 'border-lilac/25',
    dot: 'bg-lilac',
    noteBg: 'bg-lilac/[0.06]',
    noteBorder: 'border-lilac/20',
    hoverBorder: 'hover:border-lilac/30',
  },
}

const sections = [
  {
    id: 'introduction',
    title: 'مقدمه و دامنه اجرا',
    colors: palettes.gold,
    blocks: [
      {
        type: 'paragraph',
        text: 'این سیاست برای تمام کاربران وب‌سایت ماهلین اسکین‌کر، خریداران، اعضای خبرنامه و افرادی که از طریق فرم‌های ارتباطی با ما تماس می‌گیرند اجرا می‌شود.',
      },
      {
        type: 'paragraph',
        text: 'با استفاده از خدمات ماهلین، شما تأیید می‌کنید که این سند را مطالعه کرده‌اید و از نحوه پردازش اطلاعات شخصی خود آگاه هستید.',
      },
      {
        type: 'note',
        text: 'این سند درباره اطلاعاتی است که از طریق وب‌سایت و کانال‌های رسمی ماهلین دریافت می‌شود و شامل وب‌سایت‌ها یا خدمات اشخاص ثالث نیست.',
      },
    ],
  },
  {
    id: 'collected-data',
    title: 'چه اطلاعاتی جمع‌آوری می‌کنیم؟',
    colors: palettes.sky,
    blocks: [
      {
        type: 'paragraph',
        text: 'نوع اطلاعات دریافتی به نحوه استفاده شما از خدمات ماهلین بستگی دارد. ما فقط اطلاعات موردنیاز برای ارائه خدمات را دریافت می‌کنیم.',
      },
      {
        type: 'subtitle',
        text: 'اطلاعاتی که مستقیماً ثبت می‌کنید',
      },
      {
        type: 'list',
        items: [
          'نام و نام خانوادگی، شماره موبایل و نشانی ایمیل.',
          'نشانی پستی، کد پستی و اطلاعات گیرنده سفارش.',
          'اطلاعات حساب کاربری و سوابق سفارش‌ها.',
          'متن پیام‌ها، درخواست‌های پشتیبانی و دیدگاه‌های ثبت‌شده.',
          'اطلاعات مربوط به نوع پوست و ترجیحات پوستی، فقط در صورت ارائه داوطلبانه.',
        ],
      },
      {
        type: 'subtitle',
        text: 'اطلاعات فنی و خودکار',
      },
      {
        type: 'list',
        items: [
          'نشانی IP، نوع مرورگر، سیستم‌عامل و نوع دستگاه.',
          'صفحات مشاهده‌شده، زمان حضور و مسیر استفاده از وب‌سایت.',
          'اطلاعات کوکی‌ها و شناسه‌های ناشناس تحلیلی.',
          'گزارش خطاها و اطلاعات لازم برای حفظ امنیت سرویس.',
        ],
      },
      {
        type: 'note',
        text: 'اطلاعات کامل کارت بانکی، رمز دوم یا CVV2 در اختیار ماهلین قرار نمی‌گیرد و مستقیماً در درگاه امن بانکی پردازش می‌شود.',
      },
    ],
  },
  {
    id: 'data-usage',
    title: 'چگونه از اطلاعات استفاده می‌کنیم؟',
    colors: palettes.sage,
    blocks: [
      {
        type: 'paragraph',
        text: 'اطلاعات شما فقط برای اهداف مشخص، ضروری و مرتبط با خدمات فروشگاه پردازش می‌شود.',
      },
      {
        type: 'list',
        items: [
          'ایجاد و مدیریت حساب کاربری.',
          'ثبت، پرداخت، بسته‌بندی، ارسال و پیگیری سفارش.',
          'ارسال پیامک‌های ضروری مانند کد ورود و وضعیت سفارش.',
          'پاسخ‌گویی به درخواست‌ها و ارائه خدمات پشتیبانی.',
          'جلوگیری از تقلب، سوءاستفاده و فعالیت‌های غیرمجاز.',
          'بهبود محصولات، محتوای آموزشی و تجربه کاربری وب‌سایت.',
          'اجرای تعهدات قانونی، مالیاتی و حسابداری.',
          'ارسال خبرنامه و پیشنهادهای بازاریابی، فقط با رضایت کاربر.',
        ],
      },
    ],
  },
  {
    id: 'legal-basis',
    title: 'مبنای پردازش اطلاعات',
    colors: palettes.lilac,
    blocks: [
      {
        type: 'paragraph',
        text: 'ما اطلاعات شخصی شما را بر اساس یکی از مبانی زیر پردازش می‌کنیم:',
      },
      {
        type: 'list',
        items: [
          'اجرای قرارداد؛ مانند پردازش و تحویل سفارشی که ثبت کرده‌اید.',
          'رضایت شما؛ مانند عضویت در خبرنامه یا ثبت اطلاعات اختیاری مربوط به پوست.',
          'تعهد قانونی؛ مانند نگهداری فاکتورها و سوابق مالی.',
          'منافع مشروع؛ مانند افزایش امنیت، جلوگیری از تقلب و بهبود عملکرد وب‌سایت.',
        ],
      },
      {
        type: 'note',
        text: 'هرجا پردازش بر اساس رضایت شما باشد، می‌توانید رضایت خود را در هر زمان پس بگیرید؛ این اقدام بر پردازش‌های قانونی قبلی اثر نمی‌گذارد.',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'اشتراک‌گذاری اطلاعات',
    colors: palettes.blush,
    blocks: [
      {
        type: 'paragraph',
        text: 'ما اطلاعات شخصی کاربران را نمی‌فروشیم و برای اهداف تبلیغاتی مستقل در اختیار اشخاص ثالث قرار نمی‌دهیم.',
      },
      {
        type: 'paragraph',
        text: 'در موارد ضروری ممکن است حداقل اطلاعات لازم با ارائه‌دهندگان خدمات زیر به اشتراک گذاشته شود:',
      },
      {
        type: 'list',
        items: [
          'شرکت‌های پستی و حمل‌ونقل برای تحویل سفارش.',
          'ارائه‌دهندگان زیرساخت میزبانی، پیامک و ایمیل.',
          'درگاه‌های پرداخت و شرکت‌های ارائه‌دهنده خدمات مالی.',
          'مشاوران حسابداری، حقوقی و امنیتی تحت تعهد محرمانگی.',
          'مراجع قانونی و قضایی، فقط در صورت وجود درخواست معتبر قانونی.',
        ],
      },
      {
        type: 'note',
        text: 'ارائه‌دهندگان خدمات فقط به اطلاعات موردنیاز دسترسی دارند و موظف‌اند آن‌ها را مطابق قرارداد و الزامات امنیتی پردازش کنند.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'کوکی‌ها و فناوری‌های مشابه',
    colors: palettes.gold,
    blocks: [
      {
        type: 'paragraph',
        text: 'کوکی فایل کوچکی است که در مرورگر شما ذخیره می‌شود و به عملکرد صحیح وب‌سایت، حفظ سبد خرید و شناخت تنظیمات کاربر کمک می‌کند.',
      },
      {
        type: 'list',
        items: [
          'کوکی‌های ضروری برای ورود، امنیت و عملکرد سبد خرید.',
          'کوکی‌های تنظیمات برای حفظ زبان و ترجیحات کاربر.',
          'کوکی‌های تحلیلی برای بررسی ناشناس عملکرد صفحات.',
          'کوکی‌های بازاریابی، فقط در صورت دریافت رضایت لازم.',
        ],
      },
      {
        type: 'paragraph',
        text: 'می‌توانید کوکی‌ها را از تنظیمات مرورگر حذف یا مسدود کنید؛ با این حال غیرفعال‌سازی کوکی‌های ضروری ممکن است باعث اختلال در ورود یا ثبت سفارش شود.',
      },
    ],
  },
  {
    id: 'security',
    title: 'امنیت اطلاعات',
    colors: palettes.sage,
    blocks: [
      {
        type: 'paragraph',
        text: 'ما از اقدامات فنی و سازمانی متناسب برای جلوگیری از دسترسی غیرمجاز، افشا، تغییر یا از بین رفتن اطلاعات استفاده می‌کنیم.',
      },
      {
        type: 'list',
        items: [
          'استفاده از ارتباط رمزنگاری‌شده HTTPS.',
          'کنترل سطح دسترسی کارکنان و ثبت فعالیت‌های حساس.',
          'پشتیبان‌گیری دوره‌ای و نظارت بر رخدادهای امنیتی.',
          'به‌روزرسانی منظم زیرساخت‌ها و محدودسازی دسترسی‌ها.',
          'همکاری با ارائه‌دهندگان معتبر و دارای استانداردهای امنیتی.',
        ],
      },
      {
        type: 'note',
        text: 'هیچ سامانه اینترنتی امنیت مطلق ندارد. در صورت وقوع رخداد مؤثر بر حقوق کاربران، اقدامات لازم انجام شده و در موارد ضروری اطلاع‌رسانی خواهد شد.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'مدت نگهداری اطلاعات',
    colors: palettes.sky,
    blocks: [
      {
        type: 'paragraph',
        text: 'اطلاعات فقط تا زمانی نگهداری می‌شود که برای ارائه خدمات، اجرای قرارداد، رسیدگی به اختلافات یا رعایت تعهدات قانونی لازم باشد.',
      },
      {
        type: 'list',
        items: [
          'اطلاعات حساب تا زمان فعال بودن حساب یا درخواست حذف آن.',
          'سوابق سفارش و فاکتورها مطابق الزامات مالی و قانونی.',
          'مکاتبات پشتیبانی تا پایان رسیدگی و مدت معقول پس از آن.',
          'اطلاعات خبرنامه تا زمان لغو عضویت توسط کاربر.',
          'داده‌های فنی و امنیتی برای مدت محدود و متناسب با هدف جمع‌آوری.',
        ],
      },
      {
        type: 'paragraph',
        text: 'پس از پایان دوره نگهداری، اطلاعات به‌صورت امن حذف یا در صورت امکان ناشناس‌سازی می‌شود.',
      },
    ],
  },
  {
    id: 'user-rights',
    title: 'حقوق و انتخاب‌های شما',
    colors: palettes.lilac,
    blocks: [
      {
        type: 'paragraph',
        text: 'شما می‌توانید در چارچوب قوانین قابل اجرا، نسبت به اطلاعات شخصی خود درخواست ثبت کنید.',
      },
      {
        type: 'steps',
        items: [
          'درخواست دسترسی و دریافت نسخه‌ای از اطلاعات شخصی.',
          'اصلاح اطلاعات ناقص، اشتباه یا قدیمی.',
          'درخواست حذف حساب و اطلاعات، در مواردی که نگهداری قانونی الزامی نباشد.',
          'لغو عضویت در پیام‌های تبلیغاتی و خبرنامه.',
          'اعتراض به برخی پردازش‌ها یا محدودسازی استفاده از اطلاعات.',
          'درخواست توضیح درباره نحوه پردازش اطلاعات شخصی.',
        ],
      },
      {
        type: 'note',
        text: 'برای جلوگیری از دسترسی اشخاص غیرمجاز، انجام برخی درخواست‌ها به احراز هویت کاربر نیاز دارد. پاسخ‌گویی در کوتاه‌ترین زمان معقول انجام می‌شود.',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'پیام‌های تبلیغاتی و خبرنامه',
    colors: palettes.blush,
    blocks: [
      {
        type: 'paragraph',
        text: 'ارسال پیام‌های بازاریابی فقط بر اساس رضایت شما یا در چارچوب مجاز قانونی انجام می‌شود.',
      },
      {
        type: 'list',
        items: [
          'می‌توانید از لینک لغو عضویت موجود در ایمیل‌ها استفاده کنید.',
          'برای قطع پیامک تبلیغاتی می‌توانید با پشتیبانی تماس بگیرید.',
          'لغو پیام‌های تبلیغاتی مانع ارسال پیام‌های ضروری سفارش نمی‌شود.',
          'ممکن است ثبت درخواست لغو در تمام سامانه‌ها چند روز کاری زمان ببرد.',
        ],
      },
    ],
  },
  {
    id: 'children',
    title: 'حریم خصوصی کودکان',
    colors: palettes.sky,
    blocks: [
      {
        type: 'paragraph',
        text: 'خدمات فروشگاه برای ثبت سفارش مستقل توسط افراد زیر ۱۸ سال طراحی نشده است. خرید این افراد باید با اطلاع و نظارت والدین یا سرپرست قانونی انجام شود.',
      },
      {
        type: 'paragraph',
        text: 'اگر مشخص شود اطلاعات کودک بدون رضایت سرپرست قانونی دریافت شده است، پس از بررسی و احراز موضوع برای حذف آن اقدام خواهیم کرد.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'تغییرات این سیاست',
    colors: palettes.gold,
    blocks: [
      {
        type: 'paragraph',
        text: 'ممکن است این سیاست در نتیجه تغییر خدمات، فناوری یا الزامات قانونی به‌روزرسانی شود. نسخه جدید همراه با تاریخ آخرین به‌روزرسانی در همین صفحه منتشر خواهد شد.',
      },
      {
        type: 'paragraph',
        text: 'در صورت ایجاد تغییرات مهم، از روش‌هایی مانند اعلان وب‌سایت، ایمیل یا پیامک برای اطلاع‌رسانی استفاده می‌کنیم.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'ارتباط با مسئول حریم خصوصی',
    colors: palettes.sage,
    blocks: [
      {
        type: 'paragraph',
        text: 'برای ثبت درخواست، گزارش نگرانی امنیتی یا دریافت توضیح درباره این سیاست می‌توانید با واحد پشتیبانی و حریم خصوصی ماهلین در ارتباط باشید.',
      },
      {
        type: 'list',
        items: [
          'ایمیل حریم خصوصی: privacy@mahlin.com',
          'ایمیل پشتیبانی: info@mahlin.com',
          'تلفن: ۰۲۱-۰۰۰۰۰۰۰۰',
          'نشانی: تهران، خیابان ولیعصر',
        ],
      },
      {
        type: 'note',
        text: 'لطفاً اطلاعات حساس مانند رمز عبور، رمز کارت یا کد تأیید بانکی را از طریق ایمیل یا فرم تماس ارسال نکنید.',
      },
    ],
  },
]

const metaChips = [
  {
    label: 'آخرین به‌روزرسانی',
    value: '۱۵ خرداد ۱۴۰۴',
    iconClass: 'text-gold',
    svg: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/>',
  },
  {
    label: 'زمان مطالعه',
    value: 'حدود ۶ دقیقه',
    iconClass: 'text-sky',
    svg: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/>',
  },
  {
    label: 'نسخه',
    value: '۱.۰',
    iconClass: 'text-sage',
    svg: '<path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>',
  },
]

const tocOpen = ref(false)
const activeSection = ref(sections[0].id)
const readingProgress = ref(0)
const copied = ref(false)
const showToast = ref(false)

const sectionElements = []
let sectionObserver = null
let revealObserver = null
let copyTimer = null
let toastTimer = null

function setSectionElement(element, index) {
  if (element) {
    sectionElements[index] = element
  }
}

function toPersianNumber(value) {
  return String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit])
}

function updateReadingProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight

  readingProgress.value =
    scrollableHeight > 0
      ? Math.min(100, (window.scrollY / scrollableHeight) * 100)
      : 0
}

function scrollToSection(id) {
  const element = document.getElementById(id)

  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - 96

  window.scrollTo({
    top,
    behavior: 'smooth',
  })

  window.history.replaceState(null, '', `#${id}`)
  activeSection.value = id
  tocOpen.value = false
}

async function writeToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copied.value = true
  showToast.value = true

  clearTimeout(copyTimer)
  clearTimeout(toastTimer)

  copyTimer = window.setTimeout(() => {
    copied.value = false
  }, 2000)

  toastTimer = window.setTimeout(() => {
    showToast.value = false
  }, 2500)
}

function copyPageLink() {
  writeToClipboard(`${window.location.origin}${window.location.pathname}`)
}

function copySectionLink(id) {
  const link = `${window.location.origin}${window.location.pathname}#${id}`

  writeToClipboard(link)
  window.history.replaceState(null, '', `#${id}`)
}

function printPage() {
  window.print()
}

onMounted(() => {
  updateReadingProgress()

  window.addEventListener('scroll', updateReadingProgress, {
    passive: true,
  })

  sectionObserver = new IntersectionObserver(
    entries => {
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort(
          (first, second) =>
            first.boundingClientRect.top - second.boundingClientRect.top,
        )

      if (visibleSections.length) {
        activeSection.value = visibleSections[0].target.id
      }
    },
    {
      rootMargin: '-96px 0px -65% 0px',
      threshold: 0,
    },
  )

  sectionElements.forEach(element => {
    if (element) sectionObserver.observe(element)
  })

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        entry.target.classList.remove('translate-y-5', 'opacity-0')
        entry.target.classList.add('translate-y-0', 'opacity-100')

        revealObserver.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05,
    },
  )

  document.querySelectorAll('[data-reveal]').forEach(element => {
    revealObserver.observe(element)
  })

  if (window.location.hash) {
    const initialId = window.location.hash.slice(1)

    window.setTimeout(() => {
      scrollToSection(initialId)
    }, 250)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateReadingProgress)

  sectionObserver?.disconnect()
  revealObserver?.disconnect()

  clearTimeout(copyTimer)
  clearTimeout(toastTimer)
})
</script>
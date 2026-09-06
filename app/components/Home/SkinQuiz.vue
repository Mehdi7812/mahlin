<template>
  <section
    id="skin-quiz"
    class="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24"
  >
    <!-- ═══════════ پس‌زمینه ═══════════ -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(28,25,23,0.75)_1px,transparent_1px)] opacity-[0.04] [background-size:22px_22px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -top-40 start-1/4 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[140px]"
      aria-hidden="true"
    />
    <!-- <div
      class="pointer-events-none absolute -bottom-48 end-0 h-[420px] w-[420px] rounded-full bg-sage/15 blur-[140px]"
      aria-hidden="true"
    /> -->
    <div
      class="pointer-events-none absolute top-1/3 start-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-lilac/10 blur-[150px]"
      aria-hidden="true"
    />
    <!-- <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
      aria-hidden="true"
    /> -->

    <div class="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12"
      >
        <!-- ══════════════════════════════════════════════
             ستون معرفی (Sticky)
             ══════════════════════════════════════════════ -->
        <div class="lg:col-span-5 lg:sticky lg:top-24">
          <!-- بج -->
          <div
            class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold text-gold"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70"
              />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            آنالایزر هوشمند پوست ماهلین
            <!-- <span
              class="rounded bg-gold/20 px-1.5 py-px font-mono text-[9px] tracking-wider"
              >V۲.۱</span
            > -->
          </div>

          <!-- تیتر -->
          <h2
            class="mt-5 font-display text-[26px] leading-[1.45] text-ink sm:text-[34px] sm:leading-[1.4]"
          >
            پوست شما یک
            <span class="relative inline-block">
              <span class="relative z-10 text-gold">فرمول اختصاصی</span>
              <span
                class="absolute inset-x-0 bottom-1 z-0 h-2.5 rounded bg-gold/15"
                aria-hidden="true"
              />
            </span>
            دارد، نه یک نسخه عمومی.
          </h2>

          <p class="mt-4 text-sm leading-8 text-ink/65">
            انتخاب اشتباه محصول، سد دفاعی پوست
            <span class="font-bold text-ink/80">(Skin Barrier)</span>
            را تخریب می‌کند و مشکل را عمیق‌تر می‌سازد. با پاسخ به ۵ پرسش کوتاه،
            پروفایل درماتولوژیک، کد پوستی، روتین صبح و شب و برنامه هفتگی
            اکتیوهای خود را دریافت کنید.
          </p>

          <!-- آمار -->
          <div
            class="mt-7 grid grid-cols-3 gap-2 rounded-2xl border border-ink/[0.08] bg-white/60 p-4 backdrop-blur-sm"
          >
            <div class="text-center">
              <p class="font-display text-lg font-bold text-ink sm:text-xl">
                ۱۸٬۴۰۰+
              </p>
              <p class="mt-1 text-[10px] leading-4 text-ink/50">
                روتین تجویز شده
              </p>
            </div>
            <div class="border-x border-ink/[0.08] text-center">
              <p class="font-display text-lg font-bold text-gold sm:text-xl">
                ۹۸٫۴٪
              </p>
              <p class="mt-1 text-[10px] leading-4 text-ink/50">
                رضایت از تطابق
              </p>
            </div>
            <div class="text-center">
              <p class="font-display text-lg font-bold text-sage sm:text-xl">
                ۶۰ ثانیه
              </p>
              <p class="mt-1 text-[10px] leading-4 text-ink/50">زمان تحلیل</p>
            </div>
          </div>

          <!-- ویژگی‌ها -->
          <ul class="mt-6 space-y-2.5">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-start gap-2.5 text-[13px] leading-6 text-ink/65"
            >
              <span
                class="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-sage/15 text-sage"
              >
                <svg
                  class="h-2.5 w-2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3.5"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {{ feature }}
            </li>
          </ul>

          <!-- کارت مشاوره -->
          <div
            class="group mt-7 overflow-hidden rounded-3xl border border-ink/[0.08] bg-white p-5 shadow-[0_4px_24px_-16px_rgba(28,25,23,0.25)] transition-all duration-300 hover:border-sage/40 hover:shadow-[0_12px_36px_-20px_rgba(28,25,23,0.3)]"
          >
            <div class="flex items-start gap-4">
              <div class="relative shrink-0">
                <div
                  class="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sage/25 to-sage/5 text-sage"
                >
                  <svg
                    class="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  >
                    <path
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="9" cy="7" r="4" />
                    <path
                      d="M19 8v6M22 11h-6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span
                  class="absolute -bottom-0.5 -start-0.5 grid h-4 w-4 place-items-center rounded-full bg-white"
                >
                  <span
                    class="h-2.5 w-2.5 animate-pulse rounded-full bg-sage"
                  />
                </span>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm font-bold text-ink">
                    مشاوره با بیوتی‌تراپیست
                  </h3>
                  <span
                    class="rounded-full bg-sage/15 px-2 py-0.5 text-[10px] font-bold text-sage"
                    >آنلاین</span
                  >
                </div>
                <p class="mt-1.5 text-xs leading-6 text-ink/55">
                  اگر مشکل پوستی خاص، دارو یا بارداری دارید، پیش از خرید با
                  متخصص ما گفتگو کنید.
                </p>
              </div>
            </div>

            <div
              class="mt-4 flex flex-wrap items-center gap-2.5 border-t border-ink/[0.06] pt-4"
            >
              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-sage/12 px-4 py-2.5 text-xs font-bold text-ink transition-all duration-200 hover:bg-sage hover:text-white active:scale-95"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2z"
                  />
                </svg>
                مشاوره رایگان واتساپ
              </a>

              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center rounded-xl border border-ink/10 px-3.5 py-2.5 text-xs font-bold text-ink/70 transition-all duration-200 hover:border-ink/25 hover:bg-ink/[0.03] hover:text-ink"
              >
                رزرو وقت
              </NuxtLink>
            </div>
          </div>

          <!-- سلب مسئولیت -->
          <p
            class="mt-4 flex items-start gap-2 text-[11px] leading-6 text-ink/40"
          >
            <svg
              class="mt-1 h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" stroke-linecap="round" />
            </svg>
            نتایج این آنالایزر جنبه راهنمای آموزشی دارد و جایگزین تشخیص پزشک
            متخصص پوست نیست.
          </p>
        </div>

        <!-- ══════════════════════════════════════════════
             ویجت آنالایزر
             ══════════════════════════════════════════════ -->
        <div class="lg:col-span-7">
          <div class="relative overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_24px_70px_-30px_rgba(28,25,23,0.25)] sm:rounded-[32px]">
            <!-- نوار بالایی -->
            <div
              class="relative border-b border-ink/[0.07] bg-gradient-to-l from-cream/60 to-white px-5 py-4 sm:px-7"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="flex min-w-0 items-center gap-3">
                  <span
                    class="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold transition-colors duration-300"
                    :class="
                      phase === 'result'
                        ? 'bg-sage text-white'
                        : 'bg-ink text-cream'
                    "
                  >
                    <svg
                      v-if="phase === 'result'"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span v-else>{{ toFa(currentStep) }}</span>
                  </span>

                  <div class="min-w-0">
                    <p class="truncate text-[13px] font-bold text-ink">
                      {{ headerTitle }}
                    </p>
                    <p class="mt-0.5 text-[11px] text-ink/45">
                      {{ headerSubtitle }}
                    </p>
                  </div>
                </div>

                <button
                  v-if="phase !== 'quiz' || currentStep > 1"
                  type="button"
                  class="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-ink/10 px-3 py-1.5 text-[11px] font-bold text-ink/55 transition-colors duration-200 hover:border-blush/40 hover:bg-blush/10 hover:text-blush active:scale-95"
                  @click="resetQuiz"
                >
                  <svg
                    class="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 3v5h5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  شروع مجدد
                </button>
              </div>

              <!-- استپر (اصلاح شده و ۱۰۰٪ دقیق) -->
              <div
                v-if="phase === 'quiz'"
                class="mt-4 flex items-center gap-1.5"
              >
                <button
                  v-for="s in TOTAL_STEPS"
                  :key="s"
                  type="button"
                  :disabled="s > maxReachedStep"
                  :aria-label="`مرحله ${toFa(s)}`"
                  :aria-current="s === currentStep ? 'step' : undefined"
                  class="group relative h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-300 disabled:cursor-not-allowed"
                  :class="
                    s <= maxReachedStep
                      ? 'bg-ink/10 hover:bg-ink/20'
                      : 'bg-ink/[0.06]'
                  "
                  @click="s <= maxReachedStep && (currentStep = s)"
                >
                  <span
                    class="absolute inset-y-0 start-0 rounded-full transition-all duration-500 ease-out"
                    :class="[
                      s <= currentStep ? 'w-full' : 'w-0',
                      s < currentStep ? 'bg-sage' : 'bg-gold/40'
                    ]"
                  />
                </button>
              </div>

              <!-- نوار پیشرفت تحلیل -->
              <div
                v-else-if="phase === 'analyzing'"
                class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
              >
                <div
                  class="h-full rounded-full bg-gradient-to-l from-gold via-sage to-lilac transition-all duration-200 ease-out"
                  :style="{ width: `${analyzeProgress}%` }"
                />
              </div>
            </div>

            <!-- ═════════ بدنه ═════════ -->
            <div class="p-5 sm:p-7 lg:p-8">
              <Transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-3"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <!-- ─────────── مرحله ۱: نوع پوست ─────────── -->
                <div v-if="phase === 'quiz' && currentStep === 1" key="s1">
                  <QHeading
                    num="۱"
                    title="چند ساعت پس از شستشو، پوست شما چه حسی دارد؟"
                    hint="حالت غالب و همیشگی پوستتان را انتخاب کنید، نه وضعیت موقت."
                  />

                  <div class="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <button
                      v-for="item in skinTypes"
                      :key="item.id"
                      type="button"
                      :aria-pressed="answers.skinType?.id === item.id"
                      class="group relative flex items-start gap-3.5 overflow-hidden rounded-2xl border p-4 text-start transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                      :class="
                        answers.skinType?.id === item.id
                          ? 'border-gold bg-gold/[0.07] shadow-[0_6px_20px_-12px_rgba(162,132,102,0.7)]'
                          : 'border-ink/10 bg-cream/30 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white hover:shadow-sm'
                      "
                      @click="selectSkinType(item)"
                    >
                      <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <QuizIcon :name="item.icon" class="h-6 w-6" />
                      </span>

                      <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-2">
                          <p class="text-sm font-bold text-ink">
                            {{ item.title }}
                          </p>
                          <RadioDot
                            :active="answers.skinType?.id === item.id"
                          />
                        </div>
                        <p class="mt-1 text-[11px] leading-5 text-ink/55">
                          {{ item.desc }}
                        </p>
                        <span
                          class="mt-2 inline-block rounded-md bg-ink/[0.05] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide text-ink/50"
                        >
                          {{ item.tag }}
                        </span>
                      </div>
                    </button>
                  </div>

                  <!-- راهنمای تشخیص -->
                  <details
                    class="group mt-4 rounded-2xl border border-ink/[0.08] bg-cream/40 open:bg-cream/60"
                  >
                    <summary
                      class="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-xs font-bold text-ink/70 [&::-webkit-details-marker]:hidden"
                    >
                      <span class="flex items-center gap-2">
                        <svg
                          class="h-4 w-4 text-gold"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path
                            d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        نوع پوستم را نمی‌دانم — راهنمای تست دستمال
                      </span>
                      <svg
                        class="h-4 w-4 shrink-0 text-ink/40 transition-transform duration-300 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </summary>
                    <div
                      class="border-t border-ink/[0.07] px-4 pb-4 pt-3 text-[11px] leading-6 text-ink/60"
                    >
                      صورت را با شوینده ملایم بشویید و بدون هیچ محصولی ۲ ساعت
                      صبر کنید. سپس دستمال کاغذی را روی پیشانی، بینی و گونه‌ها
                      فشار دهید:
                      <ul class="mt-2 space-y-1.5">
                        <li class="flex gap-2">
                          <span class="text-gold">•</span> چربی روی همه نواحی →
                          <b class="text-ink/75">چرب</b>
                        </li>
                        <li class="flex gap-2">
                          <span class="text-gold">•</span> چربی فقط روی پیشانی و
                          بینی → <b class="text-ink/75">مختلط</b>
                        </li>
                        <li class="flex gap-2">
                          <span class="text-gold">•</span> بدون چربی و احساس
                          کشیدگی → <b class="text-ink/75">خشک</b>
                        </li>
                        <li class="flex gap-2">
                          <span class="text-gold">•</span> بدون چربی و بدون
                          کشیدگی → <b class="text-ink/75">نرمال</b>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>

                <!-- ─────────── مرحله ۲: دغدغه‌ها ─────────── -->
                <div v-else-if="phase === 'quiz' && currentStep === 2" key="s2">
                  <QHeading
                    num="۲"
                    title="مهم‌ترین دغدغه‌های پوستی شما کدام‌اند؟"
                    hint="تا ۳ مورد انتخاب کنید. ترتیب انتخاب = اولویت درمانی شما."
                  />

                  <div
                    class="mt-4 flex items-center justify-between rounded-xl bg-ink/[0.03] px-3.5 py-2"
                  >
                    <span class="text-[11px] font-bold text-ink/55"
                      >انتخاب‌شده: {{ toFa(answers.concerns.length) }} از
                      ۳</span
                    >
                    <div class="flex gap-1">
                      <span
                        v-for="i in 3"
                        :key="i"
                        class="h-1.5 w-6 rounded-full transition-colors duration-300"
                        :class="
                          i <= answers.concerns.length ? 'bg-gold' : 'bg-ink/10'
                        "
                      />
                    </div>
                  </div>

                  <div class="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <button
                      v-for="item in skinConcerns"
                      :key="item.id"
                      type="button"
                      :aria-pressed="isConcernSelected(item.id)"
                      :disabled="
                        !isConcernSelected(item.id) &&
                        answers.concerns.length >= 3
                      "
                      class="group relative flex items-start gap-3.5 rounded-2xl border p-4 text-start transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:cursor-not-allowed disabled:opacity-40"
                      :class="
                        isConcernSelected(item.id)
                          ? 'border-gold bg-gold/[0.07] shadow-[0_6px_20px_-12px_rgba(162,132,102,0.7)]'
                          : 'border-ink/10 bg-cream/30 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white hover:shadow-sm'
                      "
                      @click="toggleConcern(item)"
                    >
                      <span class="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <QuizIcon :name="item.icon" class="h-6 w-6" />
                        <span v-if="concernRank(item.id)" class="absolute -top-1.5 -start-1.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-white shadow">
                          {{ toFa(concernRank(item.id)) }}
                        </span>
                      </span>

                      <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-2">
                          <p class="text-sm font-bold text-ink">
                            {{ item.title }}
                          </p>
                          <span
                            class="shrink-0 rounded-md bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[9px] font-bold text-ink/55"
                          >
                            {{ item.activeBadge }}
                          </span>
                        </div>
                        <p class="mt-1 text-[11px] leading-5 text-ink/55">
                          {{ item.desc }}
                        </p>
                      </div>
                    </button>
                  </div>

                  <StepNav
                    :can-next="answers.concerns.length > 0"
                    next-label="ادامه"
                    @prev="currentStep = 1"
                    @next="goNext(3)"
                  />
                </div>

                <!-- ─────────── مرحله ۳: حساسیت ─────────── -->
                <div v-else-if="phase === 'quiz' && currentStep === 3" key="s3">
                  <QHeading
                    num="۳"
                    title="واکنش پوست شما به محصولات جدید چگونه است؟"
                    hint="این پاسخ، غلظت و سرعت شروع اکتیوها را تعیین می‌کند."
                  />

                  <div class="mt-6 space-y-2.5">
                    <button
                      v-for="item in sensitivityLevels"
                      :key="item.id"
                      type="button"
                      :aria-pressed="answers.sensitivity?.id === item.id"
                      class="flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                      :class="
                        answers.sensitivity?.id === item.id
                          ? 'border-gold bg-gold/[0.07] shadow-[0_6px_20px_-12px_rgba(162,132,102,0.7)]'
                          : 'border-ink/10 bg-cream/30 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white hover:shadow-sm'
                      "
                      @click="selectSensitivity(item)"
                    >
                      <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <QuizIcon :name="item.icon" class="h-6 w-6" />
                      </span>

                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-bold text-ink">
                          {{ item.title }}
                        </p>
                        <p class="mt-0.5 text-[11px] leading-5 text-ink/55">
                          {{ item.desc }}
                        </p>
                      </div>

                      <RadioDot :active="answers.sensitivity?.id === item.id" />
                    </button>
                  </div>

                  <StepNav
                    :can-next="!!answers.sensitivity"
                    next-label="ادامه"
                    @prev="currentStep = 2"
                    @next="goNext(4)"
                  />
                </div>

                <!-- ─────────── مرحله ۴: سن ─────────── -->
                <div v-else-if="phase === 'quiz' && currentStep === 4" key="s4">
                  <QHeading
                    num="۴"
                    title="بازه سنی شما در چه محدوده‌ای است؟"
                    hint="سرعت بازسازی سلولی و نیاز به کلاژن‌سازی با سن تغییر می‌کند."
                  />

                  <div class="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    <button
                      v-for="item in ageRanges"
                      :key="item.id"
                      type="button"
                      :aria-pressed="answers.age?.id === item.id"
                      class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                      :class="
                        answers.age?.id === item.id
                          ? 'border-gold bg-gold/[0.07] shadow-[0_6px_20px_-12px_rgba(162,132,102,0.7)]'
                          : 'border-ink/10 bg-cream/30 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white hover:shadow-sm'
                      "
                      @click="selectAge(item)"
                    >
                      <span class="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <QuizIcon :name="item.icon" class="h-5 w-5" />
                      </span>
                      <span class="text-[13px] font-bold text-ink">{{
                        item.title
                      }}</span>
                      <span
                        class="text-center text-[10px] leading-4 text-ink/50"
                        >{{ item.desc }}</span
                      >
                    </button>
                  </div>

                  <StepNav
                    :can-next="!!answers.age"
                    next-label="ادامه"
                    @prev="currentStep = 3"
                    @next="goNext(5)"
                  />
                </div>

                <!-- ─────────── مرحله ۵: سطح تجربه ─────────── -->
                <div v-else-if="phase === 'quiz' && currentStep === 5" key="s5">
                  <QHeading
                    num="۵"
                    title="سابقه شما در استفاده از ترکیبات فعال (Actives) چیست؟"
                    hint="شروع ناگهانی با غلظت بالا، شایع‌ترین دلیل تخریب سد دفاعی است."
                  />

                  <div class="mt-6 space-y-2.5">
                    <button
                      v-for="item in experienceLevels"
                      :key="item.id"
                      type="button"
                      :aria-pressed="answers.experience?.id === item.id"
                      class="group flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                      :class="
                        answers.experience?.id === item.id
                          ? 'border-gold bg-gold/[0.07] shadow-[0_6px_20px_-12px_rgba(162,132,102,0.7)]'
                          : 'border-ink/10 bg-cream/30 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white hover:shadow-sm'
                      "
                      @click="selectExperience(item)"
                    >
                      <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <QuizIcon :name="item.icon" class="h-6 w-6" />
                      </span>

                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-bold text-ink">
                          {{ item.title }}
                        </p>
                        <p class="mt-0.5 text-[11px] leading-5 text-ink/55">
                          {{ item.desc }}
                        </p>
                      </div>

                      <span
                        class="hidden shrink-0 items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-bold text-cream transition-colors group-hover:bg-gold sm:inline-flex"
                      >
                        تحلیل نهایی
                        <svg
                          class="h-3.5 w-3.5 rotate-180"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div class="mt-6">
                    <button
                      type="button"
                      class="inline-flex items-center gap-1.5 text-xs font-bold text-ink/45 transition-colors hover:text-ink"
                      @click="currentStep = 4"
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      مرحله قبل
                    </button>
                  </div>
                </div>

                <!-- ─────────── وضعیت تحلیل ─────────── -->
                <div
                  v-else-if="phase === 'analyzing'"
                  key="analyzing"
                  class="py-10 text-center"
                  aria-live="polite"
                >
                  <div class="relative mx-auto h-28 w-28">
                    <div
                      class="absolute inset-0 animate-ping rounded-full bg-gold/15"
                    />
                    <div
                      class="absolute inset-2 rounded-full border-2 border-dashed border-gold/30"
                    />
                    <div
                      class="absolute inset-0 rounded-full"
                      :style="{
                        background: `conic-gradient(#A28466 ${analyzeProgress}%, rgba(28,25,23,0.06) 0)`,
                      }"
                    />
                    <div
                      class="absolute inset-[7px] grid place-items-center rounded-full bg-white"
                    >
                      <span class="font-display text-xl font-bold text-ink"
                        >{{ toFa(analyzeProgress) }}٪</span
                      >
                    </div>
                  </div>

                  <p class="mt-6 text-sm font-bold text-ink">
                    {{ analyzeMessage }}
                  </p>
                  <p class="mt-1.5 text-xs text-ink/50">
                    در حال تطبیق پروفایل شما با پایگاه داده ترکیبات فعال…
                  </p>

                  <div
                    class="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-1.5"
                  >
                    <span
                      v-for="(tag, i) in analyzeTags"
                      :key="tag"
                      class="rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold transition-all duration-300"
                      :class="
                        analyzeProgress > (i + 1) * 18
                          ? 'border-sage/30 bg-sage/10 text-sage'
                          : 'border-ink/[0.07] bg-ink/[0.03] text-ink/25'
                      "
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- ─────────── نتیجه ─────────── -->
                <div v-else key="result" class="space-y-4">
                  <!-- کارت پروفایل + کد پوست (همیشه ثابت) -->
                  <div
                    class="relative overflow-hidden rounded-3xl bg-ink p-5 text-cream sm:p-6"
                  >
                    <div
                      class="pointer-events-none absolute -top-16 -end-10 h-48 w-48 rounded-full bg-gold/20 blur-[70px]"
                    />
                    <div
                      class="pointer-events-none absolute -bottom-16 -start-10 h-40 w-40 rounded-full bg-sage/15 blur-[60px]"
                    />

                    <div
                      class="relative flex flex-wrap items-start justify-between gap-4"
                    >
                      <div class="min-w-0">
                        <p class="text-[11px] font-bold text-gold">
                          پروفایل درماتولوژیک شما
                        </p>
                        <h4
                          class="mt-1.5 font-display text-lg leading-8 sm:text-xl"
                        >
                          {{ result.profileTitle }}
                        </h4>
                        <div class="mt-3 flex flex-wrap gap-1.5">
                          <span
                            v-for="chip in result.chips"
                            :key="chip"
                            class="rounded-lg border border-cream/15 bg-cream/[0.07] px-2.5 py-1 text-[10px] font-bold text-cream/75"
                          >
                            {{ chip }}
                          </span>
                        </div>
                      </div>

                      <!-- کد پوست + امتیاز کنار هم -->
                      <div class="flex shrink-0 items-center gap-3">
                        <div class="text-center">
                          <div
                            class="rounded-2xl border border-gold/30 bg-gold/10 px-3.5 py-2.5"
                          >
                            <p
                              class="font-mono text-xl font-extrabold tracking-[0.18em] text-gold sm:text-2xl"
                            >
                              {{ result.skinCode }}
                            </p>
                          </div>
                          <p class="mt-1.5 text-[10px] text-cream/45">
                            کد پوستی
                          </p>
                        </div>

                        <div class="text-center">
                          <div class="relative mx-auto h-[52px] w-[52px]">
                            <div
                              class="h-full w-full rounded-full"
                              :style="{
                                background: `conic-gradient(#9CBFA0 ${result.overallScore}%, rgba(242,235,227,0.1) 0)`,
                              }"
                            />
                            <div
                              class="absolute inset-[5px] grid place-items-center rounded-full bg-ink"
                            >
                              <span class="text-[13px] font-bold text-sage">{{
                                toFa(result.overallScore)
                              }}</span>
                            </div>
                          </div>
                          <p class="mt-1.5 text-[10px] text-cream/45">
                            {{ result.overallLabel }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- ═══ نوار تب‌ها ═══ -->
                  <div
                    class="flex gap-1.5 overflow-x-auto rounded-2xl border border-ink/[0.08] bg-cream/40 p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    <button
                      v-for="tab in resultTabs"
                      :key="tab.id"
                      type="button"
                      class="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[12px] font-bold transition-all duration-200"
                      :class="
                        resultTab === tab.id
                          ? 'bg-ink text-cream shadow-sm'
                          : 'text-ink/55 hover:bg-ink/[0.04] hover:text-ink'
                      "
                      @click="resultTab = tab.id"
                    >
                      <svg
                        class="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          :d="tab.icon"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {{ tab.label }}
                      <span
                        v-if="tab.id === 'cautions'"
                        class="grid h-4 min-w-4 place-items-center rounded-full bg-blush px-1 text-[9px] font-bold text-white"
                      >
                        {{ toFa(result.warnings.length) }}
                      </span>
                    </button>
                  </div>

                  <!-- ═══ محتوای تب‌ها ═══ -->
                  <Transition
                    mode="out-in"
                    enter-active-class="transition duration-250 ease-out"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                  >
                    <!-- ── تب ۱: تحلیل ── -->
                    <div
                      v-if="resultTab === 'analysis'"
                      key="t-analysis"
                      class="space-y-4"
                    >
                      <div
                        class="rounded-3xl border border-ink/[0.08] bg-cream/40 p-5"
                      >
                        <div class="mb-2 flex items-center gap-2">
                          <span class="h-1.5 w-1.5 rounded-full bg-gold" />
                          <h5 class="text-[13px] font-bold text-ink">
                            تحلیل پارامترهای پوست
                          </h5>
                        </div>
                        <p class="mb-4 text-[11px] leading-6 text-ink/55">
                          {{ result.overallNote }}
                        </p>

                        <div class="space-y-3.5">
                          <div
                            v-for="metric in result.metrics"
                            :key="metric.label"
                          >
                            <div
                              class="mb-1.5 flex items-center justify-between text-[11px]"
                            >
                              <span class="font-bold text-ink/70">{{
                                metric.label
                              }}</span>
                              <span
                                class="font-mono font-bold"
                                :class="metric.textClass"
                                >{{ toFa(metric.value) }}٪</span
                              >
                            </div>
                            <div
                              class="h-2 w-full overflow-hidden rounded-full bg-ink/[0.06]"
                            >
                              <div
                                class="h-full rounded-full transition-all duration-1000 ease-out"
                                :class="metric.barClass"
                                :style="{ width: `${metric.value}%` }"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- نکته متخصص -->
                      <div
                        class="flex items-start gap-3 rounded-3xl border border-gold/25 bg-gold/[0.06] p-5"
                      >
                        <span
                          class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-base"
                          >💡</span
                        >
                        <div>
                          <p class="text-[13px] font-bold text-ink">
                            توصیه کلیدی درماتولوژیست ماهلین
                          </p>
                          <p class="mt-1.5 text-[11px] leading-6 text-ink/70">
                            {{ result.doctorTip }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- ── تب ۲: روتین ── -->
                    <div
                      v-else-if="resultTab === 'routine'"
                      key="t-routine"
                      class="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      <RoutineCard
                        title="روتین صبح"
                        badge="AM"
                        icon="☀️"
                        tone="gold"
                        :steps="result.amRoutine"
                      />
                      <RoutineCard
                        title="روتین شب"
                        badge="PM"
                        icon="🌙"
                        tone="lilac"
                        :steps="result.pmRoutine"
                      />
                    </div>

                    <!-- ── تب ۳: برنامه هفتگی ── -->
                    <div v-else-if="resultTab === 'schedule'" key="t-schedule">
                      <div
                        class="rounded-3xl border border-ink/[0.08] bg-white p-5"
                      >
                        <div
                          class="mb-4 flex flex-wrap items-center justify-between gap-2"
                        >
                          <div class="flex items-center gap-2">
                            <span class="h-1.5 w-1.5 rounded-full bg-sage" />
                            <h5 class="text-[13px] font-bold text-ink">
                              برنامه هفتگی اکتیوهای شب
                            </h5>
                          </div>
                          <span
                            class="rounded-lg bg-sage/10 px-2.5 py-1 text-[10px] font-bold text-sage"
                          >
                            {{ result.scheduleNote }}
                          </span>
                        </div>

                        <div class="grid grid-cols-7 gap-1.5">
                          <div
                            v-for="day in result.weeklyPlan"
                            :key="day.name"
                            class="rounded-xl border p-2 text-center transition-colors"
                            :class="
                              day.rest
                                ? 'border-ink/[0.07] bg-ink/[0.02]'
                                : 'border-gold/25 bg-gold/[0.06]'
                            "
                          >
                            <p class="text-[10px] font-bold text-ink/60">
                              {{ day.name }}
                            </p>
                            <p class="mt-1.5 text-base leading-none">
                              {{ day.icon }}
                            </p>
                            <p
                              class="mt-1.5 text-[9px] leading-3"
                              :class="
                                day.rest ? 'text-ink/35' : 'font-bold text-gold'
                              "
                            >
                              {{ day.label }}
                            </p>
                          </div>
                        </div>

                        <div
                          class="mt-4 flex items-center justify-center gap-4 border-t border-ink/[0.06] pt-3 text-[10px] text-ink/55"
                        >
                          <span class="flex items-center gap-1.5"
                            ><span>🧪</span> شب اکتیو</span
                          >
                          <span class="flex items-center gap-1.5"
                            ><span>🛡️</span> شب ترمیم و استراحت</span
                          >
                        </div>
                      </div>
                    </div>

                    <!-- ── تب ۴: هشدارها + علمی ── -->
                    <div v-else key="t-cautions" class="space-y-4">
                      <!-- هشدار تداخل -->
                      <div
                        class="rounded-3xl border border-blush/25 bg-blush/[0.06] p-5"
                      >
                        <div class="mb-3 flex items-center gap-2.5">
                          <span
                            class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blush/15 text-blush"
                          >
                            <svg
                              class="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                d="M12 9v4M12 17h.01"
                                stroke-linecap="round"
                              />
                              <path
                                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          <h5 class="text-[13px] font-bold text-ink">
                            هشدار تداخل و ترکیبات نامناسب شما
                          </h5>
                        </div>

                        <ul class="space-y-2">
                          <li
                            v-for="warn in result.warnings"
                            :key="warn"
                            class="flex items-start gap-2.5 text-[11px] leading-6 text-ink/65"
                          >
                            <span
                              class="mt-2 h-1 w-1 shrink-0 rounded-full bg-blush"
                            />
                            <span v-html="warn" />
                          </li>
                        </ul>
                      </div>

                      <!-- جزئیات علمی -->
                      <details
                        class="group rounded-3xl border border-ink/[0.08] bg-cream/40"
                        open
                      >
                        <summary
                          class="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-[13px] font-bold text-ink [&::-webkit-details-marker]:hidden"
                        >
                          <span class="flex items-center gap-2">
                            <svg
                              class="h-4 w-4 text-lilac"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 11-4 0M5.58 16.5h12.85"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            چرا این ترکیبات برای شما انتخاب شدند؟
                          </span>
                          <svg
                            class="h-4 w-4 shrink-0 text-ink/40 transition-transform duration-300 group-open:rotate-180"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </summary>

                        <div
                          class="space-y-3 border-t border-ink/[0.07] p-5 pt-4"
                        >
                          <div
                            v-for="sci in result.science"
                            :key="sci.name"
                            class="rounded-2xl border border-ink/[0.07] bg-white p-3.5"
                          >
                            <div
                              class="flex items-center justify-between gap-2"
                            >
                              <p class="text-xs font-bold text-ink">
                                {{ sci.name }}
                              </p>
                              <span
                                class="rounded bg-sage/12 px-2 py-0.5 font-mono text-[9px] font-bold text-sage"
                                >{{ sci.evidence }}</span
                              >
                            </div>
                            <p class="mt-1.5 text-[11px] leading-6 text-ink/60">
                              {{ sci.reason }}
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </Transition>

                  <!-- CTA (همیشه ثابت پایین) -->
                  <div
                    class="rounded-3xl border border-ink/[0.08] bg-white p-5"
                  >
                    <div
                      class="mb-4 flex flex-wrap items-center justify-between gap-2"
                    >
                      <p class="text-[13px] font-bold text-ink">
                        {{ toFa(result.productCount) }} محصول منطبق با پروفایل
                        شما پیدا شد
                      </p>
                      <span
                        class="rounded-full bg-sage/12 px-2.5 py-1 text-[10px] font-bold text-sage"
                      >
                        تطابق {{ toFa(result.matchPercent) }}٪
                      </span>
                    </div>

                    <div class="flex flex-col gap-2.5 sm:flex-row">
                      <NuxtLink
                        :to="result.shopUrl"
                        class="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 text-sm font-bold text-cream shadow-[0_10px_28px_-14px_rgba(28,25,23,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold active:translate-y-0 active:scale-95"
                      >
                        مشاهده روتین و محصولات
                        <svg
                          class="h-4 w-4 rotate-180"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </NuxtLink>

                      <button
                        type="button"
                        class="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/12 px-4 py-4 text-xs font-bold text-ink/65 transition-all duration-200 hover:border-gold/40 hover:bg-gold/[0.06] hover:text-gold active:scale-95"
                        @click="shareResult"
                      >
                        <svg
                          v-if="!copied"
                          class="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <path
                            d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"
                            stroke-linecap="round"
                          />
                        </svg>
                        <svg
                          v-else
                          class="h-4 w-4 text-sage"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        {{ copied ? "کپی شد" : "اشتراک" }}
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-2xl border border-ink/12 px-4 py-4 text-xs font-bold text-ink/65 transition-all duration-200 hover:border-ink/25 hover:text-ink active:scale-95"
                        @click="resetQuiz"
                      >
                        تست مجدد
                      </button>
                    </div>

                    <p
                      class="mt-3.5 flex items-center justify-center gap-1.5 text-[10px] text-ink/40"
                    >
                      <svg
                        class="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      نتیجه شما فقط روی همین دستگاه ذخیره شد و به سرور ارسال
                      نمی‌شود.
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- بنر نتیجه ذخیره‌شده -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="hasSavedResult && phase === 'quiz' && currentStep === 1"
              class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sage/25 bg-sage/[0.07] px-4 py-3"
            >
              <p class="flex items-center gap-2 text-xs text-ink/70">
                <svg
                  class="h-4 w-4 shrink-0 text-sage"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" stroke-linecap="round" />
                </svg>
                یک تحلیل قبلی از شما ذخیره شده است.
              </p>
              <button
                type="button"
                class="rounded-xl bg-sage px-3.5 py-2 text-[11px] font-bold text-white transition-all hover:bg-sage/85 active:scale-95"
                @click="restoreSaved"
              >
                نمایش نتیجه قبلی
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, h } from "vue";

/* ════════════════════════════════════════
   کامپوننت‌های کمکی درون‌فایلی
   ════════════════════════════════════════ */

const QHeading = (props) =>
  h("div", {}, [
    h("div", { class: "flex items-start gap-3" }, [
      h(
        "span",
        {
          class:
            "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gold/12 text-[11px] font-bold text-gold",
        },
        props.num,
      ),
      h("div", {}, [
        h(
          "h3",
          { class: "text-[15px] font-bold leading-7 text-ink sm:text-base" },
          props.title,
        ),
        h("p", { class: "mt-1 text-[11px] leading-5 text-ink/50" }, props.hint),
      ]),
    ]),
  ]);
QHeading.props = ["num", "title", "hint"];

const RadioDot = (props) =>
  h(
    "span",
    {
      class: [
        "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-all duration-200",
        props.active ? "border-gold bg-gold" : "border-ink/20 bg-white",
      ],
    },
    props.active
      ? [
          h(
            "svg",
            {
              class: "h-2.5 w-2.5 text-white",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "4",
            },
            [
              h("path", {
                d: "M5 13l4 4L19 7",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
              }),
            ],
          ),
        ]
      : [],
  );
RadioDot.props = ["active"];

const QuizIcon = (props) => {
  const iconDef = iconPaths[props.name]
  if (!iconDef) return null
  const paths = iconDef.paths || []
  return h(
    'svg',
    {
      class: props.class || 'h-6 w-6',
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': 'true'
    },
    paths.map((p, i) =>
      h('path', {
        key: i,
        d: p.d,
        fill: p.fill || 'none',
        stroke: p.stroke || 'none',
        'stroke-width': p.strokeWidth || '1.5',
        'stroke-linecap': p.linecap || 'round',
        'stroke-linejoin': p.linejoin || 'round',
      })
    )
  )
}
QuizIcon.props = ['name', 'class']

const iconPaths = {
  // ─── نوع پوست ───
  oily: {
    paths: [
      { d: "M12 2.69l5.66 7.14C19.77 12.36 21 14.79 21 17.5 21 20.54 16.97 23 12 23s-9-2.46-9-5.5c0-2.71 1.23-5.14 3.34-7.67L12 2.69z", fill: "#bae6fd", stroke: "#38bdf8", strokeWidth: "1.5" },
      { d: "M14 15c.5-1 1-2 1.5-3", stroke: "#0284c7", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  combination: {
    paths: [
      { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z", fill: "#ede9fe", stroke: "#8b5cf6", strokeWidth: "1.5" },
      { d: "M12 2v20", stroke: "#8b5cf6", strokeWidth: "1.5" },
      { d: "M2 12h10", stroke: "#8b5cf6", strokeWidth: "1.5" }
    ]
  },
  dry: {
    paths: [
      { d: "M12 2.69l5.66 7.14C19.77 12.36 21 14.79 21 17.5 21 20.54 16.97 23 12 23s-9-2.46-9-5.5c0-2.71 1.23-5.14 3.34-7.67L12 2.69z", fill: "#ffedd5", stroke: "#f97316", strokeWidth: "1.5" },
      { d: "M10 16l4-4M14 16l-4-4", stroke: "#c2410c", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  normal: {
    paths: [
      { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z", fill: "#dcfce7", stroke: "#22c55e", strokeWidth: "1.5" },
      { d: "M8 12l2.5 2.5L16 9", stroke: "#16a34a", strokeWidth: "2", linecap: "round", linejoin: "round" }
    ]
  },

  // ─── دغدغه‌ها ───
  acne: {
    paths: [
      { d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", fill: "#fee2e2", stroke: "#ef4444", strokeWidth: "1.5" },
      { d: "M12 8v4M12 16h.01", stroke: "#dc2626", strokeWidth: "2", linecap: "round" }
    ]
  },
  spots: {
    paths: [
      { d: "M12 7a5 5 0 100 10 5 5 0 000-10z", fill: "#fef9c3", stroke: "#eab308", strokeWidth: "1.5" },
      { d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41", stroke: "#ca8a04", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  aging: {
    paths: [
      { d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", fill: "#f3e8ff", stroke: "#a855f7", strokeWidth: "1.5" },
      { d: "M12 6v6l3 3", stroke: "#9333ea", strokeWidth: "2", linecap: "round", linejoin: "round" }
    ]
  },
  dehydration: {
    paths: [
      { d: "M12 2.69l5.66 7.14C19.77 12.36 21 14.79 21 17.5 21 20.54 16.97 23 12 23s-9-2.46-9-5.5c0-2.71 1.23-5.14 3.34-7.67L12 2.69z", fill: "#e0f2fe", stroke: "#0ea5e9", strokeWidth: "1.5" },
      { d: "M9 14h6", stroke: "#0284c7", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  redness: {
    paths: [
      { d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", fill: "#ffe4e6", stroke: "#f43f5e", strokeWidth: "1.5" },
      { d: "M12 18a6 6 0 01-6-6c0-3 2-7 6-12 4 5 6 9 6 12a6 6 0 01-6 6z", fill: "#fecdd3", stroke: "#e11d48", strokeWidth: "1" }
    ]
  },
  texture: {
    paths: [
      { d: "M3 3h18v18H3z", fill: "#f1f5f9", stroke: "#94a3b8", strokeWidth: "1.5" },
      { d: "M3 9h18M3 15h18M9 3v18M15 3v18", stroke: "#64748b", strokeWidth: "1", linecap: "round" }
    ]
  },

  // ─── حساسیت ───
  very: {
    paths: [
      { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", fill: "#fce7f3", stroke: "#ec4899", strokeWidth: "1.5" },
      { d: "M12 9v4M12 17h.01", stroke: "#be185d", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  some: {
    paths: [
      { d: "M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z", fill: "#fef3c7", stroke: "#f59e0b", strokeWidth: "1.5" },
      { d: "M12 8v4M12 16h.01", stroke: "#b45309", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  resilient: {
    paths: [
      { d: "M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z", fill: "#d1fae5", stroke: "#10b981", strokeWidth: "1.5" },
      { d: "M9 12l2 2 4-4", stroke: "#047857", strokeWidth: "2", linecap: "round", linejoin: "round" }
    ]
  },

  // ─── سن ───
  u25: {
    paths: [
      { d: "M12 22a10 10 0 010-20 10 10 0 010 20z", fill: "#dcfce7", stroke: "#22c55e", strokeWidth: "1.5" },
      { d: "M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z", fill: "#bbf7d0", stroke: "#16a34a", strokeWidth: "1" },
      { d: "M12 12a4 4 0 100-8 4 4 0 000 8z", fill: "#86efac", stroke: "#15803d", strokeWidth: "1" }
    ]
  },
  "25_34": {
    paths: [
      { d: "M12 22a10 10 0 010-20 10 10 0 010 20z", fill: "#ccfbf1", stroke: "#14b8a6", strokeWidth: "1.5" },
      { d: "M9 12h6M12 9v6", stroke: "#0d9488", strokeWidth: "2", linecap: "round" }
    ]
  },
  "35_44": {
    paths: [
      { d: "M12 22a10 10 0 010-20 10 10 0 010 20z", fill: "#fef3c7", stroke: "#f59e0b", strokeWidth: "1.5" },
      { d: "M16 8l-4 4-4-4M8 14h8", stroke: "#d97706", strokeWidth: "2", linecap: "round", linejoin: "round" }
    ]
  },
  o45: {
    paths: [
      { d: "M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 14.2l-4.8 2.6.9-5.3-3.9-3.8 5.4-.8L12 2z", fill: "#fef08a", stroke: "#eab308", strokeWidth: "1.5" }
    ]
  },

  // ─── تجربه ───
  beginner: {
    paths: [
      { d: "M4 19.5A2.5 2.5 0 016.5 17H20", fill: "#e0e7ff", stroke: "#6366f1", strokeWidth: "1.5" },
      { d: "M4 4.5A2.5 2.5 0 016.5 2H20v15H6.5A2.5 2.5 0 004 19.5", fill: "#e0e7ff", stroke: "#6366f1", strokeWidth: "1.5" },
      { d: "M12 6v5M9 8.5h6", stroke: "#4f46e5", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  intermediate: {
    paths: [
      { d: "M4 19.5A2.5 2.5 0 016.5 17H20", fill: "#c7d2fe", stroke: "#4f46e5", strokeWidth: "1.5" },
      { d: "M4 4.5A2.5 2.5 0 016.5 2H20v15H6.5A2.5 2.5 0 004 19.5", fill: "#c7d2fe", stroke: "#4f46e5", strokeWidth: "1.5" },
      { d: "M9 7h6M9 11h4", stroke: "#4338ca", strokeWidth: "1.5", linecap: "round" }
    ]
  },
  advanced: {
    paths: [
      { d: "M12 14l9-5-9-5-9 5 9 5z", fill: "#a5b4fc", stroke: "#4338ca", strokeWidth: "1.5" },
      { d: "M6 11v6c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-6", stroke: "#4338ca", strokeWidth: "1.5" },
      { d: "M21 11v5", stroke: "#4338ca", strokeWidth: "1.5", linecap: "round" }
    ]
  }
}

const StepNav = (props, { emit }) =>
  h("div", { class: "mt-6 flex items-center justify-between gap-3" }, [
    h(
      "button",
      {
        type: "button",
        class:
          "inline-flex items-center gap-1.5 text-xs font-bold text-ink/45 transition-colors hover:text-ink",
        onClick: () => emit("prev"),
      },
      [
        h(
          "svg",
          {
            class: "h-4 w-4",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
          },
          [
            h("path", {
              d: "M9 18l6-6-6-6",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            }),
          ],
        ),
        "مرحله قبل",
      ],
    ),
    h(
      "button",
      {
        type: "button",
        disabled: !props.canNext,
        class: [
          "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all duration-200 active:scale-95",
          props.canNext
            ? "bg-ink text-cream hover:bg-gold"
            : "cursor-not-allowed bg-ink/[0.06] text-ink/30",
        ],
        onClick: () => props.canNext && emit("next"),
      },
      [
        props.nextLabel,
        h(
          "svg",
          {
            class: "h-3.5 w-3.5 rotate-180",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5",
          },
          [
            h("path", {
              d: "M5 12h14M12 5l7 7-7 7",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            }),
          ],
        ),
      ],
    ),
  ]);
StepNav.props = ["canNext", "nextLabel"];
StepNav.emits = ["prev", "next"];

const toneMap = {
  gold: {
    text: "text-gold",
    bg: "bg-gold/12",
    border: "border-gold/25",
    num: "bg-gold/15 text-gold",
  },
  lilac: {
    text: "text-lilac",
    bg: "bg-lilac/15",
    border: "border-lilac/25",
    num: "bg-lilac/20 text-ink/70",
  },
};

const RoutineCard = (props) => {
  const t = toneMap[props.tone] || toneMap.gold;
  return h(
    "div",
    { class: "rounded-3xl border border-ink/[0.08] bg-white p-5" },
    [
      h("div", { class: "mb-4 flex items-center justify-between" }, [
        h(
          "span",
          {
            class: `inline-flex items-center gap-2 text-[13px] font-bold ${t.text}`,
          },
          [h("span", { class: "text-base" }, props.icon), props.title],
        ),
        h(
          "span",
          {
            class: `rounded-md ${t.bg} px-2 py-0.5 font-mono text-[9px] font-bold ${t.text}`,
          },
          props.badge,
        ),
      ]),
      h(
        "ol",
        { class: "space-y-2.5" },
        props.steps.map((step, i) =>
          h("li", { key: i, class: "flex items-start gap-3" }, [
            h(
              "span",
              {
                class: `mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${t.num} text-[9px] font-bold`,
              },
              String(i + 1).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]),
            ),
            h("div", { class: "min-w-0 flex-1" }, [
              h(
                "p",
                { class: "text-[12px] font-bold leading-5 text-ink" },
                step.name,
              ),
              h(
                "p",
                { class: "mt-0.5 text-[10px] leading-5 text-ink/50" },
                step.note,
              ),
            ]),
          ]),
        ),
      ),
    ],
  );
};
RoutineCard.props = ["title", "badge", "icon", "tone", "steps"];

/* ════════════════════════════════════════
   وضعیت
   ════════════════════════════════════════ */

const TOTAL_STEPS = 5;
const STORAGE_KEY = "mahlin-skin-quiz-v2";

const phase = ref("quiz"); // quiz | analyzing | result
const currentStep = ref(1);
const maxReachedStep = ref(1);
const analyzeProgress = ref(0);
const analyzeMessage = ref("");
const copied = ref(false);
const hasSavedResult = ref(false);
const resultTab = ref("analysis");

const resultTabs = [
  { id: "analysis", label: "تحلیل پوست", icon: "M3 12h4l3 8 4-16 3 8h4" },
  { id: "routine", label: "روتین صبح و شب", icon: "M12 3v18M3 12h18" },
  {
    id: "schedule",
    label: "برنامه هفتگی",
    icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  },
  {
    id: "cautions",
    label: "نکات و هشدارها",
    icon: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  },
];

let analyzeTimer = null;
let copyTimer = null;

const answers = reactive({
  skinType: null,
  concerns: [],
  sensitivity: null,
  age: null,
  experience: null,
});

const features = [
  "تشخیص کد پوستی ۴ حرفی بر پایه مدل علمی Baumann",
  "روتین گام‌به‌گام صبح و شب با ترتیب صحیح لایه‌گذاری",
  "برنامه هفتگی اکتیوها متناسب با سطح تحمل پوست شما",
  "هشدار تداخل ترکیبات و لیست موادی که باید پرهیز کنید",
];

const analyzeTags = ["BARRIER", "SEBUM", "MELANIN", "COLLAGEN", "pH"];

const analyzeSteps = [
  "در حال بررسی ساختار سد دفاعی پوست…",
  "محاسبه شاخص ترشح سبوم و هیدراتاسیون…",
  "تطبیق با پروتکل‌های درماتولوژیک…",
  "تنظیم غلظت و فرکانس اکتیوها…",
  "تدوین نسخه اختصاصی شما…",
];

/* ── داده‌ها ─────────────────────────── */
const skinTypes = [
  { id: "oily", title: "چرب و براق", desc: "براقی در تمام صورت، منافذ باز و تمایل به جوش.", icon: "oily", tag: "SEBUM HIGH" },
  { id: "combination", title: "مختلط", desc: "پیشانی و بینی چرب، گونه‌ها نرمال یا خشک.", icon: "combination", tag: "T-ZONE" },
  { id: "dry", title: "خشک و کشیده", desc: "کشیدگی پس از شستشو، پوسته‌ریزی و زبری.", icon: "dry", tag: "LIPID LOW" },
  { id: "normal", title: "نرمال و متعادل", desc: "بدون چربی اضافه یا خشکی؛ بافت یکدست.", icon: "normal", tag: "BALANCED" },
]

const skinConcerns = [
  { id: "acne", title: "جوش و آکنه فعال", desc: "جوش سرسیاه، زیرپوستی و التهاب مکرر.", icon: "acne", activeBadge: "BHA" },
  { id: "spots", title: "لک و جای جوش", desc: "ملاسما، تیرگی، لک آفتاب و PIH.", icon: "spots", activeBadge: "VIT-C" },
  { id: "aging", title: "چروک و افتادگی", desc: "خطوط ریز، کاهش استحکام و سفتی.", icon: "aging", activeBadge: "RETINOL" },
  { id: "dehydration", title: "کم‌آبی و کدری", desc: "بی‌روحی، خستگی و خطوط ناشی از خشکی.", icon: "dehydration", activeBadge: "HA" },
  { id: "redness", title: "قرمزی و التهاب", desc: "گرگرفتگی، رگ‌های سطحی و روزاسه خفیف.", icon: "redness", activeBadge: "CICA" },
  { id: "texture", title: "منافذ باز و زبری", desc: "بافت ناهموار، میلیا و منافذ قابل رؤیت.", icon: "texture", activeBadge: "PHA" },
]

const sensitivityLevels = [
  { id: "very", title: "بسیار حساس", desc: "با اغلب محصولات دچار سوزش، خارش یا قرمزی می‌شوم.", icon: "very", badge: "فرمولاسیون فوق ملایم" },
  { id: "some", title: "نسبتاً حساس", desc: "گاهی با اکتیوهای قوی واکنش نشان می‌دهم.", icon: "some", badge: "شروع تدریجی" },
  { id: "resilient", title: "مقاوم", desc: "به‌ندرت دچار التهاب می‌شوم و تحمل بالایی دارم.", icon: "resilient", badge: "غلظت کلینیکال" },
]

const ageRanges = [
  { id: "u25", title: "زیر ۲۵", desc: "پیشگیری و کنترل چربی", icon: "u25" },
  { id: "25_34", title: "۲۵ تا ۳۴", desc: "شروع آنتی‌ایجینگ", icon: "25_34" },
  { id: "35_44", title: "۳۵ تا ۴۴", desc: "کلاژن‌سازی فعال", icon: "35_44" },
  { id: "o45", title: "۴۵ به بالا", desc: "ترمیم و تراکم‌بخشی", icon: "o45" },
]

const experienceLevels = [
  { id: "beginner", title: "مبتدی", desc: "تازه شروع کرده‌ام یا فقط شوینده و کرم استفاده می‌کنم.", icon: "beginner" },
  { id: "intermediate", title: "متوسط", desc: "با سرم و ضدآفتاب آشنا هستم و روتین ثابت دارم.", icon: "intermediate" },
  { id: "advanced", title: "حرفه‌ای", desc: "تجربه رتینول، اسیدها و لایه‌برداری شیمیایی دارم.", icon: "advanced" },
]

/* ── ابزار ─────────────────────────── */
const toFa = (v) => String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const clamp = (n) => Math.max(8, Math.min(96, Math.round(n)));

const headerTitle = computed(() => {
  if (phase.value === "analyzing") return "در حال تحلیل داده‌های پوستی";
  if (phase.value === "result") return "گزارش نهایی درماتولوژیک";
  return [
    "تشخیص نوع و ساختار پوست",
    "اولویت‌بندی دغدغه‌های درمانی",
    "ارزیابی سد دفاعی و حساسیت",
    "بازه سنی و نیاز سلولی",
    "سطح تحمل و تجربه اکتیوها",
  ][currentStep.value - 1];
});

const headerSubtitle = computed(() => {
  if (phase.value === "analyzing") return "لطفاً چند لحظه صبر کنید…";
  if (phase.value === "result")
    return `کد پوستی: ${result.value.skinCode} · تطابق ${toFa(result.value.matchPercent)}٪`;
  return `مرحله ${toFa(currentStep.value)} از ${toFa(TOTAL_STEPS)}`;
});

/* ── انتخاب‌ها ─────────────────────── */

function goNext(step) {
  currentStep.value = step;
  maxReachedStep.value = Math.max(maxReachedStep.value, step);
}

function selectSkinType(item) {
  answers.skinType = item;
  goNext(2);
}

function isConcernSelected(id) {
  return answers.concerns.some((c) => c.id === id);
}

function concernRank(id) {
  const i = answers.concerns.findIndex((c) => c.id === id);
  return i === -1 ? 0 : i + 1;
}

function toggleConcern(item) {
  const i = answers.concerns.findIndex((c) => c.id === item.id);
  if (i > -1) answers.concerns.splice(i, 1);
  else if (answers.concerns.length < 3) answers.concerns.push(item);
}

function selectSensitivity(item) {
  answers.sensitivity = item;
  goNext(4);
}

function selectAge(item) {
  answers.age = item;
  goNext(5);
}

function selectExperience(item) {
  answers.experience = item;
  startAnalysis();
}

/* ── تحلیل ─────────────────────────── */

function startAnalysis() {
  phase.value = "analyzing";
  analyzeProgress.value = 0;
  analyzeMessage.value = analyzeSteps[0];

  clearInterval(analyzeTimer);
  analyzeTimer = setInterval(() => {
    analyzeProgress.value += Math.floor(Math.random() * 7) + 4;

    const idx = Math.min(
      analyzeSteps.length - 1,
      Math.floor(analyzeProgress.value / 20),
    );
    analyzeMessage.value = analyzeSteps[idx];

    if (analyzeProgress.value >= 100) {
      analyzeProgress.value = 100;
      clearInterval(analyzeTimer);
      setTimeout(() => {
        phase.value = "result";
        resultTab.value = "analysis";
        saveToStorage();
      }, 400);
    }
  }, 110);
}

function resetQuiz() {
  clearInterval(analyzeTimer);
  answers.skinType = null;
  answers.concerns = [];
  answers.sensitivity = null;
  answers.age = null;
  answers.experience = null;
  currentStep.value = 1;
  maxReachedStep.value = 1;
  analyzeProgress.value = 0;
  phase.value = "quiz";
}

/* ── ذخیره‌سازی ────────────────────── */

function saveToStorage() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        skinType: answers.skinType?.id,
        concerns: answers.concerns.map((c) => c.id),
        sensitivity: answers.sensitivity?.id,
        age: answers.age?.id,
        experience: answers.experience?.id,
        at: Date.now(),
      }),
    );
  } catch {}
}

function restoreSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);

    answers.skinType = skinTypes.find((x) => x.id === d.skinType) || null;
    answers.concerns = (d.concerns || [])
      .map((id) => skinConcerns.find((x) => x.id === id))
      .filter(Boolean);
    answers.sensitivity =
      sensitivityLevels.find((x) => x.id === d.sensitivity) || null;
    answers.age = ageRanges.find((x) => x.id === d.age) || null;
    answers.experience =
      experienceLevels.find((x) => x.id === d.experience) || null;

    if (answers.skinType && answers.concerns.length) {
      maxReachedStep.value = TOTAL_STEPS;
      phase.value = "result";
      resultTab.value = "analysis"; // ← این خط اضافه شود
      hasSavedResult.value = false;
    }
  } catch {}
}

/* ── اشتراک‌گذاری ──────────────────── */

async function shareResult() {
  const r = result.value;
  const text = `پروفایل پوستی من در ماهلین اسکین‌کر:\nکد پوست: ${r.skinCode}\n${r.profileTitle}\nروتین پیشنهادی: ${r.amRoutine[2].name} (صبح) · ${r.pmRoutine[2].name} (شب)`;

  try {
    if (navigator.share) {
      await navigator.share({ title: "پروفایل پوستی من", text });
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch {
    return;
  }

  copied.value = true;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => (copied.value = false), 2200);
}

/* ════════════════════════════════════════
   موتور تشخیص
   ════════════════════════════════════════ */

const result = computed(() => {
  const type = answers.skinType?.id || "normal";
  const ids = answers.concerns.map((c) => c.id);
  const primary = ids[0] || "dehydration";
  const sens = answers.sensitivity?.id || "some";
  const age = answers.age?.id || "25_34";
  const exp = answers.experience?.id || "beginner";

  const isSensitive = sens === "very" || sens === "some";
  const isVerySensitive = sens === "very";
  const isBeginner = exp === "beginner";
  const isMature = age === "35_44" || age === "o45";

  /* ── کد پوستی (مدل Baumann) ── */
  const axisOil = type === "oily" || type === "combination" ? "O" : "D";
  const axisSens = sens === "resilient" ? "R" : "S";
  const axisPig = ids.includes("spots") ? "P" : "N";
  const axisWrk = ids.includes("aging") || isMature ? "W" : "T";
  const skinCode = `${axisOil}${axisSens}${axisPig}${axisWrk}`;

  /* ── امتیازها ── */
  let hydration = 72,
    barrier = 74,
    oil = 72,
    even = 76,
    firm = 78;

  if (type === "oily") {
    oil -= 30;
    hydration -= 6;
  }
  if (type === "dry") {
    hydration -= 28;
    barrier -= 14;
    firm -= 6;
  }
  if (type === "combination") {
    oil -= 16;
    hydration -= 8;
  }
  if (type === "normal") {
    oil += 8;
    hydration += 4;
  }

  const w = (id) => (ids[0] === id ? 1 : ids.includes(id) ? 0.6 : 0);
  hydration -= 26 * w("dehydration");
  oil -= 22 * w("acne");
  barrier -= 14 * w("acne");
  even -= 30 * w("spots");
  firm -= 28 * w("aging");
  barrier -= 26 * w("redness");
  even -= 16 * w("texture");
  oil -= 10 * w("texture");

  if (sens === "very") barrier -= 20;
  if (sens === "some") barrier -= 9;
  if (sens === "resilient") barrier += 6;

  if (age === "35_44") {
    firm -= 10;
    hydration -= 5;
  }
  if (age === "o45") {
    firm -= 20;
    hydration -= 10;
    barrier -= 5;
  }
  if (age === "u25") firm += 8;

  hydration = clamp(hydration);
  barrier = clamp(barrier);
  oil = clamp(oil);
  even = clamp(even);
  firm = clamp(firm);

  const overallScore = Math.round(
    (hydration + barrier + oil + even + firm) / 5,
  );

  const bar = (v) =>
    v >= 70
      ? { barClass: "bg-sage", textClass: "text-sage" }
      : v >= 45
        ? { barClass: "bg-gold", textClass: "text-gold" }
        : { barClass: "bg-blush", textClass: "text-blush" };

  const metrics = [
    { label: "سطح آبرسانی", value: hydration, ...bar(hydration) },
    { label: "سلامت سد دفاعی", value: barrier, ...bar(barrier) },
    { label: "تعادل چربی", value: oil, ...bar(oil) },
    { label: "یکنواختی رنگ", value: even, ...bar(even) },
    { label: "استحکام و کلاژن", value: firm, ...bar(firm) },
  ];

  const overallLabel =
    overallScore >= 70
      ? "مطلوب"
      : overallScore >= 50
        ? "نیازمند مراقبت"
        : "نیازمند بازسازی";
  const overallNote =
    overallScore >= 70
      ? "وضعیت کلی پوست شما متعادل است؛ تمرکز روی حفظ نتیجه و پیشگیری خواهد بود."
      : overallScore >= 50
        ? "چند پارامتر نیاز به اصلاح دارند. با روتین منظم طی ۸ هفته بهبود محسوس خواهید دید."
        : "اولویت اول بازسازی سد دفاعی است؛ پیش از اکتیوهای قوی باید پوست ترمیم شود.";

  /* ── اکتیوها ── */
  const activeMatrix = {
    acne: {
      am: "سرم نیاسینامید ۱۰٪ + زینک PCA",
      amNote: "کنترل سبوم و کاهش التهاب در طول روز.",
      pm: isVerySensitive
        ? "آزلائیک اسید ۱۰٪"
        : isBeginner
          ? "اسید ماندلیک ۵٪"
          : "سالیسیلیک اسید (BHA ۲٪)",
      pmNote: "پاکسازی عمقی منافذ و حل چربی محبوس.",
      tip: "خشک کردن بیش از حد پوست چرب، ترشح سبوم را دو برابر می‌کند. آبرسان Oil-Free را هرگز حذف نکنید.",
    },
    spots: {
      am: "سرم ویتامین C ۱۵٪ + ویتامین E",
      amNote: "مهار تیروزیناز و سپر آنتی‌اکسیدانی.",
      pm: isVerySensitive
        ? "نیاسینامید ۵٪ + آلفا آربوتین"
        : "ترانگزامیک اسید ۳٪",
      pmNote: "محو تدریجی لک و جای جوش در فاز بازسازی شبانه.",
      tip: "بدون ضدآفتاب SPF۵۰ و تمدید هر ۳ ساعت، هیچ سرم ضدلکی نتیجه نمی‌دهد.",
    },
    aging: {
      am: "پپتاید کمپلکس + هیالورونیک اسید",
      amNote: "تحریک سنتز کلاژن و پرکنندگی خطوط سطحی.",
      pm:
        isVerySensitive || isBeginner
          ? "باکوچیول ۱٪ (رتینول گیاهی)"
          : "رتینول کپسوله ۰٫۵٪",
      pmNote: "استاندارد طلایی نوسازی سلولی و کاهش عمق چروک.",
      tip: "رتینول را با روش ساندویچی (مرطوب‌کننده → رتینول → مرطوب‌کننده) شروع کنید تا تحریک کمتر شود.",
    },
    dehydration: {
      am: "هیالورونیک اسید مولتی‌مولکولار + B5",
      amNote: "جذب و تثبیت رطوبت در لایه‌های سطحی و عمقی.",
      pm: "کمپلکس سرامید + اسکوآلان",
      pmNote: "بازسازی چربی‌های بین‌سلولی و قفل رطوبت.",
      tip: "هیالورونیک اسید را روی پوست نم‌دار بزنید و بلافاصله مرطوب‌کننده بگذارید، وگرنه رطوبت تبخیر می‌شود.",
    },
    redness: {
      am: "سیکا (مادکاسوساید) + پانتنول",
      amNote: "تسکین التهاب و تقویت مقاومت مویرگی.",
      pm: "سرامید NP + کلوئیدال اوتمیل",
      pmNote: "ترمیم سد دفاعی و کاهش حساسیت تجمعی.",
      tip: "تا زمان تسکین کامل قرمزی، از هرگونه اسکراب، اسید و آب داغ روی صورت پرهیز کنید.",
    },
    texture: {
      am: "نیاسینامید ۵٪ + PHA ملایم",
      amNote: "ریزکردن ظاهر منافذ و صاف‌سازی بافت.",
      pm: isVerySensitive ? "لاکتوبیونیک اسید (PHA)" : "لاکتیک اسید ۵٪",
      pmNote: "لایه‌برداری کنترل‌شده و افزایش شفافیت.",
      tip: "منافذ باز قابل بستن دائمی نیستند، اما با لایه‌برداری منظم و رتینوئید، ظاهرشان تا ۴۰٪ کاهش می‌یابد.",
    },
  };

  const A = activeMatrix[primary];

  /* ── شوینده و مرطوب‌کننده ── */
  const cleanser = {
    oily: "ژل شوینده کنترل چربی با pH ۵٫۵",
    combination: "ژل-کرم شوینده متعادل‌کننده",
    dry: "کرم شوینده کرمی فاقد سولفات",
    normal: "شوینده ملایم روزانه",
  }[type];

  const moisturizer = {
    oily: "ژل آبرسان Oil-Free و نان‌کومدوژنیک",
    combination: "ژل-کرم سبک آبرسان",
    dry: "کرم مغذی غنی از سرامید و شی‌باتر",
    normal: "لوسیون آبرسان روزانه",
  }[type];

  /* ── روتین ── */
  const amRoutine = [
    {
      name: `شستشو — ${cleanser}`,
      note: "صبح‌ها با آب ولرم؛ اگر پوست خشک دارید فقط آب‌شویی کافی است.",
    },
    {
      name: "تونر / اسنس آبرسان بدون الکل",
      note: "روی پوست نم‌دار برای افزایش نفوذ مرحله بعد.",
    },
    { name: A.am, note: A.amNote },
    { name: moisturizer, note: "قفل‌کردن رطوبت و آماده‌سازی برای ضدآفتاب." },
    {
      name: "ضدآفتاب SPF ۵۰ / PA++++",
      note: "به میزان ۲ بند انگشت؛ تمدید هر ۳ ساعت در نور روز.",
    },
  ];

  const pmRoutine = [
    {
      name: "پاک‌کننده اولیه (بالم یا میسلار)",
      note: "حذف کامل آرایش، ضدآفتاب و آلودگی روز.",
    },
    {
      name: `شستشو — ${cleanser}`,
      note: "شستشوی دوم برای پاکسازی عمقی منافذ.",
    },
    { name: A.pm, note: A.pmNote },
    {
      name: isMature
        ? "کرم دور چشم پپتایدی"
        : "آبرسان لایه‌ای (Hydrating Layer)",
      note: isMature
        ? "ناحیه دور چشم نازک‌ترین پوست بدن است."
        : "یک لایه نازک پیش از کرم شب.",
    },
    {
      name: "کرم شب ترمیم‌کننده سد دفاعی",
      note: "حاوی سرامید، کلسترول و اسید چرب برای بازسازی شبانه.",
    },
  ];

  /* ── برنامه هفتگی ── */
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  let activeNights;
  if (isVerySensitive || isBeginner) activeNights = [0, 3];
  else if (sens === "some" || exp === "intermediate") activeNights = [0, 2, 4];
  else activeNights = [0, 1, 3, 4, 5];

  const weeklyPlan = days.map((d, i) => {
    const on = activeNights.includes(i);
    return {
      name: d,
      icon: on ? "🧪" : "🛡️",
      label: on ? "اکتیو" : "ترمیم",
      rest: !on,
    };
  });

  const scheduleNote =
    activeNights.length <= 2
      ? "شروع تدریجی — ۲ شب در هفته"
      : activeNights.length === 3
        ? "سطح متوسط — یک شب در میان"
        : "سطح پیشرفته — ۵ شب در هفته";

  /* ── هشدارها ── */
  const warnings = [];
  if (primary === "aging" || ids.includes("aging"))
    warnings.push(
      '<b class="text-ink/80">رتینول + AHA/BHA</b> را در یک شب استفاده نکنید؛ خطر تخریب سد دفاعی و پوسته‌ریزی شدید.',
    );
  if (primary === "spots" || ids.includes("spots"))
    warnings.push(
      '<b class="text-ink/80">ویتامین C + نیاسینامید غلیظ</b> را با فاصله زمانی یا در نوبت‌های جدا (صبح/شب) مصرف کنید.',
    );
  if (isSensitive)
    warnings.push(
      'از محصولات حاوی <b class="text-ink/80">الکل دناتوره، منتول و عطر مصنوعی</b> کاملاً پرهیز کنید.',
    );
  if (type === "oily" || primary === "acne")
    warnings.push(
      'روغن نارگیل، ایزوپروپیل میریستات و <b class="text-ink/80">ترکیبات کومدوژنیک</b> منافذ شما را مسدود می‌کنند.',
    );
  if (primary === "redness")
    warnings.push(
      'اسکراب فیزیکی، بخور داغ و سونا باعث <b class="text-ink/80">تشدید گشادی مویرگ‌ها</b> می‌شود.',
    );
  warnings.push(
    'هر محصول جدید را ابتدا ۴۸ ساعت روی <b class="text-ink/80">پشت گوش یا مچ دست</b> تست کنید.',
  );

  /* ── مستندات علمی ── */
  const science = [
    {
      name: A.am.split("+")[0].trim(),
      evidence: "Grade A",
      reason: `این ترکیب برای پروفایل ${skinCode} به‌عنوان اکتیو روز انتخاب شد؛ ${A.amNote}`,
    },
    {
      name: A.pm.split("(")[0].trim(),
      evidence: isVerySensitive ? "Gentle" : "Grade A",
      reason: `${A.pmNote} غلظت آن بر اساس سطح حساسیت «${answers.sensitivity?.title || "—"}» و تجربه «${answers.experience?.title || "—"}» تنظیم شده است.`,
    },
    {
      name: "ضدآفتاب SPF ۵۰",
      evidence: "ضروری",
      reason:
        "تا ۸۰٪ از علائم پیری زودرس و تیرگی ناشی از UV است؛ بدون آن هیچ اکتیوی نتیجه پایدار نمی‌دهد.",
    },
  ];

  /* ── تطابق و شمارش ── */
  const matchPercent = Math.min(
    99,
    82 + answers.concerns.length * 3 + (exp === "advanced" ? 4 : 2),
  );
  const productCount = 5 + answers.concerns.length * 2;

  const chips = [
    answers.skinType?.title,
    answers.sensitivity?.badge,
    answers.age?.title + " سال",
    answers.experience?.title,
  ].filter(Boolean);

  const profileTitle = `${answers.skinType?.title || "نامشخص"} · با اولویت ${answers.concerns[0]?.title || "آبرسانی"}`;

  return {
    skinCode,
    profileTitle,
    chips,
    overallScore,
    overallLabel,
    overallNote,
    metrics,
    amRoutine,
    pmRoutine,
    weeklyPlan,
    scheduleNote,
    warnings,
    science,
    doctorTip: A.tip,
    matchPercent,
    productCount,
    shopUrl: {
      path: "/shop",
      query: {
        skin: type,
        concern: ids.join(","),
        sensitivity: sens,
        age,
        level: exp,
        code: skinCode,
      },
    },
  };
});

/* ── چرخه حیات ─────────────────────── */

onMounted(() => {
  try {
    hasSavedResult.value = !!localStorage.getItem(STORAGE_KEY);
  } catch {}
});

onBeforeUnmount(() => {
  clearInterval(analyzeTimer);
  clearTimeout(copyTimer);
});
</script>

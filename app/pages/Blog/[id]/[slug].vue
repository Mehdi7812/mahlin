<template>
  <main class="py-10 md:py-16 relative">

    <!-- ────── پس‌زمینه متحرک ────── -->
    <div
      v-if="post"
      class="absolute inset-0 overflow-clip pointer-events-none z-0 bg-fade-in"
      aria-hidden="true"
    >
      <div class="sticky top-0 h-screen w-full">
        <!-- لکه‌های نرم رنگی (هم‌رنگ دسته‌بندی مقاله) -->
        <!-- <span
          class="bg-blob bg-blob-1"
          :style="{ background: catInfo.stripeStart }"
        /> -->
        <!-- <span
          class="bg-blob bg-blob-2"
          :style="{ background: catInfo.accent }"
        /> -->
        <span
          class="bg-blob bg-blob-3"
          :style="{ background: catInfo.stripeEnd }"
        />

        <!-- حباب‌های شناور -->
        <span
          v-for="(b, i) in bubbles"
          :key="i"
          class="bg-bubble"
          :style="{
            left: b.l,
            width: b.s + 'px',
            height: b.s + 'px',
            '--t': b.d + 's',
            '--dl': b.delay + 's',
            '--c': catInfo.accent + '66',
          }"
        />

        <!-- ستاره‌های چشمک‌زن -->
        <span
          v-for="(st, i) in stars"
          :key="'star-' + i"
          class="bg-star"
          :style="{
            top: st.t + '%',
            left: st.l + '%',
            width: st.s + 'px',
            height: st.s + 'px',
            background: i % 3 === 0 ? catInfo.stripeStart : catInfo.accent,
            '--t': st.d + 's',
            '--dl': st.delay + 's',
            '--r': st.r + 'deg',
          }"
        />

        <!-- لوگوی محو شناور (اختیاری: مسیر لوگو را در BG_LOGO بگذار) -->
        <template v-if="BG_LOGO">
          <img
            v-for="(lg, i) in logos"
            :key="'logo-' + i"
            :src="BG_LOGO"
            alt=""
            class="bg-logo"
            :style="{
              top: lg.t + '%',
              left: lg.l + '%',
              width: lg.s + 'px',
              '--t': lg.d + 's',
              '--dl': lg.delay + 's',
            }"
          />
        </template>
      </div>
    </div>

    <!-- نوار پیشرفت مطالعه -->
    <div
      v-if="post"
      class="fixed top-0 inset-x-0 h-[3px] bg-ink/5 z-50"
    >
      <div
        class="h-full bg-gold transition-[width] duration-150 ease-out"
        :style="{ width: readingProgress + '%' }"
      />
    </div>

    <!-- ────── لودینگ ────── -->
    <div v-if="pending" class="max-w-[900px] mx-auto px-4 md:px-6 space-y-6 animate-pulse">
      <div class="h-4 w-32 bg-ink/8 rounded-full" />
      <div class="h-8 w-3/4 bg-ink/8 rounded-2xl" />
      <div class="h-6 w-1/2 bg-ink/8 rounded-full" />
      <div class="aspect-[16/9] bg-ink/8 rounded-[40px]" />
      <div class="space-y-3 pt-4">
        <div class="h-4 bg-ink/8 rounded-full" />
        <div class="h-4 bg-ink/8 rounded-full w-5/6" />
        <div class="h-4 bg-ink/8 rounded-full w-4/6" />
      </div>
    </div>

    <!-- ────── خطا ────── -->
    <div v-else-if="error" class="max-w-[900px] mx-auto px-4 text-center py-24 text-ink/40">
      <svg class="w-12 h-12 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
      </svg>
      <p class="text-sm">مقاله مورد نظر یافت نشد.</p>
      <NuxtLink to="/Blog" class="mt-4 inline-block text-xs font-bold text-gold">
        بازگشت به مجله
      </NuxtLink>
    </div>

    <!-- ────── محتوای اصلی ────── -->
    <template v-else-if="post">
      <article ref="articleRef" class="relative z-[1] max-w-[900px] mx-auto px-4 md:px-6">

        <!-- دکمه بازگشت -->
        <NuxtLink
          v-reveal="0"
          to="/Blog"
          class="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group mb-8"
        >
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>بازگشت به مجله ماهلین</span>
        </NuxtLink>

        <!-- هدر -->
        <header class="space-y-4 mb-8">
          <div v-reveal="100" class="flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-3 flex-wrap">
              <!-- دسته‌بندی (فقط اگر مقدار داشته باشد) -->
              <span
                v-if="hasCategory"
                class="px-3 py-1 text-[11px] font-bold rounded-full"
                :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }"
              >
                {{ post.category_text_fa }}
              </span>
              <!-- تاریخ -->
              <span class="text-xs text-ink/40 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/>
                </svg>
                {{ formattedDate }}
              </span>
              <span class="w-1 h-1 rounded-full bg-ink/20" />
              <!-- زمان مطالعه -->
              <span class="text-xs text-ink/40 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" stroke-linecap="round"/>
                </svg>
                {{ readingTime }} دقیقه مطالعه
              </span>
            </div>

            <!-- دکمه‌های اشتراک‌گذاری -->
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="کپی لینک"
                @click="copyLink"
                class="w-8 h-8 grid place-items-center rounded-full border border-ink/[0.07] text-ink/50 hover:text-ink hover:border-ink/20 transition-colors relative"
              >
                <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" stroke-linecap="round"/>
                  <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" stroke-linecap="round"/>
                </svg>
                <svg v-else class="star-pop" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <a
                :href="telegramShareUrl"
                target="_blank" rel="noopener"
                aria-label="اشتراک در تلگرام"
                class="w-8 h-8 grid place-items-center rounded-full border border-ink/[0.07] text-ink/50 hover:text-[#229ED9] hover:border-[#229ED9]/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 4.5L2.5 12l6.2 2 2.3 6.5 3-3.5 5 3.5z"/>
                </svg>
              </a>
              <a
                :href="whatsappShareUrl"
                target="_blank" rel="noopener"
                aria-label="اشتراک در واتساپ"
                class="w-8 h-8 grid place-items-center rounded-full border border-ink/[0.07] text-ink/50 hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- خط تزئینی -->
          <div
            class="h-[2px] w-10 rounded-full"
            :style="{ background: `linear-gradient(to left, transparent, ${catInfo.stripeStart})` }"
          />

          <h1 v-reveal="220" class="text-2xl sm:text-3xl md:text-[2.2rem] font-display text-ink font-bold leading-tight">
            {{ post.title_fa }}
          </h1>
        </header>

        <!-- تصویر شاخص -->
        <div
          v-reveal="340"
          class="aspect-[16/9] w-full rounded-[32px] sm:rounded-[48px] overflow-hidden border mb-4 relative shadow-[0_20px_60px_rgba(0,0,0,0.04)]"
          :style="{ borderColor: catInfo.borderHoverColor }"
        >
          <transition name="fade" mode="out-in">
            <img
              v-if="activeImageUrl"
              :key="activeImageUrl"
              :src="activeImageUrl"
              :alt="post.title_fa"
              class="w-full h-full object-cover hero-settle transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
            />
            <div
              v-else
              key="placeholder"
              class="w-full h-full flex items-center justify-center"
              :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}20, ${catInfo.stripeEnd})` }"
            >
              <span
                class="text-9xl font-display select-none opacity-20"
                :style="{ color: catInfo.accent }"
              >
                {{ (post.category_text_fa || post.title_fa || 'م').charAt(0) }}
              </span>
            </div>
          </transition>
          <div class="absolute inset-0 bg-gradient-to-t from-ink/8 to-transparent pointer-events-none" />
        </div>

        <!-- گالری تصاویر (فقط وقتی بیش از یک عکس وجود دارد) -->
        <div
          v-if="galleryImages.length > 1"
          class="flex items-center gap-2.5 mb-12 md:mb-16 overflow-x-auto pb-1 scrollbar-none"
        >
          <button
            v-for="(img, idx) in galleryImages"
            :key="img.id ?? idx"
            @click="activeImageIndex = idx"
            class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            :style="{
              borderColor: activeImageIndex === idx ? catInfo.accent : 'transparent',
              opacity: activeImageIndex === idx ? 1 : 0.55,
            }"
          >
            <img :src="img.file" :alt="img.title || post.title_fa" class="w-full h-full object-cover" />
          </button>
        </div>
        <div v-else class="mb-12 md:mb-16" />

        <!-- محتوای متنی -->
        <section class="max-w-[760px] mx-auto">

          <!-- خلاصه / لید -->
          <p
            v-if="plainSummary"
            v-reveal="0"
            class="text-base sm:text-lg text-ink/75 font-medium leading-relaxed mb-10 pr-4 border-r-[3px] rounded-sm"
            :style="{ borderColor: catInfo.accent + '60' }"
          >
            {{ plainSummary }}
          </p>

          <!-- بدنه اصلی مقاله از API -->
          <div
            class="prose-blog text-ink/75 text-sm sm:text-base leading-loose"
            v-html="post.description_fa"
          />

          <!-- کامنت‌ها -->
          <div id="comments" v-reveal="0" class="mt-16" :style="{ '--acc': catInfo.accent }">

            <!-- خط جداکننده گرادیانی -->
            <div
              class="h-px mb-10"
              :style="{ background: `linear-gradient(to left, transparent, ${catInfo.accent}66, transparent)` }"
            />

            <!-- سرتیتر -->
            <div class="flex items-center gap-3 mb-7">
              <span
                class="w-10 h-10 rounded-2xl grid place-items-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})` }"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/>
                </svg>
              </span>
              <div class="min-w-0">
                <h3 class="text-base sm:text-lg font-display font-bold text-ink leading-tight">
                  نظرات کاربران
                </h3>
                <p class="text-[11px] text-ink/40 mt-0.5">تجربه و نظر خودتان را با دیگران به اشتراک بگذارید</p>
              </div>
              <span
                v-if="commentsCount"
                class="mr-auto text-[11px] font-bold px-3 py-1 rounded-full text-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})` }"
              >
                {{ faNumber(commentsCount) }} نظر
              </span>
            </div>

            <!-- کامنت‌ها غیرفعال است -->
            <div
              v-if="!isCommentEnabled"
              class="text-center py-10 text-xs text-ink/35 bg-card/50 rounded-3xl border border-ink/[0.04]"
            >
              امکان ثبت و نمایش دیدگاه برای این مقاله غیرفعال است.
            </div>

            <!-- لودینگ نظرات -->
            <div v-else-if="loadingPosts" class="space-y-3 animate-pulse">
              <div v-for="n in 2" :key="n" class="flex items-start gap-3 p-5 rounded-3xl border border-ink/[0.04] bg-white/60">
                <div class="w-10 h-10 rounded-full bg-ink/8 flex-shrink-0" />
                <div class="flex-1 space-y-2 pt-1">
                  <div class="h-3 w-24 bg-ink/8 rounded-full" />
                  <div class="h-3 w-5/6 bg-ink/8 rounded-full" />
                </div>
              </div>
            </div>

            <!-- بدون نظر -->
            <div
              v-else-if="!comments.length"
              class="comment-card text-center py-12 px-6 rounded-3xl"
            >
              <span
                class="float-y mx-auto mb-4 w-14 h-14 rounded-full grid place-items-center text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})` }"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/>
                  <path d="M9 11h6M9 14h3"/>
                </svg>
              </span>
              <p class="text-sm font-bold text-ink mb-1">هنوز نظری ثبت نشده</p>
              <p class="text-xs text-ink/45">اولین نفری باشید که نظر می‌دهد!</p>
            </div>

            <!-- لیست نظرات -->
            <TransitionGroup v-else name="cmt" tag="div" appear class="space-y-4">
              <div
                v-for="(c, idx) in comments"
                :key="c.id"
                :style="{ '--i': idx % 10 }"
                class="comment-card relative p-5 rounded-3xl overflow-hidden"
              >
                <!-- علامت نقل‌قول تزئینی -->
                <svg
                  class="absolute top-3 left-4 w-9 h-9 pointer-events-none"
                  viewBox="0 0 24 24" :fill="catInfo.accent" style="opacity: 0.08"
                >
                  <path d="M10 8c-3 0-5 2-5 5v5h5v-5H7c0-2 1-3 3-3V8zm9 0c-3 0-5 2-5 5v5h5v-5h-3c0-2 1-3 3-3V8z"/>
                </svg>

                <div class="relative flex items-start gap-3.5">
                  <!-- آواتار -->
                  <div
                    class="relative w-11 h-11 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    :style="{
                      background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})`,
                      boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${catInfo.accent}55`,
                    }"
                  >
                    {{ commentInitial(c) }}
                    <img
                      v-if="c.user_photo"
                      :src="c.user_photo"
                      :alt="commentName(c)"
                      loading="lazy"
                      class="absolute inset-0 w-full h-full object-cover"
                      @error="$event.target.style.display = 'none'"
                    />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-x-2.5 gap-y-1 mb-1.5 flex-wrap">
                      <span class="text-[13px] font-bold text-ink">{{ commentName(c) }}</span>
                      <!-- امتیاز -->
                      <div
                        v-if="Number(c.rate)"
                        class="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        :style="{ backgroundColor: catInfo.iconBg }"
                        :aria-label="`امتیاز ${c.rate} از ۵`"
                      >
                        <svg
                          v-for="s in 5" :key="s"
                          width="11" height="11" viewBox="0 0 24 24"
                          :fill="s <= Number(c.rate) ? catInfo.accent : 'none'"
                          :stroke="catInfo.accent" stroke-width="2" stroke-linejoin="round"
                        >
                          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
                        </svg>
                      </div>
                      <span class="text-[10px] text-ink/35">{{ formatCommentDate(c.created_at) }}</span>
                    </div>
                    <p class="text-[13px] text-ink/70 leading-loose break-words whitespace-pre-line">{{ c.comment }}</p>
                  </div>
                </div>

                <!-- پاسخ‌ها -->
                <div
                  v-if="c.comment_children_active?.length"
                  class="relative mt-4 mr-3 sm:mr-14 space-y-2.5 anim-rise"
                  :style="{ '--d': '300ms' }"
                >
                  <div
                    v-for="r in c.comment_children_active"
                    :key="r.id"
                    class="reply-card flex items-start gap-3 p-3.5 rounded-2xl"
                  >
                    <svg
                      class="w-4 h-4 mt-1.5 flex-shrink-0 rtl:-scale-x-100"
                      viewBox="0 0 24 24" fill="none" :stroke="catInfo.accent" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
                    >
                      <path d="M9 14L4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
                    </svg>
                    <div
                      class="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                      :style="{
                        background: `linear-gradient(135deg, ${catInfo.accent}, ${catInfo.stripeStart})`,
                        boxShadow: `0 0 0 2px #fff, 0 0 0 3px ${catInfo.accent}44`,
                      }"
                    >
                      {{ commentInitial(r) }}
                      <img
                        v-if="r.user_photo"
                        :src="r.user_photo"
                        :alt="commentName(r)"
                        loading="lazy"
                        class="absolute inset-0 w-full h-full object-cover"
                        @error="$event.target.style.display = 'none'"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1 flex-wrap">
                        <span class="text-xs font-bold text-ink">{{ commentName(r) }}</span>
                        <span
                          class="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                          :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})` }"
                        >پاسخ</span>
                        <span class="text-[10px] text-ink/35">{{ formatCommentDate(r.created_at) }}</span>
                      </div>
                      <p class="text-xs text-ink/65 leading-relaxed break-words whitespace-pre-line">{{ r.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionGroup>

            <!-- نمایش بیشتر -->
            <button
              v-if="isCommentEnabled && commentsPage < commentsTotalPages"
              type="button"
              :disabled="loadMoreBtn"
              @click="loadMoreComments"
              class="more-btn mt-5 w-full py-3 text-xs font-bold rounded-full border transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              :style="{ color: catInfo.accent, borderColor: catInfo.accent + '40', backgroundColor: catInfo.iconBg }"
            >
              <svg
                v-if="loadMoreBtn"
                class="w-3.5 h-3.5 animate-spin"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="M21 12a9 9 0 1 1-6.2-8.55" stroke-linecap="round"/>
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
              <span>
                نمایش {{ faNumber(Math.max(commentsCount - comments.length, 0)) }} نظر دیگر
              </span>
            </button>

            <!-- ────── فرم ثبت نظر ────── -->
            <div
              v-if="isCommentEnabled"
              ref="commentFormRef"
              v-reveal="0"
              class="form-card relative mt-10 p-5 sm:p-8 rounded-[32px] overflow-hidden"
            >
              <!-- نوار رنگی بالا -->
              <div
                class="absolute top-0 inset-x-0 h-1"
                :style="{ background: `linear-gradient(to left, ${catInfo.stripeStart}, ${catInfo.accent})` }"
              />

              <div class="flex items-center gap-3 mb-6">
                <span
                  class="w-10 h-10 rounded-2xl grid place-items-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex-shrink-0"
                  :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})` }"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                  </svg>
                </span>
                <div>
                  <h4 class="text-sm sm:text-base font-bold text-ink">دیدگاه خود را بنویسید</h4>
                  <p class="text-[11px] text-ink/45 mt-0.5">
                    نظر شما پس از بررسی و تأیید در این صفحه نمایش داده می‌شود.
                  </p>
                </div>
              </div>

              <div class="space-y-5">

                <!-- امتیاز -->
                <div>
                  <label class="block text-xs font-bold text-ink/70 mb-2">امتیاز شما</label>
                  <div
                    class="inline-flex items-center gap-1 px-3.5 py-2 rounded-full border transition-colors duration-300"
                    :class="[errors.rate ? 'border-danger/50 bg-danger/[0.04]' : 'border-ink/[0.07]', errors.rate && shaking ? 'shake' : '']"
                    :style="!errors.rate ? { backgroundColor: commentForm.rate ? catInfo.iconBg : 'rgba(255,255,255,0.7)' } : {}"
                    @mouseleave="hoverRate = 0"
                  >
                    <button
                      v-for="s in 5"
                      :key="s"
                      type="button"
                      :aria-label="`امتیاز ${s} از ۵`"
                      class="p-0.5 transition-transform duration-200 hover:scale-125 focus:outline-none focus-visible:scale-125"
                      @mouseenter="hoverRate = s"
                      @click="pickRate(s)"
                    >
                      <svg
                        width="24" height="24" viewBox="0 0 24 24"
                        :fill="s <= (hoverRate || commentForm.rate) ? catInfo.accent : 'none'"
                        :stroke="s <= (hoverRate || commentForm.rate) ? catInfo.accent : 'rgba(0,0,0,0.2)'"
                        stroke-width="1.8" stroke-linejoin="round"
                        class="transition-all duration-200"
                        :class="{ 'star-pop': popStar === s }"
                      >
                        <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
                      </svg>
                    </button>
                    <span
                      class="text-[11px] font-bold min-w-[3.5rem] text-center pr-1"
                      :style="{ color: (hoverRate || commentForm.rate) ? catInfo.accent : 'rgba(0,0,0,0.4)' }"
                    >
                      {{ rateLabel }}
                    </span>
                  </div>
                  <p v-if="errors.rate" class="mt-1.5 text-[11px] text-danger font-medium anim-rise">{{ errors.rate }}</p>
                </div>

                <!-- نام و راه ارتباطی (فقط مهمان) -->
                <div v-if="!isUserLogin" class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label for="comment-name" class="block text-xs font-bold text-ink/70 mb-2">نام</label>
                    <input
                      id="comment-name"
                      v-model="commentForm.name"
                      type="text"
                      maxlength="60"
                      autocomplete="name"
                      placeholder="نام شما"
                      :class="fieldClass(errors.name)"
                    />
                    <p v-if="errors.name" class="mt-1.5 text-[11px] text-danger font-medium anim-rise">{{ errors.name }}</p>
                  </div>
                  <div>
                    <label for="comment-contact" class="block text-xs font-bold text-ink/70 mb-2">
                      شماره موبایل
                    </label>
                    <input
                      id="comment-contact"
                      v-model="commentForm.contact"
                      type="tel"
                      inputmode="numeric"
                      dir="ltr"
                      maxlength="11"
                      autocomplete="tel"
                      placeholder="09111234567"
                      :class="[fieldClass(errors.contact), 'text-left tracking-wide']"
                      @input="onContactInput"
                    />
                    <p v-if="errors.contact" class="mt-1.5 text-[11px] text-danger font-medium anim-rise">{{ errors.contact }}</p>
                    <p v-else class="mt-1.5 text-[10px] text-ink/35">شماره شما نمایش داده نمی‌شود.</p>
                  </div>
                </div>

                <!-- متن نظر -->
                <div>
                  <label for="comment-text" class="block text-xs font-bold text-ink/70 mb-2">متن نظر</label>
                  <textarea
                    id="comment-text"
                    v-model="commentForm.text"
                    rows="5"
                    :maxlength="COMMENT_MAX"
                    placeholder="نظر، تجربه یا سؤال خود را درباره این مقاله بنویسید…"
                    :class="[fieldClass(errors.text), 'resize-none leading-relaxed']"
                  />
                  <div class="flex items-center justify-between mt-1.5 text-[10px] text-ink/30">
                    <span v-if="errors.text" class="text-[11px] text-danger font-medium anim-rise">
                      {{ errors.text }}
                    </span>
                    <span v-else />
                    <span>{{ faNumber(commentForm.text.length) }} / {{ faNumber(COMMENT_MAX) }}</span>
                  </div>
                </div>

                <!-- دکمه ارسال -->
                <div class="flex items-center justify-between gap-4 flex-wrap pt-1">
                  <button
                    type="button"
                    :disabled="submitLoading"
                    class="btn-shine relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
                    :style="{
                      background: `linear-gradient(135deg, ${catInfo.stripeStart}, ${catInfo.accent})`,
                      boxShadow: `0 10px 24px ${catInfo.accent}40`,
                    }"
                    @click="submitCommentForm"
                  >
                    <svg
                      v-if="submitLoading"
                      class="w-3.5 h-3.5 animate-spin"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    >
                      <path d="M21 12a9 9 0 1 1-6.2-8.55" stroke-linecap="round"/>
                    </svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                    <span>{{ submitLoading ? 'در حال ارسال…' : 'ثبت نظر' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </section>
      </article>

      <!-- مقالات مرتبط -->
      <section class="relative z-[1] max-w-[1280px] mx-auto px-4 md:px-6 mt-20 md:mt-28 pt-16 border-t border-ink/[0.06]">
        <div v-reveal="0" class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-5 h-px bg-gold/60" />
              <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">بیشتر بخوانید</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">مقالات پیشنهادی</h2>
          </div>
          <NuxtLink to="/Blog" class="text-xs font-bold text-gold hover:text-ink transition-colors">
            مشاهده همه مقالات ←
          </NuxtLink>
        </div>

        <!-- لودینگ مقالات مرتبط -->
        <div v-if="relatedPending" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="n in 3" :key="n" class="rounded-2xl bg-ink/[0.03] h-64 animate-pulse" />
        </div>

        <div v-else-if="relatedBlogs.length" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <BlogCard
            v-for="(b, i) in relatedBlogs"
            :key="b.id"
            v-reveal="i * 120"
            :blog="b"
          />
        </div>

        <div v-else class="text-center py-10 text-ink/35 text-xs">
          مقاله مرتبطی یافت نشد.
        </div>
      </section>
    </template>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { toast } from 'vue-sonner';

const route = useRoute();
const customizer  = useCustomizerStore();

// ─── دایرکتیو ظاهر شدن هنگام اسکرول (v-reveal="تأخیر به میلی‌ثانیه") ───
let revealObserver = null;
function getRevealObserver() {
  if (revealObserver || typeof IntersectionObserver === 'undefined') return revealObserver;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      revealObserver.unobserve(el);
      el.classList.add('reveal-in');
      // بعد از پایان انیمیشن، کلاس‌ها حذف می‌شوند تا ترنزیشن‌های hover خود المنت خراب نشود
      setTimeout(() => {
        el.classList.remove('reveal', 'reveal-in');
        el.style.removeProperty('--d');
      }, 900 + (parseInt(el.style.getPropertyValue('--d')) || 0));
    });
  }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  return revealObserver;
}
const vReveal = {
  mounted(el, binding) {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    el.style.setProperty('--d', (Number(binding.value) || 0) + 'ms');
    el.classList.add('reveal');
    getRevealObserver()?.observe(el);
  },
  unmounted(el) {
    revealObserver?.unobserve(el);
  },
};

// ─── State ───────────────────────────────────────────────
const post              = ref(null);
const pending            = ref(true);
const error              = ref(null);
const relatedBlogs       = ref([]);
const relatedPending     = ref(false);
const activeImageIndex   = ref(0);
const copied             = ref(false);
const readingProgress    = ref(0);
const articleRef         = ref(null);

// ─── State فرم نظر ───────────────────────────────────────
const COMMENT_KIND = 2;
const COMMENT_MAX  = 1000;

// لیست نظرات (صفحه‌بندی سمت سرور)
const comments           = ref([]);
const commentsPage       = ref(1);
const commentsCount      = ref(0);
const commentsTotalPages = ref(1);
const loadingPosts       = ref(true);
const loadMoreBtn        = ref(false);

const isUserLogin = computed(() => !!customizer.auth);

const commentFormRef = ref(null);
const submitLoading  = ref(false);
const hoverRate      = ref(0);
const popStar        = ref(0);
// ⚠️ مسیر لوگوی ماهلین (مثلاً '/logo.svg')؛ خالی بگذاری لوگو نمایش داده نمی‌شود
const BG_LOGO = '';

// تولید موقعیت‌های ثابت (بدون Math.random تا SSR/CSR ناهمخوان نشود)
function seeded(n) {
  let x = n * 9301 + 49297;
  return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
}
const _rnd = seeded(7);
const stars = Array.from({ length: 18 }, () => ({
  t: Math.round(_rnd() * 96),
  l: Math.round(_rnd() * 96),
  s: Math.round(8 + _rnd() * 16),
  d: +(3 + _rnd() * 4).toFixed(1),
  delay: +(_rnd() * 6).toFixed(1),
  r: Math.round(_rnd() * 90),
}));
const logos = [
  { t: 14, l: 6,  s: 90,  d: 26, delay: 0 },
  { t: 52, l: 84, s: 120, d: 32, delay: 5 },
  { t: 76, l: 22, s: 80,  d: 28, delay: 9 },
];

// حباب‌های پس‌زمینه (موقعیت افقی، اندازه، مدت چرخه، تأخیر)
const bubbles = [
  { l: '6%',  s: 16, d: 24, delay: 0 },
  { l: '18%', s: 28, d: 32, delay: 6 },
  { l: '33%', s: 12, d: 22, delay: 3 },
  { l: '47%', s: 22, d: 28, delay: 11 },
  { l: '62%', s: 14, d: 26, delay: 8 },
  { l: '75%', s: 30, d: 34, delay: 2 },
  { l: '88%', s: 18, d: 25, delay: 13 },
];
const shaking        = ref(false);
const errors         = ref({ rate: '', name: '', contact: '', text: '' });
const commentForm    = ref({ name: '', contact: '', text: '', rate: 0, error: false });

const RATE_LABELS = ['', 'ضعیف', 'نه چندان خوب', 'متوسط', 'خوب', 'عالی'];
const rateLabel = computed(() => RATE_LABELS[hoverRate.value || commentForm.value.rate] || 'انتخاب کنید');

// ─── Fetch مقاله اصلی ────────────────────────────────────
const slugOrId = route.params.id || route.params.slug;

useGarnetApiFetch('blog/show', { id: slugOrId })
  .then((res) => {
    post.value = res.Blog || null;
    activeImageIndex.value = 0;
    if (!post.value) {
      error.value = true;
    } else {
      applySeo(post.value);
      loadComments();
      if (post.value.category) fetchRelated(post.value.category, post.value.id);
    }
  })
  .catch((err) => {
    console.error('[BlogDetail] خطا:', err);
    error.value = err;
  })
  .finally(() => {
    pending.value = false;
  });

// ─── بارگذاری نظرات (صفحه‌بندی‌شده) ──────────────────────
async function loadComments() {
  if (!post.value) return;
  try {
    const response = await useGarnetApiFetch('comments/indexByKindTarget', {
      kind: COMMENT_KIND,
      target_id: post.value.id,
      amount: 10,
      page: commentsPage.value,
    });
    if (response?.code === 2000) {
      const list = Array.isArray(response.Comments) ? response.Comments : [];
      comments.value = [...comments.value, ...list];
      commentsCount.value = response.pagination?.total ?? comments.value.length;
      commentsTotalPages.value =
        Math.ceil((response.pagination?.total ?? 0) / (response.pagination?.per_page ?? 10)) || 1;
    }
  } catch (e) {
    console.error('[BlogDetail] خطا در دریافت نظرات:', e);
    toast.error('دریافت نظرات انجام نشد');
  } finally {
    loadingPosts.value = false;
    loadMoreBtn.value  = false;
  }
}

async function loadMoreComments() {
  if (loadMoreBtn.value || commentsPage.value >= commentsTotalPages.value) return;
  loadMoreBtn.value = true;
  commentsPage.value += 1;
  await loadComments();
}

// ─── Fetch مقالات مرتبط ──────────────────────────────────
function fetchRelated(categoryId, currentId) {
  relatedPending.value = true;
  useGarnetApiFetch('blog/indexWithImages', {
      amount:    '4',
      category:  String(categoryId),
      direction: 'desc',
      order:     'order',
      page:      1,
  })
    .then((res) => {
      relatedBlogs.value = (res.Blog || [])
        .filter(b => b.id !== currentId)
        .slice(0, 3);
    })
    .catch(() => {})
    .finally(() => { relatedPending.value = false; });
}

// ─── Computed پایه ─────────────────────────────────────────
const catInfo = computed(() =>
  generateCategoryColor(post.value?.category_text_fa)
)

const hasCategory = computed(() =>
  !!(post.value?.category_text_fa && post.value.category_text_fa.trim())
);

const galleryImages = computed(() => post.value?.blog_images || []);

const activeImageUrl = computed(() =>
  galleryImages.value?.[activeImageIndex.value]?.file ?? null
);

const plainSummary = computed(() =>
  (post.value?.summary_fa || post.value?.seo_description_fa || '')
    .replace(/<[^>]*>/g, '').trim()
);

const formattedDate = computed(() => {
  if (!post.value?.created_at) return '';
  try {
    return new Date(post.value.created_at.replace(' ', 'T')).toLocaleDateString('fa-IR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return post.value.created_at; }
});

const readingTime = computed(() => {
  const text = (post.value?.description_fa || '').replace(/<[^>]*>/g, '');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 120));
});

const isCommentEnabled = computed(() => post.value?.allow_comment === 1);

function formatCommentDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr.replace(' ', 'T')).toLocaleDateString('fa-IR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return ''; }
}

// نام نمایشی: کاربر ثبت‌نام‌شده ← نام مهمان ← پیش‌فرض (شماره موبایل هرگز نمایش داده نمی‌شود)
function commentName(c) {
  return (c?.user_full_name || c?.name || '').trim() || 'کاربر مهمان';
}
function commentInitial(c) {
  return (c?.user_first_name || commentName(c)).trim().charAt(0) || 'ک';
}

// ─── فرم نظر: کلاس فیلدها / ولیدیشن / ریست ────────────────
function pickRate(s) {
  commentForm.value.rate = commentForm.value.rate === s ? 0 : s;
  if (commentForm.value.rate) {
    popStar.value = s;
    setTimeout(() => { popStar.value = 0; }, 450);
  }
}

function triggerShake() {
  shaking.value = true;
  setTimeout(() => { shaking.value = false; }, 500);
}

function fieldClass(invalid) {
  return [
    invalid && shaking.value ? 'shake' : '',
    'w-full px-4 py-2.5 rounded-2xl border text-xs text-ink bg-white/60',
    'placeholder:text-ink/25 transition-colors duration-300',
    'focus:outline-none focus:bg-white field-live',
    invalid ? 'border-danger/50 bg-danger/[0.03]' : 'border-ink/[0.07]',
  ];
}

const ERR_MSG = {
  rate:           'لطفاً امتیاز خود را انتخاب کنید',
  name:           'لطفاً نام خود را وارد کنید',
  contact:        'لطفاً شماره موبایل خود را وارد کنید',
  contactInvalid: 'شماره موبایل معتبر نیست (مثال: 09111234567)',
  text:           'لطفاً متن نظر را بنویسید',
};

// تبدیل ارقام فارسی و عربی به انگلیسی
function toEnDigits(str = '') {
  return String(str)
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
}

// فقط ارقام (فارسی/عربی هم‌زمان انگلیسی می‌شوند)، حداکثر ۱۱ رقم
function normalizeMobile(v) {
  return toEnDigits(v).replace(/\D/g, '').slice(0, 11);
}

// دقیقاً قالب 09xxxxxxxxx (۱۱ رقم، شروع با 09)
const IR_MOBILE_RE = /^09\d{9}$/;
const isValidIranMobile = (v) => IR_MOBILE_RE.test(normalizeMobile(v));

function onContactInput() {
  commentForm.value.contact = normalizeMobile(commentForm.value.contact);
}

function computeErrors() {
  const f = commentForm.value;
  const guest = !isUserLogin.value;
  const contact = (f.contact || '').trim();
  return {
    rate: f.rate ? '' : ERR_MSG.rate,
    name: guest && !(f.name || '').trim() ? ERR_MSG.name : '',
    contact: !guest ? ''
      : !contact ? ERR_MSG.contact
      : !isValidIranMobile(contact) ? ERR_MSG.contactInvalid
      : '',
    text: (f.text || '').trim() ? '' : ERR_MSG.text,
  };
}

function validateComment() {
  errors.value = computeErrors();
  return !Object.values(errors.value).some(Boolean);
}

function resetCommentForm() {
  commentForm.value = { name: '', contact: '', text: '', rate: 0, error: false };
  hoverRate.value = 0;
  errors.value = { rate: '', name: '', contact: '', text: '' };
}

// فیلدی که خطا دارد هنگام تایپ زنده به‌روز می‌شود (پیام «خالی» ← «نامعتبر» ← پاک)
watch(commentForm, () => {
  const fresh = computeErrors();
  for (const k in errors.value) {
    if (errors.value[k]) errors.value[k] = fresh[k];
  }
}, { deep: true });

// ─── افکت و مبدأ کلیک (نسخه محلی؛ جایگزین captureOrigin/sparkle پروژه) ───
function captureOrigin(el) {
  if (!el || !el.getBoundingClientRect) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function sparkle(origin, { count = 10, spread = 56 } = {}) {
  if (!origin || typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const size = 4 + Math.random() * 5;
    Object.assign(dot.style, {
      position: 'fixed',
      left: origin.x + 'px',
      top: origin.y + 'px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: catInfo.value.accent,
      pointerEvents: 'none',
      zIndex: 9999,
    });
    document.body.appendChild(dot);
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = spread * (0.5 + Math.random() * 0.6);
    dot.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 },
      ],
      { duration: 650 + Math.random() * 250, easing: 'cubic-bezier(.2,.8,.3,1)' }
    ).onfinish = () => dot.remove();
  }
}

// ─── ثبت نظر ───────────────────────────────────────────────
async function submitCommentForm() {
  if (submitLoading.value || !post.value) return;

  commentForm.value.error = false;
  const text = (commentForm.value.text || '').trim();

  if (!validateComment()) {
    commentForm.value.error = true;
    triggerShake();
    const firstError = ['rate', 'name', 'contact', 'text'].map(k => errors.value[k]).find(Boolean);
    toast.error(firstError || 'لطفاً همه‌ی فیلدها را پر کنید');
    return;
  }

  submitLoading.value = true;
  const origin = process.client ? captureOrigin(document.activeElement) : null;

  let sendUrl = '';
  let sendData = {};

  if (isUserLogin.value) {
    sendUrl = 'comments/createByUser';
    sendData = {
      comment: text,
      rate: commentForm.value.rate,
      kind: COMMENT_KIND,
      target_id: post.value.id,
    };
  } else {
    sendUrl = 'comments/create';
    sendData = {
      comment: text,
      name: (commentForm.value.name || '').trim(),
      rate: commentForm.value.rate,
      kind: COMMENT_KIND,
      contact: normalizeMobile(commentForm.value.contact),
      target_id: post.value.id,
    };
  }

  try {
    const response = await useGarnetApiFetch(sendUrl, sendData);
    if (response?.code === 2000) {
      sparkle(origin, { count: 10, spread: 56 });
      toast.success('ممنون از نظرتان! پس از بررسی و تأیید، نمایش داده خواهد شد');
      resetCommentForm();
      comments.value = [];
      commentsPage.value = 1;
      loadingPosts.value = true;
      await loadComments();
    } else {
      toast.error('ارسال نظر با مشکل مواجه شد. دوباره تلاش کنید');
    }
  } catch (e) {
    console.error('[BlogDetail] خطا در ثبت نظر:', e);
    toast.error('ارسال نظر انجام نشد. اتصال اینترنت را بررسی کنید');
  } finally {
    submitLoading.value = false;
  }
}

// ─── لینک صفحه + اشتراک‌گذاری ──────────────────────────────
const requestUrl = useRequestURL();

const pageUrl = computed(() => {
  if (post.value?.usage_link_fa) {
    return `${requestUrl.origin}${post.value.usage_link_fa}`;
  }
  return requestUrl.href;
});

const telegramShareUrl = computed(() =>
  `https://t.me/share/url?url=${encodeURIComponent(pageUrl.value)}&text=${encodeURIComponent(post.value?.title_fa || '')}`
);

const whatsappShareUrl = computed(() =>
  `https://wa.me/?text=${encodeURIComponent((post.value?.title_fa || '') + ' ' + pageUrl.value)}`
);

async function copyLink() {
  try {
    await navigator.clipboard.writeText(pageUrl.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1800);
  } catch (e) {
    console.error('کپی لینک با خطا مواجه شد:', e);
  }
}

// ─── سئو + Schema ───────────────────────────────────────────
function applySeo(blog) {
  const title       = blog.seo_title_fa || blog.title_fa || 'مجله ماهلین';
  const description = (blog.seo_description_fa || plainSummary.value || '').slice(0, 160);
  const image       = blog.blog_images?.[0]?.file;

  useSeoMeta({
    title,
    description,
    keywords:        blog.seo_keyword_fa || undefined,
    ogTitle:         title,
    ogDescription:   description,
    ogType:          'article',
    ogImage:         image,
    twitterTitle:    title,
    twitterDescription: description,
    twitterImage:    image,
    twitterCard:     'summary_large_image',
  });

  useHead({
    link: [
      { rel: 'canonical', href: pageUrl.value },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title_fa,
          description,
          image: image ? [image] : undefined,
          datePublished: blog.created_at,
          dateModified: blog.updated_at,
          mainEntityOfPage: pageUrl.value,
          author: { '@type': 'Organization', name: 'ماهلین' },
          publisher: { '@type': 'Organization', name: 'ماهلین' },
        }),
      },
    ],
  });
}

// ─── نوار پیشرفت مطالعه ─────────────────────────────────────
function updateReadingProgress() {
  if (!articleRef.value) return;
  const rect   = articleRef.value.getBoundingClientRect();
  const total  = rect.height - window.innerHeight;
  const passed = -rect.top;
  readingProgress.value = total > 0
    ? Math.min(100, Math.max(0, (passed / total) * 100))
    : 0;
}

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress);
});

watch(post, () => {
  requestAnimationFrame(updateReadingProgress);
});
</script>

<style scoped>
/* استایل بدنه مقاله */
.prose-blog :deep(h1),
.prose-blog :deep(h2),
.prose-blog :deep(h3),
.prose-blog :deep(h4) {
  font-weight: 700;
  line-height: 1.4;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: rgb(var(--color-ink));
}
.prose-blog :deep(h2) { font-size: 1.3rem; }
.prose-blog :deep(h3) { font-size: 1.1rem; }
.prose-blog :deep(p)  { margin-bottom: 1.25rem; line-height: 1.9; }
.prose-blog :deep(ul),
.prose-blog :deep(ol) { padding-right: 1.5rem; margin-bottom: 1.25rem; }
.prose-blog :deep(li) { margin-bottom: 0.5rem; line-height: 1.8; }
.prose-blog :deep(a)  { color: v-bind('catInfo.accent'); text-decoration: underline; text-underline-offset: 3px; }
.prose-blog :deep(img) { border-radius: 16px; max-width: 100%; margin: 1.5rem auto; display: block; }
.prose-blog :deep(blockquote) {
  border-right: 3px solid v-bind('catInfo.accent + "60"');
  padding-right: 1rem;
  margin: 1.5rem 0;
  color: rgba(var(--color-ink), 0.65);
  font-style: italic;
}
.prose-blog :deep(strong) { color: rgb(var(--color-ink)); font-weight: 700; }

/* گالری بدون اسکرول‌بار */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

/* ── بخش نظرات (زنده‌تر) ── */
.comment-card {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--acc) 9%, #fff) 0%,
    rgba(255, 255, 255, 0.9) 60%);
  border: 1px solid color-mix(in srgb, var(--acc) 18%, transparent);
  box-shadow: 0 8px 26px color-mix(in srgb, var(--acc) 9%, transparent);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}
.comment-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--acc) 40%, transparent);
  box-shadow: 0 16px 38px color-mix(in srgb, var(--acc) 18%, transparent);
}

.reply-card {
  background: color-mix(in srgb, var(--acc) 7%, #fff);
  border: 1px solid color-mix(in srgb, var(--acc) 14%, transparent);
}

.more-btn:hover:not(:disabled) {
  background: var(--acc) !important;
  color: #fff !important;
  transform: translateY(-1px);
}

.form-card {
  background:
    radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--acc) 12%, transparent), transparent 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.8));
  border: 1px solid color-mix(in srgb, var(--acc) 20%, transparent);
  box-shadow: 0 20px 50px color-mix(in srgb, var(--acc) 10%, transparent);
}

.field-live:focus {
  border-color: var(--acc);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--acc) 16%, transparent);
}

/* برق عبوری روی دکمه ثبت */
.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  left: -60%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: skewX(-20deg);
  transition: left 0.7s ease;
}
.btn-shine:hover::after { left: 130%; }

/* شناور بودن آیکن حالت خالی */
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.float-y { animation: floatY 3.2s ease-in-out infinite; }

/* ── پس‌زمینه متحرک ── */
.bg-fade-in { animation: bgIn 1.6s ease-out both; }
@keyframes bgIn { from { opacity: 0; } to { opacity: 1; } }

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.26;
  will-change: transform;
}
.bg-blob-1 { width: 460px; height: 460px; top: -120px; right: -100px; animation: drift1 24s ease-in-out infinite alternate; }
.bg-blob-2 { width: 520px; height: 520px; top: 38%; left: -180px; opacity: 0.16; animation: drift2 30s ease-in-out infinite alternate; }
.bg-blob-3 { width: 420px; height: 420px; bottom: -140px; right: 18%; animation: drift3 27s ease-in-out infinite alternate; }

@keyframes drift1 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-70px, 50px, 0) scale(1.12); }
  100% { transform: translate3d(30px, 110px, 0) scale(0.95); }
}
@keyframes drift2 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(90px, -60px, 0) scale(1.1); }
  100% { transform: translate3d(40px, 70px, 0) scale(0.92); }
}
@keyframes drift3 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-80px, -40px, 0) scale(1.15); }
  100% { transform: translate3d(50px, -90px, 0) scale(1); }
}

.bg-bubble {
  position: absolute;
  bottom: -50px;
  border-radius: 50%;
  border: 1px solid var(--c);
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), transparent 62%);
  opacity: 0;
  will-change: transform, opacity;
  animation: bubbleUp var(--t, 26s) linear infinite;
  animation-delay: var(--dl, 0s);
}
@keyframes bubbleUp {
  0%   { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
  12%  { opacity: 0.55; }
  50%  { transform: translate3d(26px, -55vh, 0) scale(1); }
  88%  { opacity: 0.35; }
  100% { transform: translate3d(-18px, -112vh, 0) scale(1.1); opacity: 0; }
}

/* ستاره‌های چشمک‌زن */
.bg-star {
  position: absolute;
  clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
  opacity: 0;
  will-change: transform, opacity;
  animation: twinkle var(--t, 4s) ease-in-out infinite;
  animation-delay: var(--dl, 0s);
}
@keyframes twinkle {
  0%, 100% { transform: scale(0.3) rotate(var(--r, 0deg)); opacity: 0.08; }
  50%      { transform: scale(1) rotate(calc(var(--r, 0deg) + 45deg)); opacity: 0.7; }
}

/* لوگوی محو شناور */
.bg-logo {
  position: absolute;
  height: auto;
  opacity: 0.06;
  filter: grayscale(1);
  will-change: transform;
  animation: logoFloat var(--t, 28s) ease-in-out infinite alternate;
  animation-delay: var(--dl, 0s);
}
@keyframes logoFloat {
  0%   { transform: translate3d(0, 0, 0) rotate(-6deg); }
  100% { transform: translate3d(24px, -46px, 0) rotate(6deg); }
}

/* ── انیمیشن‌ها ── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
  will-change: opacity, transform;
}
.reveal.reveal-in { opacity: 1; transform: none; }

/* ورود نظرات (با تأخیر پلکانی) */
.cmt-enter-active {
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 70ms);
}
.cmt-enter-from { opacity: 0; transform: translateY(16px); }

@keyframes rise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
.anim-rise { animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--d, 0ms); }

@keyframes settle {
  from { opacity: 0; transform: scale(1.07); }
  to   { opacity: 1; transform: scale(1); }
}
.hero-settle { animation: settle 1.2s cubic-bezier(0.22, 1, 0.36, 1) backwards; }

@keyframes starPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.45) rotate(-12deg); }
  100% { transform: scale(1) rotate(0); }
}
.star-pop { animation: starPop 0.45s ease-out; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(3px); }
}
.shake { animation: shake 0.45s ease-in-out; }

@media (prefers-reduced-motion: reduce) {
  .bg-blob, .bg-bubble, .bg-fade-in, .bg-star, .bg-logo, .float-y { animation: none !important; }
.btn-shine::after { display: none; }
.bg-star { opacity: 0.3; }
.bg-bubble { display: none; }
.reveal, .cmt-enter-active, .anim-rise, .hero-settle, .star-pop, .shake {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ترنزیشن تعویض عکس گالری */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
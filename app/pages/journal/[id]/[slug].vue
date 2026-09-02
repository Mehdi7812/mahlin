<template>
  <main class="py-10 md:py-16 relative">

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
      <NuxtLink to="/journal" class="mt-4 inline-block text-xs font-bold text-gold">
        بازگشت به مجله
      </NuxtLink>
    </div>

    <!-- ────── محتوای اصلی ────── -->
    <template v-else-if="post">
      <article ref="articleRef" class="max-w-[900px] mx-auto px-4 md:px-6">

        <!-- دکمه بازگشت -->
        <NuxtLink
          to="/journal"
          class="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group mb-8"
        >
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>بازگشت به مجله ماهلین</span>
        </NuxtLink>

        <!-- هدر -->
        <header class="space-y-4 mb-8">
          <div class="flex items-center justify-between gap-3 flex-wrap">
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
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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

          <h1 class="text-2xl sm:text-3xl md:text-[2.2rem] font-display text-ink font-bold leading-tight">
            {{ post.title_fa }}
          </h1>
        </header>

        <!-- تصویر شاخص -->
        <div
          class="aspect-[16/9] w-full rounded-[32px] sm:rounded-[48px] overflow-hidden border mb-4 relative shadow-[0_20px_60px_rgba(0,0,0,0.04)]"
          :style="{ borderColor: catInfo.borderHoverColor }"
        >
          <transition name="fade" mode="out-in">
            <img
              v-if="activeImageUrl"
              :key="activeImageUrl"
              :src="activeImageUrl"
              :alt="post.title_fa"
              class="w-full h-full object-cover"
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
            class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300"
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
          <div class="mt-16 pt-10 border-t border-ink/[0.06]">
            <div class="flex items-center gap-2 mb-6">
              <span
                class="w-5 h-px"
                :style="{ backgroundColor: catInfo.accent + '80' }"
              />
              <h3 class="text-sm font-bold" :style="{ color: catInfo.accent }">
                نظرات کاربران
              </h3>
              <span
                v-if="post.blog_comments?.length"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }"
              >
                {{ post.blog_comments.length }}
              </span>
            </div>

            <!-- کامنت‌ها غیرفعال است -->
            <div
              v-if="!isCommentEnabled"
              class="text-center py-10 text-xs text-ink/35 bg-card/50 rounded-2xl border border-ink/[0.04]"
            >
              امکان ثبت و نمایش دیدگاه برای این مقاله غیرفعال است.
            </div>

            <!-- بدون نظر -->
            <div
              v-else-if="!post.blog_comments?.length"
              class="text-center py-10 text-xs text-ink/35 bg-card/50 rounded-2xl border border-ink/[0.04]"
            >
              هنوز نظری برای این مقاله ثبت نشده است.
            </div>

            <!-- لیست نظرات -->
            <div v-else class="space-y-3">
              <div
                v-for="c in visibleComments"
                :key="c.id"
                class="flex items-start gap-3 p-4 rounded-2xl border border-ink/[0.04] bg-card/60"
              >
                <!-- آواتار -->
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  :style="{ backgroundColor: catInfo.accent + 'CC' }"
                >
                  {{ (c.user_first_name || c.user_full_name || 'ک')?.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <span class="text-xs font-bold text-ink">
                      {{ c.user_full_name || 'کاربر مهمان' }}
                    </span>
                    <!-- امتیاز -->
                    <div v-if="c.rate" class="flex items-center gap-0.5">
                      <svg
                        v-for="s in 5" :key="s"
                        width="9" height="9" viewBox="0 0 24 24"
                        :fill="s <= c.rate ? catInfo.accent : 'none'"
                        :stroke="catInfo.accent" stroke-width="2"
                      >
                        <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
                      </svg>
                    </div>
                    <span class="text-[10px] text-ink/30">
                      {{ formatCommentDate(c.created_at) }}
                    </span>
                  </div>
                  <p class="text-xs text-ink/60 leading-relaxed">{{ c.comment }}</p>
                </div>
              </div>
            </div>

            <!-- نمایش بیشتر -->
            <button
              v-if="isCommentEnabled && post.blog_comments?.length > showCommentsCount"
              @click="showCommentsCount += 5"
              class="mt-4 w-full py-2.5 text-xs font-bold rounded-full border border-ink/[0.06] text-ink/50 hover:text-ink hover:border-ink/15 transition-all"
            >
              نمایش {{ post.blog_comments.length - showCommentsCount }} نظر دیگر
            </button>
          </div>

        </section>
      </article>

      <!-- مقالات مرتبط -->
      <section class="max-w-[1280px] mx-auto px-4 md:px-6 mt-20 md:mt-28 pt-16 border-t border-ink/[0.06]">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-5 h-px bg-gold/60" />
              <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">بیشتر بخوانید</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">مقالات پیشنهادی</h2>
          </div>
          <NuxtLink to="/journal" class="text-xs font-bold text-gold hover:text-ink transition-colors">
            مشاهده همه مقالات ←
          </NuxtLink>
        </div>

        <!-- لودینگ مقالات مرتبط -->
        <div v-if="relatedPending" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="n in 3" :key="n" class="rounded-2xl bg-ink/[0.03] h-64 animate-pulse" />
        </div>

        <div v-else-if="relatedBlogs.length" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <BlogCard
            v-for="b in relatedBlogs"
            :key="b.id"
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

const route = useRoute();

// ─── پالت رنگی ───────────────────────────────────────────
const PALETTE = {
  1: { stripeStart: '#8FC1D9', stripeEnd: '#DFF0F5', iconBg: 'rgba(143,193,217,0.12)', ringColor: 'rgba(143,193,217,0.35)', accent: '#6BA5C4', borderHoverColor: 'rgba(143,193,217,0.25)' },
  2: { stripeStart: '#B9A6DE', stripeEnd: '#EDE6F8', iconBg: 'rgba(185,166,222,0.12)', ringColor: 'rgba(185,166,222,0.35)', accent: '#9C87C4', borderHoverColor: 'rgba(185,166,222,0.25)' },
  3: { stripeStart: '#9CBFA0', stripeEnd: '#E3EFE4', iconBg: 'rgba(156,191,160,0.12)', ringColor: 'rgba(156,191,160,0.35)', accent: '#7BA582', borderHoverColor: 'rgba(156,191,160,0.25)' },
  4: { stripeStart: '#F2A868', stripeEnd: '#FBE4CD', iconBg: 'rgba(242,168,104,0.12)', ringColor: 'rgba(242,168,104,0.35)', accent: '#D68C4B', borderHoverColor: 'rgba(242,168,104,0.22)' },
  5: { stripeStart: '#F3B4B0', stripeEnd: '#FCE4E2', iconBg: 'rgba(243,180,176,0.12)', ringColor: 'rgba(243,180,176,0.35)', accent: '#DE8E89', borderHoverColor: 'rgba(243,180,176,0.25)' },
};
const DEFAULT_PALETTE = { stripeStart: '#E0B758', stripeEnd: '#F9F2DC', iconBg: 'rgba(224,183,88,0.10)', ringColor: 'rgba(224,183,88,0.30)', accent: '#C29A45', borderHoverColor: 'rgba(224,183,88,0.22)' };

// ─── State ───────────────────────────────────────────────
const post              = ref(null);
const pending            = ref(true);
const error              = ref(null);
const relatedBlogs       = ref([]);
const relatedPending     = ref(false);
const showCommentsCount  = ref(5);
const activeImageIndex   = ref(0);
const copied             = ref(false);
const readingProgress    = ref(0);
const articleRef         = ref(null);

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
  PALETTE[post.value?.category] ?? DEFAULT_PALETTE
);

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

const visibleComments = computed(() =>
  (post.value?.blog_comments || []).slice(0, showCommentsCount.value)
);

function formatCommentDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr.replace(' ', 'T')).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  } catch { return ''; }
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

/* ترنزیشن تعویض عکس گالری */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
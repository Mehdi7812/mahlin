<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">

    <!-- هدر مجله -->
    <header class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
      <div class="flex items-center justify-center gap-2 mb-3">
        <span class="w-6 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">خواندنی‌های پوست و زیبایی</span>
        <span class="w-6 h-px bg-gold/60"></span>
      </div>
      <h1 class="text-3xl md:text-4.5xl font-display text-ink font-bold mb-4">مجله تخصصی ماهلین</h1>
      <p class="text-ink/60 text-sm sm:text-base leading-relaxed">
        اسرار علمی مراقبت از پوست، بررسی تخصصی ترکیبات آرایشی و راهکارهای تاییدشده توسط متخصصین درماتولوژی.
      </p>
    </header>

    <!-- تب‌های دسته‌بندی -->
    <div
      v-if="blogCategories.length > 1"
      class="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-6 mb-10 border-b border-ink/[0.06] scrollbar-none"
    >
      <button
        v-for="tab in blogCategories"
        :key="tab.value"
        @click="selectCategory(tab)"
        class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 transform-gpu"
        :class="activeCategoryId === tab.value
          ? 'bg-ink text-cream shadow-lg shadow-ink/5 scale-105'
          : 'bg-card text-ink/60 hover:text-ink hover:bg-cardLight border border-ink/[0.03]'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- لودینگ -->
    <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      <div
        v-for="n in 6" :key="n"
        class="rounded-2xl border border-ink/[0.06] bg-ink/[0.03] h-72 animate-pulse"
      />
    </div>

    <!-- خطا -->
    <div v-else-if="error" class="text-center py-20 text-ink/40 text-sm">
      <svg class="w-10 h-10 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
      </svg>
      خطا در دریافت مقالات
    </div>

    <!-- گرید مقالات -->
    <TransitionGroup
      v-else
      tag="div"
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in absolute"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
      class="relative"
    >
      <!-- خالی -->
      <div
        v-if="blogs.length === 0"
        key="empty"
        class="text-center py-20"
      >
        <p class="text-ink/40 text-sm">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
      </div>

      <div v-else key="content" class="space-y-12">

        <!-- مقاله ویژه — فقط در «همه» و صفحه اول -->
        <BlogFeaturedBlogCard
          v-if="activeCategoryId === null && currentPage === 1 && blogs.length > 0"
          :blog="blogs[0]"
        />

        <!-- شبکه مقالات -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <BlogCard
            v-for="b in gridBlogs"
            :key="b.id"
            :blog="b"
          />
        </div>

        <!-- پیجینیشن -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-4">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/5 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button
            v-for="p in visiblePages"
            :key="p"
            @click="typeof p === 'number' && goToPage(p)"
            class="w-9 h-9 grid place-items-center rounded-full text-xs font-bold transition-colors"
            :class="p === currentPage
              ? 'bg-ink text-cream'
              : p === '...'
                ? 'text-ink/30 cursor-default'
                : 'border border-ink/10 text-ink hover:bg-ink/5'"
          >
            {{ p === '...' ? '...' : p }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/5 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </TransitionGroup>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// ─── Config ──────────────────────────────────────────────
const AMOUNT = 12;

// ─── State ───────────────────────────────────────────────
const blogs           = ref([]);
const totalCount      = ref(0);
const currentPage     = ref(1);
const activeCategoryId = ref(null);   // null = همه | عدد = id کتگوری
const activeCategoryLabel = ref('همه مقالات');

const pending = ref(true);
const error   = ref(null);

// ─── دسته‌بندی‌ها: از اولین فچ استخراج می‌شن ───────────────
const blogCategories = ref([{ label: 'همه مقالات', value: null }]);

// ─── Fetch ───────────────────────────────────────────────
async function fetchBlogs(page = 1) {
  pending.value = true;
  error.value   = null;

  const params = {
    amount:    String(AMOUNT),
    direction: 'desc',
    order:     'order',
    page,
  };

  // اگه کتگوری انتخاب شده، اضافه‌ش کن
  if (activeCategoryId.value !== null) {
    params.category = String(activeCategoryId.value);
  }

  try {
    const response = await useGarnetApiFetch('blog/indexWithImages', params );

    blogs.value      = response.Blog       || [];
    totalCount.value = response.TotalCount ?? 0;
    currentPage.value = page;

    // استخراج کتگوری‌های یکتا از نتایج (فقط بار اول)
    if (blogCategories.value.length === 1 && blogs.value.length) {
      const seen = new Set();
      const cats = [{ label: 'همه مقالات', value: null }];

      blogs.value.forEach(b => {
        if (b.category && b.category_text_fa && !seen.has(b.category)) {
          seen.add(b.category);
          cats.push({ label: b.category_text_fa, value: b.category });
        }
      });

      blogCategories.value = cats;
    }
  } catch (err) {
    console.error('[Journal] خطا:', err);
    error.value = err;
  } finally {
    pending.value = false;
  }
}

// اولین بارگذاری
await fetchBlogs(1);

// ─── انتخاب کتگوری ───────────────────────────────────────
function selectCategory(tab) {
  if (activeCategoryId.value === tab.value) return;
  activeCategoryId.value    = tab.value;
  activeCategoryLabel.value = tab.label;
  fetchBlogs(1);
}

// ─── Pagination ───────────────────────────────────────────
const totalPages = computed(() => Math.ceil(totalCount.value / AMOUNT));

function goToPage(p) {
  if (p < 1 || p > totalPages.value || p === currentPage.value) return;
  fetchBlogs(p);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const visiblePages = computed(() => {
  const total   = totalPages.value;
  const current = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 0 && i <= total) pages.add(i);
  }

  return Array.from(pages).sort((a, b) => a - b).reduce((acc, p, i, arr) => {
    if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
    acc.push(p);
    return acc;
  }, []);
});

// ─── gridBlogs: بدون مقاله اول (که featured هست) ──────────
const gridBlogs = computed(() => {
  // در «همه» و صفحه اول، اولی featured میشه
  if (activeCategoryId.value === null && currentPage.value === 1 && blogs.value.length > 0) {
    return blogs.value.slice(1);
  }
  return blogs.value;
});
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
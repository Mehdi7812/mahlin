<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14">

    <!-- هدر صفحه فروشگاه -->
    <header class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-5 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">فروشگاه ماهلین</span>
      </div>
      <div class="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-2xl md:text-3.5xl font-display text-ink font-bold mb-2">
            {{ activeCatTitle || 'همه محصولات' }}
          </h1>
          <p class="text-sm text-ink/50">
            {{ fa(totalCount) }} محصول تخصصی برای مراقبت از پوست شما
          </p>
        </div>
      </div>
    </header>

    <!-- نوار ابزار -->
    <div class="sticky top-[71px] md:top-[81px] bg-cream/95 backdrop-blur-md py-4 z-30 -mx-4 px-4 md:mx-0 md:px-0 border-b border-ink/[0.03] md:border-b-0 mb-8 transition-all">
      <div class="flex flex-col md:flex-row gap-3 w-full">

        <!-- جستجو -->
        <div class="relative flex-1 w-full" ref="searchContainerRef">
          <svg class="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none z-[1]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="6.5"/>
            <path d="M20 20 L16 16" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="جستجو در محصولات ماهلین..."
            class="w-full bg-card border border-ink/[0.05] rounded-full ps-11 pe-4 h-11 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/40 transition-colors"
            @focus="onSearchFocus"
          />

          <!-- ─── دراپ‌داون نتایج جستجوی سریع ─── -->
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
              class="absolute inset-x-0 mt-2 bg-card border border-ink/[0.06] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden transform-gpu"
            >
              <!-- لودینگ -->
              <div v-if="searchLoading" class="p-4 space-y-3">
                <div v-for="n in 3" :key="n" class="flex items-center gap-3 animate-pulse">
                  <div class="w-12 h-12 rounded-xl bg-ink/[0.06] shrink-0"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-3 w-3/4 bg-ink/[0.06] rounded-full"></div>
                    <div class="h-2.5 w-1/3 bg-ink/[0.06] rounded-full"></div>
                  </div>
                </div>
              </div>

              <!-- نتایج -->
              <div v-else-if="searchResults.length" class="max-h-[420px] overflow-y-auto">
                <button
                  v-for="r in searchResults"
                  :key="r.id"
                  type="button"
                  class="w-full flex items-center gap-3 px-4 py-3 hover:bg-cardLight transition-colors text-right border-b border-ink/[0.04] last:border-b-0"
                  @click="goToSearchResult(r)"
                >
                  <img
                    :src="r.cover_image"
                    :alt="r.title_fa"
                    class="w-12 h-12 rounded-xl object-cover shrink-0 bg-ink/[0.04]"
                    @error="(e) => e.target.style.opacity = '0.3'"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-xs sm:text-sm font-bold text-ink truncate">{{ r.title_fa }}</p>
                    <p class="text-[10px] text-ink/40 mt-0.5">{{ r.category_title_fa }}</p>
                  </div>
                  <div class="text-left shrink-0">
                    <div v-if="r.discount > 0" class="text-[10px] text-ink/35 line-through font-latin">
                      {{ money(r.price) }}
                    </div>
                    <div class="text-xs font-bold font-latin text-gold">
                      {{ money(r.final_price) }} <span class="text-[9px] text-ink/40 font-sans">تومان</span>
                    </div>
                  </div>
                </button>

                <!-- مشاهده همه نتایج -->
                <button
                  type="button"
                  class="w-full text-center py-3 text-xs font-bold text-gold hover:bg-cardLight transition-colors"
                  @click="submitFullSearch"
                >
                  مشاهده همه نتایج برای «{{ searchQuery }}» ←
                </button>
              </div>

              <!-- بدون نتیجه -->
              <div v-else class="flex flex-col items-center justify-center text-center py-8 px-4">
                <svg class="w-8 h-8 text-ink/20 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="11" cy="11" r="7"/>
                  <path d="M21 21l-4.3-4.3" stroke-linecap="round"/>
                </svg>
                <p class="text-xs text-ink/45">نتیجه‌ای برای «{{ searchQuery }}» یافت نشد</p>
              </div>
            </div>
          </Transition>
        </div>

        <!-- دکمه‌ها -->
        <div class="flex items-center gap-3 w-full md:w-auto">

          <!-- فیلتر موبایل -->
          <button
            @click="mobileFilterOpen = true"
            class="md:hidden flex-1 flex items-center justify-center gap-2 h-11 bg-ink text-cream rounded-full text-xs font-bold relative transform-gpu active:scale-95 transition-transform"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>فیلترهای پیشرفته</span>
            <span
              v-if="activeFiltersCount > 0"
              class="absolute -top-1 -end-1 w-5.5 h-5.5 bg-gold text-card text-[10px] rounded-full grid place-items-center font-bold"
            >
              {{ fa(activeFiltersCount) }}
            </span>
          </button>

          <!-- مرتب‌سازی -->
          <div class="relative flex-1 md:flex-initial" ref="sortDropdownRef">
            <button
              type="button"
              @click="isSortOpen = !isSortOpen"
              class="w-full md:w-auto flex items-center justify-between md:justify-start gap-2.5 bg-card hover:bg-cardLight border border-ink/[0.06] hover:border-gold/30 rounded-full px-5 h-11 text-xs sm:text-sm font-bold text-ink transition-all duration-300 focus:outline-none transform-gpu"
            >
              <span class="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="text-ink/50">
                  <path d="M3 6h18M6 12h12M10 18h8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-ink/60 md:inline hidden">مرتب‌سازی:</span>
                <span class="text-ink font-extrabold">{{ currentSortLabel }}</span>
              </span>
              <svg
                class="text-ink/40 transition-transform duration-300 transform-gpu"
                :class="isSortOpen ? 'rotate-180' : 'rotate-0'"
                width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1.5 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-1.5 scale-95"
            >
              <div
                v-if="isSortOpen"
                class="absolute end-0 md:start-auto mt-2 w-full md:w-48 bg-card border border-ink/[0.06] rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.06)] py-2 z-50 transform-gpu"
              >
                <button
                  v-for="opt in sortOptions"
                  :key="opt.value + opt.direction"
                  type="button"
                  @click="selectSort(opt)"
                  class="w-full text-right px-4 py-3 text-xs sm:text-sm transition-colors flex items-center justify-between"
                  :class="sortBy === opt.value && sortDirection === opt.direction ? 'text-gold font-bold bg-gold/5' : 'text-ink/70 hover:bg-cardLight hover:text-ink'"
                >
                  <span>{{ opt.label }}</span>
                  <svg v-if="sortBy === opt.value && sortDirection === opt.direction" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-gold">
                    <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </Transition>
          </div>

        </div>
      </div>
    </div>

    <!-- گرید: سایدبار + محصولات -->
    <div class="flex gap-8 lg:gap-10">

      <!-- سایدبار -->
      <aside class="w-[260px] hidden md:block shrink-0">
        <ShopFilterPanel
          :debounce-delay="2000"
          :cats="categories"
          :active-cat-id="activeCatId"
          :price-range="priceRange"
          :max-price="maxPrice"
          :cat-counts="catCounts"
          :total-count="totalCount"
          :active-filters-count="activeFiltersCount"
          @toggle-cat="toggleCat"
          @update-price="updatePriceRange"
          @reset="resetAll"
        />
      </aside>

      <!-- محصولات -->
      <div class="flex-1 min-w-0">

        <!-- لودینگ -->
        <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div
            v-for="n in 6" :key="n"
            class="rounded-2xl border border-ink/[0.06] bg-ink/[0.03] h-72 animate-pulse"
          />
        </div>

        <!-- خطا -->
        <div v-else-if="error" class="text-center py-20 bg-card rounded-[24px] border border-ink/[0.03]">
          <svg class="w-10 h-10 mx-auto mb-3 text-ink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
          </svg>
          <p class="text-sm text-ink/50">خطا در دریافت محصولات</p>
        </div>

        <!-- نتیجه خالی -->
        <div v-else-if="products.length === 0" class="text-center py-20 bg-card rounded-[24px] border border-ink/[0.03]">
          <div class="w-16 h-16 mx-auto bg-gold/10 text-gold rounded-full flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="text-base font-bold text-ink mb-2">محصولی یافت نشد</h3>
          <p class="text-sm text-ink/50 mb-5">هیچ محصولی با این فیلترها موجود نیست.</p>
          <button
            @click="resetAll"
            class="px-5 py-2.5 bg-ink hover:bg-gold hover:text-ink text-cream text-xs font-bold rounded-full transition-colors"
          >
            پاک‌سازی همه فیلترها
          </button>
        </div>

        <!-- شبکه محصولات -->
        <template v-else>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <ProductCard
              v-for="p in products"
              :key="p.id"
              :product="p"
            />
          </div>

          <!-- پیجینیشن -->
          <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
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
              v-for="(p, i) in visiblePages"
              :key="`${p}-${i}`"
              @click="typeof p === 'number' && goToPage(p)"
              class="w-9 h-9 grid place-items-center rounded-full text-xs font-bold transition-colors"
              :class="p === currentPage
                ? 'bg-ink text-cream'
                : p === '...'
                  ? 'text-ink/30 cursor-default'
                  : 'border border-ink/10 text-ink hover:bg-ink/5'"
            >
              {{ p === '...' ? '...' : fa(p) }}
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
        </template>

      </div>
    </div>

    <!-- Drawer موبایل -->
    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="mobileFilterOpen" @click="mobileFilterOpen = false" class="fixed inset-0 z-50 bg-ink/40 md:hidden" />
      </Transition>

      <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-y-full" enter-to-class="translate-y-0" leave-active-class="transition-transform duration-250 ease-in" leave-from-class="translate-y-0" leave-to-class="translate-y-full">
        <div v-if="mobileFilterOpen" class="fixed inset-x-0 bottom-0 z-50 bg-cream rounded-t-[32px] md:hidden max-h-[85vh] flex flex-col shadow-2xl">
          <div class="flex items-center justify-between p-5 border-b border-ink/[0.06]">
            <h3 class="text-base font-bold text-ink">فیلتر و جستجو</h3>
            <button @click="mobileFilterOpen = false" class="w-8 h-8 grid place-items-center rounded-full hover:bg-ink/5">
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="overflow-y-auto p-5 flex-1">
            <ShopFilterPanel
              :debounce-delay="2000"
              :cats="categories"
              :active-cat-id="activeCatId"
              :price-range="priceRange"
              :max-price="maxPrice"
              :cat-counts="catCounts"
              :total-count="totalCount"
              :active-filters-count="activeFiltersCount"
              @toggle-cat="toggleCat"
              @update-price="updatePriceRange"
              @reset="resetAll"
            />
          </div>

          <div class="p-5 border-t border-ink/[0.06] bg-cream">
            <button @click="mobileFilterOpen = false" class="w-full py-3.5 bg-ink text-cream rounded-full font-bold text-sm">
              مشاهده {{ fa(totalCount) }} محصول
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { fa, money } from '~/utils/format.ts';

const route  = useRoute();
const router = useRouter();

// ─── Sort ────────────────────────────────────────────────
const isSortOpen      = ref(false);
const sortDropdownRef = ref(null);

// گزینه‌های مرتب‌سازی — value با API ست شده
const sortOptions = [
  { label: 'پیش‌فرض',   value: 'order',   direction: 'desc' },
  { label: 'جدیدترین',   value: 'created', direction: 'desc' },
  { label: 'ارزان‌ترین', value: 'price',   direction: 'asc'  },
  { label: 'گران‌ترین',  value: 'price',   direction: 'desc' },
  { label: 'پربازدید',   value: 'visits',  direction: 'desc' },
];

const sortBy        = ref('order');
const sortDirection = ref('desc');

const currentSortLabel = computed(() =>
  sortOptions.find(o => o.value === sortBy.value && o.direction === sortDirection.value)?.label ?? 'پیش‌فرض'
);

function selectSort(opt) {
  sortBy.value        = opt.value;
  sortDirection.value = opt.direction;
  isSortOpen.value    = false;
  currentPage.value   = 1;
  fetchProducts();
}

function handleClickOutside(e) {
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(e.target)) {
    isSortOpen.value = false;
  }
  if (searchContainerRef.value && !searchContainerRef.value.contains(e.target)) {
    showSearchDropdown.value = false;
  }
}

onMounted(() => { if (import.meta.client) window.addEventListener('click', handleClickOutside); });
onUnmounted(() => { if (import.meta.client) window.removeEventListener('click', handleClickOutside); });

// ─── State ────────────────────────────────────────────────
const searchQuery       = ref('');
const mobileFilterOpen  = ref(false);
const priceRange        = ref([0, 50000000]);
const maxPrice          = ref(50000000);

// ─── جستجوی سریع (Quick Search Dropdown) ───────────────────
const searchContainerRef = ref(null);
const showSearchDropdown = ref(false);
const searchResults      = ref([]);
const searchLoading      = ref(false);

async function fetchSearchSuggestions(word) {
  if (!word) {
    searchResults.value      = [];
    showSearchDropdown.value = false;
    return;
  }

  searchLoading.value      = true;
  showSearchDropdown.value = true;

  try {
    const response = await useGarnetApiFetch('reports/search', {
      amount:     5,
      direction:  'desc',
      order:      'id',
      page:       1,
      searchWord: word,
    });

    if (response?.code === 2000) {
      searchResults.value = response.Result || [];
    } else {
      searchResults.value = [];
    }
  } catch (e) {
    console.error('[Shop] خطا در جستجوی سریع:', e);
    searchResults.value = [];
  } finally {
    searchLoading.value = false;
  }
}

function onSearchFocus() {
  if (searchQuery.value.trim()) {
    showSearchDropdown.value = true;
  }
}

function goToSearchResult(item) {
  showSearchDropdown.value = false;
  router.push(`/product/${item.id}/${item.slug_fa}`);
}

function submitFullSearch() {
  showSearchDropdown.value = false;
  currentPage.value = 1;
  fetchProducts();
}

// ─── Data از API ──────────────────────────────────────────
const products    = ref([]);
const categories  = ref([]);   // از categories API جدا پر میشه
const totalCount  = ref(0);
const currentPage = ref(1);
const PAGE_SIZE   = 24;
const pending     = ref(true);
const error       = ref(null);

const totalPages = computed(() => Math.ceil(totalCount.value / PAGE_SIZE));

// ─── Query params ─────────────────────────────────────────
const activeCatId = computed(() => {
  const v = route.query.cat_id;
  return v ? Number(v) : null;
});

const activeCatTitle = computed(() =>
  categories.value.find(c => c.id === activeCatId.value)?.title_fa ?? null
);

// تعداد محصول هر کتگوری (بر اساس نتایج صفحه فعلی)
const catCounts = computed(() => {
  const counts = {};
  categories.value.forEach(c => { counts[c.id] = 0; });
  products.value.forEach(p => {
    if (counts[p.category] !== undefined) counts[p.category]++;
  });
  return counts;
});

const activeFiltersCount = computed(() => {
  let n = 0;
  if (activeCatId.value) n++;
  if (priceRange.value[0] > 0 || priceRange.value[1] < maxPrice.value) n++;
  if (searchQuery.value.trim()) n++;
  return n;
});

// ─── Fetch محصولات ──────────────────────────────────────────
async function fetchProducts() {
  pending.value = true;
  error.value   = null;

  const payload = {
    allowSale:  0,
    amount:     PAGE_SIZE,
    direction:  sortDirection.value,
    filters:    [],
    order:      sortBy.value,
    page:       currentPage.value,
    typeCode:   0,
    withAttrib: true,
  };

  // کتگوری
  if (activeCatId.value) {
    payload.category = String(activeCatId.value);
  }

  // جستجو
  // if (searchQuery.value.trim()) {
  //   payload.searchWord = searchQuery.value.trim();
  // }

  // فیلتر قیمت (حالا هم min و هم max واقعی از فیلتر می‌آد)
  if (priceRange.value[0] > 0 || priceRange.value[1] < maxPrice.value) {
    payload.minPrice = priceRange.value[0];
    payload.maxPrice = priceRange.value[1];
  }

  try {
    const response = await useGarnetApiFetch('products/indexLite', payload);

    products.value   = response.Products   || [];
    totalCount.value = response.TotalCount ?? 0;

    // maxPrice رو از بیشترین قیمت محصولات بساز (فقط بار اول)
    if (maxPrice.value === 50000000 && products.value.length) {
      const max = Math.max(...products.value.map(p => p.price || 0));
      if (max > 0) {
        maxPrice.value      = max;
        priceRange.value[1] = max;
      }
    }
  } catch (err) {
    console.error('[Shop] خطا در دریافت محصولات:', err);
    error.value = err;
  } finally {
    pending.value = false;
  }
}

// ─── کتگوری‌ها از API جداگانه ─────────────────────────────
async function fetchCategories() {
  try {
    const res = await useGarnetApiFetch('products/categoryIndex');
    categories.value = (res.ProductCategories || [])
      .filter(c => c.status === 1 && c.parent_id === null)
      .sort((a, b) => b.order - a.order);
  } catch (e) {
    console.warn('[Shop] خطا در دریافت کتگوری‌ها:', e);
  }
}

// ─── اولین بار ───────────────────────────────────────────
await fetchCategories();
await fetchProducts();

// ─── Watch: تغییر کتگوری از URL ──────────────────────────
watch(activeCatId, () => {
  currentPage.value = 1;
  fetchProducts();
});

// ─── Watch: جستجو (debounce برای گرید اصلی + دراپ‌داون سریع) ─
let searchTimer = null;
watch(searchQuery, (val) => {
  clearTimeout(searchTimer);

  const trimmed = val.trim();

  if (!trimmed) {
    showSearchDropdown.value = false;
    searchResults.value      = [];
  }

  searchTimer = setTimeout(() => {
    currentPage.value = 1;
    // fetchProducts();
    fetchSearchSuggestions(trimmed);
  }, 400);
});

// ─── Pagination ───────────────────────────────────────────
function goToPage(p) {
  if (p < 1 || p > totalPages.value) return;
  currentPage.value = p;
  fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// صفحات قابل نمایش با ellipsis
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

// ─── Helpers ──────────────────────────────────────────────
function toggleCat(catId) {
  router.push({
    path: '/shop',
    query: activeCatId.value === catId ? {} : { cat_id: catId },
  });
}

// این تابع فقط پس از اتمام debounce داخل ShopFilterPanel صدا زده می‌شود
function updatePriceRange(range) {
  priceRange.value  = range;
  currentPage.value = 1;
  fetchProducts();
}

function resetAll() {
  router.push({ path: '/shop' });
  priceRange.value    = [0, maxPrice.value];
  searchQuery.value   = '';
  sortBy.value        = 'order';
  sortDirection.value = 'desc';
  currentPage.value   = 1;
  showSearchDropdown.value = false;
  searchResults.value = [];
  fetchProducts();
}
</script>
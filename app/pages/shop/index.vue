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
            {{ activeCat ? activeCat : 'همه محصولات' }}
          </h1>
          <p class="text-sm text-ink/50">{{ fa(filtered.length) }} محصول تخصصی برای مراقبت از پوست شما</p>
        </div>
      </div>
    </header>

    <!-- نوار ابزار فوق‌العاده مدرن (موبایل: ساختار دو ردیفه ارگونومیک / دسکتاپ: تک ردیفه کشیده) -->
    <div class="sticky top-[71px] md:top-[81px] bg-cream/95 backdrop-blur-md py-4 z-30 -mx-4 px-4 md:mx-0 md:px-0 border-b border-ink/[0.03] md:border-b-0 mb-8 transition-all">
      <div class="flex flex-col md:flex-row gap-3 w-full">
        
        <!-- ۱. باکس جستجوی عریض -->
        <div class="relative flex-1 w-full">
          <svg class="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="6.5"/>
            <path d="M20 20 L16 16" stroke-linecap="round"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="search"
            placeholder="جستجو در محصولات ماهلین..."
            class="w-full bg-card border border-ink/[0.05] rounded-full ps-11 pe-4 h-11 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        <!-- ۲. بخش دکمه‌ها (در موبایل ۵۰-۵۰ جفت می‌شوند و در دسکتاپ کنار جستجو قرار می‌گیرند) -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          
          <!-- دکمه باز کردن فیلترهای موبایل (۵۰٪ عرض در موبایل) -->
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

          <!-- دراپ‌داون مرتب‌سازی سفارشی (۵۰٪ عرض در موبایل) -->
          <div class="relative flex-1 md:flex-initial" ref="sortDropdownRef">
            
            <!-- دکمه تریگر سورت -->
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

            <!-- منوی گزینه‌های مرتب‌سازی (کاملاً ریسپانسیو و تراز شده) -->
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
                style="backface-visibility: hidden;"
              >
                <button
                  v-for="opt in sortOptions"
                  :key="opt.value"
                  type="button"
                  @click="selectSort(opt.value)"
                  class="w-full text-right px-4 py-3 text-xs sm:text-sm transition-colors flex items-center justify-between"
                  :class="sortBy === opt.value ? 'text-gold font-bold bg-gold/5' : 'text-ink/70 hover:bg-cardLight hover:text-ink'"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="sortBy === opt.value"
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    class="text-gold"
                  >
                    <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </Transition>
          </div>

        </div>
      </div>
    </div>

    <!-- گرید اصلی: سایدبار + محصولات -->
    <div class="flex gap-8 lg:gap-10">
      
      <!-- سایدبار فیلترها (فقط دسکتاپ) -->
      <aside class="w-[260px] hidden md:block shrink-0">
        <ShopFilterPanel 
          :cats="CATS"
          :brands="brands"
          :active-cat="activeCat"
          :active-brand="activeBrand"
          :price-range="priceRange"
          :max-price="maxPrice"
          :cat-counts="catCounts"
          :active-filters-count="activeFiltersCount"
          @toggle-cat="toggleCat"
          @toggle-brand="toggleBrand"
          @update-price="updatePriceRange"
          @reset="resetAll"
        />
      </aside>

      <!-- بخش محصولات -->
      <div class="flex-1 min-w-0">
        
        <!-- در صورتی که محصولی یافت نشد -->
        <div v-if="filtered.length === 0" class="text-center py-20 bg-card rounded-[24px] border border-ink/[0.03]">
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
        <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ProductCard 
            v-for="p in filtered" 
            :key="p.id" 
            :product="p" 
          />
        </div>
      </div>
    </div>

    <!-- Drawer فیلترها در حالت موبایل -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="mobileFilterOpen" 
          @click="mobileFilterOpen = false"
          class="fixed inset-0 z-50 bg-ink/40 md:hidden"
        />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition-transform duration-250 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
      >
        <div 
          v-if="mobileFilterOpen" 
          class="fixed inset-x-0 bottom-0 z-50 bg-cream rounded-t-[32px] md:hidden max-h-[85vh] flex flex-col shadow-2xl"
        >
          <div class="flex items-center justify-between p-5 border-b border-ink/[0.06]">
            <h3 class="text-base font-bold text-ink">فیلتر و جستجو</h3>
            <button 
              @click="mobileFilterOpen = false"
              class="w-8 h-8 grid place-items-center rounded-full hover:bg-ink/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M5 5 L19 19 M19 5 L5 19" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="overflow-y-auto p-5 flex-1">
            <ShopFilterPanel 
              :cats="CATS"
              :brands="brands"
              :active-cat="activeCat"
              :active-brand="activeBrand"
              :price-range="priceRange"
              :max-price="maxPrice"
              :cat-counts="catCounts"
              :active-filters-count="activeFiltersCount"
              @toggle-cat="toggleCat"
              @toggle-brand="toggleBrand"
              @update-price="updatePriceRange"
              @reset="resetAll"
            />
          </div>

          <div class="p-5 border-t border-ink/[0.06] bg-cream">
            <button 
              @click="mobileFilterOpen = false"
              class="w-full py-3.5 bg-ink text-cream rounded-full font-bold text-sm"
            >
              مشاهده {{ fa(filtered.length) }} محصول
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { PRODUCTS, CATS } from '~/data/products';
import { fa } from '~/utils/format';

const route = useRoute();
const router = useRouter();

// استیت‌های مربوط به کامپوننت مرتب‌سازی جدید
const isSortOpen = ref(false);
const sortDropdownRef = ref(null);

const sortOptions = [
  { label: 'پیش‌فرض', value: 'default' },
  { label: 'جدیدترین', value: 'newest' },
  { label: 'ارزان‌ترین', value: 'cheap' },
  { label: 'گران‌ترین', value: 'expensive' }
];

const currentSortLabel = computed(() => {
  const active = sortOptions.find(o => o.value === sortBy.value);
  return active ? active.label : 'پیش‌فرض';
});

function selectSort(value) {
  sortBy.value = value;
  isSortOpen.value = false;
}

function handleClickOutside(event) {
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(event.target)) {
    isSortOpen.value = false;
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('click', handleClickOutside);
  }
});

// سایر استیت‌ها و داده‌ها
const searchQuery = ref('');
const sortBy = ref('default');
const activeBrand = ref(null);
const mobileFilterOpen = ref(false);

const maxPrice = computed(() => {
  if (!PRODUCTS || PRODUCTS.length === 0) return 10000000;
  return Math.max(...PRODUCTS.map(p => p.price || 0));
});

const priceRange = ref([0, 10000000]);

watch(maxPrice, (val) => {
  priceRange.value = [0, val];
}, { immediate: true });

const activeCat = computed(() => route.query.cat || null);

const brands = computed(() => {
  const set = new Set();
  PRODUCTS.forEach(p => {
    if (p.brand) set.add(p.brand);
  });
  return Array.from(set);
});

const catCounts = computed(() => {
  const counts = {};
  CATS.forEach(c => {
    counts[c] = PRODUCTS.filter(p => p.cat === c).length;
  });
  return counts;
});

const filtered = computed(() => {
  let result = [...PRODUCTS];
  
  if (activeCat.value) {
    result = result.filter(p => p.cat === activeCat.value);
  }
  
  if (activeBrand.value) {
    result = result.filter(p => p.brand === activeBrand.value);
  }
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    result = result.filter(p => 
      p.name?.toLowerCase().includes(q) || 
      p.latin?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    );
  }
  
  result = result.filter(p => 
    p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  );
  
  if (sortBy.value === 'cheap') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'expensive') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'newest') {
    result.reverse();
  }
  
  return result;
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (activeCat.value) count++;
  if (activeBrand.value) count++;
  if (priceRange.value[0] > 0 || priceRange.value[1] < maxPrice.value) count++;
  return count;
});

function toggleCat(c) {
  router.push({ path: '/shop', query: activeCat.value === c ? {} : { cat: c } });
}

function toggleBrand(b) {
  activeBrand.value = activeBrand.value === b ? null : b;
}

function updatePriceRange(range) {
  priceRange.value = range;
}

function resetAll() {
  router.push({ path: '/shop' });
  activeBrand.value = null;
  searchQuery.value = '';
  priceRange.value = [0, maxPrice.value];
  sortBy.value = 'default';
}
</script>
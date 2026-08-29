<template>
  <div v-if="item" class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16">
    
    <!-- ناوبری مسیر خرید (Breadcrumb) -->
    <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8 flex-wrap">
      <NuxtLink to="/" class="hover:text-gold transition-colors">خانه</NuxtLink>
      <span>/</span>
      <NuxtLink to="/shop" class="hover:text-gold transition-colors">فروشگاه</NuxtLink>
      <span>/</span>
      <span class="text-ink font-bold line-clamp-1">{{ item.name }}</span>
    </nav>

    <!-- گرید اصلی محصول -->
    <div class="grid md:grid-cols-12 gap-8 lg:gap-16 items-start">
      
      <!-- ستون سمت راست: تصویر با قاب نامتقارن نمادین ماهلین -->
      <div class="md:col-span-5 md:sticky md:top-[100px]">
        <div class="aspect-square bg-cardLight border border-ink/[0.04] rounded-tr-[80px] sm:rounded-tr-[100px] rounded-[24px] relative overflow-hidden flex items-center justify-center p-8 group">
          <img 
            :src="item.img || PLACEHOLDER_IMG" 
            :alt="item.name" 
            loading="lazy"
            class="w-[80%] h-[80%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/[0.02] to-transparent pointer-events-none" />
        </div>
      </div>

      <!-- ستون سمت چپ: جزئیات خرید و مشخصات تخصصی -->
      <div class="md:col-span-7 space-y-6">
        <div>
          <!-- برند تخصصی -->
          <span v-if="item.brand" class="text-xs text-gold font-latin font-bold uppercase tracking-widest block mb-1">
            {{ item.brand }}
          </span>
          <!-- عنوان محصول -->
          <h1 class="text-2xl sm:text-3.5xl font-display text-ink font-bold leading-tight">{{ item.name }}</h1>
          <!-- عنوان فرعی یا لاتین -->
          <span class="block text-xs sm:text-sm text-ink/40 font-latin uppercase mt-1">{{ item.latin }}</span>
        </div>

        <!-- توضیح کوتاه معرفی کالا -->
        <p class="text-sm sm:text-base text-ink/70 leading-relaxed max-w-[620px]">{{ item.desc }}</p>

        <!-- بخش قیمت و مشخصات حجم کالا -->
        <div class="flex items-center gap-4 py-4 px-5 bg-card border border-ink/[0.03] rounded-2xl max-w-[400px]">
          <div>
            <span class="block text-[10px] text-ink/40 mb-0.5">قیمت محصول</span>
            <div class="text-xl sm:text-2xl font-bold text-accent font-latin">
              {{ money(item.price) }}
              <span class="text-xs text-ink/50 font-normal font-sans mr-0.5">تومان</span>
            </div>
          </div>
          <div v-if="item.size" class="mr-auto pr-4 border-r border-ink/10 text-left">
            <span class="block text-[10px] text-ink/40 mb-0.5">حجم / مقدار</span>
            <span class="text-sm font-bold text-ink font-latin">{{ item.size }}</span>
          </div>
        </div>

        <!-- کنترل تعداد و دکمه افزودن به سبد خرید -->
        <div class="flex items-center gap-3 max-w-[480px] pt-3 pb-6 border-b border-ink/[0.06]">
          <!-- دکمه کنترلر تعداد -->
          <div class="flex items-center bg-cardLight rounded-full h-12 overflow-hidden border border-ink/[0.04]">
            <button 
              @click="qty = Math.max(1, qty - 1)" 
              class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors"
            >−</button>
            <span class="w-8 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
            <button 
              @click="qty++" 
              class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors"
            >+</button>
          </div>

          <!-- دکمه لوکس افزودن به سبد خرید -->
          <button 
            @click="add(item.id, qty)"
            class="flex-1 h-12 bg-ink hover:bg-gold hover:text-ink text-cream rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu active:scale-98"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
              <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
            </svg>
            <span>افزودن به سبد خرید</span>
          </button>
        </div>

        <!-- سیستم آکاردئونی مینی‌مال لوکس با انیمیشن گرافیکی سخت‌افزاری -->
        <div class="space-y-1">
          <!-- ۱. تب توضیحات تکمیلی -->
          <div v-if="item.long" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('long')"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>توضیحات و فواید محصول</span>
              <!-- آیکون پلاس تعاملی و در حال چرخش طلایی -->
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'long' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'long' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            
            <!-- بدنه آکاردئون با باز شدن نرم گرافیکی -->
            <div 
              class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]"
              :class="activeTab === 'long' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'"
            >
              <div class="overflow-hidden">
                <div class="text-xs sm:text-sm text-ink/60 leading-loose space-y-3">
                  <p>{{ item.long }}</p>
                  <p v-if="item.suited" class="pt-2"><b class="text-ink">مناسب برای نوع پوست:</b> {{ item.suited }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ۲. تب ترکیبات کلیدی -->
          <div v-if="item.inci" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('inci')"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>ترکیبات کلیدی و علمی (Inci)</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'inci' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'inci' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            
            <div 
              class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]"
              :class="activeTab === 'inci' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'"
            >
              <div class="overflow-hidden">
                <div class="py-2 grid sm:grid-cols-2 gap-3">
                  <div v-for="i in item.inci" :key="i.latin" class="p-3.5 bg-cardLight rounded-xl border border-ink/[0.02]">
                    <span class="block font-latin font-bold text-xs text-ink mb-0.5">{{ i.latin }}</span>
                    <span class="block text-xs text-ink/50">{{ i.fa }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ۳. تب روش استفاده -->
          <div v-if="item.usage" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('usage')"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>راهنمای و روش استفاده</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'usage' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'usage' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            
            <div 
              class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]"
              :class="activeTab === 'usage' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'"
            >
              <div class="overflow-hidden">
                <div class="py-2">
                  <ol class="space-y-3">
                    <li v-for="(u, i) in item.usage" :key="i" class="flex items-start gap-3.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                      <span class="w-5.5 h-5.5 rounded-full bg-gold/10 text-gold text-[11px] font-bold font-latin grid place-items-center mt-0.5 shrink-0">{{ fa(i + 1) }}</span>
                      <p class="pt-0.5">{{ u }}</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <!-- ۴. تب احتیاط‌ها -->
          <div v-if="item.caution" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('caution')"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-accent py-2.5 transition-colors group"
            >
              <span>احتیاط‌ها و هشدارهای پوستی</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-accent/80 rounded transition-transform duration-300" :class="activeTab === 'caution' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-accent/80 rounded transition-transform duration-300" :class="activeTab === 'caution' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            
            <div 
              class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]"
              :class="activeTab === 'caution' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'"
            >
              <div class="overflow-hidden">
                <div class="py-2">
                  <ul class="space-y-2 list-disc pr-4 text-xs sm:text-sm text-ink/60 leading-relaxed">
                    <li v-for="(c, i) in item.caution" :key="i">{{ c }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- بخش نظرات خریداران -->
    <section v-if="item.reviews" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
      <div class="flex items-center gap-2 mb-8">
        <span class="w-6 h-px bg-gold/60"></span>
        <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">نظرات و تجربیات خریداران</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(r, i) in item.reviews" :key="i" class="p-6 bg-card border border-ink/[0.03] rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="font-bold text-ink flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-gold/10 text-gold grid place-items-center text-[10px] font-bold">{{ r.name.charAt(0) }}</span>
                {{ r.name }}
              </span>
              <span class="text-ink/40 font-latin">{{ r.date }}</span>
            </div>
            <!-- رندر ستاره‌های مینی‌مال طلایی -->
            <div class="flex gap-0.5 text-gold text-sm mb-3">
              <span v-for="star in parseStars(r.stars)" :key="star">★</span>
            </div>
            <p class="text-xs sm:text-sm text-ink/70 leading-relaxed">{{ r.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- بخش محصولات مشابه پیشنهادی -->
    <section class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2">
          <span class="w-6 h-px bg-gold/60"></span>
          <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">محصولات مشابه پیشنهادی</h2>
        </div>
        <NuxtLink to="/shop" class="text-xs font-bold text-gold hover:text-ink transition-colors">مشاهده همه فروشگاه ←</NuxtLink>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PRODUCTS, PLACEHOLDER_IMG } from '~/data/products';
import { money, fa } from '~/utils/format';

const route = useRoute();
const qty = ref(1);
const activeTab = ref('long'); // آکاردئون پیش‌فرضِ باز: توضیحات

const { add } = useCart();

// پیدا کردن محصول فعلی بر اساس شناسه مسیر
const item = computed(() => PRODUCTS.find((p) => p.id === route.params.id));

// پیدا کردن محصولات هم‌گروه و مشابه
const related = computed(() => {
  if (!item.value) return [];
  return PRODUCTS.filter((p) => p.id !== item.value.id && p.cat === item.value.cat).slice(0, 4);
});

// باز و بسته کردن هوشمند و روان تب‌ها
function toggleTab(tabName) {
  activeTab.value = activeTab.value === tabName ? '' : tabName;
}

// تبدیل ستاره‌های متنی به آرایه قابل رندر
function parseStars(stars) {
  if (typeof stars === 'number') return stars;
  const match = stars.match(/★/g);
  return match ? match.length : 5;
}
</script>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';

// ─── ثابت‌ها ─────────────────────────────────────────────
const TITLE_MAP = {
  1: 'ضدآفتاب‌ها',
  2: 'آبرسان‌ها',
  3: 'ترمیم و مرطوب‌کننده',
  4: 'جوانساز و لیفتینگ',
  5: 'شوینده‌ها',
  6: 'ضدلک و روشن‌کننده',
  7: 'دورچشم',
  8: 'تونر و لایه‌بردار',
};

// عرض اسلاید با CSS تعیین می‌شه (کلاس tile-slide) و Swiper با 'auto'
// همون عرض واقعی رو اندازه می‌گیره؛ پس snap و isEnd و progress درست حساب می‌شن.
// اگه همه‌ی دسته‌ها جا بشن، watchOverflow اسلایدر رو قفل می‌کنه.
const BREAKPOINTS = {
  0:    { slidesPerView: 'auto', spaceBetween: 14, slidesPerGroup: 1 },
  480:  { slidesPerView: 'auto', spaceBetween: 16, slidesPerGroup: 1 },
  768:  { slidesPerView: 'auto', spaceBetween: 20, slidesPerGroup: 2 },
  1024: { slidesPerView: 'auto', spaceBetween: 24, slidesPerGroup: 3 },
  1280: { slidesPerView: 'auto', spaceBetween: 28, slidesPerGroup: 3 },
};

const SWIPER_MODULES = [A11y, Keyboard, Mousewheel];

const A11Y_TEXT = {
  prevSlideMessage:  'اسلاید قبلی',
  nextSlideMessage:  'اسلاید بعدی',
  firstSlideMessage: 'اولین دسته‌بندی',
  lastSlideMessage:  'آخرین دسته‌بندی',
  slideLabelMessage: '{{index}} از {{slidesLength}}',
};

// ─── State ───────────────────────────────────────────────
const categories = ref([]);
const pending    = ref(true);
const error      = ref(null);
const brokenImgs = ref(new Set());

const swiperRef   = shallowRef(null);
const isBeginning = ref(true);
const isEnd       = ref(false);
const isLocked    = ref(false);
const progress    = ref(0);
const thumbSize   = ref(100); // درصد عرض نوار پیشرفت

// ─── Fetch ───────────────────────────────────────────────
async function loadCategories() {
  pending.value = true;
  error.value   = null;
  try {
    const response = await useGarnetApiFetch('products/categoryIndex');
    categories.value = (response?.ProductCategories || [])
      .filter(c => c.status === 1 && c.parent_id === null)
      .sort((a, b) => b.order - a.order);
  } catch (err) {
    console.error('[Categories] خطا:', err);
    error.value = err;
  } finally {
    pending.value = false;
  }
}
loadCategories();

// ─── Data ────────────────────────────────────────────────
// توضیح خالی → چیزی نشون نده (به‌جای یک جمله‌ی تکراری برای همه)
function getDesc(cat) {
  const d = (cat.description_fa || '').split('\n')[0].trim();
  return d || null;
}

const items = computed(() =>
  categories.value.map(cat => ({
    ...cat,
    palette:  generateCategoryColor(cat.title_fa),
    title:    TITLE_MAP[cat.id] || cat.title_fa,
    desc:     getDesc(cat),
    hasPhoto: !!cat.photo && !brokenImgs.value.has(cat.id),
  }))
);

function onImgError(id) {
  const s = new Set(brokenImgs.value);
  s.add(id);
  brokenImgs.value = s;
}

// ─── Swiper ──────────────────────────────────────────────
function sync(swiper = swiperRef.value) {
  if (!swiper) return;
  isBeginning.value = swiper.isBeginning;
  isEnd.value       = swiper.isEnd;
  isLocked.value    = swiper.isLocked;
  progress.value    = Math.min(Math.max(swiper.progress || 0, 0), 1);

  // با slidesPerView: 'auto' نسبت بخش دیده‌شده به کل طول محتوا
  const ratio = swiper.virtualSize ? swiper.size / swiper.virtualSize : 1;
  thumbSize.value = Math.min(100, Math.max(15, ratio * 100));
}

function onSwiperInit(swiper) {
  swiperRef.value = swiper;
  sync(swiper);
}

function slidePrev() { swiperRef.value?.slidePrev(); }
function slideNext() { swiperRef.value?.slideNext(); }

// موقعیت نوار پیشرفت (از راست در RTL)
const thumbStyle = computed(() => ({
  width: thumbSize.value + '%',
  insetInlineStart: progress.value * (100 - thumbSize.value) + '%',
}));
</script>

<template>
  <section class="relative overflow-hidden" aria-labelledby="home-cat-title">
    <!-- بلاب‌های تزئینی پس‌زمینه -->
    <div class="absolute -top-16 -end-16 w-72 h-72 rounded-full bg-blush/15 blur-[100px] pointer-events-none" />
    <div class="absolute bottom-0 -start-20 w-80 h-80 rounded-full bg-sky/10 blur-[110px] pointer-events-none" />
    <div class="absolute top-1/2 start-1/3 w-40 h-40 rounded-full bg-gold/10 blur-[80px] pointer-events-none hidden md:block" />

    <div class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-[72px]">

      <!-- ─── هدر ─── -->
      <div class="flex flex-wrap items-end justify-between gap-5 mb-9 md:mb-12">
        <div class="min-w-0">
          <!-- <div class="flex items-center gap-2 mb-3">
            <span class="w-6 h-px bg-gold/60" />
            <span class="text-[10px] sm:text-xs tracking-[0.15em] text-gold font-bold">راهنمای انتخاب</span>
          </div> -->

          <h2 id="home-cat-title" class="text-xl sm:text-2xl md:text-[30px] font-display text-ink leading-snug">
            پوستت به
            <span class="text-transparent bg-clip-text bg-gradient-to-l from-gold via-peach to-blush">چی</span>
            نیاز داره؟
          </h2>
          <p class="text-ink/50 text-xs sm:text-sm leading-relaxed mt-2 max-w-md">
            دسته‌ی مورد نیازت رو انتخاب کن و محصولات مخصوصش رو ببین
          </p>
        </div>

        <div v-if="!pending && !error && !isLocked" class="hidden md:flex items-center gap-2 shrink-0">
          <button
            type="button"
            class="nav-btn"
            :disabled="isBeginning"
            aria-label="دسته‌بندی‌های قبلی"
            @click="slidePrev"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            class="nav-btn"
            :disabled="isEnd"
            aria-label="دسته‌بندی‌های بعدی"
            @click="slideNext"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- ─── لودینگ (هم‌اندازه و هم‌فاصله با اسلایدهای واقعی) ─── -->
      <div v-if="pending" class="skeleton-row" aria-hidden="true">
        <div v-for="n in 9" :key="n" class="tile-slide flex flex-col items-center gap-3 shrink-0">
          <div class="avatar-size rounded-full skeleton-shimmer" />
          <div class="h-2.5 w-14 rounded-full skeleton-shimmer" />
        </div>
      </div>

      <!-- ─── خطا ─── -->
      <div
        v-else-if="error"
        class="text-center py-14 px-4 rounded-[28px] bg-ink/[0.02] border border-dashed border-ink/10"
        role="alert"
      >
        <div class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-blush/15 text-blush">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" stroke-linecap="round" />
          </svg>
        </div>
        <p class="text-ink/65 text-sm mb-4">دسته‌بندی‌ها بارگذاری نشد. اتصال اینترنت را بررسی کنید.</p>
        <div class="flex items-center justify-center gap-3">
          <button
            type="button"
            class="text-sm font-bold text-cream bg-accent hover:bg-accentHover rounded-full px-5 py-2.5 transition-colors"
            @click="loadCategories"
          >
            تلاش دوباره
          </button>
          <NuxtLink to="/shop" class="text-sm font-bold text-accent underline underline-offset-4">
            رفتن به فروشگاه
          </NuxtLink>
        </div>
      </div>

      <!-- ─── خالی ─── -->
      <div v-else-if="!items.length" class="text-center py-12 text-ink/50 text-sm">
        فعلاً دسته‌بندی فعالی وجود ندارد.
        <NuxtLink to="/shop" class="font-bold text-accent underline underline-offset-4 ms-1">مشاهده فروشگاه</NuxtLink>
      </div>

      <!-- ─── اسلایدر دایره‌ای ─── -->
      <nav v-else aria-label="دسته‌بندی محصولات">
        <div class="slider-shell" :class="{ 'fade-mask': !isEnd && !isLocked }">
          <Swiper
            dir="rtl"
            class="cat-swiper"
            :modules="SWIPER_MODULES"
            :breakpoints="BREAKPOINTS"
            :watch-overflow="true"
            :grab-cursor="true"
            :speed="550"
            :threshold="6"
            :keyboard="{ enabled: true, onlyInViewport: true }"
            :mousewheel="{ forceToAxis: true, releaseOnEdges: true }"
            :a11y="A11Y_TEXT"
            @swiper="onSwiperInit"
            @progress="sync"
            @slide-change="sync"
            @resize="sync"
            @breakpoint="sync"
            @lock="sync"
            @unlock="sync"
          >
            <SwiperSlide v-for="cat in items" :key="cat.id" class="tile-slide">
              <NuxtLink
                :to="{ path: '/shop', query: { cat_id: cat.id } }"
                class="cat-tile group"
                :style="{
                  '--c-tint':   cat.palette.iconBg,
                  '--c-soft':   cat.palette.stripeEnd,
                  '--c-mid':    cat.palette.stripeStart,
                  '--c-accent': cat.palette.accent,
                }"
              >
                <span class="avatar-ring avatar-size" :class="{ 'no-photo': !cat.hasPhoto }">
                  <span class="avatar-gap">
                    <span class="avatar-inner">
                      <img
                        v-if="cat.hasPhoto"
                        :src="cat.photo"
                        :alt="cat.title_fa"
                        width="120"
                        height="120"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        class="avatar-img"
                        @error="onImgError(cat.id)"
                      />
                      <span v-else class="avatar-fallback">
                        <CategoryIcon
                          :cat="cat.title_fa"
                          :size="30"
                          :style="{ color: cat.palette.accent }"
                        />
                      </span>
                      <span class="avatar-shine" aria-hidden="true" />
                    </span>
                  </span>
                </span>

                <span class="flex flex-col items-center text-center w-full">
                  <span class="tile-title">{{ cat.title }}</span>
                  <span v-if="cat.desc" class="tile-desc">{{ cat.desc }}</span>
                </span>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- نوار پیشرفت -->
        <div v-if="!isLocked" class="progress-track" aria-hidden="true">
          <span class="progress-thumb" :style="thumbStyle" />
        </div>
      </nav>

    </div>
  </section>
</template>

<style scoped>
/* ─── اندازه‌ها (یک‌جا، برای اسلاید و اسکلتون) ───────────── */
.tile-slide  { width: 92px; }
.avatar-size { width: 84px; height: 84px; }

@media (min-width: 480px) {
  .tile-slide  { width: 100px; }
  .avatar-size { width: 92px; height: 92px; }
}
@media (min-width: 768px) {
  .tile-slide  { width: 112px; }
  .avatar-size { width: 104px; height: 104px; }
}
@media (min-width: 1280px) {
  .tile-slide  { width: 120px; }
  .avatar-size { width: 112px; height: 112px; }
}

/* Swiper روی اسلاید عرض inline نمی‌ذاره چون slidesPerView = 'auto' */
:deep(.cat-swiper .swiper-slide.tile-slide) { height: auto; }

/* ─── دکمه‌های ناوبری ───────────────────────────────────── */
.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: theme('colors.ink');
  background: theme('colors.cardLight');
  border: 1px solid theme('colors.ink / 10%');
  box-shadow: 0 1px 2px theme('colors.ink / 6%');
  transition: background-color .3s, color .3s, border-color .3s, transform .3s, opacity .3s;
}
.nav-btn:hover:not(:disabled) {
  color: theme('colors.cream');
  background: theme('colors.accent');
  border-color: theme('colors.accent');
  transform: translateY(-2px);
}
.nav-btn:active:not(:disabled) { transform: scale(.9); }
.nav-btn:disabled { opacity: .3; cursor: default; }
.nav-btn:focus-visible { outline: 2px solid theme('colors.accent'); outline-offset: 2px; }

/* ─── اسلایدر ───────────────────────────────────────────── */
/*
  جلوگیری از بریده شدن سایه‌ی هاور:
  - mask-image هر چیزی بیرون از کادر المان رو پنهان می‌کنه، پس کادرِ
    المانِ ماسک‌دار رو با padding بزرگ کردیم و با margin منفی جبران
    کردیم تا جای محتوا تغییر نکنه.
  - Swiper در محور افقی clip می‌کنه؛ padding افقی جا برای سایه‌ی
    اسلاید اول و آخر می‌ذاره.
*/
.slider-shell {
  position: relative;
  margin: -18px -16px -8px;
}
.cat-swiper {
  overflow: clip visible;
  padding: 24px 16px 18px;
}
@media (min-width: 768px) {
  .slider-shell { margin-inline: -24px; }
  .cat-swiper   { padding-inline: 24px; }
}
:deep(.cat-swiper .swiper-wrapper) { align-items: flex-start; }

/* محو لبه‌ی انتهایی (چپ در RTL)؛ فقط افقیه و سایه‌ی بالا/پایین رو نمی‌بره */
.fade-mask {
  -webkit-mask-image: linear-gradient(to left, transparent 0, #000 56px);
          mask-image: linear-gradient(to left, transparent 0, #000 56px);
}

/* ورود پلکانی (فقط یک بار، موقع اولین رندر) */
:deep(.cat-swiper .swiper-slide) {
  animation: tileIn .6s cubic-bezier(.16,1,.3,1) both;
}
:deep(.cat-swiper .swiper-slide:nth-child(1))   { animation-delay: .02s; }
:deep(.cat-swiper .swiper-slide:nth-child(2))   { animation-delay: .06s; }
:deep(.cat-swiper .swiper-slide:nth-child(3))   { animation-delay: .10s; }
:deep(.cat-swiper .swiper-slide:nth-child(4))   { animation-delay: .14s; }
:deep(.cat-swiper .swiper-slide:nth-child(5))   { animation-delay: .18s; }
:deep(.cat-swiper .swiper-slide:nth-child(6))   { animation-delay: .22s; }
:deep(.cat-swiper .swiper-slide:nth-child(7))   { animation-delay: .26s; }
:deep(.cat-swiper .swiper-slide:nth-child(8))   { animation-delay: .30s; }
:deep(.cat-swiper .swiper-slide:nth-child(n+9)) { animation-delay: .32s; }

@keyframes tileIn {
  from { opacity: 0; transform: translateY(14px) scale(.92); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── اسکلتون با شیمر ─────────────────────────────────── */
.skeleton-row {
  display: flex;
  gap: 14px;
  overflow: hidden;
  padding: 6px 0 10px;
}
@media (min-width: 480px)  { .skeleton-row { gap: 16px; } }
@media (min-width: 768px)  { .skeleton-row { gap: 20px; } }
@media (min-width: 1024px) { .skeleton-row { gap: 24px; } }
@media (min-width: 1280px) { .skeleton-row { gap: 28px; } }

.skeleton-shimmer {
  background: linear-gradient(100deg, theme('colors.ink / 5%') 8%, theme('colors.ink / 10%') 18%, theme('colors.ink / 5%') 33%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { background-position: 150% 0; }
  100% { background-position: -50% 0; }
}

/* ─── تایل دایره‌ای ─────────────────────────────────────── */
.cat-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 2px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.avatar-ring {
  display: block;
  flex-shrink: 0;
  border-radius: 999px;
  padding: 3px;
  background: conic-gradient(from 220deg, var(--c-accent, #A28466), var(--c-mid, #C8B49A) 45%, var(--c-soft, #F2EBE3) 75%, var(--c-accent, #A28466));
  /*
    حالت پایه همون سایه‌ی حالت هاوره، فقط با رنگ کاملاً شفاف از همون رنگ دسته.
    این‌طوری مرورگر فقط شفافیت رو تغییر می‌ده و از مشکی شروع نمی‌کنه.
    (قبلاً filter: none → drop-shadow بود که Chrome از رنگ مشکی درون‌یابی می‌کرد)
  */
  box-shadow: 0 12px 24px -8px color-mix(in srgb, var(--c-accent, #A28466) 0%, transparent);
  transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .4s ease;
}
.avatar-ring.no-photo {
  background: conic-gradient(from 220deg, var(--c-tint, #EFE8DF), var(--c-soft, #F2EBE3), var(--c-tint, #EFE8DF));
}

.avatar-gap {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: theme('colors.cream');
  padding: 3px;
}

.avatar-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  overflow: hidden;
  background: var(--c-tint, theme('colors.ink / 5%'));
}

.avatar-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  transition: transform .7s cubic-bezier(.2,.8,.2,1);
}

.avatar-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.avatar-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.avatar-shine::before {
  content: '';
  position: absolute;
  top: -30%;
  bottom: -30%;
  width: 55%;
  background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,.55) 50%, transparent 100%);
  transform: translateX(-220%) skewX(-18deg);
  transition: transform .05s;
}

.tile-title {
  font-size: 12px;
  font-weight: 700;
  color: theme('colors.ink');
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color .3s ease;
}
.tile-desc {
  display: none;
  font-size: 10.5px;
  color: theme('colors.ink / 42%');
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
@media (min-width: 768px) {
  .tile-title { font-size: 13.5px; }
  .tile-desc  { display: block; }
}

/* هاور فقط روی دستگاه‌هایی که واقعاً هاور دارن */
@media (hover: hover) {
  .cat-tile:hover .avatar-ring {
    transform: scale(1.07) rotate(8deg);
    box-shadow: 0 12px 24px -8px color-mix(in srgb, var(--c-accent, #A28466) 45%, transparent);
  }
  .cat-tile:hover .avatar-img  { transform: scale(1.14); }
  .cat-tile:hover .tile-title  { color: var(--c-accent, theme('colors.accent')); }
  .cat-tile:hover .avatar-shine::before {
    transform: translateX(300%) skewX(-18deg);
    transition: transform .85s cubic-bezier(.22,1,.36,1) .05s;
  }
}

.cat-tile:focus-visible .avatar-ring {
  outline: 3px solid var(--c-accent, theme('colors.accent'));
  outline-offset: 3px;
}
.cat-tile:focus-visible .tile-title { color: var(--c-accent, theme('colors.accent')); }

.cat-tile:active .avatar-ring {
  transform: scale(.93);
  transition-duration: .12s;
}

/* ─── نوار پیشرفت ───────────────────────────────────────── */
.progress-track {
  position: relative;
  height: 4px;
  width: 120px;
  margin: 24px auto 0;
  border-radius: 999px;
  background: theme('colors.ink / 8%');
  overflow: hidden;
}
.progress-thumb {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, theme('colors.gold'), theme('colors.accent'));
  box-shadow: 0 0 8px theme('colors.gold / 45%');
  transition: inset-inline-start .35s cubic-bezier(.2,.8,.2,1), width .35s cubic-bezier(.2,.8,.2,1);
}

/* ─── کاهش حرکت ─────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .avatar-ring, .avatar-img, .avatar-shine::before, .tile-title, .progress-thumb, .nav-btn {
    transition: none !important;
  }
  .skeleton-shimmer,
  :deep(.cat-swiper .swiper-slide) { animation: none !important; }
  .cat-tile:hover .avatar-ring,
  .cat-tile:hover .avatar-img,
  .cat-tile:hover .avatar-shine::before { transform: none !important; }
}
</style>
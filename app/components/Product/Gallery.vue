<template>
  <div>
    <div
      class="aspect-square bg-white border rounded-tr-[80px] sm:rounded-tr-[100px] rounded-[24px] relative flex items-center justify-center p-2 group"
      :style="{ borderColor: catInfo.borderColor }"
    >
      <!-- بج تخفیف -->
      <span
        v-if="discountPercent > 0"
        class="absolute top-4 start-4 z-10 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
        :style="{ backgroundColor: catInfo.accent }"
      >
        {{ fa(discountPercent) }}٪ تخفیف
      </span>

      <!-- دکمه‌های علاقه‌مندی و اشتراک‌گذاری -->
      <div class="absolute top-4 end-4 z-10 flex flex-col gap-2">

        <!-- علاقه‌مندی -->
        <button
          type="button"
          :aria-label="isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
          :disabled="wishlistLoading"
          class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md grid place-items-center transition-all duration-300 hover:scale-110 disabled:opacity-60 disabled:cursor-not-allowed"
          @click="handleToggleWishlist"
        >
          <!-- اسپینر لودینگ -->
          <svg
            v-if="wishlistLoading"
            class="w-4 h-4 animate-spin text-ink/40"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          >
            <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round"/>
          </svg>
          <!-- آیکون قلب -->
          <svg
            v-else
            class="w-4 h-4 transition-colors"
            :class="isWishlisted ? 'text-blush' : 'text-ink/40'"
            :fill="isWishlisted ? 'currentColor' : 'none'"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path d="M12 21s-6.7-4.35-9.3-8.2C1 10 1.5 6.5 4.6 5.1 7 4 9.6 4.9 12 7.5c2.4-2.6 5-3.5 7.4-2.4 3.1 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- اشتراک‌گذاری -->
        <button
          type="button"
          aria-label="اشتراک‌گذاری"
          class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md grid place-items-center transition-all duration-300 hover:scale-110"
          @click="$emit('share')"
        >
          <svg v-if="!copied" class="w-4 h-4 text-ink/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" stroke-linecap="round"/>
          </svg>
          <svg v-else class="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- تصویر محصول -->
      <img
        :src="displayImage"
        :alt="productName"
        loading="lazy"
        class="w-[90%] h-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu relative z-[1] rounded-tr-[50px] sm:rounded-tr-[60px] rounded-[14px] cursor-zoom-in"
        @error="onImageError"
        @click="openLightbox"
      />
    </div>

    <!-- تصاویر مینیاتوری -->
    <div v-if="images && images.length > 1" class="flex gap-2.5 mt-4 flex-wrap">
      <button
        v-for="(img, i) in images"
        :key="i"
        v-show="img"
        class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 hover:scale-105 transform-gpu"
        :style="{
          borderColor: activeImageModel === img ? catInfo.accent : 'transparent',
          boxShadow: activeImageModel === img
            ? `0 0 0 1px ${catInfo.accent}40`
            : 'none',
        }"
        @click="activeImageModel = img"
      >
        <img :src="img" class="w-full h-full object-cover" @error="onThumbError" />
      </button>
    </div>

    <!-- لایت‌باکس تمام صفحه -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- دکمه بستن -->
          <button
            type="button"
            aria-label="بستن"
            class="absolute top-5 end-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors backdrop-blur-md"
            @click="closeLightbox"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- دکمه قبلی -->
          <button
            v-if="images && images.length > 1"
            type="button"
            aria-label="تصویر قبلی"
            class="absolute start-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors backdrop-blur-md"
            @click.stop="showPrev"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- دکمه بعدی -->
          <button
            v-if="images && images.length > 1"
            type="button"
            aria-label="تصویر بعدی"
            class="absolute end-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors backdrop-blur-md"
            @click.stop="showNext"
          >
            <svg class="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- تصویر بزرگ -->
          <img
            :src="displayImage"
            :alt="productName"
            class="max-w-[92vw] max-h-[88vh] object-contain rounded-lg select-none"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { fa } from '~/utils/format';
import { toast } from 'vue-sonner';

const DEFAULT_IMG = '/assets/founder-portrait.png';

const props = defineProps({
  activeImage:     { type: String,  default: null       },
  images:          { type: Array,   default: () => []   },
  productName:     { type: String,  default: ''         },
  discountPercent: { type: Number,  default: 0          },
  inStock:         { type: Boolean, default: true       },
  isWishlisted:    { type: Boolean, default: false      },
  copied:          { type: Boolean, default: false      },
  catInfo:         { type: Object,  required: true      },
  // شناسه محصول برای API علاقه‌مندی
  productId:       { type: Number,  required: true      },
});

const emit = defineEmits(['update:activeImage', 'update:isWishlisted', 'share']);

const router     = useRouter();
const route      = useRoute();
const customizer = useCustomizerStore();

// ─── تصویر فعال ──────────────────────────────────────────
const activeImageModel = computed({
  get: () => props.activeImage,
  set: (val) => emit('update:activeImage', val),
});

const displayImage = computed(() => activeImageModel.value || DEFAULT_IMG);

function onImageError() {
  if (activeImageModel.value) activeImageModel.value = null;
}
function onThumbError(e) {
  e.target.src = DEFAULT_IMG;
}

// ─── لایت‌باکس تمام صفحه ─────────────────────────────────
const lightboxOpen = ref(false);

function openLightbox() {
  lightboxOpen.value = true;
  document.addEventListener('keydown', onKeydown);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOpen.value = false;
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
}

function onKeydown(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showNext();  // در RTL جهت‌ها برعکس می‌شن
  if (e.key === 'ArrowRight') showPrev();
}

function showNext() {
  if (!props.images || props.images.length < 2) return;
  const idx = props.images.indexOf(activeImageModel.value);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % props.images.length;
  activeImageModel.value = props.images[nextIdx];
}

function showPrev() {
  if (!props.images || props.images.length < 2) return;
  const idx = props.images.indexOf(activeImageModel.value);
  const prevIdx = idx === -1 ? 0 : (idx - 1 + props.images.length) % props.images.length;
  activeImageModel.value = props.images[prevIdx];
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});

// ─── علاقه‌مندی ──────────────────────────────────────────
const wishlistLoading = ref(false);

async function handleToggleWishlist() {
  // کاربر لاگین نکرده
  if (!customizer.auth) {
    router.push('/login?back=' + route.fullPath);
    return;
  }

  if (wishlistLoading.value) return;
  wishlistLoading.value = true;

  try {
    if (props.isWishlisted) {
      // حذف از علاقه‌مندی
      await useGarnetApiFetch('users/deleteFavorite', {
        kind:      1,
        target_id: props.productId,
      });
      emit('update:isWishlisted', false);
      toast.success('از علاقه‌مندی‌ها حذف شد');
    } else {
      // افزودن به علاقه‌مندی
      await useGarnetApiFetch('users/createFavorite', {
        kind:      1,
        target_id: props.productId,
      });
      emit('update:isWishlisted', true);
      toast.success('به علاقه‌مندی‌ها افزوده شد');
    }
  } catch (err) {
    console.error('[ProductGallery] خطا در علاقه‌مندی:', err);
    toast.error('خطایی رخ داد، لطفاً دوباره تلاش کنید');
  } finally {
    wishlistLoading.value = false;
  }
}
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
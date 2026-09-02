<template>
  <ProductSkeleton v-if="pending" />

  <div v-else-if="item" class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16 pb-28 md:pb-16">

    <ProductBreadcrumb :category-tree="categoryTree" :product-name="item.name" />

    <!-- گرید اصلی محصول -->
    <div class="grid md:grid-cols-12 gap-8 lg:gap-16 items-start">

      <!-- ستون سمت راست: تصویر -->
      <div class="md:col-span-5 md:sticky md:top-[100px]">
        <ProductGallery
          v-model:active-image="activeImage"
          :images="item.images"
          :product-name="item.name"
          :discount-percent="discountPercent"
          :in-stock="item.inStock"
          :is-wishlisted="isWishlisted"
          :copied="copied"
          :cat-info="catInfo"
          @toggle-wishlist="toggleWishlist"
          @share="shareProduct"
        />
        <ProductTrustBadges :is-course="isCourse" />
      </div>

      <!-- ستون سمت چپ: جزئیات خرید -->
      <div class="md:col-span-7 space-y-6">
        <ProductHeader
          :item="item"
          :cat-info="catInfo"
          :comments-count="commentsCount"
          :avg-rating="avgRating"
          @scroll-to-reviews="scrollToReviews"
        />

        <ProductPriceBox :item="item" :cat-info="catInfo" />

        <ProductStockStatus
          :item="item"
          :is-course="isCourse"
          :low-stock="lowStock"
          :access-deadline="accessDeadline"
          :delivery-estimate="deliveryEstimate"
        />

        <ProductQuantityCart
          :qty="qty"
          :at-max-stock="atMaxStock"
          :in-stock="item.inStock"
          :just-added="justAdded"
          :cat-info="catInfo"
          @increment="increment"
          @decrement="decrement"
          @add="handleAdd"
        />

        <ProductAccordion v-model="activeTab" :item="item" :cat-info="catInfo" />
      </div>
    </div>

    <!-- ═══════════════ بخش نظرات خریداران ═══════════════ -->
    <section ref="reviewsSectionRef" class="mt-16 md:mt-24 pt-10 border-t border-ink/10 scroll-mt-24">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div class="flex items-center gap-2">
          <span class="w-6 h-px bg-gold/60"></span>
          <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">نظرات و تجربیات خریداران</h2>
        </div>

        <div v-if="avgRating" class="flex items-center gap-3 bg-card px-4 py-2.5 rounded-full w-fit">
          <span class="text-xl font-bold text-ink font-latin">{{ avgRating }}</span>
          <div class="flex gap-0.5 text-gold text-sm">
            <span v-for="s in 5" :key="s">★</span>
          </div>
          <span class="text-xs text-ink/40">از {{ fa(commentsCount) }} نظر</span>
        </div>
      </div>

      <div class="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <ProductReviewsList
          :comments="comments"
          :loading-posts="loadingPosts"
          :load-more-btn="loadMoreBtn"
          :has-more="commentsPage < commentsTotalPages"
          :cat-info="catInfo"
          @load-more="loadMoreComments"
        />

        <ProductCommentForm
          v-model="commentForm"
          :allow-comment="item.allowComment"
          :is-user-login="isUserLogin"
          :cat-info="catInfo"
          :submit-loading="submitLoading"
          @submit="submitCommentForm"
        />
      </div>
    </section>

    <ProductRelated :pending="relatedPending" :products="related" />

    <ProductRecentlyViewed :products="recentlyViewed" />

    <ProductMobileBar
      :qty="qty"
      :at-max-stock="atMaxStock"
      :in-stock="item.inStock"
      :just-added="justAdded"
      :cat-info="catInfo"
      :price="item.price"
      @increment="increment"
      @decrement="decrement"
      @add="handleAdd"
    />
  </div>

  <ProductNotFound v-else />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { fa } from '~/utils/format.ts';
import { toast } from 'vue-sonner';

const route  = useRoute();
const router = useRouter();

// استور سراسری پروژه که وضعیت لاگین کاربر رو نگه می‌داره
const customizer  = useCustomizerStore();
const isUserLogin = computed(() => !!customizer.auth);

const { add } = useCart();

// ⚠️ نوع دیدگاه مخصوص محصولات — با مقدار واقعی بک‌اند هماهنگ کن
const COMMENT_KIND = 1;

// ─── شناسه محصول از روی مسیر ────────────────────────────────
const productId = computed(() => route.params.id);

// ─── داده‌های خام API ────────────────────────────────────────
const Product      = ref(null);
const categoryTree = ref([]);
const pending       = ref(true);
const fetchError    = ref(null);

// ─── سایر state های صفحه ────────────────────────────────────
const qty              = ref(1);
const activeTab         = ref('long');
const isWishlisted      = ref(false);
const copied            = ref(false);
const justAdded         = ref(false);
const activeImage       = ref(null);
const recentlyViewed    = ref([]);
const related           = ref([]);
const relatedPending    = ref(false);
const reviewsSectionRef = ref(null);

// ─── state مخصوص نظرات ────────────────────────────────────────
const comments          = ref([]);
const loadingPosts       = ref(true);
const loadMoreBtn        = ref(false);
const commentsPage       = ref(1);
const commentsTotalPages = ref(1);
const commentsCount      = ref(0);

const commentForm    = ref({ name: '', contact: '', text: '', rate: 5, error: false });
const submitLoading   = ref(false);

// ─── دریافت جزئیات محصول ──────
const getProductDetail = async () => {
  pending.value    = true;
  fetchError.value = null;
  try {
    const sendUrl = customizer.auth ? 'products/showByUser' : 'products/showByPub';
    const { data, error, fetchData } = useGarnetApiFetchReactive(sendUrl, {
      id: productId.value,
      inline_attributes: true,
      inline_price: true,
    });
    await fetchData();

    if (error.value) {
      throw new Error('خطا در دریافت اطلاعات');
    }
    if (!data.value?.Product) {
      throw new Error('Product data not found');
    }

    Product.value = data.value.Product;

    if (Product.value.status === 0) {
      await router.push('/shop');
      return;
    }

    categoryTree.value = (data.value.CategoryTree || []).map((v) => ({
      id:   v.category_id,
      text: v.category_title_fa,
    }));

    isWishlisted.value = !!Product.value.is_fave;
    activeImage.value  = Product.value.cover_image || Product.value.product_images?.[0]?.file || null;
    qty.value           = Product.value.minimum_sale_quantity || 1;

    fetchRelated();
    saveToRecentlyViewed();
    loadRecentlyViewed();

    // ری‌ست و بارگذاری اولیه‌ی نظرات این محصول
    resetCommentForm();
    comments.value           = [];
    commentsPage.value       = 1;
    commentsTotalPages.value = 1;
    loadingPosts.value       = true;
    loadComments();
  } catch (err) {
    console.error('[ProductDetail] خطا:', err);
    fetchError.value = err;
    Product.value = null;
  } finally {
    pending.value = false;
  }
};

getProductDetail();

watch(productId, (newId, oldId) => {
  if (newId && newId !== oldId) {
    getProductDetail();
    if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ─── کمک‌کننده‌ها ─────────────────────────────────────────────
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

function scrollToReviews() {
  reviewsSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── نرمال‌سازی محصول برای استفاده در تمپلیت ──────────────────
const item = computed(() => {
  const p = Product.value;
  if (!p) return null;

  const hasDiscount = p.discount > 0 && p.final_price < p.price;

  return {
    id:        p.id,
    slug:      p.slug_fa,
    name:      p.title_fa,
    latin:     p.seo_keyword_fa || '',
    desc:      stripHtml(p.summary_fa),
    long:      p.description_fa || '',
    cat:       p.category_title_fa || categoryTree.value[0]?.text || '',
    catId:     p.category,
    brand:     p.brand_text || null,
    price:     hasDiscount ? p.final_price : p.price,
    oldPrice:  hasDiscount ? p.price : null,
    size:      p.unit_text ? `${fa(p.capacity)} ${p.unit_text}` : null,
    img:       p.cover_image,
    images:    (p.product_images || []).map((im) => im.file),
    inStock:   (p.stock ?? 0) > 0 && p.allow_sale === 1,
    stockCount: p.stock,
    minQty:    p.minimum_sale_quantity || 1,
    maxQty:    p.maximum_sale_quantity || null,
    allowComment: p.allow_comment === 1,
    attributes: (p.product_attributes_inline || [])
      .filter((a) => a.title_fa && (a.value_fa || a.description))
      .map((a) => ({
        title: a.title_fa,
        value: a.value_fa || a.description,
      })),
    installmentPlans: p.product_installment_plans || [],
    usageLink: p.usage_link,
  };
});

// ─── تشخیص نوع دوره (course) برای متن‌های اختصاصی ─────────────
const isCourse = computed(() => Product.value?.type_code_text === 'course');

const accessDeadline = computed(() => {
  if (!Product.value?.expires_at) return null;
  try {
    return new Date(Product.value.expires_at).toLocaleDateString('fa-IR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return Product.value.expires_at; }
});

// ─── تب پیش‌فرض هوشمند بر اساس محتوای موجود ────────────────────
watch(item, (val) => {
  if (!val) return;
  if (val.long) activeTab.value = 'long';
  else if (val.attributes.length) activeTab.value = 'attrs';
  else if (val.installmentPlans.length) activeTab.value = 'installment';
  else activeTab.value = '';
}, { immediate: true });

// ─── پالت رنگی هماهنگ با دسته‌بندی ─────────────────────────────
// const PALETTE = {
//   'شوینده': { borderColor: 'rgba(156,191,160,0.20)', iconBg: 'rgba(156,191,160,0.14)', accent: '#7BA582', darkAccent: '#5F8A66' },
//   'آبرسان': { borderColor: 'rgba(143,193,217,0.20)', iconBg: 'rgba(143,193,217,0.14)', accent: '#6BA5C4', darkAccent: '#4C87A6' },
//   'ترمیم‌کننده و مرطوب‌کننده': { borderColor: 'rgba(185,166,222,0.20)', iconBg: 'rgba(185,166,222,0.14)', accent: '#9C87C4', darkAccent: '#7C67A8' },
//   'ضدلک و روشن‌کننده': { borderColor: 'rgba(224,183,88,0.20)', iconBg: 'rgba(224,183,88,0.14)', accent: '#C29A45', darkAccent: '#A17F35' },
//   'کرم جوانساز و لیفتینگ': { borderColor: 'rgba(243,180,176,0.20)', iconBg: 'rgba(243,180,176,0.14)', accent: '#DE8E89', darkAccent: '#C36F6A' },
//   'دورچشم': { borderColor: 'rgba(110,178,178,0.20)', iconBg: 'rgba(110,178,178,0.14)', accent: '#519494', darkAccent: '#3D7676' },
//   'ضدآفتاب': { borderColor: 'rgba(242,168,104,0.20)', iconBg: 'rgba(242,168,104,0.14)', accent: '#D68C4B', darkAccent: '#B76F32' },
// };
// const DEFAULT_PALETTE = { borderColor: 'rgba(162,132,102,0.18)', iconBg: 'rgba(162,132,102,0.12)', accent: '#A28466', darkAccent: '#3F3A35' };

// const catInfo = computed(() => (item.value && PALETTE[item.value.cat]) || DEFAULT_PALETTE);

const catInfo = computed(() =>
  generateCategoryColor(item.value.cat)
)

// ─── تخفیف، موجودی ───────────────────────────────────────────
const discountPercent = computed(() => {
  if (!Product.value?.discount_percent) return 0;
  return Math.round(parseFloat(Product.value.discount_percent));
});

const lowStock = computed(() => {
  const s = item.value?.stockCount;
  return typeof s === 'number' && s > 0 && s <= 5;
});

const effectiveMax = computed(() => {
  if (!item.value) return Infinity;
  const vals = [item.value.stockCount, item.value.maxQty].filter((v) => typeof v === 'number' && v > 0);
  return vals.length ? Math.min(...vals) : Infinity;
});

const atMaxStock = computed(() => !!item.value && qty.value >= effectiveMax.value);

// تخمین بازه زمانی تحویل (۱ تا ۳ روز آینده) — فقط برای کالای فیزیکی
const deliveryEstimate = computed(() => {
  const now = new Date();
  const from = new Date(now); from.setDate(now.getDate() + 1);
  const to = new Date(now); to.setDate(now.getDate() + 3);
  const fmt = (d) => d.toLocaleDateString('fa-IR', { day: 'numeric', month: 'long' });
  return `${fmt(from)} تا ${fmt(to)}`;
});

function increment() {
  if (atMaxStock.value) return;
  qty.value++;
}

function decrement() {
  const min = item.value?.minQty || 1;
  qty.value = Math.max(min, qty.value - 1);
}

function handleAdd() {
  if (!item.value || item.value.inStock === false) return;
  add(item.value.id, qty.value);
  justAdded.value = true;
  setTimeout(() => { justAdded.value = false; }, 1800);
}

function toggleWishlist() {
  // TODO: اتصال به API واقعی افزودن/حذف علاقه‌مندی (products/toggleFave یا مشابه)
  isWishlisted.value = !isWishlisted.value;
}

async function shareProduct() {
  const shareData = {
    title: item.value.name,
    text:  item.value.desc,
    url:   window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch {}
  } else {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  }
}

// ═══════════════════════ نظرات ═══════════════════════

function resetCommentForm() {
  commentForm.value = { name: '', contact: '', text: '', rate: 5, error: false };
}

function validateComment() {
  const textOk = (commentForm.value.text || '').trim().length > 0;
  if (isUserLogin.value) return textOk;
  const nameOk   = (commentForm.value.name || '').trim().length > 0;
  const mobileOk = (commentForm.value.contact || '').trim().length > 0;
  return textOk && nameOk && mobileOk;
}

async function submitCommentForm() {
  if (submitLoading.value || !Product.value) return;

  commentForm.value.error = false;
  const text = (commentForm.value.text || '').trim();

  if (!validateComment()) {
    commentForm.value.error = true;
    toast.error('لطفا تمامی فیلد ها را پر کنید');
    return;
  }

  submitLoading.value = true;

  let sendUrl = '';
  let sendData = {};

  if (isUserLogin.value) {
    sendUrl = 'comments/createByUser';
    sendData = {
      comment: text,
      rate: commentForm.value.rate,
      kind: COMMENT_KIND,
      target_id: Product.value.id,
    };
  } else {
    sendUrl = 'comments/create';
    sendData = {
      comment: text,
      name: (commentForm.value.name || '').trim(),
      rate: commentForm.value.rate,
      kind: COMMENT_KIND,
      contact: (commentForm.value.contact || '').trim(),
      target_id: Product.value.id,
    };
  }

  try {
    const response = await useGarnetApiFetch(sendUrl, sendData);
    if (response?.code === 2000) {
      toast.success('نظر ارسال شد');
      resetCommentForm();
      comments.value = [];
      commentsPage.value = 1;
      loadingPosts.value = true;
      await loadComments();
    } else {
      toast.error('ارسال نظر با مشکل مواجه شده است');
    }
  } catch (e) {
    console.error('[ProductDetail] خطا در ثبت نظر:', e);
    toast.error('خطا در ارسال نظر');
  } finally {
    submitLoading.value = false;
  }
}

async function loadComments() {
  if (!Product.value) return;
  try {
    const response = await useGarnetApiFetch('comments/indexByKindTarget', {
      kind: COMMENT_KIND,
      target_id: Product.value.id,
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
    console.error('[ProductDetail] خطا در دریافت نظرات:', e);
    toast.error('خطا در دریافت دیدگاه‌ها');
  } finally {
    loadingPosts.value = false;
    loadMoreBtn.value  = false;
  }
}

function loadMoreComments() {
  if (commentsPage.value >= commentsTotalPages.value) return;
  loadMoreBtn.value = true;
  commentsPage.value++;
  loadComments();
}

// میانگین امتیاز بر اساس نظراتی که تاکنون بارگذاری شده‌اند
const avgRating = computed(() => {
  const rated = comments.value.filter((c) => c.rate);
  if (!rated.length) return null;
  const sum = rated.reduce((acc, c) => acc + (c.rate || 0), 0);
  return (sum / rated.length).toFixed(1);
});

// ═══════════════════════════════════════════════════════════════

// ─── محصولات مشابه (از API) ────────────────────────────────────
function fetchRelated() {
  if (!item.value?.catId) { related.value = []; return; }
  relatedPending.value = true;
  useGarnetApiFetch('products/indexHomeLite', {
    amount:    8,
    category:  item.value.catId,
    direction: 'desc',
    order:     'visits',
  })
    .then((res) => {
      related.value = (res.Products || [])
        .filter((p) => p.id !== item.value.id)
        .slice(0, 4);
    })
    .catch((err) => {
      console.error('[ProductDetail] خطا در دریافت محصولات مشابه:', err);
      related.value = [];
    })
    .finally(() => { relatedPending.value = false; });
}

// ─── بازدیدهای اخیر (localStorage) ──────────────────────────────
const RECENT_KEY = 'mahlin_recently_viewed_v2';

function saveToRecentlyViewed() {
  if (!process.client || !Product.value) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    let list = raw ? JSON.parse(raw) : [];
    list = list.filter((p) => p.id !== Product.value.id);
    list.unshift({
      id:                Product.value.id,
      title_fa:          Product.value.title_fa,
      slug_fa:           Product.value.slug_fa,
      cover_image:       Product.value.cover_image,
      price:             Product.value.price,
      final_price:       Product.value.final_price,
      discount_percent:  Product.value.discount_percent,
      category_title_fa: Product.value.category_title_fa,
      usage_link:        Product.value.usage_link,
    });
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 8)));
  } catch (e) {
    console.error('[ProductDetail] خطا در ذخیره بازدید اخیر:', e);
  }
}

function loadRecentlyViewed() {
  if (!process.client) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    recentlyViewed.value = list
      .filter((p) => p.id !== Product.value?.id)
      .slice(0, 4);
  } catch {
    recentlyViewed.value = [];
  }
}

// ─── سئو: متادیتا + Schema.org ───────────────────────────────────
useSeoMeta({
  title: () => Product.value
    ? `${Product.value.seo_title_fa || Product.value.title_fa} | ماهلین`
    : 'محصول یافت نشد | ماهلین',
  description: () => Product.value?.seo_description_fa || stripHtml(Product.value?.summary_fa) || 'فروشگاه تخصصی ماهلین',
  keywords: () => Product.value?.seo_keyword_fa || undefined,
  ogTitle: () => Product.value?.title_fa,
  ogDescription: () => stripHtml(Product.value?.summary_fa),
  ogImage: () => Product.value?.cover_image,
  ogType: 'product',
});

useHead(() => ({
  script: Product.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: Product.value.title_fa,
          image: [Product.value.cover_image, ...(Product.value.product_images || []).map((i) => i.file)].filter(Boolean),
          description: stripHtml(Product.value.summary_fa),
          brand: Product.value.brand_text ? { '@type': 'Brand', name: Product.value.brand_text } : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'IRR',
            price: Product.value.final_price,
            availability: (Product.value.stock > 0 && Product.value.allow_sale === 1)
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
          aggregateRating: avgRating.value
            ? {
                '@type': 'AggregateRating',
                ratingValue: avgRating.value,
                reviewCount: commentsCount.value,
              }
            : undefined,
        }),
      }]
    : [],
}));
</script>
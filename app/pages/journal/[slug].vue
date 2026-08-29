<template>
  <main v-if="post" class="py-10 md:py-16">
    <!-- بخش اول: هدر مقاله و تصویر شاخص -->
    <article class="max-w-[900px] mx-auto px-4 md:px-6">
      
      <!-- دکمه بازگشت به مجله (با هاور انیمیشنی مینی‌مال) -->
      <NuxtLink 
        to="/journal" 
        class="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group mb-8"
      >
        <svg class="w-4 h-4 transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>بازگشت به مجله ماهلین</span>
      </NuxtLink>

      <!-- اطلاعات انتشار و زمان مطالعه -->
      <header class="space-y-4 mb-8">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 bg-gold/10 text-gold text-[11px] font-bold uppercase rounded-md tracking-wider">
            {{ post.cat }}
          </span>
          <span class="text-xs text-ink/40 font-latin">{{ post.date }}</span>
          <span class="w-1 h-1 rounded-full bg-gold/40"></span>
          <span class="text-xs text-ink/40 flex items-center gap-1 font-latin">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {{ fa(post.read || 5) }} دقیقه مطالعه
          </span>
        </div>

        <h1 class="text-2xl sm:text-3xl md:text-4.5xl font-display text-ink font-bold leading-tight">
          {{ post.title }}
        </h1>
      </header>

      <!-- تصویر شاخص مقاله با قاب لوکس و نامتقارن (امضای بصری ماهلین) -->
      <div class="aspect-[16/9] w-full bg-cardLight rounded-tr-[64px] rounded-bl-[64px] md:rounded-tr-[100px] md:rounded-bl-[100px] overflow-hidden border border-ink/[0.06] mb-12 md:mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
        <img 
          v-if="post.img"
          :src="post.img" 
          :alt="post.title" 
          class="w-full h-full object-cover"
        />
        <!-- بنر جایگزین فوق لوکس در صورت نبودن عکس -->
        <div v-else class="w-full h-full bg-gradient-to-br from-gold/15 via-cream to-cardLight flex items-center justify-center">
          <span class="text-9xl font-display text-gold/15 select-none">{{ post.cat.charAt(0) }}</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent pointer-events-none" />
      </div>

      <!-- متن و محتوای اصلی مقاله (عرض متمرکز و بهینه جهت سهولت در مطالعه) -->
      <section class="max-w-[760px] mx-auto">
        <!-- لید / خلاصه مقاله با سایز بزرگ‌تر و فونت متمایز -->
        <p class="text-base sm:text-lg md:text-xl text-ink/80 font-medium leading-relaxed mb-8 pr-4 border-r-2 border-gold/40">
          {{ post.excerpt }}
        </p>

        <!-- بدنه فرضی پاراگراف‌ها جهت نمایش خروجی شکیل (طراحی زنده محتوای متنی) -->
        <div class="text-ink/75 text-sm sm:text-base leading-loose space-y-6">
          <p>
            توازن بیولوژیک سلول‌های پوستی، اولین و حیاتی‌ترین گام در داشتن چهره‌ای شاداب و جوان است. سد دفاعی پوست (Skin Barrier) به عنوان یک لایه محافظتی، مانع از خروج رطوبت و ورود آلودگی‌های محیطی می‌شود. وقتی این لایه به دلیل استفاده از پاک‌کننده‌های خشن آسیب می‌بیند، پوست دچار التهاب و پیری زودرس خواهد شد.
          </p>
          
          <h3 class="text-lg sm:text-xl font-bold text-ink pt-4">راهکار علمی بازسازی سد دفاعی</h3>
          <p>
            برای ترمیم این چرخه، استفاده از ترکیباتی نظیر نیاسینامید، سرامیدها و عصاره‌های غنی ارگانیک توصیه می‌شود. نیاسینامید با تحریک سنتز کراتین، به بازسازی سلولی کمک عمیقی می‌کند. در آزمایشگاه‌های درماتولوژی ماهلین، ما اکسیرهای گیاهی را به روش کروماتوگرافی استخراج می‌کنیم تا ناب‌ترین حالت فعال فرمول به پوست شما برسد.
          </p>
        </div>
      </section>

    </article>

    <!-- بخش دوم: مقالات مرتبط (یکپارچه با کامپوننت BlogCard و طراحی ۳ ستونه فوق‌العاده شیک) -->
    <section class="max-w-[1280px] mx-auto px-4 md:px-6 mt-20 md:mt-28 pt-16 border-t border-ink/10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-5 h-px bg-gold/60"></span>
            <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">بیشتر بخوانید</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">مقالات مرتبط و پیشنهادی</h2>
        </div>
        
        <NuxtLink to="/journal" class="text-xs font-bold text-gold hover:text-ink transition-colors">
          مشاهده تمام مقالات مجله ←
        </NuxtLink>
      </div>

      <!-- شبکه مقالات مرتبط با استفاده از کامپوننت BlogCard شما -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        <BlogCard 
          v-for="b in related" 
          :key="b.slug" 
          :blog="b"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { BLOG } from '~/data/products';
import { fa } from '~/utils/format';

const route = useRoute();

// پیدا کردن مقاله فعلی بر اساس Slug آدرس بار
const post = computed(() => {
  if (!BLOG) return null;
  return BLOG.find((b) => b.slug === route.params.slug);
});

// پیدا کردن هوشمند مقالات مرتبط (ابتدا هم‌موضوع، سپس مابقی، حداکثر ۳ عدد)
const related = computed(() => {
  if (!post.value || !BLOG) return [];
  
  // ۱. فیلتر کردن مقاله فعلی از لیست کل
  const otherPosts = BLOG.filter((b) => b.slug !== post.value.slug);
  
  // ۲. پیدا کردن مقالاتی که دسته‌بندی یکسانی دارند
  const sameCategoryPosts = otherPosts.filter((b) => b.cat === post.value.cat);
  
  // ۳. ادغام و ایجاد خروجی یکتا
  const combined = [...sameCategoryPosts, ...otherPosts];
  
  // ۴. حذف تکراری‌ها و بازگرداندن دقیقاً ۳ مقاله برای شبکه سه ستونه دسکتاپ
  const uniquePosts = Array.from(new Set(combined));
  return uniquePosts.slice(0, 3);
});
</script>
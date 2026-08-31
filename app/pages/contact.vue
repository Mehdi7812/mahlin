<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24">
    <!-- هدر صفحه (مینیمال و مجلل) -->
    <div class="text-center mb-16 md:mb-20">
      <div class="flex items-center justify-center gap-2.5 mb-3">
        <span class="w-6 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">همراه شما هستیم</span>
        <span class="w-6 h-px bg-gold/60"></span>
      </div>
      <h1 class="text-3xl md:text-4.5xl font-display text-ink font-bold mb-4">ارتباط با ماهلین</h1>
      <p class="text-ink/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        سوالی درباره محصولات دارید یا نیاز به مشاوره پوستی دارید؟ کارشناسان ما آماده پاسخگویی به شما هستند.
      </p>
    </div>

    <!-- گرید اصلی دو ستونه (دسکتاپ: دو ستونه / موبایل: تک ستونه) -->
    <div class="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
      <!-- ستون اول: فرم تماس لوکس و تعاملی -->
      <div class="bg-card border border-ink/[0.03] rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div class="absolute -top-24 -start-24 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        
        <Transition
          mode="out-in"
          enter-active-class="transition-[opacity,transform] duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-[opacity,transform] duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <!-- فرم اصلی -->
          <form v-if="!isSent" @submit.prevent="handleSubmit" class="space-y-5 relative z-10">
            <h2 class="text-lg font-bold text-ink mb-6">ارسال پیام مستقیم</h2>
            
            <div class="grid sm:grid-cols-2 gap-5">
              <!-- نام -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-ink/60 mr-1">نام و نام خانوادگی</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  required
                  placeholder="مثال: سارا احمدی" 
                  class="w-full px-4 py-3.5 rounded-2xl border border-ink/10 focus:border-gold/60 bg-ink/[0.01] text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all duration-300"
                />
              </div>

              <!-- ایمیل -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-ink/60 mr-1">نشانی ایمیل</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  placeholder="example@gmail.com" 
                  class="w-full px-4 py-3.5 rounded-2xl border border-ink/10 focus:border-gold/60 bg-ink/[0.01] text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all duration-300 font-latin text-left"
                />
              </div>
            </div>

            <!-- موضوع پیام -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-ink/60 mr-1">موضوع ارتباط</label>
              <input 
                v-model="form.subject"
                type="text" 
                placeholder="مثال: مشاوره تخصصی پوست / پیگیری سفارش" 
                class="w-full px-4 py-3.5 rounded-2xl border border-ink/10 focus:border-gold/60 bg-ink/[0.01] text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all duration-300"
              />
            </div>

            <!-- پیام -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-ink/60 mr-1">متن پیام شما</label>
              <textarea 
                v-model="form.message"
                required
                rows="5" 
                placeholder="پیام خود را بنویسید..." 
                class="w-full px-4 py-3.5 rounded-2xl border border-ink/10 focus:border-gold/60 bg-ink/[0.01] text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all duration-300 resize-none leading-relaxed"
              ></textarea>
            </div>

            <!-- دکمه ارسال با افکت لودینگ تمیز -->
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full sm:w-auto px-8 py-4 bg-ink hover:bg-gold text-cream hover:text-ink font-bold text-sm rounded-full transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></span>
              <span v-else>ارسال پیام به ماهلین</span>
              <svg v-if="!loading" class="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>

          <!-- کارت پیام موفقیت‌آمیز پس از ارسال -->
          <div v-else class="text-center py-10 px-4 flex flex-col items-center justify-center">
            <div class="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6 animate-bounce">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-ink mb-3">پیام شما با موفقیت دریافت شد</h3>
            <p class="text-ink/60 text-sm max-w-sm mx-auto leading-relaxed mb-8">
              سپاس از ارتباط شما با ماهلین. همکاران ما در دپارتمان پشتیبانی به زودی و در کمتر از ۲۴ ساعت کاری با شما تماس خواهند گرفت.
            </p>
            <button 
              @click="isSent = false" 
              class="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-ink font-bold text-xs rounded-full transition-all duration-300"
            >
              ارسال پیام جدید
            </button>
          </div>
        </Transition>
      </div>

      <!-- ستون دوم: اطلاعات ارتباطی و لوکیشن -->
      <div class="space-y-6">
        <h2 class="text-xl font-bold text-ink mb-2">اطلاعات تماس و آدرس</h2>
        
        <!-- کارت‌های مینی‌مالیستی ارتباطی -->
        <div class="grid gap-4">
          
          <!-- تلفن پشتیبانی -->
          <div class="flex items-start gap-4 p-5 bg-cardLight border border-ink/[0.02] rounded-2xl transition-all duration-300 hover:border-gold/20">
            <div class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div>
              <span class="block text-xs font-bold text-ink/40 mb-1">شماره تماس پشتیبانی</span>
              <a dir="ltr" href="tel:02191000000" class="text-sm font-bold text-ink hover:text-gold transition-colors font-latin">021 - 91000000</a>
            </div>
          </div>

          <!-- پست الکترونیک -->
          <div class="flex items-start gap-4 p-5 bg-cardLight border border-ink/[0.02] rounded-2xl transition-all duration-300 hover:border-gold/20">
            <div class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6l-10 7L2 6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <span class="block text-xs font-bold text-ink/40 mb-1">ایمیل مکاتبات رسمی</span>
              <a href="mailto:support@mahlin.com" class="text-sm font-bold text-ink hover:text-gold transition-colors font-latin">support@mahlin.com</a>
            </div>
          </div>

          <!-- ساعات کاری -->
          <div class="flex items-start gap-4 p-5 bg-cardLight border border-ink/[0.02] rounded-2xl transition-all duration-300 hover:border-gold/20">
            <div class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <span class="block text-xs font-bold text-ink/40 mb-1">ساعات پاسخگویی</span>
              <p class="text-sm font-bold text-ink">شنبه تا چهارشنبه از ۹:۰۰ الی ۱۸:۰۰</p>
              <p class="text-[11px] text-ink/40 mt-0.5">پنج‌شنبه‌ها از ۹:۰۰ الی ۱۳:۰۰ (بجز ایام تعطیل رسمی)</p>
            </div>
          </div>

          <!-- آدرس فیزیکی -->
          <div class="flex items-start gap-4 p-5 bg-cardLight border border-ink/[0.02] rounded-2xl transition-all duration-300 hover:border-gold/20">
            <div class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <span class="block text-xs font-bold text-ink/40 mb-1">نشانی دفتر مرکزی</span>
              <p class="text-sm font-bold text-ink leading-relaxed">
                تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۱۲، واحد ۳
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);
const isSent = ref(false);

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

function handleSubmit() {
  loading.value = true;
  
  // شبیه‌سازی ارسال اطلاعات به سرور با یک تأخیر شکیل و روان
  setTimeout(() => {
    loading.value = false;
    isSent.value = true;
    
    // بازنشانی مقادیر فرم
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }, 1200);
}
</script>
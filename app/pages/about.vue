<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">
    <!-- ۱. بخش آغازین: بیانیه برند -->
    <section class="relative max-w-[900px] mx-auto text-center mb-20 md:mb-28">
      <div class="absolute -top-20 start-1/2 -translate-x-1/2 w-80 h-80 bg-gold/[0.06] blur-[110px] rounded-full pointer-events-none"></div>
      
      <div class="flex items-center justify-center gap-2.5 mb-4 animate-fade-in-up">
        <span class="w-6 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">اصالت و فلسفه ماهلین</span>
        <span class="w-6 h-px bg-gold/60"></span>
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-display text-ink font-bold leading-tight mb-6 animate-fade-in-up" style="animation-delay:0.1s">
        تلفیقی اصیل از علم نوین بیولوژی <br class="hidden sm:inline"/> و عصاره ناب طبیعت
      </h1>
      <p class="text-ink/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style="animation-delay:0.2s">
        ماهلین تنها یک نام نیست؛ یک رویکرد نوین به سلامت، توازن و درخشش طبیعی پوست است. ما معتقدیم مراقبت از پوست، یک آیین روزانه برای ستایش زیبایی درونی شماست.
      </p>
    </section>

    <!-- ۲. آمار و ارقام برند -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24 md:mb-32">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="text-center p-6 sm:p-8 bg-card rounded-[20px] border border-ink/[0.03] animate-fade-in-up"
        :style="{ animationDelay: i * 0.1 + 's' }"
      >
        <span class="block text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1" :style="{ color: stat.color }">
          {{ stat.value }}
        </span>
        <span class="text-[11px] sm:text-xs text-ink/50 leading-relaxed">{{ stat.label }}</span>
      </div>
    </section>

    <!-- ۳. داستان شکل‌گیری و معرفی بنیان‌گذار -->
    <section class="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center mb-24 md:mb-32">
      <div class="relative w-full max-w-[460px] mx-auto lg:mx-0 aspect-[4/5] transform-gpu">
        <div class="absolute inset-0 bg-gold/5 rounded-tr-[120px] rounded-bl-[120px] translate-x-4 translate-y-4 -z-10 pointer-events-none" />
        <div class="absolute -top-6 -end-6 w-24 h-24 rounded-full bg-blush/10 blur-2xl pointer-events-none"></div>
        
        <div class="w-full h-full bg-cardLight rounded-tr-[120px] rounded-bl-[120px] overflow-hidden border border-ink/[0.06] relative">
          <img 
            src="/assets/founder-portrait.png" 
            alt="بنیان‌گذار ماهلین اسکین‌کر" 
            class="w-full h-full object-cover transition-all duration-700 ease-out"
            @error="onImgError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent pointer-events-none" />

          <!-- بج امضا روی تصویر -->
          <div class="absolute bottom-5 start-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
            <p class="text-xs font-bold text-ink">دکتر همتا جعفری</p>
            <!-- <p class="text-[10px] text-ink/50">بنیان‌گذار و رئیس تحقیقات</p> -->
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <span class="text-xs font-bold text-gold uppercase tracking-wider block">داستان یک آرمان</span>
        <h2 class="text-2xl sm:text-3xl font-display text-ink font-bold leading-snug">
          از دغدغه‌های آزمایشگاهی <br class="hidden sm:inline"/> تا خلق اکسیرهای درمانی
        </h2>
        <div class="text-ink/75 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            جرقه اولیه تأسیس ماهلین در سال ۱۳۹۸، در کلینیک‌های تخصصی پوست زده شد. جایی که خلاء فرمولاسیون‌های کاملاً ارگانیک اما با اثربخشی علمی و ماندگار به شدت احساس می‌شد.
          </p>
          <p>
            ما در ماهلین با گردآوری تیمی از برجسته‌ترین بیولوژیست‌ها و داروسازان آرایشی، کار خود را روی استخراج فعال‌ترین ذرات گیاهان بومی آغاز کردیم. ما معتقدیم که پوست یک ارگان زنده و هوشمند است.
          </p>
          <p class="font-display italic text-gold text-base sm:text-lg pt-2 border-r-2 border-gold/40 pr-4">
            "پوست شما لایق فرمولاسیونی است که بدون آسیب رساندن به سد دفاعی طبیعی، عمیق‌ترین چالش‌های بیولوژیکی آن را برطرف کند."
          </p>
        </div>
      </div>
    </section>

    <!-- ۴. خط زمانی مسیر رشد -->
    <section class="mb-24 md:mb-32">
      <div class="text-center mb-14">
        <div class="flex items-center justify-center gap-2.5 mb-3">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">مسیر رشد ماهلین</span>
          <span class="w-6 h-px bg-gold/60"></span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-display text-ink font-bold">نقاط عطف یک رویا</h2>
      </div>

      <div class="relative max-w-3xl mx-auto">
        <!-- خط عمودی -->
        <div class="absolute start-[15px] sm:start-1/2 top-0 bottom-0 w-px bg-ink/10 sm:-translate-x-1/2"></div>

        <div
          v-for="(m, i) in milestones"
          :key="m.year"
          class="relative flex sm:items-center gap-6 mb-10 last:mb-0"
          :class="i % 2 === 1 ? 'sm:flex-row-reverse' : ''"
        >
          <!-- نقطه رنگی روی خط -->
          <div class="absolute start-0 sm:start-1/2 top-1 sm:translate-x-1/2 w-8 h-8 rounded-full grid place-items-center z-10" :style="{ backgroundColor: m.color + '22' }">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: m.color }"></span>
          </div>

          <div class="flex-1 sm:w-1/2" :class="i % 2 === 1 ? 'sm:text-start sm:pl-10' : 'sm:text-end sm:pr-10'">
            <div class="ms-12 sm:ms-0 p-5 bg-card border border-ink/[0.03] rounded-2xl inline-block max-w-[340px]">
              <span class="font-latin font-bold text-lg" :style="{ color: m.color }">{{ m.year }}</span>
              <h3 class="text-sm font-bold text-ink mt-1 mb-1.5">{{ m.title }}</h3>
              <p class="text-xs text-ink/55 leading-relaxed">{{ m.desc }}</p>
            </div>
          </div>
          <div class="hidden sm:block sm:w-1/2"></div>
        </div>
      </div>
    </section>

    <!-- ۵. ستون‌های اصیل و ارزش‌های بنیادین -->
    <section class="border-y border-ink/10 py-16 md:py-20 mb-24 md:mb-32 relative">
      <div class="absolute -top-12 -start-12 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      
      <div class="grid sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
        <div
          v-for="(v, i) in values"
          :key="v.title"
          class="space-y-4 text-center sm:text-start animate-fade-in-up"
          :style="{ animationDelay: i * 0.1 + 's' }"
        >
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto sm:mx-0" :style="{ backgroundColor: v.color + '18', color: v.color }">
            <span v-html="v.icon" class="[&>svg]:w-[22px] [&>svg]:h-[22px]"></span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-ink">{{ v.title }}</h3>
          <p class="text-xs sm:text-sm text-ink/60 leading-relaxed">{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ۶. تیم تخصصی -->
    <!-- <section class="mb-24 md:mb-32">
      <div class="text-center mb-14">
        <div class="flex items-center justify-center gap-2.5 mb-3">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">پشت صحنه ماهلین</span>
          <span class="w-6 h-px bg-gold/60"></span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-display text-ink font-bold mb-2">تیم علمی و تخصصی ما</h2>
        <p class="text-ink/50 text-sm max-w-md mx-auto">افرادی که با تخصص و دقت، هر فرمول ماهلین را به واقعیت تبدیل می‌کنند</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(member, i) in team"
          :key="member.name"
          class="text-center group animate-fade-in-up"
          :style="{ animationDelay: i * 0.1 + 's' }"
        >
          <div class="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 transition-colors duration-300" :style="{ borderColor: member.color + '30' }">
            <div class="w-full h-full flex items-center justify-center text-2xl font-display font-bold" :style="{ backgroundColor: member.color + '15', color: member.color }">
              {{ member.name.charAt(0) }}
            </div>
          </div>
          <h3 class="text-sm font-bold text-ink">{{ member.name }}</h3>
          <p class="text-xs text-ink/45 mt-0.5">{{ member.role }}</p>
        </div>
      </div>
    </section> -->

    <!-- ۷. گواهی‌ها و همکاری‌های علمی -->
    <section class="mb-24 md:mb-32 bg-card rounded-[28px] py-10 px-6 sm:px-10">
      <div class="text-center mb-8">
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">استانداردها و گواهی‌ها</span>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <div v-for="cert in certifications" :key="cert.name" class="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
          <span class="w-9 h-9 rounded-full grid place-items-center flex-shrink-0" :style="{ backgroundColor: cert.color + '18', color: cert.color }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="text-xs sm:text-sm font-bold text-ink/70">{{ cert.name }}</span>
        </div>
      </div>
    </section>

    <!-- ۸. نقل‌قول پایانی -->
    <section class="max-w-[1000px] mx-auto bg-card border border-ink/[0.03] rounded-[32px] p-8 sm:p-14 md:p-20 text-center relative overflow-hidden transform-gpu mb-20">
      <div class="absolute -bottom-24 -end-24 w-60 h-60 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div class="absolute -top-16 -start-16 w-48 h-48 rounded-full bg-blush/[0.06] blur-3xl pointer-events-none" />
      <div class="max-w-2xl mx-auto space-y-6 relative z-10">
        <svg class="w-10 h-10 text-gold/30 mx-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote class="text-lg sm:text-xl md:text-2xl font-display text-ink leading-relaxed">
          «پوست شما یک بوم نقاشی از سلامت درونی شماست. ما در ماهلین این بوم را با ترکیب علم روز دنیا و مینی‌مالیسمِ آرامش‌بخش طبیعت، زیباتر و درخشان‌تر می‌کنیم.»
        </blockquote>
        <cite class="block text-xs uppercase tracking-widest text-gold font-bold font-latin mt-4">
          — Mahlin Dermatological Laboratory
        </cite>
      </div>
    </section>

    <!-- ۹. CTA پایانی -->
    <section class="text-center">
      <h2 class="text-xl sm:text-2xl font-display text-ink font-bold mb-4">آماده تجربه تفاوت ماهلین هستید؟</h2>
      <p class="text-ink/50 text-sm mb-7 max-w-md mx-auto">مجموعه کامل محصولات علمی و طبیعی ماهلین را کشف کنید.</p>
      <NuxtLink 
        to="/shop" 
        class="inline-flex items-center gap-3 px-8 py-4 bg-ink hover:bg-gold text-cream rounded-full text-sm font-bold transition-colors duration-300"
      >
        <span>مشاهده محصولات</span>
        <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { value: '۷+', label: 'سال تجربه تخصصی', color: '#A28466' },
  { value: '۵۰هزار+', label: 'مشتری راضی', color: '#6BA5C4' },
  { value: '۳۰+', label: 'محصول فرموله‌شده', color: '#7BA582' },
  { value: '۴.۹', label: 'میانگین رضایت', color: '#DE8E89' },
];

const milestones = [
  { year: '۱۳۹۸', title: 'شکل‌گیری ایده', desc: 'شروع تحقیقات اولیه در کلینیک‌های تخصصی پوست تهران.', color: '#A28466' },
  { year: '۱۳۹۹', title: 'تأسیس آزمایشگاه', desc: 'راه‌اندازی اولین آزمایشگاه فرمولاسیون ماهلین با تیم ۵ نفره.', color: '#6BA5C4' },
  { year: '۱۴۰۱', title: 'عرضه اولین محصول', desc: 'رونمایی از سرم نیاسینامید، اولین محصول رسمی ماهلین.', color: '#7BA582' },
  { year: '۱۴۰۳', title: 'گسترش مجموعه', desc: 'افزایش خط تولید به بیش از ۳۰ محصول تخصصی.', color: '#DE8E89' },
  { year: '۱۴۰۵', title: 'امروز', desc: 'ماهلین، انتخاب هزاران مشتری وفادار در سراسر کشور.', color: '#C29A45' },
];

const values = [
  {
    title: 'فرمولاسیون علمی اثبات‌شده',
    desc: 'تمامی ترکیبات ماهلین پیش از عرضه، در آزمایشگاه‌های درماتولوژی تست شده و اثربخشی بالینی آن‌ها به اثبات رسیده است.',
    color: '#6BA5C4',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5" stroke-linecap="round"/><circle cx="12" cy="10" r="6"/><path d="M12 4v12M8 10h8" stroke-linecap="round"/></svg>'
  },
  {
    title: 'پایداری و احترام به زیست‌بوم',
    desc: 'ما ترکیبات خود را به روش‌های اخلاقی تأمین می‌کنیم. بسته‌بندی‌های ما قابل بازیافت و کاملاً Cruelty-Free هستند.',
    color: '#7BA582',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12l3 3 5-6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    title: 'شفافیت بی‌قیدوشرط',
    desc: 'ما به شما می‌گوییم دقیقاً چه چیزی روی پوست خود می‌گذارید. بدون پارابن، سولفات خشن، عطر مصنوعی و روغن معدنی.',
    color: '#DE8E89',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 12h18M12 3a9 9 0 019 9M12 3a9 9 0 00-9 9M12 21a9 9 0 009-9M12 21a9 9 0 01-9-9" stroke-linecap="round"/></svg>'
  }
];

const team = [
  { name: 'دکتر آرمین حسینی', role: 'بنیان‌گذار و متخصص پوست', color: '#A28466' },
  { name: 'مهندس نگار صدر', role: 'مسئول فرمولاسیون', color: '#6BA5C4' },
  { name: 'دکتر سارا کریمی', role: 'بیولوژیست سلولی', color: '#7BA582' },
  { name: 'رضا امینی', role: 'مسئول کنترل کیفیت', color: '#DE8E89' },
];

const certifications = [
  { name: 'GMP Certified', color: '#A28466' },
  { name: 'Cruelty-Free', color: '#7BA582' },
  { name: 'ISO 22716', color: '#6BA5C4' },
  { name: 'Dermatologically Tested', color: '#DE8E89' },
];

function onImgError(e) {
  e.target.style.display = 'none';
  const parent = e.target.parentNode;
  parent.classList.add('bg-gradient-to-br', 'from-gold/20', 'via-cream', 'to-gold/10');
  
  const placeholderText = document.createElement('div');
  placeholderText.className = 'absolute inset-0 flex items-center justify-center text-xs font-bold text-gold/40 tracking-wider uppercase';
  placeholderText.innerText = 'Mahlin Aesthetics';
  parent.appendChild(placeholderText);
}
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.7s ease-out forwards;
}
</style>
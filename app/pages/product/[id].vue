<template>
  <div v-if="item" class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16 pb-28 md:pb-16">
    
    <!-- ناوبری مسیر خرید (Breadcrumb) -->
    <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8 flex-wrap">
      <NuxtLink to="/" class="hover:text-gold transition-colors">خانه</NuxtLink>
      <span>/</span>
      <NuxtLink to="/shop" class="hover:text-gold transition-colors">فروشگاه</NuxtLink>
      <span>/</span>
      <NuxtLink :to="{ path: '/shop', query: { cat: item.cat } }" class="hover:text-gold transition-colors">{{ item.cat }}</NuxtLink>
      <span>/</span>
      <span class="text-ink font-bold line-clamp-1">{{ item.name }}</span>
    </nav>

    <!-- گرید اصلی محصول -->
    <div class="grid md:grid-cols-12 gap-8 lg:gap-16 items-start">
      
      <!-- ستون سمت راست: تصویر -->
      <div class="md:col-span-5 md:sticky md:top-[100px]">
        <div 
          class="aspect-square bg-white border rounded-tr-[80px] sm:rounded-tr-[100px] rounded-[24px] relative overflow-hidden flex items-center justify-center p-2 group"
          :style="{ borderColor: catInfo.borderColor }"
        >
          <!-- بج تخفیف روی تصویر -->
          <span 
            v-if="discountPercent > 0" 
            class="absolute top-4 start-4 z-10 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
            :style="{ backgroundColor: catInfo.accent }"
          >
            {{ discountPercent }}٪ تخفیف
          </span>

          <!-- دکمه‌های علاقه‌مندی و اشتراک‌گذاری -->
          <div class="absolute top-4 end-4 z-10 flex flex-col gap-2">
            <button
              type="button"
              :aria-label="isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
              class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md grid place-items-center transition-all duration-300 hover:scale-110"
              @click="isWishlisted = !isWishlisted"
            >
              <svg class="w-4 h-4 transition-colors" :class="isWishlisted ? 'text-blush' : 'text-ink/40'" :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M12 21s-6.7-4.35-9.3-8.2C1 10 1.5 6.5 4.6 5.1 7 4 9.6 4.9 12 7.5c2.4-2.6 5-3.5 7.4-2.4 3.1 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              aria-label="اشتراک‌گذاری"
              class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md grid place-items-center transition-all duration-300 hover:scale-110"
              @click="shareProduct"
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

          <img 
            :src="normalizeImg(activeImage)" 
            :alt="item.name" 
            loading="lazy"
            class="w-[90%] h-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu relative z-[1]" 
          />

          <!-- پوشش ناموجود -->
          <div v-if="item.inStock === false" class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-[2]">
            <span class="bg-ink/85 text-white text-sm font-bold px-5 py-2.5 rounded-full">ناموجود</span>
          </div>
        </div>

        <!-- تصاویر مینیاتوری -->
        <div v-if="item.images && item.images.length > 1" class="flex gap-2.5 mt-4">
          <button
            v-for="(img, i) in item.images"
            :key="i"
            class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0"
            :style="{ borderColor: activeImage === img ? catInfo.accent : 'transparent' }"
            @click="activeImage = img"
          >
            <img :src="normalizeImg(img)" class="w-full h-full object-cover" />
          </button>
        </div>

        <!-- نوار اعتماد کوچک زیر تصویر -->
        <div class="grid grid-cols-3 gap-2 mt-5">
          <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
            <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" stroke-linejoin="round"/></svg>
            <span class="text-[10px] text-ink/50 font-bold">اصالت کالا</span>
          </div>
          <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
            <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke-linejoin="round"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>
            <span class="text-[10px] text-ink/50 font-bold">ارسال سریع</span>
          </div>
          <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
            <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v6h6M20 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15a8 8 0 0014 3M19 9A8 8 0 005 6" stroke-linecap="round"/></svg>
            <span class="text-[10px] text-ink/50 font-bold">۷ روز ضمانت</span>
          </div>
        </div>
      </div>

      <!-- ستون سمت چپ: جزئیات خرید -->
      <div class="md:col-span-7 space-y-6">
        <div>
          <div class="flex items-center justify-between gap-2 mb-1">
            <span v-if="item.brand" class="text-xs font-latin font-bold uppercase tracking-widest" :style="{ color: catInfo.accent }">
              {{ item.brand }}
            </span>
            <span v-else class="text-[11px] font-bold px-2.5 py-1 rounded-full" :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }">
              {{ item.cat }}
            </span>

            <span v-if="avgRating" class="flex items-center gap-1 text-xs text-ink/50">
              <svg class="w-3.5 h-3.5 text-gold fill-gold" viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/></svg>
              {{ avgRating }} ({{ item.reviews.length }} نظر)
            </span>
          </div>

          <h1 class="text-2xl sm:text-3.5xl font-display text-ink font-bold leading-tight">{{ item.name }}</h1>
          <span class="block text-xs sm:text-sm text-ink/40 font-latin uppercase mt-1">{{ item.latin }}</span>
        </div>

        <p class="text-sm sm:text-base text-ink/70 leading-relaxed max-w-[620px]">{{ item.desc }}</p>

        <!-- بخش قیمت و مشخصات حجم کالا -->
        <div class="flex items-center gap-4 py-4 px-5 bg-card border rounded-2xl max-w-[440px]" :style="{ borderColor: catInfo.borderColor }">
          <div>
            <span class="block text-[10px] text-ink/40 mb-0.5">قیمت محصول</span>
            <div class="flex items-baseline gap-2">
              <span v-if="item.oldPrice && item.oldPrice > item.price" class="text-sm text-ink/35 line-through font-latin">
                {{ money(item.oldPrice) }}
              </span>
              <div class="text-xl sm:text-2xl font-bold font-latin" :style="{ color: catInfo.accent }">
                {{ money(item.price) }}
                <span class="text-xs text-ink/50 font-normal font-sans mr-0.5">تومان</span>
              </div>
            </div>
          </div>
          <div v-if="item.size" class="mr-auto pr-4 border-r border-ink/10 text-left">
            <span class="block text-[10px] text-ink/40 mb-0.5">حجم / مقدار</span>
            <span class="text-sm font-bold text-ink font-latin">{{ item.size }}</span>
          </div>
        </div>

        <!-- وضعیت موجودی / اطلاع‌رسانی -->
        <div v-if="item.inStock !== false" class="space-y-1.5">
          <div class="flex items-center gap-2 text-xs">
            <span class="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
            <span class="text-sage font-bold">موجود در انبار</span>
          </div>
          <div v-if="lowStock" class="flex items-center gap-1.5 text-xs">
            <svg class="w-3.5 h-3.5 text-peach" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
            <span class="text-peach font-bold">فقط {{ fa(item.stockCount) }} عدد در انبار باقی مانده</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-ink/40">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4M3 11h18" stroke-linecap="round"/></svg>
            تحویل تخمینی: {{ deliveryEstimate }}
          </div>
        </div>

        <!-- فرم اطلاع‌رسانی موجودی برای کالای ناموجود -->
        <div v-else class="space-y-2.5 py-2">
          <p class="text-xs text-ink/50 leading-relaxed">این محصول موقتاً ناموجود است. با ثبت ایمیل، به محض موجود شدن به شما اطلاع می‌دهیم.</p>
          <form v-if="!notifySubmitted" @submit.prevent="handleNotify" class="flex gap-2 max-w-[400px]">
            <input v-model="notifyEmail" type="email" required placeholder="ایمیل شما" class="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
            <button type="submit" class="px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-bold hover:bg-gold transition-colors whitespace-nowrap">اطلاع بده</button>
          </form>
          <p v-else class="text-xs text-sage flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ثبت شد! به‌محض موجود شدن باخبر می‌شوید.
          </p>
        </div>

        <!-- کنترل تعداد و دکمه افزودن به سبد خرید (دسکتاپ) -->
        <div class="hidden md:flex items-center gap-3 max-w-[480px] pt-3 pb-6 border-b border-ink/[0.06]">
          <div class="flex items-center bg-cardLight rounded-full h-12 overflow-hidden border border-ink/[0.04]">
            <button @click="qty = Math.max(1, qty - 1)" class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors">−</button>
            <span class="w-8 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
            <button @click="increment" :disabled="atMaxStock" class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">+</button>
          </div>

          <button 
            :disabled="item.inStock === false"
            class="flex-1 h-12 text-cream rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden relative"
            :style="{ backgroundColor: justAdded ? '#7BA582' : catInfo.darkAccent }"
            @click="handleAdd"
          >
            <Transition name="cart-fade" mode="out-in">
              <span v-if="!justAdded" key="add" class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
                  <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
                </svg>
                افزودن به سبد خرید
              </span>
              <span v-else key="added" class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                به سبد اضافه شد
              </span>
            </Transition>
          </button>
        </div>
        <p v-if="atMaxStock" class="hidden md:block text-[11px] text-peach -mt-4">حداکثر موجودی برای این محصول انتخاب شده است.</p>

        <!-- سیستم آکاردئونی -->
        <div class="space-y-1">
          <div v-if="item.long" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('long')" 
              :aria-expanded="activeTab === 'long'"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>توضیحات و فواید محصول</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'long' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'long' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="activeTab === 'long' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
              <div class="overflow-hidden">
                <div class="text-xs sm:text-sm text-ink/60 leading-loose space-y-3">
                  <p>{{ item.long }}</p>
                  <div v-if="item.suited" class="flex items-start gap-2 p-3 rounded-xl" :style="{ backgroundColor: catInfo.iconBg }">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0" :style="{ color: catInfo.accent }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2a5 5 0 015 5c0 3-2 5-2 8H9c0-3-2-5-2-8a5 5 0 015-5z" stroke-linejoin="round"/>
                      <path d="M9 21h6" stroke-linecap="round"/>
                    </svg>
                    <p class="text-ink/70"><b class="text-ink">مناسب برای نوع پوست:</b> {{ item.suited }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="item.inci" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('inci')" 
              :aria-expanded="activeTab === 'inci'"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>ترکیبات کلیدی و علمی (Inci)</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'inci' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'inci' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="activeTab === 'inci' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
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

          <div v-if="item.usage" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('usage')" 
              :aria-expanded="activeTab === 'usage'"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
            >
              <span>راهنمای و روش استفاده</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="activeTab === 'usage' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="activeTab === 'usage' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="activeTab === 'usage' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
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

          <div v-if="item.caution" class="border-b border-ink/[0.06] py-3">
            <button 
              @click="toggleTab('caution')" 
              :aria-expanded="activeTab === 'caution'"
              class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-accent py-2.5 transition-colors group"
            >
              <span>احتیاط‌ها و هشدارهای پوستی</span>
              <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
                <span class="absolute w-3.5 h-[1.5px] bg-accent/80 rounded transition-transform duration-300" :class="activeTab === 'caution' ? 'rotate-180' : ''"></span>
                <span class="absolute w-[1.5px] h-3.5 bg-accent/80 rounded transition-transform duration-300" :class="activeTab === 'caution' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
              </span>
            </button>
            <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="activeTab === 'caution' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
              <div class="overflow-hidden">
                <div class="py-2">
                  <div class="bg-blush/[0.06] border border-blush/20 rounded-xl p-4">
                    <div class="flex items-center gap-2 mb-2 text-blush font-bold text-xs">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      نکات مهم ایمنی
                    </div>
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
    </div>

    <!-- بخش نظرات خریداران -->
    <section v-if="item.reviews" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div class="flex items-center gap-2">
          <span class="w-6 h-px bg-gold/60"></span>
          <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">نظرات و تجربیات خریداران</h2>
        </div>

        <div class="flex items-center gap-3 bg-card px-4 py-2.5 rounded-full w-fit">
          <span class="text-xl font-bold text-ink font-latin">{{ avgRating }}</span>
          <div class="flex gap-0.5 text-gold text-sm">
            <span v-for="s in 5" :key="s">★</span>
          </div>
          <span class="text-xs text-ink/40">از {{ item.reviews.length }} نظر</span>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(r, i) in item.reviews" :key="i" class="p-6 bg-card border border-ink/[0.03] rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div>
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="font-bold text-ink flex items-center gap-2">
                <span class="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white" :style="{ backgroundColor: catInfo.accent }">{{ r.name.charAt(0) }}</span>
                {{ r.name }}
              </span>
              <span class="text-ink/40 font-latin">{{ r.date }}</span>
            </div>
            <div class="flex gap-0.5 text-gold text-sm mb-3">
              <span v-for="star in parseStars(r.stars)" :key="star">★</span>
            </div>
            <p class="text-xs sm:text-sm text-ink/70 leading-relaxed">{{ r.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- محصولات مشابه پیشنهادی -->
    <section v-if="related.length" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
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

    <!-- بازدیدهای اخیر -->
    <section v-if="recentlyViewed.length" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
      <div class="flex items-center gap-2 mb-8">
        <span class="w-6 h-px bg-gold/60"></span>
        <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">بازدیدهای اخیر شما</h2>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard v-for="p in recentlyViewed" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- نوار چسبان خرید (فقط موبایل) -->
    <div class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink/10 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
      <div class="flex items-center bg-cardLight rounded-full h-11 overflow-hidden border border-ink/[0.06] flex-shrink-0">
        <button @click="qty = Math.max(1, qty - 1)" class="w-9 h-full flex items-center justify-center text-ink/50 text-lg">−</button>
        <span class="w-7 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
        <button @click="increment" :disabled="atMaxStock" class="w-9 h-full flex items-center justify-center text-ink/50 text-lg disabled:opacity-30">+</button>
      </div>
      <button 
        :disabled="item.inStock === false"
        class="flex-1 h-11 text-cream rounded-full text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-40"
        :style="{ backgroundColor: justAdded ? '#7BA582' : catInfo.darkAccent }"
        @click="handleAdd"
      >
        <Transition name="cart-fade" mode="out-in">
          <span v-if="!justAdded" key="add">افزودن به سبد — {{ money(item.price * qty) }} تومان</span>
          <span v-else key="added" class="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            اضافه شد
          </span>
        </Transition>
      </button>
    </div>

  </div>

  <!-- حالت محصول یافت نشد -->
  <div v-else class="max-w-[560px] mx-auto px-4 py-24 text-center">
    <div class="w-20 h-20 rounded-full bg-card mx-auto grid place-items-center mb-6">
      <svg class="w-8 h-8 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.3-4.3" stroke-linecap="round"/>
      </svg>
    </div>
    <h1 class="text-xl font-bold text-ink mb-2">محصول مورد نظر پیدا نشد</h1>
    <p class="text-sm text-ink/50 mb-6">ممکن است این محصول حذف شده یا آدرس صفحه اشتباه باشد.</p>
    <NuxtLink to="/shop" class="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream rounded-full text-sm font-bold hover:bg-gold transition-colors">
      بازگشت به فروشگاه
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { PRODUCTS, PLACEHOLDER_IMG } from '~/data/products';
import { money, fa } from '~/utils/format';

const route = useRoute();
const qty = ref(1);
const activeTab = ref('long');
const isWishlisted = ref(false);
const copied = ref(false);
const justAdded = ref(false);
const notifyEmail = ref('');
const notifySubmitted = ref(false);
const activeImage = ref(null);
const recentlyViewed = ref([]);

const { add } = useCart();

const item = computed(() => PRODUCTS.find((p) => p.id === route.params.id));

// --- رفع باگ: به‌روزرسانی تصویر فعال + بازدید اخیر هنگام تعویض محصول ---
watch(
  item,
  (newItem, oldItem) => {
    if (!newItem) return;
    activeImage.value = newItem.img || (newItem.images && newItem.images[0]);
    qty.value = 1;
    loadRecentlyViewed();
    saveToRecentlyViewed();
    if (process.client && oldItem && oldItem.id !== newItem.id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  { immediate: true }
);

// نرمال‌سازی مسیر تصویر (رفع باگ اسلش تکراری/آندیفاین)
function normalizeImg(path) {
  if (!path) return PLACEHOLDER_IMG;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return '/' + path;
}

// fallback هوشمند: اگه دسته‌بندی کمتر از ۴ محصول داشت، از سایر دسته‌ها پر می‌شه
const related = computed(() => {
  if (!item.value) return [];
  const sameCat = PRODUCTS.filter((p) => p.id !== item.value.id && p.cat === item.value.cat);
  if (sameCat.length >= 4) return sameCat.slice(0, 4);
  const others = PRODUCTS.filter((p) => p.id !== item.value.id && p.cat !== item.value.cat);
  return [...sameCat, ...others].slice(0, 4);
});

// --- بازدیدهای اخیر (localStorage) ---
const RECENT_KEY = 'mahlin_recently_viewed';

function loadRecentlyViewed() {
  if (!process.client || !item.value) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    recentlyViewed.value = ids
      .filter((id) => id !== item.value.id)
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
  } catch {
    recentlyViewed.value = [];
  }
}

function saveToRecentlyViewed() {
  if (!process.client || !item.value) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    let ids = raw ? JSON.parse(raw) : [];
    ids = ids.filter((id) => id !== item.value.id);
    ids.unshift(item.value.id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, 8)));
  } catch {}
}

// پالت رنگی هماهنگ با دسته‌بندی
const PALETTE = {
  'شوینده': { borderColor: 'rgba(156,191,160,0.20)', blobColor: 'rgba(156,191,160,0.14)', iconBg: 'rgba(156,191,160,0.14)', accent: '#7BA582', darkAccent: '#5F8A66' },
  'آبرسان': { borderColor: 'rgba(143,193,217,0.20)', blobColor: 'rgba(143,193,217,0.14)', iconBg: 'rgba(143,193,217,0.14)', accent: '#6BA5C4', darkAccent: '#4C87A6' },
  'ترمیم‌کننده و مرطوب‌کننده': { borderColor: 'rgba(185,166,222,0.20)', blobColor: 'rgba(185,166,222,0.14)', iconBg: 'rgba(185,166,222,0.14)', accent: '#9C87C4', darkAccent: '#7C67A8' },
  'ضدلک و روشن‌کننده': { borderColor: 'rgba(224,183,88,0.20)', blobColor: 'rgba(224,183,88,0.12)', iconBg: 'rgba(224,183,88,0.14)', accent: '#C29A45', darkAccent: '#A17F35' },
  'کرم جوانساز و لیفتینگ': { borderColor: 'rgba(243,180,176,0.20)', blobColor: 'rgba(243,180,176,0.14)', iconBg: 'rgba(243,180,176,0.14)', accent: '#DE8E89', darkAccent: '#C36F6A' },
  'دورچشم': { borderColor: 'rgba(110,178,178,0.20)', blobColor: 'rgba(110,178,178,0.12)', iconBg: 'rgba(110,178,178,0.14)', accent: '#519494', darkAccent: '#3D7676' },
  'ضدآفتاب': { borderColor: 'rgba(242,168,104,0.20)', blobColor: 'rgba(242,168,104,0.12)', iconBg: 'rgba(242,168,104,0.14)', accent: '#D68C4B', darkAccent: '#B76F32' },
};
const DEFAULT_PALETTE = { borderColor: 'rgba(162,132,102,0.18)', blobColor: 'rgba(162,132,102,0.10)', iconBg: 'rgba(162,132,102,0.12)', accent: '#A28466', darkAccent: '#3F3A35' };

const catInfo = computed(() => (item.value && PALETTE[item.value.cat]) || DEFAULT_PALETTE);

const discountPercent = computed(() => {
  if (!item.value) return 0;
  const { price, oldPrice } = item.value;
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
});

const avgRating = computed(() => {
  if (!item.value?.reviews?.length) return null;
  const sum = item.value.reviews.reduce((acc, r) => acc + parseStars(r.stars), 0);
  return (sum / item.value.reviews.length).toFixed(1);
});

const lowStock = computed(() => {
  const s = item.value?.stockCount;
  return typeof s === 'number' && s > 0 && s <= 5;
});

const atMaxStock = computed(() => {
  const s = item.value?.stockCount;
  return typeof s === 'number' && qty.value >= s;
});

// تخمین بازه زمانی تحویل (۱ تا ۳ روز آینده)
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

function toggleTab(tabName) {
  activeTab.value = activeTab.value === tabName ? '' : tabName;
}

function parseStars(stars) {
  if (typeof stars === 'number') return stars;
  const match = stars.match(/★/g);
  return match ? match.length : 5;
}

function handleAdd() {
  if (item.value.inStock === false) return;
  add(item.value.id, qty.value);
  justAdded.value = true;
  setTimeout(() => { justAdded.value = false; }, 1800);
}

function handleNotify() {
  // TODO: اتصال به API واقعی اطلاع‌رسانی موجودی
  notifySubmitted.value = true;
  notifyEmail.value = '';
}

async function shareProduct() {
  const shareData = {
    title: item.value.name,
    text: item.value.desc,
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch {}
  } else {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  }
}

// --- سئو: متادیتا + Schema.org برای موتورهای جستجو ---
useSeoMeta({
  title: () => item.value ? `${item.value.name} | ماهلین اسکین‌کر` : 'محصول یافت نشد | ماهلین',
  description: () => item.value?.desc ?? 'فروشگاه تخصصی مراقبت پوست ماهلین',
  ogTitle: () => item.value?.name,
  ogDescription: () => item.value?.desc,
  ogImage: () => item.value ? normalizeImg(item.value.img) : undefined,
});

useHead(() => ({
  script: item.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: item.value.name,
          image: [normalizeImg(item.value.img)],
          description: item.value.desc,
          brand: item.value.brand ? { '@type': 'Brand', name: item.value.brand } : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'IRR',
            price: item.value.price,
            availability: item.value.inStock === false
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          },
          aggregateRating: avgRating.value
            ? {
                '@type': 'AggregateRating',
                ratingValue: avgRating.value,
                reviewCount: item.value.reviews.length,
              }
            : undefined,
        }),
      }]
    : [],
}));
</script>

<style scoped>
.cart-fade-enter-active,
.cart-fade-leave-active {
  transition: all 0.2s ease;
}
.cart-fade-enter-from,
.cart-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
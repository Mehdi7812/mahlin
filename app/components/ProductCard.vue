<template>
  <NuxtLink 
    :to="'/product/' + product.id" 
    class="flex flex-col h-full bg-ink/5 group hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(197,160,89,0.04)] rounded-md rounded-tr-[48px] transition-all duration-400 ease-out transform-gpu"
  >
    <!-- قاب امضا و اختصاصی تصویر (گوشه راست بالا خمیده - ۱۰۰٪ حفظ شده) -->
    <div class="h-[260px] relative bg-cardLight group-hover:bg-cardLight/70 border-b border-ink/10 rounded-tr-[48px] overflow-hidden transition-colors duration-500 ease-out">
      <!-- تصویر محصول با حفظ پوزیشن دقیق و افکت زوم ملایم هنگام هاور -->
      <img 
        :src="product.img || PLACEHOLDER_IMG" 
        :alt="'تصویر ' + product.name" 
        loading="lazy"
        class="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] object-cover  rounded-tr-[24px] transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu" 
      />
    </div>

    <!-- اطلاعات محصول (با چیدمان تراز شده و فوق‌العاده شیک) -->
    <div class="py-4 flex flex-col flex-1 gap-1 px-4">
      
      <!-- برند محصول -->
      <span 
        v-if="product.brand" 
        class="text-[11px] tracking-widest text-gold font-latin font-bold uppercase"
      >
        {{ product.brand }}
      </span>
      
      <!-- عنوان فارسی (تغییر رنگ به طلایی در هاور + لاین کلمپ هوشمند جهت یکدستی ارتفاع کارت‌ها) -->
      <h3 class="text-[15px] font-bold text-ink leading-snug line-clamp-1 group-hover:text-gold transition-colors duration-300">
        {{ product.name }}
      </h3>
      
      <!-- عنوان لاتین/تخصصی (مینیمال و خوش‌فرم) -->
      <span class="text-[12px] text-ink/40 font-latin uppercase tracking-normal line-clamp-1">
        {{ product.latin }}
      </span>
      
      <!-- قیمت (با ترازبندی هوشمند mt-auto همواره در پایین‌ترین نقطه کارت قرار می‌گیرد) -->
      <div class="mt-auto pt-3 flex items-baseline justify-between border-t border-ink/[0.04]">
        <span class="text-xs text-ink/40">قیمت</span>
        <span class="text-[15px] font-bold text-accent font-latin">
          {{ money(product.price) }}
          <span class="text-[11px] text-ink/50 font-normal font-sans mr-0.5">تومان</span>
        </span>
      </div>

    </div>
  </NuxtLink>
</template>

<script setup>
import { PLACEHOLDER_IMG } from '~/data/products';
import { money } from '~/utils/format';

defineProps({ 
  product: { 
    type: Object, 
    required: true 
  } 
});
</script>
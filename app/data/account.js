// app/data/account.js
// داده‌های استاتیک نمایشی برای صفحات پنل کاربری (داشبورد).
// در آینده باید با useGarnetApiFetch جایگزین شود.

import { PLACEHOLDER_IMG } from '~/data/products';

export const USER = {
  first_name: 'مهدی',
  last_name: 'کریمی',
  full_name: 'مهدی کریمی',
  mobile: '09121234567',
  avatar: null,
  member_since: '1403-02-11',
  level: 'نقره‌ای',
  points: 1240,
  wallet_balance: 350000,
};

// وضعیت‌های سفارش و متادیتای نمایشی هرکدام
export const ORDER_STATUS_META = {
  pending: { label: 'در انتظار پرداخت', bg: 'bg-peachLight', text: 'text-[#B9722E]', dot: 'bg-peach' },
  processing: { label: 'در حال آماده‌سازی', bg: 'bg-lilacLight', text: 'text-[#7A64AE]', dot: 'bg-lilac' },
  shipped: { label: 'ارسال شده', bg: 'bg-skyLight', text: 'text-[#3E7C99]', dot: 'bg-sky' },
  delivered: { label: 'تحویل شده', bg: 'bg-sageLight', text: 'text-[#5C8A61]', dot: 'bg-sage' },
  cancelled: { label: 'لغو شده', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400' },
};

export const ORDERS = [
  {
    id: 1042,
    code: 'MHL-1042',
    date: '1404-05-18',
    status: 'delivered',
    total: 2860000,
    items: [
      { title_fa: 'سرم نیاسینامید ۱۰٪', cover_image: PLACEHOLDER_IMG, qty: 1, price: 1240000 },
      { title_fa: 'کرم سرامیدی ترمیم‌کننده', cover_image: PLACEHOLDER_IMG, qty: 1, price: 1150000 },
      { title_fa: 'ژل شست‌وشوی متعادل‌کننده', cover_image: PLACEHOLDER_IMG, qty: 1, price: 380000 },
    ],
  },
  {
    id: 1038,
    code: 'MHL-1038',
    date: '1404-05-05',
    status: 'shipped',
    total: 980000,
    items: [
      { title_fa: 'آمپول آبرسان منافذ سنتلا', cover_image: PLACEHOLDER_IMG, qty: 1, price: 980000 },
    ],
  },
  {
    id: 1031,
    code: 'MHL-1031',
    date: '1404-04-22',
    status: 'processing',
    total: 1980000,
    items: [
      { title_fa: 'بوستر شات ویتامین ث آرنسیا', cover_image: PLACEHOLDER_IMG, qty: 1, price: 1980000 },
    ],
  },
  {
    id: 1019,
    code: 'MHL-1019',
    date: '1404-03-14',
    status: 'cancelled',
    total: 480000,
    items: [
      { title_fa: 'پاک‌کننده شیری ملایم', cover_image: PLACEHOLDER_IMG, qty: 1, price: 480000 },
    ],
  },
  {
    id: 1004,
    code: 'MHL-1004',
    date: '1404-02-02',
    status: 'delivered',
    total: 3130000,
    items: [
      { title_fa: 'بوستر شات رتینال آرنسیا', cover_image: PLACEHOLDER_IMG, qty: 1, price: 2980000 },
      { title_fa: 'پاک‌کننده شیری ملایم', cover_image: PLACEHOLDER_IMG, qty: 1, price: 150000 },
    ],
  },
];

// محصولات مورد علاقه — با ساختار مطابق ProductCard.vue
export const FAVORITES = [
  {
    id: 6,
    title_fa: 'آمپول آبرسان منافذ سنتلا',
    slug_fa: 'centella-poremizing-ampoule',
    category_title_fa: 'آبرسان',
    cover_image: PLACEHOLDER_IMG,
    price: 980000,
    final_price: 980000,
    allow_sale: 1,
    currency_name: 'تومان',
  },
  {
    id: 4,
    title_fa: 'سرم نیاسینامید ۱۰٪',
    slug_fa: 'niacinamide-10-serum',
    category_title_fa: 'ضدلک و روشن‌کننده',
    cover_image: PLACEHOLDER_IMG,
    price: 1240000,
    final_price: 1115000,
    allow_sale: 1,
    currency_name: 'تومان',
  },
  {
    id: 7,
    title_fa: 'کرم سرامیدی ترمیم‌کننده',
    slug_fa: 'ceramide-repair-cream',
    category_title_fa: 'ترمیم‌کننده و مرطوب‌کننده',
    cover_image: PLACEHOLDER_IMG,
    price: 1150000,
    final_price: 1150000,
    allow_sale: 0,
    currency_name: 'تومان',
  },
];

export const ADDRESSES = [
  {
    id: 1,
    title: 'خانه',
    receiver_full_name: 'مهدی کریمی',
    receiver_mobile: '09121234567',
    province: 'تهران',
    city: 'تهران',
    description: 'خیابان ولیعصر، بالاتر از میدان ونک، کوچه بهار، پلاک ۱۲، واحد ۳',
    postal_code: '1991634785',
    is_default: true,
  },
  {
    id: 2,
    title: 'محل کار',
    receiver_full_name: 'مهدی کریمی',
    receiver_mobile: '09121234567',
    province: 'تهران',
    city: 'تهران',
    description: 'بزرگراه شیخ فضل‌الله، برج آفتاب، طبقه ۸، واحد ۸۰۴',
    postal_code: '1458963214',
    is_default: false,
  },
];

export const LOYALTY = {
  points: 1240,
  tier: 'نقره‌ای',
  nextTier: 'طلایی',
  nextTierPoints: 2000,
  walletBalance: 350000,
  referralCode: 'MAHLIN-MEHDI40',
  history: [
    { title: 'خرید سفارش MHL-1042', date: '1404-05-18', amount: 286, type: 'earn' },
    { title: 'استفاده در سفارش MHL-1038', date: '1404-05-05', amount: -98, type: 'spend' },
    { title: 'خرید سفارش MHL-1031', date: '1404-04-22', amount: 198, type: 'earn' },
    { title: 'هدیه تولد', date: '1404-03-01', amount: 500, type: 'earn' },
  ],
};

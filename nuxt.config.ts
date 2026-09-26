import pkg from "./package.json";

export default defineNuxtConfig({
  compatibilityDate: "2024-08-01",

  ssr: false,

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/icon"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "fa", dir: "rtl" },

      title: "ماهلین اسکین‌کر",

      // پریلود فونت‌های حیاتی — تا وقتی CSS پارس بشه فونت‌ها از قبل
      // در حال دانلودن و پرش (FOUT) موقع لود صفحه دیده نمی‌شه
      link: [
        {
          rel: "preload",
          href: "/fonts/Vazirmatn-Variable.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/Lalezar-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    },

    buildAssetsDir: `/_nuxt_${pkg.version}/`,
  },

  pinia: {
    storesDirs: ["stores/**"],
  },

  runtimeConfig: {
    public: {
      // clientVersion: pkg.version,
      apiBase: "https://drmahlin.com/GarnetAPI",
    },
  },

  nitro: {
    // The cart lives in a signed cookie session on the server.
    // Replace NUXT_SESSION_PASSWORD in production.
    storage: {},
    prerender: {
      failOnError: false,
      ignore: [
        '/faq', '/privacy', '/shipping', '/terms',
        '/account/favorites', '/account/loyalty',
      ]
    },
    // فونت‌ها اسم ثابت دارن (بدون hash)، پس اگه محتواشون عوض بشه باید
    // اسم فایل رو دستی عوض کنیم؛ در ازاش می‌تونیم کش رو یک‌ساله و immutable
    // بذاریم تا بعد از اولین بازدید، رفرش‌های بعدی هیچ درخواست شبکه‌ای
    // برای فونت نزنن و مستقیم از کش دیسک لود بشن.
    routeRules: {
      "/fonts/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
    },
  },

  i18n: {
    strategy: "no_prefix",
    langDir: "locales/",
    locales: [
      {
        code: "fa",
        file: "fa.json",
        dir: "rtl",
      },
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "ar",
        file: "ar.json",
      },
    ],
    defaultLocale: "fa",
    defaultDirection: "rtl",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
});
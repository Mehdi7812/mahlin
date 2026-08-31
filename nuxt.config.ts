export default defineNuxtConfig({
  compatibilityDate: "2024-08-01",

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/icon"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "fa", dir: "rtl" },

      title: "ماهلین اسکین‌کر",

      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&family=Lalezar&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400&display=swap",
        },
      ],
    },
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
    }
  },
});

// i18n.config.ts
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fa',
    fallbackLocale: 'fa',
    messages: {
        fa: require('./locales/fa.json'),
        en: require('./locales/en.json'),
        ar: require('./locales/ar.json')
    }
}))

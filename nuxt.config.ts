// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE_URL || 'http://localhost:3000/api/web'
    }
  },

  tailwindcss: {
    config: {
      theme: {
        screens: {
          'sm': '640px',
          'md': '767.98px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px'
        }
      }
    }
  },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'uk',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    lazy: false,
    langDir: 'internationalization',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'uk', iso: 'uk-UA', name: 'Українська', file: 'uk.json' }
    ]
  }
})
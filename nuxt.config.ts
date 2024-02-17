import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

const apiBaseUrl = 'http://127.0.0.1:8000/api/v1'

export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    viewTransition: true,
    renderJsonPayloads: true
  },

  typescript: {
    typeCheck: false,
    strict: true
  },

  runtimeConfig: {
    public: {
      apiBaseUrl,
      isDev
    }
  },

  appConfig: {
    theme: {
      isDark: true
    }
  },

  css: [],

  tailwindcss: {
    viewer: false,
    exposeConfig: true,
    configPath: '~/tailwind.config'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-viewport',
    'nuxt-icon',
    '~/modules/json-pretty/module.ts',
    '~/modules/tooltip/module.ts',
    '~/modules/theme/module.ts'
  ],

  vueuse: {
    autoImports: true
  },

  imports: {
    dirs: ['~/utils', '~/composables', '~/stores'],
    presets: [
      {
        from: 'tailwind-merge',
        imports: ['twMerge']
      },
      {
        from: 'cva',
        imports: ['cva']
      }
    ]
  }
})

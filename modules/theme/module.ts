import { addComponentsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ThemeModuleOptions } from '~/modules/theme/types'
import defu from 'defu'

const { resolve } = createResolver(import.meta.url)

const runtimeDir = './runtime' as const

export default defineNuxtModule<ThemeModuleOptions>({
  meta: {
    name: 'theme',
    configKey: 'theme',
    dependencies: {
      tailwindcss: '^3.4.1',
      '@material/material-color-utilities': '^0.2.7',
      'chroma-js': '^2.4.2'
    }
  },
  defaults: {
    sourceColor: '#149FD8',
    isDark: false,
    variant: 'content',
    contrastLevel: 0.35,
    staticColors: [
      {
        name: 'Pink',
        value: '#d574d1',
        blend: false
      }
    ]
  },
  hooks: {
    'imports:dirs'(dirs) {
      dirs.push(resolve('./runtime/composables'), resolve('./runtime/utils'))
    }
  },
  setup: async (options: ThemeModuleOptions, nuxt) => {
    // @ts-ignore
    nuxt.options.appConfig.theme = defu(nuxt.options?.appConfig?.theme || {}, options)

    addPlugin({ src: resolve(`${runtimeDir}/plugin.ts`) })
    await addComponentsDir({
      pathPrefix: false,
      path: resolve(`${runtimeDir}/components`)
    })
  }
})

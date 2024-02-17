import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ThemeModuleOptions } from '~/modules/theme/types'

const { resolve } = createResolver(import.meta.url)

const runtimeDir = './runtime' as const

export default defineNuxtModule<ThemeModuleOptions>({
  meta: {
    name: 'tooltip',
    configKey: 'tooltip',
    dependencies: {
      '@floating-ui/vue': '^1.0.6'
    }
  },
  hooks: {},
  setup: async (options: ThemeModuleOptions, nuxt) => {
    await addComponentsDir({
      pathPrefix: false,
      path: resolve(`${runtimeDir}/components`)
    })
  }
})

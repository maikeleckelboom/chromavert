import type { Config } from 'tailwindcss'
import { materialThemePreset } from './modules/theme/tailwind.preset'

const srcDir: string = '.' as const

const config = {
  content: [
    `${srcDir}/modules/**/runtime/*.{ts,vue}`,
    `${srcDir}/modules/**/runtime/components/**/*.vue`,
    `${srcDir}/modules/**/runtime/pages/**/*.vue`
  ],
  plugins: [],
  presets: [materialThemePreset]
} satisfies Config

export default config

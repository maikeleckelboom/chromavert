import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeVibrant
} from '@material/material-color-utilities'

const SCHEME_VARIANTS = {
  content: SchemeContent,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  vibrant: SchemeVibrant,
  neutral: SchemeNeutral,
  monochrome: SchemeMonochrome
  // fruit_salad: SchemeFruitSalad,
  // rainbow: SchemeRainbow,
} as const

type Variant = keyof typeof SCHEME_VARIANTS

type StaticColor = {
  name: string
  value: string
  blend: boolean
}

interface ThemeModuleOptions {
  isDark: boolean
  sourceColor: string
  contrastLevel: number
  variant: Variant
  staticColors: StaticColor[]
}

type ColorModeOption = {
  label: string
  value: string
  selected: boolean
}

export type { Variant, StaticColor, ThemeModuleOptions, ColorModeOption }
export { SCHEME_VARIANTS }

type HctModel = {
  hue: number
  chroma: number
  tone: number
}

type HctModelWithHex = HctModel & { hex: string }
export type { HctModel, HctModelWithHex }

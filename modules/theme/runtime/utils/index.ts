import chroma from 'chroma-js'

export function getContrastHexClass(hex: string, variantClass: boolean = false) {
  const isDark = chroma(hex).luminance() < 0.45

  if (isDark) {
    return variantClass ? 'text-on-surface-variant-dark' : 'text-on-surface-dark'
  }

  return variantClass ? 'text-on-surface-variant-light' : 'text-on-surface-light'
}

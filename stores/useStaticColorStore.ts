import type { StaticColor } from '~/modules/theme/types'

type StaticColorWithId = { id: string } & StaticColor

export const useStaticColorStore = defineStore('color', () => {
  const staticColors = shallowRef<StaticColorWithId[]>([])

  function someColorHasSameName(name: string) {
    return staticColors.value.some((color) => color.name === name)
  }

  function incWhenSameName(name: string) {
    return staticColors.value.filter((color) => color.name === name).length + 1
  }

  function addColor(value: number, name: string = 'untitled', blend: boolean = false) {
    if (staticColors.value.some((color) => color.value === value)) return
    if (someColorHasSameName(name)) {
      name = `${name} ${incWhenSameName(name)}`
    }
    staticColors.value = [...staticColors.value, { id: slugify(name), value, name, blend }]
  }

  function removeColor(id: string) {
    staticColors.value = staticColors.value.filter((color) => color.id !== id)
  }

  return {
    staticColors,
    addColor,
    removeColor
  }
})

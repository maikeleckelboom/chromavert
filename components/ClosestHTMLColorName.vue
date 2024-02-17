<script lang="ts" setup>
import namedColorList from '~/assets/named-color-list.json' with { type: 'json' }
import chroma from 'chroma-js'
import { hexFromArgb } from '@material/material-color-utilities'

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

type NamedColor = {
  name: string
  hex: string
  rgb: string
  r: number
  g: number
  b: number
}

type ColorName = 'red' | 'pink' | 'orange' | 'yellow' | 'purple' | 'green' | 'blue' | 'brown' | 'white'

type FlatNamedColor = NamedColor & { category: ColorName }

const flatNamedColorList = Object.entries(namedColorList).reduce((acc, [key, value]) => {
  acc.push(...value.map((color) => ({ ...color, category: key as ColorName })))
  return acc
}, [] as FlatNamedColor[])

function getClosestNamedColor() {
  const color = chroma(hexFromArgb(modelValue.value))
  let closest: FlatNamedColor | undefined
  let closestDistance = Infinity
  for (const namedColor of flatNamedColorList) {
    const distance = chroma.deltaE(namedColor.hex, color.hex())
    if (distance < closestDistance) {
      closest = namedColor
      closestDistance = distance
    }
  }
  return closest
}

const namedColor = computed(getClosestNamedColor)
const category = computed(() => namedColor.value?.category ?? '')
const name = computed(() => namedColor.value?.name ?? '')
const label = computed(() => titleCase(name.value))

defineSlots<{
  default: (props: { category: string; name: string; label: string }) => VNode
}>()
</script>

<template>
  <slot v-bind="{ category, name, label }" />
</template>

<style scoped></style>

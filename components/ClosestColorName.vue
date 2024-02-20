<script lang="ts" setup>
import hexColorList from '~/assets/hex-color-list.json' with { type: 'json' }
import chroma from 'chroma-js'
import { hexFromArgb } from '@material/material-color-utilities'

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

function getClosestHexColorName() {
  const color = chroma(hexFromArgb(modelValue.value))
  let closest: string | undefined
  let closestDistance = Infinity
  for (const [hexColor, hexName] of Object.entries(hexColorList)) {
    const distance = chroma.deltaE(hexColor, color.hex())
    if (distance < closestDistance) {
      closest = hexName
      closestDistance = distance
    }
  }
  return closest
}

const namedHex = computed(() => getClosestHexColorName() ?? '')

const label = computed(() => titleCase(namedHex.value))

defineSlots<{
  default: (props: { label: string }) => void
}>()
</script>

<template>
  <slot v-bind="{ label }" />
</template>

<style scoped></style>

<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import chroma from 'chroma-js'
import ClosestHTMLColorName from '~/components/ClosestHTMLColorName.vue'

defineProps<{ keyColor?: string }>()

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const hex = computed({
  get: () => hexFromArgb(modelValue.value),
  set: (v: string) => {
    modelValue.value = argbFromHex(v)
  }
})

const contrastColorClass = computed(() => {
  return chroma.contrast(hex.value, 'white') > 4.5 ? 'text-on-surface-dark' : 'text-on-surface-light'
})

const contrastVariantColorClass = computed(() => {
  return chroma.contrast(hex.value, 'white') > 4.5
    ? 'text-on-surface-variant-dark'
    : 'text-on-surface-variant-light'
})

const closestNamedHex = computed(() => {
  return chroma.valid(hex.value) ? chroma(hex.value).name() : ''
})
</script>

<template>
  <div class="grid gap-y-8">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ColorBox v-model="modelValue" class="grid size-full min-h-40 place-items-center">
        <fieldset class="m-auto flex flex-col place-items-center">
          <label class="sr-only" for="hex">Hex</label>
          <input id="hex" v-model="hex" :class="contrastColorClass" class="hex-input-field" type="text" />
          <ClosestHTMLColorName v-slot="{ name, category }" v-model="modelValue">
            <span :class="contrastVariantColorClass" class="leading-none">~{{ name }}</span>
          </ClosestHTMLColorName>
        </fieldset>
      </ColorBox>
    </div>

    <TheInputSliders v-model="modelValue" />
  </div>
</template>

<style lang="postcss">
input[inputmode='numeric'],
input[type='text'] {
  @apply rounded border border-transparent bg-surface-container text-body-lg tabular-nums outline-secondary;
  @apply min-w-12 p-2;
}

input[inputmode='numeric'] {
  @apply text-center;
}

input[type='text'].hex-input-field {
  @apply h-[40px] w-fit border-transparent bg-transparent text-center text-headline-md font-bold uppercase outline-none focus:outline-none;
}
</style>

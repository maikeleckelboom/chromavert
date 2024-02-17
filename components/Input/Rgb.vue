<script lang="ts" setup>
import { argbFromRgba, rgbaFromArgb } from '@material/material-color-utilities'
import { vMask } from '~/utils/vMask'

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const rgba = computed(() => rgbaFromArgb(modelValue.value))

const rgbaR = computed({
  get: () => rgba.value.r,
  set: (v: number) => {
    modelValue.value = argbFromRgba({ ...rgba.value, r: v })
  }
})

const rgbaG = computed({
  get: () => rgba.value.g,
  set: (v: number) => {
    modelValue.value = argbFromRgba({ ...rgba.value, g: v })
  }
})

const rgbaB = computed({
  get: () => rgba.value.b,
  set: (v: number) => {
    modelValue.value = argbFromRgba({ ...rgba.value, b: v })
  }
})

const inputSetRef = ref<HTMLElement>()

whenever(inputSetRef, (el) =>
  el.querySelectorAll('input').forEach((input) =>
    useEventListener(input, 'paste', (evt) => {
      evt.preventDefault()
      const clipboardData = evt.clipboardData
      if (!clipboardData) return
      const pastedData = clipboardData.getData('text')
      const pastedDataArray = pastedData.split(/,|\s/)
      if (pastedDataArray.length === 3) {
        const [r, g, b] = pastedDataArray.map((v) => parseInt(v, 10))
        modelValue.value = argbFromRgba({ ...rgba.value, r, g, b })
      }
    })
  )
)
</script>

<template>
  <fieldset ref="inputSetRef" class="grid w-fit grid-cols-3 gap-x-1">
    <input
      v-model="rgbaR"
      v-mask="{ min: 0, max: 255 }"
      inputmode="numeric"
      max="255"
      min="0"
      type="text"
    />
    <input
      v-model="rgbaG"
      v-mask="{ min: 0, max: 255 }"
      inputmode="numeric"
      max="255"
      min="0"
      type="text"
    />
    <input
      v-model="rgbaB"
      v-mask="{ min: 0, max: 255 }"
      inputmode="numeric"
      max="255"
      min="0"
      type="text"
    />
  </fieldset>
</template>

<style scoped></style>

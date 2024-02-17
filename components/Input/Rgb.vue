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

function onInput(evt: Event) {
  // max 3 digits, then focus next
  const input = evt.target as HTMLInputElement
  const value = input.value
  if (value.length === 3) {
    const next = input.nextElementSibling as HTMLInputElement
    if (next) {
      next.focus()
      nextTick(() => {
        // select all text
        next.setSelectionRange(0, next.value.length)
      })
    }
  }
}
</script>

<template>
  <fieldset
    ref="inputSetRef"
    class="relative grid w-fit grid-flow-col grid-cols-[50px,50px,50px] rounded border border-outline-variant p-1"
  >
    <legend class="absolute -top-5 z-10 ml-1 rounded-sm bg-surface p-1 text-label-md">RGB</legend>
    <div class="flex flex-col gap-y-2">
      <label class="sr-only" for="r">Red</label>
      <input
        v-model="rgbaR"
        v-mask="{ min: 0, max: 255 }"
        data-unit="r"
        inputmode="numeric"
        max="255"
        min="0"
        type="text"
        @input="onInput"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <label class="sr-only" for="g">Green</label>
      <input
        v-model="rgbaG"
        v-mask="{ min: 0, max: 255 }"
        data-unit="g"
        inputmode="numeric"
        max="255"
        min="0"
        type="text"
        @input="onInput"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <label class="sr-only" for="b">Blue</label>
      <input
        v-model="rgbaB"
        v-mask="{ min: 0, max: 255 }"
        data-unit="b"
        inputmode="numeric"
        max="255"
        min="0"
        type="text"
        @input="onInput"
      />
    </div>
  </fieldset>
</template>

<style scoped></style>

<script lang="ts" setup>
import { argbFromHex, argbFromRgba, hexFromArgb, rgbaFromArgb } from '@material/material-color-utilities'
import { vMask } from '~/utils/vMask'

defineProps<{ keyColor?: string }>()

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const rgba = computed(() => rgbaFromArgb(modelValue.value))

const hex = computed({
  get: () => hexFromArgb(modelValue.value),
  set: (v: string) => {
    modelValue.value = argbFromHex(v)
  }
})

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

function cycleColorSpace() {
  //
  console.log('cycleColorSpace')
}
</script>

<template>
  <div class="grid">
    <div class="mb-8 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-[1fr,1fr]">
      <div>
        <ColorBox v-model="modelValue" class="size-full min-h-40" />
      </div>
      <div class="grid gap-x-4 gap-y-3">
        <div>
          <label class="mb-1.5 flex text-label-md">Hex</label>
          <fieldset>
            <input
              v-model="hex"
              class="w-full rounded border border-outline-variant bg-surface p-2 pr-10 text-body-lg uppercase tabular-nums outline-transparent"
            />
          </fieldset>
        </div>
        <div>
          <label class="mb-1.5 flex text-label-md">RGB</label>
          <fieldset ref="inputSetRef" class="grid grid-cols-5 gap-2">
            <input
              v-model="rgbaR"
              v-mask="{ min: 0, max: 255 }"
              class="min-w-12 rounded border border-outline-variant bg-surface p-2 text-center text-body-lg tabular-nums outline-transparent"
              inputmode="numeric"
              max="255"
              min="0"
              type="text"
            />
            <input
              v-model="rgbaG"
              v-mask="{ min: 0, max: 255 }"
              class="min-w-12 rounded border border-outline-variant bg-surface p-2 text-center text-body-lg tabular-nums outline-transparent"
              inputmode="numeric"
              max="255"
              min="0"
              type="text"
            />
            <input
              v-model="rgbaB"
              v-mask="{ min: 0, max: 255 }"
              class="min-w-12 rounded border border-outline-variant bg-surface p-2 text-center text-body-lg tabular-nums outline-transparent"
              inputmode="numeric"
              max="255"
              min="0"
              type="text"
            />
          </fieldset>
        </div>
      </div>
      <div class="sr-only mt-2">
        <details>
          <summary class="mb-1 flex cursor-pointer items-center gap-x-2 text-label-lg">
            HCT
            <Icon class="h-4 w-4 text-on-surface-variant" name="ic:baseline-unfold-more" />
          </summary>
          <p class="text-on-surface-variant">
            HCT is an abbreviation of hue chroma tone. It’s the name of the color space that enables dynamic
            color. HCT is based on CAM16 hue and chroma; the L* construct for luminance from L*a*b* (CIELAB,
            1976) is denoted as T for tone.
          </p>
        </details>
      </div>
    </div>
    <TheInputSliders v-model="modelValue" />
  </div>
</template>

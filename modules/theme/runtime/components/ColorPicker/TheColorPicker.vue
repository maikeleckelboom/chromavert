<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import chroma from 'chroma-js'

defineProps<{ keyColor?: string }>()

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const hex = computed({
  get: () => hexFromArgb(modelValue.value),
  set: (v: string) => {
    modelValue.value = argbFromHex(v)
  }
})

function isContrastDark(hex: string) {
  return chroma(hex).luminance() < 0.4
}

const route = useRoute()

const onClickFullscreen = async () => {
  await navigateTo({
    path: `/full-screen`,
    query: {
      previousRoute: route.fullPath,
      argb: unref(modelValue.value)
    }
  })
}

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)

function toggleBookmark(label?: string) {
  store.hasColor(modelValue.value)
    ? store.removeColor(modelValue.value)
    : store.addColor(modelValue.value, label)
}
</script>

<template>
  <div ref="root" class="grid">
    <div class="mb-8 grid grid-cols-1 gap-2">
      <ClosestColorName v-slot="{ label }" v-model="modelValue">
        <ColorBox
          v-model="modelValue"
          :style="{
            color: isContrastDark(hex)
              ? 'rgb(var(--on-surface-dark-rgb))'
              : 'rgb(var(--on-surface-light-rgb))'
          }"
          class="view-transition-color-box relative grid size-full min-h-40 place-items-center overflow-hidden"
        >
          <fieldset class="m-auto flex flex-col place-items-center">
            <label class="sr-only" for="hex">Hex</label>
            <input id="hex" v-model="hex" class="hex-input-field" type="text" />
            <div
              :style="{
                color: isContrastDark(hex)
                  ? 'rgb(var(--on-surface-variant-dark-rgb))'
                  : 'rgb(var(--on-surface-variant-light-rgb))'
              }"
              class="leading-none tracking-normal"
            >
              <Icon class="mr-1 size-3" name="mdi:tilde" />
              <span class="text-body-sm">{{ label }}</span>
            </div>
          </fieldset>
          <div class="absolute bottom-0 left-0 z-10">
            <button class="p-4" title="Go to full-screen" @click="onClickFullscreen">
              <Icon class="size-6" name="ic:baseline-fullscreen" />
            </button>
          </div>
          <div class="absolute bottom-0 right-0 z-10">
            <button
              :title="store.hasColor(modelValue) ? 'Remove Bookmark' : 'Bookmark'"
              class="p-4"
              @click="toggleBookmark(label)"
            >
              <Icon v-if="store.hasColor(modelValue)" class="size-6" name="ic:baseline-bookmark" />
              <Icon v-else class="size-6" name="ic:baseline-bookmark-border" />
            </button>
          </div>
        </ColorBox>
      </ClosestColorName>
    </div>
    <div class="mb-6 px-4">
      <TheInputSliders v-model="modelValue" />
    </div>
  </div>
</template>

<style lang="postcss">
.view-transition-color-box {
  view-transition-name: color-box;
}

::view-transition-old(color-box) {
}

::view-transition-new(color-box) {
}

::view-transition-old(color-box),
::view-transition-new(color-box) {
}
</style>

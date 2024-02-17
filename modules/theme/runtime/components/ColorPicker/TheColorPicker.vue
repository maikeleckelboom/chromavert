<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import { getContrastHexClass } from '~/modules/theme/runtime/utils'

defineProps<{ keyColor?: string }>()

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const hex = computed({
  get: () => hexFromArgb(modelValue.value),
  set: (v: string) => {
    modelValue.value = argbFromHex(v)
  }
})

const contrastColorClass = computed(() => getContrastHexClass(hex.value))
const contrastVariantColorClass = computed(() => getContrastHexClass(hex.value, true))

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
  <div class="grid gap-y-8">
    <div class="grid grid-cols-1 gap-2">
      <ClosestColorName v-slot="{ label }" v-model="modelValue">
        <ColorBox
          v-model="modelValue"
          class="view-transition-color-box relative grid size-full min-h-40 place-items-center overflow-hidden"
        >
          <fieldset class="m-auto flex flex-col place-items-center">
            <label class="sr-only" for="hex">Hex</label>
            <input
              id="hex"
              v-model="hex"
              :class="contrastColorClass"
              class="hex-input-field"
              type="text"
            />
            <div :class="contrastVariantColorClass" class="leading-none tracking-normal">
              <Icon class="mr-1 size-3" name="mdi:tilde" />
              <span class="text-body-sm">{{ label }}</span>
            </div>
          </fieldset>
          <div class="absolute bottom-0 left-0 z-10 p-4">
            <button class="p-2" title="Go to full-screen" @click="onClickFullscreen">
              <Icon class="size-6" name="ic:baseline-fullscreen" />
            </button>
          </div>
          <div class="absolute bottom-0 right-0 z-10 p-4">
            <button
              :title="store.hasColor(modelValue) ? 'Remove Bookmark' : 'Bookmark'"
              class="p-2"
              @click="toggleBookmark(label)"
            >
              <Icon v-if="store.hasColor(modelValue)" class="size-6" name="ic:baseline-bookmark" />
              <Icon v-else class="size-6" name="ic:baseline-bookmark-border" />
            </button>
          </div>
        </ColorBox>
      </ClosestColorName>
    </div>
    <TheInputSliders v-model="modelValue" />
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

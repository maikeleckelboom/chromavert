<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import chroma from 'chroma-js'
import ClosestHTMLColorName from '~/components/ClosestHTMLColorName.vue'
import StaticColorCollection from '~/components/StaticColorCollection.vue'
import { useStaticColorStore } from '~/stores/useStaticColorStore'

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

const onClickFullscreen = async () => {
  console.log('onClickFullscreen')

  // view transition
}

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)

function onSaveColor(value: number, name: string) {
  store.addColor(value, name)
}
</script>

<template>
  <div class="grid gap-y-8">
    <div class="grid grid-cols-1 gap-2">
      <ColorBox
        v-model="modelValue"
        :class="contrastColorClass"
        class="view-transition-color-box relative grid size-full min-h-40 place-items-center"
      >
        <ClosestHTMLColorName v-slot="{ label }" v-model="modelValue">
          <fieldset class="m-auto flex flex-col place-items-center">
            <label class="sr-only" for="hex">Hex</label>
            <input id="hex" v-model="hex" class="hex-input-field" type="text" />
            <div :class="contrastVariantColorClass" class="leading-none tracking-normal">
              <Icon class="size-3" name="mdi:tilde" />
              <span class="text-body-sm">{{ label }}</span>
            </div>
          </fieldset>

          <button class="absolute bottom-0 left-0 z-10 p-4" @click="onClickFullscreen">
            <Icon class="size-6" name="ic:baseline-fullscreen" />
          </button>

          <button class="absolute bottom-0 right-0 z-10 p-4" @click="onSaveColor(modelValue, label)">
            <Icon class="size-6" name="ic:outline-bookmark-add" />
          </button>
        </ClosestHTMLColorName>
      </ColorBox>
    </div>
    <TheInputSliders v-model="modelValue" />
    <StaticColorCollection />
  </div>
</template>

<style lang="postcss">
.view-transition-color-box {
  view-transition-name: color-box;
}

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

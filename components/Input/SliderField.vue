<script lang="ts" setup>
import type { SliderProps } from '~/modules/slider/types'

const modelValue = defineModel<number>({ type: Number, required: true })

defineProps<SliderProps>()

const id = useId()
</script>

<template>
  <div class="flex flex-col justify-between">
    <label
      :for="id"
      class="mb-2 flex flex-nowrap items-center gap-x-2 text-label-md md:text-label-lg"
    >
      <slot name="label"></slot>
      <span class="text-xs tabular-nums text-on-surface-variant">
        <slot name="range" />
      </span>
      <Tooltip class="">
        <button class="flex items-center justify-center p-1">
          <Icon class="mb-0.5 size-3" name="ic:outline-info" />
        </button>
        <template #content>
          <slot name="tooltip" />
        </template>
      </Tooltip>
    </label>
    <div class="grid grid-cols-[1fr,52px] gap-x-3">
      <div class="flex w-full items-center justify-center">
        <InputAppSlider
          v-model="modelValue"
          :disabled="$props.disabled"
          :max="$props.max"
          :min="$props.min"
          :oversized="$props.oversized"
          :step="$props.step"
          class="w-full"
          contained="true"
        />
      </div>
      <div class="">
        <InputNumberText :id="id" v-model="modelValue" />
      </div>
    </div>
  </div>
</template>

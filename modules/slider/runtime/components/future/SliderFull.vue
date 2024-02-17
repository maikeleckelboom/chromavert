<script lang="ts" setup>
import SliderWrapper from '~/modules/slider/runtime/components/future/SliderWrapper.vue'
import SliderRoot from '~/modules/slider/runtime/components/future/SliderRoot.vue'

defineSlots<{
  default: void
  before: void
  after: void
}>()

const modelValue = defineModel<number | number[]>()
</script>

<template>
  <SliderWrapper>
    <template #before>
      <slot name="before" />
    </template>
    <slot>
      <SliderRoot v-model="modelValue">
        <slot />
      </SliderRoot>
    </slot>
    <template #after>
      <slot name="after" />
    </template>
  </SliderWrapper>
</template>

<style scoped></style>

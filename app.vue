<script lang="ts" setup>
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'

useHead({
  title: 'Chromavert',
  meta: [
    {
      name: 'description',
      content: 'Chromavert - An implementation of Material Color Utilities'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <NuxtLoadingIndicator :color="repeatingLinearGradient" />
  <NuxtPage />
</template>

<style lang="postcss">
input[inputmode='numeric'],
input[type='text'] {
  @apply rounded border border-transparent bg-surface-container/50 text-body-md tabular-nums outline-secondary;
  @apply min-w-12 p-2;
}

input[inputmode='numeric'] {
  @apply text-center;
}

input[type='text'].hex-input-field {
  @apply h-[40px] w-fit border-transparent bg-transparent text-center text-headline-md font-bold uppercase outline-none focus:outline-none;
}
</style>

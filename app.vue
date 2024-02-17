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

<script lang="ts" setup>
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'
import NavBar from '~/modules/base/runtime/components/NavBar.vue'

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
  <NavBar />
</template>

<style lang="postcss"></style>

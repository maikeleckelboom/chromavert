<script lang="ts" setup>
const route = useRoute()

definePageMeta({
  title: 'HCT Color Picker - Chromavert',
  description: 'HCT Color Picker',
  middleware: (meta) => {
    if (!meta.query?.argb) {
      navigateTo({ path: '/' })
    }
  }
})
</script>

<template>
  <div>
    {{ route.params.argb }}
  </div>
</template>

<style scoped></style>

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

const modelValue = ref(Number(route.query.argb))
</script>

<template>
  <div class="mx-auto w-full max-w-lg">
    <div class="p-4">
      <TheColorPicker v-model="modelValue" />
    </div>
  </div>
</template>

<style scoped></style>

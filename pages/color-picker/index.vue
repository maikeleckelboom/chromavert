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

watch(
  () => route.query,
  () => {
    modelValue.value = Number(route.query.argb)
  }
)
</script>

<template>
  <div class="mx-auto w-full max-w-lg">
    <div class="p-4">
      <TheColorPicker v-model="modelValue" />
    </div>

    <div class="mt-8 p-4">
      <h2 class="m-1 text-title-lg">Static Colors</h2>
      <StaticColorScrollRow />
    </div>
  </div>
</template>

<style scoped></style>

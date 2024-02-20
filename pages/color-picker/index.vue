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

const { Escape } = useMagicKeys()

whenever(Escape, () => {
  navigateTo({ path: '/' })
})
</script>

<template>
  <div class="mx-auto w-full max-w-lg">
    <TheColorPicker v-model="modelValue" />

    <div class="mt-8">
      <ScrollRowStaticColors />
    </div>
  </div>
</template>

<style scoped></style>

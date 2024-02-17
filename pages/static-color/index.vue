<script lang="ts" setup>
const route = useRoute()

const { apiBaseUrl } = useRuntimeConfig().public

const { data, pending, error } = await useAsyncData(
  async () => await $fetch(`${apiBaseUrl}/static-colors`)
)
</script>

<template>
  <div class="mx-auto flex w-full max-w-xl flex-col">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <StaticColorScrollRow />
    </div>
  </div>
</template>

<style scoped></style>

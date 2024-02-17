<script lang="ts" setup>
import { useStaticColorStore } from '~/stores/useStaticColorStore'

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-2">
      <JsonPretty :data="staticColors" />
    </div>
  </div>
</template>

<style scoped></style>

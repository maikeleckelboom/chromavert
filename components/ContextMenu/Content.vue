<script lang="ts" setup>
const el = ref<HTMLDivElement>()
</script>

<template>
  <div ref="el" class="context-menu-content">
    <slot />
  </div>
</template>

<style scoped>
.context-menu-content {
  @apply absolute h-fit w-[280px] max-w-full bg-surface-container;
}
</style>

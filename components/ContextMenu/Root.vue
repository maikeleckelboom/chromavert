<script lang="ts" setup>
const rootEl = ref<HTMLDivElement>()
</script>

<template>
  <div id="context-menu-root" ref="rootEl">
    <slot />
  </div>
</template>

<style scoped>
#context-menu-root {
}
</style>

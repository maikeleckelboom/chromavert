<script lang="ts" setup>
const id = useId()

const el = ref<HTMLDivElement>()
const hovered = useElementHover(el)
</script>

<template>
  <div ref="el" class="context-menu-item">
    <slot />
  </div>
</template>

<style scoped>
.context-menu-item {
}
</style>

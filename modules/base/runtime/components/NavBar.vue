<script lang="ts" setup>
import type { NavBarItem as TNavBarItem } from '~/modules/base/types'
import NavBarItem from '~/modules/base/runtime/components/NavBarItem.vue'

const props = withDefaults(defineProps<{ items?: TNavBarItem[] }>(), { items: () => [] })

const itemsCount = computed(() => props.items.length)

const { isLabeled } = storeToRefs(useNavStore())
</script>

<template>
  <div class="v-nav-bar">
    <div class="v-nav-bar-container">
      <NavBarItem v-for="item in items" :key="item.label" :item="item" :labeled="isLabeled" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.v-nav-bar {
  --_items-count: v-bind(itemsCount);
  max-width: 100svw;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  height: 80px;
}

.v-nav-bar-container {
  display: grid;
  grid-template-columns: repeat(var(--_items-count), 1fr);
  background-color: rgb(var(--surface-container-rgb));
  background-color: rgb(var(--surface-rgb));
  column-gap: 8px;
  @apply max-w-xl;
  margin-inline: auto;
  height: 100%;

  @appy max-w-2xl mx-auto relative;
}
</style>

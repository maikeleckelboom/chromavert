<script lang="ts" setup></script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger>The Trigger</ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuItem>Item 1</ContextMenuItem>
        <ContextMenuItem>Item 2</ContextMenuItem>
        <ContextMenuItem>Item 3</ContextMenuItem>
        <ContextMenuItem>Item 4</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<style scoped>
#context-menu-root {
}
</style>

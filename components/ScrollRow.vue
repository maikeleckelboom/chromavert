<script lang="ts" setup>
const container = ref<HTMLDivElement>()
const hovered = useElementHover(container)

whenever(logicAnd(container, hovered), () =>
  useEventListener(
    container,
    'wheel',
    (evt: WheelEvent) => {
      evt.preventDefault()
      const acceleration = 0.25
      const delta = evt.deltaX + evt.deltaY
      const direction = Math.sign(delta)
      const distance = Math.abs(delta * acceleration)
      const elContainer = <HTMLElement>container.value
      switch (direction) {
        case 1:
          elContainer.scrollLeft += distance
          break
        case -1:
          elContainer.scrollLeft -= distance
          break
      }
    },
    { passive: false }
  )
)
</script>

<template>
  <div class="max-w-svw relative overflow-clip">
    <div
      ref="container"
      class="scrollbar scrollbar-stable flex w-full max-w-[calc(100svw-32px)] flex-nowrap gap-2 overflow-auto p-1 md:max-w-xl"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>

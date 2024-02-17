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

function scrollToElement(el: HTMLElement, container: HTMLElement) {
  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  const centered = elRect.left - containerRect.left - containerRect.width / 2 + elRect.width / 2
  container.scrollTo({
    left: container.scrollLeft + centered,
    behavior: 'smooth'
  })
}

function scrollToIndex(index: number) {
  const containerEl = unrefElement(container)!
  const el = containerEl.children[index] as HTMLElement
  if (el) {
    scrollToElement(el, containerEl)
  }
}

defineExpose({
  scrollToIndex
})
</script>

<template>
  <div class="max-w-svw relative overflow-clip">
    <div
      ref="container"
      class="scrollbar scrollbar-stable max-w-svw flex w-full flex-nowrap gap-2 overflow-auto px-1 pb-2 pt-1 md:max-w-xl"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import { hexFromArgb } from '@material/material-color-utilities'
import type { StaticColorWithId } from '~/modules/theme/types'
import ScrollRow from '~/components/ScrollRow.vue'

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)

async function onStaticColorClick(staticColor: StaticColorWithId) {
  await navigateTo({
    path: `/color-picker`,
    query: {
      argb: staticColor.value.toString()
    }
  })
}

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
  <ScrollRow>
    <template v-for="staticColor in staticColors" :key="staticColor.id">
      <div
        :style="{ backgroundColor: hexFromArgb(staticColor.value) }"
        class="aspect-square size-14 min-h-14 min-w-14 rounded-full"
        @click="onStaticColorClick(staticColor)"
      >
        <div class="sr-only">{{ staticColor.name }}</div>
      </div>
    </template>
  </ScrollRow>
</template>

<style scoped></style>

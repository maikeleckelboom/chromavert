<script lang="ts" setup>
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import { hexFromArgb } from '@material/material-color-utilities'
import type { StaticColorWithId } from '~/modules/theme/types'
import ScrollRow from '~/components/ScrollRow.vue'

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)
const route = useRoute()
const containerRef = ref<InstanceType<typeof ScrollRow>>()

const staticColorRefsList = useTemplateRefsList<HTMLElement>()

onMounted(() => {
  const argb = Number(route.query.argb)
  const index = staticColors.value.findIndex((color) => color.value === argb)
  if (index !== -1) {
    containerRef.value?.scrollToIndex(index)
  }
})

async function onStaticColorClick(staticColor: StaticColorWithId, index: number) {
  containerRef.value?.scrollToIndex(index)
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
  <ScrollRow ref="containerRef">
    <div
      v-for="(staticColor, i) in staticColors"
      :key="staticColor.id"
      :ref="staticColorRefsList.set"
      :aria-label="staticColor.name"
      :class="{
        'bg-surface-container outline-2 outline-surface':
          staticColor.value === Number(route.query.argb)
      }"
      class="rounded"
    >
      <div
        :style="{ backgroundColor: hexFromArgb(staticColor.value) }"
        class="relative grid h-20 min-w-24 place-items-center overflow-hidden rounded"
        @click="onStaticColorClick(staticColor, i)"
      >
        <Icon
          v-if="staticColor.value === Number(route.query.argb)"
          class="size-6"
          name="ic:baseline-check"
        />
        <div class="sr-only">{{ staticColor.name }}</div>
      </div>
      <div
        class="relative flex w-24 justify-between px-2 pb-2 pt-3 text-body-sm text-on-surface-variant"
      >
        <span class="w-16 overflow-clip overflow-ellipsis whitespace-nowrap">
          {{ staticColor.name }}
        </span>
        <!-- vert menu dot-->
        <button class="absolute bottom-0 right-0 top-0 rounded p-1">
          <Icon class="size-6" name="ic:baseline-more-vert" />
        </button>
      </div>
    </div>
  </ScrollRow>
</template>

<style scoped></style>

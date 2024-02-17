<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'
import { getContrastHexClass } from '~/modules/theme/runtime/utils'

const route = useRoute()

const { Escape } = useMagicKeys()

async function onExitFullScreen() {
  const { previousRoute, argb } = route.query
  await navigateTo({
    path: <string>previousRoute,
    query: { argb }
  })
}

whenever(Escape, onExitFullScreen)

const hex = computed(() => {
  const { argb } = route.query
  return hexFromArgb(Number(argb))
})

const contrastColorClass = computed(() => getContrastHexClass(hex.value))
const contrastVariantColorClass = computed(() => getContrastHexClass(hex.value, true))
</script>

<template>
  <div
    :style="{ backgroundColor: hex }"
    class="view-transition-color-box fixed inset-0 z-[51] size-full h-svh w-svw object-cover"
  >
    <button :class="contrastColorClass" class="p-6" @click="onExitFullScreen">
      <Icon class="size-8" name="ic:baseline-fullscreen-exit" />
    </button>
  </div>
</template>

<style scoped></style>

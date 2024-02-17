<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'

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

const backgroundColor = computed(() => {
  const { argb } = route.query
  return hexFromArgb(Number(argb))
})
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="view-transition-color-box fixed inset-0 size-full h-svh w-svw object-cover"
  >
    <button class="p-2" @click="onExitFullScreen">
      <Icon class="size-8" name="ic:baseline-fullscreen-exit" />
    </button>
  </div>
</template>

<style scoped></style>

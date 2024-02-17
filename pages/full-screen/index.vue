<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'

const route = useRoute()
const { Escape } = useMagicKeys()

async function onExitFullScreen() {
  console.log('onExitFullScreen')
  await navigateTo({
    name: 'index'
  })
  console.log('navigated to index')
}

whenever(Escape, onExitFullScreen)

const backgroundColor = computed(() => {
  return hexFromArgb(Number(route.query.argb))
})
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="view-transition-color-box fixed inset-0 size-full h-svh w-svw"
  >
    <button @click="onExitFullScreen">
      <Icon class="size-4" name="ic:baseline-fullscreen-exit" />
    </button>
  </div>
</template>

<style scoped></style>

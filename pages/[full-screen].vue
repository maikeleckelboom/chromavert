<script lang="ts" setup>
const { Escape } = useMagicKeys()

function onExitFullScreen() {
  //
  console.log('onExitFullScreen')
}

whenever(Escape, onExitFullScreen)
</script>

<template>
  <div class="view-transition-color-box fixed inset-0 size-full h-svh w-svw">
    <button @click="onExitFullScreen">
      <Icon class="size-4" name="ic:baseline-fullscreen-exit" />
    </button>
  </div>
</template>

<style scoped>
.view-transition-color-box {
  view-transition-name: color-box;
}
</style>

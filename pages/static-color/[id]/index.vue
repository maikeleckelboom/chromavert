<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'

definePageMeta({
  title: 'Full Screen Color',
  description: 'A full screen preview of a given color.',
  robots: 'noindex, nofollow',
  middleware: (context) => {
    if (!context.query.argb) {
      navigateTo(context.redirectedFrom?.fullPath || '/404')
    }
  }
})

const route = useRoute()
const { Escape } = useMagicKeys()

async function onExitFullScreen() {
  await navigateTo({ name: 'index' })
}

whenever(Escape, onExitFullScreen)

const backgroundColor = computed(() => {
  return hexFromArgb(parseInt(route.query.argb as string, 10))
})

const store = useStaticColorStore()
</script>

<template>
  <div class="mx-auto flex w-full max-w-xl flex-col">
    <ColorBox :model-value="Number(route.query.argb)" />
    <button class="p-2" @click.stop="store.removeColor(route.params.id as string)">
      <Icon class="size-4" name="ic:baseline-delete" />
    </button>
  </div>
</template>

<style scoped></style>

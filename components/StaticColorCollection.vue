<script lang="ts" setup>
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import { hexFromArgb } from '@material/material-color-utilities'
import type { StaticColorWithId } from '~/modules/theme/types'

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)

async function onStaticColorClick(staticColor: StaticColorWithId) {
  await navigateTo({
    path: `/static-color/${staticColor.id}`,
    query: {
      argb: staticColor.value.toString()
    }
  })
}
</script>

<template>
  <div class="max-w-svw relative overflow-hidden">
    <div
      class="scrollbar flex w-full max-w-[calc(100svw-32px)] flex-nowrap gap-2 overflow-auto md:max-w-xl"
    >
      <template v-for="staticColor in staticColors" :key="staticColor.id">
        <div
          :style="{ backgroundColor: hexFromArgb(staticColor.value) }"
          class="aspect-square size-14 min-h-14 min-w-14 rounded-full"
          @click="onStaticColorClick(staticColor)"
        >
          <div class="sr-only">{{ staticColor.name }}</div>

          <!--        <button class="p-2" @click.stop="store.removeColor(staticColor.id)">-->
          <!--          <Icon class="size-4" name="ic:baseline-delete" />-->
          <!--        </button>-->
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>

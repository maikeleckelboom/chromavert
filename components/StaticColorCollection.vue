<script lang="ts" setup>
import { useStaticColorStore } from '~/stores/useStaticColorStore'
import { hexFromArgb } from '@material/material-color-utilities'

const store = useStaticColorStore()
const { staticColors } = storeToRefs(store)
</script>

<template>
  <div class="p-4">
    <div class="flex w-full flex-col gap-2">
      <div
        v-for="staticColor in staticColors"
        :key="staticColor.id"
        class="grid grid-cols-[auto,1fr,auto,auto]"
      >
        <input :value="hexFromArgb(staticColor.value)" type="color" />
        <input :value="staticColor.name" type="text" />
        <input v-model="staticColor.blend" type="checkbox" />
        <button
          class="aspect-square rounded-full border p-3"
          @click="store.removeColor(staticColor.id)"
        >
          <Icon class="size-4" name="ic:baseline-delete" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

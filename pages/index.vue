<script lang="ts" setup>
import OutlinedButton from '~/components/OutlinedButton.vue'
import { hexFromArgb } from '@material/material-color-utilities'

const { $dynamicScheme } = useNuxtApp()

const { sourceColor } = useThemeConfig()

const dynamicSourceColor = computed({
  get: () => $dynamicScheme.value.sourceColorArgb,
  set: (value) => {
    sourceColor.value = hexFromArgb(value)
  }
})
</script>

<template>
  <header>
    <div class="mx-auto flex w-full max-w-xl items-center justify-between">
      <div class="p-4">
        <LogoBeeldmerk class="size-10" />
      </div>
      <div class="p-4">
        <DarkToggle>
          <template v-slot="{ isDark, toggle }">
            <OutlinedButton @click="toggle">
              <Icon v-if="isDark.value" class="size-4" name="ic:baseline-wb-sunny" />
              <Icon v-else class="size-4" name="ic:baseline-mode-night" />
              <span> {{ isDark.value ? 'Light' : 'Dark' }}</span>
            </OutlinedButton>
          </template>
        </DarkToggle>
      </div>
    </div>
  </header>
  <main class="flex flex-col">
    <div class="mx-auto flex w-full max-w-xl flex-col">
      <!-- -->
      <div class="p-4">
        <TheColorPicker v-model="dynamicSourceColor" />
      </div>

      <!-- -->

      <div class="p-4">
        <ClientOnly>
          <JsonPretty :data="$dynamicScheme" />
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

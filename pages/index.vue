<script lang="ts" setup>
import OutlinedButton from '~/components/OutlinedButton.vue'
import { useDynamicScheme } from '~/modules/theme/runtime/composables/useDynamicScheme'
import SourceColorPicker from '~/components/Input/SourceColorPicker.vue'

const dynamicScheme = useDynamicScheme()
</script>

<template>
  <header>
    <div class="mx-auto flex w-full max-w-4xl items-center justify-between">
      <div class="p-4">
        <NuxtLink v-slot="{ active }" to="/">
          <LogoBeeldmerk class="size-10" />
        </NuxtLink>
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
    <div class="mx-auto flex w-full max-w-4xl flex-col">
      <div class="p-4">
        <SourceColorPicker />
      </div>
      <div class="p-4">
        <h1>My Colors</h1>
        <div class="grid grid-cols-2 gap-2"></div>
      </div>
      <div class="p-4">
        <JsonPretty :data="dynamicScheme" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>

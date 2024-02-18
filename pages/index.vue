<script lang="ts" setup>
const dynamicScheme = useDynamicScheme()

const { contrastLevel } = useThemeConfig()
</script>

<template>
  <header class="absolute left-0 right-0 top-0 flex h-16 items-center bg-surface">
    <div class="mx-auto flex w-full max-w-xl items-center justify-between">
      <div class="p-2">
        <NuxtLink to="/">
          <LogoBeeldmerk class="size-10" />
        </NuxtLink>
      </div>
      <div class="p-2">
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
  <main class="mb-24 mt-16 flex flex-col">
    <div class="mx-auto flex w-full max-w-xl flex-col">
      <div class="p-2">
        <h1 class="mb-2 text-title-lg">Static Colors</h1>
        <p class="text-label-md text-on-surface-variant">
          Your stored colors. Click to choose a color and see its details. Right-click to modify,
          match, allocate, or delete a color.
        </p>
      </div>
      <div class="mt-2">
        <StaticColorScrollRow />
      </div>
      <div class="p-2"></div>
      <div class="p-2">
        <h1 class="mb-2">Scheme Variant</h1>
        <p class="text-label-md text-on-surface-variant">
          Generate color schemes from your saved colors. Experiment with different variants to
          harmonize colors for balanced designs in websites, presentations, or decor.
        </p>
        <div class="mt-2">
          <SchemeVariantScrollRow />
        </div>
      </div>
      <div class="p-2">
        <h1 class="mb-2">Dynamic Scheme</h1>
        <JsonPretty :data="dynamicScheme" :deep="3" />
      </div>

      <div class="p-2">
        <button>Reduced</button>
        <InputSlider
          v-model="contrastLevel"
          :number-of-ticks="'step'"
          contained="true"
          max="1"
          min="-1"
          step="0.05"
        />
      </div>

      <div class="p-2">
        <div class="mb-4">
          <h2 class="text-title-lg">Create Schemes</h2>
          <p class="text-label-md text-on-surface-variant">
            Build beautiful palettes from your saved colors. Experiment with combinations for
            balanced designs in websites, presentations, or decor.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

<script lang="ts" setup>
const dynamicScheme = useDynamicScheme()
</script>

<template>
  <header>
    <div class="mx-auto flex w-full max-w-xl items-center justify-between">
      <div class="p-4">
        <NuxtLink to="/">
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
    <div class="mx-auto flex w-full max-w-xl flex-col">
      <div class="p-4"></div>
      <div class="p-4">
        <h1 class="mb-2">Static Colors</h1>
        <p class="text-label-md text-on-surface-variant">
          Save, edit, and share hand-picked colors across devices. Create schemes and harmonize
          colors effortlessly for cohesive designs.
        </p>
        <StaticColorScrollRow />
      </div>
      <div class="p-4">
        <h1 class="mb-2">Scheme Variant</h1>
        <p class="text-label-md text-on-surface-variant">
          Generate color schemes from your saved colors. Experiment with different variants to
          harmonize colors for balanced designs in websites, presentations, or decor.
        </p>
        <SchemeVariantScrollRow />
      </div>
      <div class="p-4">
        <h1 class="mb-2">Dynamic Scheme</h1>
        <JsonPretty :data="dynamicScheme" />
      </div>

      <div class="p-4">
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

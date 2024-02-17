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
        <StaticColorScrollRow />
      </div>
      <div class="p-4">
        <h1 class="mb-2">Scheme Variant</h1>
        <SchemeVariantScrollRow />
      </div>
      <div class="p-4">
        <h1 class="mb-2">Dynamic Scheme</h1>
        <JsonPretty :data="dynamicScheme" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>

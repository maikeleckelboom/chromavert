<script lang="ts" setup>
import type { Variant } from '~/modules/theme/types'
import type { ScrollRowContainer } from '#components'

const { variant } = useThemeConfig()

const variants = computed(() =>
  schemeVariants.map((v) => ({
    id: slugify(v),
    value: v,
    text: v.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    active: v === variant.value
  }))
)

const containerRef = ref<InstanceType<typeof ScrollRowContainer>>()

function setVariant(v: Variant) {
  variant.value = v
}
</script>

<template>
  <ScrollRowContainer ref="containerRef">
    <template v-for="variant in variants" :key="variant.id">
      <button
        :id="variant.id"
        :aria-label="variant.text"
        :aria-pressed="variant.active"
        :class="variant.active ? 'border-primary' : 'border-outline'"
        class="grid place-items-center rounded-md border-px px-3 py-3 outline-offset-2"
        @click="setVariant(variant.value)"
      >
        <span
          :class="variant.active ? 'text-on-surface' : 'text-on-surface-variant'"
          class="text-label-lg font-semibold leading-none"
        >
          {{ variant.text }}
        </span>
      </button>
    </template>
  </ScrollRowContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { vMask } from '~/utils/vMask'
import { useSteps } from '~/modules/slider/runtime/composables/useSteps'

interface Props {
  min?: number | `${number}`
  max?: number | `${number}`
  mask?: boolean | 'true'
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  mask: true
})

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })

const { min, max } = useSteps(props)
</script>

<template>
  <input
    v-model="modelValue"
    v-mask="{ min, max }"
    class="h-[38px] w-[48px] rounded-lg border-thin border-outline-variant bg-transparent text-center outline-none"
    inputmode="numeric"
    pattern="[0-9\s]{13,19}"
    type="text"
  />
</template>

<style scoped></style>

<script lang="ts" setup>
import type { SliderMark, SliderProps } from '~/modules/slider/types'
import InputSliderTicks from '~/modules/slider/runtime/components/SliderTicks.vue'
import InputRangeSlider from '~/modules/slider/runtime/components/InputRangeSlider.vue'

interface Props extends SliderProps {
  numberOfTicks?: number | 'step'
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  oversized: true
})

function autoCalcStep(min: number, max: number) {
  const range = max - min
  return range / 100
}

function useNumOfTicks(options: Props) {
  const numberOfTicks = ref<number>(2)
  watch(
    () => options.numberOfTicks,
    (value) => {
      if (value === 'step') {
        numberOfTicks.value = Math.ceil(
          (Number(props.max) - Number(props.min)) /
            autoCalcStep(Number(props.min), Number(props.max))
        )
      } else {
        numberOfTicks.value = value as number
      }
    },
    { immediate: true }
  )
  return { numberOfTicks }
}

const { numberOfTicks } = useNumOfTicks(props)

const modelValue = defineModel<number | number[]>({
  type: [Number, Array],
  default: 0
})

type LabelGenerateOptions = {
  min: number
  max: number
  count: number
  decimalPlaces: number
}

function generateLabelsFromNumber({
  min,
  max,
  count,
  decimalPlaces
}: LabelGenerateOptions): SliderMark[] {
  const valueRange = max - min
  let spacing = valueRange / count
  if (spacing === 0) {
    spacing = 1
  }
  let actualNumberOfLabels = Math.ceil(valueRange / spacing)
  const labels: SliderMark[] = []
  for (let i = 0; i <= actualNumberOfLabels; i++) {
    let labelValue = min + i * spacing
    labelValue = parseFloat(labelValue.toFixed(decimalPlaces))
    labels.push({
      at: (labelValue - min) / valueRange,
      value: labelValue,
      label: labelValue.toString()
    })
  }
  return labels
}

const ticks = computed(() => {
  if (numberOfTicks.value < 1) return []
  const min = Number.isNaN(props.min) ? 0 : Number(props.min)
  const max = Number.isNaN(props.max) ? 100 : Number(props.max)
  const count = Math.max(1, numberOfTicks.value)
  return generateLabelsFromNumber({ min, max, count, decimalPlaces: 0 })
})
</script>

<template>
  <InputRangeSlider v-model="modelValue" v-bind="$props">
    <template #ticks>
      <InputSliderTicks
        v-model="modelValue"
        :btt="btt"
        :contained="contained"
        :dir="dir"
        :max="max"
        :min="min"
        :orientation="orientation"
        :ticks="ticks"
      />
    </template>
  </InputRangeSlider>
</template>

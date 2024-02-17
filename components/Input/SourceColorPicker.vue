<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'
import { useDynamicScheme } from '~/modules/theme/runtime/composables/useDynamicScheme'

const { sourceColor } = useThemeConfig()

const dynamicScheme = useDynamicScheme()

const modelValueProxy = computed({
  get: () => dynamicScheme.value.sourceColorArgb,
  set: (value) => {
    sourceColor.value = hexFromArgb(value)
  }
})
</script>

<template>
  <TheColorPicker v-model="modelValueProxy" class="color-picker" />
</template>

<style scoped></style>

<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities'

const modelValue = defineModel<number>('modelValue', { type: Number, default: 0 })
</script>

<template>
  <div :style="{ backgroundColor: hexFromArgb(modelValue) }" class="min-h-28 min-w-8 rounded"></div>
</template>

<style scoped></style>

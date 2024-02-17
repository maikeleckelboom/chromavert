<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.argb }}
  </div>
</template>

<style scoped></style>

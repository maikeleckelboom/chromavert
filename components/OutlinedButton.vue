<script lang="ts" setup></script>

<template>
  <button class="outlined-btn">
    <slot></slot>
  </button>
</template>

<style lang="postcss">
.outlined-btn {
  @apply relative isolate z-10 min-w-24 overflow-clip;
  @apply flex flex-nowrap items-center justify-center;
  @apply rounded-lg border-px border-outline-variant bg-surface px-4 py-2;
  @apply outline outline-thin outline-offset-0 outline-transparent focus:outline-offset-1 focus:outline-outline active:outline-offset-2;
  @apply after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-surface-tint after:opacity-0;
  @apply hover:after:opacity-[0.08] focus:after:opacity-[0.08] active:after:opacity-[0.12];

  > span {
    @apply text-title-sm text-on-surface;
  }

  > .icon {
    @apply mr-2;
  }
}
</style>

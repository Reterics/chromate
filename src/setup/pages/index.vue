<script setup lang="ts">
const displayName = __DISPLAY_NAME__
const version = __VERSION__
</script>

<template>
  <div class="w-full h-full flex flex-col gap-y-4 justify-center items-center">
    <h1 class="text-4xl font-bold">
      Setup general page for {{ displayName }}
    </h1>
    <p>Version: {{ version }}</p>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import PopupMenu from "../../components/PopupMenu.vue";

const displayName = __DISPLAY_NAME__
const version = __VERSION__
</script>

<template>
  <PopupMenu />
  <div class="w-full h-full flex flex-col gap-y-4 justify-center items-center">
    <h1 class="text-4xl font-bold">
      Installed: {{ displayName }}
    </h1>
    <p>Version: {{ version }}</p>
  </div>
</template>

<style lang="scss" scoped></style>

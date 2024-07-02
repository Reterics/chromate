<script setup lang="ts"></script>

<template>
  <header
      aria-label="Site Header"
      class="bg-gray-50 w-[300px]"
  >
    Popup Header
  </header>

  <RouterView />

  <footer
      aria-label="Site Footer"
      class="bg-gray-50"
  >
    Popup Footer
  </footer>
</template>

<style scoped></style>

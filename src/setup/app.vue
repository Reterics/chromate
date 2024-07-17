<script setup lang="ts">
import { RouterView } from 'vue-router'
import { inject, watchEffect } from 'vue'

import type { ISetup } from './index'

const setup = inject<ISetup>('setupType')

watchEffect(() => {
  if (setup) {
    if (setup.setupType === 'install') {
      document.title = `${__DISPLAY_NAME__} | Installed!`
    } else if (setup.setupType === 'update') {
      document.title = `${__DISPLAY_NAME__} | Updated!`
    }
  } else {
    document.title = __DISPLAY_NAME__
  }
})
</script>

<template>
  <div class="flex flex-col flex-1 justify-center w-full">
    <div class="flex flex-col items-center">
      <nav class="bg-gray-900 border-gray-200 w-full">
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://reterics.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/logo_white.png" class="h-8" alt="Chromate Logo">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Chromate</span>
          </a>
          <div class="block w-auto"></div>
        </div>
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
}
</style>

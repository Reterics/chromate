<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PopupMenu"
})
</script>

<template>

<nav class="bg-white border-gray-200 dark:bg-gray-900 w-[690px]">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://reterics.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="../assets/logo_white.png" class="h-8" alt="Chromate Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Chromate</span>
    </a>
    <div class="w-full sm:block sm:w-auto">
      <ul class="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 sm:border-0 sm:bg-white dark:bg-gray-800 sm:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <RouterLink class="block py-2 px-3 text-white bg-blue-700 rounded sm:bg-transparent sm:text-blue-700 sm:p-0 dark:text-white sm:dark:text-blue-500" to="popup">Home</RouterLink>
        </li>
        <li>
          <RouterLink class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="/options">Options</RouterLink>
        </li>
        <li>
          <RouterLink class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="setup">Setup</RouterLink>
        </li>
        <li>
          <RouterLink class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="rest">Rest API</RouterLink>
        </li>
        <li>
          <RouterLink class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="/about">About</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped>

</style>

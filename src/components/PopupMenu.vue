<script setup lang="ts">
</script>

<template>
  <nav class="bg-gray-900 border-gray-200 w-[690px]">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://reterics.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/logo_white.png" class="h-8" alt="Chromate Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Chromate</span>
      </a>
      <div class="w-full sm:block sm:w-auto">
        <ul class="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 sm:border-0 bg-gray-900 dark:border-gray-700">
          <li>
            <RouterLink class="block py-2 px-3 bg-blue-700 rounded sm:bg-transparent sm:p-0 text-white" to="popup">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink class="block py-2 px-3 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="chat">
              Chat
            </RouterLink>
          </li>
          <li>
            <RouterLink class="block py-2 px-3 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="scripts">
              Scripts
            </RouterLink>
          </li>
          <li>
            <RouterLink class="block py-2 px-3 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="rest">
              Rest API
            </RouterLink>
          </li>
          <li>
            <RouterLink class="block py-2 px-3 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent" to="/about">
              About
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>

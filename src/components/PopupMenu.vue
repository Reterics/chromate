<script setup lang="ts">
import {useRoute} from 'vue-router';

const route = useRoute();

const menu = [
  {
    path: 'popup',
    name: 'Home',
  },
  {
    path: 'chat',
    name: 'Chat',
  },
  {
    path: 'scripts',
    name: 'Scripts',
  },
  {
    path: 'rest',
    name: 'Rest API',
  },
  {
    path: 'about',
    name: 'About',
  }
]
</script>

<template>
  <nav class="bg-gray-900 border-gray-200 w-[690px]">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://reterics.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/logo_white.png" class="h-8" alt="Chromate Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Chromate</span>
      </a>
      <div class="block w-auto">
        <ul v-if="route.name" class="font-medium flex p-0 rounded-lg flex-row space-x-4 rtl:space-x-reverse mt-0 bg-gray-900">
          <li v-for="(entry) in menu" :key="entry.name">
            <RouterLink v-if="route.name === entry.path" class="block py-2 px-3 rounded text-white bg-gray-700" :to="entry.path">
              {{ entry.name }}
            </RouterLink>
            <RouterLink v-else class="block py-2 px-3 rounded text-white hover:bg-gray-700" :to="entry.path">
              {{ entry.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>

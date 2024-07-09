<script setup lang="ts">
</script>

<template>
  <img src="../../assets/background.png" class="absolute w-full pointer-events-none z-0" style="height: -webkit-fill-available;" />

  <div class="text-center m-4 flex flex-col gap-y-2 h-[250px]">

    <h1 class="text-3xl font-bold pb-6">
      Hello from Chromate!
    </h1>
    <h3 class="text-xl pb-3">How can we start the journey?</h3>
      <RouterLink
          class="w-24 self-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          to="/chat"
      >
        Let's talk
      </RouterLink>
  </div>
</template>

<style scoped>
</style>


<template>
  <header
      aria-label="Site Header"
      class="bg-gray-50 w-[300px]"
  >
    Popup Header {{counter}}
  </header>

  <RouterView />

  <footer
      aria-label="Site Footer"
      class="bg-gray-50"
  >
    Popup Footer
  </footer>
</template>

<script lang="ts">


export default {
  name: 'PopupApp',
  components: {},
  props: {
    counter: Number
  }
}
</script>


<style scoped></style>

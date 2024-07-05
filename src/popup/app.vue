
<template>
  <PopupMenu />
  <RouterView :scriptEntries="entries" />

  <footer
      aria-label="Site Footer"
      class="bg-gray-50"
  >
    Popup Footer
  </footer>
</template>

<script lang="ts">


import PopupMenu from "../components/PopupMenu.vue";

export default {
  name: 'PopupApp',
  components: {PopupMenu},
  props: {
    counter: Number,
    entries: Array
  }
}
</script>


<style scoped></style>

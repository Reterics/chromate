
<template>
  <div class="text-slate-500 dark:text-slate-800 bg-white dark:bg-slate-200 h-full">
    <PopupMenu />
    <RouterView :scriptEntries="entries" />
  </div>
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

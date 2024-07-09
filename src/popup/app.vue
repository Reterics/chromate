
<template>
  <div class="text-slate-500 dark:text-slate-800 bg-white dark:bg-slate-200 h-full">
    <PopupMenu />
    <RouterView :scriptEntries="scriptEntries" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import PopupMenu from "../components/PopupMenu.vue";

export default defineComponent({
  name: 'PopupApp',
  components: { PopupMenu },
  props: {
    counter: {
      type: Number,
      required: true
    },
    entries: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { entries } = toRefs(props);
    return {
      scriptEntries: entries
    };
  }
});
</script>

<style scoped></style>

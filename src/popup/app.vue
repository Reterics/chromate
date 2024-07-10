
<template>
  <div class="text-slate-500 dark:text-slate-800 bg-white dark:bg-slate-200 h-full">
    <PopupMenu />
    <RouterView :script-entries="scriptEntries" :config="config" @update="update"/>
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
    },
    chat: {
      type: Object,
      required: true
    },
    set: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { entries, chat } = toRefs(props);
    return {
      scriptEntries: entries,
      config: chat,
      update: (config: object) => {
        props.set(config);
      }
    };
  }
});
</script>

<style scoped></style>

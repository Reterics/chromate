<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import type { PropType } from 'vue'

import PopupMenu from "../components/PopupMenu.vue";

export default defineComponent({
  name: 'PopupApp',
  components: { PopupMenu },
  props: {
    counter: {
      type: Number,
      required: true
    },
    entries: Array as PropType<InjectedScript[]>,
    chat: Object as PropType<ChatData>,
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
      update: (config: object): void => {
        props.set(config);
      }
    };
  }
});
</script>

<template>
  <div class="text-slate-500 dark:text-slate-800 bg-white dark:bg-slate-200 h-full">
    <PopupMenu />
    <RouterView :script-entries="scriptEntries" :config="config" @update="update" />
  </div>
</template>

<style scoped></style>

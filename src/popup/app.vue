<script setup lang="ts">
import type { PropType } from 'vue'

import PopupMenu from "../components/PopupMenu.vue";

const props = defineProps({
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
})

const update = (config: object): void => props.set(config);

</script>

<template>
  <div class="text-slate-500 dark:text-slate-800 bg-white dark:bg-slate-200 h-full">
    <PopupMenu />
    <RouterView :script-entries="props.entries" :config="props.chat" @update="update" />
  </div>
</template>

<style scoped></style>

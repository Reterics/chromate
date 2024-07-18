<script setup lang="ts">
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import { type PropType, onMounted, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { downloadFile, readTextFile } from '../utils/chatUtils.ts'

const props = defineProps({
  scriptEntries: {
    type: Array as PropType<InjectedScript[]>,
    required: true
  }
});
const emit = defineEmits(['update'])
const route = useRoute()

const { scriptEntries } = toRefs(props);
const entries = ref(Object.values(scriptEntries.value));
const entry = entries.value.find(e=>e.id === Number(route.params.id));

const editorParent = ref(null);
let editor: EditorView | undefined;

onMounted(() => {
  if (editorParent.value) {
    editor = editor || new EditorView({
      extensions: [basicSetup, javascript()],
      parent: editorParent.value,
      doc: entry?.content,
    });
  }
});

const updateContent = (content: string) => {
  editor?.destroy();
  if (entry) {
    entry.content = content;
  }

  console.log(entry, entry?.content, editorParent.value);
  if (editorParent.value) {
    editor = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: editorParent.value,
      doc: entry?.content,
    });
  }
}

const clearScript = () => {
  updateContent('');
};

const saveScript = () => {
  if (editorParent.value) {
    const rawText = ((editorParent.value as HTMLElement)
      .querySelector('.cm-content') as HTMLElement)
      .innerText || '';

    if (entry) {
      entry.content = rawText;

      emit('update', {
        entries: entries.value
      });
    }
  }
};
const downloadScript = () => {
  if (editorParent.value) {
    const rawText = ((editorParent.value as HTMLElement)
      .querySelector('.cm-content') as HTMLElement)
      .innerText || '';
    downloadFile(rawText, `entry${new Date().getTime()}.js`, 'application/javascript');
  }

};
const loadScript = () => {
  readTextFile('application/javascript').then((file: TextFile)=>{
    if (file && typeof file.value === "string") {
      updateContent(file.value);
    }
  })
};
</script>

<template>
  <div id="editor" ref="editorParent" class="relative overflow-x-auto shadow-md h-[400px]" />
  <div>
    <div class="bg-white dark:bg-gray-900 w-100 p-1 flex items-center justify-between flex-row-reverse">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 rounded-l hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="saveScript">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="downloadScript">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="clearScript">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 rounded-r hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="loadScript">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #editor .cm-editor {
    height: 100%;
    width: 100%;
  }
  #editor .cm-editor, #editor .cm-scroller, #editor {
    font-size: 1.2em;
    line-height: 1.4em;
  }
</style>

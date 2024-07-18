<script setup lang="ts">
import { type PropType, ref, toRefs, watch } from 'vue'
import { downloadJSON, readTextFile } from '../utils/chatUtils.ts'

const props = defineProps({
  scriptEntries: {
    type: Array as PropType<InjectedScript[]>,
    required: true
  }
})

const emit = defineEmits(['update'])


const { scriptEntries } = toRefs(props);
const entries = ref(Object.values(scriptEntries.value));

let debounceTimer: NodeJS.Timeout | null = null;

const updateChromeStorage = (): void => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(()=>{
    emit('update', {
      entries: entries.value
    });
  }, 1000);

};

const addEntry = (): void => {
  const newEntry: InjectedScript = { id: Date.now(), name: '', content: '', keyBind: '' };
  entries.value.push(newEntry);
  updateChromeStorage();
};

const updateEntry = (index: number, key: 'name'|'content'|'keyBind', value: string): void => {
  entries.value[index][key] = value;
  updateChromeStorage();
};

const deleteEntry = (index: number): void => {
  entries.value.splice(index, 1);
  updateChromeStorage();
};

watch(scriptEntries, (newVal) => {
  entries.value = Object.values(newVal);
});

const clearEntries = () => {
  entries.value = [];

};
const saveEntries = () => {
  downloadJSON(entries.value, ('entries' + new Date().getTime()) + '.json');
};
const loadEntries = () => {
  readTextFile().then((file: TextFile)=>{
    if (file && typeof file.value === "string") {
      let data;
      try {
        data = JSON.parse(file.value);
      } catch (e) {
        console.error(e);
      }

      if (Array.isArray(data) && data.length > 0) {
        entries.value = data.map((d, index) => {
          if (typeof d.keyBind === 'string' &&
            typeof d.content === 'string' && d.content && d.keyBind) {
            return {
              keyBind: d.keyBind,
              content: d.content,
              name: d.name && typeof d.name === 'string' ? d.name : index.toString(),
              id: typeof d.id === "number" ? d.id : index + 1
            } as InjectedScript
          }
          return null;
        }).filter(d => d) as InjectedScript[];
      }
    }
  })
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Content
          </th>
          <th scope="col" class="px-6 py-3">
            Keybind
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-if="entries.length > 0">
        <tr v-for="(entry, index) in entries" :key="entry.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <th scope="row" class="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <input id="first_name" v-model="entry.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required @input="updateEntry(index, 'name', entry.name)">
          </th>
          <td class="p-1">
            <textarea
              id="first_name" v-model="entry.content" type="text"
              class="block p-2.5 h-[40px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Script" required @input="updateEntry(index, 'content', entry.content)"
            />
          </td>
          <td class="p-1">
            <input id="first_name" v-model="entry.keyBind" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keybind" required @input="updateEntry(index, 'keyBind', entry.keyBind)">
          </td>
          <td class="p-6 flex justify-center justify-items-center text-center">

            <RouterLink :to="`editor/${entry.id}`" class="flex w-auto place-content-center font-medium text-white hover:underline me-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </RouterLink>
            <a class="flex w-auto place-content-center font-medium text-red-600 dark:text-red-500 hover:underline" @click="deleteEntry(index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="bg-white dark:bg-gray-900 w-100 p-1 flex items-center justify-between flex-row-reverse">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 rounded-l hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="addEntry">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="clearEntries">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="saveEntries">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
        </button>
        <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-gray-800 rounded-r hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="loadEntries">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  overflow-y: hidden;
}
</style>

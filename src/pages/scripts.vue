<script setup lang="ts">
import { type PropType, ref, toRefs, watch } from 'vue'

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
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Script" required @input="updateEntry(index, 'content', entry.content)"
            />
          </td>
          <td class="p-1">
            <input id="first_name" v-model="entry.keyBind" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keybind" required @input="updateEntry(index, 'keyBind', entry.keyBind)">
          </td>
          <td class="p-1 justify-center justify-items-center text-center">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="deleteEntry(index)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="bg-white dark:bg-gray-900 w-100 p-1">
      <button
        type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        @click="addEntry"
      >
        Add Entry
      </button>
    </div>
  </div>
</template>

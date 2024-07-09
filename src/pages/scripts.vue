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
      <tbody v-if="entries.length > 0" >
      <tr v-for="(entry, index) in entries" :key="entry.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" class="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <input id="first_name" v-model="entry.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required @input="updateEntry(index, 'name', entry.name)" />
        </th>
        <td class="p-1">
          <textarea
              id="first_name" v-model="entry.content" type="text"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Script" required @input="updateEntry(index, 'content', entry.content)" >

          </textarea>
        </td>
        <td class="p-1">
          <input id="first_name" v-model="entry.keybind" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keybind" required @input="updateEntry(index, 'keybind', entry.keybind)" />
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
              @click="addEntry">
        Add Entry
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'ListPage',
  props: {
    scriptEntries: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const { scriptEntries } = toRefs(props);
    const entries = ref(Object.values(scriptEntries.value));

    const addEntry = () => {
      const newEntry = { id: Date.now(), name: '', content: '', keybind: '' };
      entries.value.push(newEntry);
      updateChromeStorage();
    };

    const updateEntry = (index, key, value) => {
      entries.value[index][key] = value;
      updateChromeStorage();
    };

    const deleteEntry = (index) => {
      entries.value.splice(index, 1);
      updateChromeStorage();
    };

    const updateChromeStorage = () => {
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ entries: entries.value }, () => {
        console.log('Entries updated in Chrome storage');
      });
      emit('update:entries', entries.value);
    };

    watch(scriptEntries, (newVal) => {
      entries.value = Object.values(newVal);
    });

    return {
      entries,
      addEntry,
      updateEntry,
      deleteEntry
    };
  }
});
</script>

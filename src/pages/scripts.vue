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
          <input v-model="entry.name" @input="updateEntry(index, 'name', entry.name)" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </th>
        <td class="p-1">
          <textarea v-model="entry.content" @input="updateEntry(index, 'content', entry.content)" type="text"
                    id="first_name" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Script" required >

          </textarea>
        </td>
        <td class="p-1">
          <input v-model="entry.keybind" @input="updateEntry(index, 'keybind', entry.keybind)" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keybind" required />
        </td>
        <td class="p-1 justify-center justify-items-center text-center">
          <a @click="deleteEntry(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="bg-white dark:bg-gray-900 w-100 p-1">
      <button @click="addEntry" type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Add Entry
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  props: {
    scriptEntries: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      entries: Object.values(this.scriptEntries)
    };
  },
  methods: {
    addEntry() {
      const newEntry = { id: Date.now(), name: '', content: '', keybind: '' };
      this.entries.push(newEntry);
      this.updateChromeStorage();
    },
    updateEntry(index, key, value) {
      this.entries[index][key] = value;
      this.updateChromeStorage();
    },
    deleteEntry(index) {
      this.entries.splice(index, 1);
      this.updateChromeStorage();
    },
    updateChromeStorage() {
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ entries: this.entries }, () => {
        console.log('Entries updated in Chrome storage');
      });
      this.$emit('update:entries', this.entries);
    }
  }
};
</script>

<template>
  <div class="api-tester">
    <form @submit.prevent="testApi">
      <div class="grid grid-cols-2 gap-6 pt-2">
        <div class="relative z-0 w-full mb-3 group">
          <label for="url" class="block mb-2 text-sm font-medium text-gray-900">URL:</label>
          <input type="text" id="url" v-model="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://127.0.0.1/" required />
        </div>
        <div class="relative z-0 w-full mb-3 group">
          <label for="method" class="block mb-2 text-sm font-medium text-gray-900">Method:</label>
          <select v-model="method"  id="method" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

        </div>
      </div>

      <div class="relative z-0 w-full mb-3 group">
        <label for="headers" class="block mb-2 text-sm font-medium text-gray-900">Headers (JSON format):</label>
        <textarea v-model="headers" id="headers" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div class="relative z-0 w-full mb-3 group">
        <label for="body" class="block mb-2 text-sm font-medium text-gray-900">Body:</label>
        <textarea v-model="body" id="body" :disabled="method === 'GET'" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div>
        <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Test API</button>
      </div>
    </form>
    <div v-if="response">
      <h2>Response</h2>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      method: 'GET',
      headers: '',
      body: '',
      response: null
    };
  },
  methods: {
    async testApi() {
      const options = {
        method: this.method,
        headers: this.headers ? JSON.parse(this.headers) : {},
        body: this.method !== 'GET' ? this.body : undefined
      };

      try {
        const res = await fetch(this.url, options);
        const data = await res.json();
        this.response = JSON.stringify(data, null, 2);
      } catch (error) {
        this.response = `Error: ${error.message}`;
      }
    }
  }
};
</script>

<style scoped>
.api-tester {
  max-width: 600px;
  margin: 0 auto;
}

.api-tester button[type=submit] {
  width: 100%;
}

.api-tester pre {
  background-color: #f8f9fa;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>

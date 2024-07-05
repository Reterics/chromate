<template>
  <div class="api-tester">
    <h1>REST API Tester</h1>
    <form @submit.prevent="testApi">
      <div>
        <label for="url">URL:</label>
        <input type="text" v-model="url" id="url" required />
      </div>
      <div>
        <label for="method">Method:</label>
        <select v-model="method" id="method">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div>
        <label for="headers">Headers (JSON format):</label>
        <textarea v-model="headers" id="headers"></textarea>
      </div>
      <div>
        <label for="body">Body:</label>
        <textarea v-model="body" id="body" :disabled="method === 'GET'"></textarea>
      </div>
      <button type="submit">Test API</button>
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
  padding: 20px;
}
.api-tester h1 {
  text-align: center;
}
.api-tester form {
  display: flex;
  flex-direction: column;
}
.api-tester form div {
  margin-bottom: 10px;
}
.api-tester form label {
  font-weight: bold;
}
.api-tester form input,
.api-tester form select,
.api-tester form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}
.api-tester form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
.api-tester form button:hover {
  background-color: #0056b3;
}
.api-tester pre {
  background-color: #f8f9fa;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>

<template>
  <div class="justify-items-center w-11/12 m-auto mt-1">
    <form @submit.prevent="sendMessage">

      <div class="relative z-0 w-full mb-3 group">
        <label for="body" class="block mb-2 text-sm font-medium text-gray-900">Message:</label>
        <textarea v-model="body" id="body" :disabled="sending" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div>
        <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">


import {CryptoModule} from "../utils/crypto.ts";


export default {
  data() {
    return {
      cryptoModule: new CryptoModule('testPassword'),
      sending: false,
      body: '',
      responses: []
    };
  },
  methods: {
    async sendMessage() {
      console.log('Encrypt message: ', this.body);
      const encrypted = this.cryptoModule.encrypt(this.body);
      console.log(encrypted);

      console.log('Decrypt message: ', this.cryptoModule.decrypt(encrypted));

      alert('Not implemented')
    }
  }
};
</script>

<style scoped>

</style>

<template>
  <div class="justify-items-center m-auto mt-1 p-1">
    <div v-if="responses && responses.length" class="overflow-x-hidden overflow-y-scroll mb-1 max-h-[345px]">
      <div v-for="(response, index) in responses" :key="index" class="flex items-start gap-2.5" :style="response.user === 'You' ? 'flex-direction: row-reverse;' : '' ">
        <div class="flex flex-col gap-1 w-full max-w-[320px] mb-1">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900">{{ response.user }}</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ response.timestamp }}</span>
          </div>
          <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ response.message}}</p>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="body" class="sr-only">Your message</label>
          <textarea id="body" v-model="body" :disabled="sending" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your message..." required ></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Send
          </button>
          <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">

            <button v-if="settings" type="button" class="inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <label for="key" class="block text-sm font-medium pe-2 ps-2">Key:</label>
                <input
                  id="key" v-model="key" type="text"
                       class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </button>

            <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <label class="inline-flex items-center cursor-pointer">
                <input v-model="settings" type="checkbox" class="sr-only peer" @click="saveSettings">
                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Settings</span>
              </label>
            </button>
          </div>
        </div>
        <div v-if="settings" class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button v-if="settings" type="button" class="w-full inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <label for="server" class="block text-sm font-medium pe-2 ps-2">Server:</label>
            <input
                id="server" v-model="server" type="text"
                   class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </button>
          <button type="button" class="w-full inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <label for="api" class="block text-sm font-medium pe-2 ps-2">API:</label>
            <input
                id="api" v-model="api" type="text"
                   class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CryptoModule } from "../utils/crypto.ts";
import { getAllValuesByPath } from "../utils/chatUtils.ts";


export default defineComponent({
  name: 'ChatAssistantPage',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const cryptoModule = new CryptoModule(''); // Initialize with an empty string
    const sending = ref(false);
    const body = ref('');
    const responses = ref<ChatMessage[]>(props.config.responses ?
        Object.values(props.config.responses) : []);
    const settings = ref(false);
    const key = ref('');
    const server = ref(props.config.server || '');
    const api = ref(props.config.api || '');
    const threadId = ref(props.config.threadId || '');

    const saveSettings = () => {
        emit("update", {
          chat: {
            server: server.value,
            api: api.value,
            threadId: threadId.value,
            responses: responses.value
          }
        });
    }


    const sendMessage = async () => {
      cryptoModule.setPassword(key.value); // Update the key in CryptoModule

      const encrypted = cryptoModule.encrypt(body.value);

      if (!server.value) {
        alert('No server name is defined');
      }
      const requestBody = {
        content: encrypted,
        threadId: threadId.value ? threadId.value : undefined
      };

      let uri = '/chat';
      if (api.value) {
        uri += '?key=' + api.value;
      }
      responses.value.push({
        message: body.value,
        user: 'You'
      });
      const request = await fetch(server.value + uri, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!request.ok) {
        return alert('Failed to receive server data');
      }
      let response = await request.json();

      if (!response) {
        return alert('Server data is empty or invalid');
      }

      if (cryptoModule.isEncrypted(response)) {
        try {
          response = JSON.parse(cryptoModule.decrypt(response));
        } catch (e) {
          console.error(e);
        }
      }

      if (!response) {
        return alert('Server data is invalid');
      }

      const messages = getAllValuesByPath(response, 'result.content.text.value') as string[];
      console.log('Received messages: ', messages);
      if (messages && Array.isArray(messages)) {
        let type = 'You';

        responses.value = messages.map(message => {
          const chatMessage:ChatMessage = {
            message: message,
            user: type
          };
          type = type === 'Assistant' ? 'You' : 'Assistant';
          return chatMessage;
        });
      }
      if (response.threadId) {
        threadId.value = response.threadId;
        saveSettings();
      }
    };

    return {
      sending,
      body,
      responses: responses,
      settings,
      key,
      server,
      api,
      sendMessage,
      saveSettings: () => !settings.value && saveSettings()
    };
  }
});
</script>

<style scoped>

</style>

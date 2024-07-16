<script setup lang="ts">
import { ref } from 'vue';
import { CryptoModule } from "../utils/crypto.ts";
import { downloadJSON, getAllValuesByPath, readTextFile } from '../utils/chatUtils.ts'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])


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

const saveSettings = (): void => {
    emit("update", {
      chat: {
        server: server.value,
        api: api.value,
        threadId: threadId.value,
        responses: responses.value
      }
    } as ChromeStoredData);
}


const sendMessage = async (): Promise<void> => {
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
    uri += `?key=${  api.value}`;
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
        message,
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
}

const saveSettingsFromUI = (): false | void  => !settings.value && saveSettings();


const newThread = () => {
  threadId.value = '';
  responses.value = [];
  saveSettings();
};
const saveThread = () => {
  const data = {
    threadId: threadId.value,
    responses: responses.value,
    server: server.value
  };
  downloadJSON(data, (threadId.value || 'thread') + '.json');
};
const loadThread = () => {
  readTextFile().then((file: TextFile)=>{
    if (file && typeof file.value === "string") {
      let data;
      try {
        data = JSON.parse(file.value);
      } catch (e) {
        console.error(e);
      }

      if (data && data.responses && data.responses.length > 0) {
        responses.value = data.responses || responses.value;
        threadId.value = data.threadId || threadId.value;
        server.value = data.server || server.value;
      }
    }
  })
};
</script>

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
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {{ response.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="body" class="sr-only">Your message</label>
          <textarea id="body" v-model="body" :disabled="sending" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your message..." required />
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Send
          </button>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-l hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="newThread">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
              </svg>
            </button>
            <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="saveThread">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
              </svg>
            </button>
            <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-r hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="loadThread">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
              </svg>
            </button>
          </div>



          <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button v-if="settings" type="button" class="inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <label for="key" class="block text-sm font-medium pe-2 ps-2">Key:</label>
              <input
                id="key" v-model="key" type="text"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
            </button>

            <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <label class="inline-flex items-center cursor-pointer">
                <input v-model="settings" type="checkbox" class="sr-only peer" @click="saveSettingsFromUI">
                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
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
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
          </button>
          <button type="button" class="w-full inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <label for="api" class="block text-sm font-medium pe-2 ps-2">API:</label>
            <input
              id="api" v-model="api" type="text"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>

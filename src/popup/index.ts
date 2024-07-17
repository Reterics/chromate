import {applyBrowserUtils} from "../utils/browserify.ts";
import '@/assets/style.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import App from './app.vue'
import routes from '~pages'

applyBrowserUtils();

routes.push({
    path: '/',
    redirect: '/popup',
})

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});


chrome.storage.local.get(["counter", "entries", "chat"]).then((value) => {
    createApp(App, {
        counter: value.counter || 0,
        entries: value.entries ? value.entries : [],
        chat: value.chat || {},
        set: async (object: ChromeStoredData) => {
            await chrome.storage.local.set(object);
            if (object && object.entries) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // Send a message to the content script in the active tab
                    if (tabs && tabs.length > 0) {
                        chrome.tabs.sendMessage(tabs[0].id as number, { message: "scriptUpdate" });
                    }
                });
            }
        }
    }).use(router).mount('#app')
})

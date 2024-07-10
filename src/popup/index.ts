import {applyBrowserUtils} from "../utils/browserify.ts";

applyBrowserUtils();

import '@/assets/style.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import routes from '~pages'
import App from './app.vue'


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
        set: async (object: object) => {
            return await chrome.storage.local.set(object);
        }
    }).use(router).mount('#app')
})

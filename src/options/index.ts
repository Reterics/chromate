import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import App from './app.vue'
import routes from '~pages'
import './index.scss'

routes.push({
    path: '/',
    redirect: '/options',
})

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

createApp(App).use(router).mount('#app')

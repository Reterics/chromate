import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import routes from '~pages'
import App from './app.vue'
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

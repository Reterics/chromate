import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import routes from '~pages'
import App from './app.vue'

export interface ISetup {
    setupType: 'install' | 'update'
}

const setupType = new URLSearchParams(window.location.search).get('type')

routes.push({
    path: '/',
    redirect: '/setup',
})

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, _from, next) => {
    if (to.path === '/' || to.path === '/setup') {
        if (setupType === 'install') {
            return next('/setup/install')
        } else {
            return next('/setup/update')
        }
    }

    next()
})

const app = createApp(App)

app.provide('setupType', { setupType } as ISetup)

app.use(router).mount('#app')


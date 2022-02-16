import { createRouter, createWebHashHistory } from 'vue-router'
import Browser from './views/Browser.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', alias: '/browser', component: Browser },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

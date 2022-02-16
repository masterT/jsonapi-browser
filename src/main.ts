import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'virtual:windi-base.css'
import './style/base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')

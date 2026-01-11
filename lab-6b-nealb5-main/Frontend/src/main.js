import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/global.css'

library.add(fas) // Add the solid icon library to FontAwesome

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)  // Register FontAwesome globally
    .use(router)
    .use(store)
    .mount('#app')

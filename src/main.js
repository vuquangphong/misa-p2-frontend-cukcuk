import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import { createStore } from 'vuex'
import storeConfig from './vuex'

const store = createStore(storeConfig)

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

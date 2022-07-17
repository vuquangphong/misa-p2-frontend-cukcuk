import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import storeConfig from './redux/index'
import router from './routers'
import Paginate from 'vuejs-paginate-next'

const store = createStore(storeConfig)

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Paginate)
app.mount('#app')

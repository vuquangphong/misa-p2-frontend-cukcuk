import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import storeConfig from './redux/index'
import router from './routers'
import { clickOutside } from './utils/commonFunc'

const store = createStore(storeConfig)

const app = createApp(App)

app.directive('click-outside', clickOutside)
app.use(store)
app.use(router)
app.mount('#app')

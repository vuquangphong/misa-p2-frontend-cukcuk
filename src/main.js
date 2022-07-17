import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import storeConfig from './redux/index'
import router from './routers'
import MenuFoodList from './components/layouts/content-material/MenuFoodList.vue';

const store = createStore(storeConfig)

const app = createApp(App)

app.use(store)
app.use(router)
app.component('MenuFoodList', MenuFoodList)
app.mount('#app')

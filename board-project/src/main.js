import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins.js'
import store from './store.js'

createApp(App)
.use(router)
.use(store) // vuex 등록
.mixin(mixins) // minxins 등록
.mount('#app')

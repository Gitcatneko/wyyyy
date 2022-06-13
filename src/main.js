import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入阿里巴巴矢量图
import '../src/assets/aliIconfont/iconfont.js';
//导入vant
import getVant from './plugins/index.js'

const app = createApp(App)
app.use(store)
app.use(router)

getVant(app)

app.mount('#app')

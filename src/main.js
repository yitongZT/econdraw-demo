import Vue from 'vue'
import App from './App.vue'

// 易通组态软件包
// npm 引入
import econdraw from "econdraw";
import 'econdraw/lib/index.css'
Vue.use(econdraw);

// script 引入  在 index.html引入
// Vue.component(econdraw.name, econdraw);

import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{
  size: 'medium',
})
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')

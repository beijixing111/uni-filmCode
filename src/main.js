import Vue from 'vue'
import App from './App'
import store from './store/index' 
import '@dcloudio/uni-ui/lib/uni-icons/uniicons.ttf';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
});

app.$mount()

// "usingComponents": {
    //   "van-cell": "/wxcomponents/@vant/weapp/cell/index"
    // }
import Vue from 'vue';
import App from './App';



// 引入自定义音乐组件
import music from './components/music';
Vue.use(music);

// 引用GA统计
import track from './components/track';
Vue.use(track);

// 引入预加载方法
import preLoad from './components/preLoad';
Vue.use(preLoad);

// 导入rem布局
import './common/config/rem';

// vuex组件
import store from './store';

// 导入mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 导入动画库
import animated from 'animate.css';
Vue.use(animated);


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
import Vue from 'vue';
import App from './App';



// 导入rem布局
import '@/common/config/rem';

// vuex组件
import store from '@/store';

// 导入mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 导入动画库
import animated from 'animate.css';
Vue.use(animated);

// 引用fastclick
import FastClick from 'fastclick';
FastClick.attach(document.body);



Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
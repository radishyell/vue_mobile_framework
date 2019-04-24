// * ......................我佛慈悲......................
// *                       _oo0oo_
// *                      o8888888o
// *                      88" . "88
// *                      (| -_- |)
// *                      0\  =  /0
// *                    ___/`---'\___
// *                  .' \\|     |// '.
// *                 / \\|||  :  |||// \
// *                / _||||| -卍-|||||- \
// *               |   | \\\  -  /// |   |
// *               | \_|  ''\---/''  |_/ |
// *               \  .-\__  '-'  ___/-. /
// *             ___'. .'  /--.--\  `. .'___
// *          ."" '<  `.___\_<|>_/___.' >' "".
// *         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
// *         \  \ `_.   \_ __\ /__ _/   .-` /  /
// *     =====`-.____`.___ \_____/___.-`___.-'=====
// *                       `=---='
// *
// *..................佛祖开光 ,永无BUG...................



import Vue from 'vue';
import App from './App';

// 导入rem布局
require('@/common/config/rem');

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

// 抛出全局异常
const errorHandler = (error, vm) => {
    console.error('抛出全局异常');
    console.error(vm);
    console.error(error);
}
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);



Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
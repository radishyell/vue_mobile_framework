import music from './music.vue';
import musicFun from './fun.js';

export default (Vue) => {
    Vue.component(music.name, music)
    Vue.prototype.$music = musicFun
}